
import { ReactNode } from 'react';
import AppNavbar from './AppNavbar';
import EmergencySosButton from '../features/EmergencySosButton';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  const location = useLocation();
  const isScanner = location.pathname === '/scan';

  return (
    <div className="min-h-screen bg-background">
      {!isScanner && title && (
        <header className="bg-white dark:bg-card shadow-sm py-4 px-4">
          <h1 className="text-ada-large text-center text-medical-primary">{title}</h1>
        </header>
      )}
      <main className={cn(
        "pb-16", // Space for the navbar at bottom
        isScanner ? "p-0 h-screen" : "p-4"
      )}>
        {children}
      </main>
      <AppNavbar />
      <EmergencySosButton />
    </div>
  );
};

export default AppLayout;

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
