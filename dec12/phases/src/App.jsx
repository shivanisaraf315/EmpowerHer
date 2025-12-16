import { useState } from "react";
import TodosList from "./TodosList";
export default function App(){
  const [ showTodos,setShowTools] = useState(true);
  return(
    <div>
      <button onClick={()=>setShowTools(false)}>
Unmount Todos
      </button>
      {showTodos && <TodosList />}
    </div>
  );
}