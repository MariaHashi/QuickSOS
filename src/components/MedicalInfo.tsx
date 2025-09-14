import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MedicalProfile {
  name: string;
  age: number;
  bloodType?: string;
  allergies: string[];
  conditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  avatar?: string;
}

interface MedicalInfoProps {
  profile: MedicalProfile;
  onEdit: () => void;
  onBack: () => void;
}

export const MedicalInfo: React.FC<MedicalInfoProps> = ({ profile, onEdit, onBack }) => {
  const navigate = useNavigate();

  const handleShare = () => {
    navigate('/share-profile');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>← Back</Button>
          <Button variant="outline" size="sm" onClick={handleShare}>Share</Button>
        </div>
        <CardTitle className="text-2xl font-bold mb-4">Medical Info</CardTitle>

        <div className="flex justify-center space-x-4 mb-6">
          <Button variant="outline" className="flex-1">View</Button>
          <Button variant="medical" className="flex-1" onClick={onEdit}>Edit</Button>
        </div>

        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-lg font-semibold">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-muted-foreground">Age {profile.age}</p>
            {profile.bloodType && (
              <Badge variant="outline" className="mt-1">
                {profile.bloodType}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {profile.allergies.length > 0 && (
          <div>
            <h4 className="font-semibold text-lg mb-2">Allergies</h4>
            <div className="space-y-1">
              {profile.allergies.map((allergy, index) => (
                <p key={index} className="text-muted-foreground">{allergy}</p>
              ))}
            </div>
          </div>
        )}

        {profile.conditions.length > 0 && (
          <div>
            <h4 className="font-semibold text-lg mb-2">Conditions</h4>
            <div className="space-y-1">
              {profile.conditions.map((condition, index) => (
                <p key={index} className="text-muted-foreground">{condition}</p>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-lg mb-2">Emergency Contact</h4>
          <div className="space-y-1">
            <p className="font-medium">{profile.emergencyContact.name}</p>
            <p className="text-muted-foreground">{profile.emergencyContact.phone}</p>
            <p className="text-sm text-muted-foreground capitalize">
              {profile.emergencyContact.relationship}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
