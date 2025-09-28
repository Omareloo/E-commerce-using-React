import style from "../Register/register.module.css"; 
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";

export default function Login() {
  const [ApiError, setApiErorr] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must be 8+ chars, include uppercase, lowercase & number"
      )
      .required("Password is required"),
  });

  const handleLogin = (Userdata) => {
    setSpinner(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", Userdata)
      .then(() => {
        setSpinner(false);
        setApiErorr("");
        navigate("/");
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
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });

  const getInputClass = (field) => {
    let classes = style.input;
    if (formik.touched[field] && formik.errors[field]) classes += ` ${style.inputInvalid}`;
    if (formik.touched[field] && !formik.errors[field]) classes += ` ${style.inputValid}`;
    return classes;
  };

  const FieldError = ({ name }) =>
    formik.touched[name] && formik.errors[name] ? (
      <div className={style.fieldError}>{formik.errors[name]}</div>
    ) : null;

  return (
    <div className={style.page}>
      <form className={style.card} onSubmit={formik.handleSubmit} noValidate>
        <div className={style.title}>
          <h3>Login Now</h3>
          {ApiError && <div className={style.apiError}>{ApiError}</div>}
        </div>

        {["email", "password"].map((field) => (
          <div className={style.inputGroup} key={field}>
            <input
              id={field}
              name={field}
              type={field === "password" ? "password" : "text"}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getInputClass(field)}
              placeholder=" "
            />
            <label htmlFor={field} className={style.label}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <FieldError name={field} />
          </div>
        ))}

        <button type="submit" className={style.btnSubmit} disabled={spinner}>
          {spinner ? <span className={style.spinner} /> : "Login"}
        </button>

        <p className={style.accountText}>
          Don’t have an account?{" "}
          <Link to="/register" className={style.loginLink}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
