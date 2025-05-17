"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";

export type PatientState = {
  status: "success" | "error" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const patientSchema = z.object({
  fullName: z
    .string({ message: "Name Should be a string" })
    .nonempty({ message: "Name is required" })
    .min(3, { message: "Name should be of minimum length 3" })
    .max(50, { message: "Name should be of maximum length 50" }),

  email: z
    .string()
    .email({ message: "Email is invalid" })
    .nonempty({ message: "Email is required" }),
  phoneNumber: z.string().nonempty({ message: "Phone number is required" }),
  gender: z.string().nonempty({ message: "Gender is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  emergencyContactName: z
    .string()
    .nonempty({ message: "Emergency Contact Name is required" }),
  emergencyContactNumber: z
    .string()
    .nonempty({ message: "Emergency Contact Number is required" }),
  userId: z.string().nonempty({ message: "User Id is required" }),
});

export async function createPatient(initialState:any, formData: FormData) {
  try {
    const parsedData = patientSchema.safeParse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      gender: formData.get("gender"),
      address: formData.get("address"),
      emergencyContactName: formData.get("emergencyContactName"),
      emergencyContactNumber: formData.get("emergencyContactNumber"),
      userId: formData.get("userId"),
    });

    if (!parsedData.success) {
      const state: PatientState = {
        status: "error",
        errors: parsedData.error.flatten().fieldErrors,
        message: "Oops there is something wrong with the fields.",
      };
      return state;
    }

    const patient = await prisma.patient.create({
      data: {
        fullName: parsedData.data.fullName,
        email: parsedData.data.email,
        phoneNumber: parsedData.data.phoneNumber,
        gender: parsedData.data.gender,
        address: parsedData.data.address,
        emergencyContactName: parsedData.data.emergencyContactName,
        emergencyContactNumber: parsedData.data.emergencyContactNumber,
        userId: parsedData.data.userId,
      },
    });

    const state: PatientState = {
      status: "success",
      message: "Patient created successfully",
    };

    return state;
  } catch (error) {
    console.log(error);
    const state: PatientState = {
      status: "error",
      message: "Something went wrong while submitting the form",
    };
    return state;
  }
}

