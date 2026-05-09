"use client";

import { useAuth } from "./providers/AuthProvider";

export default function Home() {
  const { keycloak, authenticated } = useAuth();

  return (
    <div style={{ padding: 20 }}>
      <h1>Keycloak Next App</h1>

      {!authenticated ? (
        <button onClick={() => keycloak.login()}>
          Login
        </button>
      ) : (
        <>
          <p>Logged in</p>
          <button onClick={() => keycloak.logout()}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}