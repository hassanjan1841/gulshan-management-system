import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleBatch } from "../../services/api/batches";
import { getSections } from "../../services/api/sections";
import { useToast } from "../../hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

const BatchDetail = () => {
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const getBatch = async (id) => {
    const batch = await getSingleBatch(id);
    return batch;
  };

  const getSectionsOfThisBatch = async (batch) => {
    const sections = await getSections(batch);
    return sections;
  };

  useEffect(() => {
    const loadBatch = async () => {
      try {
        const batch = await getBatch(id);
        if (batch) {
          try {
            setLoading(true);
            const sections = await getSectionsOfThisBatch(batch.batch._id);
            setSections(sections.sections);
            setLoading(false);
          } catch (error) {
            if (error.message == "Network Error") {
              setLoading(false);
              toast({
                title: "Network Error",
                variant: "destructive",
              });
            }
            if (error.response.data.error) {
              setLoading(false);
              toast({
                title: error.response.data.message,
                variant: "destructive",
              });
            }
          }
        }
      } catch (error) {
        setLoading(false);
        toast({
          title: error.response.data.message,
          variant: "destructive",
        });
      }
    };
    loadBatch();
  }, [id]);

  return (
    <>
      <h3 className="text-xl ml-2">Sections</h3>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {sections?.map((section) => {
          // console.log("section in div", section);
          return (
            <Card key={section._id}>
              <CardHeader>
                <CardTitle>{section?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <p className="text-md font-bold">{section?.description}</p>
                  <div className="flex justify-end">
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default BatchDetail;
