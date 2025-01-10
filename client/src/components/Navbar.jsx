import React from 'react';
import {MdOutlineSearch} from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from './UserAvatar';
import { setOpenSidebar } from "../redux/slices/authSlice";
import NotificationPanel from './NotificationPanel'
import Search from './Search';
const Navbar = () => {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  return (
    <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        <button onClick={() => dispatch(setOpenSidebar(true))} className='text-2xl text-gray-500 block md:hidden'>
          ☰
        </button>
        {/* <div className="w-64 2xl:w-[400px] flex items-cente px-3 py-2 gap-2 rounded-full bg-[#f3f4f6]">
          <MdOutlineSearch className='text-gray-500 text-xl' />
          <input type="text" placeholder='Search...' className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'/>
        </div> */}

        <Search></Search>
      </div>
      <div className="flex gap-2 items-center">
        <NotificationPanel />
        <UserAvatar/>
      </div>
    </div>
  )
}

export default Navbar

// import React, { useState } from 'react';
// import { MdOutlineSearch } from 'react-icons/md';
// import { useDispatch, useSelector } from 'react-redux';
// import UserAvatar from './UserAvatar';
// import { setOpenSidebar } from "../redux/slices/authSlice";
// import NotificationPanel from './NotificationPanel';
// import { useSearchTachesQuery } from '../redux/slices/api/tacheApiSlice';

// const Navbar = () => {
//   const { user } = useSelector(state => state.auth);
//   const dispatch = useDispatch();
//   const [query, setQuery] = useState('');
  
//   // Fetch search results using the custom query hook
//   const { data: taches, isLoading, isError } = useSearchTachesQuery(query, {
//     skip: query.length < 3, // Skip the request if query is less than 3 characters
//   });

//   const handleSearchChange = (e) => {
//     setQuery(e.target.value);
//   };

//   return (
//     <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0">
//       <div className="flex gap-4">
//         <button onClick={() => dispatch(setOpenSidebar(true))} className="text-2xl text-gray-500 block md:hidden">
//           ☰
//         </button>
        
//         <div className="w-64 2xl:w-[400px] flex items-center px-3 py-2 gap-2 rounded-full bg-[#f3f4f6]">
//           <MdOutlineSearch className="text-gray-500 text-xl" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
//             value={query}
//             onChange={handleSearchChange}
//           />
//         </div>
        
//         {/* Show results if the query length is 3 or more */}
//         {query && (
//           <div className="absolute bg-white border shadow-lg mt-2 w-64 max-h-60 overflow-y-auto z-20">
//             {isLoading && <div>Loading...</div>}
//             {isError && <div>Error fetching results</div>}
//             {taches && taches.length > 0 ? (
//               taches.map((tache) => (
//                 <div
//                   key={tache._id}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => window.location.href = `/tache/${tache._id}`} // Redirect to the task detail page
//                 >
//                   <div>{tache.titre}</div>
//                   <div>{tache.description}</div>
//                 </div>
//               ))
//             ) : (
//               <div className="px-4 py-2">No results found</div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="flex gap-2 items-center">
//         <NotificationPanel />
//         <UserAvatar />
//       </div>
//     </div>
//   );
// };

// export default Navbar;
