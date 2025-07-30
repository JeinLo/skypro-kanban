import React, { useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  Label,
  Input,
  Textarea,
  Select,
  Button,
  LeftColumn,
  RightColumn,
  Hint,
} from "./TaskModal.styled";
import Calendar from "../Calendar/Calendar";

const categories = [
  { id: 1, name: "Учёба" },
  { id: 2, name: "Работа" },
  { id: 3, name: "Личное" },
  { id: 4, name: "Спорт" },
  { id: 5, name: "Хобби" },
];

function TaskModal({ isOpen, onClose, onCreateTask }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0].name);
  const [dueDate, setDueDate] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !dueDate) {
      alert("Пожалуйста, заполните название и выберите дату");
      return;
    }
    onCreateTask({ name, description, category, dueDate });
    setName("");
    setDescription("");
    setCategory(categories[0].name);
    setDueDate(null);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Создать задачу</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Закрыть модалку">
            &times;
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <LeftColumn>
            <Label>Срок</Label>
            <Calendar value={dueDate} onChange={setDueDate} />
            <Hint>Выберите срок исполнения</Hint>
            {/* Отладочный вывод даты, можно убрать */}
            {/* <p>Выбрана дата: {dueDate ? dueDate.toLocaleDateString("ru-RU") : "не выбрана"}</p> */}
          </LeftColumn>

          <RightColumn>
            <Label htmlFor="name">Название задачи</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Введите название"
            />

            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание (необязательно)"
            />

            <Label htmlFor="category">Категория</Label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </Select>

            <Button type="submit" disabled={!name.trim() || !dueDate}>
              Создать
            </Button>
          </RightColumn>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default TaskModal;
