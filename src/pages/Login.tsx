import LoginForm from "@/components/LoginForm";

function LoginPage() {
  return (
    <div className="mt-32">
      <header className="text-center mb-8">
        <h1 className="brand text-8xl mb-8">Fetchy</h1>
        <p className="text-lg">
          Welcome! To get started please provide your name and email.
        </p>
      </header>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
