import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "../../CUstomHooks/UseSecureAxios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const Banner = () => {
  const axiosSecure = UseSecureAxios();
  const { data: advertisements = [], refetch } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getadvertisement");
      return res.data;
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Featured Advertisements
      </h1>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={3000}
        showStatus={false}
        dynamicHeight={false}
      >
        {advertisements.map((ad) => (
          <div key={ad._id} className="relative w-full h-[65vh]">
            <img
              src={ad.image}
              alt={ad.description}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-[50%] left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
              <h3 className="text-lg font-semibold">{ad.medicineName}</h3>{" "}
              <br />
              <p className="text-sm">{ad.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
