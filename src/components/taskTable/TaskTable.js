import React, { useState } from "react";

import { executors } from "../../constants/executors"; // Імпортуємо масив виконавців
import placeholderAvatar from "../../images/avatars/defaultAvatar.jpg"; // Заглушка для аватарок

export const TaskTable = ({ tasks, onConfirmTask, onDeleteTask, setTasks }) => {
  const [tempDate, setTempDate] = useState({});
  const [selectedExecutor, setSelectedExecutor] = useState({});

  // Тимчасово зберігаємо значення дати під час редагування
  const handleDateChange = (taskId, newDate) => {
    if (isDateValid(newDate)) {
      setTempDate({ ...tempDate, [taskId]: newDate });
    } else {
      alert("Виберіть дату не пізніше ніж за 24 години до початку!");
    }
  };

  const handleExecutorChange = (taskId, executor) => {
    setSelectedExecutor({ ...selectedExecutor, [taskId]: executor });
  };

  const handleDateBlur = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            plannedDate: tempDate[taskId] || task.plannedDate,
            executor: selectedExecutor[taskId] || task.executor,
          }
        : task
    );
    setTasks(updatedTasks); // Оновлюємо завдання після втрати фокусу
  };

  const isDateValid = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    // Перевірка, чи вибрана дата не пізніше ніж за 24 години до початку
    return selectedDate - currentDate > 24 * 60 * 60 * 1000; // 24 години в мілісекундах
  };

  return tasks.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Purpose</th>
          <th>Description</th>
          <th>Duration, min</th>
          <th>Date & Time</th>
          <th>Cost, $</th>
          <th>Executor</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => {
          const isEditable =
            task.status !== "Approved" && isDateValid(task.plannedDate); // 24 години в мілісекундах

          return (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.purpose}</td>
              <td>{task.description}</td>
              <td>{task.duration}</td>
              <td>
                {isEditable ? (
                  <input
                    type="datetime-local"
                    value={tempDate[task.id] || task.plannedDate || ""}
                    onChange={(e) => handleDateChange(task.id, e.target.value)}
                    onBlur={() => handleDateBlur(task.id)}
                  />
                ) : (
                  <span>{task.plannedDate}</span> // Відображаємо дату як рядок
                )}
              </td>
              <td>{task.cost}</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    gap: "5px",
                  }}
                >
                  <select
                    value={selectedExecutor[task.id] || task.executor || ""}
                    onChange={(e) =>
                      handleExecutorChange(task.id, e.target.value)
                    }
                    onBlur={() => handleDateBlur(task.id)}
                  >
                    <option value="">Select Executor</option>
                    {executors.map((executor) => (
                      <option key={executor.id} value={executor.name}>
                        {executor.name}
                      </option>
                    ))}
                    <option value="Self">Self</option>
                  </select>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={
                        executors.find(
                          (ex) =>
                            ex.name ===
                            (selectedExecutor[task.id] || task.executor)
                        )?.avatar || placeholderAvatar
                      }
                      alt="Executor Avatar"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginLeft: "8px",
                      }}
                    />
                  </div>
                </div>
              </td>
              <td>{task.status}</td>
              <td>
                {task.status === "Pending" && (
                  <button onClick={() => onConfirmTask(task.id)}>
                    Confirm
                  </button>
                )}
                {task.status !== "Approved" && task.status !== "Done" && (
                  <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p>No tasks for this month</p>
  );
};
