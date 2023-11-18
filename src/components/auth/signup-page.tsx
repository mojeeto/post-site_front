import { Button, Label, TextInput } from "flowbite-react";

const SignUpPage: React.FC = () => {
  return (
    <form className="flex max-w-md flex-col gap-4 mx-auto px-10">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your Name" />
        </div>
        <TextInput id="name" type="text" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="name@locahost.com"
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput id="password" type="password" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password" value="Repeat password" />
        </div>
        <TextInput id="repeat-password" type="password" required shadow />
      </div>
      <Button color="purple" type="submit">
        Register new account
      </Button>
    </form>
  );
};

export default SignUpPage;
