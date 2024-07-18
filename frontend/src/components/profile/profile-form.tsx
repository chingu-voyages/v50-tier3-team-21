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
    // setValue,
    formState: { errors },
    reset
  } = useForm<UserType>();
  // const [passwordVisible, setPasswordVisible] = useState(false);

  // prefill form with user data, recall if user changes
  useEffect(() => {
    // setValue("username", user.username);
    // setValue("email", user.email);
    // setValue("firstName", user.firstName);
    // setValue("lastName", user.lastName);
    // setValue("contact", user.contact);
    // setValue("password", user.password);
    reset(user)
  }, [user, reset]);

  // on submit, edited profile will be saved in database
  const handleSave: SubmitHandler<UserType> = (data) => {
    console.log(data);
    const editedUser = data;

    //make API call to PUT edited user in database...something like: editUser(userId, editedUser)
    setUser(editedUser);
    alert("Profile Changed!");
  };

  const handleChangePassword = () => {
    if (confirm('Are you sure you want to change your password?')) {
      console.log('Proceed to change pasword');
    } else {
      console.log("Don't change password");
    }
  }

  return (
    <>
      <div className="w-full">
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
          <div className="text-secondary font-bold mb-5 cursor-pointer" onClick={handleChangePassword}>Change Password</div>
          {/* <FormPasswordField
            label="Password"
            name="password"
            placeholder="Password"
            register={register}
            errors={errors?.password}
          /> */}

          {/* <div>
            <p>
              Total Balance:{" "}
              <span className="font-bold text-lg">{balance.toString()}</span>
            </p>
          </div> */}

          <div className="flex justify-between w-full">
            <PrimaryButton
              type="button"
              className="bg-white border-primary text-primary uppercase"
              onClick={() => reset(user)}
            >
              Discard Changes
            </PrimaryButton>
            {/* //? why does className="uppercase" break button classes? */}
            <PrimaryButton type="submit">SAVE CHANGES</PrimaryButton> 
          </div>
        </form>
      </div>
    </>
  );
};
