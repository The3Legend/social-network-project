import React from "react";
import images from "../images (1).png";


const AcountDetail = ({ post }) => {
  console.log(post);
  return (
    <div className="card card-style">
      <img
        className="card-img-top"
        src={images}
        alt="Card image"
      />
      <div className="card-body">
        <h4 className="card-title">Account Info:</h4>
        <p className="card-text">Name: {post[0].nickName}</p>
        <p className="card-text">Email: {post[0].email}</p>
      </div>
    </div>
  );
};

export default AcountDetail;
