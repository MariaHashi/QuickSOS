import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SOSButton } from "@/components/SOSButton";
import { StatusIndicator } from "@/components/StatusIndicator";
import { MedicalInfo } from "@/components/MedicalInfo";
import { EditProfile } from "@/components/EditProfile";
import EmergencyContacts from "@/components/EmergencyContacts";
import { EmergencyActivated } from "@/components/EmergencyActivated";
import { Mic, MicOff, Wifi, WifiOff, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockProfile = {
  name: "Emma Johnson",
  age: 15,
  bloodType: "O+",
  allergies: ["Amoxicillin", "Penicillin"],
  conditions: ["Asthma", "Celiac Disease"],
  emergencyContact: {
    name: "Mom",
    phone: "+44 20 7946 0XXX",
    relationship: "mother"
  },
  avatar: "/avatar.png"
};

const mockEmergencyContacts = [
  {
    id: "1",
    name: "Mom",
    phone: "+44 20 7946 0XXX",
    relationship: "mother",
    avatar: "/avatar.png",
    isPrimary: true
  },
  {
    id: "2", 
    name: "Local Clinic",
    phone: "+44 20 7946 1XXX",
    relationship: "medical",
    avatar: "/avatar.png"
  },
  {
    id: "3",
    name: "Dad",
    phone: "+44 20 7946 2XXX", 
    relationship: "father",
    avatar: "/avatar.png"
  }
];

type AppView = 'dashboard' | 'medical' | 'emergency' | 'edit' | 'contacts';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isAudioRecording, setIsAudioRecording] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(true);
  const [profile, setProfile] = useState(mockProfile);
  const [emergencyContacts, setEmergencyContacts] = useState(mockEmergencyContacts);
  const { toast } = useToast();

  const handleSOSActivate = () => {
    const mockActivatedContacts = emergencyContacts.map(contact => ({
      name: contact.name,
      avatar: contact.avatar,
      status: Math.random() > 0.5 ? 'delivered' as const : 'pending' as const
    }));
    setCurrentView('emergency');
    toast({
      title: "Emergency Activated",
      description: "Help is on the way. Stay calm.",
      duration: 5000,
    });
  };

  const handleMedicalInfo = () => {
    setCurrentView('medical');
  };

  const handleEmergencyContacts = () => {
    setCurrentView('contacts');
  };

  const handleEditProfile = () => {
    setCurrentView('edit');
  };

  const handleSaveProfile = (updatedProfile: typeof mockProfile) => {
    setProfile(updatedProfile);
    setCurrentView('medical');
    toast({
      title: "Profile Updated",
      description: "Your medical information has been saved.",
    });
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleBackToMedical = () => {
    setCurrentView('medical');
  };

  const handleShareProfile = () => {
    toast({
      title: "Profile Shared",
      description: "Medical profile shared via QR code",
    });
  };

  const handleEditContact = (contact: any) => {
    toast({
      title: "Edit Contact",
      description: "Contact editing feature coming soon",
    });
  };

  const handleAddContact = () => {
    toast({
      title: "Add Contact",
      description: "Add contact feature coming soon",
    });
  };

  const handleDeleteContact = (contactId: string) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== contactId));
    toast({
      title: "Contact Deleted",
      description: "Emergency contact has been removed",
    });
  };

  const handleCallContact = (phone: string) => {
    toast({
      title: "Calling...",
      description: `Calling ${phone}`,
    });
  };

  if (currentView === 'edit') {
    return (
      <div className="min-h-screen bg-background p-4">
        <EditProfile 
          profile={profile}
          onSave={handleSaveProfile}
          onCancel={handleBackToMedical}
        />
      </div>
    );
  }

  if (currentView === 'contacts') {
    return (
      <div className="min-h-screen bg-background p-4">
        <EmergencyContacts 
          contacts={emergencyContacts}
          onBack={handleBackToDashboard}
          onEdit={handleEditContact}
          onAdd={handleAddContact}
          onDelete={handleDeleteContact}
          onCall={handleCallContact}
        />
      </div>
    );
  }

  if (currentView === 'medical') {
    return (
      <div className="min-h-screen bg-background p-4">
        <MedicalInfo 
          profile={profile}
          onEdit={handleEditProfile}
          onShare={handleShareProfile}
          onBack={handleBackToDashboard}
        />
      </div>
    );
  }

  if (currentView === 'emergency') {
    const mockActivatedContacts = emergencyContacts.map(contact => ({
      name: contact.name,
      avatar: contact.avatar,
      status: Math.random() > 0.5 ? 'delivered' as const : 'pending' as const
    }));
    
    return (
      <div className="min-h-screen bg-background p-4 pt-8">
        <EmergencyActivated 
          location="Live location shared"
          contacts={mockActivatedContacts}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        </div>

        {/* SOS Button */}
        <div className="flex justify-center py-8">
          <SOSButton onActivate={handleSOSActivate} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="info" 
            size="xl" 
            className="h-20 flex-col space-y-2"
            onClick={handleMedicalInfo}
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Medical Info</span>
          </Button>
          
          <Button 
            variant="medical" 
            size="xl" 
            className="h-20 flex-col space-y-2"
            onClick={handleEmergencyContacts}
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Emergency Contacts</span>
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="space-y-3">
          <StatusIndicator 
            icon={isAudioRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            label="Auto Audio Recording"
            isActive={isAudioRecording}
          />
          
          <StatusIndicator 
            icon={isOfflineMode ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            label="Offline Mode Active"
            isActive={isOfflineMode}
          />
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            QuickSOS • Help is a tap away
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;