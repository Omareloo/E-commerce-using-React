import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useLocation } from 'react-router-dom';
import slid1 from '../../assets/images/slider-image-1.jpeg';
import slid2 from '../../assets/images/slider-image-2.jpeg';
import slid3 from '../../assets/images/slider-image-3.jpeg';

import './home.css';
import Bar from '../../components/Bar/Bar';
import { getCategories } from '../../services/categoryservice';
import { getProducts } from '../../services/productservice';
import Card from '../../components/Card/card';
import CustomPagination from '../../components/Pagenation/CustomPagenation';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, removeCartItem } from '../../redux/slices/cartSlice';
import { addToWishlist, fetchWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import EmptyState from '../../components/EmptyState/EmptyState';

export default function Home() {
  const items = [slid1, slid2, slid3];
  const location = useLocation();
  const { content } = useSelector((state) => state.lang);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const currentKeyword = new URLSearchParams(location.search).get('keyword') || '';

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
    setPage(1);
  }, [currentKeyword]);

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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts(page, currentKeyword);

        if (res && res.results) {
          setProducts(res.results);
          setFilteredProducts(res.results);
          setTotalPages(res.totalPages || 1);
        } else {
          setProducts([]);
          setFilteredProducts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setFilteredProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, currentKeyword]);

  const handleSelectCategory = (catId) => {
    if (catId === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.Category?._id === catId);
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      {!currentKeyword && (
        <div className="imageItems">
          <Slider {...settings}>
            {items.map((item, index) => (
              <div key={index}>
                <img src={item} alt={`slide-${index}`} className="imgSlider" />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {!currentKeyword && <Bar categories={categories} onSelect={handleSelectCategory} />}

      <div className="products">
        {loading ? (
          <p style={{ textAlign: 'center', width: '100%', padding: '20px', fontSize: '18px' }}>
            {content.loading}{' '}
          </p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <Card
              key={p._id}
              product={p}
              onAddToCart={(id) => dispatch(addCartItem({ productId: id, quantity: 1 }))}
              onRemoveFromCart={(id) => dispatch(removeCartItem(id))}
              onAddToFavourite={(id) =>
                dispatch(addToWishlist(id)).then(() => dispatch(fetchWishlist()))
              }
              onRemoveFromFavourite={(id) => dispatch(removeFromWishlist(id))}
              isFav={wishlistItems.some((item) => (item.productId._id || item.productId) === p._id)}
            />
          ))
        ) : (
          <EmptyState keyword={currentKeyword} />
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <CustomPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
}
