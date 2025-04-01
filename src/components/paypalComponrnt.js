import React, { useEffect, useRef } from "react";
//import arrayOfProduct from '@ProjectA/cart';
//import arrtest from "../../../project/product"
// function getall(){
//     import { collection, query, where, getDocs } from "../../../ProjectA/firebase/firestore";
    
//     const q = query(collection(db, "arrayOfProduct"));
    //let cartProducts=[];
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       cartProducts.push(doc.data());
//     });
//     }
//  console.log(arrayOfProduct) 
export default function Paypal(){
        //ref hook
    const paypal=useRef()
    // whenever we render the page we want to render all functionalities of that button
    useEffect(()=>{
        let total=localStorage.getItem("totalPrice")
      
        if(window.paypal){
            if (paypal.current) {
              paypal.current.innerHTML = '';
            }  
        //dom button as referance of paypal
        window.paypal.Buttons({
            createOrder:(data,actions,error)=>{
            return(actions.order.create({
                   intent:"CAPTURE",
                    //map
                    purchase_units:[{
                        description:"table",
                        amount:{
                            currency_code:"CAD",
                            value:total,//price
                        },
                    }],
                })) 
            },
            onApprove:(data,actions)=>{
                // const order=await actions.order.capture();
                // console.log(order)
                localStorage.removeItem("totalPrice")
                return actions.order.capture().then((details)=>{
                
                    alert('completed : '+details.payer.name.given_name)
                })
            },
            onError:(error)=>{
                console.log(error)
            }
        }
        ).render(paypal.current)
       }
    else {
        console.error('PayPal SDK not loaded.');
      }
    }   
    ,[])
    return(
           <div>
         <div ref={paypal}> </div> 
         </div>
    )
}
