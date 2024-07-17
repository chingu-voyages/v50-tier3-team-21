import { useEffect, useState } from "react";
import { ProfileForm } from "../components/authentication/profile-form";

interface UserType {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

// example of the user Object fetched from database
let exampleUser: UserType = {
  username: "minezzig",
  password: "12345",
  email: "myemail@gmail.com",
  firstName: "greg",
  lastName: "minezzi",
};

export const ProfilePage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [balance, setBalance] = useState<number>(0);

  // make api request to getUser from database
  useEffect(() => {
    async function getUser() {
      // const res = await fetch();
      // const data = await res.json();
      setTimeout(() => setUser(exampleUser), 800);
    }
    getUser();
  }, [user]);

  // make api request to get balance for user based on userId
  useEffect(() => {
    async function getBalance() {
      //const res = await fetch();
      //const data = await res.json();
      setTimeout(() => setBalance(48.09), 1000);
    }
    getBalance();
  }, []);

  return (
    <div className="bg-white flex flex-col w-full gap-5 p-5">
      <header className="h-24">header</header>
      <h1 className="text-lg font-bold">Profile</h1>

      <div className="main_container">
        <div className="flex border border-primary bg-primary bg-opacity-10 rounded-lg p-3 text-primary h-fit">
          <div className="h-10 w-10 mr-3 bg-primary bg-opacity-30 rounded"/>
          <div>
            <p className="text-lg">Account</p>
            <p className="text-xs opacity-60">Personal Information</p>
          </div>
        </div>
        <div className="my-5">
          <p className="text-primary text-lg mb-5">Personal Information</p>
          {user ? (
            <ProfileForm balance={balance} user={user} setUser={setUser} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};
