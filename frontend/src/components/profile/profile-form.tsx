import { useState } from "react";
import PrimaryButton from "../ui/button";

interface UserType {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
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
  const [formData, setFormData] = useState<UserType>(user);

  // temp styles
  const styles = "border border-black m-1 p-3 rounded-lg text-sm text-red my-5  active:outline-secondary focus:outline-primary";

  // update formData on input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  // on submit, edited profile will be saved in database
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editedUser = formData;

    //make API call to PUT edited user in database...something like: editUser(userId, editedUser)
    setUser(editedUser);
    alert("Profile Changed!");
  };
  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSave}>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className={`${styles} text-gray-400`}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm">Email </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles} text-gray-400`}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-sm">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={styles}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={styles}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles}
            />
          </div>
          <div>
            <p>
              Total Balance:{" "}
              <span className="font-bold text-lg">{balance.toString()}</span>
            </p>
          </div>

          <div className="flex justify-between w-full">
            <PrimaryButton type="button" className="bg-white border-primary text-primary uppercase">
              Discard Changes
            </PrimaryButton>
            <PrimaryButton type="submit">Save Changes</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};
