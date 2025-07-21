// import React, { Fragment, useState } from "react";
// import { signupReq } from "./fetchApi";

// const Signup = (props) => {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     cPassword: "",
//     error: false,
//     loading: false,
//     success: false,
//   });

//   const alert = (msg, type) => (
//     <div className={`text-sm text-${type}-500`}>{msg}</div>
//   );

//   const formSubmit = async () => {
//     setData({ ...data, loading: true });
//     if (data.cPassword !== data.password) {
//       return setData({
//         ...data,
//         error: {
//           cPassword: "Password doesn't match",
//           password: "Password doesn't match",
//         },
//       });
//     }
//     try {
//       let responseData = await signupReq({
//         name: data.name,
//         email: data.email,
//         password: data.password,
//         cPassword: data.cPassword,
//       });
//       if (responseData.error) {
//         setData({
//           ...data,
//           loading: false,
//           error: responseData.error,
//           password: "",
//           cPassword: "",
//         });
//       } else if (responseData.success) {
//         setData({
//           success: responseData.success,
//           name: "",
//           email: "",
//           password: "",
//           cPassword: "",
//           loading: false,
//           error: false,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Fragment>
//       <div className="text-center text-2xl mb-6">Register Hospital</div>
//       <form className="space-y-4">
//         {data.success ? alert(data.success, "green") : ""}
//         <div className="flex flex-col">
//           <label htmlFor="name">
//             Name<span className="text-sm text-gray-600 ml-1">*</span>
//           </label>
//           <input
//             onChange={(e) =>
//               setData({
//                 ...data,
//                 success: false,
//                 error: {},
//                 name: e.target.value,
//               })
//             }
//             value={data.name}
//             type="text"
//             id="name"
//             className={`${
//               data.error.name ? "border-red-500" : ""
//             } px-4 py-2 focus:outline-none border`}
//           />
//           {!data.error ? "" : alert(data.error.name, "red")}
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="email">
//             Email address<span className="text-sm text-gray-600 ml-1">*</span>
//           </label>
//           <input
//             onChange={(e) =>
//               setData({
//                 ...data,
//                 success: false,
//                 error: {},
//                 email: e.target.value,
//               })
//             }
//             value={data.email}
//             type="email"
//             id="email"
//             className={`${
//               data.error.email ? "border-red-500" : ""
//             } px-4 py-2 focus:outline-none border`}
//           />
//           {!data.error ? "" : alert(data.error.email, "red")}
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="password">
//             Password<span className="text-sm text-gray-600 ml-1">*</span>
//           </label>
//           <input
//             onChange={(e) =>
//               setData({
//                 ...data,
//                 success: false,
//                 error: {},
//                 password: e.target.value,
//               })
//             }
//             value={data.password}
//             type="password"
//             id="password"
//             className={`${
//               data.error.password ? "border-red-500" : ""
//             } px-4 py-2 focus:outline-none border`}
//           />
//           {!data.error ? "" : alert(data.error.password, "red")}
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="cPassword">
//             Confirm password
//             <span className="text-sm text-gray-600 ml-1">*</span>
//           </label>
//           <input
//             onChange={(e) =>
//               setData({
//                 ...data,
//                 success: false,
//                 error: {},
//                 cPassword: e.target.value,
//               })
//             }
//             value={data.cPassword}
//             type="password"
//             id="cPassword"
//             className={`${
//               data.error.cPassword ? "border-red-500" : ""
//             } px-4 py-2 focus:outline-none border`}
//           />
//           {!data.error ? "" : alert(data.error.cPassword, "red")}
//         </div>
//         <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
//           <div>
//             <input
//               type="checkbox"
//               id="rememberMe"
//               className="px-4 py-2 focus:outline-none border mr-1"
//             />
//             <label htmlFor="rememberMe">
//               Remember me<span className="text-sm text-gray-600">*</span>
//             </label>
//           </div>
//           <a className="block text-gray-600" href="/">
//             Forgot your password?
//           </a>
//         </div>
//         <div
//           onClick={(e) => formSubmit()}
//           style={{ background: "#303031" }}
//           className="px-4 py-2 text-white text-center cursor-pointer font-medium"
//         >
//           Create an account
//         </div>
//       </form>
//     </Fragment>
//   );
// };

// export default Signup;

import React, { useState, Fragment } from "react";
import { signupReq } from "./fetchApi";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    userRole: "hospital", // Default role
    phoneNumber: "",
    error: {},
    loading: false,
    success: "",
  });

  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500 mt-1`}>{msg}</div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });

    // Password match check
    if (data.password !== data.cPassword) {
      return setData({
        ...data,
        loading: false,
        error: {
          password: "Passwords do not match",
          cPassword: "Passwords do not match",
        },
      });
    }

    try {
      const response = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
        userRole: data.userRole,
        phoneNumber: data.phoneNumber,
      });

      if (response?.error) {
        setData({
          ...data,
          error: response.error,
          loading: false,
          password: "",
          cPassword: "",
          success: "",
        });
      } else if (response?.success) {
        setData({
          name: "",
          email: "",
          password: "",
          cPassword: "",
          userRole: "hospital",
          phoneNumber: "",
          error: {},
          loading: false,
          success: response.success,
        });
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setData({ ...data, loading: false });
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6 font-semibold">Register Account</div>
      <form className="space-y-4">
        {data.success && alert(data.success, "green")}

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name">Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) =>
              setData({ ...data, name: e.target.value, error: {}, success: "" })
            }
            className={`px-4 py-2 border ${data.error.name ? "border-red-500" : ""}`}
          />
          {data.error?.name && alert(data.error.name, "red")}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email<span className="text-red-500">*</span></label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value, error: {}, success: "" })
            }
            className={`px-4 py-2 border ${data.error.email ? "border-red-500" : ""}`}
          />
          {data.error?.email && alert(data.error.email, "red")}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            value={data.phoneNumber}
            onChange={(e) =>
              setData({ ...data, phoneNumber: e.target.value })
            }
            className="px-4 py-2 border"
          />
        </div>

        {/* User Role */}
        <div className="flex flex-col">
          <label htmlFor="userRole">User Role<span className="text-red-500">*</span></label>
          <select
            id="userRole"
            value={data.userRole}
            onChange={(e) =>
              setData({ ...data, userRole: e.target.value })
            }
            className="px-4 py-2 border"
          >
            <option value="hospital">Hospital</option>
            <option value="donor">Donor</option>
            <option value="receiver">Receiver</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password">Password<span className="text-red-500">*</span></label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value, error: {}, success: "" })
            }
            className={`px-4 py-2 border ${data.error.password ? "border-red-500" : ""}`}
          />
          {data.error?.password && alert(data.error.password, "red")}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="cPassword">Confirm Password<span className="text-red-500">*</span></label>
          <input
            type="password"
            id="cPassword"
            value={data.cPassword}
            onChange={(e) =>
              setData({ ...data, cPassword: e.target.value, error: {}, success: "" })
            }
            className={`px-4 py-2 border ${data.error.cPassword ? "border-red-500" : ""}`}
          />
          {data.error?.cPassword && alert(data.error.cPassword, "red")}
        </div>

        {/* Submit */}
        <div
          onClick={formSubmit}
          className="bg-black text-white px-4 py-2 text-center cursor-pointer font-medium"
        >
          Create Account
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
