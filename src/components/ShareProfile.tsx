import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const ShareProfile: React.FC = () => {
  const navigate = useNavigate();
  const userId = 'emma123';

  // Build and clean the profile link
  const profileLink = `${window.location.origin}/profile/${encodeURIComponent(userId)}`.replace(/\s+/g, '');

  // Use the public folder QR with cache buster
  const qrSrc = '/qr-small.png?v=2';

  return (
    <div className="min-h-screen bg-white px-4 py-6 flex flex-col items-center space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start text-sm text-foreground ml-1"
      >
        ← Back
      </button>

      {/* QR Code section */}
      <div className="flex flex-col items-center space-y-4">
        <img
          src={qrSrc}
          alt="QR Code"
          className="w-52 h-52"
        />
        <p className="text-xs text-muted-foreground break-all px-2">
          {profileLink}
        </p>

        {/* Success indicator */}
        <div className="flex items-center text-green-600">
          <CheckCircle className="w-5 h-5 mr-1" />
          <span className="font-medium text-lg">Scan Success</span>
        </div>
        <p className="text-md text-black font-medium">Medical Profile Unlocked</p>
      </div>

      {/* Profile card with static avatar and emergency contact */}
      <Card className="w-full max-w-sm text-left">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src="/avatar.png"
              alt="Patient Avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">Emma Johnson</h3>
              <p className="text-sm text-muted-foreground">Patient ID: {userId}</p>
            </div>
          </div>
          {/* …other medical profile details… */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareProfile;
