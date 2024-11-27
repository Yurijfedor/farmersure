import { useSelector } from "react-redux";

import { selectTasksByStatus } from "../../redux/selectors";

export const TaskFilter = ({ hiveId, handleFilter, tasks }) => {
  const approvedTasks = useSelector((state) =>
    selectTasksByStatus(state, hiveId, "Approved")
  );
  const doneTasks = useSelector((state) =>
    selectTasksByStatus(state, hiveId, "Done")
  );
  const reviewTasks = useSelector((state) =>
    selectTasksByStatus(state, hiveId, "Under Review")
  );
  return (
    <div>
      <button onClick={() => handleFilter(tasks)}>All</button>
      <button onClick={() => handleFilter(approvedTasks)}>Approved</button>
      <button onClick={() => handleFilter(doneTasks)}>Done</button>
      <button onClick={() => handleFilter(reviewTasks)}>Under Review</button>
    </div>
  );
};
