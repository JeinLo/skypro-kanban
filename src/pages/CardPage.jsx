import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, editTask, deleteTask } from "../services/api";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Form,
  InputWrapper,
  InputLabel,
<<<<<<< HEAD
  Input,
=======
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
  StatusButton,
  TextareaWrapper,
  TextareaLabel,
  Textarea,
  CalendarWrapper,
  CalendarLabel,
  SelectedDateText,
  ButtonGroup,
  Button,
  Category,
<<<<<<< HEAD
  CategoryWrapper,
=======
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
  FormContent,
} from "./CardPage.styled";
import Calendar from "../components/Calendar/Calendar";

const categories = ["Web Design", "Research", "Copywriting"];
const statuses = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

function CardPage({ token, theme, tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState("Без статуса");

  useEffect(() => {
    if (token) {
      getTask({ id, token })
        .then((data) => {
          setTask(data);
          setTitle(data.title || "");
          setDescription(data.description || "");
          setCategory(data.topic || null);
          setDueDate(data.date ? new Date(data.date) : null);
          setStatus(data.status || "Без статуса");
          console.log("Задача загружена:", data);
        })
        .catch((err) => console.error("Ошибка загрузки задачи:", err.message));
    }
  }, [id, token]);

  if (!task) return null;

  const handleCategoryClick = (cat) => {
    if (isEditing) setCategory(cat === category ? null : cat);
  };

  const handleStatusClick = (newStatus) => {
    if (isEditing && newStatus !== status) {
      setStatus(newStatus);
      const updatedTasks = tasks.map((t) =>
        t._id === task._id ? { ...t, status: newStatus } : t
      );
      setTasks(updatedTasks);
    }
  };

  const handleDateSelect = (date) => {
    if (isEditing) setDueDate(date);
  };

  const handleEdit = (e) => {
<<<<<<< HEAD
    e.preventDefault();
    e.stopPropagation(); // Предотвращаем всплытие события
=======
    e.stopPropagation(); // Предотвращаем всплытие до ModalOverlay
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
    setIsEditing(true);
    console.log("Переход в режим редактирования, текущее состояние:", {
      title,
      description,
      category,
      dueDate,
      status,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    e.stopPropagation();
=======
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
    if (!title.trim() || !category || !dueDate || !token) return;
    editTask({
      id,
      token,
      task: { title, description, topic: category, date: dueDate.toISOString(), status },
    })
      .then((updatedTasks) => {
        setTasks(updatedTasks);
        setIsEditing(false);
        navigate("/");
      })
      .catch((err) => console.error("Ошибка редактирования:", err.message));
  };

<<<<<<< HEAD
  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
=======
  const handleCancel = () => {
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
    setIsEditing(false);
    setTitle(task.title || "");
    setDescription(task.description || "");
    setCategory(task.topic || null);
    setDueDate(task.date ? new Date(task.date) : null);
    setStatus(task.status || "Без статуса");
  };

<<<<<<< HEAD
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
=======
  const handleDelete = () => {
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
    if (window.confirm("Вы уверены, что хотите удалить задачу?") && token) {
      deleteTask({ id, token })
        .then((updatedTasks) => {
          setTasks(updatedTasks);
          navigate("/");
        })
        .catch((err) => {
          if (err.message.includes("Ошибка авторизации")) {
            navigate("/login");
          } else {
            console.error("Ошибка удаления:", err.message);
          }
        });
    }
  };

  return (
<<<<<<< HEAD
    <ModalOverlay
      $isDarkTheme={theme === "dark"}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isEditing) navigate("/");
      }}
    >
      <ModalContent
        $isDarkTheme={theme === "dark"}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle $isDarkTheme={theme === "dark"}>
            {task.title || "Название задачи"}
          </ModalTitle>
=======
    <ModalOverlay $isDarkTheme={theme === "dark"} onClick={(e) => {
      if (e.target === e.currentTarget && !isEditing) navigate("/"); // Перенаправление только вне модального окна и не в режиме редактирования
    }}>
      <ModalContent $isDarkTheme={theme === "dark"} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle $isDarkTheme={theme === "dark"}>{task.title || "Название задачи"}</ModalTitle>
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
          {category && (
            <Category $isDarkTheme={theme === "dark"} $isActive={true}>
              {category}
            </Category>
          )}
        </ModalHeader>
        <Form $isDarkTheme={theme === "dark"} onSubmit={handleSave}>
          <InputWrapper>
            <InputLabel $isDarkTheme={theme === "dark"}>Статус</InputLabel>
            {isEditing ? (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {statuses.map((stat) => (
                  <StatusButton
                    key={stat}
                    $isActive={stat === status}
                    $isDarkTheme={theme === "dark"}
                    onClick={() => handleStatusClick(stat)}
                    type="button"
                    disabled={!isEditing}
                  >
                    {stat}
                  </StatusButton>
                ))}
              </div>
            ) : (
              <StatusButton
                $isActive={true}
                $isDarkTheme={theme === "dark"}
                disabled={!isEditing}
<<<<<<< HEAD
=======
                style={{ backgroundColor: "#94A6BE", color: "#fff", width: "200px" }}
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
              >
                {status}
              </StatusButton>
            )}
          </InputWrapper>
          <FormContent>
<<<<<<< HEAD
            <div style={{ flex: 1 }}>
              <InputWrapper>
                <InputLabel $isDarkTheme={theme === "dark"}>
                  Название задачи
                </InputLabel>
                <Input
                  $isDarkTheme={theme === "dark"}
                  type="text"
                  value={title}
                  onChange={(e) => isEditing && setTitle(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Название задачи"
                />
              </InputWrapper>
              <TextareaWrapper>
                <InputLabel $isDarkTheme={theme === "dark"}>
                  Описание задачи
                </InputLabel>
                <Textarea
                  $isDarkTheme={theme === "dark"}
                  value={description}
                  onChange={(e) => isEditing && setDescription(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Введите описание задачи..."
                />
              </TextareaWrapper>
            </div>
=======
            <TextareaWrapper>
              <TextareaLabel $isDarkTheme={theme === "dark"}>Описание задачи</TextareaLabel>
              <Textarea
                $isDarkTheme={theme === "dark"}
                value={description}
                onChange={(e) => isEditing && setDescription(e.target.value)}
                disabled={!isEditing}
                placeholder="Введите описание задачи..."
              />
            </TextareaWrapper>
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
            <CalendarWrapper>
              <CalendarLabel $isDarkTheme={theme === "dark"}>Даты</CalendarLabel>
              <Calendar
                value={dueDate}
                onChange={handleDateSelect}
                $isDarkTheme={theme === "dark"}
                disabled={!isEditing}
              />
              <SelectedDateText $isDarkTheme={theme === "dark"}>
                {dueDate
                  ? `Срок исполнения: ${dueDate.toLocaleDateString("ru-RU")}`
                  : "Срок исполнения"}
              </SelectedDateText>
            </CalendarWrapper>
          </FormContent>
<<<<<<< HEAD
          {isEditing && (
            <CategoryWrapper>
              <InputLabel $isDarkTheme={theme === "dark"}>Категории</InputLabel>
              <div style={{ display: "flex", gap: "10px" }}>
                {categories.map((cat) => (
                  <Category
                    key={cat}
                    $isActive={cat === category}
                    $isDarkTheme={theme === "dark"}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </Category>
                ))}
              </div>
            </CategoryWrapper>
          )}
          <ButtonGroup>
            {!isEditing ? (
              <>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={handleEdit}
                  $isSecondary
                >
                  Редактировать задачу
                </Button>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={handleDelete}
                  $isSecondary
                >
                  Удалить задачу
                </Button>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={() => navigate("/")}
                  $isClose
                >
=======
          <ButtonGroup>
            {!isEditing ? (
              <>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={handleEdit} $isSecondary>
                  Редактировать задачу
                </Button>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={handleDelete} $isSecondary>
                  Удалить задачу
                </Button>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={() => navigate("/")} $isClose>
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
                  Закрыть
                </Button>
              </>
            ) : (
              <>
<<<<<<< HEAD
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="submit"
                >
                  Сохранить
                </Button>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={handleCancel}
                  $isCancel
                >
                  Отменить
                </Button>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={handleDelete}
                  $isSecondary
                >
                  Удалить задачу
                </Button>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={() => navigate("/")}
                  $isClose
                >
=======
                <Button $isDarkTheme={theme === "dark"} type="submit">
                  Сохранить
                </Button>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={handleCancel} $isCancel>
                  Отменить
                </Button>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={handleDelete} $isSecondary>
                  Удалить задачу
                </Button>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={() => navigate("/")} $isClose>
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
                  Закрыть
                </Button>
              </>
            )}
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CardPage;