import style from "../Register/register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { userContext } from "../../Context/Context";

export default function Login() {
  const [ApiError, setApiErorr] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const {setToken } = useContext(userContext);

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
    .required("Password is required"),
  });
  const handleLogin = async (Userdata) => {
    try {
      setSpinner(true);

      const res = await axios.post(
        "http://127.0.0.1:3000/api/v1/auth/login",
        Userdata
      );
      setApiErorr("");
      setSpinner(false);

      const token = res?.data?.token;
      const role = res?.data?.role;
      console.log("Role:", role);
      console.log("Token:", token);
      if (role) {
        localStorage.setItem("role", role);
      }

      if (!token) {
        // مفيش توكن → نرجعه على صفحة اللوجن
        navigate("/login");
        return;
      }

      // نخزن التوكن
      localStorage.setItem("token", token);
      setToken(token);


      if (res.data.role === "Admin") {
        navigate("/dashboard");
      } else {
        console.log("Login response:", res.data);

        navigate("/");
      }
    } catch (error) {
      setSpinner(false);
      const message =
        error?.response?.data?.message || "Server error, try again";
      setApiErorr(message);
      console.error("Login error:", error);
    }
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
    if (formik.touched[field] && formik.errors[field])
      classes += ` ${style.inputInvalid}`;
    if (formik.touched[field] && !formik.errors[field])
      classes += ` ${style.inputValid}`;
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
