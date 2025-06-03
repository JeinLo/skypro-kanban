import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { fetchTaskById, editTask, deleteTask } from "../services/api";

const StyledCardPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #eaeef6;
`;

const StyledCardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledCardContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const StyledTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  height: 100px;
`;

const StyledButton = styled.button`
  background-color: #28a745;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const StyledDeleteButton = styled(StyledButton)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

function CardPage({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "",
    date: "",
    status: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      if (!token) {
        setError("Требуется авторизация");
        setLoading(false);
        return;
      }
      try {
        const taskData = await fetchTaskById({ token, id });
        setTask(taskData);
        setFormData({
          title: taskData.title,
          description: taskData.description || "",
          topic: taskData.topic,
          date: new Date(taskData.date).toISOString().split("T")[0],
          status: taskData.status,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTask();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.topic ||
      !formData.date ||
      !formData.status
    ) {
      setError("Заполните все поля");
      return;
    }
    try {
      await editTask({ token, id, task: formData });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить задачу?")) return;
    try {
      await deleteTask({ token, id });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <StyledCardPage>
        <div>Loading...</div>
      </StyledCardPage>
    );
  }

  if (!task) {
    return (
      <StyledCardPage>
        <StyledCardTitle>Карточка не найдена</StyledCardTitle>
        <StyledCardContent>
          <p>{error || `Карточка с ID: ${id} не существует.`}</p>
        </StyledCardContent>
      </StyledCardPage>
    );
  }

  return (
    <StyledCardPage>
      <StyledCardTitle>Карточка #{id}</StyledCardTitle>
      <StyledCardContent>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            name="title"
            placeholder="Название задачи"
            value={formData.title}
            onChange={handleChange}
          />
          <StyledTextarea
            name="description"
            placeholder="Описание задачи"
            value={formData.description}
            onChange={handleChange}
          />
          <StyledInput
            type="text"
            name="topic"
            placeholder="Категория"
            value={formData.topic}
            onChange={handleChange}
          />
          <StyledInput
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <StyledInput
            type="text"
            name="status"
            placeholder="Статус"
            value={formData.status}
            onChange={handleChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <StyledButton type="submit">Сохранить</StyledButton>
          <StyledDeleteButton type="button" onClick={handleDelete}>
            Удалить
          </StyledDeleteButton>
        </StyledForm>
      </StyledCardContent>
    </StyledCardPage>
  );
}

export default CardPage;
