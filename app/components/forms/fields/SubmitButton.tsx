interface SubmitButtonProps {
  onFormSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onFormSubmit }) => {
  return (
    <div className="text-right">
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        onClick={onFormSubmit}
      >
        Guardar
      </button>
    </div>
  );
};
