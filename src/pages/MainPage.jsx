import styled from "styled-components";
import Main from "../components/Main/Main";
import { useState, useEffect, useCallback } from "react";
import { fetchTasks } from "../services/api";

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

function MainPage({ loading: initialLoading, token }) {
  const [loading, setLoading] = useState(initialLoading);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const getTasks = useCallback(async () => {
    if (!token) {
      setError("Требуется авторизация");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchTasks({ token });
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <StyledMainPage>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      ) : (
        <Main tasks={tasks} />
      )}
    </StyledMainPage>
  );
}

export default MainPage;
