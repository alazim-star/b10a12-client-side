

import Accordion from '../../Component/Accordion';
import Banner from '../../Component/Banner';
import GoldenStudent from '../../Component/GoldenStudent';
import LocationMap from '../../Component/LocationMap ';
import Review from '../../Component/Review';


import HomeScholarships from '../../ScholarShip/HomeScholarships';









const Home = () => {
    return (
        <div>
         
            <Banner></Banner>
          <LocationMap></LocationMap>
            <HomeScholarships></HomeScholarships>
            <Review></Review>
            <GoldenStudent></GoldenStudent>
            <Accordion></Accordion>

          

        </div>
    );
};

export default Home;