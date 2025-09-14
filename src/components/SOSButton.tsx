import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SOSButtonProps {
  onActivate: () => void;
  className?: string;
}

export const SOSButton: React.FC<SOSButtonProps> = ({ onActivate, className }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isActivating, setIsActivating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPressed && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsActivating(true);
            onActivate();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPressed, countdown, onActivate]);

  const handleMouseDown = () => {
    setIsPressed(true);
    setCountdown(3);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setCountdown(0);
    setIsActivating(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
    setCountdown(0);
    setIsActivating(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        variant="sos"
        size="sos"
        className={cn(
          "relative select-none",
          isPressed && "animate-sos-activate",
          isActivating && "animate-pulse-emergency",
          className
        )}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {countdown > 0 ? countdown : "SOS"}
        {isPressed && (
          <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
        )}
      </Button>
      
      <p className="text-center text-muted-foreground font-medium">
        {isPressed 
          ? `Releasing in ${countdown}s` 
          : "Hold 3 sec to activate"
        }
      </p>
    </div>
  );
};