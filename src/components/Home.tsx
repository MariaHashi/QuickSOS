import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#001935] text-white flex flex-col justify-center items-center px-4">
      <div className="flex flex-col items-center space-y-6">
        <button
          onClick={() => navigate('/sos-hold')}
          className="bg-red-600 w-32 h-32 rounded-full text-white text-2xl font-bold shadow-lg focus:outline-none"
        >
          SOS
        </button>

        <h1 className="text-3xl font-semibold">QuickSOS</h1>
        <p className="text-sm">HELP IN ONE TAP</p>

        <div className="flex items-center space-x-2 mt-10">
          <img src="/sosband-icon.png" alt="band icon" className="w-5 h-5" />
          <p className="text-white text-sm">Linked to SOSBand</p>
        </div>

       
      </div>
    </div>
  );
};

export default Home;