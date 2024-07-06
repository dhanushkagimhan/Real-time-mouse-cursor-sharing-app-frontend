import { Link } from "react-router-dom";
import { Button, InputBox } from "../../utility/components";
import { ChangeEvent, FormEvent, useState } from "react";

type FormValueType = {
  email: string;
  password: string;
};

export default function Login() {
  const [formValues, setFormValues] = useState<FormValueType>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormValueType>({
    email: "",
    password: "",
  });

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setFormValues((values) => ({ ...values, [name]: value }));

    let submitBtnDisableLocal: boolean = false;

    if (name === "password") {
      if (value.length < 8) {
        setSubmitBtnDisabled(true);
        setFormErrors((values) => ({
          ...values,
          [name]: "Password length must have more than 8 characters",
        }));
        submitBtnDisableLocal = true;
      } else {
        setFormErrors((values) => ({
          ...values,
          [name]: "",
        }));
      }
    }

    setSubmitBtnDisabled(submitBtnDisableLocal);
  };

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(formValues);
  };

  return (
    <div className="p-10 border-slate-400 border-2 rounded">
      <h2 className="text-2xl font-semibold">Login</h2>
      <div className="mt-10">
        <form className="w-[300px]" onSubmit={formSubmit}>
          <InputBox
            title="Email"
            name="email"
            handleChange={handleChange}
            value={formValues.email}
            type="email"
            required={true}
          />
          <InputBox
            title="Password"
            name="password"
            handleChange={handleChange}
            value={formValues.password}
            type="password"
            required={true}
            error={formErrors.password}
          />
          <Button title="Login" type="submit" disable={submitBtnDisabled} />
        </form>
      </div>
      <div className="mt-4">
        <Link to="/register" className="font-medium text-blue-400">
          Still haven't account, Create account
        </Link>
      </div>
    </div>
  );
}
