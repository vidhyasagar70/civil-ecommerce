import React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  loading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  loading = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full text-white font-bold py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300"
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
