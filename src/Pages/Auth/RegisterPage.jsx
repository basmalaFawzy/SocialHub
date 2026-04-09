import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { MdAlternateEmail } from "react-icons/md";
import { GoPerson, GoPeople, GoCalendar, GoKey } from "react-icons/go";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const {  setuserToken } = useContext(AuthContext);
  const schema = zod
    .object({
      name: zod
        .string()
        .nonempty("name is required")
        .min(3, "name must be at least 3 characters"),
      username: zod
        .string()
        .nonempty("Username is required.")
        .min(3, "Username must be at least 3 characters"),
      email: zod.email("please enter a valid email address"),
      password: zod
        .string()
        .nonempty("Password is required.")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must include uppercase, lowercase, number, and special character.",
        ),
      rePassword: zod.string().nonempty("Password is required."),
      dateOfBirth: zod.string().nonempty("Date of birth is required."),
      gender: zod.enum(["male", "female"]),
    })
    .refine(
      (obj) => {
        if (obj.password === obj.rePassword) {
          return true;
        } else {
          return false;
        }
      },
      {
        error: "Passwords do not match.",
        path: ["rePassword"],
      },
    );

  const rhfObj = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = rhfObj;
  //* calling api
  function handleRegister(userData) {
    setisLoading(true);
    axios
      .post("https://route-posts.routemisr.com/users/signup", userData)
      .then((resolve) => {
        if (resolve.data.success === true) {
          localStorage.setItem("userToken", resolve.data.data.token);
          setuserToken(resolve.data.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        setapiError(error.response.data.message);
      })
      .finally(() => setisLoading(false));
  }
  return (
    <>
      {/* register form */}

      {/* form header */}
      <div className="mb-8">
        <h2 className="font-bold text-3xl sm:text-4xl leading-12 bg-linear-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
          Register
        </h2>
        <h3 className="text-xl sm:text-2xl font-semibold mt-2 text-slate-800">
          Create a new account
        </h3>
        <p className="text-blue-400 font-medium mt-1 flex items-center gap-2">
          <span className="w-8 h-0.5 bg-blue-200 rounded-full"></span>
          It's quick and easy
        </p>
        {apiError && (
          <p className="bg-red-400 text-white font-bold rounded-2xl text-center p-1.5 mt-2">
            {apiError}
          </p>
        )}
      </div>
      {/* ----------------form---------------------------- */}
      <Form
        onSubmit={handleSubmit(handleRegister)}
        className="w-full flex grow flex-col gap-5"
      >
        {/* name */}
        <Input
          isRequired
          {...register("name")}
          aria-label="name"
          size="lg"
          startContent={<GoPerson className="text-gray-400 text-xl" />}
          placeholder="Enter your full name"
          type="text"
          variant="bordered"
          className="w-full"
          classNames={{
            input: "bg-gray-50",
            inputWrapper: [
              "border-gray-200",
              "hover:border-blue-300",
              "focus-within:border-blue-400",
              "transition-colors",
              "shadow-sm",
            ].join(" "),
          }}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
        />
        {/* userName */}
        <Input
          isRequired
          {...register("username")}
          aria-label="username"
          size="lg"
          startContent={<GoPerson className="text-gray-400 text-xl" />}
          placeholder="Enter your username"
          type="text"
          variant="bordered"
          className="w-full"
          classNames={{
            input: "bg-gray-50",
            inputWrapper: [
              "border-gray-200",
              "hover:border-blue-300",
              "focus-within:border-blue-400",
              "transition-colors",
              "shadow-sm",
            ].join(" "),
          }}
          errorMessage={errors.username?.message}
          isInvalid={!!errors.username}
        />
        {/* Email */}
        <Input
          isRequired
          {...register("email")}
          aria-label="email"
          size="lg"
          startContent={<MdAlternateEmail className="text-gray-400 text-xl" />}
          variant="bordered"
          placeholder="Enter your email"
          type="email"
          className="w-full"
          classNames={{
            input: "bg-gray-50",
            inputWrapper: [
              "border-gray-200",
              "hover:border-blue-300",
              "focus-within:border-blue-400",
              "transition-colors",
              "shadow-sm",
            ].join(" "),
          }}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
        />
        {/* Gender */}

        <Select
          isRequired
          aria-label="select gender"
          placeholder="Select your gender"
          size="lg"
          variant="bordered"
          startContent={<GoPeople className="text-gray-400 text-xl" />}
          className="w-full"
          classNames={{
            trigger: [
              "bg-gray-50",
              "border-gray-200",
              "hover:border-blue-300",
              "data-[focus=true]:border-blue-400",
              "data-[focus=true]:ring-2",
              "data-[focus=true]:ring-blue-200",
              "transition-colors",
              "shadow-sm",
              "h-12",
            ].join(" "),
            value: "text-gray-400",
            listbox: "bg-white rounded-lg shadow-lg border border-gray-100",
            popoverContent:
              "bg-white rounded-lg shadow-xl border border-gray-100 p-1",
          }}
          {...register("gender")}
          errorMessage={errors.gender?.message}
          isInvalid={!!errors.gender}
        >
          <SelectItem
            key="male"
            className="hover:bg-blue-50 data-[selectable=true]:focus:bg-blue-100"
          >
            Male
          </SelectItem>
          <SelectItem
            key="female"
            className="hover:bg-blue-50 data-[selectable=true]:focus:bg-blue-100"
          >
            Female
          </SelectItem>
        </Select>
        {/* Date */}
        <Input
          {...register("dateOfBirth")}
          aria-label="date of birth"
          type="date"
          size="lg"
          startContent={<GoCalendar className="text-gray-400 text-xl" />}
          variant="bordered"
          className="w-full text-gray-400"
          classNames={{
            input: "bg-gray-50",
            inputWrapper: [
              "border-gray-200",
              "hover:border-blue-300",
              "focus-within:border-blue-400",
              "transition-colors",
              "shadow-sm",
            ].join(" "),
          }}
          errorMessage={errors.dateOfBirth?.message}
          isInvalid={!!errors.dateOfBirth}
        />
        {/* Password */}
        <Input
          isRequired
          {...register("password")}
          aria-label="password"
          type="password"
          size="lg"
          startContent={<GoKey className="text-gray-400 text-xl" />}
          placeholder="Enter your password"
          variant="bordered"
          className="w-full"
          classNames={{
            input: "bg-gray-50",
            inputWrapper: [
              "border-gray-200",
              "hover:border-blue-300",
              "focus-within:border-blue-400",
              "transition-colors",
              "shadow-sm",
            ].join(" "),
          }}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
        />
        {/* rePassword */}
        <Input
          isRequired
          {...register("rePassword")}
          aria-label="confirm password"
          type="password"
          size="lg"
          startContent={<GoKey className="text-gray-400 text-xl" />}
          placeholder="Confirm password"
          variant="bordered"
          className="w-full"
          classNames={{
            input: "bg-gray-50",
            inputWrapper: [
              "border-gray-200",
              "hover:border-blue-300",
              "focus-within:border-blue-400",
              "transition-colors",
              "shadow-sm",
            ].join(" "),
          }}
          errorMessage={errors.rePassword?.message}
          isInvalid={!!errors.rePassword}
        />
        {/* Submit button */}
        <Button
          isDisabled={isLoading}
          color="primary"
          type="submit"
          className="w-full bg-linear-to-r from-blue-400 to-teal-500 hover:from-blue-500 hover:to-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed capitalize font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
          endContent={isLoading && <Spinner color="white" variant="dots" />}
        >
          {isLoading ? "Creating account" : " Create new account"}
        </Button>
        {/* navigate to login button */}
        <Button
          onPress={() => navigate("/auth/login")}
          color="primary"
          type="button"
          className="w-full border-2 border-blue-400 bg-white hover:bg-blue-500 hover:text-white text-blue-400  font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 "
        >
          I already have an account
        </Button>
      </Form>
    </>
  );
}
