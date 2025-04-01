
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface MedicalCardProps {
  name: string;
  birthDate: string;
  bloodType: string;
  allergies: string[];
  emergencyContact: string;
}

const MedicalCard = ({
  name,
  birthDate,
  bloodType,
  allergies,
  emergencyContact
}: MedicalCardProps) => {
  return (
    <Card className="overflow-hidden border-2 border-medical-primary">
      <CardHeader className="bg-medical-primary text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-ada-large font-bold">Medical ID</h3>
            <p className="text-sm opacity-80">Emergency Information</p>
          </div>
          <div className="text-2xl font-bold bg-white text-medical-primary px-3 py-1 rounded-md">
            {bloodType}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Patient Name</h4>
          <p className="text-ada-normal font-medium">{name}</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</h4>
          <p className="text-ada-normal">{birthDate}</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Allergies</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {allergies.map((allergy, index) => (
              <span 
                key={index} 
                className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 px-2 py-1 rounded-md text-sm"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Emergency Contact</h4>
          <p className="text-ada-normal">{emergencyContact}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalCard;
