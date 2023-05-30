import { useMemo, useState } from "react";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import PayHouseform from "../components/forms/PayHouseForm";
import type { MaxfriseErrors } from "../components/forms/validator/form-validator-yup";
import { validate } from "../components/forms/validator/form-validator-yup";
import { object, string } from "yup";
import { MaxfriseApi } from "../datasource/MaxfriseApi/MaxfriseApi";
import { useActionData, useParams, useRouteLoaderData } from "@remix-run/react";
import type {
  HouseOverview,
  Payment,
} from "../datasource/MaxfriseApi/MaxfriseApiTypes";
import invariant from "tiny-invariant";
import { useMatchesData } from "../utils";

export type FormState = {
  method: string;
  details: string;
  amount: string;
  pk: string;
  st: string;
};

const housePaymentSchema = object({
  method: string().required().max(40),
  details: string().required().max(1000),
  amount: string().required(),
  pk: string().required(),
  st: string().required(),
});

export const action = async ({ params, request }: ActionArgs) => {
  invariant(params.houseId, "house not found");
  const formData = Object.fromEntries(await request.formData());
  const errors: MaxfriseErrors<FormState> = await validate(
    formData,
    housePaymentSchema
  );

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  const { pk, st, method, details, amount } = formData;

  const api = new MaxfriseApi(process.env.MAXFRISE_API);

  await api.payHouse({
    pk: `${pk}`,
    st: `${st}`,
    method: `${method}`,
    details: `${details}`,
    amount: `${amount}`,
  });

  return redirect(`/houses/${params.houseId.replace(/^house#/, "")}`);
};

export default function PaymentView() {
  const { jobid = "" } = useParams();
  const data = useMatchesData(
    "routes/houses.$houseId"
  ) as unknown as HouseOverview;

  const paymentDetails = useMemo<Payment | undefined>(() => {
    return data.payments.find((payment) => payment.st === jobid);
  }, [jobid]);

  const [houseid, jobDate, uuid] = jobid?.split("|");

  const paymentDetailsModel: FormState = useMemo(
    () => ({
      method: "",
      details: "",
      amount: paymentDetails?.details[0]?.amount || "0",
      pk: paymentDetails?.pk || "",
      st: paymentDetails?.st || "",
    }),
    []
  );
  const actionData = useActionData<typeof action>();

  const [formState, setFormState] = useState<FormState>(paymentDetailsModel);
  const [errors, setErrors] = useState<MaxfriseErrors<FormState>>(
    actionData?.errors || paymentDetailsModel
  );

  const onFormFieldChange = (value: Partial<FormState>) => {
    /**
     * Global form state is being tracked through this handler
     */
    setFormState({
      ...formState,
      ...value,
    });
  };

  const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const errors = await validate(formState, housePaymentSchema);

    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setErrors(errors);
    }
  };

  const fromatedDate = useMemo(() => {
    const dataString = jobDate.split("T")[0];
    const newDateString = `${dataString}T08:00:00.000Z`;
    return new Date(newDateString);
  }, [jobDate]);

  return (
    <div className="payment-container mt-8">
      <div className="overflow-hidden rounded pt-5 shadow-lg">
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">
            ${paymentDetails?.details[0].amount} -{" "}
            {fromatedDate.toLocaleDateString()}
          </div>
          <PayHouseform
            onFormFieldChange={onFormFieldChange}
            onFormSubmit={onFormSubmit}
            formState={paymentDetailsModel}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
