import { Input } from "@/Components/Forms/Input";
import { Button } from "@/Components/Layout/Button";
import { Header, Typography } from "@/Components/Layout/Typography";

export const Login = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="flex h-auto w-11/12 flex-col rounded-lg border border-solid border-gray-200 bg-white p-6 shadow-lg md:w-[400px]">
        <Header as="h1" weight="extrabold">
          Welcome!
        </Header>

        <Typography as="p" className="mt-12">
          Please Sign in{" "}
        </Typography>

        <form>
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="example@domain.com"
            containerClassName="mt-4"
          />
          <Input
            label="Password"
            type="password"
            id="password"
            containerClassName="mt-4"
          />
        </form>
        <Button type="submit">Submit</Button>
      </div>
    </section>
  );
};
