// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     user: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null,
//     isSidebarOpen: false,
//     isExpanded: true,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setCredentials: (state, action) => {
//             state.user = action.payload;
//             localStorage.setItem("userInfo",JSON.stringify(action.payload));
//         },
//         logout: (state,action) => {
//             state.user = null;
//             localStorage.removeItem("userInfo");
//         },
//         setOpenSidebar: (state, action) => {
//             state.isSidebarOpen = action.payload;
//         },
//         toggleSidebar: (state) => {
//             state.isExpanded = !state.isExpanded;
//         },
//     },
// });

// export const {setCredentials, logout, setOpenSidebar, toggleSidebar} = authSlice.actions;

// export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const initialState = {
    user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
    isSidebarOpen: false,
    isExpanded: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("userInfo",JSON.stringify(action.payload));
        },
        logout: (state,action) => {
            state.user = null;
            localStorage.removeItem("userInfo");
        },
        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        toggleSidebar: (state) => {
            state.isExpanded = !state.isExpanded;
        },
    },
});
export const useAuth = () => {
    const { user } = useSelector((state) => state.auth);
    
    return { 
      user, 
      isAdmin: user?.isAdmin || false 
    };
};

export const {setCredentials, logout, setOpenSidebar, toggleSidebar} = authSlice.actions;


export default authSlice.reducer;