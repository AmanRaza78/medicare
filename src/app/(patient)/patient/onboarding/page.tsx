import OnboardingForm from "@/components/onboarding/onboarding-form";
import { SparklesCore } from "@/components/ui/sparkles";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser()

  if(!user){
      return redirect("/api/auth/login")
  }

  return (
    <div className="flex">
      <div className="w-[60%] bg-gradient-to-b from-teal-400 to-teal-200 text-white flex flex-col p-8 min-h-screen">
        <h1 className="-tracking-tighter font-semibold text-4xl">
          Welcome to MedCare
        </h1>
        <p className="text-muted">
          Please complete the onboarding process to get started.
        </p>
        <OnboardingForm />
      </div>
      <div className="w-[40%] bg-[#020617] min-h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
}
