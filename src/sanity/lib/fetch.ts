import { client } from "./client";

export async function getOrderProducts(): Promise<Products[]> {   
    const query = `*[_type == "product" && badge== "Popular" ]{
    _id,
      title,
      price,
      "image" : image.asset->url,
      slug
  }`
    const popularOrderItems = await client.fetch(query);
    return popularOrderItems;
}