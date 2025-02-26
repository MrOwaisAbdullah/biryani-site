import { NextResponse } from 'next/server';

const categoriesData = [
  {
    "_id": "b5710116-09af-4d0e-aa9a-dcd02fe919a9",
    "title": "Desk Chair",
    "description": "Collection of modern desk chairs for your workspace",
    "imageUrl": "https://example.com/categories/desk-chair.jpg"
  },
  {
    "_id": "26fd7176-3c4d-40fc-a73a-3b85a9b5e15f",
    "title": "Wing Chair",
    "description": "Elegant and comfortable wing chairs for your living room",
    "imageUrl": "https://example.com/categories/wing-chair.jpg"
  },
  {
    "_id": "407a8583-6203-4f61-becf-8e8b4c5461b6",
    "title": "Wooden Chair",
    "description": "Traditional and rustic wooden chairs",
    "imageUrl": "https://example.com/categories/wooden-chair.jpg"
  }
];

export async function GET() {
  try {
    return NextResponse.json(categoriesData, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories data' },
      { status: 500 }
    );
  }
}