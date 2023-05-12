import type { Schema, ValidationError } from "yup";
import merge from "lodash.merge";

export type MaxfriseErrors<Values> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object
      ? MaxfriseErrors<Values[K][number]>[] | string | string[]
      : string | string[]
    : Values[K] extends object
    ? MaxfriseErrors<Values[K]>
    : string;
};

export async function validate<Values>(
  values: Values,
  schema: Schema
): Promise<MaxfriseErrors<Values>> {
  return new Promise((resolve, reject) => {
    schema.validate(values, { abortEarly: false }).then(
      () => {
        resolve({});
      },
      (err: any) => {
        // Any yulp error will be handled and transformed into a MaxfriseErrors error
        if (err.name === "ValidationError") {
          resolve(yupToMaxfriseFormErrors(err)); // Convert the error into something more usefull.
        } else {
          // Any other error will just be thrown
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `Warning: An unhandled error was caught during form validation`,
              err
            );
          }
          reject(err);
        }
      }
    );
  });
}

function yupToMaxfriseFormErrors<Values>(
  yupError: ValidationError
): MaxfriseErrors<Values> {
  let errors: any = {};

  yupError.inner.forEach((error) => {
    errors = merge(errors, convertToObject(error.path, error.message));
  });

  return errors;
}

function convertToObject(path: string = "", value: string) {
  const obj = {};
  let currentObj: any = obj;
  const keys = path.split(".");
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const isArrayKey = /\[(\d+)\]/.exec(key);
    if (isArrayKey) {
      const arrayKey = key.split("[")[0];
      const arrayIndex = parseInt(isArrayKey[1]);
      if (!currentObj[arrayKey]) {
        currentObj[arrayKey] = [];
      }
      if (i === keys.length - 1) {
        currentObj[arrayKey][arrayIndex] = value;
      } else if (!currentObj[arrayKey][arrayIndex]) {
        currentObj[arrayKey][arrayIndex] = {};
      }
      currentObj = currentObj[arrayKey][arrayIndex];
    } else {
      if (i === keys.length - 1) {
        currentObj[key] = value;
      } else if (!currentObj[key]) {
        currentObj[key] = {};
      }
      currentObj = currentObj[key];
    }
  }
  return obj;
}
