import React, { useEffect, useRef, useState } from "react";
import type { FormState } from "../../../routes/houses.new"

interface GenericTextAreaInterface {
  label: string;
  name: string;
  error?: string | null;
  cb?: (value: Partial<FormState>) => void;
  initialValue?: string | number
}

export const GenericTextArea: React.FC<GenericTextAreaInterface> = ({
  label,
  name,
  error,
  cb,
  initialValue
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (error) {
      ref.current?.focus();
    }
  }, [error]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {    
    const currentValue = event.target.value
    setValue(currentValue)
    cb?.({ [name]: currentValue })
  }

  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{label} </span>
        <textarea
          value={value}
          onChange={onChange}
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
