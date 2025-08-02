import React, { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  Input,
  Textarea,
  Button,
  CategoryWrapper,
  Category,
  Error,
  CalendarWrapper,
} from "./TaskModal.styled";
import Calendar from "../Calendar/Calendar";

const categories = [
  { id: 1, name: "Web Design" },
  { id: 2, name: "Research" },
  { id: 3, name: "Copywriting" },
];

function TaskModal({ isOpen, onClose, onCreateTask, initialTask }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialTask) {
      setName(initialTask.title || "");
      setDescription(initialTask.description || "");
      setCategory(
        categories.some((cat) => cat.name === initialTask.topic)
          ? initialTask.topic
          : null
      );
      setDueDate(initialTask.date ? new Date(initialTask.date) : null);
    }
  }, [initialTask]);

  if (!isOpen) return null;

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setError("");
  };

  const handleDateSelect = (date) => {
    setDueDate(date);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !category || !dueDate) {
      setError("Заполните все поля: название, категория, дата");
      return;
    }
    onCreateTask({
      title: name,
      description,
      topic: category,
      date: dueDate.toISOString(),
      status: initialTask?.status || "Без статуса",
    });
    if (!initialTask) {
      setName("");
      setDescription("");
      setCategory(null);
      setDueDate(null);
      setError("");
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{initialTask ? "Редактировать задачу" : "Создать задачу"}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Закрыть модалку">
            &times;
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Название задачи"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />
          <Textarea
            placeholder="Описание задачи"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError("");
            }}
          />
          <CalendarWrapper>
            <Calendar value={dueDate} onChange={handleDateSelect} />
          </CalendarWrapper>
          <CategoryWrapper>
            {categories.map((cat) => (
              <Category
                key={cat.id}
                $isActive={cat.name === category}
                onClick={() => handleCategoryClick(cat.name)}
              >
                {cat.name}
              </Category>
            ))}
          </CategoryWrapper>
          {error && <Error>{error}</Error>}
          <Button type="submit">Создать задачу</Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default TaskModal;