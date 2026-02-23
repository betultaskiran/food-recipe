import {
  Modal,
  TextInput,
  Button,
  Text,
  Group,
  Checkbox,
  Grid,
} from "@mantine/core";
import { useAtom } from "jotai";
import { popupOpenAtom, popupFormTypeAtom } from "../../atoms/popupAtom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IconUser,
  IconAt,
  IconLock,
  IconShieldCheck,
} from "@tabler/icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./LoginPopup.module.css";
import baseUrl from "../../atoms/popupAtom";
import { useSetAtom } from "jotai";
import { isLoggedInAtom } from "../../atoms/popupAtom";

// VALIDATION
const loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("Password is required").min(6),
});

const registerSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function LoginPopup() {
  const [opened, setOpened] = useAtom(popupOpenAtom);
  const [formType, setFormType] = useAtom(popupFormTypeAtom);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={formType === "login" ? "Login" : "Register"}
      centered
      styles={{
        title: {
          color: "#006600",
          fontSize: "22px",
          fontWeight: "bold",
        },
      }}
    >
      {formType === "login" ? (
        <LoginForm
          switchToRegister={() => setFormType("register")}
          closeModal={() => setOpened(false)}
        />
      ) : (
        <RegisterForm
          switchToLogin={() => setFormType("login")}
          closeModal={() => setOpened(false)}
        />
      )}
    </Modal>
  );
}

function LoginForm({ switchToRegister, closeModal }) {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const {
    register, //Input’ları form state’e bağlar
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsLoggedIn(true);
      toast.success("Login successful!");
      closeModal();
      navigate("/profile");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <TextInput
        label="Email"
        placeholder="Your email"
        leftSection={<IconAt size={18} />}
        {...register("email")}
        error={errors.email?.message}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        type="password"
        leftSection={<IconLock size={18} />}
        {...register("password")}
        error={errors.password?.message}
      />

      <Group justify="space-between" mt="md">
        <Button className={classes.button} type="submit" fullWidth>
          Login
        </Button>
      </Group>

      <Text size="sm" mt="md">
        Don't have an account?{" "}
        <span className={classes.link} onClick={switchToRegister}>
          Register here
        </span>
      </Text>
    </form>
  );
}

function RegisterForm({ switchToLogin, closeModal }) {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };
      const res = await axios.post(`${baseUrl}/auth/register`, payload);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsLoggedIn(true);
      toast.success("Registration successful!");
      closeModal();
      navigate("/profile");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Register error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Grid gutter="md">
        <Grid.Col span={6}>
          <TextInput
            label="First name"
            placeholder="Your first name"
            leftSection={<IconUser size={18} />}
            {...register("firstName")}
            error={errors.firstName?.message}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Last name"
            placeholder="Your last name"
            leftSection={<IconUser size={18} />}
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </Grid.Col>
      </Grid>

      <TextInput
        label="Email"
        placeholder="Your email"
        leftSection={<IconAt size={18} />}
        {...register("email")}
        error={errors.email?.message}
      />

      <TextInput
        label="Password"
        placeholder="Password"
        type="password"
        leftSection={<IconLock size={18} />}
        {...register("password")}
        error={errors.password?.message}
      />

      <TextInput
        label="Confirm Password"
        placeholder="Confirm password"
        type="password"
        leftSection={<IconShieldCheck size={18} />}
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Checkbox
        label="I agree to sell my soul and privacy to this corporation"
        mt="md"
      />

      <Group justify="space-between" mt="md">
        <Button className={classes.button} type="submit" fullWidth>
          Register
        </Button>
      </Group>

      <Text size="sm" mt="md">
        Have an account?{" "}
        <span className={classes.link} onClick={switchToLogin}>
          Login here
        </span>
      </Text>
    </form>
  );
}

/*register("email")	react-hook-form'a "email" alanı ekler, değerini ve olaylarını takip eder
{...register("email")}	Bu alanı bir input bileşenine bağlar
data.email	Form gönderildiğinde girilen email burada bulunur*/
