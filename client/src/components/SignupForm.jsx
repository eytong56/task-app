import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

function FormLabel({ name, type, label, value, setValue }) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="w-full">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <div className="px-6 py-3 border-1 border-neutral-300 rounded-full bg-white hover:shadow-sm focus:shadow-sm focus-within:border-neutral-500 transition-all duration-300">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className={"focus:outline-none w-full transition-all duration-300"}
        />
      </div>
    </div>
  );
}

function SignupForm({ onRegister, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Sign up form submitted");
    onRegister(email, password);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col w-full items-start gap-3">
        <FormLabel
          name="email"
          type="email"
          label="Email"
          value={email}
          setValue={setEmail}
        />
        <FormLabel
          name="password"
          type="password"
          label="Password"
          value={password}
          setValue={setPassword}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="cursor-pointer w-full px-6 py-3 border-1 border-neutral-300 rounded-full hover:shadow-sm focus:shadow-sm focus-within:border-neutral-500 transition-all duration-300"
        >
          Sign up
        </button>
      </div>
      <button onClick={onSwitch} className="cursor-pointer inline text-neutral-500 font-semibold underline underline-offset-4 hover:text-neutral-800 transition-colors duration-300">
        Have an account? Login instead
        <ArrowUpRight className="inline w-5 h-5 align-bottom" />
      </button>
    </div>
  );
}

export default SignupForm;
