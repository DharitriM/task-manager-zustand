import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Button, Card } from "antd";
import Task from "../../types/types";
import { AiOutlineDelete } from "react-icons/ai";
import useTaskStore from "../../store/taskStore";
import "./kanban.css";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
  });
  const removeTask = useTaskStore((state) => state.removeTask);

   // Truncate description if too long
   const truncatedDescription = task.description &&
   task.description.length > 50 ? task.description.slice(0, 50) + "..." : task.description;


  const handleDeleteTask = () => {
    removeTask(task.id);
  };

  return (
    <div className="task-card-div">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
          zIndex: isDragging ? 1 : 0,
        }}
      >
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>{task.title}</div>
              <div style={{ width: "32px", visibility: "hidden" }} />
            </div>
          }
          variant="outlined"
          style={{ marginBottom: "0" }}
        >
          {truncatedDescription}
        </Card>
      </div>

      <div className="delete-button">
        <Button
          type="text"
          size="large"
          danger
          onClick={handleDeleteTask}
          icon={<AiOutlineDelete />}
        />
      </div>
    </div>
  );
};
