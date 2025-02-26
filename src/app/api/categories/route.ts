import { NextResponse } from 'next/server';

// Sample categories data - replace with your actual data source or database query
const categories = [
    {
      _id: 'cat_biryani',
      title: 'Tikka Biryani',
      description: 'Flavorful rice dish made with aromatic spices and meat/vegetables',
      imageUrl: '/images/categories/biryani.jpg'
    },
    {
      _id: 'cat_pulao',
      title: 'Pulao',
      description: 'Fragrant rice with meat cooked in special Hyderabadi style',
      imageUrl: '/images/categories/pulao.jpg'
    },
    {
      _id: 'cat_extras',
      title: 'Extras',
      description: 'Additional side items to complement your meal',
      imageUrl: '/images/categories/extras.jpg'
    },
    {
      _id: 'cat_drinks',
      title: 'Cold Drinks',
      description: 'Refreshing beverages to enjoy with your meal',
      imageUrl: '/images/categories/drinks.jpg'
    },
    {
      _id: 'cat_desserts',
      title: 'Desserts',
      description: 'Sweet treats to finish your meal',
      imageUrl: '/images/categories/desserts.jpg'
    },
    {
      _id: 'cat_sides',
      title: 'Sides',
      description: 'Side dishes including Raita and Salad',
      imageUrl: '/images/categories/sides.jpg'
    },
    {
      _id: 'cat_deals',
      title: 'Deals',
      description: 'Special value meal combinations',
      imageUrl: '/images/categories/deals.jpg'
    }
  ];

export async function GET() {
  try {
    // Here you would typically fetch categories from your database
    // For demonstration, we're using the sample data above
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}