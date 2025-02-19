import { useState } from "react";
import { FaShareAlt, FaGift } from "react-icons/fa";

const ReferralCard = () => {
  const [referralCode] = useState("MEDISHOP123");

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied to clipboard!");
  };

  return (
    <div className="py-14 my-14 bg-cover bg-no-repeat bg-[url('https://img.freepik.com/free-photo/empty-drugstore-with-bottles-packages-full-with-medicaments-retail-shop-shelves-with-pharmaceutical-products-pharmacy-space-filled-with-medical-drugs-pills-vitamins-boxes_482257-62215.jpg?semt=ais_hybrid')] p-6 bg-white dark:bg-gray-800 border shadow-lg rounded-2xl text-center space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Refer & Earn Rewards!
      </h2>
      <p className="text-white dark:text-gray-300">
        Share your referral code with friends and earn discounts on your next
        purchase!
      </p>

      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
        <span className="font-semibold text-lg text-gray-800 dark:text-white">
          {referralCode}
        </span>
        <button
          onClick={handleCopy}
          className="ml-3 px-3 py-1 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
        >
          Copy
        </button>
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          <FaShareAlt /> Share Now
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4 text-gray-700 dark:text-gray-300">
        <FaGift className="text-3xl text-yellow-500" />
        <p className="text-lg font-medium">
          Get 10% off for every successful referral!
        </p>
      </div>
    </div>
  );
};

export default ReferralCard;
