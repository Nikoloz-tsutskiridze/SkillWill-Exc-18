import { useState } from "react";

export const Tasks = ({ onFormSubmit }) => {
  const [checked, setChecked] = useState(false);
  const [Task, setTask] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(Task, checked);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter Task"
          onChange={(e) => setTask(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />{" "}
          Mark as completed
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};
