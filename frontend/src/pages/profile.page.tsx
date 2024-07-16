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
  });

  // make api request to get balance for user based on userId
  useEffect(() => {
    async function getBalance() {
      //const res = await fetch();
      //const data = await res.json();
      setTimeout(() => setBalance(48.09), 1000);
    }
    getBalance();
  });

  return (
    <div className="bg-primary h-dvh">
      <h1>Profile Page</h1>
      {user ? (
        <ProfileForm balance={balance} user={user} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
