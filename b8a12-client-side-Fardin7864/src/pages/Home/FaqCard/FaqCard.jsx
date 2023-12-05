import { FaQuestionCircle } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const FaqCard = () => {
  return (
    <>
      <Tabs className=' my-16'>
        <TabList className=" grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Tab className=" active:bg-opacity-20 hover:bg-violet-100 card bg-base-100 shadow-xl py-4">
            <figure className="px-10 pt-10">
              <div className=" bg-[#850143] rounded-full w-16 h-16 rotate-45 my-3 absolute"></div>
              <FaQuestionCircle className=" text-4xl bg-[#850143] text-white rounded-full z-20" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-p font-bold">Generals</h2>
            </div>
          </Tab>
          <Tab className=" active:bg-opacity-20 hover:bg-violet-100 card bg-base-100 shadow-xl py-4">
            <figure className="px-10 pt-10">
              <div className=" bg-[#850143] rounded-full w-16 h-16 rotate-45 my-3 absolute"></div>
              <IoSettingsOutline className=" text-5xl text-white z-20" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-p font-bold">Services</h2>
            </div>
          </Tab>
          <Tab className=" active:bg-opacity-20 hover:bg-violet-100 card bg-base-100 shadow-xl py-4">
            <figure className="px-10 pt-10">
              <div className=" bg-[#850143] rounded-full w-16 h-16 rotate-45 my-3 absolute"></div>
              <MdOutlineSupportAgent className=" text-5xl text-white z-20" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-p font-bold">Support</h2>
            </div>
          </Tab>
          <Tab className=" active:bg-opacity-20 hover:bg-violet-100 card bg-base-100 shadow-xl py-4">
            <figure className="px-10 pt-10">
              <div className=" bg-[#850143] rounded-full w-16 h-16 rotate-45 my-3 absolute"></div>
              <FaUserDoctor className=" text-5xl rounded-full text-white z-20" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-p font-bold">Consultation</h2>
            </div>
          </Tab>
        </TabList>

        <TabPanel className=' px-10 lg:px-80'>
          <div className="collapse collapse-arrow shadow-lg mt-5 px-10">
            <input type="radio" name="my-accordion-2" checked="checked" />
            <div className="collapse-title text-xl font-medium">
            Q: Why is blood donation important?
            </div>
            <div className="collapse-content">
              <p>A: Blood donation is crucial because it saves lives. Donated blood is used in various medical treatments, surgeries, and emergencies. By donating, you contribute to the well-being of patients in need.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow shadow-lg mt-5 px-10">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
            Q: How often can I donate blood?
            </div>
            <div className="collapse-content">
              <p>A: In general, whole blood donation can be done every 8 weeks. However, specific guidelines may vary based on factors like your health, donation type, and local regulations. Check with your donation center for personalized information.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow shadow-lg mt-5 px-10">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
            Q: Are there any health benefits to blood donation?
            </div>
            <div className="collapse-content">
              <p>A: Yes, donating blood can have positive health effects, such as reducing the risk of certain illnesses and promoting cardiovascular health. It's essential to maintain a healthy lifestyle and consult with healthcare professionals for personalized advice.</p>
            </div>
          </div>
        </TabPanel>
        {/* Services */}
        <TabPanel className=' px-10 lg:px-80'>
          <div className="collapse collapse-arrow shadow-lg mt-5 px-10">
            <input type="radio" name="my-accordion-2" checked="checked" />
            <div className="collapse-title text-xl font-medium">
            Q: What types of blood donation services do you offer?
            </div>
            <div className="collapse-content">
              <p>A: Our blood donation services include whole blood donation, platelet donation, and plasma donation. Each service serves specific medical needs, and our staff can guide you on the best option based on your eligibility.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow shadow-lg mt-5 px-10">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
            Q: Can I schedule an appointment for blood donation online?
            </div>
            <div className="collapse-content">
              <p>A: Yes, you can conveniently schedule your blood donation appointment through our website. This helps us manage donor flow and ensures a smoother experience for you.</p>
            </div>
          </div>
        </TabPanel>
        <TabPanel className=' px-10 lg:px-80'>
          <div className="collapse collapse-arrow shadow-lg mt-5 lg:px-10">
            <input type="radio" name="my-accordion-2" checked="checked" />
            <div className="collapse-title text-xl font-medium">
            Q: Why is blood donation important?
            </div>
            <div className="collapse-content">
              <p>A: Blood donation is crucial because it saves lives. Donated blood is used in various medical treatments, surgeries, and emergencies. By donating, you contribute to the well-being of patients in need.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow shadow-lg mt-5 lg:px-10">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
            Q: How often can I donate blood?
            </div>
            <div className="collapse-content">
              <p>A: In general, whole blood donation can be done every 8 weeks. However, specific guidelines may vary based on factors like your health, donation type, and local regulations. Check with your donation center for personalized information.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow shadow-lg mt-5 lg:px-10">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
            Q: Are there any health benefits to blood donation?
            </div>
            <div className="collapse-content">
              <p>A: Yes, donating blood can have positive health effects, such as reducing the risk of certain illnesses and promoting cardiovascular health. It's essential to maintain a healthy lifestyle and consult with healthcare professionals for personalized advice.</p>
            </div>
          </div>
        </TabPanel>
        {/* Services */}
        <TabPanel className=' px-10 lg:px-80'>
          <div className="collapse collapse-arrow shadow-lg mt-5 lg:px-10">
            <input type="radio" name="my-accordion-2" checked="checked" />
            <div className="collapse-title text-xl font-medium">
            Q: What types of blood donation services do you offer?
            </div>
            <div className="collapse-content">
              <p>A: Our blood donation services include whole blood donation, platelet donation, and plasma donation. Each service serves specific medical needs, and our staff can guide you on the best option based on your eligibility.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow shadow-lg mt-5 lg:px-10">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
            Q: Can I schedule an appointment for blood donation online?
            </div>
            <div className="collapse-content">
              <p>A: Yes, you can conveniently schedule your blood donation appointment through our website. This helps us manage donor flow and ensures a smoother experience for you.</p>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default FaqCard;
