import React from "react";
import Card from "../Card/Card";
import "../../App.css";

function Column({ title }) {
  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">
        <Card />
      </div>
    </div>
  );
}

export default Column;
