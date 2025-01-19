

import Accordion from '../../Component/Accordion';
import Banner from '../../Component/Banner';
import Review from '../../Component/Review';


import HomeScholarships from '../../ScholarShip/HomeScholarships';









const Home = () => {
    return (
        <div>
         
            <Banner></Banner>
          
            <HomeScholarships></HomeScholarships>
            <Review></Review>
            <Accordion></Accordion>

          

        </div>
    );
};

export default Home;