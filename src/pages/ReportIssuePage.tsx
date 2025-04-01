
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, AlertCircle, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import AppLayout from '@/components/layout/AppLayout';
import { toast } from 'sonner';

const ReportIssuePage = () => {
  const navigate = useNavigate();
  const [issueType, setIssueType] = useState("wrong-medication");
  const [description, setDescription] = useState("");
  const [photoAttached, setPhotoAttached] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Issue reported successfully", {
        description: "We'll respond to your report shortly"
      });
      navigate('/');
    }, 2000);
  };
  
  const handleAttachPhoto = () => {
    // In a real app, this would open the camera or photo gallery
    setPhotoAttached(true);
  };
  
  return (
    <AppLayout title="Report an Issue">
      <div className="max-w-md mx-auto space-y-6">
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex gap-3">
          <AlertCircle className="text-yellow-500 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-400">Issues with medication?</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-500 mt-1">
              If you're experiencing side effects or medical concerns, please contact your doctor immediately.
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">What type of issue are you reporting?</h3>
            
            <RadioGroup value={issueType} onValueChange={setIssueType}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="wrong-medication" id="wrong-medication" />
                <Label htmlFor="wrong-medication">Wrong medication received</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="damaged-package" id="damaged-package" />
                <Label htmlFor="damaged-package">Damaged package</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="missing-items" id="missing-items" />
                <Label htmlFor="missing-items">Missing items</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="delivery-issue" id="delivery-issue" />
                <Label htmlFor="delivery-issue">Delivery issue</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other issue</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Describe the issue</Label>
            <Textarea 
              id="description" 
              placeholder="Please provide details about the issue" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Attach Photo Evidence</Label>
            <div className="bg-gray-100 dark:bg-gray-800 border border-border rounded-lg h-40 flex items-center justify-center">
              {photoAttached ? (
                <div className="text-center">
                  <div className="text-medical-primary mb-2">✓ Photo attached</div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setPhotoAttached(false)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleAttachPhoto}
                >
                  <Camera size={18} />
                  <span>Take Photo</span>
                </Button>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={submitting || !description}
            className="w-full bg-medical-primary hover:bg-medical-secondary flex items-center justify-center gap-2"
          >
            {submitting ? 'Submitting...' : (
              <>
                <SendHorizonal size={18} />
                <span>Submit Report</span>
              </>
            )}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

export default ReportIssuePage;
