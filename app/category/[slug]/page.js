import ListingPage from '@/components/ListingPage';

export function generateMetadata({ params }) {
  const categoryName = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return {
    title: categoryName,
  };
}

export default function CategoryPage({ params }) {
  return <ListingPage categorySlug={params.slug} />;
}
