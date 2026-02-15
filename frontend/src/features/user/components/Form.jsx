import input from "../../../components/Button";
function form() {
  return (
    <form method="post" autoComplete="on">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required autoComplete="on" />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" required authComplete="on" />
    </form>
  );
}

export default form;
