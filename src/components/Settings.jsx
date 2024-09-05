import React, { useState } from "react";

function Settings() {
  // State to store user information and edit mode status
  const [userInfo, setUserInfo] = useState({
    name: "My Name", // Placeholder, replace with actual data fetching
    email: "myemail@example.com", // Placeholder, replace with actual data fetching
  });
  const [editMode, setEditMode] = useState(false);

  // Handles updates to the state properties
  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Toggle edit mode on and off
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Placeholder function for updating user information
  const handleUpdate = () => {
    // Here you would normally handle the update logic, possibly sending data to a server
    console.log("Updated Info:", userInfo);
    toggleEditMode(); // Exit edit mode after updating
  };

  return (
    <div className="p-4 shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name:
        </label>
        {editMode ? (
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        ) : (
          <span className="text-gray-700">{userInfo.name}</span>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email:
        </label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        ) : (
          <span className="text-gray-700">{userInfo.email}</span>
        )}
      </div>
      <button
        onClick={editMode ? handleUpdate : toggleEditMode}
        className={`px-4 py-2 rounded font-bold ${
          editMode
            ? "bg-blue-500 hover:bg-blue-700 text-white"
            : "bg-gray-300 hover:bg-gray-400 text-black"
        }`}
      >
        {editMode ? "Update" : "Edit"}
      </button>
    </div>
  );
}

export default Settings;
