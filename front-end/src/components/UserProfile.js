import React from "react";
import AcountDetail from "./AcountDetail";
export const UserProfile = ({ post }) => {
  const AllPost = post.map((el) => {
    return (
      <div className="card" key={el._id}>
        <div className="card-body">
          <div className="d-flex justify-content-end buttons">
            <button type="button" className="btn btn-primary width">
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button type="button" className="btn btn-primary width">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
          <h6 className="card-title">User: {el.nickName}</h6>
          <p className="card-text">{el.text}</p>
          <button type="button" className="btn width">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className='d-flex justify-content-between' >
      <AcountDetail post={post} />
      <div className="container">
        <h2 className='size'>My posts</h2>
        {AllPost}
      </div>
    </div>
  );
};
