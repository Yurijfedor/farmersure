import React, { useState, useCallback } from "react";

import placeholderAvatar from "../../images/avatars/defaultAvatar.jpg"; // Заглушка для аватарок

const TaskRow = ({
  task,
  executors,
  handleDateChange,
  handleExecutorChange,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [tempDate, setTempDate] = useState(task.plannedDate || "");
  const [selectedExecutor, setSelectedExecutor] = useState(task.executor || "");

  const toggleEditMode = useCallback(() => {
    setIsEditable((prev) => !prev);
  }, []);

  const saveChanges = useCallback(() => {
    if (tempDate !== task.plannedDate) {
      handleDateChange(task.id, tempDate);
    }
    if (selectedExecutor !== task.executor) {
      handleExecutorChange(task.id, selectedExecutor);
    }
    toggleEditMode();
  }, [
    tempDate,
    selectedExecutor,
    task,
    handleDateChange,
    handleExecutorChange,
    toggleEditMode,
  ]);

  return (
    <tr>
      {/* Планована дата */}
      <td>
        {isEditable ? (
          <input
            type="datetime-local"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
          />
        ) : (
          <span onClick={toggleEditMode}>{task.plannedDate || "Not set"}</span>
        )}
      </td>

      {/* Виконавець */}
      <td>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "5px",
          }}
        >
          {isEditable ? (
            <select
              value={selectedExecutor}
              onChange={(e) => setSelectedExecutor(e.target.value)}
            >
              <option value="">Select Executor</option>
              {executors.map((executor) => (
                <option key={executor.id} value={executor.name}>
                  {executor.name}
                </option>
              ))}
              <option value="Self">Self</option>
            </select>
          ) : (
            <span onClick={toggleEditMode}>
              {task.executor || "No executor"}
            </span>
          )}

          {/* Аватар виконавця */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                executors.find((ex) => ex.name === selectedExecutor)?.avatar ||
                placeholderAvatar
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

      {/* Зберегти зміни */}
      <td>
        {isEditable && (
          <button onClick={saveChanges} style={{ marginLeft: "10px" }}>
            Save
          </button>
        )}
      </td>
    </tr>
  );
};

export default React.memo(TaskRow);
