import React from "react";
//Компонента для відображення всіх постів з сторінки AllPost
export const UserAllPosts = ({ post }) => {
  //Отримуємо пости
  const AllPost = post.map((el) => {
    return (
      <div>
        <div className="container ">
          <div className="card" key={el._id}>
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary width">
                  <i className="buttons fa fa-pencil " aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-primary width ">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
              <h6 className="card-title">User: {el.nickName}</h6>
              <p className="card-text">{el.text}</p>
              <div className='d-flex justify-content-between'>
                <p>{el.date}</p>
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
