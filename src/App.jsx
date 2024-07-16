import React, { useState, useEffect } from "react";
import { TaskItem } from "./TaskItem";
import { Tasks } from "./Tasks";

function App() {
  const API_KEY = "Rclvn3yNdG0WZrvJ95PS3iWQT9b_k4vjGlcvDsXosw6nlSKR8g";
  const [taskList, setTaskList] = useState([]);

  const onFormSubmit = (task, checked) => {
    fetch("/api/v1/taskList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([{ task, checked }]),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create response");
        return res.json();
      })
      .then((data) =>
        setTaskList((prev) => [
          ...prev,
          {
            task: data.items[0].task,
            checked: data.items[0].checked,
            id: data.items[0]._uuid,
          },
        ])
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetch("/api/v1/taskList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to get response");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTaskList(
          data.items.map((task) => {
            return {
              task: data.items[0].task,
              checked: data.items[0].checked,
              id: data.items[0]._uuid,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Tasks onFormSubmit={onFormSubmit} />
      {taskList.map((task) => (
        <TaskItem
          task={task.task}
          prevStatus={task.checked}
          key={task.id}
          id={task.id}
        />
      ))}
    </div>
  );
}
export default App;
