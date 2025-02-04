import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateParcel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState(null);
  const [formData, setFormData] = useState({
    parcelType: "",
    weight: "",
    receiverName: "",
    receiverPhone: "",
    address: "",
    latitude: "",
    longitude: "",
    requestedDate: "",
  });

  useEffect(() => {
    axios
      .get(`https://parcel-server-one.vercel.app/parcel/${id}`)
      .then((res) => {
        setParcel(res.data);
        setFormData(res.data);
      })
      .catch(() => Swal.fire("Error", "Failed to load parcel data", "error"));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://parcel-server-one.vercel.app/update-parcel/${id}`,
        formData
      );
      Swal.fire("Success", "Parcel updated successfully!", "success");
      navigate("/dashboard/my-parcels");
    } catch (error) {
      Swal.fire("Error", "Failed to update parcel", "error");
    }
  };

  if (!parcel) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Update Parcel</h2>
      <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="parcelType"
          value={formData.parcelType}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="receiverName"
          value={formData.receiverName}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="receiverPhone"
          value={formData.receiverPhone}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="date"
          name="requestedDate"
          value={formData.requestedDate}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          required
          className="input"
        />
        <button type="submit" className="col-span-2 text-white bg-blue-600 btn">
          Update Parcel
        </button>
      </form>
    </div>
  );
};

export default UpdateParcel;
