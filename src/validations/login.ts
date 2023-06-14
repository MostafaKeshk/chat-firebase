import * as Yup from "yup";
import { phoneRegex } from "../utils/regex";

export const loginSchema = (id?: any) =>
  Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(phoneRegex, "Phone Number is not valid"),
  });

export const otpSchema = (id?: any) =>
  Yup.object().shape({
    otp: Yup.string().required("OTP is required"),
  });
