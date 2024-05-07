import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "../../assets/css/carousel.css";
import img1 from '../../assets/img/carousel/bg1.jpg';
import img2 from '../../assets/img/carousel/bg2.jpg';
import img3 from '../../assets/img/carousel/bg3.jpg';
import PropTypes from "prop-types";

export const Carousel = ({ data = [img1, img2, img3] }) => {

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % data.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer); // Clear interval on component unmount
  }, [data]);
  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="parent" id="accueil">
      <div className="carousel">
        <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
        {data.map((item, idx) => {
          return (
            <img
              src={item.src}
              alt={item.alt}
              key={idx}
              className={slide === idx ? "slide" : "slide slide-hidden"}
            />
          );
        })}
        <BsArrowRightCircleFill
          onClick={nextSlide}
          className="arrow arrow-right"
        />
        
      </div>
    </div>
  );
};
Carousel.propTypes = {
  data: PropTypes.array.isRequired,
};