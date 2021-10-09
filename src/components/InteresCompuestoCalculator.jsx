import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Balance from "./Balance";
import HeaderH1 from "./HeaderH1"

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate / 100 + 1);
  }

  return (Math.round(total));
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const InteresCompuestoCalculator = ({ ...props }) => {
  const [balance, setBalance] = useState("");
  const [noInterest, setNoInterest] = useState("");
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(
      Number(deposit),
      Number(contribution),
      Number(years),
      Number(rate)
    );
    const noInterest = Number(deposit) + (Number(years)*Number(contribution));

    setBalance(formatter.format(val));
    setNoInterest(formatter.format(noInterest))
  };
  return (
    <div>
      <HeaderH1>Calculadora de interés compuesto</HeaderH1>
      <Formik
        initialValues={{
          deposit: "",
          contribution: "",
          years: "",
          rate: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          deposit: Yup.number()
            .required("Obligatorio")
            .typeError("Debe ser un número"),
          contribution: Yup.number()
            .required("Obligatorio")
            .typeError("Debe ser un número"),
          years: Yup.number()
            .required("Obligatorio")
            .typeError("Debe ser un número"),
          rate: Yup.number()
            .required("Obligatorio")
            .typeError("Debe ser un número")
            .min(0, "No puedes tener un interés menor del 0%")
            .max(100, "No puedes tener un interés mayor al 100%"),
        })}
      >
        <Form>
          <Input name="deposit" label="Depósito inicial" />
          <Input name="contribution" label="Contribución anual" />
          <Input name="years" label="Años" />
          <Input name="rate" label="Interés estimado" />
          <Button type="submit">Calcular</Button>
        </Form>
      </Formik>
      {balance !== "" ? <Balance>Balance final {balance}<br /> Sin el interés serían {noInterest}</Balance> : null}
    </div>
  );
};

export default InteresCompuestoCalculator;
