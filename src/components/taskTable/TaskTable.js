import React from "react";

export const TaskTable = ({ tasks, onConfirmTask, onDeleteTask }) => {
  return tasks.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Date & Time</th>
          <th>Cost</th>
          <th>Executor</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.date || "Not set"}</td>
            <td>{task.cost}$</td>
            <td>{task.executor || "Not set"}</td>
            <td>{task.status}</td>
            <td>
              {task.status === "Pending" && (
                <button onClick={() => onConfirmTask(task.id)}>Confirm</button>
              )}
              {task.status !== "Approved" && task.status !== "Done" && (
                <button onClick={() => onDeleteTask(task.id)}>Delete</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No tasks for this month</p>
  );
};
