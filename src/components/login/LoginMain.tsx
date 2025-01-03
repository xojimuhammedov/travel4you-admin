"use client";
import Link from "next/link";

import Image from "next/image";
import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useGlobalContext from "@/hooks/use-context";
import Preloader from "@/sheardComponent/Preloader/Preloader";
import apiUrl from "../../utils/api";

interface FormData {
  username: string;
  password: string;
}

const LoginMain = () => {
  const { loading, setLoading } = useGlobalContext();
  const [loginError, setloginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);

    const email = data.username;
    const password = data.password;

    const userInfo = {
      username: email,
      password,
    };

    axios
      .post(`${apiUrl}/auth/signin`, userInfo)
      .then((res) => {
        if(res?.data?.data?.role === "superadmin"){
          const token = res?.data?.data?.accessToken?.token;
          localStorage.setItem("accessToken", token);
          router.push("/");
        }
        setLoading(false);
        setloginError("Password Not Match");
      })
      .catch((error) => {});
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-login-area flex justify-center items-center w-full h-full">
        <div className="cashier-login-wrapper">
          <div className="cashier-login-logo text-center mb-12">
            <h3>Admin Panel</h3>
            {/* <Image src={logo} alt="logo not found" /> */}
          </div>

          <div className="cashier-select-field mb-5">
            <div className="cashier-input-field-style">
              <div className="single-input-field w-full">
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("username", {})}
                />
                {errors.username && (
                  <span className="error-message">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <span className="input-icon">
                <i className="fa-light fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="cashier-select-field mb-5">
            <div className="cashier-input-field-style">
              <div className="single-input-field w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {})}
                />
                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <span className="input-icon">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn">
                  <i
                    className={
                      showPassword
                        ? "fa-solid fa-eye"
                        : "fa-regular fa-eye-slash"
                    }></i>
                </button>
              </span>
            </div>
          </div>
          <span className="error-message">{loginError && loginError}</span>
          <div className="cashier-login-btn mb-7">
            <div className="cashier-login-btn-full default-light-theme">
              <button className="btn-primary" type="submit">
                Login{" "}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginMain;
