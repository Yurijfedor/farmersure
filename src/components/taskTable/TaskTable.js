import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { TaskSelector } from "../taskSelector/TaskSelector";
import { useUpdateHiveTasks } from "../../hooks/useHives";
import { updateTasksStatus } from "../../redux/hivesSlice";
import { executors } from "../../constants/executors"; // Імпортуємо масив виконавців
import placeholderAvatar from "../../images/avatars/defaultAvatar.jpg"; // Заглушка для аватарок

export const TaskTable = React.memo(
  ({
    tasks,
    onConfirmTask,
    onDeleteTask,
    currentMonth,
    hiveId,
    onPlannedTasksTotalCostChange,
  }) => {
    const { mutate: updateTasks } = useUpdateHiveTasks();

    const dispatch = useDispatch();
    const [tempDate, setTempDate] = useState({});
    const [selectedExecutor, setSelectedExecutor] = useState({});

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

    const handleDateBlur = (taskId, property, newValue, e) => {
      e.preventDefault();

      // Find the task to update
      const getTask = tasks.find((task) => task.id === taskId);

      if (getTask) {
        // Create a new updated task object
        if (property === "plannedDate" && !isDateValid(newValue)) {
          return;
        } else {
          const updatedTask = {
            ...getTask,
            [property]: newValue, // Update the specified property
          };

          // Dispatch the updated task to update the state
          dispatch(updateTasksStatus({ hiveId, updatedTask })); // оновлюємо redux
          updateTasks({ hiveId, tasks }); // оновлюємо firestore
        }
      } else {
        console.error("Task not found");
      }
    };

    const isDateValid = (date) => {
      const currentDate = new Date();
      const selectedDate = new Date(date);
      return selectedDate - currentDate > 24 * 60 * 60 * 1000; // 24 години в мілісекундах
    };

    const getTotalCost = useCallback(() => {
      return tasks.reduce((total, task) => total + (task.cost || 0), 0);
    }, [tasks]);

    useEffect(() => {
      onPlannedTasksTotalCostChange(getTotalCost()); // Передаємо нове значення загальної вартості
    }, [tasks, onPlannedTasksTotalCostChange, getTotalCost]);

    return (
      <>
        <h3>Планові роботи на {currentMonth} місяць</h3>
        <TaskSelector hiveId={hiveId} tasks={tasks} />
        {tasks.length > 0 ? (
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
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.purpose}</td>
                  <td>{task.description}</td>
                  <td>{task.duration}</td>
                  <td>
                    <td>
                      {task.status !== "Done" &&
                      task.status !== "Under Review" ? (
                        <input
                          type="datetime-local"
                          value={tempDate[task.id] || task.plannedDate || ""}
                          onChange={(e) => {
                            handleDateChange(task.id, e.target.value);
                            handleDateBlur(
                              task.id,
                              "plannedDate",
                              e.target.value,
                              e
                            );
                          }}
                        />
                      ) : (
                        <span>{task.plannedDate}</span>
                      )}
                    </td>
                  </td>
                  <td>{task.cost.toFixed(2)}</td>
                  <td>
                    {task.status !== "Done" &&
                    task.status !== "Under Review" ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          gap: "5px",
                        }}
                      >
                        <select
                          value={
                            selectedExecutor[task.id] || task.executor || ""
                          }
                          onChange={(e) => {
                            handleExecutorChange(task.id, e.target.value);
                            handleDateBlur(
                              task.id,
                              "executor",
                              e.target.value,
                              e
                            );
                          }}
                        >
                          <option value="" disabled>
                            Select Executor
                          </option>
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
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <img
                          src={
                            executors.find((ex) => ex.name === task.executor)
                              ?.avatar || placeholderAvatar
                          }
                          alt="Executor Avatar"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        />
                        <span>{task.executor}</span>
                      </div>
                    )}
                  </td>
                  <td>{task.status}</td>
                  <td>
                    {task.status !== "Done" &&
                      task.status !== "Under Review" && (
                        <button
                          onClick={() =>
                            isDateValid(task.plannedDate)
                              ? onConfirmTask(task.id)
                              : alert("я ж прошу, вибери нормальну дату")
                          }
                          disabled={task.executor === null}
                        >
                          Confirm
                        </button>
                      )}
                    {task.status !== "Done" &&
                      task.status !== "Under Review" && (
                        <button onClick={() => onDeleteTask(task.id)}>
                          Delete
                        </button>
                      )}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="5" style={{ fontWeight: "bold" }}>
                  Total Cost:
                </td>
                <td style={{ fontWeight: "bold" }}>
                  ${getTotalCost().toFixed(2)}
                </td>
                <td colSpan="3"></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No tasks for this month</p>
        )}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.tasks === nextProps.tasks
);
