import AuthForm from "./LoginPage";

function RegisterPage({ setIsAuth, setToken }) {
  return <AuthForm isSignUp={true} setIsAuth={setIsAuth} setToken={setToken} />;
}

export default RegisterPage;
