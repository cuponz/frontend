import { Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa"; // Icon for closing sidebar

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <Transition
      show={isOpen}
      enter="transform transition-transform duration-300"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition-transform duration-300"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
      className="fixed inset-y-0 left-0 bg-white shadow-md w-64 z-50"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-xl rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            aria-label="Close Sidebar"
          >
            <FaTimes />
          </button>
        </div>
        <nav>
          <ul>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Dashboard</li>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Profile</li>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Settings</li>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Logout</li>
          </ul>
        </nav>
      </div>
    </Transition>
  );
}

export default Sidebar;
