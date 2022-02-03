import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GoToTop() {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
    console.log("route changed");
  };

  useEffect(() => {
    onTop();
  }, [routePath]);

  return null;
}
