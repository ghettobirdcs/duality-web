import React from "react";

const SetupTile = ({ setup, loadSetup, index }) => {
  return (
    <div
      className="setup__animation"
      data-aos="flip-up"
      data-aos-delay={`${index * 100}`}
    >
      <li
        key={setup.id}
        className="setup"
        onClick={() => loadSetup(setup)}
        style={{
          backgroundImage: `url(${setup.early.tacmap})` || "",
          backgroundSize: "contain",
        }}
      >
        <div className="setup__info">
          <p className="setup__info--title">
            {setup.title || "Untitled Setup"}
          </p>
          <p className="setup__info--author">Last Edit: {setup.createdBy}</p>
        </div>
      </li>
    </div>
  );
};

export default SetupTile;
