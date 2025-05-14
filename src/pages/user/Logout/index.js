import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../../utils/cookie";
import { clearCart } from "../../../slices/cartSlice";

function logout() {
  const navigate = useNavigate();
  deleteAllCookies();
  dispatch(clearCart());

  useEffect(() => {
    navigate("/login");
  }, []);
}