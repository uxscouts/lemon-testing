import HomeIntro from '../components/HomeIntro.jsx';
import Specials from '../components/Specials.jsx';
import Reviews from '../components/Reviews.jsx';
import AboutUsMod from '../components/AboutUsMod.jsx';
import TestForm3 from '../components/TestForm3.jsx';


const Home = () => {
    return(
       <>
       <TestForm3/>
        <HomeIntro/>
         <Specials/>
          <Reviews/>
         <AboutUsMod/>
       </>
    )
}
export default Home;