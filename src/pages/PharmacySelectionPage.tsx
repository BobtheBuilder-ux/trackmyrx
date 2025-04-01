
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Map, ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/components/layout/AppLayout';

const pharmacies = [
  {
    id: 1,
    name: 'QuickCare Pharmacy',
    address: '123 Health St',
    distance: '0.8 mi',
    price: 24.99,
    eta: '15 min',
    rating: 4.7
  },
  {
    id: 2,
    name: 'MedExpress Rx',
    address: '456 Wellness Ave',
    distance: '1.2 mi',
    price: 19.99,
    eta: '22 min',
    rating: 4.5
  },
  {
    id: 3,
    name: 'HealthPoint Pharmacy',
    address: '789 Care Blvd',
    distance: '1.5 mi',
    price: 22.50,
    eta: '25 min',
    rating: 4.8
  },
  {
    id: 4,
    name: 'City Drugs',
    address: '555 Urban Center',
    distance: '2.1 mi',
    price: 18.75,
    eta: '35 min',
    rating: 4.2
  }
];

const PharmacySelectionPage = () => {
  const navigate = useNavigate();
  const [radius, setRadius] = useState([3]);
  const [sortBy, setSortBy] = useState('distance');
  
  const handleSelectPharmacy = () => {
    navigate('/payment');
  };
  
  const getSortedPharmacies = () => {
    const filtered = pharmacies.filter(p => {
      const distance = parseFloat(p.distance);
      return distance <= radius[0];
    });
    
    return filtered.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'eta') {
        return parseInt(a.eta) - parseInt(b.eta);
      } else {
        return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });
  };
  
  const sortedPharmacies = getSortedPharmacies();
  
  return (
    <AppLayout title="Select Pharmacy">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
          </Button>
          <h3 className="text-ada-normal font-medium">Lisinopril 10mg • 30 tablets</h3>
          <div className="w-8"></div>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Distance (miles)</h3>
              <div className="px-1">
                <Slider
                  defaultValue={[3]}
                  max={10}
                  step={0.5}
                  value={radius}
                  onValueChange={setRadius}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">0.5 mi</span>
                  <span className="text-xs font-medium">{radius[0]} miles</span>
                  <span className="text-xs text-muted-foreground">10 mi</span>
                </div>
              </div>
            </div>
            
            <h3 className="font-medium mb-2">Sort by</h3>
            <Tabs defaultValue="distance" value={sortBy} onValueChange={setSortBy}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="distance" className="text-xs">Distance</TabsTrigger>
                <TabsTrigger value="price" className="text-xs">Price</TabsTrigger>
                <TabsTrigger value="eta" className="text-xs">ETA</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center">
          <h2 className="text-ada-normal font-medium">Available Pharmacies</h2>
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list" className="w-10 h-8 px-0">
                <ClipboardList size={16} />
              </TabsTrigger>
              <TabsTrigger value="map" className="w-10 h-8 px-0">
                <Map size={16} />
              </TabsTrigger>
            </Tabs>
          </Tabs>
        </div>
        
        <Tabs defaultValue="list" className="w-full">
          <TabsContent value="list" className="space-y-3">
            {sortedPharmacies.length > 0 ? (
              sortedPharmacies.map(pharmacy => (
                <Card key={pharmacy.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{pharmacy.name}</h3>
                        <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 rounded-full">
                          In Stock
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{pharmacy.address}</span>
                        <span className="mx-1">•</span>
                        <span>{pharmacy.distance}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center">
                          <DollarSign size={16} className="text-medical-primary mr-1" />
                          <span className="font-medium">${pharmacy.price.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock size={16} className="text-medical-primary mr-1" />
                          <span>{pharmacy.eta}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-border px-4 py-2 flex justify-between items-center bg-muted/50">
                      <div>
                        <div className="flex items-center">
                          <Zap size={14} className="text-medical-accent mr-1" />
                          <span className="text-xs text-medical-accent">GoodRx Savings Applied</span>
                        </div>
                      </div>
                      
                      <Button size="sm" onClick={handleSelectPharmacy}>
                        Select
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <h3 className="mt-2 text-ada-normal font-medium">No Pharmacies Found</h3>
                <p className="text-muted-foreground mt-1">Try increasing your search radius</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="map">
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <Map size={48} className="mx-auto text-muted-foreground/60" />
                <p className="mt-2 text-muted-foreground">Map View</p>
                <p className="text-xs text-muted-foreground/80 mt-1">
                  (Would display interactive map with pharmacy locations)
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
  
  function ClipboardList(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M12 11h4" />
        <path d="M12 16h4" />
        <path d="M8 11h.01" />
        <path d="M8 16h.01" />
      </svg>
    );
  }
};

export default PharmacySelectionPage;
