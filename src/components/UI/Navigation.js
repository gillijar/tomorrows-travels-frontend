import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "@react-spring/web";
import { useHistory } from "react-router";
import { authActions } from "../../store/auth";

const Navigation = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);

  useEffect(() => {
    const creds = localStorage.getItem("credentials");

    if (creds) dispatch(authActions.setUserLoggedIn(true));
  }, [dispatch]);

  const { x } = useSpring({
    x: props.toggled ? 0 : 100,
  });

  const goToAuthHandler = () => {
    props.onClose();
    history.push("/login");
  };

  const logoutUser = () => {
    localStorage.removeItem("credentials");
    dispatch(authActions.setUserLoggedIn(false));
    props.onClose();
  };

  return (
    <animated.div
      className="nav"
      style={{
        transform: x.to((x) => `translate3d(${x * -1}%, 0, 0)`),
        boxShadow: props.toggled ? "1rem 0 1rem rgba(0, 0, 0, .25)" : "",
      }}
    >
      <nav>
        <div className="nav__div nav__close">
          <p onClick={props.onClose}>x</p>
        </div>
        <div className="nav__div nav__button">
          {userLoggedIn && <button onClick={logoutUser}>Logout</button>}
          {!userLoggedIn && <button onClick={goToAuthHandler}>Sign in</button>}
        </div>
        <div className="nav__div">
          <div className="nav__main">
            <h3>Review</h3>
            <div className="nav__main-section">
              <p>Write a review</p>
              <p>Post photos</p>
            </div>
          </div>
          <h3>Trips</h3>
        </div>
        <hr />
        <div className="nav__div nav__main">
          <p
            onClick={() => {
              props.onClose();
              history.push("/create-destination");
            }}
          >
            Create Destination
          </p>
          <p>Things to do</p>
          <p>Restaurants</p>
        </div>
        <p className="nav__footer">Tomorrow's Travels ©</p>
      </nav>
    </animated.div>
  );
};

export default Navigation;
