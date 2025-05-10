import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { FiPackage, FiCheckCircle, FiUsers } from "react-icons/fi";

const Statistics = () => {
  const [stats, setStats] = useState({
    booked: 0,
    delivered: 0,
    users: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://parcel-server-one.vercel.app/stats"
        );
        setStats({
          booked: res.data.booked || 0,
          delivered: res.data.delivered || 0,
          users: res.data.users || 0,
          loading: false,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setStats((prev) => ({ ...prev, error: err.message, loading: false }));
      }
    };

    fetchStats();
  }, []);

  // Chart configuration
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Total Parcels", "Delivered", "Users"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#718096",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#718096",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
        formatter: (value) => {
          return Math.floor(value) === value ? value : "";
        },
      },
    },
    fill: {
      opacity: 1,
      colors: ["#4FD1C5", "#68D391", "#F6AD55"],
    },
    tooltip: {
      y: {
        formatter: (val) => val.toLocaleString(),
      },
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    grid: {
      borderColor: "#E2E8F0",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
  };

  const chartSeries = [
    {
      name: "Count",
      data: [stats.booked, stats.delivered, stats.users],
    },
  ];

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg bg-gray-50">
        <div className="w-8 h-8 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="p-6 text-center text-red-500 rounded-lg bg-red-50">
        Failed to load statistics: {stats.error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white shadow-sm rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-800">
          Parcel Statistics Overview
        </h2>
        <p className="text-gray-500">Key metrics and performance indicators</p>

        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-3">
          {/* Total Parcels Card */}
          <div className="p-5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 mr-4 rounded-full bg-teal-500/20">
                <FiPackage className="text-2xl text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Parcels
                </p>
                <p className="text-2xl font-semibold text-gray-800">
                  {stats.booked.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Delivered Card */}
          <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 mr-4 rounded-full bg-green-500/20">
                <FiCheckCircle className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {stats.delivered.toLocaleString()}
                </p>
                <p className="text-xs text-green-600">
                  {stats.booked > 0
                    ? `${Math.round(
                        (stats.delivered / stats.booked) * 100
                      )}% success rate`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Users Card */}
          <div className="p-5 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 mr-4 rounded-full bg-amber-500/20">
                <FiUsers className="text-2xl text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-semibold text-gray-800">
                  {stats.users.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 bg-white shadow-sm rounded-xl">
        <div className="flex flex-col justify-between mb-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Parcel Distribution
            </h3>
            <p className="text-gray-500">Visual breakdown of parcel metrics</p>
          </div>
          <div className="flex mt-3 space-x-3 sm:mt-0">
            <span className="inline-flex items-center px-3 py-1 text-sm text-teal-800 bg-teal-100 rounded-full">
              <span className="w-2 h-2 mr-2 bg-teal-500 rounded-full"></span>
              Total
            </span>
            <span className="inline-flex items-center px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full">
              <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
              Delivered
            </span>
            <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-amber-100 text-amber-800">
              <span className="w-2 h-2 mr-2 rounded-full bg-amber-500"></span>
              Users
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
