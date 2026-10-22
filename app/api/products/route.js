import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fallbackProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // If Prisma/DB isn't configured, fall back gracefully to the embedded data
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(fallbackProducts);
    }
    
    // Attempt DB fetch
    const products = await prisma.product.findMany({
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    // If DB is empty, use the fallback list
    if (!products.length) {
      return NextResponse.json(fallbackProducts);
    }

    // Map Prisma schema to the expected frontend format
    const formattedProducts = products.map((p) => {
      // Group variants to get sizes and colors
      const sizes = [...new Set(p.variants.map((v) => v.size).filter(Boolean))];
      const colors = [...new Set(p.variants.map((v) => v.color).filter(Boolean))];
      
      // Calculate total inventory
      const inventory = p.variants.reduce((sum, v) => sum + v.stock, 0);
      
      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.category,
        collection: p.collection || p.category,
        price: Number(p.price),
        salePrice: p.salePrice ? Number(p.salePrice) : null,
        discount: p.salePrice ? Math.round((1 - Number(p.salePrice) / Number(p.price)) * 100) : 0,
        rating: 4.8, // Would come from a reviews table in production
        reviews: 124,
        color: colors[0] || '—',
        colors,
        sizes,
        inventory,
        description: p.description,
        image: p.images[0] || 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
        accent: p.accentColor || '#d5c4a5',
      };
    });

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('API Error:', error);
    // On connection failure, fallback to local data rather than breaking the app
    return NextResponse.json(fallbackProducts);
  }
}
