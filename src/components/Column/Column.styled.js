import styled, { css, keyframes } from "styled-components";

export const ColumnMain = styled.div`
  width: 20%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
  

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 15px 0;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin-bottom: 15px;

  p {
    color: #94A6BE;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
`;