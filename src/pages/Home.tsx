// import TaskList from "../components/tasklist/TaskList";
import KanbanBoard from "../components/kanbanboard/KanbanBoard";
import "./home.css";

function Home() {
  return (
    <div className="Home">
      <h1>Task Manager</h1>
      {/* <TaskList /> */}
      <KanbanBoard />
    </div>
  );
}

export default Home;
