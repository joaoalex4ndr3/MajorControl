import React from "react";

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

const FormButton: React.FC<FormButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition-all duration-150 hover:bg-white hover:text-black hover:border-black border border-transparent active:scale-[0.97] sm:py-2"
    >
      {children}
    </button>
  );
};

export default FormButton;