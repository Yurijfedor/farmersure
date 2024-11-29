import { useState } from "react";
import { useSelector } from "react-redux";

import { selectTasksByStatus } from "../../redux/selectors";

export const TaskFilter = ({
  hiveId,
  handleFilter,
  handleRequiredTasks,
  useRequiredTasks,
}) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const approvedTasks = useSelector((state) =>
    selectTasksByStatus(state, hiveId, "Approved")
  );
  const doneTasks = useSelector((state) =>
    selectTasksByStatus(state, hiveId, "Done")
  );
  const reviewTasks = useSelector((state) =>
    selectTasksByStatus(state, hiveId, "Under Review")
  );

  const handleButtonClick = (filterName, tasks) => {
    setActiveFilter(filterName); // Змінюємо активний фільтр
    handleFilter(tasks); // Викликаємо передану функцію фільтрації
  };

  const buttonStyle = (filterName) =>
    filterName === activeFilter
      ? { backgroundColor: "blue", color: "white" } // Активний фільтр
      : { backgroundColor: "white", color: "black" }; // Неактивний фільтр

  return (
    <div>
      <button
        onClick={() => {
          handleRequiredTasks();
          setActiveFilter(null); // Скидаємо активний фільтр
        }}
        style={buttonStyle(null)}
      >{`All required ${
        useRequiredTasks ? "+" : "-"
      } other possible tasks`}</button>

      <button
        onClick={() => handleButtonClick("Approved", approvedTasks)}
        style={buttonStyle("Approved")}
      >
        Approved
      </button>

      <button
        onClick={() => handleButtonClick("Done", doneTasks)}
        style={buttonStyle("Done")}
      >
        Done
      </button>

      <button
        onClick={() => handleButtonClick("Under Review", reviewTasks)}
        style={buttonStyle("Under Review")}
      >
        Under Review
      </button>
    </div>
  );
};
