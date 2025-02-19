import React from 'react';
import moment from 'moment';

const Prograss = () => {
    return ( 

    <div className='bg-gradient-to-r from-blue-500 to-teal-500'>
        <div className='container mx-auto lg:flex md:flex  items-center justify-center lg:gap-20 md:gap-5 '>
            <h3 className='animate__animated animate__backInUp text-white mt-10 mb-10 text-5xl ml-10 font-extrabold cursor-pointer'>The Best Way To <br /> <span className='text-[#111827]'>Get Higher Studies</span></h3>
            <div className="stats stats-vertical shadow lg:w-96 md:w-full w-80  mb-20 md:ml-5 text-center lg:mt-10">
  <div className="stat ">
    <div className="stat-title">Our User</div>
    <div className="stat-value">90k</div>
    <div className="stat-desc">
    <p className='text-center'>Jan 1st 21 to</p>
         <p className='text-center'>{moment().format("MMM Do YY")}</p>
         </div>
  </div>

  <div className="stat">
    <div className="stat-title">Total Application </div>
    <div className="stat-value">50k</div>
    <div className="stat-desc">Read (92%)</div>
  </div>

  <div className="stat">
    <div className="stat-title">Total Scholarship</div>
    <div className="stat-value">700k</div>
    <div className="stat-desc">↘︎ Publish (75%)</div>
  </div>
  <div className="stat">
    <div className="stat-title">Our Follower</div>
    <div className="stat-value">1,900M</div>
    <div className="stat-desc">↘︎ Total view (95%)</div>
  </div>
</div>




<div className="carousel carousel-vertical rounded-box h-96 ">
  <div className="carousel-item h-full">
    <img className='w-full' src="https://i.ibb.co.com/pByS1vYZ/Belk-And-Charles-Senior-Scholars2019-04.jpg" />
  </div>
  <div className="carousel-item h-full">
    <img  className='w-full' src="https://i.ibb.co.com/ZRBr6F27/hugging-happy-graduate-scholarship.jpg" />
  </div>
  <div className="carousel-item h-full">
    <img  className='w-full' src="https://i.ibb.co.com/TDvvQf4T/2015-SRNS-Family-Scholarships-35559759033.jpg" />
  </div>
  <div className="carousel-item h-full">
    <img  className='w-full' src="https://i.ibb.co.com/JjbJNRVX/2571987.jpg" />
  </div>
  <div className="carousel-item h-full">
    <img  className='w-full' src="https://i.ibb.co.com/fY590N1Z/atc-scholarship-2024-banner1600.jpg" />
  </div>
  <div className="carousel-item h-full">
    <img  className='w-full' src="https://i.ibb.co.com/RCff9pf/premium-photo-1661440102417-fe9ea01d0518.jpg" />
  </div>
  <div className="carousel-item h-full">
    <img  className='w-full' src="https://i.ibb.co.com/PvNv9bDm/scholarships-w-cap-gown-1.png" />
  </div>
</div>





        </div>
        </div>
    );
};

export default Prograss;