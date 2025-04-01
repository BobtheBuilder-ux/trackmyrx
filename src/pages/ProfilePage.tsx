
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, CreditCard, Settings, Moon, Sun, Camera, FilePdf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import MedicalCard from '@/components/features/MedicalCard';
import AppLayout from '@/components/layout/AppLayout';
import PrescriptionCard from '@/components/features/PrescriptionCard';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  return (
    <AppLayout title="My Profile">
      <div className="max-w-md mx-auto space-y-6 pb-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-medical-primary/20 rounded-full flex items-center justify-center mb-3">
            <UserCircle size={50} className="text-medical-primary" />
          </div>
          <h2 className="text-ada-large font-medium">Jane Doe</h2>
          <p className="text-muted-foreground">jane.doe@example.com</p>
        </div>
        
        <MedicalCard
          name="Jane Doe"
          birthDate="April 15, 1985"
          bloodType="A+"
          allergies={["Penicillin", "Peanuts", "Latex"]}
          emergencyContact="John Doe (Husband) - (555) 123-4567"
        />
        
        <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FilePdf size={20} className="text-medical-primary mr-2" />
              <h3 className="font-medium">Recent Prescriptions</h3>
            </div>
            <Button variant="link" size="sm" onClick={() => navigate('/')}>
              View All
            </Button>
          </div>
          
          <PrescriptionCard
            id="RX728901"
            medication="Lisinopril 10mg"
            doctor="Dr. Sarah Johnson"
            date="May 15, 2023"
            status="active"
          />
        </div>
        
        <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
          <h3 className="font-medium mb-4">Account Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera size={20} className="text-medical-primary" />
                <span>Insurance Card</span>
              </div>
              <Button variant="outline" size="sm">
                Scan Card
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard size={20} className="text-medical-primary" />
                <span>Payment Methods</span>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings size={20} className="text-medical-primary" />
                <span>App Preferences</span>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Moon size={20} className="text-medical-primary" />
                ) : (
                  <Sun size={20} className="text-medical-primary" />
                )}
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={isDark}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>trackmyrx v1.0.0</p>
          <p className="mt-1">© 2023 MedTech Solutions</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
