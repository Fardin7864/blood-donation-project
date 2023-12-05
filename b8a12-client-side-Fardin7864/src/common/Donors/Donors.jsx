import { useEffect, useState } from "react";

const Donors = ({donor}) => {
    const [donoers,setDonoers] = useState();
    console.log(donor)
    useEffect(() => { 
        fetch('/donor.json')
        .then(res => res.json())
        .then(data => setDonoers(data.filter(person => person.blood_group?.toLowerCase() == donor.blood_group?.toLowerCase() && person.district?.toLowerCase() == donor.district?.toLowerCase() && person?.upazila.toLowerCase() == donor?.upazila?.toLowerCase() )))
     },[])
     console.log(donoers)
  return (
    <>
    {
        donoers ? (      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                donoers?.map((donor, index) =>
                <tr key={index}>
                <th>
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={donor.avatar}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{donor.name}</div>
                      <div className="text-sm opacity-50">{donor.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {donor.blood_group}
                </td>
                <td>{donor.district}, {donor.upazila}</td>
              </tr> )
            }
          </tbody>
        </table>
      </div>) : (<h3>Sorry no donor funded on this area!</h3>)
    }
    </>
  );
};

export default Donors;
