import '@/styles/globals.css';
import { StoreProvider } from '@/context/StoreContext';

export const metadata = {
  title: {
    default: 'Threadline — Premium T-Shirt Storefront',
    template: '%s | Threadline',
  },
  description: 'A considered wardrobe, built around the pieces you reach for without thinking.',
  keywords: ['t-shirts', 'clothing', 'premium', 'threadline', 'wardrobe'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
