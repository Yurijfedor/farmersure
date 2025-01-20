import React from "react";

import { ProfileSection } from "../components/dashboard/ProfileSection";
import { BalanceSection } from "../components/dashboard/BalanceSection";
import { RentedHivesSection } from "../components/dashboard/RentedHivesSection";
// import TasksSection from "../components/TasksSection";

const ClientDashboard = () => {
  return (
    <div>
      <h1>Кабінет клієнта</h1>
      <ProfileSection />
      <BalanceSection />
      <RentedHivesSection />
      {/* <TasksSection /> */}
    </div>
  );
};

export default ClientDashboard;
