import React from "react";
import styled from "styled-components";

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function Column({ title, cards }) {
  return (
    <StyledColumn>
      <h3>{title}</h3>
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </StyledColumn>
  );
}

export default Column;