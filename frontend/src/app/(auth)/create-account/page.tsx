"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSignupMutation } from "@/redux/features/auth/authAPI";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (response.message === "OTP sent successfully") {
        setOtpSent(true);
        setError("Please check your email for the OTP code.");
      } else if (response.token && response.user) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        router.push("/");
      } else {
        setError("Unexpected response from server. Please try again.");
      }
    } catch (err: any) {
      setError(err.data?.message || "Failed to create account. Please try again.");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP code");
      return;
    }

    try {
      const response = await signup({
        email: formData.email,
        otp: otp,
      }).unwrap();

      if (response.token && response.user) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        router.push("/");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      setError(err.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className='md:flex justify-center items-center h-[calc(100vh-100px)]'>
      <div className='h-full px-4 py-12 flex justify-center items-center my-auto'>
        <div className='w-full md:w-[600px]'>
          <h1 className='text-[40px] font-medium text-[#545454] text-center mb-8'>
            {otpSent ? "Verify Email" : "Create Account"}
          </h1>

          {error && (
            <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md'>
              {error}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-2'>
                <label htmlFor='name' className='block text-lg text-[#333333]'>
                  Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full h-14 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#545454]'
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='email' className='block text-lg text-[#333333]'>
                  E-Mail
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='E-mail address'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full h-14 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#545454]'
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='password' className='block text-lg text-[#333333]'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full h-[56px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#545454]'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                    aria-label='Show password'
                  >
                    <Eye className='h-5 w-5 cursor-pointer' />
                  </button>
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='confirmPassword' className='block text-lg text-[#333333]'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='w-full h-[56px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#545454]'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                    aria-label='Show confirm password'
                  >
                    <Eye className='h-5 w-5 cursor-pointer' />
                  </button>
                </div>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full h-14 md:h-[72px] cursor-pointer bg-[#FDB515] hover:bg-[#fdb415e6] text-base md:text-lg text-[#4A3300] font-medium py-3 rounded transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className='space-y-6'>
              <div className='space-y-2'>
                <label htmlFor='otp' className='block text-lg text-[#333333]'>
                  Enter OTP
                </label>
                <input
                  id='otp'
                  name='otp'
                  type='text'
                  placeholder='Enter the OTP sent to your email'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-full h-14 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#545454]'
                  required
                />
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full h-14 md:h-[72px] cursor-pointer bg-[#FDB515] hover:bg-[#fdb415e6] text-base md:text-lg text-[#4A3300] font-medium py-3 rounded transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          <div className='mt-6 text-center'>
            <span className='text-[#545454] text-lg'>
              Already have an account?{" "}
            </span>
            <Link href='/login' className='text-[#333333] text-lg underline'>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
