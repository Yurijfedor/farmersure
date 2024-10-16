import { useAuth } from "../hooks/useAuth";

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  return isAdmin ? (
    <div>Hello!I am AdminPanel</div>
  ) : (
    <h3>You must be the Admin</h3>
  );
};

export default AdminPanel;
