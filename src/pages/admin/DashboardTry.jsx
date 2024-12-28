"use client";

import PerformanceCharts from "../../components/Admin/Dashboard/PerformanceCharts";
import UpcomingMeetings from "../../components/Admin/Dashboard/UpcomingMeetings";
import MainStats from "../../components/Admin/Dashboard/MainStats";
import GenderDistribution from "../../components/Admin/Dashboard/GenderDistribution";
import Dues from "../../components/Admin/Dashboard/Dues";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <MainStats />
      <div className="grid gap-4 max-lg:grid-cols-1 lg:grid-cols-2 ">
        <PerformanceCharts />
        <UpcomingMeetings />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <GenderDistribution />
        <Dues />
      </div>
    </div>
  );
}
