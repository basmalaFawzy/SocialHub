import { Form, Button, Input, Spinner } from "@heroui/react";
import { GoKey } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { userToken, setuserToken } = useContext(AuthContext);
  const query = useQueryClient();
  // ZOD for validation
  const schema = zod.object({
    email: zod.email("please enter a valid email address"),
    password: zod
      .string()
      .nonempty("Password is required.")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must include uppercase, lowercase, number, and special character.",
      ),
  });
  // react-hook-form object that will be sent to backend
  const formData = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formData;

  function handleLogin(userData) {
    setisLoading(true);
    axios
      .post("https://route-posts.routemisr.com/users/signin", userData)
      .then((resolve) => {
        if (resolve.data.success === true) {
          const x = resolve.data.data.user;
          localStorage.setItem("userToken", resolve.data.data.token);
          setuserToken(resolve.data.data.token);
          query.invalidateQueries({ queryKey: ["userData"] });
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
      {/* form header */}
      <div className="mb-7.5 space-y-3">
        <h2 className="font-bold text-3xl sm:text-4xl leading-12 text-slate-700">
          Log in to social
          <span className=" bg-linear-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
            Hup
          </span>
        </h2>
        <p className="text-blue-400 font-medium mt-1 flex items-center gap-2">
          <span className="w-8 h-0.5 bg-blue-200 rounded-full"></span>
          Continue your social journey.
        </p>
        {apiError && (
          <p className="bg-red-400 text-white font-bold rounded-2xl text-center p-1.5 mt-2">
            {apiError}
          </p>
        )}
      </div>
      {/* -----------------form------------- */}
      <Form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full flex grow flex-col gap-5"
      >
        {/* Email */}
        <Input
          isRequired
          {...register("email")}
          aria-label="email"
          // errorMessage="Please enter a valid email"
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
        {/* Submit button */}
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <Button
            isDisabled={isLoading}
            color="primary"
            type="submit"
            className="w-full bg-linear-to-r from-blue-400 to-teal-500 hover:from-blue-500 hover:to-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed capitalize font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            endContent={isLoading && <Spinner color="white" variant="dots" />}
          >
            {isLoading ? "Loging in" : "Log In"}
          </Button>
          {/* navigate to register button */}
          <p className="text-blue-400 font-medium mt-1 flex items-center gap-2 ">
            <span className="w-8 h-0.5 bg-blue-200 rounded-full"></span>Don't
            have an account?
            <span className="w-8 h-0.5 bg-blue-200 rounded-full"></span>
          </p>
          <Button
            onPress={() => navigate("/auth/register")}
            color="primary"
            type="button"
            className="w-full border-2 border-blue-400 bg-white hover:bg-blue-500 hover:text-white text-blue-400  font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 "
          >
            Register now!
          </Button>
        </div>
      </Form>
    </>
  );
}
