import React from "react";
import { useRef, useEffect } from "react";

export enum InputType {
  DATE = "date",
  TEXT = "text",
  NUMBER = "number",
}

interface GenericInputFieldProps {
  label: string;
  name: string;
  error?: string | null;
  type?: InputType;
}

export const GenericInputField: React.FC<GenericInputFieldProps> = ({
  label,
  name,
  error,
  type,
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
          type={type ? type : InputType.TEXT}
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
