import { Card, CardContent } from "@/components/ui/card";
export default function Loader() {
  return (
    <Card className="w-full mx-auto mt-10">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </CardContent>
    </Card>
  );
}
