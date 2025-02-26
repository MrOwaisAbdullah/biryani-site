import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid";
import { Product, ShippingDetails } from "@/typing";

// Helper function to generate a short unique ID
const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36); // Compact timestamp
  const uuid = uuidv4().slice(0, 4);
  const uniquId = `${uuid}${timestamp}`.slice(0, 8).toUpperCase(); // Combine timestamp and random string
  return `order-${uniquId}`; // Combine timestamp and random string
};

export const createOrder = async (orderDetails: {
  cart: Product[];
  shipping: ShippingDetails;
  payment: {
    paymentMethod: string;
    amountPaid: number;
    transactionId?: string;
  };
  customerId: string; 
  sellerIds: string[]; // Array of seller IDs
}): Promise<{ id: string }> => {
  try {
    // Validate customer ID (Sanity user ID)
    const customerExists = await client.fetch(
      `*[_type == "user" && _id == $customerId][0]`,
      { customerId: orderDetails.customerId }
    );
    if (!customerExists) {
      throw new Error(`Customer with ID "${orderDetails.customerId}" does not exist in Sanity.`);
    }

    // Generate a unique order ID
    const orderId = generateOrderId();

    // Calculate the total amount of the order
    const total = orderDetails.cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    // Prepare the order document
    const orderDocument = {
      _type: "order",
      orderId,
      customer: {
        _type: "reference",
        _ref: orderDetails.customerId, // Use Sanity user ID
      },
      sellers: orderDetails.sellerIds.map((sellerId) => ({
        _key: uuidv4(), // Add a unique key for each seller
        _type: "reference",
        _ref: sellerId, // Reference to each seller
      })),
      products: orderDetails.cart.map((item) => ({
        _key: uuidv4(), // Add a unique key for each product
        product: {
          _type: "reference",
          _ref: item._id, // Reference to the product
        },
        quantity: item.quantity || 1,
      })),
      total,
      paymentDetails: {
        amountPaid: orderDetails.payment.amountPaid || total,
        paymentMethod: orderDetails.payment.paymentMethod || "unknown",
        transactionId: orderDetails.payment.transactionId || "N/A",
      },
      status: "pending", // Default status
      paymentStatus: "pending", // Default payment status
      shippingAddress: {
        street: orderDetails.shipping.address,
        city: orderDetails.shipping.city,
        state: orderDetails.shipping.state || "",
        postalCode: orderDetails.shipping.postalCode,
        country: orderDetails.shipping.country,
      },
    };

    console.log("Order document prepared:", orderDocument);

    // Save the order in Sanity
    const response = await client.create(orderDocument);
    console.log("Order created successfully:", response);
    return { id: response.orderId }; // Return the Sanity document ID
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};