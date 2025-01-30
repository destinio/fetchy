import "./App.css";
import LoginForm from "./components/LoginForm";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <div>
        <LoginForm />
      </div>
    </MainLayout>
  );
}

export default App;
