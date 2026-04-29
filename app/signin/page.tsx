"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "../action/signInAction";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { z } from "zod";
import { auth } from "@/lib/firebase";
import { clearHomeCache } from "../action/clearCache";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).trim(),
  password: z.string().trim(),
});

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // After sign in, redirect to home page
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = loginSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      const errors = Object.values(result.error.flatten().fieldErrors).flat();
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Email or Password incorrect",
        confirmButtonText: "ok",
      });
      return;
    }

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        result.data.email,
        result.data.password,
      );

      if (!userCredential) {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Failed to create user",
          confirmButtonText: "ok",
        });
        return;
      }

      const idToken = await userCredential.user.getIdToken();
      const actionState = await loginAction(idToken);

      if (actionState.success) {
        await clearHomeCache()
        router.replace("/")
      } else {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: actionState.error,
          confirmButtonText: "ok",
        });
      }
      Swal.close();
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Email or Password incorrect",
        confirmButtonText: "ok",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="flex flex-col items-center px-4 pt-20 pb-16">
        <h1 className="text-5xl font-bold text-black tracking-wide mb-16">
          You're back!
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-base font-bold text-[#3D3D3D]"
            >
              Your email
            </label>
            <input
              id="email"
              type="email"
              placeholder="enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 rounded-lg bg-[#E5E5E5] text-[#3D3D3D] placeholder:text-[#8A8A8A] border border-black focus:outline-none focus:ring-2 focus:ring-[#3D3D3D]/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-base font-bold text-[#3D3D3D]"
            >
              Your password
            </label>
            <input
              id="password"
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 rounded-lg bg-[#E5E5E5] text-[#3D3D3D] placeholder:text-[#8A8A8A] border border-black focus:outline-none focus:ring-2 focus:ring-[#3D3D3D]/20"
            />
          </div>

          {/* ปุ่ม submit */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-14 py-3 bg-[#452829] text-white text-base font-medium rounded-full tracking-widest hover:bg-[#785657] transition-colors"
            >
              sign in
            </button>
          </div>
        </form>

        <div className="mt-20 text-center">
          <p className="text-sm text-[#3D3D3D]">
            <span className="font-medium">{"Already have an account? "}</span>
            <Link
              href="/signup"
              className="underline font-medium hover:text-[#2D2D2D]"
            >
              Sign up
            </Link>
          </p>
          <p className="mt-3 text-xs text-[#3D3D3D]/80">
            {'By clicking "Sign up", you accept JustTalk\'s '}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>
            {" and "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
