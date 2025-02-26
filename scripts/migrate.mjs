import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

// Import the Sanity client to interact with the Sanity backend
import { createClient } from "@sanity/client";

// Load required environment variables
const {
  NEXT_PUBLIC_SANITY_PROJECT_ID, // Sanity project ID
  NEXT_PUBLIC_SANITY_DATASET, // Sanity dataset (e.g., "production")
  SANITY_API_TOKEN, // Sanity API token
  BASE_URL = "https://biryani-site.vercel.app", // API base URL for products and categories
} = process.env;

// Check if the required environment variables are provided
if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.error("Missing required environment variables. Please check your .env.local file.");
  process.exit(1); // Stop execution if variables are missing
}

// Create a Sanity client instance to interact with the target Sanity dataset
const targetClient = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID, // Your Sanity project ID
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production", // Default to "production" if not set
  useCdn: false, // Disable CDN for real-time updates
  apiVersion: "2023-01-01", // Sanity API version
  token: SANITY_API_TOKEN, // API token for authentication
});

// Function to upload an image to Sanity from various sources
async function uploadImageToSanity(imagePath) {
  try {
    let imageBuffer;
    let filename;

    // Handle different image path formats
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      // For remote images
      const response = await fetch(imagePath);
      if (!response.ok) throw new Error(`Failed to fetch image: ${imagePath}`);
      imageBuffer = Buffer.from(await response.arrayBuffer());
      filename = imagePath.split("/").pop();
    } else {
      // For local images in public folder
      // Remove leading slash if present
      const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
      
      // Determine if we're using relative path or from public folder
      let fullPath;
      if (cleanPath.startsWith('public/')) {
        fullPath = path.resolve(cleanPath);
      } else {
        fullPath = path.resolve('public', cleanPath);
      }
      
      if (!fs.existsSync(fullPath)) {
        console.warn(`Image not found at path: ${fullPath}`);
        return null;
      }
      
      imageBuffer = fs.readFileSync(fullPath);
      filename = path.basename(fullPath);
    }

    // Upload the image to Sanity
    const uploadedAsset = await targetClient.assets.upload("image", imageBuffer, {
      filename: filename,
    });

    return uploadedAsset._id; // Return the asset ID
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return null; // Return null if the upload fails
  }
}

// Function to resolve image path based on environment
function resolveImagePath(imagePath) {
  // If it's already a full URL, return it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If we're in deployed environment, prefix with BASE_URL
  if (process.env.NODE_ENV === 'production' && BASE_URL !== 'http://localhost:3000') {
    // Make sure the path starts with a slash for URL concatenation
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${BASE_URL}${cleanPath}`;
  }
  
  // For local development, return path relative to public folder
  return imagePath;
}

// Main function to migrate data from REST API to Sanity
async function migrateData() {
  console.log("Starting data migration...");

  try {
    // Fetch categories from the REST API
    const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
    if (!categoriesResponse.ok) throw new Error("Failed to fetch categories.");
    const categoriesData = await categoriesResponse.json(); // Parse response to JSON

    // Fetch products from the REST API
    const productsResponse = await fetch(`${BASE_URL}/api/products`);
    if (!productsResponse.ok) throw new Error("Failed to fetch products.");
    const productsData = await productsResponse.json(); // Parse response to JSON

    const categoryIdMap = {}; // Map to store original ID to Sanity ID mapping

    // Migrate categories first
    console.log("Migrating categories...");
    for (const category of categoriesData) {
      console.log(`Processing category: ${category.title}`);
      
      // Resolve and upload the category image to Sanity
      let imageRef = undefined;
      if (category.imageUrl) {
        const resolvedImagePath = resolveImagePath(category.imageUrl);
        const imageId = await uploadImageToSanity(resolvedImagePath);
        if (imageId) {
          imageRef = { _type: "image", asset: { _type: "reference", _ref: imageId } };
        }
      }

      // Create category document in Sanity
      const categoryDoc = {
        _type: "category",
        title: category.title,
        description: category.description || "",
        image: imageRef
      };

      // Save or update the category in Sanity
      const createdCategory = await targetClient.create(categoryDoc);
      
      // Store the mapping between original ID and new Sanity ID
      categoryIdMap[category._id] = createdCategory._id;
      
      console.log(`Migrated category: ${category.title} (ID: ${createdCategory._id})`);
    }

    // Now migrate products with the correct category references
    console.log("Migrating products...");
    for (const product of productsData) {
      console.log(`Processing product: ${product.title}`);

      // Check if we have a valid category reference
      if (!product.category || !product.category._id || !categoryIdMap[product.category._id]) {
        console.warn(`Product ${product.title} has missing or invalid category reference. Skipping.`);
        continue;
      }

      // Resolve and upload the product image to Sanity
      let imageRef = undefined;
      if (product.imageUrl) {
        const resolvedImagePath = resolveImagePath(product.imageUrl);
        const imageId = await uploadImageToSanity(resolvedImagePath);
        if (imageId) {
          imageRef = { _type: "image", asset: { _type: "reference", _ref: imageId } };
        }
      }

      // Generate a slug from the title
      const slug = {
        _type: "slug",
        current: product.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
      };

      // Create product document in Sanity
      const productDoc = {
        _type: "product",
        title: product.title,
        slug: slug,
        description: product.description || "",
        price: product.price,
        discountedPrice: product.discountedPrice || undefined,
        badge: product.badge || undefined,
        image: imageRef,
        tags: product.tags || [],
        category: {
          _type: "reference",
          _ref: categoryIdMap[product.category._id] // Use the actual Sanity ID from our map
        }
      };

      // Save the product to Sanity
      const createdProduct = await targetClient.create(productDoc);
      console.log(`Migrated product: ${product.title} (ID: ${createdProduct._id})`);
    }

    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error.message);
    console.error(error.stack);
    process.exit(1); // Stop execution if an error occurs
  }
}

// Start the migration process
migrateData();