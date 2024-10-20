import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectTasksUnderReview } from "../../redux/selectors"; // Імпортуємо селектор
import { useUpdateTaskStatus } from "../../hooks/useHives";

export const AdminTable = () => {
  const tasks = useSelector(selectTasksUnderReview); // Отримуємо завдання зі статусом "Under Review"
  console.log(tasks);

  const updateTask = useUpdateTaskStatus(); // Хук для оновлення завдань

  const [statusUpdate, setStatusUpdate] = useState({});

  const handleStatusChange = (taskId, hiveId, newStatus) => {
    if (!newStatus) {
      console.error("Invalid status selected");
      return;
    }

    setStatusUpdate((prevState) => ({
      ...prevState,
      [taskId]: newStatus,
    }));

    // Викликаємо мутацію для оновлення статусу в Firebase
    updateTask.mutate({
      hiveId,
      taskId,
      newStatus, // Передаємо новий статус
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Hive ID</th>
          <th>Task Name</th>
          <th>Planned Date</th>
          <th>Executor</th>
          <th>Duration (min)</th>
          <th>Cost ($)</th>
          <th>Status</th>
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.hiveId}</td>
            <td>{task.name}</td>
            <td>{task.plannedDate ? task.plannedDate : "Not set"}</td>
            <td>{task.executor}</td>
            <td>{task.duration}</td>
            <td>{task.cost}</td>
            <td>{statusUpdate[task.id] || task.status}</td>
            <td>
              <select
                value={statusUpdate[task.id] || task.status}
                onChange={(e) =>
                  handleStatusChange(task.id, task.hiveId, e.target.value)
                }
              >
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Canceled">Canceled</option>
                <option value="Done">Done</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
