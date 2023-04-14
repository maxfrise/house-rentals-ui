import React, { useEffect, useRef } from "react";

interface GenericTextAreaInterface {
  label: string;
  name: string;
  error?: string | null;
}

export const GenericTextArea: React.FC<GenericTextAreaInterface> = ({
  label,
  name,
  error,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (error) {
      ref.current?.focus();
    }
  }, [error]);

  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{label} </span>
        <textarea
          ref={ref}
          name={name}
          rows={8}
          className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
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
