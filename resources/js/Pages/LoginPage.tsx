import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";

import { Input } from "@/Components/Forms/Input";
import { Button } from "@/Components/Layout/Button";
import { Text, Title } from "@/Components/Layout/Text";
import { presentValidationErrors } from "@/Helpers/ApiErrorHelper";
import { useAuth } from "@/Hooks/Api/useAuth";
import { ROUTES } from "@/Router/routes";
import { useAuthStore } from "@/Stores/useAuthStore";
import {
  type BaseApiError,
  type ValidationErrorResponse,
} from "@/Types/ApiErrors";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "The email is required." })
    .email("Invalid email."),
  password: z.string().min(1, { message: "The password is required." }),
});

type schemaType = z.infer<typeof schema>;

export const LoginPage = () => {
  const { signIn } = useAuth();
  const { setAuth } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    void axios.get("sanctum/csrf-cookie").then(() => null);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: ({ data }) => {
      setAuth(data.data);
      navigate(ROUTES.home.path);
    },
    onError: (response: AxiosError<BaseApiError<ValidationErrorResponse>>) => {
      if (response.response?.data) {
        toast.error(presentValidationErrors(response.response.data));
      }
    },
    mutationKey: ["sigIn"],
  });

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-auto w-11/12 flex-col rounded-lg border border-solid border-gray-200 bg-white p-6 shadow-lg md:w-[400px]">
        <Title as="h1" weight="extrabold">
          Welcome!
        </Title>

        <form
          className="mt-8 w-full"
          onSubmit={handleSubmit((form) => {
            mutate(form);
          })}
        >
          <Input
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            placeholder="enter your email@mail.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Link to="/forgot-password">
            <Text className="float-left !text-sm text-primary hover:text-primary-500">
              Forgot Password?
            </Text>
          </Link>
          <Link to="/registration">
            <Text className="float-right !text-sm text-primary hover:text-primary-500">
              I don&apos;t have an account
            </Text>
          </Link>
          <Button type="submit" className="mt-8 w-full" isLoading={isPending}>
            Log in
          </Button>
        </form>
      </div>
    </section>
  );
};
