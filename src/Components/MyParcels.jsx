import React, { useEffect, useState } from "react";
import useAuth from "../Context/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const [parcels, setParcels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://parcel-server-one.vercel.app/my-parcels/${user.email}`)
      .then((res) => setParcels(res.data))
      .catch(() => Swal.fire("Error", "Failed to fetch parcels", "error"));
  }, [user]);

  // Handle Cancel Booking
  const handleCancel = async (id, status) => {
    if (status !== "pending") {
      Swal.fire("Error", "You can only cancel pending parcels!", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "Cancel this parcel?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `https://parcel-server-one.vercel.app/cancel-parcel/${id}`
        );

        setParcels((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "canceled" } : p))
        );

        Swal.fire("Canceled!", "Your parcel is now canceled.", "success");
      } catch (error) {
        Swal.fire("Error", "Could not cancel the parcel.", "error");
      }
    }
  };

  // Handle Update Redirect
  const handleUpdate = (id, status) => {
    if (status !== "pending") {
      Swal.fire("Error", "Only pending parcels can be updated!", "error");
      return;
    }
    navigate(`/dashboard/update-parcel/${id}`);
  };

  return (
    <div className="p-6 bg-gray-900/80 backdrop-blur-lg shadow-xl border border-gray-700 rounded-lg">
      <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">
        📦 My Parcels
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="py-3 px-4">Parcel Type</th>
              <th className="py-3 px-4">Requested Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="border-t border-gray-700">
                <td className="py-4 px-4">{parcel.parcelType}</td>
                <td className="py-4 px-4">
                  {new Date(parcel.requestedDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-lg font-semibold ${
                      parcel.status === "pending"
                        ? "bg-yellow-500 text-gray-900"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="py-4 px-4 flex space-x-2 justify-center">
                  <button
                    onClick={() => handleUpdate(parcel._id, parcel.status)}
                    disabled={parcel.status !== "pending"}
                    className={`px-4 py-2 rounded-lg font-bold transition ${
                      parcel.status === "pending"
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-500 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    ✏️ Update
                  </button>

                  <button
                    onClick={() => handleCancel(parcel._id, parcel.status)}
                    disabled={parcel.status !== "pending"}
                    className={`px-4 py-2 rounded-lg font-bold transition ${
                      parcel.status === "pending"
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-gray-500 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    ❌ Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
