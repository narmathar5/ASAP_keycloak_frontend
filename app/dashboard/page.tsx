"use client";

import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";

export default function Dashboard() {
  const { authenticated, keycloak, initialized } = useAuth();

  useEffect(() => {
    if (!initialized) return;

    if (!authenticated && keycloak) {
      keycloak.login();
    }
  }, [authenticated, keycloak, initialized]);

  if (!initialized) return <p>Loading...</p>;

  if (!authenticated) return <p>Redirecting...</p>;

  return <h1>Dashboard</h1>;
}