import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SHeader = styled.header`
  background-color: ${props => props.theme.modalBackground};
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
`;

export const Logo = styled.div`
  img {
    height: 24px;
    width: auto;
    transition: filter 0.3s;
  }
`;

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledTaskLink = styled(Link)`
  background-color: #565EEF; // Восстановлено из старой версии
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 16px;
  display: inline-block;
  transition: background-color 0.3s;
  &:hover {
    background-color: #3f53d8; // Восстановлено из старой версии
  }
`;

export const StyledUserLink = styled.div`
  color: ${props => props.theme.primary};
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s, text-decoration 0.3s;
  &:hover {
    color: ${props => props.theme.primaryHover};
    text-decoration: underline;
  }
  &:after {
    content: url('data:image/svg+xml;utf8,<svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.08955 1.13726C0.840306 0.891094 0.437472 0.891094 0.188227 1.13726C-0.0627424 1.38514 -0.0627423 1.78832 0.188227 2.03619L2.87162 4.68647C3.35849 5.16734 4.14151 5.16734 4.62838 4.68647L7.31177 2.03619C7.56274 1.78832 7.56274 1.38514 7.31177 1.13726C7.06253 0.891095 6.65969 0.891094 6.41045 1.13726L3.75 3.76489L1.08955 1.13726Z" fill="%23565EEF"/></svg>');
    width: 8px;
    height: 6px;
    padding: 0 0 15px;
    transition: filter 0.3s;
  }
`;