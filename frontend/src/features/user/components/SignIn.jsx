import useSignIn from "../hooks/useLogin.js";
import Form from "./Form";

function SignIn({ onCloseModal, onSwitchToLogin }) {
  const signInMutation = useSignIn(() => {
    onCloseModal();
  });
  const handleSubmit = (formData) => {
    signInMutation.mutate(formData);
  };
  return (
    <>
      <h1 className="text-center text-pink-600 font-bold ">Sign In</h1>
      <Form onSubmit={handleSubmit} onSwitchToLogin={onSwitchToLogin} />
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-600 underline"
        >
          Log In
        </button>
      </p>
    </>
  );
}

export default SignIn;
