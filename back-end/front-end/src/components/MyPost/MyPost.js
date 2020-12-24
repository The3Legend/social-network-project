import React from "react";
import AcountDetail from "../AcountDetail/AcountDetail";
export const MyPost = ({ post }) => {
  //отримуємо інформацію про користувача,витягуємо id,nickName,
  const AllPost = post.map((el) => {
    const { _id, nickName, date } = el;
    return (
      <div className="card container-card" key={_id}>
        <div className="card-body">
          <div className="d-flex justify-content-end respons ">
            <button type="button" className="btn btn-primary width">
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              className="btn btn-primary width responsRight"
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
          <h6 className="card-title">User: {nickName}</h6>
          <p className="card-text">{el.text}</p>
          <div className="d-flex justify-content-between">
            <p>{date}</p>
            <button type="button" className="btn btn-danger width ">
              <i className="fa fa-heart" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex justify-content-between">
      <AcountDetail post={post} />
      <div className="container">
        <h2 className="size">My posts</h2>
        {AllPost}
      </div>
    </div>
  );
};
