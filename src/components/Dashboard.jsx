import { useEffect, useState } from 'react';
import internData from '../data/internData.json';

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(internData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {data.name}</h1>
      <p className="mb-2">Referral Code: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{data.referralCode}</span></p>
      <p className="mb-6">Total Donations Raised: <span className="text-green-600 font-bold">₹{data.donationsRaised}</span></p>
      <div>
        <h2 className="text-xl font-semibold mb-2">Rewards / Unlockables</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded">Reward 1</div>
          <div className="p-4 border rounded">Reward 2</div>
          <div className="p-4 border rounded">Reward 3</div>
          <div className="p-4 border rounded">Reward 4</div>
        </div>
      </div>
    </div>
  );
}