import useLogin from "../hooks/useLogin.js";
import Form from "./Form";
function LogIn({ onCloseModal, onSwitchToSignUp }) {
  const LogInMutation = useLogin(() => {
    onCloseModal();
  });
  const handleSubmit = (formData) => {
    LogInMutation.mutate(formData);
  };
  return (
    <>
      <h1 className="text-center text-blue-800 font-bold">Log In</h1>
      <Form onSubmit={handleSubmit} />
      <div className="text-center mt-4">
        <button
          onClick={onSwitchToSignUp}
          className="text-blue-600 hover:underline"
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </>
  );
}

export default LogIn;
