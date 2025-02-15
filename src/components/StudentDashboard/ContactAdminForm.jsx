import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { ComboboxList } from "@/components/ComboboxList";

export function ContactAdminForm({ onClose, branches, sections }) {
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [preferredBranch, setPreferredBranch] = useState("");
  const [preferredSection, setPreferredSection] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      preferredBranch,
      preferredSection,
      email,
      rollNumber,
    });
    toast.success("Your request has been sent to the administrator.");
    onClose();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Contact Administrator</h2>
      <div>
        <Label htmlFor="preferredBranch">Preferred Branch</Label>
        <ComboboxList
          items={branches}
          placeholder="Select Preferred Branch"
          onSelect={setPreferredBranch}
        />
      </div>
      <div>
        <Label htmlFor="preferredSection">Preferred Section</Label>
        <ComboboxList
          items={sections}
          placeholder="Select Preferred Section"
          onSelect={setPreferredSection}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="rollNumber">Roll Number</Label>
        <Input
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </motion.form>
  );
}
