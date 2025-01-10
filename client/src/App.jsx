import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Taches from "./pages/Taches";
import Users from "./pages/Users";
import DeletedItems from "./pages/DeletedItems";
import DetailsTaches from "./pages/DetailsTaches";
import { Toaster } from "sonner";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { setOpenSidebar } from "./redux/slices/authSlice";
import React, { Fragment,useRef } from 'react';
import { Transition } from "@headlessui/react";
import axios from "axios";
axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response?.status === 401) {
          // Clear any local storage if you're using it
          localStorage.clear();
          // Redirect to login
          window.location.href = '/log-in';
          return Promise.reject(error);
      }
      return Promise.reject(error);
  }
);
function Layout() {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 mt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/taches" element={<Taches />} />
          <Route path="/termine/:status" element={<Taches />} />
          <Route path="/en-cours/:status" element={<Taches />} />
          <Route path="/a-faire/:status" element={<Taches />} />
          <Route path="/equipe" element={<Users />} />
          <Route path="/supprime" element={<DeletedItems />} />
          <Route path="/tache/:id" element={<DetailsTaches />} />
        </Route>
        <Route path="/log-in" element={<Login />} />
      </Routes>
      <Toaster richColors />
    </main>
  );
}

export default App;