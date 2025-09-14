import { useEffect, useState } from "react";
import { getAuth, clearAuth } from "../ui/utils/auth";
import { jwtDecode } from "jwt-decode";

interface GoogleJwtPayload {
  name?: string;
  email: string;
  picture?: string;
  exp: number;
}

export function useUser() {
  const [user, setUser] = useState<GoogleJwtPayload & { role: string } | null>(null);

  useEffect(() => {
    const auth = getAuth();
    if (!auth) return;

    try {
      const decoded: GoogleJwtPayload = jwtDecode(auth.token);

      // check expiry
      if (decoded.exp * 1000 < Date.now()) {
        clearAuth();
        return;
      }

      setUser({
        ...decoded,
        name: decoded.name || decoded.email.split("@")[0],
        picture: decoded.picture || "/default-avatar.png",
        role: auth.role, 
      });
    } catch (err) {
      console.error("Invalid token:", err);
      clearAuth();
    }
  }, []);

  return user;
}
