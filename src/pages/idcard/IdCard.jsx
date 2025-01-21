import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function IdCard() {
  const [verificationMethod, setVerificationMethod] = useState("email");
  const [verificationValue, setVerificationValue] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const studentData = {
    name: "AWAIS NIAZ",
    rollNo: "WMA-187618",
    course: "Web & Mobile App Development",
    batch: "WMA BATCH (11)",
    campus: "SMIT Main Campus",
    fatherName: "NIAZ AHMED",
    cnic: "42201-5822934-3",
    email: "awais@example.com", // Added for demonstration
  };

  // Generate a string to encode into the QR code
  const qrCodeData = `Name: ${studentData.name}\nRoll No: ${studentData.rollNo}\nCourse: ${studentData.course}\nBatch: ${studentData.batch}\nCampus: ${studentData.campus}`;

  const handleVerification = () => {
    // In a real application, you would verify against a database
    if (
      (verificationMethod === "email" &&
        verificationValue === studentData.email) ||
      (verificationMethod === "cnic" && verificationValue === studentData.cnic)
    ) {
      setIsVerified(true);
    } else {
      alert("Verification failed. Please try again.");
    }
  };

  if (!isVerified) {
    return (
      <div className="flex flex-col items-center justify-center  p-4">
        <div className="w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center">
            Verify Your Identity
          </h1>
          <RadioGroup
            value={verificationMethod}
            onValueChange={(value) => setVerificationMethod(value)}
            className="flex justify-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cnic" id="cnic" />
              <Label htmlFor="cnic">CNIC</Label>
            </div>
          </RadioGroup>
          <Input
            type={verificationMethod === "email" ? "email" : "text"}
            placeholder={`Enter your ${verificationMethod}`}
            value={verificationValue}
            onChange={(e) => setVerificationValue(e.target.value)}
          />
          <Button onClick={handleVerification} className="w-full">
            Verify
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center border border-blue-300 rounded- p-4 gap-5">
      <div className="  h-[600px] ">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-10 w-full rounded-t-full "></div>

        <div className="bg-blend-hard-light h-4 w-full "></div>
        <img
          src="https://quiz.saylaniwelfare.com/images/smit.png"
          alt="Logo"
          className="mx-auto mt-5 h-20 w-auto"
        />
        <div className="flex justify-center items-center bg-gray-200 w-64 h-16 mx-auto  flex-col font-bold text-2xl mt-5   border-blue-500 border-r-2 border-t-2 ">
          <h1 className="text-blue-800">SAYLANI MASS IT </h1>
          <h1 className="text-blue-800">TRAINING PROGRAM</h1>
        </div>
        <div>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s"
            }
            alt="Student IMage"
            className="mt-5 mx-auto rounded border-4 border-indigo-200 border-x-indigo-500   w-36 h-36"
          />
          <h1 className="mt-5 mx-auto flex justify-center text-2xl font-semibold">
            AWAIS NIAZ
          </h1>
        </div>
        <h1 className="mt-3 mx-auto flex justify-center text-2xl ">
          Web & Mobile App Development
        </h1>
        <h1 className="mt-3 mx-auto flex justify-center text-2xl font-semibold ">
          Roll NO : WMA-187618
        </h1>
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-b-full h-12 w-full border-t-full mt-2">
          {" "}
        </div>
      </div>
      {/* bACKsIDE STARTED  HERE  */}
      <div className=" h-[600px] ">
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-10 w-full rounded-t-full border-t-full "></div>

        <div className="mx-8 p-2  flex items-center  flex-col mt-5 gap-2 text-lg ">
          <h2 className="text-gray-500">
            Name:{" "}
            <span className="border-black border-b-4  mx-auto text-blue-800">
              {" "}
              ____AWAIS NIAZ ___________{" "}
            </span>{" "}
          </h2>
          <h2 className="text-gray-500">
            Father name:{" "}
            <span className="border-black border-b-4  mx-auto text-blue-800">
              {" "}
              ____NIAZ AHMED____{" "}
            </span>{" "}
          </h2>
          <h2 className="text-gray-500">
            CNIC:{" "}
            <span className="border-black border-b-4  mx-auto text-blue-800">
              {" "}
              __42201-5822934-3________{" "}
            </span>{" "}
          </h2>
          <h2 className="text-gray-500">
            Course:{" "}
            <span className="border-black border-b-4  mx-auto text-blue-800">
              {" "}
              ______WMA BATCH (11)___{" "}
            </span>{" "}
          </h2>
        </div>
        <div>
          <QRCodeCanvas value={qrCodeData} className="m-5 mx-auto" />
        </div>
        <div className="  flex items-center  flex-col text-lg font-bold ">
          <p>Note: This card is for SMIT premises only.</p>
          <p>If found please return to SMIT</p>
        </div>

        <div className=" h-20  mx-14"></div>
        <div className="border-black border-b-4  mx-14 flex items-center justify-center">
          {" "}
        </div>
        <div className="flex items-center justify-center text-lg font-bold ">
          Issuing Authority
        </div>

        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-b-full h-12 w-full ">
          {" "}
        </div>
      </div>
    </div>
  );
}
