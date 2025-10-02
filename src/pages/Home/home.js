import { useEffect, useState } from "react";
import Slider from "react-slick";
import slid1 from "../../assets/images/slider-image-1.jpeg";
import slid2 from "../../assets/images/slider-image-2.jpeg";
import slid3 from "../../assets/images/slider-image-3.jpeg";

import "./home.css";
import Bar from "../../components/Bar/Bar";
import { getCategories } from "../../services/categoryservice";
import { getProducts } from "../../services/productservice";
import Card from "../../components/Card/card";
export default function Home() {
  const items = [slid1, slid2, slid3];
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
  };
useEffect(() => {
  const fetchCats = async () => {
    const res = await getCategories();
    console.log("Categories response:", res); 
    if (res && res.success) {
      setCategories(res.data);
    }
   
    else if (Array.isArray(res)) {
      setCategories(res);
    }
  };
  fetchCats();
}, []);


  // 2. هات كل المنتجات
 useEffect(() => {
  const fetchProducts = async () => {
    const res = await getProducts();
    console.log("Products response:", res); // Debug

    // لو الـ service بيرجع object فيه success + data
    if (res && res.success) {
      setProducts(res.data);
      setFilteredProducts(res.data);
    }
    // لو بيرجع Array على طول
    else if (Array.isArray(res)) {
      setProducts(res);
      setFilteredProducts(res);
    }
  };
  fetchProducts();
}, []);


  // 3. الفلترة حسب الكاتيجوري
const handleSelectCategory = (catId) => {
  if (catId === "all") {
    setFilteredProducts(products);
  } else {
    const filtered = products.filter((p) => p.Category?._id === catId);
    setFilteredProducts(filtered);
  }
};



  return (
    <>
      <div className="imageItems">
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index}>
              <img src={item} alt={`slide-${index}`} className="imgSlider" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Bar */}
   
      <Bar
  categories={categories}   
  onSelect={handleSelectCategory}
/>
  <div className="products">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((p) => (
          <Card
            key={p._id}
            product={p}
          />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
    </>
  );
}
