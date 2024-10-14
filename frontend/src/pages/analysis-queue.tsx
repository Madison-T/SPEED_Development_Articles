// analysis-queue.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext"; // Import the Auth context

const AnalysisQueue = () => {
  const router = useRouter();
  const { isLoggedIn, userType } = useAuth(); // Get user status and role

  useEffect(() => {
    // Allow access to Admin and Analyst only
    if (!isLoggedIn || !(userType === "Analyst" || userType === "Admin")) {
      router.push("/access-denied"); // Redirect unauthorized users
    }
  }, [isLoggedIn, userType]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Analysis Queue</h1>
      <p>All analysis tasks will be displayed here.</p>
    </div>
  );
};

export default AnalysisQueue;

