import { FileText, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PrescriptionCardProps {
  id: string;
  medication: string;
  doctor: string;
  date: string;
  status: 'active' | 'filled' | 'expired';
}

const PrescriptionCard = ({
  id,
  medication,
  doctor,
  date,
  status
}: PrescriptionCardProps) => {
  const handleDownload = () => {
    // In a real app, this would download the prescription PDF
    toast.success("Download started", {
      description: "Prescription PDF downloading..."
    });
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'filled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-ada-normal">{medication}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs uppercase font-medium ${getStatusColor()}`}>
            {status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Doctor:</span>
            <span>{doctor}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Date:</span>
            <span>{date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Rx Number:</span>
            <span>{id}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center gap-2"
          onClick={handleDownload}
        >
          <FileText size={16} />
          <span>Download PDF</span>
          <ArrowDown size={16} className="ml-auto" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PrescriptionCard;
