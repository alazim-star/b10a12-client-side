import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, NavLink } from "react-router-dom";

const Banner = () => {

    
    return (
        <div className=" bg-gradient-to-br from-white via-gray-50 to-gray-100 ">
            <Carousel 
                autoPlay
                infiniteLoop
                interval={5000} // Time between slides in milliseconds
                showThumbs={false} // Hides the thumbnails
                showStatus={false} // Hides the slide status
                showIndicators={true} // Shows the dots for navigation
            >
              {/* First Slide */}

<div className=" relative flex flex-col md:flex-row justify-center items-center  bg-gradient-to-br from-white via-gray-50 to-gray-100  gap-8 overflow-hidden container mx-auto ">
    {/* Text Content */}
    <div className="text-center md:text-left max-w-md z-10  ">
        <p className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Unlock Your Potential <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-400">
                Scholarships Await You!
            </span>
        </p>
        <p className="text-sm md:text-base text-gray-600 mb-6">
            Discover endless opportunities to grow and achieve your dreams with our tailored scholarships.
        </p>
       <NavLink to="/allScholarship">
       <button className="relative group inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg hover:shadow-xl hover:from-teal-500 hover:to-green-400 focus:ring-4 focus:ring-teal-200 transition-transform transform duration-300 ease-out">
            <span className="absolute inset-0 bg-white opacity-10 blur-lg rounded-lg group-hover:scale-110 transition-transform"></span>
            <span className="relative">Apply Now</span>
        </button>
       </NavLink>
    </div>

    {/* Image Content */}
    <div className="relative group">
        {/* Image */}
        <img
            className="w-full max-w-screen-xl  shadow-lg transform group-hover:scale-105 transition-transform duration-300"
            src="https://i.ibb.co/dBs35xf/shutterstock-183400235.png"
            alt="Scholarship"
        />

        {/* Glowing Star Offer Badge */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-white font-bold text-sm md:text-base px-4 py-2 rounded-full shadow-lg animate-bounce">
            ⭐ Special Scholarship Offer!
        </div>

        {/* Light Focus Effects */}
        <div className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-r from-teal-300 to-transparent opacity-50 blur-2xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-r from-green-300 to-transparent opacity-30 blur-3xl rounded-full"></div>
    </div>

    {/* Animated Background Lights */}
    <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-28 h-28 bg-gradient-to-br from-teal-400 to-green-300 opacity-40 blur-xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-20 h-20 bg-gradient-to-br from-green-400 to-teal-300 opacity-40 blur-lg rounded-full animate-bounce"></div>
    </div>
</div>



{/* Second Slide */}
<div className="container mx-auto relative flex flex-col md:flex-row justify-center items-center bg-gradient-to-r from-blue-50 via-white to-teal-50  gap-8 overflow-hidden">
    <div className="text-center md:text-left max-w-md z-10">
        <p className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Shape Your Future <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
                Apply for a Scholarship Today!
            </span>
        </p>
        <p className="text-sm md:text-base text-gray-600 mb-6">
            Take the first step toward a brighter tomorrow. Our scholarships are your gateway to success!
        </p>
       <NavLink to="/allScholarship">
       <button className="relative inline-flex items-center px-6 py-3 text-lg font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg hover:from-teal-600 hover:to-blue-600 focus:ring-4 focus:ring-blue-200">
            <span className="absolute inset-0 transition-transform transform scale-100 bg-white opacity-10 blur-md rounded-lg group-hover:scale-110"></span>
            <span className="relative">Apply Now</span>
        </button>
       </NavLink>
    </div>
    
    {/* Image Content */}
    <div className="relative group">
        <img
            className="w-full max-w-screen-xl  shadow-lg transform group-hover:scale-105 transition-transform duration-300"
            src="https://i.ibb.co/fXczpD1/Fully-funded-opportunity-for-students-with-Manaaki-Scholarship-in-New-Zealand.jpg"
            alt="Scholarship"
        />

        {/* Offer Badge in Front of Image */}
        <div className="absolute top-8 left-8 z-20 p-4 bg-gradient-to-r from-blue-400 to-teal-500 text-white font-semibold text-xl rounded-lg shadow-lg animate-pulse">
            <span>Limited Offer!</span>
        </div>

        {/* Decorative Animation */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-blue-300 to-teal-300 opacity-30 blur-2xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-r from-blue-300 to-indigo-300 opacity-20 blur-3xl rounded-full"></div>
    </div>

    {/* Animated Background Elements */}
    <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400 to-teal-400 opacity-30 blur-xl rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-gradient-to-r from-teal-300 to-blue-300 opacity-30 blur-lg rounded-full animate-spin-slow"></div>
    </div>
</div>

                


              {/* Third Slide */}
<div className="container mx-auto relative flex flex-col md:flex-row justify-center items-center bg-gradient-to-r from-green-50 to-blue-50  gap-8 overflow-hidden">
    <div className="text-center md:text-left max-w-md z-10">
        <p className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Dream Big, Achieve Bigger <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
                Get Your Scholarship Now!
            </span>
        </p>
        <p className="text-sm md:text-base text-gray-600 mb-6">
            Empower your dreams with the right opportunities. Take the first step toward achieving your goals with scholarships designed for you.
        </p>
        <NavLink to="/allScholarship">
        <button className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-green-400 to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <span className="flex items-center gap-2">
                    <i className="fas fa-graduation-cap"></i> Apply Now
                </span>
            </span>
        </button></NavLink>
    </div>
    <div className="relative group">
        <img
            className="w-full max-w-screen-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300"
            src="https://i.ibb.co/tYRTGcv/classmates-writing-learning-study-session-23-2149265745.jpg"
            alt="Scholarship"
        />
        {/* Decorative Gradients */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-green-400 to-teal-400 opacity-20 blur-2xl rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-3xl rounded-full"></div>
    </div>

    {/* Animated Shapes */}
    <div className="absolute inset-0 z-0">
        <div className="absolute top-16 left-1/3 w-20 h-20 bg-gradient-to-r from-teal-300 to-green-300 opacity-40 blur-xl rounded-full animate-ping"></div>
        <div className="absolute bottom-16 right-1/4 w-28 h-28 bg-gradient-to-r from-blue-300 to-indigo-300 opacity-40 blur-xl rounded-full animate-ping delay-200"></div>
    </div>
</div>

    {/* Fourth Slide */}
<div className="container mx-auto relative flex flex-col md:flex-row justify-center items-center bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-50  gap-8 overflow-hidden">
    <div className="text-center md:text-left max-w-md z-10">
        <p className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Your Future Starts Here <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                Apply for Scholarships Today!
            </span>
        </p>
        <p className="text-sm md:text-base text-gray-600 mb-6">
            Take the first step towards unlocking new opportunities. Explore scholarships designed for aspiring achievers like you.
        </p>
    <NavLink to='/allScholarship'>
    <button className="hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500 transition-all transform hover:scale-105 hover:shadow-lg p-4 rounded-lg bg-[#0ab99d] text-white font-semibold">
            Apply Now
        </button></NavLink>
    </div>
    <div className="relative group">
        <img
            className="w-full max-w-screen-xl  shadow-lg transform group-hover:scale-105 transition-transform duration-300"
            src="https://i.ibb.co/D9qXkRD/look-code.jpg"
            alt="Scholarship"
        />
        {/* Circular Decorative Overlay */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-30 blur-2xl rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-30 blur-2xl rounded-full transform translate-x-1/3 translate-y-1/3"></div>
    </div>

    {/* Floating Background Design */}
    <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-1/4 w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 opacity-40 blur-xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-28 h-28 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-40 blur-xl rounded-full animate-pulse delay-200"></div>
    </div>
</div>


            {/* Fifth Slide */}
<div className="container mx-auto flex flex-col md:flex-row justify-center items-center bg-gradient-to-r from-green-50 via-teal-100 to-green-50  gap-8 relative">
    <div className="text-center md:text-left max-w-md animate-slideIn">
        <p className="text-4xl md:text-5xl text-[#111827] font-extrabold leading-tight mb-4">
            The World Needs You <br />
            <span className="text-[#0ab99d]">Apply and Make a Difference!</span>
        </p>
        <p className="text-md text-gray-600 mb-6">
            Your actions today shape the world of tomorrow. Seize the opportunity to create a meaningful impact through education.
        </p>
       <NavLink t="/allScholarship">
       <button className="hover:bg-[#0ab99d] hover:scale-105 hover:shadow-lg transition-all p-4 rounded-lg border-b-4 border-[#0ab99d] bg-[#111827] text-white font-semibold">
            Apply Now
        </button></NavLink>
    </div>
    <div className="relative group">
        <img
            className="w-full max-w-screen-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300"
            src="https://i.ibb.co/yhbyVcM/group-young-students-front-school-building.jpg"
            alt="Scholarship"
        />
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 rounded-xl group-hover:opacity-10 transition-opacity duration-300"></div>
    </div>

    {/* Floating Decorative Elements */}
    <div className="absolute top-8 left-12 w-16 h-16 bg-yellow-300 rounded-full opacity-70 blur-xl animate-pulse"></div>
    <div className="absolute bottom-10 right-16 w-20 h-20 bg-blue-300 rounded-full opacity-70 blur-xl animate-pulse"></div>
</div>

                
                {/* Sixth Slide */}
<div className="container mx-auto flex flex-col md:flex-row justify-center items-center bg-gradient-to-r from-green-50 via-teal-100 to-green-50  gap-8 relative">
    <div className="text-center md:text-left max-w-md animate-slideIn">
        <p className="text-4xl md:text-5xl text-[#111827] font-extrabold leading-tight mb-4">
          Your Dream <br />
            <span className="text-[#0ab99d]">Our Follow Up!</span>
        </p>
        <p className="text-md text-gray-600 mb-6">
           We designed scholarships to pave the way for your academic and professional success.
        </p>
        <NavLink to='/allScholarship'>
        <button className="hover:bg-[#0ab99d] hover:scale-105 hover:shadow-lg transition-all p-4 rounded-lg border-b-4 border-[#0ab99d] bg-[#111827] text-white font-semibold">
            Apply Now
        </button></NavLink>
    </div>
    <div className="relative group">
        <img
            className="w-full max-w-screen-xl  shadow-lg transform group-hover:scale-105 transition-transform duration-300"
            src="https://i.ibb.co/9Z4nhgg/young-people-looking-victorious.jpg"
            alt="Scholarship"
        />
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl group-hover:bg-opacity-10 transition-all duration-300"></div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-60 blur-lg"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-300 rounded-full opacity-60 blur-lg"></div>
</div>

            </Carousel>
        </div>
    );
};

export default Banner;
