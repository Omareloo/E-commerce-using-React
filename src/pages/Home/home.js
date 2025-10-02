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
import CustomPagination from "../../components/Pagenation/CustomPagenation";


export default function Home() {
  const items = [slid1, slid2, slid3];
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  // fetch categories
  useEffect(() => {
    const fetchCats = async () => {
      const res = await getCategories();
      if (res && res.success) {
        setCategories(res.data);
      } else if (Array.isArray(res)) {
        setCategories(res);
      }
    };
    fetchCats();
  }, []);

  // fetch products with pagination
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts(page);
      console.log("Products response:", res);

      if (res && res.results) {
        setProducts(res.results);
        setFilteredProducts(res.results);
        setTotalPages(res.totalPages || 1);
      }
    };
    fetchProducts();
  }, [page]);

  // filter by category
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

      <Bar categories={categories} onSelect={handleSelectCategory} />

      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => <Card key={p._id} product={p} />)
        ) : (
          <p>No products available</p>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <CustomPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
