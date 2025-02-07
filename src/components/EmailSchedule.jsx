import { useState } from "react";
import { appRoutes } from "../constant/constant";

const EmailScheduler = () => {
  const [emails, setEmails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailList = emails.split(",").map((email) => email.trim()); // Convert to array

    const response = await fetch(appRoutes.scheduleEmails, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ students: emailList }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Schedule Emails</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter student emails, separated by commas"
          value={emails}
          className="block w-full p-2 mb-4 text-primary-foreground"
          onChange={(e) => setEmails(e.target.value)}
        />
        <button type="submit">Schedule Emails</button>
      </form>
    </div>
  );
};

export default EmailScheduler;
