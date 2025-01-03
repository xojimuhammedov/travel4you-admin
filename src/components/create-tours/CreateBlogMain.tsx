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

interface FormData {
  name_uz: string;
  name_en: string;
  name_ru: string;
  collectionId: string;
  file:string;
}

const CreateServiceMain = () => {
  const { user, header } = useGlobalContext();
  const [upload, setupload] = useState<boolean>(false);
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

    if (data.file && data.file.length) {
      for (let i = 0; i < data.file.length; i++) {
        formData.append("file", data.file[i]);
      }
    }

    formData.append("name_uz", data.name_uz);
    formData.append("name_en", data.name_en);
    formData.append("name_ru", data.name_ru);
    formData.append("collectionId", data.collectionId);

    axios
      .post(`${apiUrl}/colours/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
            toast.success(`Rang yaratildi!🎉`, {
              position: "top-left",
            });
            reset();
            setupload(false);
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
    axios
      .get(`${apiUrl}/collections?limit=1000`)
      .then((res) => {
        setBlogs(res.data.data);
        // setotalPages(res.data.totalPages);
        // setcurrentPage(res.data.currentPage);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] ml-[300px] px-7">
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
           Rang yaratish
          </h4>
          <div className="grid grid-cols-12 gap-x-5">
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Name (Uzbek)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Name (Uzbek)"
                      {...register("name_uz", {
                        required: "Name (Uzbek) is required",
                      })}
                    />
                    {errors.name_uz && <span>{errors.name_uz.message}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Name (English)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Name (English)"
                      {...register("name_en", {
                        required: "Name (English) is required",
                      })}
                    />
                    {errors.name_en && <span>{errors.name_en.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Name (Russian)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Name (Russian)"
                      {...register("name_ru", {
                        required: "Name (Russian) is required",
                      })}
                    />
                    {errors.name_ru && <span>{errors.name_ru.message}</span>}
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Rang rasmini yuklang
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="file"
                      placeholder="Add Product Rating"
                      {...register("file")}
                      style={{ padding: 0 }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Tour bo`yicha tanlang
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <select
                      {...register("collectionId", {
                        required: "Rang turi (Uzbek) is required",
                      })}
                      name="collectionId">
                      <option selected value="Tanlang">
                        Tanlang
                      </option>
                      {blogs.map((item: any, index: any) => (
                        <option key={index} value={item.id}>
                          {item.name_uz}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                <button className="btn-primary" type="submit">
                  Yaratish
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
