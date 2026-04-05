import * as Yup from "yup";

export const ProfileSettingsSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  presentAddress: Yup.string().required("Present address is required"),
  permanentAddress: Yup.string().required("Permanent address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal code is required"),
  country: Yup.string().required("Country is required"),
});
