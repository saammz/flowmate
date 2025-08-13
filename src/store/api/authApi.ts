import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebase";

export interface UserData {
  _id: string;
  firebaseUid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt: string;
}

export interface AuthResponse {
  firebaseUser: any;
  userData: UserData;
}

export interface LoginResponse {
  firebaseUser: any;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // register user
    registerUser: builder.mutation<
      AuthResponse,
      { email: string; password: string }
    >({
      queryFn: async ({ email, password }) => {
        try {
          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
          }

          console.log("Attempting to register user with email:", email);

          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password
          );
          const firebaseUser = userCredential.user;

          console.log("Firebase user created successfully:", firebaseUser.uid);

          const idToken = await firebaseUser.getIdToken();

          const apiUrl = import.meta.env.VITE_API_BASE_URL;

          console.log("Api base url", apiUrl);

          const response = await fetch(`${apiUrl}users/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({}),
          });

          if (!response.ok) {
            const errorData = await response.text();
            console.error("Backend registration failed:", {
              status: response.status,
              statusText: response.statusText,
              error: errorData,
              url: response.url,
            });

            throw new Error(`Backend registration failed: ${response.status}`);
          }


          const userData = await response.json();

          return {
            data: {
              firebaseUser,
              userData,
            },
          };
        } catch (error: unknown) {
          console.error("Registration error:", error);
          if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            "message" in error
          ) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                data: {
                  code: (error as { code: string }).code,
                  message: (error as { message: string }).message,
                },
              },
            };
          }

          let errorMessage = "Registration failed";
          if (error instanceof Error) {
            errorMessage = error.message;
          }

          return {
            error: {
              status: "CUSTOM_ERROR",
              data: errorMessage,
            },
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    // sign in endpoint
    loginUser: builder.mutation<
      LoginResponse,
      { email: string; password: string }
    >({
      queryFn: async ({ email, password }) => {
        try {
          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          if (!email.includes("@")) {
            throw new Error("Please enter a valid email address");
          }

          console.log("Attempting to login user with email:", email);

          const userCredential = await signInWithEmailAndPassword(
            auth,
            email.trim(),
            password
          );
          const firebaseUser = userCredential.user;

          console.log("Firebase login successful:", firebaseUser.uid);

          return {
            data: {
              firebaseUser,
            },
          };
        } catch (error: unknown) {
          console.error("Login error:", error);
          if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            "message" in error
          ) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                data: {
                  code: (error as { code: string }).code,
                  message: (error as { message: string }).message,
                },
              },
            };
          }

          let errorMessage = "Login failed";
          if (error instanceof Error) {
            errorMessage = error.message;
          }

          return {
            error: {
              status: "CUSTOM_ERROR",
              data: errorMessage,
            },
          };
        }
      },
      invalidatesTags: ["User"],
    }),


    // Get current user data
    getCurrentUser: builder.query<UserData, void>({
      query: () => {
        if (!auth.currentUser) return

        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        console.log("Fetching user data from:", `${apiUrl}/users/getUser`);
        return "/users/getUser";
      },
      providesTags: ["User"],
    }),

    // Logout user
    logoutUser: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: undefined };
        } catch (error: unknown) {
          let errorMessage = "Logout failed";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          return {
            error: {
              status: "CUSTOM_ERROR",
              data: errorMessage,
            },
          };
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} = authApi;
