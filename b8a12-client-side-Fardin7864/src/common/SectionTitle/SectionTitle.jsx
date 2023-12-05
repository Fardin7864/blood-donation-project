
const SectionTitle = ({title, description,line}) => {
    return (
        <div className=" flex flex-col justify-center items-center my-10 text-center">
            <div className=" lg:w-1/2 flex flex-col justify-center items-center">
            <h2 className=" text-p text-4xl font-semibold mb-2">{title}</h2>
            <p className=" text-gray-500 mb-2 w-9/12">{description}</p>
            {line === true && <div className=" w-full border-2 rounded-full border-blue-950"></div>}
            </div>
        </div>
    );
};

export default SectionTitle;