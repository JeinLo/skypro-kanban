import AuthForm from "./LoginPage";

function RegisterPage({ setIsAuth }) {
  return <AuthForm isSignUp={true} setIsAuth={setIsAuth} />;
}

export default RegisterPage;
