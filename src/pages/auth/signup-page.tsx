import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import { addToast } from "../../redux/action/toastAction";
import { registerNewUser } from "../../repo/auth/authRepository";
import ValidationMessages, {
  ValidationMessageItemType,
} from "../../components/errors/validation-errors";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationMessages, setValidationMessages] =
    useState<ValidationMessageItemType | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (name && email && password && repeatpassword) {
      setLoading(true);
      setValidationMessages(null);
      const response = await registerNewUser({
        name,
        email,
        password,
        repeatpassword,
      });
      if (!response) {
        dispatch(
          addToast({
            message: "Error 500, Please try again later.",
            type: "Error",
          })
        );
        return setLoading(false);
      }
      const status = response.status;
      if (status !== 201) {
        dispatch(addToast({ type: "Error", message: "User not created!" }));
        if (status !== 403) throw new Error("Error 500");
        const validationResponse = response.data.validationErrors;
        if (!validationResponse) return;
        validationResponse.map(
          (validationObj: { msg: string; path: string }) => {
            setValidationMessages((state) => {
              if (!state)
                return {
                  [validationObj.path]: [validationObj.msg],
                };
              if (!state[validationObj.path]) {
                state[validationObj.path] = [validationObj.msg];
                return state;
              }
              state[validationObj.path].push(validationObj.msg);
              return state;
            });
          }
        );
      } else {
        setValidationMessages(null);
        dispatch(
          addToast({
            type: "Success",
            message: "User created!, Please Sign-in.",
          })
        );
        navigate("/login");
      }
      setLoading(false);
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 mx-auto px-10"
      onSubmit={submitForm}
    >
      {validationMessages && (
        <ValidationMessages validationMessages={validationMessages} />
      )}
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
