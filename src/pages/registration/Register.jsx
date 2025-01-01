// import Hot from "@/components/applyForm";

import { Button } from "@/components/ui/button";
import RegisterForm from "./registerForm";

export default function Register() {
  return (
    <div className="flex bg-white min-h-screen  items-center justify-center flex-col text-slate-700 border-b-gray-500">
      <div className="flex flex-col items-center justify-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s"
          height={100}
          width={200}
          alt="Logo Loading..."
          className="flex justify-center mx-auto "
        />
        <h1 className="text-black font-bold text-2xl sm:text-3xl">
          REGISTRATION FORM-SMIT
        </h1>
        <p className=" text-gray-500 flex mx-auto justify-center mt-5  ">
          Services-Education-Registration{" "}
        </p>
        <div className="gap-6 flex mx-4 mt-4 flex-wrap justify-center">
          <Button className="bg-gray-100 text?-[green-500] : [blue-500] ">
            Registration{" "}
          </Button>
          <Button>Download ID Card </Button>
          <Button>Results</Button>
        </div>
      </div>
      <hr className="border-b-gray-500" />

      <RegisterForm />
    </div>
  );
}
