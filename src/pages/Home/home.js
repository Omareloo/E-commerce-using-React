import slid1 from "../../assets/images/slider-image-1.jpeg";
import slid2 from "../../assets/images/slider-image-2.jpeg";
import slid3 from "../../assets/images/slider-image-3.jpeg";



import Slider from "react-slick";


import "./home.css";
import Bar from "../../components/Bar/Bar";

export default function Home() {
  const items = [slid1, slid2, slid3];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // كل 2 ثانية
    dots: true, // النقط تحت السلايدر
    arrows: false, // يخفي الأسهم (ممكن تخليها true لو عايز)
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
    <Bar 
  categories={["Clothes", "Electronics", "Furniture"]} 
  onSelect={(cat) => console.log(cat)} 
/>
 </>
  );
}
