import { FaEye, FaEyeSlash, FaRegistered } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserInfo, loginWithGoogle } =
    useContext(AuthContext);
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photoURL.value;
    const password = e.target.password.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must have an Uppercase, a lowercase and 6 character or long"
      );
      return;
    }

    if (name.length < 5) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Name must be at least 5 character or long",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    try {
      // Create an user
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // Update user name and photo
      await updateUserInfo(name, photo);

      // Prepare data for saving in the database
      const userData = {
        userID: user.uid,
        name: name, // Use manually since updateProfile doesn't return user
        email: user.email,
        photo: photo, // Use manually
        createdAt: new Date().toISOString(),
      };

      // Store user data in the database
      const dbResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        userData
      );

      if (dbResponse.data.insertedId) {
        e.target.reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${name} is successfully registered`,
          showConfirmButton: false,
          timer: 3000,
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = await result.user;

      Swal.fire({
        position: "center",
        icon: "success",
        title: `${user?.displayName} is successfully logged in via Google`,
        showConfirmButton: false,
        timer: 3000,
      });
      navigate(from, { replace: true });

      // Prepare data for saving in the database
      const userData = {
        userID: user?.uid,
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        createdAt: new Date().toISOString(),
      };

      // Insert user data in the database
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user`, userData);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <h2 className="md:text-4xl text-3xl font-bold pt-10 text-center">
        Register Form!
      </h2>
      <div className="md:w-full w-11/12 mx-auto flex justify-center items-center pt-4 pb-12">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-md border border-gray-300">
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">
                <span className="font-bold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Type your Name"
                className="input w-full"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="fieldset-label">
                <span className="font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Type your Email"
                className="input w-full"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="fieldset-label">
                <span className="font-bold">Photo-URL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Provide a Photo URL"
                className="input w-full"
                required
              />
            </fieldset>
            <fieldset className="fieldset relative">
              <label className="fieldset-label">
                <span className="font-bold">Password</span>
              </label>
              <input
                type={hidePassword ? "password" : "text"}
                name="password"
                placeholder="Type your Password"
                className="input w-full"
                required
              />

              <button
                onClick={() => setHidePassword(!hidePassword)}
                className="absolute btn btn-xs top-9 right-3"
                type="button"
              >
                {hidePassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </fieldset>

            <div>
              {errorMessage && (
                <p className="text-rose-500 text-center font-bold mt-5">
                  {errorMessage}
                </p>
              )}
            </div>

            <div className="mt-4">
              <button className="w-full flex gap-2 items-center btn bg-rose-500 hover:bg-rose-700 text-base text-white font-bold">
                <FaRegistered className="text-xl" /> <span>Register</span>
              </button>
            </div>
          </form>

          <p className="font-bold text-center">
            Already have an Account? Please{" "}
            <Link to="/login" className="text-indigo-500 font-bold">
              Login
            </Link>
          </p>

          <div className="divider w-4/5 mx-auto font-medium">Or</div>

          <div className="w-4/5 mx-auto pb-8">
            <button
              onClick={handleGoogleLogin}
              className="btn w-full flex gap-3 justify-center items-center"
            >
              <FcGoogle className="text-2xl" />{" "}
              <span className="text-base font-bold">
                Login with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
