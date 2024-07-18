import { useEffect, useState } from "react";
import PrimaryButton from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

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
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  // temp styles
  const styles =
    "border border-black m-1 p-3 rounded-lg text-sm text-red my-5  active:outline-secondary focus:outline-primary";

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit(handleSave)}>
          {" "}
          {/* SHOUDL BE HANDLESAVE*/}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className={`${styles} text-gray-400`}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm">
              Email{" "}
            </label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className={`${styles} text-gray-400`}
              disabled
            />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="firstName" className="text-sm">
              First Name
            </label>
            <input
              {...register("firstName", { required: "Name is requried" })}
              type="text"
              id="firstName"
              {...register("firstName")}
              placeholder="First Name"
              className={styles}
            />
            {errors.firstName && (
              <span className="text-danger absolute bottom-0 text-xs right-0">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="lastName" className="text-sm">
              Last Name:
            </label>
            <input
              {...register("lastName", { required: "Last name is requried" })}
              type="text"
              id="lastName"
              {...register("lastName")}
              placeholder="Last Name"
              className={styles}
            />
            {errors.lastName && (
              <span className="text-danger absolute bottom-0 text-xs right-0">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="contact" className="text-sm">
              Contact:
            </label>
            <input
              {...register("contact", {
                required: "Contact number is requried",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              type="tel"
              id="contact"
              {...register("contact")}
              placeholder="555-555-1234"
              className={styles}
            />
            {errors.contact && (
              <span className="text-danger absolute bottom-0 text-xs right-0">
                {errors.contact.message}
              </span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm">
              Password:
            </label>
            <input
              type={passwordVisible ? "password" : "text"}
              id="password"
              {...register("password", { required: "Password is requried" })}
              placeholder="Password"
              className={styles}
              minLength={8}
            />
            <div
              className="absolute top-[50%] right-5 cursor-pointer"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? "(see)" : "(hide)"}
            </div>
            {errors.password && (
              <span className="text-danger absolute bottom-0 text-xs right-0">
                {errors.password.message}
              </span>
            )}
          </div>
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
