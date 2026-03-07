function Button({ children, type, ...props }) {
  return (
    <button
      type={type}
      className="bg-black font-bold  text-yellow-300 rounded-sm w-full p-2 cursor-pointer  hover:transform hover:scale-95 transition-transform duration-5 ease-in-out"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
