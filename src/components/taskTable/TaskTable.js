import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { TaskSelector } from "../taskSelector/TaskSelector";
import { TaskFilter } from "../taskFilter/TaskFilter";
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
    handleRequiredTasks,
    useRequiredTasks,
  }) => {
    const { mutate: updateTasks } = useUpdateHiveTasks();
    const dispatch = useDispatch();
    const [tempDate, setTempDate] = useState({});
    const [selectedExecutor, setSelectedExecutor] = useState({});
    const [newNotes, setNewNotes] = useState({});
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    const handleDateChange = (taskId, newDate) => {
      if (isDateValid(newDate)) {
        setTempDate({ ...tempDate, [taskId]: newDate });
      } else {
        alert("Виберіть дату не пізніше ніж за 24 години до початку!");
      }
    };

    const handleFilterChange = (tasks) => {
      setFilteredTasks(tasks);
    };

    const handleExecutorChange = (taskId, executor) => {
      setSelectedExecutor({ ...selectedExecutor, [taskId]: executor });
    };

    const handleNotesChange = (taskId, note) => {
      setNewNotes({ ...newNotes, [taskId]: note || " " });
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
          const updatedTasks = tasks.filter((t) => t.status !== "Pending");
          updateTasks({ hiveId, updatedTasks }); // оновлюємо firestore
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
      return tasks.reduce((total, task) => {
        if (task.status === "Done") {
          return total; // Пропускаємо завдання зі статусом "Done"
        }
        return total + (task.cost || 0);
      }, 0);
    }, [tasks]);

    useEffect(() => {
      setFilteredTasks(tasks);
      onPlannedTasksTotalCostChange(getTotalCost()); // Передаємо нове значення загальної вартості
    }, [tasks, onPlannedTasksTotalCostChange, getTotalCost]);

    return (
      <>
        <h3>Планові роботи на {currentMonth} місяць</h3>
        <TaskFilter
          hiveId={hiveId}
          handleFilter={handleFilterChange}
          handleRequiredTasks={handleRequiredTasks}
          useRequiredTasks={useRequiredTasks}
        />
        <TaskSelector hiveId={hiveId} />
        {filteredTasks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Duration, min</th>
                <th>Date & Time</th>
                <th>Cost, $</th>
                <th>Executor</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.duration}</td>
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
                            e.preventDefault();
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
                  <td>
                    <textarea
                      value={newNotes[task.id] || task.notes || ""}
                      onChange={(e) =>
                        handleNotesChange(task.id, e.target.value)
                      }
                      onBlur={(e) =>
                        handleDateBlur(task.id, "notes", e.target.value, e)
                      }
                      disabled={task.status === "Under Review"}
                    />
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
                          disabled={task.selectedExecutor === null}
                        >
                          Confirm
                        </button>
                      )}
                    {task.status !== "Done" &&
                      task.status !== "Under Review" && (
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          disabled={task.priority === "обов'язкова"}
                        >
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
          <p>No required tasks for this month</p>
        )}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.tasks === nextProps.tasks
);
