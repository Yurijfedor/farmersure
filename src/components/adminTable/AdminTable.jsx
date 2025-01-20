import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

import db from "../../firebase";

import { selectTasksUnderReview, selectHives } from "../../redux/selectors";
import { updateTaskStatusAsync } from "../../redux/operations";
import { getUserProfile } from "../../services/user";

export const AdminTable = () => {
  const tasksUnderReview = useSelector(selectTasksUnderReview); // Завдання
  const hives = useSelector(selectHives); // Всі вулики зі стану Redux
  const dispatch = useDispatch();

  const [statusUpdate, setStatusUpdate] = useState({});
  const [newNotes, setNewNotes] = useState("");

  const handleStatusChange = async (
    taskId,
    hive,
    property,
    newValue,
    taskCost
  ) => {
    if (!newValue) {
      console.error("Invalid status selected");
      return;
    }

    try {
      const lesseeId = hive?.lessee.uid;
      if (!lesseeId) {
        console.error("Властивість 'lessee' не знайдена у вулику.");
        return;
      }

      // Якщо статус змінюється на "Done", виконуємо перевірку балансу та списуємо кошти
      if (newValue === "Done") {
        const userProfile = await getUserProfile(lesseeId);
        if (!userProfile || typeof userProfile.balance !== "number") {
          console.error(
            "Профіль користувача не знайдено або баланс не вказано."
          );
          return;
        }

        const updatedBalance = userProfile.balance - taskCost;
        if (updatedBalance < 0) {
          alert(
            "Недостатньо коштів на балансі користувача для завершення завдання."
          );
          return;
        }

        const userRef = doc(db, "users", lesseeId);
        await updateDoc(userRef, { balance: updatedBalance });
        console.log("Баланс користувача оновлено.");
      }

      // Оновлюємо статус завдання незалежно від його нового значення
      dispatch(
        updateTaskStatusAsync({ hiveId: hive.id, taskId, property, newValue })
      );
    } catch (error) {
      console.error(
        "Помилка при оновленні балансу або статусу завдання:",
        error.message
      );
    }
  };

  const handleNotesArea = (e) => {
    setNewNotes(e.target.value === "" ? " " : e.target.value);
  };

  // Створюємо мапу вуликів для швидкого доступу
  const hiveMap = hives.reduce((acc, hive) => {
    acc[hive.id] = hive;
    return acc;
  }, {});

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
          <th>Notes</th>
          <th>Status</th>
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        {tasksUnderReview.map((task) => {
          const hive = hiveMap[task.hiveId]; // Знаходимо вулик за його ID

          return (
            <tr key={task.id}>
              <td>{task.hiveId}</td>
              <td>{task.name}</td>
              <td>{task.plannedDate ? task.plannedDate : "Not set"}</td>
              <td>{task.executor}</td>
              <td>{task.duration}</td>
              <td>{task.cost}</td>
              <td>
                <textarea
                  value={newNotes === "" ? task.notes : newNotes}
                  onChange={handleNotesArea}
                  onBlur={(e) =>
                    handleStatusChange(task.id, hive, "notes", e.target.value)
                  }
                />
              </td>
              <td>{statusUpdate[task.id] || task.status}</td>
              <td>
                <select
                  value={statusUpdate[task.id] || task.status}
                  onChange={(e) =>
                    handleStatusChange(
                      task.id,
                      hive,
                      "status",
                      e.target.value,
                      task.cost
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
          );
        })}
      </tbody>
    </table>
  );
};
