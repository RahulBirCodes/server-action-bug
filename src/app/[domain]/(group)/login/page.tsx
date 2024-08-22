import Link from "next/link";
import LoginForm from "@/app/[domain]/(group)/login/LoginForm";

export default function SignIn({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);

  return (
    <div className="flex w-full flex-col bg-gradient-to-b from-[#121212]/10 to-transparent text-center">
      <div className="flex flex-1 flex-col items-center justify-center p-5">
        <h1 className="max-w-3xl normal-case">
          Log in to enter
        </h1>
        <LoginForm domain={domain} />
      </div>
    </div>
  );
}