import { useForm } from "react-hook-form";
import { User } from "../entities/user";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthServices } from "../services/auth.services";

const authServices = new AuthServices();

interface Inputs {
  first_name?: string;
  last_name?: string;
  monthly_budget: number;
  email: string;
}

const schema = yup.object({
  first_name: yup.string().optional(),
  last_name: yup.string().optional(),
  monthly_budget: yup.number().min(0).required(),
  email: yup.string().required(),
});

export const useProfile = (user: User) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue("first_name", user.first_name);
    setValue("last_name", user.last_name);
    setValue("monthly_budget", user.monthly_budget);
    setValue("email", user.email);
  }, []);

  const onSubmit = async (data: Inputs) => {
    try {
      setIsLoading(true);
      await authServices.updateProfile(user.user_id, data);
    } catch (error) {}
    setIsLoading(false);
  };

  return { control, errors, handleSubmit, onSubmit, isLoading };
};
