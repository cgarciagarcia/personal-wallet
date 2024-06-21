import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

import { Input } from "@/Components/Forms/Input";
import { Button } from "@/Components/Layout/Button";
import { Text, Title } from "@/Components/Layout/Text";
import { useAuth } from "@/Hooks/Api/useAuth";
import { useMount } from "@/Hooks/useMount";
import { ROUTES } from "@/Router/routes";

const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: "The email is required." })
      .email("Invalid email."),
    password: z
      .string()
      .min(8, {
        message:
          "The password is required and should be at least 8 characters.",
      })
      .regex(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
        "The password must have at least one number, one lowercase letter and one uppercase letter",
      ),
    confirmation_password: z
      .string()
      .min(8, { message: "The password confirmation is required." }),
    name: z.string().min(1, { message: "The first name is required." }),
    last_name: z.string().min(1, { message: "The last name is required." }),
  })
  .refine((data) => data.password === data.confirmation_password, {
    message: "Confirmation password does not match.",
    path: ["confirmation_password"],
  });

type schemaType = z.infer<typeof schema>;

export const RegisterPage = () => {
  const { mutate, isPending } = useAuth().signUp;

  useMount(() => {
    void axios.get("sanctum/csrf-cookie").then(() => null);
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-auto w-11/12 flex-col rounded-lg border border-solid border-gray-200 bg-white p-6 shadow-lg md:w-[450px]">
        <Title as="h1" weight="extrabold" className="text-center">
          Create your <br /> Wallet Account
        </Title>

        <form
          onSubmit={handleSubmit((formData) =>
            mutate(formData, {
              onSuccess: () => navigate(ROUTES.login.path),
            }),
          )}
        >
          <div className="mt-8 flex flex-col justify-center gap-2 md:flex-row md:items-end">
            <Input
              label="About you"
              id="name"
              placeholder="First Name"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              id="last_name"
              placeholder="Last Name"
              {...register("last_name")}
              error={errors.last_name?.message}
            />
          </div>
          <Input
            label="Enter your email"
            type="email"
            id="email"
            placeholder="example@domain.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Input
            type="password"
            id="confirmation_password"
            placeholder="Repeat your password.."
            {...register("confirmation_password")}
            error={errors.confirmation_password?.message}
          />
          <Text className="float-left !text-sm">
            I have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </Text>
          <Button type="submit" className="mt-8 w-full" isLoading={isPending}>
            {isPending ? "Loading" : "Submit"}
          </Button>
        </form>
      </div>
    </section>
  );
};
