import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  icon, 
  label, 
  isActive, 
  className 
}) => {
  return (
    <div className={cn(
      "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
      isActive 
        ? "bg-medical/10 border-medical/20 text-medical" 
        : "bg-muted/50 border-border text-muted-foreground",
      className
    )}>
      <div className={cn(
        "flex-shrink-0",
        isActive ? "text-medical" : "text-muted-foreground"
      )}>
        {isActive ? <CheckCircle className="w-5 h-5" /> : icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
};