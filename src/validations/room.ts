import * as Yup from "yup";

export const roomSchema = (id?: any) =>
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });
