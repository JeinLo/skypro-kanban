import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  InputWrapper,
  InputLabel,
  Input,
  TextareaWrapper,
  TextareaLabel,
  Textarea,
  CalendarWrapper,
  CalendarLabel,
  SelectedDateText,
  Button,
  CategoryWrapper,
  Category,
  Error,
  FormContent,
} from './TaskModal.styled';
import Calendar from '../Calendar/Calendar';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const categories = ['Web Design', 'Research', 'Copywriting'];

function TaskModal({ isOpen, onClose, onCreateTask, theme }) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Без статуса',
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState('');
  const [isTaskCreated, setIsTaskCreated] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setError('');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Название задачи не может быть пустым');
      return false;
    }
    if (!selectedCategory) {
      setError('Выберите категорию');
      return false;
    }
    if (!selectedDate) {
      setError('Выберите дату выполнения');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(error);
      return;
    }
    try {
      await onCreateTask({
        title: formData.title,
        description: formData.description,
        topic: selectedCategory,
        date: selectedDate.toISOString(),
        status: formData.status,
      });
      setIsTaskCreated(true);
      toast.success('Задача успешно создана!');
    } catch (err) {
      setError(err.message || 'Ошибка при создании задачи!');
      toast.error(err.message || 'Ошибка при создании задачи!');
    }
  };

  useEffect(() => {
    if (isTaskCreated && isOpen) {
      onClose();
      setIsTaskCreated(false);
    }
  }, [isTaskCreated, isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay $isDarkTheme={theme === 'dark'} onClick={() => onClose()}>
      <ModalContent
        $isDarkTheme={theme === 'dark'}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle $isDarkTheme={theme === 'dark'}>
            Создание задачи
          </ModalTitle>
          <CloseButton
            $isDarkTheme={theme === 'dark'}
            onClick={() => onClose()}
            aria-label="Закрыть модалку"
          >
            &times;
          </CloseButton>
        </ModalHeader>
        <Form $isDarkTheme={theme === 'dark'} onSubmit={handleSubmit}>
          <FormContent>
            <div style={{ flex: 1 }}>
              <InputWrapper>
                <InputLabel $isDarkTheme={theme === 'dark'}>
                  Название задачи
                </InputLabel>
                <Input
                  $isDarkTheme={theme === 'dark'}
                  type="text"
                  name="title"
                  placeholder="Название задачи"
                  value={formData.title}
                  onChange={handleChange}
                />
              </InputWrapper>
              <TextareaWrapper>
                <TextareaLabel
                  $isDarkTheme={theme === 'dark'}
                  style={{ marginTop: '20px' }}
                >
                  Описание задачи
                </TextareaLabel>
                <Textarea
                  $isDarkTheme={theme === 'dark'}
                  name="description"
                  placeholder="Описание задачи"
                  value={formData.description}
                  onChange={handleChange}
                />
              </TextareaWrapper>
            </div>
            <CalendarWrapper>
              <CalendarLabel $isDarkTheme={theme === 'dark'}>
                Даты
              </CalendarLabel>
              <Calendar
                value={selectedDate}
                onChange={handleDateSelect}
                $isDarkTheme={theme === 'dark'}
              />
              <SelectedDateText $isDarkTheme={theme === 'dark'}>
                {selectedDate
                  ? `Срок исполнения: ${selectedDate.toLocaleDateString('ru-RU')}`
                  : 'Выберите срок исполнения'}
              </SelectedDateText>
            </CalendarWrapper>
          </FormContent>
          <CategoryWrapper>
            <InputLabel $isDarkTheme={theme === 'dark'}>Категории</InputLabel>
            <div style={{ display: 'flex', gap: '10px' }}>
              {categories.map((cat) => (
                <Category
                  type="button"
                  key={cat}
                  $isActive={cat === selectedCategory}
                  $isDarkTheme={theme === 'dark'}
                  onClick={() => handleCategoryClick(cat)}
                  $isSelected={cat === selectedCategory}
                >
                  {cat}
                </Category>
              ))}
            </div>
          </CategoryWrapper>
          {error && <Error $isDarkTheme={theme === 'dark'}>{error}</Error>}
          <Button $isDarkTheme={theme === 'dark'} type="submit">
            Создать задачу
          </Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default TaskModal;