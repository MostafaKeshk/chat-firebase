import { useState } from "react";

import { auth } from "../config/firebase";

import { updateProfile } from "firebase/auth";
import { useFormik } from "formik";
import { settingsSchema } from "../validations/settings";
import { useAlert } from "../contexts/AlertContext";

const useUserContainer = () => {
  const [loading, setLoading] = useState(false);
  const { setErrorMessage } = useAlert();
  const formik: any = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: settingsSchema,
    onSubmit: (values: any) => handleUser(values),
  });

  const handleUser = async (values: any) => {
    setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: values.name,
    })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return { formik, loading };
};

export default useUserContainer;
