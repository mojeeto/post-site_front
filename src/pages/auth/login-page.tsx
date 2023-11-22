import { Button, Label, TextInput } from "flowbite-react";
import { FormEventHandler, useState } from "react";
import { loginUser } from "../../repo/authRepository";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import { addToast } from "../../redux/action/toastAction";
import { setIsAuth } from "../../redux/action/authAction";
import ValidationMessages, {
  ValidationMessageItemType,
  makeValidationResponse,
} from "../../components/errors/validation-errors";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationMessages, setValidationMessages] =
    useState<ValidationMessageItemType | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      const response = await loginUser({ email, password });
      if (!response) {
        dispatch(
          addToast({
            type: "Error",
            message: "Error 500, please try again later.",
          })
        );
        setLoading(false);
        return;
      }
      const status = response.status;
      if (status !== 200) {
        if (status === 404 || status === 403) {
          dispatch(
            addToast({
              type: "Error",
              message: response.data.message || "User not found!",
            })
          );
          const validationResponse = response.data.validationErrors;
          if (validationResponse)
            setValidationMessages(makeValidationResponse(validationResponse));
        } else {
          throw new Error("Error 500");
        }
      } else {
        const token = response.data.token;
        const user = response.data.user;
        dispatch(
          addToast({ type: "Success", message: `Welcome! ${user.name}!` })
        );
        localStorage.setItem("token", token);
        dispatch(
          setIsAuth({
            token,
            isAuth: true,
          })
        );
        navigate("/");
      }
      setLoading(false);
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 mx-auto px-10"
      onSubmit={login}
    >
      {validationMessages && (
        <ValidationMessages validationMessages={validationMessages} />
      )}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@localhost.com"
          required
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
        />
      </div>
      <Button color="purple" type="submit" disabled={loading}>
        Login
      </Button>
    </form>
  );
};

export default LoginPage;
