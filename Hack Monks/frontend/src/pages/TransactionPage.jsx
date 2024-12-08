import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const TransactionPage = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [videoWatched, setVideoWatched] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoPlaylist = [
    { id: 'QC8iQqtG0hg', title: 'Rick Astley - Never Gonna Give You Up' },
    { id: '3JZ_D3ELwOQ', title: 'Dua Lipa - Don’t Start Now' },
    { id: 'oHg5SJYRHA0', title: 'Adele - Hello' },
  ];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(response.data);
      calculateBalance(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const calculateBalance = (transactions) => {
    const total = transactions.reduce((sum, t) => {
      return t.type === 'add' ? sum + t.amount : sum - t.amount;
    }, 0);
    setBalance(total);
  };

  const handleTransaction = async (type, amount, comment) => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', {
        type,
        amount,
        comment,
      });

      const updatedTransactions = [...transactions, response.data];
      setTransactions(updatedTransactions);
      calculateBalance(updatedTransactions);
    } catch (error) {
      console.error('Error handling transaction:', error);
    }
  };

  const handleVideoEnd = () => {
    if (!videoWatched) {
      setVideoWatched(true);
      handleTransaction('add', 10, 'watched video');
    }
  };

  const handlePurchase = (item, cost) => {
    if (balance >= cost) {
      handleTransaction('subtract', cost, `used in purchase of ${item}`);
    } else {
      alert('Not enough credits for this purchase.');
    }
  };

  const handleVideoChange = (videoId, index) => {
    setVideoWatched(false);
    setCurrentVideoIndex(index);
  };

  return (
    <div className="min-h-screen bg-transparent flex justify-center items-start pt-16">
      <div className="bg-gray-800 opacity-95 text-white p-6 rounded-xl shadow-lg w-full max-w-4xl space-y-6">
        {/* Wallet Section */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">Credits Wallet</h1>
          <div className="text-xl text-green-400 mb-4 text-center">Balance: {balance}</div>
          <div className="transactions border-t border-gray-500 pt-4">
            <h2 className="text-lg font-semibold mb-2">Transaction Log</h2>
            <ul className="space-y-1">
              {transactions.map((t, index) => (
                <li key={index} className="flex justify-between">
                  <span className={`font-medium ${t.type === 'add' ? 'text-green-400' : 'text-red-400'}`}>
                    {t.type === 'add' ? '+' : '-'}{t.amount}
                  </span>
                  <span className="italic text-gray-400">{t.comment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Recommended Video</h2>
          <YouTube
            videoId={videoPlaylist[currentVideoIndex].id}
            opts={{
              height: '360',
              width: '640',
              playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0,
                fs: 0,
                cc_load_policy: 0,
                iv_load_policy: 3,
              },
            }}
            onEnd={handleVideoEnd}
          />
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold mb-2">Select a Video</h3>
            <ul className="flex justify-center space-x-2">
              {videoPlaylist.map((video, index) => (
                <li key={index}>
                  <button
                    className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-2 rounded-md"
                    onClick={() => handleVideoChange(video.id, index)}
                  >
                    {video.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Shop Section */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Shop Dashboard</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="text-lg">Subscription Plan 1 - 7 Credits</span>
              <button
                className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={() => handlePurchase('subscription plan 1', 7)}
              >
                Buy
              </button>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-lg">Subscription Plan 2 - 10 Credits</span>
              <button
                className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={() => handlePurchase('subscription plan 2', 10)}
              >
                Buy
              </button>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-lg">Premium Item - 20 Credits</span>
              <button
                className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={() => handlePurchase('premium item', 20)}
              >
                Buy
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
