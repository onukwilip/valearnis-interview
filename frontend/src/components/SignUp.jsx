import React from "react";
import css from "../styles/signup/SIgnup.module.scss";
import { Button, Form, Icon } from "semantic-ui-react";
import { useInput, useForm } from "use-manage-form";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setWidget }) => {
  const navigate = useNavigate();

  const {
    value: name,
    isValid: nameIsValid,
    inputIsInValid: nameInputIsInValid,
    onChange: onNameChange,
    onBlur: onNameBlur,
    reset: resetName,
  } = useInput((/**@type String */ value) => value?.trim() !== "");

  const {
    value: email,
    isValid: emailIsValid,
    inputIsInValid: emailInputIsInValid,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    reset: resetEmail,
  } = useInput(
    (/**@type String */ value) => value?.trim() !== "" && value?.includes("@")
  );

  const {
    value: password,
    isValid: passwordIsValid,
    inputIsInValid: passwordInputIsInValid,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    reset: resetPassword,
  } = useInput(
    (/**@type String */ value) => value?.trim() !== "" && value?.length >= 8
  );

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    inputIsInValid: confirmPasswordInputIsInValid,
    onChange: onConfirmPasswordChange,
    onBlur: onConfirmPasswordBlur,
    reset: resetConfirmPassword,
  } = useInput(
    (/**@type String */ value) => value?.trim() !== "" && value === password
  );

  const { executeBlurHandlers, formIsValid, reset } = useForm({
    blurHandlers: [
      onEmailBlur,
      onPasswordBlur,
      onConfirmPasswordBlur,
      onNameBlur,
    ],
    resetHandlers: [resetEmail, resetPassword, resetConfirmPassword, resetName],
    validateOptions: () =>
      emailIsValid && passwordIsValid && confirmPasswordIsValid && nameIsValid,
  });

  const onSubmit = async () => {
    if (!formIsValid) return executeBlurHandlers();

    console.log("SUBMITTED", { email, password });
    reset();
    navigate("/quiz", { replace: true });
  };

  const toogle = () => {
    setWidget("login");
  };

  return (
    <div className={css.signup}>
      <p>
        Hello! Welcome to GO Quiz, <em>Register!</em>
      </p>
      <Form className={css.form} onSubmit={onSubmit}>
        <Form.Input
          placeholder="Full name"
          icon="user"
          iconPosition="left"
          className={css.input}
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onBlur={onNameBlur}
          name="name"
          error={
            nameInputIsInValid && {
              content: "Input must not be empty",
              pointing: "above",
            }
          }
        />
        <Form.Input
          placeholder="Email address"
          icon="mail"
          iconPosition="left"
          className={css.input}
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onBlur={onEmailBlur}
          name="email"
          error={
            emailInputIsInValid && {
              content: "Input must be a valid email address",
              pointing: "above",
            }
          }
        />
        <Form.Input
          placeholder="Password"
          icon="key"
          iconPosition="left"
          className={css.input}
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          onBlur={onPasswordBlur}
          name="password"
          error={
            passwordInputIsInValid && {
              content: "Input must be greater than 8 characters",
              pointing: "above",
            }
          }
        />

        <Form.Input
          placeholder="ConfirmPassword"
          icon="key"
          iconPosition="left"
          className={css.input}
          type="password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          onBlur={onConfirmPasswordBlur}
          error={
            confirmPasswordInputIsInValid && {
              content: "Input must be equal to password",
              pointing: "above",
            }
          }
        />
        <div className={css.actions}>
          <Button animated="fade">
            <Button.Content visible>Register</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
      </Form>

      <div className={css.info}>
        Don't have an account?{" "}
        <a href="#" onClick={toogle}>
          Login!
        </a>
      </div>
    </div>
  );
};

export default SignUp;
