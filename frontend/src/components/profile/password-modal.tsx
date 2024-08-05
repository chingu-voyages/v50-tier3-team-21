import { useState } from "react";
import { FormPasswordField } from "./form-password-field";
import PrimaryButton from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { httpClient } from "../../lib/http-client";
import { PasswordInputs, PasswordModalProps } from "./types/profile-types";

export const PasswordModal: React.FC<PasswordModalProps> = ({
  setViewPasswordModal,
}) => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<PasswordInputs>();

  // toggle modal open/close
  const closeModal = () => {
    setViewPasswordModal(false);
  };

  // handle click cancel 
  const handleCancel = () => {
    setError("");
    reset()
  }

  // submit change of password request
  const handleSavePassword: SubmitHandler<PasswordInputs> = async (data) => {
    // if passwords don't match, don't submit
    if (getValues("password") !== getValues("confirmPassword")) {
      console.log("passwords don't match, try again");
      setError("Passwords do not match")
      return;
    }

    const editedPassword = data;
    try {
      const response = await httpClient.put("http://localhost:3000/api/profile", editedPassword);
      const {data} = response.data;
      console.log(data);
      alert("Password Changed!");
    } catch (error){
      console.log(error)
    }

  };

  return (
    <div className="absolute inset-0 bg-[#291E43] bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-md m-7 md:max-w-2/3 p-5 text-sm">
        <div>
          <div className="mb-7 flex gap-5 items-start">
            <div className="bg-secondary/10 flex">
              <svg className="text-2xl icon-[uim--padlock] bg-secondary"></svg>
            </div>
            <div className="">
              <p>Are you sure you want to change your password?</p>
              <p className="text-gray-400 mt-3">
                Be reminded that you will be required to use the new password
                while signing in.
              </p>
            </div>
            <div className="text-xl cursor-pointer" onClick={closeModal}>
              <span className="icon-[material-symbols-light--close]"></span>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleSavePassword)}>
            <div className="relative">
              <FormPasswordField
                label="New Password"
                placeholder="Password"
                name="password"
                register={register}
                errors={errors?.password}
              />
              <FormPasswordField
                label="Confirm Password"
                placeholder="Confirm Password"
                name="confirmPassword"
                register={register}
                errors={errors?.confirmPassword}
              />
            <div className="text-danger text-xs absolute bottom-0 right-3">{error}</div>
            </div>
            <div className="flex w-full mt-3 md:justify-between gap-3">
              <PrimaryButton
                type="reset"
                onClick={handleCancel}
                className="md:flex-none md:px-10 flex-1 bg-white border rounded-md p-3 font-bold border-primary text-primary"
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton
                type="submit"
                className="md:flex-none md:px-10 flex-1"
              >
                Confirm
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
