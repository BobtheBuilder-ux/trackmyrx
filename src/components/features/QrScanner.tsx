
import { useState, useEffect } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const QrScanner = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const [permission, setPermission] = useState(false);
  
  // Mock QR scan completion after 5 seconds for demo purposes
  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        setScanning(false);
        toast.success("Prescription scanned successfully", {
          description: "Redirecting to pharmacy selection",
        });
        navigate('/pharmacy');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [scanning, navigate]);

  // Request camera permission
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setPermission(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        toast.error("Camera access denied", {
          description: "Please enable camera permissions to scan prescriptions"
        });
        setPermission(false);
      }
    };
    
    requestCameraPermission();
    
    // Cleanup
    return () => {
      // In a real app, this would stop the camera stream
    };
  }, []);
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <Button 
          variant="ghost" 
          size="icon"
          className="bg-black/30 text-white hover:bg-black/50 rounded-full"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={24} />
        </Button>
      </div>
      
      {permission ? (
        <div className="relative flex-1 flex items-center justify-center">
          {/* This would be a real camera view in a complete implementation */}
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="scanner-frame">
              <div className="scanner-line"></div>
              {/* This would be video feed in real implementation */}
              <div className="absolute inset-0 flex items-center justify-center text-white/70">
                <Camera size={64} className="opacity-30" />
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-ada-large mb-2">Scan Prescription QR Code</h2>
            <p className="text-ada-normal text-white/80">
              {scanning ? "Scanning..." : "Processing prescription..."}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-white">
          <Camera size={64} className="mb-4" />
          <h2 className="text-ada-large mb-4 text-center">Camera Permission Required</h2>
          <p className="text-ada-normal mb-6 text-center">
            Please enable camera access to scan prescription QR codes
          </p>
          <Button onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
