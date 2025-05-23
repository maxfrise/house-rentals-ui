import { object, string } from "yup";
import { getUserByEmail } from "~/models/user.server";

export const UserSchema = object({
  name: string().required("El nombre es requerido").max(100, "Maximo 100 caracteres"),
  email: string().required("El correo es requerido").email("El correo es invalido").test(
    "unique-email",
    "El correo ya esta asociado con otra cuenta",
    async (value) => await getUserByEmail(value) === null
  ),
  password: string().required("La contraseña es requerida").min(8, "La contraseña debe tener minimo 8 caracteres"),
  phone: string().required("El telefono es requerido").length(10, "El telefono debe tener 10 digitos")
});

export type UserFormFields = {
  name?: string,
  email?: string,
  password?: string,
  phone?: string
};
