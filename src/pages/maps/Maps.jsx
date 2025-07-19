import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Maps.css";

import Slider from "react-slick";

const cs2Maps = [
  {
    name: "Dust II",
    image: "/dust2.webp",
  },
  {
    name: "Mirage",
    image: "/mirage.png",
  },
  {
    name: "Inferno",
    image: "/inferno.jpeg",
  },
  {
    name: "Nuke",
    image: "/nuke.jpeg",
  },
  {
    name: "Ancient",
    image: "/ancient.png",
  },
  {
    name: "Anubis",
    image: "/anubis.jpeg",
  },
  {
    name: "Overpass",
    image: "/overpass.jpeg",
  },
  {
    name: "Train",
    image: "/train.jpeg",
  },
];

const Maps = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

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
    // TODO: Find out why the dots and arrows and whatnot don't show
    dots: false,
    infinite: false,
    speed: 300,
    rows: 2,
    slidesPerRow: 1,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="map-carousel">
      <h2>Select a Map</h2>
      <Slider ref={sliderRef} {...settings}>
        {cs2Maps.map((map) => (
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
  );
};

export default Maps;
