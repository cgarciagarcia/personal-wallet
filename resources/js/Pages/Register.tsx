import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";

import { Input } from "@/Components/Forms/Input";
import { Button } from "@/Components/Layout/Button";
import { Header, Typography } from "@/Components/Layout/Typography";
import { useApi } from "@/Hooks/useApi";
import { ROUTES } from "@/Router/routes";

const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: "The email is required." })
      .email("Invalid email."),
    password: z.string().min(1, { message: "The password is required." }),
    confirmationPassword: z
      .string()
      .min(1, { message: "The password confirmation is required." }),
    name: z.string().min(1, { message: "The first name is required." }),
    lastName: z.string().min(1, { message: "The last name is required." }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmationPassword;
    },
    {
      message: "Confirmation password does not match.",
      path: ["confirmationPassword"],
    },
  );

type schemaType = z.infer<typeof schema>;

export const Register = () => {
  const { signUp } = useApi();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Your account has been successfully created.");
      navigate(ROUTES.login.path);
    },
    mutationKey: ["signUp"],
  });
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="flex h-auto w-11/12 flex-col rounded-lg border border-solid border-gray-200 bg-white p-6 shadow-lg md:w-[450px]">
        <Header as="h1" weight="extrabold" className="text-center">
          Create your <br /> Wallet Account
        </Header>

        <form onSubmit={handleSubmit((formData) => mutate(formData))}>
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
              {...register("lastName")}
              error={errors.lastName?.message}
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
            id="confirmationPassword"
            placeholder="Repeat your password.."
            {...register("confirmationPassword")}
            error={errors.confirmationPassword?.message}
          />
          <Typography className="float-left !text-sm">
            Have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </Typography>
          <Button type="submit" className="mt-8 w-full">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};
