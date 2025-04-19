import baseAPI from "@/redux/api/baseAPI";

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    status: string;
  };
  message?: string;
}

export interface SignupRequest {
  name?: string;
  email: string;
  password?: string;
  otp?: string;
}

interface LoginRequest {
  email: string;
  password: string;
  otp?: string;
}

interface ResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (userData) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (data) => ({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = authAPI; 