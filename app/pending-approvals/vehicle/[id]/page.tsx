import Sidebar from "@/app/ui/sidebar/sidebar";
import VehicleApprovalDetailPage from "@/app/ui/vehicleApprovalDetailPage/ApprovalDetail";

const ApprovalDetailPage = () => {

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full h-full">
        <VehicleApprovalDetailPage />
      </div>
    </section>
  );
};

export default ApprovalDetailPage;
