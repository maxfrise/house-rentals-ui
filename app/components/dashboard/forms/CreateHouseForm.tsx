import type { FormEvent } from "react";
import { Form } from "@remix-run/react";

import { UiPrimaryButton } from "@uireact/button";
import type { UiSpacingProps } from "@uireact/foundation";
import { UiInput, UiTextArea } from '@uireact/form';

import type { FormState } from "../../../routes/houses.new";
import type { MaxfriseErrors } from "./validator/form-validator-yup";


interface CreateHouseFormProps {
  formState?: FormState;
  errors: MaxfriseErrors<FormState>;
  onFormFieldChange?: (value: Partial<FormState>) => void;
  onFormSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const submitButtonSpacing: UiSpacingProps['padding'] = { block: 'four' };

export const CreateHouseForm = (props: CreateHouseFormProps) => {
  const { formState, errors, onFormFieldChange, onFormSubmit } = props;

  const onChange = (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => { 
    onFormFieldChange?.({ [e.currentTarget.name]: e.currentTarget.value });
  }

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
      onSubmit={onFormSubmit}
    >
      <UiInput
        label="Nombre de la propiedad"
        labelOnTop
        name="houseFriendlyName"
        value={formState?.houseFriendlyName}
        onChange={onChange}
        error={errors?.houseFriendlyName}
        category={errors?.houseFriendlyName ? 'error' : undefined}
      />
      <UiTextArea
        label="Descripción de la propiedad"
        labelOnTop
        name="details"
        onChange={onChange}
        value={formState?.details}
        error={errors?.details}
        category={errors?.details ? 'error' : undefined}
        rows={10}
      />
      <UiInput
        label="Nombre del arrendador"
        labelOnTop
        name="landlordName"
        value={formState?.landlordName}
        onChange={onChange}
        error={errors?.landlordName}
        category={errors?.landlordName ? 'error' : undefined}
      />
      <UiInput
        label="Telefono del arrendador"
        labelOnTop
        name="landlordPhone"
        value={formState?.landlordPhone}
        onChange={onChange}
        error={errors?.landlordPhone}
        category={errors?.landlordPhone ? 'error' : undefined}
      />
      <UiInput
        label="Direccion de la casa"
        labelOnTop
        name="address"
        value={formState?.address}
        onChange={onChange}
        error={errors?.address}
        category={errors?.address ? 'error' : undefined}
      />
      <UiInput
        label="Nombre del arrendatario"
        labelOnTop
        name="tenantName"
        value={formState?.tenantName}
        onChange={onChange}
        error={errors?.tenantName}
        category={errors?.tenantName ? 'error' : undefined}
      />
      <UiInput
        label="Telefono del arrendatario"
        labelOnTop
        name="tenantPhone"
        value={formState?.tenantPhone}
        onChange={onChange}
        error={errors?.tenantPhone}
        category={errors?.tenantPhone ? 'error' : undefined}
      />
      <UiPrimaryButton type="submit" padding={submitButtonSpacing}>
        Guardar
      </UiPrimaryButton>
    </Form>
  );
};
