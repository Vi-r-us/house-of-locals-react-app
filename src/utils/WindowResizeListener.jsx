import { useEffect } from "react";
import { setWidth } from "../features/utils/windowSlice";
import { useDispatch } from "react-redux";

const WindowResizeListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(setWidth(window.innerWidth)); // Dispatch new width
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default WindowResizeListener;
