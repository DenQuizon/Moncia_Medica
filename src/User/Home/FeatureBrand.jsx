import React from "react";
import img1 from "../../../public/aci.jpeg";
import img2 from "../../../public/square.jpeg";
import img3 from "../../../public/aristo.jpeg";
import img4 from "../../../public/renata.jpeg";
import img5 from "../../../public/incepta.png";
import img6 from "../../../public/beximco.png";

const FeatureBrand = () => {
  return (
    <div className="bg-white p-8 my-14">
      <h2 className="text-black text-2xl font-bold text-center mb-8">
        Our Trusted Brands
      </h2>

      <div className="overflow-hidden">
        <div className="flex space-x-8 animate-marquee">
          {/* Each image as a slide */}
          <img src={img1} alt="Brand 1" className="w-32 h-32 object-contain" />
          <img src={img2} alt="Brand 2" className="w-32 h-32 object-contain" />
          <img src={img3} alt="Brand 3" className="w-32 h-32 object-contain" />
          <img src={img4} alt="Brand 4" className="w-32 h-32 object-contain" />
          <img src={img5} alt="Brand 5" className="w-32 h-32 object-contain" />
          <img src={img6} alt="Brand 6" className="w-32 h-32 object-contain" />

          {/* Duplicate the images for seamless scrolling */}
          <img src={img1} alt="Brand 1" className="w-32 h-32 object-contain" />
          <img src={img2} alt="Brand 2" className="w-32 h-32 object-contain" />
          <img src={img3} alt="Brand 3" className="w-32 h-32 object-contain" />
          <img src={img4} alt="Brand 4" className="w-32 h-32 object-contain" />
          <img src={img5} alt="Brand 5" className="w-32 h-32 object-contain" />
          <img src={img6} alt="Brand 6" className="w-32 h-32 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default FeatureBrand;
