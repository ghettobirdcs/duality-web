import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { auth } from "../../firebase/init";
import PlayerItem from "./PlayerItem";
import "./Players.css";

import { NextArrow } from "../SliderArrows/SliderArrows";
import { PrevArrow } from "../SliderArrows/SliderArrows";

const Players = ({ players, loading, fetchPlayers }) => {
  const sliderRef = useRef(null);

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
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    const sliderNode = sliderRef.current.innerSlider.list;
    sliderNode.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      sliderNode.removeEventListener("wheel", handleWheel);
    };
  });

  const handleWheel = (event) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      sliderRef.current.slickNext();
    } else {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="players__container">
      <h2>The Roster:</h2>
      <Slider ref={sliderRef} {...settings}>
        {loading
          ? new Array(8).fill(0).map(() => (
              <li className="player__item player__item--skeleton">
                <FontAwesomeIcon icon="spinner" className="player__spinner" />
              </li>
            ))
          : players.map((player, index) => (
              <PlayerItem
                key={player.id}
                player={player}
                index={index}
                currentUserId={auth.currentUser?.uid}
                fetchPlayers={fetchPlayers}
              />
            ))}
      </Slider>
    </div>
  );
};

export default Players;
