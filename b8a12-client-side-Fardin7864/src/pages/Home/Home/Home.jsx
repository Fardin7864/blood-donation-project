import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import SectionTitle from "../../../common/SectionTitle/SectionTitle";
import About from "../AboutSection/About";
import Campaign from "../Campaign/Campaign";
import FaqCard from "../FaqCard/FaqCard";
import Testimonial from "../Testimonial/Testimonial";
import Contact from "../ContactForm/Contact";
import Numberbanner from "../NumberBanner/Numberbanner";

const Home = () => {
    return (
        <>
        <Helmet>
            <title>Blood || Home</title>
        </Helmet>
            <Banner/>
            <SectionTitle line={true} title="Featured" description="Our featured Services"/>
            <Featured/>
            <About/>
            <Campaign/>
            <SectionTitle line={false} title="Frequently asked questions." description="Discover everything you need to know about blood donation with our comprehensive FAQ guide. "/>
            <FaqCard/>
            <Testimonial/>
            <Numberbanner/>
            <Contact/>
        </>
    );
};

export default Home;