// // import axios from "axios";
// // import { createContext, useEffect, useState } from "react";


// // export const StoreContext = createContext(null);

// // const StoreContextProvider = (props) => {

// //   const [cartItems,setCartItems] = useState({});

// //   const url = import.meta.env.VITE_BACKEND_URL;


// //  // const url =  process.env.backend_url;  //backend integration part
// //   const [token,setToken] = useState("")   //backend integration part
// //   //store foodlist item by admin will add
// //   const [food_list,setFoodlist] = useState([]);

// // //itemId main id value pass kar rahe hai 
// //   const addToCart = async(itemId) => {
// //     //check carItems[itemId] main 0 value present  hai the if statement true or cardItem mai 1 assign ho jayega 
// //     if(!cartItems[itemId]){
// //       setCartItems((prevVal)=>({...prevVal,[itemId]:1}))
// //       //preVal mai jo hai usko aise hi rahne do or or jis id; mai call hua hai uska cardItem 1 hoga like it will show id is 5 then it will show [5:1]
// //     }
// //     else{
// //       setCartItems((prevVal)=>({...prevVal,[itemId]:prevVal[itemId]+1}))
// //       //preVal mai jo hai usko aise hi rahne do or  jis id mai call hua hai uska cardItem +1 hoga like it will show id is 5 and preVal is is 2 ,then it will show [5:3] +1 add ho jayega 
// //     }
// //     if (token) {
// //       await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
// //     }
// //   }

// //   const removeFromCart = async(itemId) =>{
// //     setCartItems((prevVal)=>({...prevVal,[itemId]:prevVal[itemId]-1}));
// //     //preVal mai jo hai usko aise hi rahne do or  jis id mai call hua hai uska cardItem -1 hoga like it will show id is 5 and preVal is is 2 ,then it will show [5:1] -1 subtract ho jayega 
// //     if (token) {
// //       await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
// //     }
// //   }
// //   const getTotalCartAmount = () =>{
// //     let totalAmaount = 0;
// //     for(const item in cartItems){
// //       if (cartItems[item]>0) {
// //         let itemInfo =  food_list.find((product)=>product._id === item);
// //         totalAmaount += itemInfo.price * cartItems[item];
// //       }
      
// //     }
// //     return totalAmaount;
// //   }
// //   //backend integration part
// //   const fethFoodList = async () =>{
// //     const response = await axios.get(url+"/api/food/list");
// //     setFoodlist(response.data.data)
// //   }
// //   const loadCartData = async(token) =>{
// //       const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
// //       setCartItems(response.data.cartData);

// //   }
// //   useEffect(()=>{
    
// //     async function loadData() {
// //       await fethFoodList();
// //       if (localStorage.getItem("token")) {
// //         setToken(localStorage.getItem("token"));
// //         await loadCartData(localStorage.getItem("token"));
// //     }
// //     }
// //     loadData();
// //   },[])
// //   const contextValue = {
// //     food_list,
// //     cartItems,
// //     setCartItems,
// //     addToCart,
// //     removeFromCart,
// //     getTotalCartAmount,
// //     url,   //backend integration part
// //     token,   //backend integration part
// //     setToken   //backend integration part
// //   };
// // // 


// //   return (
// //     <StoreContext.Provider value={contextValue}>
// //       {props.children}
// //     </StoreContext.Provider>
// //   );
// // };

// // export default StoreContextProvider;


// import axios from "axios";
// import { createContext, useEffect, useState } from "react";


// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {

//   const [cartItems,setCartItems] = useState({});

//   const url = import.meta.env.VITE_BACKEND_URL;


//  // const url =  process.env.backend_url;  //backend integration part
//   const [token,setToken] = useState("")   //backend integration part
//   //store foodlist item by admin will add
//   const [food_list,setFoodlist] = useState([]);

// //itemId main id value pass kar rahe hai 
//   const addToCart = async(itemId) => {
//     //check carItems[itemId] main 0 value present  hai the if statement true or cardItem mai 1 assign ho jayega 
//     if(!cartItems[itemId]){
//       setCartItems((prevVal)=>({...prevVal,[itemId]:1}))
//       //preVal mai jo hai usko aise hi rahne do or or jis id; mai call hua hai uska cardItem 1 hoga like it will show id is 5 then it will show [5:1]
//     }
//     else{
//       setCartItems((prevVal)=>({...prevVal,[itemId]:prevVal[itemId]+1}))
//       //preVal mai jo hai usko aise hi rahne do or  jis id mai call hua hai uska cardItem +1 hoga like it will show id is 5 and preVal is is 2 ,then it will show [5:3] +1 add ho jayega 
//     }
//     if (token) {
//       await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
//     }
//   }

//   const removeFromCart = async(itemId) =>{
//     setCartItems((prevVal)=>({...prevVal,[itemId]:prevVal[itemId]-1}));
//     //preVal mai jo hai usko aise hi rahne do or  jis id mai call hua hai uska cardItem -1 hoga like it will show id is 5 and preVal is is 2 ,then it will show [5:1] -1 subtract ho jayega 
//     if (token) {
//       await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
//     }
//   }
//   const getTotalCartAmount = () =>{
//     let totalAmaount = 0;
//     for(const item in cartItems){
//       if (cartItems[item]>0) {
//         let itemInfo =  food_list.find((product)=>product._id === item);
//         totalAmaount += itemInfo.price * cartItems[item];
//       }
      
//     }
//     return totalAmaount;
//   }
//   //backend integration part
//   const fethFoodList = async () =>{
//     const response = await axios.get(url+"/api/food/list");
//     setFoodlist(response.data.data)
//   }
//   const loadCartData = async(token) =>{
//       const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
//       setCartItems(response.data.cartData);

//   }
//   useEffect(()=>{
    
//     async function loadData() {
//       await fethFoodList();
//       if (localStorage.getItem("token")) {
//         setToken(localStorage.getItem("token"));
//         await loadCartData(localStorage.getItem("token"));
//     }
//     }
//     loadData();
//   },[])
//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,   //backend integration part
//     token,   //backend integration part
//     setToken   //backend integration part
//   };
// // 


//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;


"use client"

"use client"

import axios from "axios"
import { createContext, useEffect, useState, useCallback } from "react"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({})
  const url = import.meta.env.VITE_BACKEND_URL || "https://food-restaurant-website-backend.onrender.com"
  const [token, setToken] = useState("")
  const [food_list, setFoodlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("");
  
  const [category, setCategory] = useState("All"); // Default category is "All"

  const fetchWithRetry = useCallback(async (apiCall, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await apiCall()
      } catch (err) {
        if (i === retries - 1) throw err
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }, [])

  const addToCart = async (itemId) => {
    try {
      if (!cartItems[itemId]) {
        setCartItems((prevVal) => ({ ...prevVal, [itemId]: 1 }))
      } else {
        setCartItems((prevVal) => ({ ...prevVal, [itemId]: prevVal[itemId] + 1 }))
      }
      if (token) {
        await fetchWithRetry(() => axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } }))
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      setError("Failed to add item to cart. Please try again.")
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      setCartItems((prevVal) => ({ ...prevVal, [itemId]: prevVal[itemId] - 1 }))
      if (token) {
        await fetchWithRetry(() => axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } }))
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
      setError("Failed to remove item from cart. Please try again.")
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item)
        totalAmount += itemInfo ? itemInfo.price * cartItems[item] : 0
      }
    }
    return totalAmount
  }

  const clearCart = async () => {
    try {
      setCartItems({})
      if (token) {
        await fetchWithRetry(() => axios.post(`${url}/api/order/cart/clear`, {}, { headers: { token } }))
      }
    } catch (error) {
      console.error("Error clearing cart:", error)
      setError("Failed to clear cart. Please try again.")
    }
  }

  const fetchFoodList = useCallback(async () => {
    try {
      const response = await fetchWithRetry(() => axios.get(`${url}/api/food/list`))
      setFoodlist(response.data.data)
    } catch (error) {
      console.error("Error fetching food list:", error)
      setError("Failed to load food list. Please refresh the page.")
    }
  }, [fetchWithRetry])

  const loadCartData = useCallback(
    async (token) => {
      try {
        const response = await fetchWithRetry(() => axios.post(`${url}/api/cart/get`, {}, { headers: { token } }))
        setCartItems(response.data.cartData)
      } catch (error) {
        console.error("Error loading cart data:", error)
        setError("Failed to load cart data. Please refresh the page.")
      }
    },
    [fetchWithRetry],
  )

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      setError(null)
      try {
        await fetchFoodList()
        if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"))
          await loadCartData(localStorage.getItem("token"))
        }
      } catch (error) {
        console.error("Error loading initial data:", error)
        setError("Failed to load initial data. Please refresh the page.")
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [fetchFoodList, loadCartData])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
    url,
    token,
    setToken,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
  }

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>
}

export default StoreContextProvider



