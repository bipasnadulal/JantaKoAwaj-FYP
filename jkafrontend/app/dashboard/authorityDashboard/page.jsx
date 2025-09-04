'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthoritySidebar from './authorityComponents/AuthoritySidebar';
import AuthorityOverviewCards from './authorityComponents/AuthorityOverviewCards';
import AuthorityComplaintsTable from './authorityComponents/AuthorityComplaintsTable';
import ComplaintsList from './authorityComponents/ComplaintsList';
import NotificationsPanel from './authorityComponents/NotificationsPanel';

export default function AuthorityDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [authority, setAuthority] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaintStatus, setComplaintStatus] = useState('all');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access");
    router.push("/authoritylogin");
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/authoritylogin");
      return;
    }

    const fetchAuthority = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/authorities/detail/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setAuthority(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch authority details");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthority();
  }, [router]);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><p>Loading authority info...</p></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600"><p>{error}</p></div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AuthoritySidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 p-6 lg:px-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600 capitalize">
            {activeTab === "overview" && "Authority Dashboard"}
            {activeTab === "complaints" && "Assigned Complaints"}
            {activeTab === "complaints_status" && "Complaints List"}
            {activeTab === "notifications" && "Notifications"}
          </h1>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <>
            <div className="bg-blue-500 text-white p-6 rounded-xl shadow mb-6">
              <h2 className="text-xl font-semibold">Welcome {authority?.name}</h2>
              <p className="text-sm text-blue-100">Handle assigned complaints with transparency.</p>
            </div>
            <AuthorityOverviewCards setActiveTab={setActiveTab} setComplaintStatus={setComplaintStatus} />
          </>
        )}

        {activeTab === "complaints" && <AuthorityComplaintsTable />}
        {activeTab === "complaints_status" && <ComplaintsList status={complaintStatus} />}
        {activeTab === "notifications" && <NotificationsPanel />}
      </div>
    </div>
  );
}
