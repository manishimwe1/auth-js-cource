import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/actions/userAction";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="max-w-xl mx-auto mt-20">
      <form
        action={register}
        className="space-y-8 border shadow-md border-slate-950 p-10 rounded-md shadow-black/20"
      >
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-start flex-col justify-center gap-2 w-full">
            <Label htmlFor="firstname" className=" flex items-start">
              Name
            </Label>
            <Input
              id="firstname"
              placeholder="Enter name"
              type="text"
              name="firstname"
            />
          </div>
          <div className="flex items-start flex-col justify-center gap-2 w-full">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              placeholder="Enter name"
              type="text"
              name="lastname"
            />
          </div>
        </div>
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
          Sign up &rarr;
        </Button>
        <p className="flex items-end gap-1 justify-end">
          Already have an account <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
