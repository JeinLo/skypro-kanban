import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import Card from "../Card/Card";
import { ColumnMain, ColumnTitle, Cards } from "./Column.styled";

function Column({ columnId, title, cards, theme, token }) {
  const validStatuses = [
    "без статуса",
    "нужно сделать",
    "в работе",
    "тестирование",
    "готово",
  ].map((status) => status.toLowerCase());

  const filteredCards = cards.filter((card) =>
    card.status && validStatuses.includes(card.status.toLowerCase())
  );

  console.log(`Рендер Column "${title}", filteredCards:`, filteredCards);

  return (
    <ColumnMain $column={{ theme }}>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <Cards ref={provided.innerRef} {...provided.droppableProps}>
            {filteredCards
              .filter((card) => card.status.toLowerCase() === title.toLowerCase())
              .map((card, index) => (
                <Card
                  key={card._id}
                  card={card}
                  index={index}
                  theme={theme}
                  token={token}
                />
              ))}
            {provided.placeholder}
          </Cards>
        )}
      </Droppable>
    </ColumnMain>
  );
}

export default Column;