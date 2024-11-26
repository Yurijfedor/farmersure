export const CustomTaskForm = ({
  customTask,
  handleCustomTaskChange,
  handleAddTask,
  errorMessage,
}) => {
  return (
    <div>
      <h4>Створення власного завдання</h4>
      <label>
        Назва<span style={{ color: "red" }}> *</span>:
        <input
          type="text"
          name="name"
          value={customTask.name}
          onChange={handleCustomTaskChange}
        />
      </label>
      <br />
      <label>
        Мета<span style={{ color: "red" }}> *</span>:
        <input
          type="text"
          name="purpose"
          value={customTask.purpose}
          onChange={handleCustomTaskChange}
        />
      </label>
      <br />
      <label>
        Опис<span style={{ color: "red" }}> *</span>:
        <textarea
          name="description"
          value={customTask.description}
          onChange={handleCustomTaskChange}
        />
      </label>
      <br />
      <label>
        Тривалість (хвилини)<span style={{ color: "red" }}> *</span>:
        <input
          type="number"
          name="duration"
          value={customTask.duration}
          onChange={handleCustomTaskChange}
        />
      </label>
      <br />
      <label>
        Вартість за годину роботи ($)<span style={{ color: "red" }}> *</span>:
        <input
          type="number"
          name="costPerHour"
          value={customTask.costPerHour}
          onChange={handleCustomTaskChange}
        />
      </label>
      <br />
      <label>
        Примітки<span style={{ color: "red" }}> *</span>:
        <textarea
          name="notes"
          value={customTask.notes}
          onChange={handleCustomTaskChange}
        />
      </label>
      <br />
      {/* Повідомлення про помилку */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button onClick={handleAddTask}>Додати власне завдання</button>
    </div>
  );
};
