"use client";

import { useState, useEffect } from "react";
import AdminBatchesCard from "./AdminBatchesCard";
import Loader from "../Loader";
import { getCourses } from "../../services/api/courses";
import { useToast } from "../../hooks/use-toast";

const fetchCourses = async (page, limit) => {
  let courses = await getCourses(page, limit);
  return courses;
};

const AdminBatches = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();


  const limit = 9;

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const newCourses = await fetchCourses(page, limit);
        setCourses(newCourses.courses);
        setLoading(false);
        
      } catch (error) {
        if(error.message == 'Network Error'){
          setLoading(false);
          toast({
            title: "Network Error",
            variant: "destructive",
          });
        }
        setLoading(false);
      }
    };
    loadCourses();
  }, [page]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Batches</h1>
      </div>
      <div className="flex flex-col space-y-8">
        {courses?.map((course, index) => (
          <>
            <h1 className="text-2xl">{course.title}</h1>
            <AdminBatchesCard course={course} key={index} />
          </>
        ))}
      </div>
      {loading && <Loader />}
    </div>
  );
};
export default AdminBatches;
