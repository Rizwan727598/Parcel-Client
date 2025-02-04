import React, { useEffect, useState } from "react";
import useAuth from "../Context/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const { user } = useAuth();
  const [parcels, setParcels] = useState([]);
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8000/my-deliveries/${user.email}`)
        .then((res) => {
          // console.log("API Response - Assigned Deliveries:", res.data);
          setParcels(res.data);
        })
        .catch((err) => {
          console.error("❌ Error Fetching Assigned Deliveries:", err);
          Swal.fire("Error", "Failed to fetch assigned parcels", "error");
        });
    }
  }, [user]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">My Assigned Deliveries</h2>
      {parcels.length === 0 ? (
        <p>No deliveries assigned yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th>User</th>
              <th>Receiver</th>
              <th>Phone</th>
              <th>Requested Date</th>
              <th>Approx. Date</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="border-t">
                <td>{parcel.userName}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverPhone}</td>
                <td>{new Date(parcel.requestedDate).toLocaleDateString()}</td>
                <td>
                  {new Date(
                    parcel.approximateDeliveryDate
                  ).toLocaleDateString()}
                </td>
                <td>{parcel.receiverAddress}</td>
                <td className="flex space-x-2">
                  <button className="text-white bg-blue-500 btn">
                    View Location
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyDeliveryList;
