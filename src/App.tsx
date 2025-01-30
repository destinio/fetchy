import { logout } from "./api/login";
import "./App.css";
import LoginForm from "./components/LoginForm";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <div>
        <LoginForm />
        <button onClick={() => logout()}>logout</button>
      </div>
    </MainLayout>
  );
}

export default App;
