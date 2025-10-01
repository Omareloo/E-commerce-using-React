import React from "react";
import Slider from "react-slick";

export default function SimpleSlider({ items }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
   
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index}>
            <img src={item} alt={`slide-${index}`} className="w-100" />
          </div>
        ))}
      </Slider>
 
  );
}