import React from "react";
import "./UserPosts.css";

export const UserPosts = ({ post }) => {
  console.log(post);
  const AllPost = post.map((el) => {
    return (
      <div className="card" key={el._id}>
        <div className="card-body">
          <div className="d-flex justify-content-end buttons">
            <button type="button" class="btn btn-primary width">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-primary width">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
          <h6 className="card-title">User: {el.nickName}</h6>
          <p className="card-text">{el.text}</p>
          <button type="button" class="btn btn-danger width">
          <i class="fa fa-heart" aria-hidden="true"></i>
          </button>

        </div>
      </div>
    );
  });
  return <div>{AllPost}</div>;
};
