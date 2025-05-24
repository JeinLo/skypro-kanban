// src/components/Main/Main.jsx
import React, { useState, useEffect } from "react";
import Column from "../Column/Column";
import cards from "../../../data";
import "../../App.css";

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          {isLoading ? (
            <div className="loading">Данные загружаются...</div>
          ) : (
            <div className="main__content">
              {statuses.map((status) => (
                <Column
                  key={status}
                  title={status}
                  cards={cards.filter((card) => card.status === status)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
