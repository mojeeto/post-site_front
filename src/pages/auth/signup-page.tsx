import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import { addToast } from "../../redux/action/toastAction";
import { registerNewUser } from "../../repo/auth/authRepository";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (name && email && password && repeatpassword) {
      setLoading(true);
      const response = await registerNewUser({
        name,
        email,
        password,
        repeatpassword,
      });
      if (!response) throw new Error("Error while getting response");
      const status = response.status;
      if (status !== 201) {
        dispatch(addToast({ type: "Error", message: "User not created!" }));
        return;
      } else {
        dispatch(addToast({ type: "Success", message: "User created!" }));
      }
      setLoading(false);
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 mx-auto px-10"
      onSubmit={submitForm}
    >
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
