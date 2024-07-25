import { useEffect, useState } from "react";
import { ProfileForm } from "../components/profile/profile-form";
import { httpClient } from "../lib/http-client";

interface UserType {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
}

export const ProfilePage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [balance, setBalance] = useState<Number>(0);
  const [error, setError] = useState<String>("");

  // make api request to getUser from database
  useEffect(() => {
    async function getUser() {
      try {
        const response = await httpClient.get(
          "http://localhost:3000/api/profile"
        );
        const { data } = response.data;
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }

    getUser();
  }, []);

  // make api request to get balance for user based on userId
  useEffect(() => {
    async function getBalance() {
      setTimeout(() => setBalance(48.09), 1000);
    }
    getBalance();
  }, []);

  return (
    <div className="bg-white flex flex-col w-full gap-5 px-5 md:px-10 max-w-[1290px] pt-28 md:pt-16 m-auto">
      <h1 className="text-lg font-bold md:text-5xl pl-3">Profile</h1>

      <div className="md:flex md:gap-24">
        <div className="flex border border-primary bg-primary bg-opacity-10 rounded-lg p-3 text-primary h-fit md:w-1/3 items-center">
          <div className="bg-primary/30 mr-3 rounded px-2 py-2 items-start flex">
            <div className="icon-[ph--user-duotone] text-2xl"></div>
          </div>
          <div>
            <p className="text-lg">Account</p>
            <p className="text-xs opacity-60">Personal Information</p>
          </div>
        </div>
        <div className="my-5 md:my-0 md:w-2/3">
          <p className="text-primary text-lg mb-5">Personal Information</p>
          {user ? (
            <ProfileForm balance={balance} user={user} setUser={setUser} />
          ) : (
            <div>
              {error ? <p>Something went wrong!</p> : <p>Loading...</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
