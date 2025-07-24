import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "../Card/Card";
import {
  StyledColumn,
  StyledTitle,
  StyledCardContainer,
} from "./Column.styled";

function Column({ columnId, title, cards }) {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <StyledColumn {...provided.droppableProps} ref={provided.innerRef}>
          <StyledTitle>{title}</StyledTitle>
          <StyledCardContainer>
            {cards.map((card, index) => (
              <Draggable key={String(card.id)} draggableId={String(card.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card {...card} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </StyledCardContainer>
        </StyledColumn>
      )}
    </Droppable>
  );
}

export default Column;