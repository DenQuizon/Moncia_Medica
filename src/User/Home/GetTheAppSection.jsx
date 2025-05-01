import React from "react";

const GetTheAppSection = () => {
  return (
    <section className="bg-[#a7dada] py-12 my-14">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 w-11/12 mx-auto">
        {/* Left Section: Instructions and App Icons */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">
            How to Get the App
          </h2>
          <p className="text-lg text-gray-600">
            Follow these simple steps to download and start using the app today.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center">
                1
              </span>
              <p className="text-gray-700 text-lg">
                Go to the <strong>App Store</strong> or{" "}
                <strong>Google Play</strong>.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center">
                2
              </span>
              <p className="text-gray-700 text-lg">
                Search for the <strong>App Name</strong> and click "Install."
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center">
                3
              </span>
              <p className="text-gray-700 text-lg">
                Open the app and start exploring!
              </p>
            </li>
          </ul>
          <div className="flex gap-6 justify-center lg:justify-start mt-8">
            {/* App Store and Play Store Icons */}
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://www.hatterasrealty.com/sites/default/files/uploads/apple-app-store-icon.png"
                alt="App Store"
                className="h-12"
              />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
                alt="Play Store"
                className="h-12"
              />
            </a>
          </div>
        </div>

        {/* Right Section: Video Embed */}
        <div className="lg:w-1/2">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/l53d3_zIcLs?si=A-NTMGfAAzN-Cxr_"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};
// comasdsad

export default GetTheAppSection;
