
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, PlusCircle, Pill, ClipboardList, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrescriptionCard from '@/components/features/PrescriptionCard';
import AppLayout from '@/components/layout/AppLayout';

const PrescriptionsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  
  // Mock prescription data
  const activePrescriptions = [
    {
      id: "RX728901",
      medication: "Lisinopril 10mg",
      doctor: "Dr. Sarah Johnson",
      date: "May 15, 2023",
      status: 'active' as const
    },
    {
      id: "RX728902",
      medication: "Atorvastatin 20mg",
      doctor: "Dr. Michael Chen",
      date: "May 20, 2023",
      status: 'active' as const
    }
  ];
  
  const pastPrescriptions = [
    {
      id: "RX623401",
      medication: "Amoxicillin 500mg",
      doctor: "Dr. Sarah Johnson",
      date: "Jan 05, 2023",
      status: 'filled' as const
    },
    {
      id: "RX598732",
      medication: "Prednisone 20mg",
      doctor: "Dr. Robert Williams",
      date: "Mar 10, 2023",
      status: 'filled' as const
    },
    {
      id: "RX521890",
      medication: "Azithromycin 250mg",
      doctor: "Dr. Michael Chen",
      date: "Feb 22, 2023",
      status: 'expired' as const
    }
  ];
  
  return (
    <AppLayout title="My Prescriptions">
      <div className="space-y-4 max-w-md mx-auto">
        <Card className="bg-medical-primary text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-ada-large font-bold">Fill a Prescription</h2>
                <p className="text-sm text-white/80 mt-1">Scan your prescription QR code</p>
              </div>
              <QrCode size={40} />
            </div>
            <Button 
              className="w-full mt-4 bg-white text-medical-primary hover:bg-medical-light"
              onClick={() => navigate('/scan')}
            >
              Scan QR Code
            </Button>
          </CardContent>
        </Card>
        
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-border"></div>
          <span className="px-4 text-sm text-muted-foreground">Your Prescriptions</span>
          <div className="flex-grow h-px bg-border"></div>
        </div>
        
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Pill size={16} />
              <span>Active</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History size={16} />
              <span>History</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="py-4">
            {activePrescriptions.length > 0 ? (
              <div className="space-y-4">
                {activePrescriptions.map(prescription => (
                  <PrescriptionCard
                    key={prescription.id}
                    {...prescription}
                  />
                ))}
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 mt-4"
                  onClick={() => navigate('/scan')}
                >
                  <PlusCircle size={16} />
                  <span>Add New Prescription</span>
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <h3 className="mt-2 text-ada-normal font-medium">No Active Prescriptions</h3>
                <p className="text-muted-foreground mt-1">Scan a QR code to add a prescription</p>
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/scan')}
                >
                  Scan Prescription
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="py-4">
            {pastPrescriptions.length > 0 ? (
              <div className="space-y-4">
                {pastPrescriptions.map(prescription => (
                  <PrescriptionCard
                    key={prescription.id}
                    {...prescription}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <History className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <h3 className="mt-2 text-ada-normal font-medium">No Prescription History</h3>
                <p className="text-muted-foreground mt-1">Your past prescriptions will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default PrescriptionsPage;
