// moderation-queue.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext"; // Import the Auth context

const ModerationQueue = () => {
  const router = useRouter();
  const { isLoggedIn, userType } = useAuth(); // Get user status and role

  useEffect(() => {
    // Allow access to Admin and Moderator only
    if (!isLoggedIn || !(userType === "Moderator" || userType === "Admin")) {
      router.push("/access-denied"); // Redirect unauthorized users
    }
  }, [isLoggedIn, userType]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Moderation Queue</h1>
      <p>All moderation tasks will be displayed here.</p>
    </div>
  );
};

export default ModerationQueue;
