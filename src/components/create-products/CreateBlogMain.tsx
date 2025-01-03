"use client";

import moment from "moment/moment";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context";
import apiUrl from "@/utils/api";
import NiceSelectThree from "@/utils/NiceSelectThree";
import CKeditor from "../create-service/CKeditor";
import { useRouter } from "next/navigation";
import Preloader from "@/sheardComponent/Preloader/Preloader";

interface FormData {
  title: string;
  description: string;
  images: string;
}

const CreateServiceMain = () => {
  const router = useRouter();
  const { loading, setLoading } = useGlobalContext();

  const [upload, setupload] = useState<boolean>(false);
  const active: any = true;
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [dataOne, setDataOne] = useState<string>("");
  const [dataTwo, setDataTwo] = useState<string>("");
  const [dataThree, setDataThree] = useState<string>("");
  const [blogs, setBlogs] = useState([]);
  const [blogImg, setBlogImg] = useState<string>("");
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const [loginError, setloginError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();
    setLoading(true);

    if (data.images && data.images.length) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    formData.append("title", data.title);
    formData.append("description", dataOne);

    axios
      .post(`${apiUrl}/destination/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(`Destination yaratildi!🎉`, {
          position: "top-left",
        });
        reset();
        router.push("/products");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          toast.error(`Qaytadan login qiling!`, {
            position: "top-left",
          });
          console.error("Unauthorized access");
        } else {
          console.error("Unauthorized access");
        }
      });
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] ml-[300px] px-7">
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Manzil yaratish
          </h4>
          <div className="grid grid-cols-12 gap-x-5">
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Nomi
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Name (English)"
                      {...register("title", {
                        required: "Name (Uzbek) is required",
                      })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:col-span-8 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Izoh (English)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <CKeditor
                      onChange={(data: string) => {
                        setDataOne(data);
                      }}
                      editorLoaded={editorLoaded}
                    />
                    {errors.description && (
                      <span>{errors.description.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Image upload
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="file"
                      placeholder="Add Product Rating"
                      {...register("images")}
                      style={{ padding: 0 }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                <button className="btn-primary" type="submit">
                  Создавать
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateServiceMain;
