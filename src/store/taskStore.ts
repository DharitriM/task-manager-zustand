import { create } from "zustand";
import Task from "../types/types";
import { persist } from "zustand/middleware";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  removeAllTasks: () => void;
  updateTask: (task: Task) => void;
}
// const useTaskStore = create<TaskStore>((set)=>{
//     return{
//         tasks: [],
//         addTask: (task)=> set((state) => ({ tasks: [...state.tasks, task] })),
//         removeTask: (taskid)=>set((state)=>{return{tasks: state.tasks.filter((task)=> task.id === taskid)}}),
//         removeAllTasks: ()=>set({tasks: []}),
//         toggleTask: (taskid)=>set((state)=>{return{tasks: state.tasks.map((task)=> task.id === taskid ? {...task, completed: !task.completed} : task)}})
//     }
// })

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      removeAllTasks: () => set({ tasks: [] }),
      updateTaskStatus: (taskId, status) =>
        set((state) => {
          return {
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, status } : task
            ),
          };
        }),
      updateTask: (updatedTask) =>
        set((state) => {
          return {
            tasks: state.tasks.map((task) =>
              task.id === updatedTask.id ? { ...updatedTask } : task
            ),
          };
        }),
    }),
    { name: "tasks" }
  )
);

export default useTaskStore;
