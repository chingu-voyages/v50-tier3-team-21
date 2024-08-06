import { useEffect, useState } from "react";
import { ProfileForm } from "../components/profile/profile-form";
import { Wallet } from "../components/profile/wallet";
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
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [active, setActive] = useState<string>("account");

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
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
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

  const toggleActive = (section: string) => {
    setActive(section);
  };

  return (
    <div className="bg-white flex flex-col w-full gap-5 px-5 md:px-10 max-w-[1290px] pt-28 md:pt-16 m-auto">
      <h1 className="text-lg font-bold md:text-5xl pl-3">Profile</h1>

      <div className="md:flex md:gap-24">
        <div className=" flex flex-col gap-5 md:w-1/3">
          <div
            className={`flex border rounded-lg p-3 h-fit items-center cursor-pointer ${
              active === "account"
                ? "border-primary bg-primary bg-opacity-10 text-primary"
                : "border-[#291E43]/30 text-[#291E43]"
            }`}
            onClick={() => toggleActive("account")}
          >
            <div
              className={`mr-3 rounded-lg px-2 py-2 items-start flex ${
                active === "account" ? "bg-primary/30 " : "bg-[#291E43]/10"
              }`}
            >
              <div className="icon-[ph--user-duotone] text-2xl"></div>
            </div>
            <div>
              <p className="text-lg">Account</p>
              <p className="text-xs text-[#291E43]/30">Personal Information</p>
            </div>
          </div>
          <div
            className={`flex border rounded-lg p-3 h-fit items-center cursor-pointer ${
              active === "payment"
                ? " border-primary bg-primary bg-opacity-10 text-primary"
                : "border-[#291E43]/30 text-[#291E43]"
            }`}
            onClick={() => toggleActive("payment")}
          >
            <div
              className={`mr-3 rounded-lg px-2 py-2 items-start flex ${
                active === "payment" ? "bg-primary/30" : "bg-[#291E43]/10"
              }`}
            >
              <div className="icon-[solar--wallet-money-bold-duotone] text-2xl"></div>
            </div>
            <div>
              <p className="text-lg">Payment Details</p>
              <p className="text-xs text-[#291E43]/30">Wallet Balance</p>
            </div>
          </div>
        </div>
        <div className="my-5 md:my-0 md:w-2/3">
          {active === "account" ? (
            user ? (
              <ProfileForm balance={balance} user={user} setUser={setUser} />
            ) : (
              <div>
                {error ? <p>Something went wrong!</p> : <p>Loading...</p>}
              </div>
            )
          ) : (
            active === "payment" && <Wallet />
          )}
        </div>
      </div>
    </div>
  );
};
