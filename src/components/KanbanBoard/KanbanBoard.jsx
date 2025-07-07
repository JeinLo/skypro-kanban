import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "../Column/Column";

function KanbanBoard({ columns }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(columns[source.droppableId].cards);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      columns[source.droppableId].cards = items;
    } else {
      const sourceItems = Array.from(columns[source.droppableId].cards);
      const [removed] = sourceItems.splice(source.index, 1);
      columns[destination.droppableId].cards.push(removed);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h3>{column.title}</h3>
                <div>
                  {column.cards.map((card, index) => (
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
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;