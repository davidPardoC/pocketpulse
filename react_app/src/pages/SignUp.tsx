import { Controller } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";
import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { control, onSubmit, handleSubmit, errors, loading } = useSignup();
  return (
    <div className="container mx-auto p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <h1 className="text-center text-2xl font-bold">SignUp</h1>
        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <Input
              type="text"
              label="First Name"
              isInvalid={!!errors.first_name}
              errorMessage={errors.first_name?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="last_name"
          render={({ field }) => (
            <Input
              type="text"
              label="Last Name"
              isInvalid={!!errors.last_name}
              errorMessage={errors.last_name?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              type="email"
              label="Email"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...field}
              isRequired
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              type="password"
              label="Password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...field}
              isRequired
            />
          )}
        />
        <Controller
          control={control}
          name="password_confirmation"
          render={({ field }) => (
            <Input
              label="Password Confirmation"
              type="password"
              isInvalid={!!errors.password_confirmation}
              errorMessage={errors.password_confirmation?.message}
              {...field}
              isRequired
            />
          )}
        />
        <Button type="submit" color="primary" isLoading={loading}>
          SignUp
        </Button>
      </form>
      <div className="flex justify-center mt-3">
        <Link className="text-center underline" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
