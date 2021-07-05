import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoginForm from "../../components/LoginForm";
import useStyles from "../../styles/_LoginForm";
import { Credentials } from "./types";
import { ToastContainer, toast } from "react-toastify";
import { login, logout } from "../../utils";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<string>("");
  const [error, setError] = useState<string[]>([]);

  const [credentials, setCredentials] = useState<Credentials>({
    email_address: "",
    password: "",
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogoutButton = () => {
    logout();
    history.push("/login");
  };

  const handleLogin = async () => {
    const { email_address, password } = credentials;
    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors: string[] = [];

    !validateEmail.test(email_address) && errors.push("email_address") && setErrorLogin("Invalid Email Address!");
    !email_address && errors.push("email_address");
    !password && errors.push("password");

    setError(errors);

    try {
      if (!errors.length) {
        const response = await axios.post("/login", {
          email_address: email_address.toLowerCase(),
          password: password,
        });
        const { data } = response;

        if (data === "Database down!") throw data;
        if (data === "Wrong password.") {
          setError(["password"])
          setErrorLogin(data);
        } else if (data === "Email does not exist.") {
          setError(["email_address"])
          setErrorLogin(data);
        } else {
          setErrorLogin("");
          login(data);
          toast("Logged in successfully!", {
            type: "success",
          });
          history.push("/dashboard");
        }
      }
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setCredentials((credentials) => ({ ...credentials, [name]: value }));
  };

  return (
    <div className={classes.root}>
      <ToastContainer />
      <Navbar
        open={!open}
        handleDrawerOpen={handleDrawerOpen}
        handleLogoutButton={handleLogoutButton}
      />
      <LoginForm
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleInputChange={handleInputChange}
        handleLogin={handleLogin}
        error={error}
        credentials={credentials}
        errorLogin={errorLogin}
      />
    </div>
  );
};

export default Login;
