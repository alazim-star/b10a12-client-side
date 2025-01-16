import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div>
            <Carousel>
                {/* First Slide */}
                <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 p-10 gap-8">
                    <div className="text-center md:text-left max-w-md">
                        <p className="text-4xl md:text-5xl text-[#111827] font-bold leading-tight mb-6">
                            Unlock Your Potential <br />
                            <span className="text-[#0ab99d]">Scholarships Await You!</span>
                        </p>
                        <button className="hover:bg-[#111827] hover:text-yellow-400 transition-colors p-3 rounded-xl border-b-4 border-yellow-400 bg-[#0ab99d] text-white font-semibold">
                            Apply Now
                        </button>
                    </div>
                    <div>
                        <img
                            className="w-full max-w-lg rounded-xl shadow-lg"
                            src="https://i.ibb.co/dBs35xf/shutterstock-183400235.png"
                            alt="Scholarship"
                        />
                    </div>
                </div>

                {/* Second Slide */}
                <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 p-10 gap-8">
                    <div className="text-center md:text-left max-w-md">
                        <p className="text-4xl md:text-5xl text-[#111827] font-bold leading-tight mb-6">
                            Shape Your Future <br />
                            <span className="text-[#0ab99d]">Apply for a Scholarship Today!</span>
                        </p>
                        <button className="hover:bg-[#111827] hover:text-yellow-400 transition-colors p-3 rounded-xl border-b-4 border-yellow-400 bg-[#0ab99d] text-white font-semibold">
                            Apply Now
                        </button>
                    </div>
                    <div>
                        <img
                            className="w-full max-w-lg rounded-xl shadow-lg"
                            src="https://i.ibb.co/fXczpD1/Fully-funded-opportunity-for-students-with-Manaaki-Scholarship-in-New-Zealand.jpg"
                            alt="Scholarship"
                        />
                    </div>
                </div>

                {/* Third Slide */}
                <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 p-10 gap-8">
                    <div className="text-center md:text-left max-w-md">
                        <p className="text-4xl md:text-5xl text-[#111827] font-bold leading-tight mb-6">
                            Dream Big, Achieve Bigger <br />
                            <span className="text-[#0ab99d]">Get Your Scholarship Now!</span>
                        </p>
                        <button className="hover:bg-[#111827] hover:text-yellow-400 transition-colors p-3 rounded-xl border-b-4 border-yellow-400 bg-[#0ab99d] text-white font-semibold">
                            Apply Now
                        </button>
                    </div>
                    <div>
                        <img
                            className="w-full max-w-lg rounded-xl shadow-lg"
                            src="https://i.ibb.co/tYRTGcv/classmates-writing-learning-study-session-23-2149265745.jpg"
                            alt="Scholarship"
                        />
                    </div>
                </div>

                {/* Fourth Slide */}
                <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 p-10 gap-8">
                    <div className="text-center md:text-left max-w-md">
                        <p className="text-4xl md:text-5xl text-[#111827] font-bold leading-tight mb-6">
                            Your Future Starts Here <br />
                            <span className="text-[#0ab99d]">Apply for Scholarships Today!</span>
                        </p>
                        <button className="hover:bg-[#111827] hover:text-yellow-400 transition-colors p-3 rounded-xl border-b-4 border-yellow-400 bg-[#0ab99d] text-white font-semibold">
                            Apply Now
                        </button>
                    </div>
                    <div>
                        <img
                            className="w-full max-w-lg rounded-xl shadow-lg"
                            src="https://i.ibb.co/D9qXkRD/look-code.jpg"
                            alt="Scholarship"
                        />
                    </div>
                </div>

                {/* Fifth Slide */}
                <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 p-10 gap-8">
                    <div className="text-center md:text-left max-w-md">
                        <p className="text-4xl md:text-5xl text-[#111827] font-bold leading-tight mb-6">
                            The World Needs You <br />
                            <span className="text-[#0ab99d]">Apply and Make a Difference!</span>
                        </p>
                        <button className="hover:bg-[#111827] hover:text-yellow-400 transition-colors p-3 rounded-xl border-b-4 border-yellow-400 bg-[#0ab99d] text-white font-semibold">
                            Apply Now
                        </button>
                    </div>
                    <div>
                        <img
                            className="w-full max-w-lg rounded-xl shadow-lg"
                            src="https://i.ibb.co/yhbyVcM/group-young-students-front-school-building.jpg"
                            alt="Scholarship"
                        />
                    </div>
                </div>

                {/* Sixth Slide */}
                <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 p-10 gap-8">
                    <div className="text-center md:text-left max-w-md">
                        <p className="text-4xl md:text-5xl text-[#111827] font-bold leading-tight mb-6">
                            Invest in Your Education <br />
                            <span className="text-[#0ab99d]">Apply for Scholarships and Grow!</span>
                        </p>
                        <button className="hover:bg-[#111827] hover:text-yellow-400 transition-colors p-3 rounded-xl border-b-4 border-yellow-400 bg-[#0ab99d] text-white font-semibold">
                            Apply Now
                        </button>
                    </div>
                    <div>
                        <img
                            className="w-full max-w-lg rounded-xl shadow-lg"
                            src="https://i.ibb.co/9Z4nhgg/young-people-looking-victorious.jpg"
                            alt="Scholarship"
                        />
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
