import React from "react";
import { useParams } from "react-router-dom";

// Mock data — replace with real DB or API if needed
const mockProfiles: Record<string, any> = {
  emma123: {
    name: "Emma Johnson",
    bloodType: "O+",
    allergies: ["Penicillin"],
    conditions: ["Asthma"],
    emergencyContact: {
      name: "Mom",
      phone: "+60198815547",
    },
  },
};

const PublicProfile: React.FC = () => {
  const { userId } = useParams();
  const profile = mockProfiles[userId || ""];

  if (!profile) {
    return <div className="p-6 text-center">❌ Profile not found</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold text-center">Medical Profile</h2>
      <div className="space-y-2 text-sm">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Blood Type:</strong> {profile.bloodType}</p>
        <p><strong>Allergies:</strong> {profile.allergies.join(", ")}</p>
        <p><strong>Conditions:</strong> {profile.conditions.join(", ")}</p>
        <p><strong>Emergency Contact:</strong></p>
        <ul className="ml-4 list-disc">
          <li>{profile.emergencyContact.name}</li>
          <li>{profile.emergencyContact.phone}</li>
        </ul>
      </div>
    </div>
  );
};

export default PublicProfile;
