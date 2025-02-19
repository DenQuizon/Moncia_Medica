const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      comment: "Fast delivery & great service!",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Sarah Lee",
      comment: "Affordable prices & easy ordering!",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "David Kim",
      comment: "Quality medicines & trusted brand!",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <section className="my-14 py-10 bg-gray-100 dark:bg-gray-900 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6">
        🌟 What Our Customers Say
      </h2>
      <div className=" p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white  dark:bg-gray-800 p-4 rounded-lg shadow-md text-center"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold">{review.name}</h3>
            <p className="text-gray-600 italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
