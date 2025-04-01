
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/components/layout/AppLayout';
import { toast } from 'sonner';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  
  const handlePayment = () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setShowPrescription(true);
      toast.success("Payment successful", {
        description: "Your prescription is ready to view"
      });
    }, 2000);
  };
  
  const handleContinue = () => {
    navigate('/track');
  };
  
  return (
    <AppLayout title="Payment & Prescription">
      <div className="max-w-md mx-auto space-y-6">
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center"
          onClick={() => navigate('/pharmacy')}
        >
          <ArrowLeft size={20} />
        </Button>
        
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">Lisinopril 10mg</h3>
                <p className="text-sm text-muted-foreground">30 tablets</p>
              </div>
              <p className="font-bold">$19.99</p>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pharmacy</span>
              <span>MedExpress Rx</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated delivery</span>
              <span>22 min</span>
            </div>
            
            <div className="border-t border-border my-2 pt-2">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>$19.99</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {!showPrescription ? (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="text-medical-primary" />
                <h3 className="font-medium">Payment Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="John Smith" />
                </div>
              </div>
              
              <Button 
                className="w-full bg-medical-primary hover:bg-medical-secondary"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Pay $19.99'}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock size={14} />
                <span>Secure payment processing</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="border-2 border-medical-primary">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-medical-primary">Prescription Details</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 h-8"
                    onClick={() => setShowPrescription(!showPrescription)}
                  >
                    {showPrescription ? (
                      <>
                        <EyeOff size={16} />
                        <span className="text-xs">Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye size={16} />
                        <span className="text-xs">Show</span>
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Medication</p>
                    <p className="font-medium">Lisinopril 10mg Tablets</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p>30 tablets</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Directions</p>
                    <p>Take one tablet by mouth once daily</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Prescriber</p>
                    <p>Dr. Sarah Johnson, MD</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Rx Number</p>
                    <p>RX728901</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Date Prescribed</p>
                    <p>May 15, 2023</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Refills</p>
                    <p>3 refills remaining (valid until Nov 15, 2023)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              className="w-full bg-medical-primary hover:bg-medical-secondary"
              onClick={handleContinue}
            >
              Track Delivery
            </Button>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default PaymentPage;
