/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Button } from "antd";
import useTaskStore from "../../store/taskStore";
import KanbanColumn from "./KanbanColumn";
import AddTaskModal from "../AddTaskModal";
import "./kanban.css";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "inProgress", title: "In Progress" },
  { id: "done", title: "Done" },
  { id: "hold", title: "Hold" },
];

const KanbanBoard: React.FC = () => {
  const { tasks, updateTaskStatus } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState<string>("todo");
  const DeleteAllTasks = useTaskStore((state) => state.removeAllTasks);

  const openModal = (column: string) => {
    setCurrentColumn(column);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    updateTaskStatus(active.id, over.id);
  };
  
  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="board-div">
        <Button type="primary" onClick={() => DeleteAllTasks()}>
          Remove All Tasks
        </Button>
        <div className="board">
          {columns.map((column) => (
            <div key={column.id} className="column">
              <div className="column-title-div">
                <h3>{column.title}</h3>
                <Button
                  type="text"
                  variant="outlined"
                  onClick={() => openModal(column.id)}
                >
                  +
                </Button>
              </div>
              <SortableContext
                items={tasks.filter((t) => t.status === column.id)}
              >
                <KanbanColumn status={column.id} />
              </SortableContext>
            </div>
          ))}
        </div>
      </div>
      <AddTaskModal
        open={isModalOpen}
        onClose={closeModal}
        column={currentColumn}
      />
    </DndContext>
  );
};

export default KanbanBoard;
