import style from "./register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";

export default function Register() {
  const [ApiError, setApiErorr] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z ]{3,30}$/, "Name must be 3-30 letters only")
      .required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0-9]{9}$/, "Phone must be 11 digits, starting with 01")
      .required("Phone is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must be 8+ chars, include uppercase, lowercase & number"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("RePassword is required"),
  });

  const handleRegister = (Userdata) => {
    setSpinner(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", Userdata)
      .then(() => {
        setSpinner(false);
        setApiErorr("");
        navigate("/login");
      })
      .catch((error) => {
        setSpinner(false);
        const message =
          error?.response?.data?.message || "Server error, try again";
        setApiErorr(message);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema,
  });

  // function to combine classes
  const getInputClass = (field) => {
    let classes = style.input;
    if (formik.touched[field] && formik.errors[field]) classes += ` ${style.inputInvalid}`;
    if (formik.touched[field] && !formik.errors[field]) classes += ` ${style.inputValid}`;
    return classes;
  };

  // small reusable component for error message
  const FieldError = ({ name }) =>
    formik.touched[name] && formik.errors[name] ? (
      <div className={style.fieldError}>{formik.errors[name]}</div>
    ) : null;

  return (
    <div className={style.page}>
      <form className={style.card} onSubmit={formik.handleSubmit} noValidate>
        <div className={style.title}>
          <h3>Register Now</h3>
          {ApiError && <div className={style.apiError}>{ApiError}</div>}
        </div>

        {/* Name */}
        <div className={style.inputGroup}>
          <input
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getInputClass("name")}
            placeholder=" "
          />
          <label htmlFor="name" className={style.label}>Name</label>
          <FieldError name="name" />
        </div>

        {/* Email */}
        <div className={style.inputGroup}>
          <input
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getInputClass("email")}
            placeholder=" "
          />
          <label htmlFor="email" className={style.label}>Email</label>
          <FieldError name="email" />
        </div>

        {/* Password */}
        <div className={style.inputGroup}>
          <input
            id="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getInputClass("password")}
            placeholder=" "
          />
          <label htmlFor="password" className={style.label}>Password</label>
          <FieldError name="password" />
        </div>

        {/* RePassword */}
        <div className={style.inputGroup}>
          <input
            id="rePassword"
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getInputClass("rePassword")}
            placeholder=" "
          />
          <label htmlFor="rePassword" className={style.label}>RePassword</label>
          <FieldError name="rePassword" />
        </div>

        {/* Phone */}
        <div className={style.inputGroup}>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={getInputClass("phone")}
            placeholder=" "
          />
          <label htmlFor="phone" className={style.label}>Phone</label>
          <FieldError name="phone" />
        </div>

        {/* Submit */}
        <button type="submit" className={style.btnSubmit} disabled={spinner}>
          {spinner ? <span className={style.spinner} /> : "Submit"}
        </button>

        <p className={style.accountText}>
          Already have an account?{" "}
          <Link to="/login" className={style.loginLink}>Login</Link>
        </p>
      </form>
    </div>
  );
}
