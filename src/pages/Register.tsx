import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import Input from "../components/ui/Input";
import MessageError from "../components/ui/MessageError";
import Button from "../components/ui/Button";

import axiosInstance from "../config/axios.config";

import { registerInputs } from "../data/register-inputs";

import type { IRegisterForm } from "../interfaces/register-form";
import type { IErrorResponse } from "../interfaces/error-response";

import registerSchema from "../validations/register-validation";

const Register = () => {
  // States
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IRegisterForm>({
    mode: "onChange",
    resolver: yupResolver(registerSchema)
  });

  // Handlers
  const onSubmit: SubmitHandler<IRegisterForm> = async data => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      const axiosError = (error as AxiosError<IErrorResponse>).response?.data.error.message;
      toast.error(`${axiosError}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Renders
  const inputs = registerInputs.map(input => {
    return (
      <div key={input.name} className="space-y-2">
        <Input type={input.type} placeholder={input.placeholder} {...register(input.name)} />
        { errors[input.name] && <MessageError message={errors[input.name]?.message} /> }
      </div>
    )
  })
   
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white rounded p-4 shadow-md">
      {inputs}
      <Button isLoading={isLoading} type="submit" className="bg-blue-500 hover:bg-blue-600">{isLoading ? "Loading..." : "Register"}</Button>
    </form>
  );
}

export default Register
