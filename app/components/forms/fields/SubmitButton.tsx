import React from "react";

interface SubmitButtonProps {
  className?: string;
  label?: string;
  onFormSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onFormSubmit,
  className,
  label,
}) => {
  return (
    <div className={`text-right ${className}`}>
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        onClick={onFormSubmit}
      >
        {label || "Guardar"}
      </button>
    </div>
  );
};
