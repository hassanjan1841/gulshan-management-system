import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="relative ">
      {/* Container for input and icon */}
      <div className="flex items-center border rounded-full focus:border-white px-2 py-1">
        {/* Search Icon */}
        <Search className="text-gray-500 mr-2" />

        {/* Input field */}
        <Input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent border-none focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchInput;
