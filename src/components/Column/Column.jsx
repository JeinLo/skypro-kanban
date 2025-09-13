import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Card from '../Card/Card';
import { ColumnStyled, ColumnTitle } from './Column.styled';

function Column({ title, cards, columnId, theme, token }) {
  const filteredCards = cards.filter(
    (card) => card.status?.toLowerCase() === title.toLowerCase()
  );

  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <ColumnStyled
          $isDraggingOver={snapshot.isDraggingOver}
          ref={provided.innerRef}
          {...provided.droppableProps}
          theme={theme}
        >
          <ColumnTitle theme={theme}>{title}</ColumnTitle>
          {filteredCards.map((card, index) => (
            <Card
              key={card._id}
              card={card}
              index={index}
              theme={theme}
              token={token}
            />
          ))}
          {provided.placeholder}
        </ColumnStyled>
      )}
    </Droppable>
  );
}

export default Column;