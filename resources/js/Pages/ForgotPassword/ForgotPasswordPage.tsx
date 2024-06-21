import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

import { Input } from "@/Components/Forms/Input";
import { Button, Text, Title } from "@/Components/Layout";
import { useAuth, useMount } from "@/Hooks";
import { ROUTES } from "@/Router";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "The email is required." })
    .email("Invalid email."),
});

type schemaType = z.infer<typeof schema>;

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  useMount(() => {
    void axios.get("sanctum/csrf-cookie").then(() => null);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const { mutate: sendEmail, isPending } = useAuth().forgotPassword;

  const onSubmit: SubmitHandler<schemaType> = (data) => {
    sendEmail(data.email, {
      onSuccess: () => navigate(ROUTES.home.path),
    });
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-auto w-11/12 flex-col rounded-lg border border-solid border-gray-200 bg-white p-6 shadow-lg md:w-auto md:min-w-[400px]">
        <Title as="h1" weight="extrabold" className="text-center md:text-left">
          Reset your password
        </Title>

        <form
          className="mt-8"
          onSubmit={handleSubmit(onSubmit)}
          aria-label="This is a login"
        >
          <Input
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            placeholder="example@mail.com"
            {...register("email")}
            error={errors.email?.message}
            compact
          />
          <Link to={ROUTES.login.path}>
            <Text className="mt-2 !text-sm text-primary hover:text-primary-500">
              Go back to log in
            </Text>
          </Link>
          <Button type="submit" className="mt-8 w-full" isLoading={isPending}>
            Continue
          </Button>
        </form>
      </div>
    </section>
  );
};
