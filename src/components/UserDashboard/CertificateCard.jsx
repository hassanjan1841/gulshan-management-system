import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CertificateCard() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          Certificates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between space-x-2">
          <div className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-md bg-secondary">
            <span className="text-xs font-medium">Total</span>
            <span className="text-sm font-semibold">8</span>
          </div>
          <div className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-md bg-secondary/70">
            <span className="text-xs font-medium">Active</span>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">6</span>
          </div>
          <div className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-md bg-secondary/50">
            <span className="text-xs font-medium">Expired</span>
            <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">1</span>
          </div>
          <div className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-md bg-secondary/30">
            <span className="text-xs font-medium">Pending</span>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">1</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

