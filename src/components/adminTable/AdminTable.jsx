import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectTasksUnderReview } from "../../redux/selectors"; // Імпортуємо селектор
import { updateTaskStatusAsync } from "../../redux/operations";

export const AdminTable = () => {
  const tasksUnderReview = useSelector(selectTasksUnderReview); // Отримуємо завдання зі статусом "Under Review"
  const dispatch = useDispatch();

  const [statusUpdate, setStatusUpdate] = useState({});

  const handleStatusChange = (taskId, hiveId, property, newValue) => {
    if (!newValue) {
      console.error("Invalid status selected");
      return;
    }
    // Викликаємо асинхронний action
    dispatch(updateTaskStatusAsync({ hiveId, taskId, property, newValue }));
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
        {tasksUnderReview.map((task) => (
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
                  handleStatusChange(
                    task.id,
                    task.hiveId,
                    "status",
                    e.target.value
                  )
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
