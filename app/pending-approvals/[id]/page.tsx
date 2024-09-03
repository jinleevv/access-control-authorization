import Sidebar from "@/app/ui/sidebar/sidebar";
import VehicleApprovalDetailPage from "@/app/ui/ApprovalDetailPage/ApprovalDetail";

interface ApprovalDetailPageProps {
  params: {
    id: string;
  };
}

const ApprovalDetailPage = ({ params }: ApprovalDetailPageProps) => {
  const { id } = params;

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full h-full">
        <VehicleApprovalDetailPage id={id} />
      </div>
    </section>
  );
};

export default ApprovalDetailPage;
