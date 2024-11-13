import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions/userAction";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const sessions = await auth();
  if (sessions?.user) {
    redirect("/");
  }
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", sessions);

  return (
    <div className="max-w-xl mx-auto mt-20 border shadow-md border-slate-950 p-10 rounded-md shadow-black/20">
      <form action={login} className="space-y-8 ">
        <div className="flex items-start flex-col justify-center gap-2 w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="example@gmail.com"
            type="email"
            name="email"
          />
        </div>
        <div className="flex items-start flex-col justify-center gap-2 w-full">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />
        </div>
        <Button className="w-full" type="submit">
          Login &rarr;
        </Button>
      </form>

      <section className="w-full mt-6 flex flex-col gap-4">
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button className="w-full" variant={"secondary"}>
            Sign in with google
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <Button className="w-full" variant={"secondary"}>
            Sign in with github
          </Button>
        </form>
      </section>
      <p className="flex items-end gap-1 justify-end mt-6">
        Already dont have an account <Link href="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
