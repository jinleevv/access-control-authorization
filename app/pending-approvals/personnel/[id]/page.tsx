import { PersonnelApprovalDetailPage } from "@/app/ui/personnelApprovalDetailPage/ApprovalDetail";
import Sidebar from "@/app/ui/sidebar/sidebar";

const ApprovalDetailPage = () => {
  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full h-full">
        <PersonnelApprovalDetailPage />
      </div>
    </section>
  );
};

export default ApprovalDetailPage;
