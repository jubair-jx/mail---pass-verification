import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../../Firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Login = () => {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleLoginForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const mail = form.email.value;
    const pass = form.password.value;
    console.log(mail, pass);

    setError("");
    setSuccess("");

    if (!/(?=.*[A-Z])/.test(pass)) {
      setError("Please Enter At least one Uppercase");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(pass)) {
      setError("Please Enter a At least two number");
      return;
    } else if (!/(?=.*[!&@$*&#])/.test(pass)) {
      setError("Please Enter At least one speacial characters");
      return;
    }

    signInWithEmailAndPassword(auth, mail, pass)
      .then((result) => {
        const user = result.user;
        console.log(user);

        if (!user.emailVerified) {
          alert("Please Verify Your mail");
        }
      })
      .catch((err) => {
        const errorMessage = err.message;
        setError(errorMessage);
      });
  };

  const handleResetPass = (e) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please Provide Your Mail");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please Check your mail");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="text-center">
      <form onSubmit={handleLoginForm} className="px-20 py-20">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Mail"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            placeholder="Password here"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
      <p className="text-white">
        Have you forget your password? then{" "}
        <button onClick={handleResetPass} className="underline">
          reset here
        </button>
      </p>
      <small className="text-xl text-white">
        Need a new User then first Register{" "}
        <Link className="text-green-500" to="/register">
          Register
        </Link>
      </small>
      <p className="text-red-500 text-2xl">{error}</p>
      <p className="text-green-500 text-2xl">{success}</p>
    </div>
  );
};

export default Login;
