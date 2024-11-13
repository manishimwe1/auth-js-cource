import Link from "next/link";
import React from "react";

const Hearder = () => {
  return (
    <nav className="flex justify-between items-center container mx-auto py-4">
      <p>LOGO</p>
      <div className="flex items-center justify-center gap-8">
        <Link href={"/register"} className="cursor-pointer">
          Register
        </Link>
        <Link href={"/login"} className="cursor-pointer">
          Login
        </Link>
        <Link href={"/logout"} className="cursor-pointer">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Hearder;
