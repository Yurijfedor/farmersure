import { useAuth } from "../hooks/useAuth";

import { AdminTable } from "../components/adminTable/AdminTable";

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  return isAdmin ? <AdminTable /> : <h3>You must be the Admin</h3>;
};

export default AdminPanel;
