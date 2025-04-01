
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X, Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { toast } from 'sonner';

const DeliveryVerificationPage = () => {
  const navigate = useNavigate();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [verifying, setVerifying] = useState(false);
  
  const handleTakePhoto = () => {
    // In a real app, this would access the camera and take a photo
    setPhotoTaken(true);
  };
  
  const handleRetake = () => {
    setPhotoTaken(false);
  };
  
  const handleVerify = () => {
    setVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setVerifying(false);
      toast.success("Delivery verified successfully", {
        description: "Your order has been marked as delivered"
      });
      navigate('/');
    }, 2000);
  };
  
  return (
    <AppLayout title="Verify Delivery">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-ada-normal font-medium">Take a Photo of Your Delivery</h2>
          <p className="text-sm text-muted-foreground mt-1">
            This helps us confirm your medication was delivered correctly
          </p>
        </div>
        
        <div className="bg-gray-200 dark:bg-gray-800 rounded-xl h-80 w-full flex items-center justify-center relative overflow-hidden">
          {photoTaken ? (
            <>
              {/* This would be the actual photo in a real implementation */}
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="text-white flex flex-col items-center">
                  <Check size={40} className="text-green-500" />
                  <p className="mt-2">Photo captured</p>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white/20 text-white border-white/30"
                  onClick={handleRetake}
                >
                  <X size={18} />
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* This would be the camera view in a real implementation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 flex flex-col items-center">
                  <Camera size={40} />
                  <p className="mt-2">Camera preview</p>
                </div>
              </div>
              
              <div className="absolute bottom-4 inset-x-0 flex justify-center">
                <Button 
                  size="icon" 
                  className="rounded-full w-16 h-16 bg-white text-medical-primary hover:bg-white/90"
                  onClick={handleTakePhoto}
                >
                  <Camera size={24} />
                </Button>
              </div>
            </>
          )}
        </div>
        
        <div className="space-y-4">
          {photoTaken ? (
            <Button 
              className="w-full bg-medical-primary hover:bg-medical-secondary flex items-center gap-2"
              onClick={handleVerify}
              disabled={verifying}
            >
              {verifying ? (
                'Verifying...'
              ) : (
                <>
                  <Check size={18} />
                  <span>Verify Delivery</span>
                </>
              )}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={() => {
                // In a real app, this would allow selecting a photo from the gallery
                setPhotoTaken(true);
              }}
            >
              <Upload size={18} />
              <span>Upload from Gallery</span>
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full text-medical-emergency hover:text-medical-emergency hover:bg-medical-emergency/10"
            onClick={() => navigate('/report-issue')}
          >
            Report an Issue with Delivery
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default DeliveryVerificationPage;
