import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems,setCartItems] = useState({});
//itemId main id value pass kar rahe hai 
  const addToCart= (itemId)=>{
    //check carItems[itemId] main 0 value present  hai the if statement true or cardItem mai 1 assign ho jayega 
    if(!cartItems[itemId]){
      setCartItems((prevVal)=>({...prevVal,[itemId]:1}))
      //preVal mai jo hai usko aise hi rahne do or or jis id mai call hua hai uska cardItem 1 hoga like it will show id is 5 then it will show [5:1]
    }
    else{
      setCartItems((prevVal)=>({...prevVal,[itemId]:prevVal[itemId]+1}))
      //preVal mai jo hai usko aise hi rahne do or  jis id mai call hua hai uska cardItem +1 hoga like it will show id is 5 and preVal is is 2 ,then it will show [5:3] +1 add ho jayega 
    }
  }

  const removeFromCart = (itemId) =>{
    setCartItems((prevVal)=>({...prevVal,[itemId]:prevVal[itemId]-1}));
    //preVal mai jo hai usko aise hi rahne do or  jis id mai call hua hai uska cardItem -1 hoga like it will show id is 5 and preVal is is 2 ,then it will show [5:1] -1 subtract ho jayega 
  }
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };
useEffect(()=>{
console.log(cartItems);

},[cartItems]);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
