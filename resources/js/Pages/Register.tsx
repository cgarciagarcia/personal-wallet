import { Link } from "react-router-dom";

import { Input } from "@/Components/Forms/Input";
import { Button } from "@/Components/Layout/Button";
import { Header, Typography } from "@/Components/Layout/Typography";

export const Register = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="flex h-auto w-11/12 flex-col rounded-lg border border-solid border-gray-200 bg-white p-6 shadow-lg md:w-[450px]">
        <Header as="h1" weight="extrabold" className="text-center">
          Create your <br /> Wallet Account
        </Header>

        <form>
          <div className="mt-8 flex flex-col justify-center gap-2 md:flex-row md:items-end">
            <Input
              label="About you"
              id="name"
              name="firstName"
              placeholder="First Name"
            />
            <Input id="last_name" name="lastName" placeholder="Last Name" />
          </div>
          <Input
            label="Enter your email"
            type="email"
            id="email"
            placeholder="example@domain.com"
          />
          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <Input
            type="password"
            id="confirmation_password"
            placeholder="Repeat your password.."
          />
          <Typography className="float-left !text-sm">
            Have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </Typography>
        </form>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </div>
    </section>
  );
};
