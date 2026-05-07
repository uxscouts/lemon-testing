import HomeIntro from '../components/HomeIntro.jsx';
import Specials from '../components/Specials.jsx';
import Reviews from '../components/Reviews.jsx';
import AboutUsMod from '../components/AboutUsMod.jsx';
import SimpleNewsletter from '../components/SimpleNewsletter.jsx';


const Home = () => {
    return(
       <>
       <SimpleNewsletter/>
        <HomeIntro/>
         <Specials/>
          <Reviews/>
         <AboutUsMod/>
       </>
    )
}
export default Home;