import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")!).render(
	<HelmetProvider>
		<CartProvider>
			<WishlistProvider>
				<App />
			</WishlistProvider>
		</CartProvider>
	</HelmetProvider>
);
