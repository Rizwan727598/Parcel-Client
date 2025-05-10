import React, { useEffect, useState } from "react";
import useAuth from "../Context/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://parcel-server-one.vercel.app/my-reviews/${user.email}`)
        .then((res) => {
          // console.log(" Reviews Data:", res.data);
          setReviews(res.data);
        })
        .catch(() => Swal.fire("Error", "Failed to fetch reviews", "error"));
    }
  }, [user]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-center">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews available yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-4 bg-gray-100 border rounded-lg shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={review.userImage || "/default-avatar.png"}
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-lg font-semibold">{review.userName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex mt-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-${
                      index < review.rating ? "yellow" : "gray"
                    }-500`}
                  />
                ))}
              </div>
              <p className="mt-2 text-gray-700">{review.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
