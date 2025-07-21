// import axios from "axios";
// const apiURL = process.env.REACT_APP_API_URL;

// export const isAuthenticate = () =>
//   localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

// export const isAdmin = () =>
//   localStorage.getItem("jwt")
//     ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
//     : false;

// export const loginReq = async ({ email, password }) => {
//   const data = { email, password };
//   try {
//     let res = await axios.post(`${apiURL}/api/signin`, data);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signupReq = async ({ name, email, password, cPassword }) => {
//   const data = { name, email, password, cPassword };
//   try {
//     let res = await axios.post(`http://localhost:8000/api/signup`, data);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };


import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log("Login error:", error);
    return { error: "Login failed" };
  }
};

export const signupReq = async (data) => {
  
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log("Signup error:", error);
    return { error: "Signup failed" };
  }
};
