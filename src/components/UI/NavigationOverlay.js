import React from "react";
import { animated, useSpring } from "@react-spring/web";

const NavigationOverlay = (props) => {
  const { x, y } = useSpring({
    x: props.toggled ? 1 : 0,
    y: props.toggled ? "all" : "none",
  });

  return (
    <animated.div
      className="nav__overlay"
      style={{
        opacity: x,
        pointerEvents: y,
      }}
    ></animated.div>
  );
};

export default NavigationOverlay;
