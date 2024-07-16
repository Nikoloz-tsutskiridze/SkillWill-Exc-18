import { useState } from "react";

export const TaskItem = ({ task, prevStatus, key }) => {
  const [checked, setChecked] = useState(prevStatus);
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div key={key}>
      {editing ? (
        <div>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{task}</h3>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          {checked ? "Checked" : "Unchecked"}
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};
