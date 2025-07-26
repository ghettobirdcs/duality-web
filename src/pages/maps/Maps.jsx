import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Maps.css";

import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-arrow next" onClick={onClick}>
      ➡
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev" onClick={onClick}>
      ⬅
    </div>
  );
}

const Maps = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSlides(cs2Maps);

    setTimeout(() => {
      setLoading(false);
    }, 200);
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
    // TODO: Customize dots and arrow buttons
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
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
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
              {loading ? (
                <div className="map-image map-image__skeleton">
                  <FontAwesomeIcon
                    icon="spinner"
                    className="map-image__spinner"
                  />
                </div>
              ) : (
                <>
                  <img
                    src={map.image}
                    alt={map.name}
                    className="map-image"
                    onClick={() => navigate(`/maps/${map.name}`)}
                  />
                </>
              )}
              <h3>{map.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Maps;
