import useTaskStore from "../store/taskStore";
import Task from "../types/types";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  // const { removeTask, toggleTask } = useTaskStore();

  // return (
  //   <li>
  //     <input
  //       type="checkbox"
  //       checked={task.completed}
  //       onChange={() => toggleTask(task.id)}
  //     />
  //     <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
  //       {task.title}
  //     </span>
  //     <button onClick={() => removeTask(task.id)}>❌</button>
  //   </li>
  // );
};

export default TaskItem;
