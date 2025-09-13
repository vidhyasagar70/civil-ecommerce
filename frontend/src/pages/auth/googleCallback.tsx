import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../../ui/utils/auth";
import { jwtDecode } from "jwt-decode";

interface GoogleJwtPayload {
  email: string;
  name?: string;
  picture?: string;
}

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        const decoded: GoogleJwtPayload = jwtDecode(token);

        saveAuth({
          token,
          email: decoded.email,
          role: "user", // ✅ default role
        });

        window.location.replace("/homePage");
      } catch (err) {
        console.error("Invalid token:", err);
        navigate("/signIn");
      }
    } else {
      console.error("No token found in URL");
      navigate("/signIn");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-700">Signing you in with Google...</p>
    </div>
  );
}
