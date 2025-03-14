import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../../utils/cookie";
function logout() {
  const navigate = useNavigate();
  deleteAllCookies();

  useEffect(() => {
    navigate("/login");
  }, []);
}