
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Pill, Map, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AppNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: 'Prescriptions',
      icon: <Pill size={24} />,
      path: '/'
    },
    {
      name: 'Track',
      icon: <Map size={24} />,
      path: '/track'
    },
    {
      name: 'Profile',
      icon: <User size={24} />,
      path: '/profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background dark:bg-card border-t border-border z-50 flex items-center justify-around px-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Button
            key={item.path}
            variant="ghost"
            size="lg"
            className={cn(
              "flex flex-col items-center justify-center gap-1 h-full w-full rounded-none",
              isActive && "text-medical-primary border-t-2 border-medical-primary"
            )}
            onClick={() => navigate(item.path)}
          >
            {React.cloneElement(item.icon, {
              className: cn("w-5 h-5", isActive ? "text-medical-primary" : "text-muted-foreground")
            })}
            <span className={cn("text-xs", isActive ? "text-medical-primary" : "text-muted-foreground")}>
              {item.name}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default AppNavbar;
