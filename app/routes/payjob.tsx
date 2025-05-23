import type { ActionFunctionArgs } from "@remix-run/node";
import type { MaxfriseErrors } from "../components/dashboard/forms/validator/form-validator-yup";
import { validate } from "../components/dashboard/forms/validator/form-validator-yup";
import { object, string } from "yup";
import { json, redirect } from "@remix-run/node";
import { MaxfriseApi } from "../api/MaxfriseApi";

export type FormState = {
    method: string;
    details: string;
    amount: string;
    pk: string;
    st: string;
};

export const housePaymentSchema = object({
    method: string().required().max(40),
    details: string().required().max(1000),
    amount: string().required(),
    pk: string().required(),
    st: string().required(),
});

export const action = async ({ params, request }: ActionFunctionArgs) => {
    const formData = Object.fromEntries(await request.formData());
    const errors: MaxfriseErrors<FormState> = await validate(
        formData,
        housePaymentSchema
    );

    if (Object.keys(errors).length > 0) {
        return json({ errors }, { status: 400 });
    }

    const { pk, st, method, details, amount } = formData;
    const [houseId] = `${st}`.split("|")
    const api = new MaxfriseApi(process.env.MAXFRISE_API);

    await api.payHouse({
        pk: `${pk}`,
        st: `${st}`,
        method: `${method}`,
        details: `${details}`,
        amount: `${amount}`,
    });

    return redirect(`/houses/${houseId}`);
}