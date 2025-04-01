
import AppLayout from '@/components/layout/AppLayout';
import OrderTrackingMap from '@/components/features/OrderTrackingMap';

const TrackOrderPage = () => {
  return (
    <AppLayout title="Track Delivery">
      <div className="max-w-md mx-auto">
        <OrderTrackingMap />
      </div>
    </AppLayout>
  );
};

export default TrackOrderPage;
