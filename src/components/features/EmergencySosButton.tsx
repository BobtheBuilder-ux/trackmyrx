
import { useState } from 'react';
import { Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const EmergencySosButton = () => {
  const [open, setOpen] = useState(false);
  
  const handleEmergencyCall = () => {
    // In a real app, this would integrate with emergency services
    toast.info("Emergency services would be contacted here", {
      description: "Your medical ID and location would be shared",
      duration: 5000,
    });
    setOpen(false);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="sos-button" aria-label="Emergency SOS">
            <Phone size={28} strokeWidth={2.5} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-medical-emergency text-center text-xl">Emergency SOS</DialogTitle>
            <DialogDescription className="text-center">
              This will alert emergency services and share your medical ID and location.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button 
              variant="destructive" 
              className="bg-medical-emergency hover:bg-red-700 py-6 text-lg"
              onClick={handleEmergencyCall}
            >
              Contact Emergency Services
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencySosButton;
