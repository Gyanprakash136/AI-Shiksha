import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./contexts/CartContext.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
    <CartProvider>
        <App />
        <Toaster position="top-right" richColors />
    </CartProvider>
);
