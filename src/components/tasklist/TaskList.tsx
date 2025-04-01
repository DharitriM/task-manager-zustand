import useTaskStore from "../../store/taskStore";
import AddTask from "../AddTaskModal";
import TaskItem from "../TaskItem";
import "./TaskList.css";

const TaskList = () => {
  const { tasks } = useTaskStore();

  return (
    <ul>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <>
          <p>No tasks yet. Add one!</p>
          <AddTask open={false} onClose={function (): void {
              throw new Error("Function not implemented.");
            } } column={""} />
        </>
      )}
    </ul>
  );
};

export default TaskList;
