import { useFormik } from "formik";

import { loginSchema, otpSchema } from "../validations/login";
import { useState } from "react";
import { auth } from "../config/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { useAlert } from "../contexts/AlertContext";

let appVerifier;

const useLoginContainer = () => {
  const { setErrorMessage } = useAlert();
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const [isPhoneNumberContainer, setIsPhoneNumberContainer] = useState(true);
  const [isConfirmationContainer, setIsConfirmationContainer] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResendCode = () => {
    setShowCaptcha(true);
    setIsPhoneNumberContainer(!isPhoneNumberContainer);
    setIsConfirmationContainer(!isConfirmationContainer);
  };

  const handleSignIn = async (values: any) => {
    setLoading(true);
    // create invisible captcha
    appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback() {
          setLoading(false);
        },
      },
      auth
    );

    try {
      const result = await signInWithPhoneNumber(
        auth,
        values.phoneNumber,
        appVerifier
      );
      setLoading(false);
      setShowCaptcha(false);
      setConfirmationResult(result);
      formikCode.setFieldValue("otp", "");
      setIsPhoneNumberContainer(!isPhoneNumberContainer);
      setIsConfirmationContainer(!isConfirmationContainer);
    } catch (error: any) {
      setShowCaptcha(false);
      setLoading(false);
      setShowCaptcha(true);
      setErrorMessage(error.message);
    }
  };

  const handleConfirmation = async (values: any) => {
    setLoading(true);
    if (confirmationResult) {
      confirmationResult
        .confirm(values.otp)
        .then(() => {
          setLoading(false);
          console.log("done");
        })
        .catch((error: any) => {
          setLoading(false);
          setErrorMessage(error.message);
        });
    } else {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const formik: any = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values: any) => handleSignIn(values),
  });

  const formikCode: any = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpSchema,
    onSubmit: (values: any) => handleConfirmation(values),
  });

  return {
    loading,
    formik,
    formikCode,
    isPhoneNumberContainer,
    isConfirmationContainer,
    handleResendCode,
    showCaptcha,
    handleLogout,
  };
};

export default useLoginContainer;
