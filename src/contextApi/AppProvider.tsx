"use client";
import React, { createContext, useState, useEffect } from "react";
import { AppContextType, IUser } from "@/interFace/interFace";
import axios from "axios";
import jwtDecode from "jwt-decode";
import TOKEN from "./../utils/token";
import { useRouter } from "next/navigation";

export const AppContext = createContext<AppContextType | undefined>(undefined);
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Browserda ekanligimizni tekshiramiz
      const accessToken:any = localStorage.getItem("accessToken");
      setToken(accessToken);
    }
  }, []);

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`${"https://test.al-muamalat.uz/api"}/auth/getme`, header)
        .then((res) => {
          console.log(res.data.data)
            const userinfo = res.data.data;
            setUser(userinfo);
            setLoading(false);  
            router.push("/");
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    } else {
      setLoading(false);
    }
  }, [token, update]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setLoading(false);
    setUser(undefined);
  };

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const contextValue: AppContextType = {
    sideMenuOpen,
    setSideMenuOpen,
    toggleSideMenu,
    scrollDirection,
    setScrollDirection,
    showSidebar,
    setShowSidebar,
    user,
    setLoading,
    loading,
    logout,
    setUser,
    header,
    update,
    setUpdate,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
