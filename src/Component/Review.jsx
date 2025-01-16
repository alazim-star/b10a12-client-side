import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import SectionTitle from '../Shard/SectionTitle';
import { RiDoubleQuotesL } from 'react-icons/ri';


const Review = () => {
const [reviews,setReviews]=useState([])
useEffect(()=>{
fetch('http://localhost:5000/reviews')
.then(res=>res.json())
.then(data=>setReviews(data))


},[])


    return (
        <div>
            <section className='my-20'>
                <SectionTitle subHeading='---What Our Clients Say---' heading="TESTIMONIALS" ></SectionTitle>


                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      
       
       {
        reviews.map(review=>  <SwiperSlide key={review._id} review={review}>
<div className='flex flex-col items-center my-16 mx-24 m-24'>

<RiDoubleQuotesL className='text-7xl' />
<Rating
      style={{ maxWidth: 180 }}
      value={review.rating}
      readOnly
    />
    <p className='py-10'>{review.review}</p>
    <h3 className='text-2xl text-orange-400 '>{review.name}</h3>
</div>




        </SwiperSlide>)
       }
      </Swiper>


            </section>
            
        </div>
    );
};

export default Review;