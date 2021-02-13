import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";

import imageBackground from "../../assets/auth-background.jpg";

export const AuthMain = ({ children }) => {
  return (
    <>
      <Grid container component="main" className="root">
        <Grid item xs={false} sm={4} md={7}>
          <img src={imageBackground} className="image" alt="QuizWorld" />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="content">{children}</div>
        </Grid>
      </Grid>
      <style jsx>
        {`
          .root {
            height: 100vh;
          }
          @keyframes blur {
            0% {
              -webkit-filter: contrast(100%);
              -moz-filter: contrast(100%);
              -o-filter: contrast(100%);
              -ms-filter: contrast(100%);
            }
            50% {
              -webkit-filter: contrast(110%);
              -moz-filter: contrast(110%);
              -o-filter: contrast(110%);
              -ms-filter: contrast(110%);
            }
          }
          .image {
            background-repeat: no-repeat;
            background-color: gray;
            background-position: center;
            object-fit: cover;
            height: 100%;
            width: 100%;
            background-size: cover;
            animation: blur 2s ease 0s infinite;
          }
          @media (max-width: 600px) {
            .image {
              display: none;
            }
          }
          .content {
            height: 100%;
            margin: 0px 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  );
};
