import { FormPasswordField } from "./form-password-field";
import PrimaryButton from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

// types
interface PasswordInputs {
  password: string;
  confirmPassword: string;
}

interface PasswordModalProps {
  setViewPasswordModal: (status: boolean) => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({
  setViewPasswordModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<PasswordInputs>();

  const closeModal = () => {
    setViewPasswordModal(false);
  };
  // function to handle submission of password change request
  const handleSavePassword: SubmitHandler<PasswordInputs> = (data) => {
    if (getValues("password") !== getValues("confirmPassword")) {
      console.log("passwords don't match, try again");
      console.
      return;
    }
     
    console.log("PASSWORD SAVED)")
  };
  return (
    <div className="absolute inset-0 bg-[#291E43] bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-md m-7 md:w-1/3 p-5 text-sm">
        <div className="">
          <div className="mb-7 flex gap-5">
            <div className="text-2xl">🔒</div>
            <div className="py-1">
              <p>Are you sure you want to change your password?</p>
              <p className="text-gray-400 mt-3">
                Be reminded that you will be required to use the new password
                while signing in.
              </p>
            </div>
            <div className="text-xl cursor-pointer" onClick={closeModal}>
              ❌
            </div>
          </div>
          <form onSubmit={handleSubmit(handleSavePassword)}>
            <div>
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
            </div>
            <div className="flex justify-between w-full mt-3">
              <PrimaryButton type="reset" onClick={() => reset}>Cancel</PrimaryButton>
              <PrimaryButton type="submit">Confirm</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
