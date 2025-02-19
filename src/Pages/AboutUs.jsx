import React from 'react';

const AboutUs= () => {
  return (
    <div className="bg-custom1 text-white">
      {/* Hero Section */}
      <section className="relative  pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 clip-path-wave"></div>
        <div className="container mx-auto px-6 lg:px-20 py-20 lg:py-32 relative z-10 flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Grow Your <span className="text-[#8b154f]">Business</span> With Me
            </h1>
            <p className="text-gray-300 mb-6">
            I am a passionate front-end developer with a strong eye for design and a love for crafting user-friendly, responsive, and interactive web applications  to help your business thrive in a competitive market.
            </p>
            
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            <div className="relative">
              <div className="rounded-full overflow-hidden border-8 border-[#8b154f] shadow-lg">
                <img
                  src="https://i.ibb.co.com/SBgmRPg/Capture-JPGgf.jpg"
                  alt="Grow your business"
                  className="object-cover w-96 h-96"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white text-gray-900 py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Why Choose Me</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-custom1 p-4 rounded-full">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Strategy & Skilled</h3>
              <p className="text-gray-600">
              In modern frameworks like React.js, TailwindCSS, and DaisyUI, I specialize in transforming ideas into visually stunning and efficient digital experiences to keep you ahead.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-custom1 p-4 rounded-full">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 20l9-5-9-5-9 5 9 5z"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Design & Development</h3>
              <p className="text-gray-600">
              With a solid understanding of HTML, CSS, JavaScript, and front-end tools, I strive to bridge the gap between aesthetics and functionality.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-custom1 p-4 rounded-full">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 15.5l1.5-4.5 1.5 4.5h-3zm3 0l3.5-4.5 1.5 4.5h-5zm-6 0l-3.5-4.5 1.5 4.5h2z"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimizing Results</h3>
              <p className="text-gray-600">
              I thrive on challenges that push me to learn and innovate, ensuring each project not only meets but exceeds user expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
