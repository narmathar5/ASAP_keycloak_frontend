"use client";

import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";

export default function Dashboard() {
  const { authenticated, keycloak } = useAuth();

  useEffect(() => {
    if (!authenticated) {
      keycloak.login();
    }
  }, [authenticated]);

  if (!authenticated) return <p>Redirecting...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{keycloak.token}</pre>
    </div>
  );
}