import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoginForm from "../../components/LoginForm";
import useStyles from "../../styles/_LoginForm";
import { Credentials } from "./types";
import { login, logout } from "../../utils";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [errorLoginPassword, setErrorLoginPassword] = useState<boolean>(false);
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

    !email_address && errors.push("email_address");
    !password && errors.push("password");
    !validateEmail.test(email_address) && errors.push("email_address");

    setError(errors);

    try {
      if (!errors.length) {
        const result = await axios.post("/login", {
          email_address: email_address.toLowerCase(),
          password: password,
        });

        const { success, message, user, email, id } = result.data;

        if (!success) throw Error;
        else {
          if (message === "Wrong password.") {
            setErrorLoginPassword(true);
            setErrorLogin(false);
          } else if (message === "Invalid credentials!") {
            setErrorLogin(true);
          } else {
            setErrorLoginPassword(false);
            setErrorLogin(false);
            login(email, user, message, id);
            history.push("/dashboard");
          }
        }
      }
    } catch (error) {
      Swal.fire("An error occurred while logging in!");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className={classes.root}>
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
        errorLoginPassword={errorLoginPassword}
      />
    </div>
  );
};

export default Login;
