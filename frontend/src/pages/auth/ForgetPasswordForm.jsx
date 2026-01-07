import { useState ,useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Api from "../../service/Api";
import { toast } from "react-toastify";

const emailSchema = object().shape({
  email: string().email("Invalid email").required("Email is required"),
});


const passwordSchema = object().shape({
  newPassword: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: string()
    .oneOf([ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const inputClassName =
  "w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black";

const primaryButtonClassName =
  "w-full rounded-md bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600 transition-colors disabled:opacity-60 cursor-pointer";

export default function ForgetPasswordForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

   const inputRefs = useRef([]);
    const [otp, setOtp] = useState(Array(6).fill(""));

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: isSubmittingEmail },
  } = useForm({
    resolver: yupResolver(emailSchema),
    defaultValues: { email: "" },
  });


  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSendOtp = async (data) => {
    try {
      await Api.sendOtp(data.email);
      setEmail(data.email);
      setStep(2);
      toast.success("OTP sent successfully");
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); 
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

   
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };
  

  const onResetPassword = async (data) => {
    try {
      const otpValue = Array.isArray(otp) ? otp.join('').trim() : String(otp || '').trim();
      if (otpValue.length !== 6) {
        toast.error("Please enter a 6-digit OTP");
        return;
      }
      await Api.resetPasswordWithOtp(email, otpValue, (data.newPassword || '').trim());
      toast.success("Password reset successfully");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-medium text-black mb-2">
        {step === 1 && "Forgot Password"}
        {step === 2 && "Enter OTP and   Reset Password"}
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        {step === 1 && "Enter your email to receive an OTP"}
        {step === 2 && `Enter the OTP sent to ${email} and  Enter your new password`}
      </p>

      {step === 1 && (
        <form className="space-y-6" onSubmit={handleSubmitEmail(onSendOtp)}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email Address"
              className={inputClassName}
              {...registerEmail("email")}
            />
            {emailErrors.email && (
              <p className="text-xs text-red-600 mt-1">
                {emailErrors.email.message}
              </p>
            )}
          </div>
          <button
            className={primaryButtonClassName}
            type="submit"
            disabled={isSubmittingEmail}
          >
            {isSubmittingEmail ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      <div>
        {step === 2 && (
        <div className="mb-6">
          <div className="flex gap-3 justify-center mb-6">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
              />
            ))}
          </div>
        </div>
      )}
      </div>

      {step === 2 && (
        <form
          className="space-y-6"
          onSubmit={handleSubmitPassword(onResetPassword)}
        >
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className={inputClassName}
              {...registerPassword("newPassword")}
            />
            <button
              type="button"
              className="absolute right-0 top-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            {passwordErrors.newPassword && (
              <p className="text-xs text-red-600 mt-1">
                {passwordErrors.newPassword.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={inputClassName}
              {...registerPassword("confirmPassword")}
            />
            <button
              type="button"
              className="absolute left-235 top-135 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            {passwordErrors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">
                {passwordErrors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            className={primaryButtonClassName}
            type="submit"
            disabled={isSubmittingPassword}
          >
            {isSubmittingPassword ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
      <p className="text-center text-gray-600 mt-4 text-sm">
        Remember your password?
        <NavLink
          to="/auth/login"
          className="text-black font-semibold hover:underline ml-1"
        >
          Login
        </NavLink>
      </p>
    </>
  );
}
