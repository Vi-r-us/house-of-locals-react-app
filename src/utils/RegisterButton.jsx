import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./Utilities";
import { loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";

const RegisterButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await axiosInstance.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("Logged in as guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error logging in as guest user");
    }
  };
  return (
    <button
      type="button"
      className="bg-tom-800 p-[14px] text-base md:text-xl text-serenade-50 rounded-xl"
      onClick={loginAsGuestUser}
    >
      Guest User
    </button>
  );
};

export default RegisterButton;
