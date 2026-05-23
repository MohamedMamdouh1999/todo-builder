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

import { loginInputs } from "../data/login-inputs";

import type { ILoginForm } from "../interfaces/login-form";
import type { IErrorResponse } from "../interfaces/error-response";

import loginSchema from "../validations/login-validation";

const Login = () => {
  // States
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);
  const { register: login, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
    mode: "onChange",
    resolver: yupResolver(loginSchema)
  });

  // Handlers
  const onSubmit: SubmitHandler<ILoginForm> = async data => {
    setIsLoading(true);
    try {
      const { status, data: response } = await axiosInstance.post("/auth/local", data);
      if (status === 200) {
        toast.success("Login successful");
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/");
      }
    } catch (error) {
      const axiosError = (error as AxiosError<IErrorResponse>).response?.data.error.message;
      toast.error(`${axiosError}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Renders
  const inputs = loginInputs.map(input => {
    return (
      <div key={input.name} className="space-y-2">
        <Input type={input.type} placeholder={input.placeholder} {...login(input.name)} />
        { errors[input.name] && <MessageError message={errors[input.name]?.message} /> }
      </div>
    )
  })
   
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white rounded p-4 shadow-md">
      {inputs}
      <Button isLoading={isLoading} type="submit" className="bg-blue-500 hover:bg-blue-600">{isLoading ? "Loading..." : "Login"}</Button>
    </form>
  );
}

export default Login
