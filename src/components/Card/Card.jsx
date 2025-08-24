import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import CardDetail from "../CardDetail/CardDetail";
import {
  CardItem,
  CardStyled,
  CardGroup,
  CardTheme,
  CardButton,
  CardContent,
  CardTitle,
  CardDate,
} from "./Card.styled";

function Card({ card, index, theme, token, onDeleteTask }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getThemeType = (topic) => {
    switch (topic) {
      case "Web Design":
        return "_orange";
      case "Research":
        return "_green";
      case "Copywriting":
        return "_purple";
      default:
        return "_default";
    }
  };

  const formattedDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear().toString().slice(-2)}`;
  };

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided) => (
        <CardItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardStyled onClick={() => setIsDetailOpen(true)} theme={theme}>
            <CardGroup>
              <CardTheme themeType={getThemeType(card.topic)}>
                <p>{card.topic}</p>
              </CardTheme>
              <CardButton onClick={(e) => { e.stopPropagation(); setIsDetailOpen(true); }}>
                <div></div>
                <div></div>
                <div></div>
              </CardButton>
            </CardGroup>
            <CardContent>
              <CardTitle>{card.title}</CardTitle>
              <CardDate>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1_135)">
                    <path d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z" stroke="#94A6BE" stroke-width="0.8" stroke-linejoin="round"/>
                    <path d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z" stroke="#94A6BE" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1_135">
                      <rect width="13" height="13" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <p>{formattedDate(card.date)}</p>
              </CardDate>
            </CardContent>
          </CardStyled>
          <CardDetail
            task={card}
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            onUpdate={(updatedTask) => {
              // Здесь можно добавить логику обновления задачи
              console.log("Task updated:", updatedTask);
            }}
            onDelete={() => onDeleteTask(card._id)}
            theme={theme}
            token={token}
          />
        </CardItem>
      )}
    </Draggable>
  );
}

export default Card;