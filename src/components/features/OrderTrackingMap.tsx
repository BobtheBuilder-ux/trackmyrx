
import { useEffect, useState } from 'react';
import { MapPin, Navigation, Clock, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

// Mock data for a delivery
const mockDelivery = {
  id: 'DEL-12345',
  status: 'in-transit', // 'pending', 'in-transit', 'delivered'
  estimatedDelivery: '15 min',
  progress: 65,
  courierName: 'Michael T.',
  startLocation: 'Pharmacy One',
  endLocation: 'Your Address',
  statusUpdates: [
    { time: '2:30 PM', status: 'Order processed', completed: true },
    { time: '2:45 PM', status: 'Picked up by courier', completed: true },
    { time: '3:15 PM', status: 'In transit', completed: true },
    { time: '3:30 PM', status: 'Arrived at your location', completed: false },
    { time: '3:35 PM', status: 'Delivered', completed: false },
  ]
};

const OrderTrackingMap = () => {
  const navigate = useNavigate();
  const [delivery] = useState(mockDelivery);
  const [currentProgress, setCurrentProgress] = useState(delivery.progress);

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleVerifyDelivery = () => {
    navigate('/delivery-verification');
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-200 dark:bg-gray-800 rounded-xl h-56 w-full flex items-center justify-center relative overflow-hidden">
        {/* This would be an actual map in a real implementation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400 flex flex-col items-center">
            <Navigation size={40} />
            <p className="mt-2">Map View</p>
          </div>
        </div>
        
        {/* Map overlay with route path */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="text-medical-primary bg-medical-primary/10 p-2 rounded-full">
                  <Navigation size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Order in transit</h3>
                    <span className="text-xs bg-medical-accent/20 text-medical-accent px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <Clock size={14} />
                    <span>{delivery.estimatedDelivery}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Delivery Progress</h3>
              <span className="text-medical-primary">{currentProgress}%</span>
            </div>
            <Progress value={currentProgress} className="h-2" />
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-medical-primary/10 text-medical-primary p-2 rounded-full h-fit">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                <p className="font-medium">{delivery.startLocation}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-medical-primary/10 text-medical-primary p-2 rounded-full h-fit">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                <p className="font-medium">{delivery.endLocation}</p>
              </div>
            </div>
          </div>
          
          {currentProgress >= 95 && (
            <Button 
              className="w-full mt-4 flex items-center gap-2 bg-medical-primary hover:bg-medical-secondary"
              onClick={handleVerifyDelivery}
            >
              <Camera size={18} />
              Verify Delivery
            </Button>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">Delivery Status</h3>
          <div className="space-y-4">
            {delivery.statusUpdates.map((update, index) => (
              <div key={index} className="flex gap-3">
                <div className={`mt-1 w-4 h-4 rounded-full flex-shrink-0 ${
                  update.completed ? 'bg-medical-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}></div>
                <div>
                  <p className="font-medium">{update.status}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Button 
        variant="outline" 
        className="w-full text-medical-emergency border-medical-emergency hover:bg-medical-emergency/10"
      >
        Report an Issue
      </Button>
    </div>
  );
};

export default OrderTrackingMap;
