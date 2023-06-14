import * as Yup from "yup";

export const settingsSchema = (id?: any) =>
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });
