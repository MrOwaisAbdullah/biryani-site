import { NextResponse } from 'next/server';

// Sample products data - replace with your actual data source or database query
const products = [
    // BIRYANI CATEGORY
    {
      _id: 'product_tikka_biryani_250',
      title: 'Tikka Biryani 250gm',
      description: 'Delicious tikka biryani, 250gm serving',
      price: 140,
      imageUrl: '/images/products/tikka_biryani.jpg',
      tags: ['biryani', 'tikka', 'rice'],
      category: { _id: 'cat_biryani', title: 'Tikka Biryani' }
    },
    {
      _id: 'product_tikka_biryani_half',
      title: 'Tikka Biryani Half Kg',
      description: 'Delicious tikka biryani, half kg serving',
      price: 280,
      imageUrl: '/images/products/tikka_biryani.jpg',
      tags: ['biryani', 'tikka', 'rice'],
      category: { _id: 'cat_biryani', title: 'Tikka Biryani' }
    },
    {
      _id: 'product_tikka_biryani_1kg',
      title: 'Tikka Biryani 1 Kg',
      description: 'Delicious tikka biryani, 1kg serving',
      price: 560,
      imageUrl: '/images/products/tikka_biryani.jpg',
      tags: ['biryani', 'tikka', 'rice', 'family size'],
      category: { _id: 'cat_biryani', title: 'Tikka Biryani' }
    },
    {
      _id: 'product_tikka_biryani_sada_250',
      title: 'Tikka Biryani Sada 250gm',
      description: 'Simple tikka biryani without extra spices, 250gm serving',
      price: 100,
      imageUrl: '/images/products/tikka_biryani_sada.jpg',
      tags: ['biryani', 'tikka', 'rice', 'sada', 'mild'],
      category: { _id: 'cat_biryani', title: 'Tikka Biryani' }
    },
    {
      _id: 'product_tikka_biryani_sada_1kg',
      title: 'Tikka Biryani Sada 1 Kg',
      description: 'Simple tikka biryani without extra spices, 1kg serving',
      price: 400,
      imageUrl: '/images/products/tikka_biryani_sada.jpg',
      tags: ['biryani', 'tikka', 'rice', 'sada', 'mild', 'family size'],
      category: { _id: 'cat_biryani', title: 'Tikka Biryani' }
    },
    
    // PULAO CATEGORY
    {
      _id: 'product_beef_yakhni_pulao',
      title: 'Beef Yakhni Pulao',
      description: 'Aromatic beef pulao cooked in bone broth',
      price: 640,
      imageUrl: '/images/products/beef_yakhni_pulao.jpg',
      tags: ['pulao', 'beef', 'yakhni', 'rice'],
      category: { _id: 'cat_pulao', title: 'Pulao' }
    },
    {
      _id: 'product_beef_pulao_1kg',
      title: 'Beef Pulao 1 Kg',
      description: 'Flavorful beef pulao, 1kg serving',
      price: 480,
      imageUrl: '/images/products/beef_pulao.jpg',
      tags: ['pulao', 'beef', 'rice', 'family size'],
      category: { _id: 'cat_pulao', title: 'Pulao' }
    },
    {
      _id: 'product_beef_pulao_750',
      title: 'Beef Pulao 750Gm',
      description: 'Flavorful beef pulao, 750gm serving',
      price: 320,
      imageUrl: '/images/products/beef_pulao.jpg',
      tags: ['pulao', 'beef', 'rice'],
      category: { _id: 'cat_pulao', title: 'Pulao' }
    },
    {
      _id: 'product_beef_pulao_half',
      title: 'Beef Pulao Half kg',
      description: 'Flavorful beef pulao, half kg serving',
      price: 300,
      imageUrl: '/images/products/beef_pulao.jpg',
      tags: ['pulao', 'beef', 'rice'],
      category: { _id: 'cat_pulao', title: 'Pulao' }
    },
    {
      _id: 'product_beef_pulao_single',
      title: 'Beef Pulao Single Plate',
      description: 'Individual serving of beef pulao',
      price: 160,
      imageUrl: '/images/products/beef_pulao.jpg',
      tags: ['pulao', 'beef', 'rice', 'single serving'],
      category: { _id: 'cat_pulao', title: 'Pulao' }
    },
    {
      _id: 'product_beef_pulao_250',
      title: 'Beef Pulao 250gm',
      description: 'Flavorful beef pulao, 250gm serving',
      price: 160,
      imageUrl: '/images/products/beef_pulao.jpg',
      tags: ['pulao', 'beef', 'rice'],
      category: { _id: 'cat_pulao', title: 'Pulao' }
    },
    {
      _id: 'product_sada_pulao_1kg',
      title: 'Sada Pulao 1 Kg',
      description: 'Simple plain rice pulao, 1kg serving',
      price: 400,
      imageUrl: '/images/products/sada_pulao.jpg',
      tags: ['pulao', 'plain', 'rice', 'sada', 'family size'],
      category: { _id: 'cat_pulao', title: 'Pulao' }
    },
    {
      _id: 'product_sada_pulao_750',
      title: 'Sada Pulao 750Gm',
      description: 'Simple plain rice pulao, 750gm serving',
      price: 300,
      imageUrl: '/images/products/sada_pulao.jpg',
      tags: ['pulao', 'plain', 'rice', 'sada'],
      category: { _id: 'cat_pulao', title: 'Pulao' }
    },
    {
      _id: 'product_sada_pulao_half',
      title: 'Sada Pulao Half Kg',
      description: 'Simple plain rice pulao, half kg serving',
      price: 200,
      imageUrl: '/images/products/sada_pulao.jpg',
      tags: ['pulao', 'plain', 'rice', 'sada'],
      category: { _id: 'cat_pulao', title: 'Pulao' }
    },
    {
      _id: 'product_sada_pulao_250',
      title: 'Sada Pulao 250gm',
      description: 'Simple plain rice pulao, 250gm serving',
      price: 100,
      imageUrl: '/images/products/sada_pulao.jpg',
      tags: ['pulao', 'plain', 'rice', 'sada'],
      category: { _id: 'cat_pulao', title: 'Pulao' }
    },
    
    // EXTRAS CATEGORY
    {
      _id: 'product_badami_kheer',
      title: 'Badami Kheer',
      description: 'Sweet almond rice pudding',
      price: 120,
      imageUrl: '/images/products/badami_kheer.jpg',
      tags: ['dessert', 'sweet', 'kheer', 'almond'],
      category: { _id: 'cat_desserts', title: 'Desserts' }
    },
    {
      _id: 'product_extra_fried_onion',
      title: 'Extra Fried Onion',
      description: 'Crispy fried onions to top your biryani or pulao',
      price: 30,
      imageUrl: '/images/products/fried_onion.jpg',
      tags: ['extras', 'fried', 'onion', 'topping'],
      category: { _id: 'cat_extras', title: 'Extras' }
    },
    {
      _id: 'product_extra_chicken_tikka',
      title: 'Extra Chicken Tikka Piece',
      description: 'Additional marinated and grilled chicken tikka piece',
      price: 50, // Estimated price
      imageUrl: '/images/products/chicken_tikka.jpg',
      tags: ['extras', 'chicken', 'tikka', 'grilled'],
      category: { _id: 'cat_extras', title: 'Extras' }
    },
    {
      _id: 'product_extra_beef_boti',
      title: 'Extra Beef Boti',
      description: 'Additional tender beef boti pieces',
      price: 60, // Estimated price
      imageUrl: '/images/products/beef_boti.jpg',
      tags: ['extras', 'beef', 'boti'],
      category: { _id: 'cat_extras', title: 'Extras' }
    },
    
    // SIDES CATEGORY
    {
      _id: 'product_raita',
      title: 'Raita',
      description: 'Yogurt-based side dish with mild spices',
      price: 40,
      imageUrl: '/images/products/raita.jpg',
      tags: ['side', 'yogurt', 'raita'],
      category: { _id: 'cat_sides', title: 'Sides' }
    },
    {
      _id: 'product_salad',
      title: 'Salad',
      description: 'Fresh vegetable salad',
      price: 50,
      imageUrl: '/images/products/salad.jpg',
      tags: ['side', 'fresh', 'vegetables', 'salad'],
      category: { _id: 'cat_sides', title: 'Sides' }
    },
    
    // DRINKS CATEGORY
    {
      _id: 'product_cold_drink',
      title: 'Cold Drink',
      description: 'Refreshing soft drink',
      price: 40, // Estimated price
      imageUrl: '/images/products/cold_drink.jpg',
      tags: ['beverage', 'soft drink', 'cold'],
      category: { _id: 'cat_drinks', title: 'Cold Drinks' }
    },
    {
      _id: 'product_mineral_water',
      title: 'Mineral Water',
      description: 'Bottled mineral water',
      price: 30, // Estimated price
      imageUrl: '/images/products/mineral_water.jpg',
      tags: ['beverage', 'water', 'mineral'],
      category: { _id: 'cat_drinks', title: 'Cold Drinks' }
    },
    
    // DEALS CATEGORY
    {
      _id: 'product_family_deal',
      title: 'Family Deal',
      description: '1kg Biryani, 4 Cold Drinks, Raita and Salad',
      price: 800, // Estimated price
      imageUrl: '/images/products/family_deal.jpg',
      tags: ['deal', 'family', 'combo', 'value'],
      category: { _id: 'cat_deals', title: 'Deals' }
    },
    {
      _id: 'product_couple_deal',
      title: 'Couple Deal',
      description: 'Half kg Biryani, 2 Cold Drinks, Raita and Salad',
      price: 450, // Estimated price
      imageUrl: '/images/products/couple_deal.jpg',
      tags: ['deal', 'couple', 'combo', 'value'],
      category: { _id: 'cat_deals', title: 'Deals' }
    }
  ];

export async function GET() {
  try {
    // Create slug objects for each product
    const formattedProducts = products.map(product => {
      const slug = {
        _type: 'slug',
        current: product.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
      };
      
      return {
        ...product,
        slug
      };
    });
    
    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}