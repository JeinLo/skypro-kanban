import React from "react";
import Card from "../Card/Card";

function Column({ title, cards }) {
  return (
    <div className="column">
      <h3>{title}</h3>
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}

export default Column;
