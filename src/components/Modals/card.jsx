import React from "react";
export default function Card(props) {
  return (
    <div className="card w-full mt-4" > 
      <div
        className="card_body  p-2 bg-white rounded-xl transform transition-all hover: duration-300 shadow-lg hover:shadow-2xl"
 
      >
        <img className="h-40 object-cover rounded-xl card_img w-full" src="https://d15fwz9jg1iq5f.cloudfront.net/wp-content/uploads/2023/06/23113747/Relit-675x1024.jpg" />
        <div className="p-2"></div>
        <h2 className="font-bold text-lg mb-2 card_title" >
          {/* {props.title} */} Harry Potter III
        </h2>
        <p className="text-sm text-gray-600 card_description" >
          {/* {props.description} */} 3 Annotations
        </p>
    
      </div>
    </div>
  );
}