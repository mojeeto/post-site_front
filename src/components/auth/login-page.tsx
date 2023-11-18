import { Button, Label, TextInput } from "flowbite-react";

const LoginPage: React.FC = () => {
  return (
    <form className="flex max-w-md flex-col gap-4 mx-auto px-10">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="name@localhost.com"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput id="password" type="password" required />
      </div>
      <Button color="purple" type="submit">
        Login
      </Button>
      <Label>Forgot Password!</Label>
    </form>
  );
};

export default LoginPage;
