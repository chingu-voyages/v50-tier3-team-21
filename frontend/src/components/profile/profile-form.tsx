import { useEffect, useState } from "react";
import PrimaryButton from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormField } from "./form-field";
import { PasswordModal } from "./password-modal";
import { UserType, ProfileFormProps } from "./types/profile-types";
import {httpClient} from "../../lib/http-client.ts";
const BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL;

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, setUser }) => {
  const [viewPasswordModal, setViewPasswordModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserType>();

  // prefill form with user data, recall if user changes
  useEffect(() => {
    reset(user);
  }, [user, reset]);

  // on submit, edited profile will be saved in database
  const handleSave: SubmitHandler<UserType> = async (data) => {
    console.log(data);
    const editedUser = data;

    //make API call to PUT edited user in database...something like: editUser(userId, editedUser)
    try {
      const response = await httpClient.put(
        `${BASE_URL}/profile`,
        editedUser
      );
      const { data } = response.data;
      console.log(data);
      setUser(editedUser)
      alert("Profile edited");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full">
      <p className="text-primary text-lg mb-5">Personal Information</p>
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="flex flex-col md:flex-row md:gap-3">
            <FormField
              label="First Name"
              name="firstName"
              type="text"
              placeholder="First Name"
              register={register}
              errors={errors?.firstName}
            />
            <FormField
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Last Name"
              register={register}
              errors={errors?.lastName}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <FormField
              label="Your username"
              name="username"
              type="text"
              placeholder="username"
              register={register}
              className="text-gray-400 bg-gray-200"
              disabled={true}
            />
            <FormField
              label="Your email"
              name="email"
              type="text"
              placeholder="name@email.com"
              register={register}
              className="text-gray-400 bg-gray-200"
              disabled={true}
            />
          </div>
          <FormField
            label="Your Contact"
            name="contact"
            type="text"
            placeholder="555-555-5555"
            register={register}
            errors={errors?.contact}
          />
          <div
            className="text-secondary font-bold mb-5 cursor-pointer"
            onClick={() => setViewPasswordModal(true)}
          >
            Change Password
          </div>

          <div className="flex justify-between w-full">
            <PrimaryButton
              type="button"
              className="bg-white border rounded-md p-3 font-bold border-primary text-primary uppercase"
              onClick={() => reset(user)}
            >
              Discard Changes
            </PrimaryButton>
            {/* //? why does className="uppercase" break button classes? */}
            <PrimaryButton type="submit">SAVE CHANGES</PrimaryButton>
          </div>
        </form>
        {viewPasswordModal && (
          <PasswordModal setViewPasswordModal={setViewPasswordModal} />
        )}
      </div>
    </>
  );
};
