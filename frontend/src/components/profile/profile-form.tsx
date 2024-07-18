import { useEffect, useState } from "react";
import PrimaryButton from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormField } from "./form-field";
import { FormPasswordField } from "./form-password-field";

// TYPES
interface UserType {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
}

interface ProfileFormProps {
  balance: number;
  user: UserType;
  setUser: (user: UserType) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  balance,
  user,
  setUser,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserType>();
  // const [passwordVisible, setPasswordVisible] = useState(false);

  // prefill form with user data, recall if user changes
  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("contact", user.contact);
    setValue("password", user.password);
  }, [user, setValue]);

  // on submit, edited profile will be saved in database
  const handleSave: SubmitHandler<UserType> = (data) => {
    console.log(data);
    const editedUser = data;

    //make API call to PUT edited user in database...something like: editUser(userId, editedUser)
    setUser(editedUser);
    alert("Profile Changed!");
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit(handleSave)}>
          <FormField
            label="Username"
            name="username"
            type="text"
            placeholder="Username"
            register={register}
            className="text-gray-400"
            disabled={true}
          />
          <FormField
            label="E-mail"
            name="email"
            type="text"
            placeholder="E-mail"
            register={register}
            className="text-gray-400"
            disabled={true}
          />
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
          <FormField
            label="Contact"
            name="contact"
            type="text"
            placeholder="Contact"
            register={register}
            errors={errors?.contact}
          />
          <FormPasswordField
            label="Password"
            name="password"
            placeholder="Password"
            register={register}
            errors={errors?.password}
          />

          <div>
            <p>
              Total Balance:{" "}
              <span className="font-bold text-lg">{balance.toString()}</span>
            </p>
          </div>
          <div className="flex justify-between w-full">
            <PrimaryButton
              type="button"
              className="bg-white border-primary text-primary uppercase"
              onClick={() => history.back()}
            >
              Discard Changes
            </PrimaryButton>
            <PrimaryButton type="submit">Save Changes</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};
