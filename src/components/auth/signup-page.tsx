import { Button, Label, TextInput } from "flowbite-react";
import { registerNewUser } from "./authRepository";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import {
  addMessagError,
  addValidationErrorMessage,
  removeValidationError,
} from "../../redux/action/errorAction";
import { ValidationErrorsMessage } from "../errors";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const clearInput = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (name && email && password && repeatpassword) {
      setLoading(true);
      dispatch(removeValidationError());
      const response = await registerNewUser({
        name,
        email,
        password,
        repeatpassword,
      });
      if (response) {
        if (response.status === 201) {
          navigate("/login");
          dispatch(
            addMessagError({
              message: "User created! please sign-in!",
              type: "Success",
            })
          );
          clearInput();
        } else {
          dispatch(
            addMessagError({ type: "Error", message: response.data.message })
          );
          if (response.data.message === "Validation Error") {
            response.data.validationErrors.map(
              (validation: { msg: string; path: string }) => {
                dispatch(
                  addValidationErrorMessage({
                    msg: validation.msg,
                    name: validation.path,
                  })
                );
              }
            );
          }
        }
      }
      setLoading(false);
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 mx-auto px-10"
      onSubmit={submitForm}
    >
      <ValidationErrorsMessage />
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your Name" />
        </div>
        <TextInput
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="name@locahost.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password" value="Repeat password" />
        </div>
        <TextInput
          id="repeat-password"
          type="password"
          value={repeatpassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
          shadow
        />
      </div>
      <Button color="purple" type="submit" disabled={loading}>
        Register new account
      </Button>
    </form>
  );
};

export default SignUpPage;
