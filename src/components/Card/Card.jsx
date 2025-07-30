import React from "react";
import { Draggable } from "@hello-pangea/dnd";
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

function Card({ topic, title, date, id, index }) {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <CardItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardStyled>
            <CardGroup>
              <CardTheme
                themeType={
                  topic === "Web Design"
                    ? "_orange"
                    : topic === "Research"
                    ? "_green"
                    : topic === "Copywriting"
                    ? "_purple"
                    : "_default"
                }
              >
                <p>{topic}</p>
              </CardTheme>
              <CardButton href={`/card/${id}`} target="_self">
                <div></div>
                <div></div>
                <div></div>
              </CardButton>
            </CardGroup>
            <CardContent>
              <CardTitle href={`/card/${id}`}>{title}</CardTitle>
              <CardDate>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <path
                    d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                    stroke="#94A6BE"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                    stroke="#94A6BE"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>{date}</p>
              </CardDate>
            </CardContent>
          </CardStyled>
        </CardItem>
      )}
    </Draggable>
  );
}

export default Card;
