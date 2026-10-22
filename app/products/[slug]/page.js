import ProductDetailPage from '@/components/ProductDetailPage';

export function generateMetadata({ params }) {
  const productName = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return {
    title: productName,
  };
}

export default function ProductPage({ params }) {
  return <ProductDetailPage slug={params.slug} />;
}
