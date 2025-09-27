import { useState, useEffect } from "react";
import axios from "axios";
import ProductTable from "../../../components/DashBoardComp/ProductTable.jsx/producttable";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/Products");
      // المنتجات جاية في res.data.results
      setProducts(res.data.results || []);
    } catch (err) {
      console.error("Fetch products error:", err);
      setProducts([]); // fallback علشان مينفعش map على undefined
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ProductTable products={products} />
    </div>
  );
}
