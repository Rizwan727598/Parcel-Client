import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Other components */}
    </div>
  );
};

export default App;
