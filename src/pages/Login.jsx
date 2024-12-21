import LoginForm from "../components/LoginForm";
import { ModeToggle } from "../components/mode-toggle";

export default function Login() {
  4;
  return (
    <>
      <div className="w-full flex justify-end p-5 absolute">
        <ModeToggle />
      </div>
      <div className="min-h-screen  w-full flex items-center justify-center">
        <LoginForm />
      </div>
    </>
  );
}
