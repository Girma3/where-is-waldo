import { useForm } from "react-hook-form";
import Button from "../../../components/Button";

const inputStyle = `
  border border-green-500 rounded-md p-2 
  focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600
  transition duration-200 ease-in-out
  placeholder-gray-400
  text-sm font-bold
  w-full mb-4
`;
const labelStyle = `
  text-sm font-medium mb-1 text-pink-600
`;

function Form({ onSubmit, onSwitchToSignUp, onSwitchToLogin }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  return (
    <form
      className="flex flex-col items-center justify-center p-2 tracking-wide text-sm "
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
    >
      <label htmlFor="name" className={labelStyle}>
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className={inputStyle}
        {...register("name", {
          required: true,
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters.",
          },
        })}
        autoComplete="on"
        placeholder="John Doe"
      />
      {errors.name && (
        <span className="text-shadow-amber-500">{errors.name.message}</span>
      )}
      <label htmlFor="email" className={labelStyle}>
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className={inputStyle}
        {...register("email", {
          required: true,
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format." },
        })}
        autoComplete="on"
        placeholder="lVY2n@example.com"
      />
      {errors.email && (
        <span className="text-shadow-amber-500">{errors.email.message}</span>
      )}
      <Button type={"submit"}>Submit</Button>
    </form>
  );
}

export default Form;
