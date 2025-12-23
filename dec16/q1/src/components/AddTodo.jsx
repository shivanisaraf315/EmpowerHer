import { useContext, useRef } from "react";
import { TodoContext } from "../context/TodoContext";

const AddTodo = () => {
  const { addTodo } = useContext(TodoContext);
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const title = inputRef.current?.value || "";
    addTodo(title);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, margin: "16px 0" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a todo..."
        style={{ flex: 1, padding: 10 }}
      />
      <button type="submit" style={{ padding: "10px 14px" }}>
        Add
      </button>
    </form>
  );
};

export default AddTodo;
