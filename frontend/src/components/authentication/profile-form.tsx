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
  setUser: (user: UserType) => void
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ balance, user, setUser }) => {
  const [formData, setFormData] = useState<UserType>(user);
  const [isEditing, setIsEditing] = useState(false);
  
  const { username, password, email, firstName, lastName } = user;

  // temp styles
  const styles = "border border-black p-1 rounded m-1";

  // update formData on input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  // toggle isEditing
  const toggleEdit = () => setIsEditing((prev) => !prev);

  // on submit, edited profile will be saved in database
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const editedUser = formData;


    //make API call to PUT edited user in database...something like: editUser(userId, editedUser)
    setUser(editedUser)
    alert("Profile Changed!");
    setIsEditing(false);
  };
  return (
    <>
      <div className="bg-white rounded-md w-7/12 p-10">
        <form onSubmit={handleSave}>
          <div>
            <label htmlFor="username">
              Username:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`${styles} text-gray-400`}
                  disabled
                />
              ) : (
                <span>{username}</span>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles} text-gray-400`}
                  disabled
                />
              ) : (
                <span>{email}</span>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="firstName">
              First Name:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles}
                />
              ) : (
                <span>{firstName}</span>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="lastName">
              Last Name:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles}
                />
              ) : (
                <span>{lastName}</span>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles}
                />
              ) : (
                <span>{password}</span>
              )}
            </label>
          </div>
          <div>
            <p>
              Total Balance:{" "}
              <span className="font-bold text-lg">{balance.toString()}</span>
            </p>
          </div>
          {!isEditing ? (
            <PrimaryButton onClick={toggleEdit}>Edit Profile</PrimaryButton>
          ) : (
            <div>
              <PrimaryButton type="submit">Save</PrimaryButton>
              <PrimaryButton type="button" onClick={toggleEdit}>
                Cancel
              </PrimaryButton>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
