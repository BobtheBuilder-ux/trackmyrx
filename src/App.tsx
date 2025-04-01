
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import QrScannerPage from "./pages/QrScannerPage";
import PharmacySelectionPage from "./pages/PharmacySelectionPage";
import PaymentPage from "./pages/PaymentPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import DeliveryVerificationPage from "./pages/DeliveryVerificationPage";
import ProfilePage from "./pages/ProfilePage";
import ReportIssuePage from "./pages/ReportIssuePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrescriptionsPage />} />
          <Route path="/scan" element={<QrScannerPage />} />
          <Route path="/pharmacy" element={<PharmacySelectionPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/track" element={<TrackOrderPage />} />
          <Route path="/delivery-verification" element={<DeliveryVerificationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/report-issue" element={<ReportIssuePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
