import React from "react";
import images from "../.././media/images (1).png";

const AcountDetail = ({ post }) => {
  //бере даны лише 1 користувача
  //диструктуріруємо
  if (post.length) {
    const {nickName,email} = post[0];
    //Провіряємо на наявність користувачів
    return (
      <div className="card card-style">
        <img className="card-img-top" src={images} alt="img-user" />
        <div className="card-body">
          <h4 className="card-title">Account Info:</h4>
          <p className="card-text">Name: {nickName}</p>
          <p className="card-text">Email: {email}</p>
        </div>
      </div>
    );
  } else {
    return <h1>Please create a post to see the details</h1>;
  }
};

export default AcountDetail;
