
import { Download, Eye } from 'lucide-react';
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AllCertificateCard({
  title,
  issueDate,
  description,
  status,
  certificateUrl,
  expirationDate,
  issuer,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log(title)
  const handleDownload = () => {
    // Logic to download the certificate
    window.open(certificateUrl, '_blank');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" className="bg-green-500">
            Active
          </Badge>
        );
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md min-w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Issued: {issueDate}</p>
          {getStatusBadge(status)}
        </div>
        <div className="mt-4 space-x-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="">
                <Eye className="mr-2 h-4 w-4" />
                Show Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>Issued by {issuer} on {issueDate}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={"https://images.spiceworks.com/wp-content/uploads/2022/07/13131906/CCNA-Certification.png"}
                  alt={`${title} Certificate`}
                  className="w-full h-auto"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

