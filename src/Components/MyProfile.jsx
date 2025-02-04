import React, { useState } from "react";
import useAuth from "../Context/useAuth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase.init";

const MyProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user.displayName || "",
    email: user.email,
    photoURL: user.photoURL || "",
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProfileUpdate = async () => {
    if (!formData.name) {
      Swal.fire("Error", "Name cannot be empty!", "error");
      return;
    }

    let updatedPhotoURL = formData.photoURL;

    if (file) {
      setIsUploading(true);
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          setIsUploading(false);
          Swal.fire("Error", "Failed to upload profile picture", "error");
        },
        async () => {
          updatedPhotoURL = await getDownloadURL(uploadTask.snapshot.ref);
          setIsUploading(false);
          updateUserProfile(updatedPhotoURL);
        }
      );
    } else {
      updateUserProfile(updatedPhotoURL);
    }
  };

  const updateUserProfile = async (photoURL) => {
    try {
      await updateProfile(user, { displayName: formData.name, photoURL });
      await axios.put(
        `https://parcel-server-one.vercel.app/update-profile/${user.email}`,
        {
          name: formData.name,
          photoURL,
        }
      );

      Swal.fire("Success", "Profile updated successfully!", "success").then(
        () => {
          window.location.reload();
        }
      );
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-gray-900/80 backdrop-blur-lg shadow-xl border border-gray-700 rounded-lg">
      <h2 className="mb-6 text-3xl font-bold text-center text-teal-400">
        👤 My Profile
      </h2>
      <div className="flex flex-col items-center">
        <img
          src={formData.photoURL || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 border-2 border-teal-400 rounded-full shadow-lg"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-3 text-sm text-gray-300 cursor-pointer"
        />
        {isUploading && <p className="mt-1 text-blue-400">Uploading...</p>}
      </div>

      <div className="mt-4">
        <label className="block text-gray-300">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-teal-500 text-white"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-300">Email</label>
        <input
          type="email"
          value={formData.email}
          disabled
          className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed"
        />
      </div>

      <button
        onClick={handleProfileUpdate}
        className="w-full mt-6 p-3 text-white bg-teal-500 hover:bg-teal-600 rounded-lg font-bold transition"
      >
        🔄 Update Profile
      </button>
    </div>
  );
};

export default MyProfile;
