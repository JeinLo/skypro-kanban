import React from "react";
import Card from "../Card/Card";
import { StyledColumn, ColumnTitle } from "./Column.styled";

function Column({ title, cards }) {
  return (
    <StyledColumn>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <div>
        {cards.map((card) => (
          <Card
            key={card.id}
            topic={card.topic}
            title={card.title}
            date={card.date}
            id={card.id} // Передаём id в Card
          />
        ))}
      </div>
    </StyledColumn>
  );
}

export default Column;
