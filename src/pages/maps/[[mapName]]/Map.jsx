import React from "react";
import "./Map.css";

import { useParams } from "react-router-dom";

const Map = () => {
  const { mapName } = useParams();

  return (
    <>
      <h1 className="map__title">{mapName}</h1>
      {/* T / CT Picker */}
      {/* Type of setup Picker (E.G. Default, Force buy, etc...) */}
      {/* query for setups: pick the first one; paginate through the rest */}
      {/* Time adjust for specific setup (E.G. Early round, mid round, late round) */}
      {/* Tacmap of setup */} {/* Click on a player --> show details */}
      {/* Description of setup */}
    </>
  );
};

export default Map;
