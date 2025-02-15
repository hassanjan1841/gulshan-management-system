import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FilterSection({ 
  courses, 
  batches, 
  selectedCourse, 
  selectedBatch, 
  setSelectedCourse, 
  setSelectedBatch 
}) {
  return (
    <div className="flex space-x-4 mb-6">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="course-filter">Filter by Course</Label>
        <Select
          onValueChange={(value) => setSelectedCourse(value)}
          value={selectedCourse}
        >
          <SelectTrigger id="course-filter">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses?.map((course) => (
              <SelectItem key={course._id} value={course._id}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedCourse && (
        <div className="flex flex-col space-y-2">
          <Label htmlFor="batch-filter">Filter by Batch</Label>
          <Select
            onValueChange={(value) => setSelectedBatch(value)}
            value={selectedBatch}
          >
            <SelectTrigger id="batch-filter">
              <SelectValue placeholder="All Batches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              {batches?.map((batch) => (
                <SelectItem key={batch._id} value={batch._id}>
                  {batch.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

export default FilterSection; 