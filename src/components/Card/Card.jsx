import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  width: 220px;
  height: 130px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin: 5px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTopic = styled.div`
  padding: 5px 10px;
  background-color: #ffe4c2;
  color: #ff6d00;
  border-radius: 18px;
  font-size: 10px;
`;

const StyledMenu = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94a6be;
  }
`;

const StyledCardContent = styled.div`
  margin-top: 10px;
`;

const StyledTitle = styled.h3`
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 10px;
`;

const StyledDate = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 13px;
  }
  p {
    margin-left: 6px;
    font-size: 10px;
    color: #94a6be;
  }
`;

function Card({ topic, title, date }) {
  return (
    <StyledCard>
      <StyledHeader>
        <StyledTopic>{topic}</StyledTopic>
        <StyledMenu>
          <div></div>
          <div></div>
          <div></div>
        </StyledMenu>
      </StyledHeader>
      <StyledCardContent>
        <StyledTitle>{title}</StyledTitle>
        <StyledDate>
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
        </StyledDate>
      </StyledCardContent>
    </StyledCard>
  );
}

export default Card;
