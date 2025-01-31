import FetchyMsg from "@/components/FetchyMsg";
import LoginForm from "@/components/LoginForm";

function LoginPage() {
  return (
    <div className="mt-32">
      <header className="text-center mb-8">
        <h1 className="brand text-8xl mb-8">Fetchy</h1>
      </header>
      <div className="grid md:grid-cols-2 gap-8 md:grid-flow-dense">
        <div className="order-2 md:order-1">
          <LoginForm />
        </div>

        <FetchyMsg message="Welcome! To get started, please provide your name and email." />
      </div>
    </div>
  );
}

export default LoginPage;
