"use client";
import { Suspense, useEffect, useState } from "react";
import { baseUrl } from "@/utils/baseUrl";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import PageLoading from "../components/Loaders/PageLoading";
import ButtonLoading from "../components/Loaders/ButtonLoading";
import Error from "../components/Errors/Error";

export default function SignupPage() {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () =>
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}users/signup`, signupData);
      if (response.data.success) {
        router.push("/login");
      } else {
        setError(response.data.error);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    signupData.email.length > 0 &&
    signupData.username.length > 0 &&
    signupData.password.length > 0
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  }, [signupData]);

  return (
    <Suspense fallback={<PageLoading />}>
      <div className="min-h-screen flex justify-center md:items-center py-[12vh] md:p-[20vh_6vw]">
        <div className="h-max flex flex-col md:flex-row justify-center gap-[6vw] md:gap-[8vw] lg:border-8 lg:p-10">
          <div className="text-[3rem] md:text-[4rem] leading-[3rem] md:leading-[4rem] flex flex-col justify-center font-extrabold bg-gradient-to-r from-white to-[#98f] bg-clip-text text-transparent">
            <div>SHARE,</div>
            <div>SOLVE,</div>
            <div>SUCCEED.</div>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="w-[250px] text-left font-bold text-xl">
              Create your account
            </div>
            {error && <Error error={error} />}
            <input
              type="text"
              onChange={(e) => {
                setError("");
                setSignupData({ ...signupData, username: e.target.value });
              }}
              placeholder="username"
              required
              className="auth-input"
            />
            <input
              type="email"
              onChange={(e) => {
                setError("");
                setSignupData({ ...signupData, email: e.target.value });
              }}
              placeholder="email"
              required
              className="auth-input"
            />
            <div className="w-max h-max flex items-center relative">
              <input
                type={passwordType}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                placeholder="password"
                required
                minLength={4}
                maxLength={16}
                className="auth-input"
              />
              {passwordType === "password" ? (
                <FaEye
                  className="absolute right-2"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-2"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <button
              type="submit"
              disabled={buttonDisabled}
              className={`w-[250px] p-2 ${!loading && "bg-5"} disabled:text-8`}
            >
              <div>{loading ? <ButtonLoading /> : "Sign up"}</div>
            </button>
            <div>
              Already have an account?{" "}
              <Link href="/login" className="text-[#75f] font-bold underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
}
