import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid ${({ $isDarkTheme }) => ($isDarkTheme ? '#444' : '#f3f3f3')};
  border-top: 4px solid ${({ $isDarkTheme }) => ($isDarkTheme ? '#fff' : '#565eef')};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? '#fff' : '#000')};
  text-align: center;
`;

function LoadingSpinner({ theme }) {
  return (
    <div>
      <Spinner $isDarkTheme={theme === 'dark'} />
      <LoadingText $isDarkTheme={theme === 'dark'}>Загрузка...</LoadingText>
    </div>
  );
}

export default LoadingSpinner;