import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios/useAxios";
import useAuth from "../../../hooks/useAuth/useAuth";
import SerctionTitle from "../../../common/SectionTitle/SerctionTitle";

const PaymentHistory = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  console.log(user.email);
  const { data: paymentHistory } = useQuery({
    queryKey: ["paymentsHis", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res;
    },
  });

  // console.log(paymentHistory?.data)

  return (
    <div>
      <SerctionTitle
        subTitle="You paid"
        title="Payment History"
      ></SerctionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>TransectionId</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {paymentHistory?.data?.map((pay, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{pay.name}</td>
                <td>{pay.transectionId}</td>
                <td>${pay.price}</td>
                <td>{pay.status}</td>
                <td>{pay.date?.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
