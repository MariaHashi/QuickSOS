import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

interface EditProfileProps {
  profile: MedicalProfile;
  onSave: (profile: MedicalProfile) => void;
  onCancel: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState<MedicalProfile>(profile);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field: 'allergies' | 'conditions', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="sm" onClick={onCancel}>← Cancel</Button>
          <Button variant="medical" size="sm" onClick={handleSave}>Save</Button>
        </div>
        <CardTitle className="text-2xl font-bold">Edit Medical Info</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
            placeholder="Enter age"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodType">Blood Type (Optional)</Label>
          <Input
            id="bloodType"
            value={formData.bloodType || ''}
            onChange={(e) => handleInputChange('bloodType', e.target.value)}
            placeholder="e.g., O+, A-, B+, AB-"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea
            id="allergies"
            value={formData.allergies.join(', ')}
            onChange={(e) => handleArrayChange('allergies', e.target.value)}
            placeholder="Enter allergies separated by commas"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="conditions">Medical Conditions</Label>
          <Textarea
            id="conditions"
            value={formData.conditions.join(', ')}
            onChange={(e) => handleArrayChange('conditions', e.target.value)}
            placeholder="Enter conditions separated by commas"
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Emergency Contact</h4>
          
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input
              id="contactName"
              value={formData.emergencyContact.name}
              onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
              placeholder="Enter contact name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Phone Number</Label>
            <Input
              id="contactPhone"
              value={formData.emergencyContact.phone}
              onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship</Label>
            <Input
              id="relationship"
              value={formData.emergencyContact.relationship}
              onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
              placeholder="e.g., Mother, Father, Spouse"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};