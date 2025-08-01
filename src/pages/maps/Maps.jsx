import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Maps.css";

import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  NextArrow,
  PrevArrow,
} from "../../components/SliderArrows/SliderArrows";

const cs2Maps = [
  {
    name: "Dust II",
    image: "/de_dust2.png",
  },
  {
    name: "Mirage",
    image: "/de_mirage.png",
  },
  {
    name: "Inferno",
    image: "/de_inferno.png",
  },
  {
    name: "Nuke",
    image: "/de_nuke.png",
  },
  {
    name: "Ancient",
    image: "/de_ancient.png",
  },
  {
    name: "Anubis",
    image: "/de_anubis.png",
  },
  {
    name: "Overpass",
    image: "/de_overpass.png",
  },
  {
    name: "Train",
    image: "/de_train.png",
  },
];

const Maps = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    setSlides(cs2Maps);
  }, []);

  const handleWheel = (event) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      sliderRef.current.slickNext();
    } else {
      sliderRef.current.slickPrev();
    }
  };

  useEffect(() => {
    const sliderNode = sliderRef.current.innerSlider.list;
    sliderNode.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      sliderNode.removeEventListener("wheel", handleWheel);
    };
  });

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    rows: 2,
    slidesPerRow: 1,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Link to={`/`}>
        <div className="back__container" style={{ color: "white" }}>
          <FontAwesomeIcon icon="arrow-left" size="xl" />
          <span className="back-text">Back</span>
        </div>
      </Link>
      <div className="map-carousel">
        <h2>Select a Map</h2>
        <Slider ref={sliderRef} {...settings}>
          {slides.map((map) => (
            <div key={map.name} className="map-slide">
              <img
                src={map.image}
                alt={map.name}
                className="map-image"
                onClick={() => navigate(`/maps/${map.name}`)}
              />
              <h3>{map.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Maps;
