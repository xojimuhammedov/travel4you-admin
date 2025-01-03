"use client";
import React from "react";
import store, { persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { childrenType } from "@/interFace/interFace";
import Preloader from "@/sheardComponent/Preloader/Preloader";

const ReduxProvider = ({ children }: childrenType) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
