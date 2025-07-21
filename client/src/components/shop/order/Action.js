import { createOrder } from "./FetchApi";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const fetchbrainTree = async (getBrainTreeToken, setState) => {
//   try {
//     let responseData = await getBrainTreeToken();
//     if (responseData && responseData) {
//       setState({
//         clientToken: responseData.clientToken,
//         success: responseData.success,
//       });
//       console.log(responseData);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const pay = async (
//   data,
//   dispatch,
//   state,
//   setState,
//   getPaymentProcess,
//   totalCost,
//   history
// ) => {
//   console.log(state);
//   if (!state.address) {
//     setState({ ...state, error: "Please provide your address" });
//   } else if (!state.phone) {
//     setState({ ...state, error: "Please provide your phone number" });
//   } else {
//     let nonce;
//     state.instance
//       .requestPaymentMethod()
//       .then((data) => {
//         dispatch({ type: "loading", payload: true });
//         nonce = data.nonce;
//         let paymentData = {
//           amountTotal: totalCost(),
//           paymentMethod: nonce,
//         };
//         getPaymentProcess(paymentData)
//           .then(async (res) => {
//             if (res) {
//               let orderData = {
//                 allProduct: JSON.parse(localStorage.getItem("cart")),
//                 user: JSON.parse(localStorage.getItem("jwt")).user._id,
//                 amount: res.transaction.amount,
//                 transactionId: res.transaction.id,
//                 address: state.address,
//                 phone: state.phone,
//               };
//               try {
//                 let resposeData = await createOrder(orderData);
//                 if (resposeData.success) {
//                   localStorage.setItem("cart", JSON.stringify([]));
//                   dispatch({ type: "cartProduct", payload: null });
//                   dispatch({ type: "cartTotalCost", payload: null });
//                   dispatch({ type: "orderSuccess", payload: true });
//                   setState({ clientToken: "", instance: {} });
//                   dispatch({ type: "loading", payload: false });
//                   return history.push("/");
//                 } else if (resposeData.error) {
//                   console.log(resposeData.error);
//                 }
//               } catch (error) {
//                 console.log(error);
//               }
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//         setState({ ...state, error: error.message });
//       });
//   }
// };

export const fetchbrainTree = async (getBrainTreeToken, setState) => {
  try {
    const responseData = await getBrainTreeToken();
    if (responseData?.clientToken) {
      setState((prev) => ({
        ...prev,
        clientToken: responseData.clientToken,
        success: responseData.success,
      }));
      console.log("Client Token:", responseData.clientToken);
    } else {
      console.error("No client token in response:", responseData);
      setState((prev) => ({
        ...prev,
        error: "Could not load payment gateway. Try again later.",
      }));
    }
  } catch (error) {
    console.error("Failed to fetch client token:", error);
    setState((prev) => ({
      ...prev,
      error: "Failed to connect to payment server.",
    }));
  }
};
 

export const pay = async (
  data,
  dispatch,
  state,
  setState,
  getPaymentProcess,
  totalCost,
  history
) => {
  // Input validation
  if (!state.address) {
    setState(prev => ({ ...prev, error: "Please provide your address" }));
    return;
  }
  if (!state.phone) {
    setState(prev => ({ ...prev, error: "Please provide your phone number" }));
    return;
  }

  // Simulate payment status: you can change this to 'success', 'failed', or 'pending' for testing
  const simulateStatus = 'success'; // or 'failed', 'pending'

  try {
    dispatch({ type: "loading", payload: true });
    const paymentData = {
      amountTotal: totalCost(),
      simulateStatus,
    };
    const res = await getPaymentProcess(paymentData);
    if (res.success) {
      // Payment success
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch({ type: "cartProduct", payload: null });
      dispatch({ type: "cartTotalCost", payload: null });
      dispatch({ type: "orderSuccess", payload: true });
      setState(prev => ({ ...prev, clientToken: "", instance: {}, error: false }));
      dispatch({ type: "loading", payload: false });
      history.push("/payment/success");
    } else if (res.error && res.error.includes("pending")) {
      history.push("/payment/pending");
    } else {
      // Payment failed
      setState(prev => ({ ...prev, error: res.error || "Payment failed." }));
      dispatch({ type: "loading", payload: false });
      history.push("/payment/failed");
    }
  } catch (error) {
    setState(prev => ({ ...prev, error: error.message }));
    dispatch({ type: "loading", payload: false });
    history.push("/payment/failed");
  }
};
