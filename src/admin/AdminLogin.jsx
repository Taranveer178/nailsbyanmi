import { useState } from "react";
import { ArrowLeft, LockKeyhole, LogIn, Sparkles } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "../firebase";

const getSignInError = (error) => {
  if (error.code === "auth/too-many-requests") {
    return "Too many attempts. Wait a little and try again.";
  }
  if (
    error.code === "auth/invalid-credential" ||
    error.code === "auth/user-not-found" ||
    error.code === "auth/wrong-password"
  ) {
    return "Email or password is incorrect.";
  }
  if (error.code === "auth/operation-not-allowed") {
    return "Email and password sign-in is not enabled in Firebase.";
  }
  return "Sign-in failed. Check your connection and try again.";
};

export default function AdminLogin({ onBackToSite, notice }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const auth = await getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (signInError) {
      setError(getSignInError(signInError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F5F1] text-[#2F2C29] px-4 py-10 grid place-items-center">
      <section className="w-full max-w-[420px] border border-[#2F2C29]/15 bg-white p-6 sm:p-8 rounded-[3px] shadow-[0_20px_60px_rgba(47,44,41,0.08)]">
        <button
          type="button"
          onClick={onBackToSite}
          className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-[#6E6961] hover:text-[#2F2C29]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </button>

        <div className="mb-7">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center border border-[#8A755F]/35 bg-[#DFD6C7]/45 text-[#5D4935]">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A755F]">
            <Sparkles className="h-3.5 w-3.5" /> Glam By Anmi
          </div>
          <h1 className="text-[25px] font-medium leading-tight">Admin sign-in</h1>
          <p className="mt-2 text-[14px] leading-6 text-[#6E6961]">
            Sign in with an authorized studio account.
          </p>
        </div>

        {notice && (
          <p role="alert" className="mb-4 border border-amber-300 bg-amber-50 px-3 py-2.5 text-[13px] leading-5 text-amber-900">
            {notice}
          </p>
        )}
        {error && (
          <p role="alert" className="mb-4 border border-red-300 bg-red-50 px-3 py-2.5 text-[13px] leading-5 text-red-800">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-[13px] font-medium text-[#403B35]">
            Email address
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 block w-full rounded-[2px] border border-[#2F2C29]/20 bg-white px-3 py-2.5 text-[14px] outline-none focus:border-[#8A755F] focus:ring-2 focus:ring-[#8A755F]/15"
            />
          </label>
          <label className="block text-[13px] font-medium text-[#403B35]">
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 block w-full rounded-[2px] border border-[#2F2C29]/20 bg-white px-3 py-2.5 text-[14px] outline-none focus:border-[#8A755F] focus:ring-2 focus:ring-[#8A755F]/15"
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-[#2F2C29] px-4 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#51473C] disabled:cursor-wait disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}