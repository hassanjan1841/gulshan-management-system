import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function StatCard({ title, value }) {
    return (
      <Card className="dark:bg-card">   
        <CardContent className="p-6">
          <CardDescription className="text-md font-semibold text-muted-foreground">
            {title}
          </CardDescription>
          <CardTitle className="mt-2 text-2xl font-bold text-foreground">
            {value}
          </CardTitle>
        </CardContent>
      </Card>
    )
  }