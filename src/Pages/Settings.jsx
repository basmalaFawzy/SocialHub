import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import axios from "axios";
import { GoKey } from "react-icons/go";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as zod from "zod";

const schema = zod
  .object({
    password: zod
      .string()
      .nonempty("Current password is required.")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must include uppercase, lowercase, number, and special character.",
      ),
    newPassword: zod
      .string()
      .nonempty("New password is required.")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must include uppercase, lowercase, number, and special character.",
      ),
    reNewPassword: zod.string().nonempty("Please confirm your new password."),
  })
  .refine((obj) => obj.newPassword === obj.reNewPassword, {
    message: "Passwords do not match.",
    path: ["reNewPassword"],
  });

export default function Settings() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function changePassword(data) {
    return axios.patch(
      `${import.meta.env.VITE_BASE_URL}/users/change-password`,
      data, // axios serializes plain objects as JSON automatically
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
      },
    );
  }

  const { isPending, mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update password", {
        position: "top-center",
        autoClose: 3000,
      });
    },
  });

  const onSubmit = (values) => {
    mutate({
      password: values.password,
      newPassword: values.newPassword,
    });
  };

  return (
    <>
      <Card className="w-full lg:max-w-200 mx-auto p-3 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <CardHeader className="flex gap-4 items-center">
          <div className="text-amber-500 bg-amber-100 p-3 rounded-full">
            <GoKey size={22} />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-3xl sm:text-4xl leading-12">
              Change Password
            </h2>
            <p className="text-amber-400 font-medium mt-1 flex items-center gap-2">
              Keep your account secure by using a strong password.
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Current Password */}
            <div>
              <Input
                {...register("password")}
                aria-label="Current password"
                type="password"
                size="lg"
                label="Current password"
                placeholder="Enter current password"
                labelPlacement="outside-top"
                variant="bordered"
                className="w-full"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                classNames={{
                  label: "font-semibold",
                  input: "bg-gray-50",
                  inputWrapper: [
                    "bg-gray-50",
                    "border-gray-200",
                    "hover:border-amber-300",
                    "focus-within:border-amber-400",
                    "transition-colors",
                    "shadow-sm",
                  ].join(" "),
                }}
              />
            </div>

            {/* New Password */}
            <div>
              <Input
                {...register("newPassword")}
                aria-label="New password"
                type="password"
                size="lg"
                label="New password"
                placeholder="Enter new password"
                labelPlacement="outside-top"
                variant="bordered"
                className="w-full"
                isInvalid={!!errors.newPassword}
                errorMessage={errors.newPassword?.message}
                classNames={{
                  label: "font-semibold",
                  input: "bg-gray-50",
                  inputWrapper: [
                    "bg-gray-50",
                    "border-gray-200",
                    "hover:border-amber-300",
                    "focus-within:border-amber-400",
                    "transition-colors",
                    "shadow-sm",
                  ].join(" "),
                }}
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <Input
                {...register("reNewPassword")}
                aria-label="Confirm new password"
                type="password"
                size="lg"
                label="Confirm new password"
                placeholder="Re-enter new password"
                labelPlacement="outside-top"
                variant="bordered"
                className="w-full"
                isInvalid={!!errors.reNewPassword}
                errorMessage={errors.reNewPassword?.message}
                classNames={{
                  label: "font-semibold",
                  input: "bg-gray-50",
                  inputWrapper: [
                    "bg-gray-50",
                    "border-gray-200",
                    "hover:border-amber-300",
                    "focus-within:border-amber-400",
                    "transition-colors",
                    "shadow-sm",
                  ].join(" "),
                }}
              />
            </div>

            {/* Submit button */}
            <Button
              isLoading={isPending}
              isDisabled={isPending}
              color="primary"
              type="submit"
              className="w-full bg-linear-to-r from-amber-400 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-white disabled:opacity-50 disabled:cursor-not-allowed capitalize font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            >
              Update
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}