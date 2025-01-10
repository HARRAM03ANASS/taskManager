import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Import the eye icons
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "sonner";

const Login = () => {
  const { utilisateur } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (data) => {
    console.log('Sending login data:', data);
    try {
      const resultat = await login(data).unwrap();
      dispatch(setCredentials(resultat));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    utilisateur && navigate("/dashboard");
  }, [utilisateur]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("../../public/taskmanagement.jpg")`,
          filter: "brightness(0.5)",
        }}
      />
      {/* Blue shadow overlay */}
      <div className="absolute inset-0 bg-blue-900 opacity-70"></div>

      {/* Form container */}
      <div className="relative w-full md:w-auto flex flex-col items-center justify-center z-10">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white bg-opacity-80 backdrop-blur-lg px-10 pt-14 pb-14 shadow-xl rounded-lg mt-16"
        >
          <div>
            <p className="text-blue-700 text-4xl font-bold text-center">
              Login
            </p>
          </div>
          <div className="flex flex-col gap-y-4"> {/* Adjusted gap between elements */}
            {/* Email field */}
            <div className="relative w-full mb-4"> {/* Added margin-bottom */}
              <FaUser className="absolute left-4 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Veuillez saisir votre adresse mail",
                })}
                className={`w-full pl-10 pr-4 py-2 bg-white border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-full focus:outline-none focus:border-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="relative w-full mb-4"> {/* Added margin-bottom */}
              <FaLock className="absolute left-4 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder="Mot de passe"
                {...register("motdepasse", {
                  required: "Veuillez saisir votre mot de passe",
                })}
                className={`w-full pl-10 pr-4 py-2 bg-white border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-full focus:outline-none focus:border-blue-500`}
              />
              <div
                className="absolute right-4 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
              Mot de passe oublié ?
            </span>
            <button
              type="submit"
              className="w-full h-10 bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-800 transition mt-4"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
