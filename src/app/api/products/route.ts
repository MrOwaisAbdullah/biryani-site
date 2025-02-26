import { NextResponse } from 'next/server';

const productsData = [
  {
    "_id": "2P4ew3n0aFKlAn3Aum9jzF",
    "title": "SleekSpin",
    "priceWithoutDiscount": null,
    "category": {
      "_id": "b5710116-09af-4d0e-aa9a-dcd02fe919a9",
      "title": "Desk Chair"
    },
    "tags": [
      "gallery"
    ],
    "price": 20,
    "badge": null,
    "imageUrl": "https://cdn.sanity.io/images/5x47y4y0/production/81a5b7de166f930870a82f8f3e661b38a70de9f4-312x312.png",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim. Lorem ipsum dolor sit amet, consectetur adipiscing",
  },
  {
    "tags": [
      "featured",
      "instagram",
      "gallery"
    ],
    "badge": null,
    "imageUrl": "https://cdn.sanity.io/images/5x47y4y0/production/4cd62915914fb385550532c3d1f0c4d64c1f8cca-312x312.png",
    "price": 20,
    "priceWithoutDiscount": null,
    "category": {
      "_id": "b5710116-09af-4d0e-aa9a-dcd02fe919a9",
      "title": "Desk Chair"
    },
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim. Lorem ipsum dolor sit amet, consectetur adipiscing",
    "_id": "3lfjJc6xfJVyGl3sMldeD4",
    "title": "Citrus Edge"
  },
];

// Extract unique categories from the products data
const categoriesData = Array.from(
  new Map(
    productsData.map(product => [
      product.category._id,
      {
        _id: product.category._id,
        title: product.category.title,
        description: `Collection of ${product.category.title} products`,
        // In a real scenario, you might want to set real image URLs for categories
        imageUrl: `https://example.com/categories/${product.category.title.toLowerCase().replace(/\s+/g, '-')}.jpg`
      }
    ])
  ).values()
);

export async function GET() {
  try {
    return NextResponse.json(productsData, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products data' },
      { status: 500 }
    );
  }
}