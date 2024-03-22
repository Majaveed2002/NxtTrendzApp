import AllProductsSection from "../../components/AllProductsSection";
import PrimeDealsSection from "../../components/PrimeDealsSection";

import Header from "../../components/Header";

import "./index.css";

const Products = () => (
  <>
    <Header />
    <div className="product-sections">
      <PrimeDealsSection />
      <AllProductsSection />
    </div>
  </>
);

export default Products;
