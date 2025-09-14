import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Users, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmergencyContact {
  name: string;
  avatar?: string;
  status: 'delivered' | 'pending' | 'failed';
}

interface EmergencyActivatedProps {
  location: string;
  contacts: EmergencyContact[];
}

export const EmergencyActivated: React.FC<EmergencyActivatedProps> = ({ location, contacts }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-medical';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'pending': return 'Pending';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Unified Back Button */}
      <div className="flex justify-between items-center px-2 pt-2">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-foreground flex items-center"
        >
          ← Back
        </button>
      </div>

      {/* Emergency Header */}
      <div className="bg-medical text-white p-4 rounded-t-lg text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <CheckCircle className="w-6 h-6" />
          <h2 className="text-xl font-bold">Emergency Activated</h2>
        </div>
      </div>

      {/* Location Card */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-info/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8 text-info" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Live location shared</h3>
            <p className="text-muted-foreground text-sm">{location}</p>
          </div>

          {/* Status Icons */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-medical/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-6 h-6 text-medical" />
              </div>
              <p className="text-xs font-medium">Location Shared</p>
              <CheckCircle className="w-4 h-4 text-medical mx-auto mt-1" />
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-info/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-info" />
              </div>
              <p className="text-xs font-medium">Emergency Contacts Notified</p>
              <CheckCircle className="w-4 h-4 text-medical mx-auto mt-1" />
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-medical/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Send className="w-6 h-6 text-medical" />
              </div>
              <p className="text-xs font-medium">Offline SOS Sent</p>
              <CheckCircle className="w-4 h-4 text-medical mx-auto mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Status */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="text-sm">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{contact.name}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={getStatusColor(contact.status)}
                >
                  {getStatusText(contact.status)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};