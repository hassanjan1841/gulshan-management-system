import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

const FilterStudents = ({ filters, handleFilterChange, setFilters }) => {
  return (
    <div className="mb-4">
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <Input
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search by name or father's name"
        />
        <Select
          value={filters.status}
          name="status"
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="true">Passed</SelectItem>
            <SelectItem value="false">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.batch}
          name="batch"
          onValueChange={(value) => setFilters({ ...filters, batch: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Batches</SelectItem>
            <SelectItem value="Batch 1">Batch 1</SelectItem>
            <SelectItem value="Batch 2">Batch 2</SelectItem>
            <SelectItem value="Batch 3">Batch 3</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.teacher}
          name="teacher"
          onValueChange={(value) => setFilters({ ...filters, teacher: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Teacher" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teachers</SelectItem>
            <SelectItem value="Teacher 1">Teacher 1</SelectItem>
            <SelectItem value="Teacher 2">Teacher 2</SelectItem>
            <SelectItem value="Teacher 3">Teacher 3</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.course}
          name="course"
          onValueChange={(value) => setFilters({ ...filters, course: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="Course 1">Course 1</SelectItem>
            <SelectItem value="Course 2">Course 2</SelectItem>
            <SelectItem value="Course 3">Course 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="sticky top-10">Filter Students</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="p-6 rounded-t-lg shadow-xl">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold text-start mb-4">
                Filters
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-4">
              <Input
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by name or father's name"
              />
              <Select
                value={filters.status}
                name="status"
                onValueChange={(value) =>
                  setFilters({ ...filters, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="true">Passed</SelectItem>
                  <SelectItem value="false">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.batch}
                name="batch"
                onValueChange={(value) =>
                  setFilters({ ...filters, batch: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  <SelectItem value="Batch 1">Batch 1</SelectItem>
                  <SelectItem value="Batch 2">Batch 2</SelectItem>
                  <SelectItem value="Batch 3">Batch 3</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.teacher}
                name="teacher"
                onValueChange={(value) =>
                  setFilters({ ...filters, teacher: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teachers</SelectItem>
                  <SelectItem value="Teacher 1">Teacher 1</SelectItem>
                  <SelectItem value="Teacher 2">Teacher 2</SelectItem>
                  <SelectItem value="Teacher 3">Teacher 3</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.course}
                name="course"
                onValueChange={(value) =>
                  setFilters({ ...filters, course: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="Course 1">Course 1</SelectItem>
                  <SelectItem value="Course 2">Course 2</SelectItem>
                  <SelectItem value="Course 3">Course 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FilterStudents;
