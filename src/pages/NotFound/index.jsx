import React from "react";

const NotFound = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://spraydrynozzle.com/wp-content/uploads/2019/12/404-error.png"
          className="image"
          alt="Not Found"
        />
      </div>
      <style jsx>{`
        .wrapper {
          width: 100%;
          height: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .image {
          max-width: 400px;
        }
      `}</style>
    </>
  );
};

export default NotFound;
