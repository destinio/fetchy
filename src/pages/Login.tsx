import LoginForm from "@/components/LoginForm";

function LoginPage() {
  return (
    <div className="mt-32">
      <header className="text-center mb-8">
        <h1 className="brand text-8xl mb-8">Fetchy</h1>
      </header>
      <div className="grid md:grid-cols-2 gap-8 md:grid-flow-dense">
        {/* Move LoginForm to the right on medium+ screens */}
        <div className="order-2 md:order-1">
          <LoginForm />
        </div>

        {/* Move Image & Chat Bubble to the left on medium+ screens */}
        <div className="relative flex flex-col items-center order-1 md:order-2">
          <div className="relative bg-blue-500 text-white p-4 rounded-lg shadow-lg w-64 text-center before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-t-[10px] before:border-t-blue-500 before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent">
            <p className="text-lg">
              Welcome! To get started, please provide your name and email.
            </p>
          </div>
          <img src="/images/fetchy.png" alt="dog" className="h-32 mt-4" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
