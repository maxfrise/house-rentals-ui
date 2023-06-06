import { validate } from "../../../../../app/components/forms/validator/form-validator-yup";
import {
  object,
  string,
  number,
  date,
  boolean,
  array,
  ref,
  setLocale,
} from "yup";

describe("MaxFriseFormValidator", () => {
  test("validates schema", async () => {
    const model = {
      numbers: [2, "hola", "adios", 3, "bye"],
      name: "sergio",
      email: "audel91@.com",
      age: -3,
      isBig: false,
      date: "207/04/1991",
      data: {
        name: "",
        age: "24",
      },
    };

    const userSchema = object({
      numbers: array().of(number()).strict(),
      name: string().required(),
      email: string().email(),
      age: number().required().positive().integer(),
      isBig: boolean(),
      date: date().required(),
      data: object({
        name: string().required(),
        age: number().strict().required(),
      }),
    });

    const result = await validate(model, userSchema);

    expect(result).toStrictEqual({
      numbers: [
        undefined,
        'numbers[1] must be a `number` type, but the final value was: `"hola"`.',
        'numbers[2] must be a `number` type, but the final value was: `"adios"`.',
        undefined,
        'numbers[4] must be a `number` type, but the final value was: `"bye"`.',
      ],
      email: "email must be a valid email",
      age: "age must be a positive number",
      date: 'date must be a `date` type, but the final value was: `Invalid Date` (cast from the value `"207/04/1991"`).',
      data: {
        name: "data.name is a required field",
        age: 'data.age must be a `number` type, but the final value was: `"24"`.',
      },
    });
  });

  test("validates two fields should match", async () => {
    const model = {
      password: "123",
      confirmPassword: "345",
    };

    const passwordSchema = object({
      password: string().required("Password is required"),
      confirmPassword: string()
        .required()
        .oneOf([ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    });

    const result = await validate(model, passwordSchema);

    expect(result).toStrictEqual({
      confirmPassword: "Passwords must match",
    });
  });

  test("validates with localization", async () => {
    setLocale({
      string: {
        email: "el correo electrónico no es correcto",
      },
      mixed: {
        required: "el campo es requerido",
      },
    });
    const model = {
      name: "",
      email: "audel91@.com",
    };

    const userSchema = object({
      name: string().required(),
      email: string().email(),
    });

    const result = await validate(model, userSchema);

    expect(result).toStrictEqual({
      name: "el campo es requerido",
      email: "el correo electrónico no es correcto",
    });
  });
});
