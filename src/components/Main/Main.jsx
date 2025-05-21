import React from "react";
import Column from "../Column/Column";
import "../../App.css";

function Main() {
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
          <div className="main__content">
            {statuses.map((title, index) => (
              <Column key={index} title={title} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
