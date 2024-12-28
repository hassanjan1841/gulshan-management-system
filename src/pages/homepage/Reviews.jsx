import React from 'react';
import { motion } from 'framer-motion';

const Review = ({ name, review, rating }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-landing-background p-6 rounded-lg shadow-md"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-landing-button rounded-full flex items-center justify-center text-landing-background font-bold text-xl mr-4">
          {name[0]}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-landing-text">{name}</h3>
          <div className="flex">
            {[...Array(rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-landing-text-light">{review}</p>
    </motion.div>
  );
};

const Reviews = () => {
  const reviews = [
    { name: 'Alice Johnson', review: 'The courses are fantastic! I learned so much in such a short time.', rating: 5 },
    { name: 'Bob Smith', review: 'Great teachers and excellent support. Highly recommended!', rating: 4 },
    { name: 'Carol Williams', review: 'The platform is user-friendly and the content is top-notch.', rating: 5 },
  ];

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-landing-background-light to-landing-background-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-landing-text">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Review {...review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

