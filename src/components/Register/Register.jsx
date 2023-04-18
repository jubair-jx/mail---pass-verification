import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { Link } from "react-router-dom";

const Register = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [passord, setPassword] = useState("");
  const [succes, setSuccess] = useState("");

  const auth = getAuth(app);

  const handleFormOnsubmit = (e) => {
    e.preventDefault();
    setValue("");
    setError("");
    setSuccess("");
    const mail = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    console.log(name, mail, pass);

    if (!/(?=.*[A-Z])/.test(pass)) {
      setError("Please Enter a one Uppercase");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(pass)) {
      setError("Please Enter a At least one number");
    }

    createUserWithEmailAndPassword(auth, mail, pass)
      .then((result) => {
        // Signed in
        setError("");
        e.target.reset();
        setSuccess("User has been succesfully created");
        const user = result.user;

        console.log(user);
        sendVerificatioMail(result.user);
        setDataOnName(result.user, name);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        // setError(errorMessage);
        // ..
      });
  };

  const sendVerificatioMail = (user) => {
    sendEmailVerification(user).then((result) => {
      alert("Need Verify");
      console.log(result);
    });
  };

  const handleMailOnChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const handleBlurOnpass = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const setDataOnName = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        alert("Your Profile is updated");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="text-center">
      <form onSubmit={handleFormOnsubmit} className="px-20 py-20">
        <div className="mb-6">
          <label
            for="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Your name here"
            required
          />
        </div>
        <div className="mb-6">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={handleMailOnChange}
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter a Mail Here"
            required
          />
        </div>
        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onBlur={handleBlurOnpass}
            type={showPass ? "text" : "password"}
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <button onClick={handleShowPassword} className="text-white border-2">
          show pass
        </button>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 mx-auto dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
      <small className="text-3xl text-white">
        Already have a Account{" "}
        <Link className="text-green-500" to="/login">
          Login
        </Link>
      </small>
      <p className="text-2xl text-red-600">{error}</p>
      <p className="text-2xl text-green-600">{succes}</p>
    </div>
  );
};

export default Register;
