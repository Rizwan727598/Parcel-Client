import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const Statistics = () => {
  const [chartData, setChartData] = useState({
    bookingsByDate: { categories: [], data: [] },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/stats")
      .then((res) => {
        console.log("API Response:", res.data); // Debugging API response

        setChartData({
          bookingsByDate: {
            categories: ["Total Parcels", "Delivered Parcels", "Users"],
            data: [
              res.data.booked || 0,
              res.data.delivered || 0,
              res.data.users || 0,
            ],
          },
        });
      })
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-900/80 backdrop-blur-lg shadow-xl border border-gray-700 rounded-lg">
      <h2 className="mb-6 text-3xl font-bold text-center text-teal-400">
        📊 Booking Statistics
      </h2>

      {/* Bar Chart: Bookings Statistics */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-300 text-center">
          📦 Total Bookings & Users
        </h3>
        <Chart
          type="bar"
          series={[{ name: "Count", data: chartData.bookingsByDate.data }]}
          options={{
            chart: { id: "bookings", background: "transparent" },
            xaxis: {
              categories: chartData.bookingsByDate.categories,
              labels: { style: { colors: ["#00D8FF", "#4CAF50", "#FFC107"] } },
            },
            grid: { borderColor: "#555", strokeDashArray: 4 },
            plotOptions: {
              bar: { borderRadius: 5, columnWidth: "50%" },
            },
            colors: ["#00D8FF", "#4CAF50", "#FFC107"],
          }}
          height={320}
        />
      </div>
    </div>
  );
};

export default Statistics;
