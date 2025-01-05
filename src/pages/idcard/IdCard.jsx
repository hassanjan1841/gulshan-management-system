
import { QRCodeCanvas } from 'qrcode.react';

export default function IdCard() {
    const studentData = {
        name: "AWAIS NIAZ",
        rollNo: "WMA-187618",
        course: "Web & Mobile App Development",
        batch: "WMA BATCH (11)",
        campus: "SMIT Main Campus"
    };

    // Generate a string to encode into the QR code
    const qrCodeData = `Name: ${studentData.name}\nRoll No: ${studentData.rollNo}\nCourse: ${studentData.course}\nBatch: ${studentData.batch}\nCampus: ${studentData.campus}`;

    return (
        <div className="flex justify-center items-center border border-blue-300 rounded- p-4 min-h-screen gap-5">
            <div className="border border-blue-700 w-96 h-[600px] "  >

                <div className="bg-blue-700 h-10 w-full border-t-full"></div>

                <div className="bg-green-500 h-4 w-full "></div>
                <img src="https://quiz.saylaniwelfare.com/images/smit.png" alt="Logo" className="mx-auto mt-5 h-20 w-auto" />
                <div className="flex justify-center items-center bg-gray-200 w-64 h-16 mx-auto  flex-col font-bold text-2xl mt-5   border-blue-500 border-r-2 border-t-2 ">
                    <h1 className="text-blue-800">SAYLANI MASS IT </h1>
                    <h1 className="text-blue-800">TRAINING PROGRAM</h1>

                </div>
                <div>
                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s"}
                        alt="Student IMage"
                        className="mt-5 mx-auto rounded-lg border-green-400 border-4 w-36 h-36" />
                    <h1 className="mt-5 mx-auto flex justify-center text-2xl font-semibold">AWAIS NIAZ</h1>
                </div>
                <h1 className="mt-5 mx-auto flex justify-center text-2xl ">Web & Mobile App Development</h1>
                <h1 className="mt-5 mx-auto flex justify-center text-2xl font-semibold ">Roll NO : WMA-187618</h1>
                <div className="bg-blue-700 h-10 w-full border-t-full"></div>

                <div className="bg-green-500 h-4 w-full "></div>
            </div>
            {/* bACKsIDE STARTED  HERE  */}
            <div className="border border-blue-700 w-96 h-[600px] "  >

                <div className="bg-blue-700 h-10 w-full border-t-full " ></div>

                <div className="mx-8 p-2  flex items-center  flex-col mt-5 gap-2 text-lg ">
                    <h2>Name: <span className="border-black border-b-4  mx-auto"> ____AWAIS NIAZ ___________ </span> </h2>
                    <h2>Father name: <span className="border-black border-b-4  mx-auto"> ____NIAZ AHMED____ </span> </h2>
                    <h2>CNIC: <span className="border-black border-b-4  mx-auto">  __42201-5822934-3________ </span> </h2>
                    <h2>Course: <span className="border-black border-b-4  mx-auto">  ______WMA BATCH (11)___ </span> </h2>
                </div>
                <div>
                    {/* Auto Generate QR Code Here  */}
                    {/* <QrCode size={150} className="mx-auto justify-center m-4" /> */}
                    <QRCodeCanvas value={qrCodeData} />
                </div>
                <div className="  flex items-center  flex-col text-lg font-bold ">
                    <p>Note: This card is for SMIT premises only.</p>
                    <p>If found please return to SMIT</p>
                </div>

                <div className=" h-20  mx-14"></div>
                <div className="border-black border-b-4  mx-14 flex items-center justify-center">   </div>
                <div className="flex items-center justify-center text-lg font-bold ">Issuing Authority</div>


                <div className="bg-blue-700 h-10 w-full border-t-full"> </div>

                <div className="bg-green-500 h-4 w-full "></div>
            </div>


        </div>
    )
}

