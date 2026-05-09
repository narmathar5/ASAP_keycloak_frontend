"use client";

import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "@/lib/keycloak";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256",
        checkLoginIframe: false,
      })
      .then((auth) => {
        setAuthenticated(auth);
        setInitialized(true);
      })
      .catch((err) => {
        console.error("Keycloak init failed:", err);
        setInitialized(true);
      });

    const interval = setInterval(() => {
      if (keycloak.authenticated) {
        keycloak
          .updateToken(30)
          .then((refreshed) => {
            if (refreshed) {
              console.log("Token refreshed");
              setAuthenticated(true);
            }
          })
          .catch(() => {
            console.warn("Token refresh failed");
            keycloak.login();
          });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        keycloak,
        authenticated: keycloak.authenticated || authenticated,
        initialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);