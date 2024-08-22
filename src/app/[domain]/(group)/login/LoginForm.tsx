'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useFormStatus} from 'react-dom'
import {signIn} from "@/lib/actions";

function LoginButton() {
  const { pending } = useFormStatus();

  const [buttonState, setButtonState] = useState<"idle" | "loading">("idle");

  useEffect(() => {
    if (pending) {
      setButtonState("loading");
    }
  }, [pending]);

  return (
    <button
      type="submit"
      className="flex h-12 w-full items-center justify-center rounded-lg bg-dark font-mono text-xs uppercase tracking-wider text-white"
    >
      {buttonState === 'idle' ? 'Sign in' : 'loading...'}
    </button>
  );
}

export default function LoginForm({ domain }: { domain: string }) {

  return (
    <form
      action={async (data: FormData) => {
        signIn(data)
          .then(d => {
            console.log('RETURN STATE FROM SIGN IN IS:', d)
          })
      }}
      className="mt-6 w-full max-w-80 items-center space-y-2 text-base tracking-wider"
    >
      <input type="hidden" name="callbackUrl" value="/feed" />
      <input type="hidden" name="domain" value={domain} />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="h-12 w-full rounded-lg border border-gray-300 bg-transparent p-3 font-sans focus:outline-none focus:ring"
      />
      <LoginButton />
    </form>
  );
}