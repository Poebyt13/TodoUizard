import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import axios from "axios";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>-]/,
      "Password must contain at least one special character"
    )
    .refine((val) => !val.includes(" "), "Password cannot contain spaces"),
  passwordConfirmation: z.string().min(1, "Please confirm your password"),
});

function Signup() {
  const [profilePic, setProfilePic] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      profilePicture: null, 
    },
  });

  // gestisco il file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file); 
    }
  };

  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirmation) {
      form.setError("passwordConfirmation", {
        message: "Passwords do not match",
      });
      return;
    }

    // creazione formdata per l'invio del file
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (profilePic) {
      formData.append("profilePicture", profilePic);
    }

    // invio dei dati per la registrazione (backend)
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        console.log("User created successfully:", res);
      } 
    } catch (err) {
      if (err.response) {

        if (err.response.status === 409) {
          form.setError("email", {
            message: "User already exists, please choose another email",
          });
        } else {
          alert("An error occurred, please try again later.");
        }
      } else {
        console.log("Request Failed:", err);
      }
  
  }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Form {...form}>
        <form className="w-[17rem]" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black !important">Email</FormLabel>
                  <FormControl>
                    <input
                      className={`p-1.5 rounded-sm border-2 text-[.9rem] focus:outline-2 focus:[#A1A1AA] ${
                        form.formState.errors.email ? "border-red-500" : ""
                      }`}
                      type="email"
                      {...field}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black !important">Password</FormLabel>
                  <FormControl>
                    <input
                      className={`p-1.5 rounded-sm border-2 text-[.9rem] focus:outline-2 focus:[#A1A1AA] ${
                        form.formState.errors.password ? "border-red-500" : ""
                      }`}
                      type="password"
                      {...field}
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black !important">Confirm Password</FormLabel>
                  <FormControl>
                    <input
                      className={`p-1.5 rounded-sm border-2 text-[.9rem] focus:outline-2 focus:[#A1A1AA] ${
                        form.formState.errors.passwordConfirmation
                          ? "border-red-500"
                          : ""
                      }`}
                      type="password"
                      {...field}
                      placeholder="Confirm your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label htmlFor="file-upload" className="text-black text-sm">
                    Profile Picture
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]); 
                      handleFileChange(e);
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-gray-100 text-gray-500 px-3 py-1.5 rounded-sm border-2 border-dashed border-gray-300 hover:border-black hover:text-black duration-200 text-sm text-center"
                  >
                    {profilePic ? "Change Picture" : "Upload a Profile Picture"}
                  </label>
                  {profilePic && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(profilePic)}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover border-2"
                      />
                    </div>
                  )}
                </div>
              )}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white rounded-sm px-3 py-1.5 text-sm border-2 border-transparent cursor-pointer hover:bg-white hover:border-2 hover:border-black hover:text-black duration-200"
          >
            Sign Up
          </button>
          <div>
            <FormDescription className="mt-4">
              Already have an account?{" "}
              <Link to="/" className="underline duration-200 hover:font-semibold">
                Login
              </Link>
            </FormDescription>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Signup;
