import { Helmet } from "react-helmet";
import Payment from "../Payment/Payment";

const Funding = () => {
    return (
        <div>
            <Helmet>
                <title>Funding</title>
            </Helmet>
            <h3 className=" text-2xl font-bold text-center underline my-5">Give Fund For </h3>

            <Payment></Payment>
        </div>
    );
};

export default Funding;