import React from "react";
import Moment from "react-moment";
//Компонента для відображення всіх постів з сторінки AllPost
export const UserAllPosts = ({ post }) => {
  //Отримуємо пости
  const AllPost = post.map((el) => {
    const { _id, nickName, text, date } = el;
    return (
      <div>
        <div className="container ">
          <div className="card" key={_id}>
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary width">
                  <i className="buttons fa fa-pencil " aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-primary width ">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
              <h6 className="card-title">User: {nickName}</h6>
              <p className="card-text">{text}</p>
              <div className="d-flex justify-content-between">
                <small>
                  <Moment format="HH:mm DD-MM-YYYY">
                    {date}
                  </Moment>
                </small>
                <button type="button" className="btn btn-danger width ">
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <h1 className="size">Posts all users</h1>
      {AllPost}
    </div>
  );
};
