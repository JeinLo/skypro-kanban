import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Link } from "react-router-dom";
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

function Card({ card, index, token }) {
  const formattedDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${d.getFullYear().toString().slice(-2)}`;
  };

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided) => (
        <CardItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link to={`/cardview/${card._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <CardStyled>
              <CardGroup>
                <CardTheme $category={card.topic || 'default'}>
                  <p>{card.topic || 'Без категории'}</p>
                </CardTheme>
                <CardButton>
                  <div></div>
                  <div></div>
                  <div></div>
                </CardButton>
              </CardGroup>
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardDate>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1_135)">
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
                    </g>
                    <defs>
                      <clipPath id="clip0_1_135">
                        <rect width="13" height="13" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p>{card.date ? formattedDate(card.date) : "Без даты"}</p>
                </CardDate>
              </CardContent>
            </CardStyled>
          </Link>
        </CardItem>
      )}
    </Draggable>
  );
}

export default Card;