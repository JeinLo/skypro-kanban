import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchTasks, editTask } from "../services/api";

const StyledMain = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
`;

function MainPage({ loading, token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    async function loadTasks() {
      try {
        console.log("Loading tasks with token:", token);
        const tasks = await fetchTasks({ token });
        setTasks(tasks || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Load tasks error:", err.message);
        setError(err.message || "Ошибка загрузки задач");
        setIsLoading(false);
        if (err.message.includes("401")) {
          setError("Требуется авторизация");
        }
      }
    }
    if (token) {
      loadTasks();
    } else {
      setError("Требуется авторизация");
      setIsLoading(false);
    }
  }, [loading, token]);

  // Обработка завершения перетаскивания
  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const statuses = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"];
    const draggedTask = tasks.find((task) => task.id === Number(result.draggableId));

    if (!draggedTask) return;

    const newStatus = destination.droppableId;
    const updatedTask = { ...draggedTask, status: newStatus };

    try {
      await editTask({ token, task: updatedTask, id: draggedTask.id });
      setTasks(
        tasks.map((task) =>
          task.id === draggedTask.id ? updatedTask : task
        )
      );
    } catch (err) {
      setError("Не удалось обновить статус задачи");
      console.error("Error updating task status:", err);
    }
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  const columns = {
    "Без статуса": [],
    "Нужно сделать": [],
    "В работе": [],
    "Тестирование": [],
    "Готово": [],
  };

  tasks.forEach((task) => {
    if (columns[task.status]) {
      columns[task.status].push(task);
    }
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StyledMain>
        {Object.entries(columns).map(([status, columnTasks]) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h3>{status}</h3>
                <div>
                  {columnTasks.map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card {...card} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </StyledMain>
    </DragDropContext>
  );
}

export default MainPage;