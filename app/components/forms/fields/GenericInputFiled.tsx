import { useRef, useEffect } from "react";

interface GenericInputFiledProps {
  label: string;
  name: string;
  error?: string | null;
}

export const GenericInputField: React.FC<GenericInputFiledProps> = ({
  label,
  name,
  error,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      ref.current?.focus();
    }
  }, [error]);

  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{label} </span>
        <input
          ref={ref}
          name={name}
          className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          aria-invalid={error ? true : undefined}
          aria-errormessage={error ? `${name}-error` : undefined}
        />
      </label>
      {error && (
        <div className="pt-1 text-red-700" id={`${name}-error`}>
          {error}
        </div>
      )}
    </div>
  );
};
