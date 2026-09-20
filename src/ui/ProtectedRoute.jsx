import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  useEffect(
    function () {
      if (!currentUser) navigate("/login", { replace: true });
    },
    [currentUser, navigate],
  );
  if (!currentUser) return null;
  return <Outlet />;
}

export default ProtectedRoute;
