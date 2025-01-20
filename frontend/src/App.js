import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NewsletterSignup from "./components/NewsletterSignup";
import ProductCategories from "./components/ProductCategories";
import CategorizedProducts from "./components/CategorizedProducts"; // Import CategorizedProducts
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ProductProvider } from "./context/ProductContext";
import Wishlist from "./components/Wishlist";
import { CategoriesProvider } from "./context/CategoriesContext";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <div className="App">
      <CategoriesProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <BrowserRouter>
                <Navbar />
                <MainContent />
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </CategoriesProvider>
    </div>
  );
}

// Separate component to handle conditional rendering of Newsletter
function MainContent() {
  const location = useLocation();
  const hideNewsletterOnRoutes = ["/adminDashboard"]; // Routes where NewsletterSignup is hidden

  const shouldShowNewsletter = !hideNewsletterOnRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        {/* Define individual routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/categories" element={<ProductCategories />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminDashboard" element={<AdminPanel />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Dynamic route for categorized products */}
        <Route path="/category/:categoryId" element={<CategorizedProducts />} />

        {/* Add a fallback route for undefined paths */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>

      {/* Conditionally render Newsletter */}
      {shouldShowNewsletter && <NewsletterSignup />}

      {/* Always show Footer */}
      <Footer />
    </>
  );
}

export default App;
