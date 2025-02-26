import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { NotificationsProvider } from "@/context/NotificationContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Al Rehman Haiderabadi Yakhni Pulao & Biryani Center",
  description: "Haiderabadi Beef Yakhni Pulao & Chicken Tikka Biyani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
              <CartProvider>
        <WishlistProvider>
          <NotificationsProvider>
      <body>
        <ToastProvider>
        {children}
        </ToastProvider>
      </body>
      </NotificationsProvider>
      </WishlistProvider>
      </CartProvider>
    </html>
  );
}
