import React from "react";
import { useDroppable } from "@dnd-kit/core";
import useTaskStore from "../../store/taskStore";
import { TaskCard } from "./TaskCard";

interface KanbanColumnProps {
  status: string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status }) => {
  const { tasks } = useTaskStore();
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="column-inner">
      {tasks.filter((task) => task.status === status).length > 0 ? (
        tasks
          .filter((task) => task.status === status)
          .map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p>No tasks added</p>
      )}
    </div>
  );
};

export default KanbanColumn;
