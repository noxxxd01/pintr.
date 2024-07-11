import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/users";
import { logout } from "../redux/features/auth/authSlice";

const Navigation = () => {
  const [dropdown, setDropdown] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setDropdown(false);
  }, [location]);

  return (
    <div className="border-b-[1px] border-b-zinc-200 text-zinc-800">
      <div className="px-4 md:px-0 container mx-auto flex justify-between items-center py-2 transition-all ease-in-out">
        <div>
          <Link to="/">
            <h1 className="font-bold text-2xl text-red-600">PINtr.</h1>
          </Link>
        </div>
        <div className="hidden lg:inline-block xl:inline-block">
          <div className="flex items-center gap-6 text-sm">
            {userInfo ? (
              <div className="relative">
                <span className="mr-6">{userInfo.username}</span>
                <img
                  onClick={toggleDropdown}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
                  src="https://i.pinimg.com/736x/85/81/47/858147f801932f3c5633c97233531ef2.jpg"
                  alt=""
                />
                {dropdown && (
                  <div className="absolute z-50 right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      to="/profile"
                    >
                      Profile
                    </Link>
                    {userInfo.isAdmin && (
                      <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        to="/admin/dashboard"
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link
                      onClick={logoutHandler}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-zinc-200 rounded-lg hover:bg-blue-600 transition-all ease-in-out"
                >
                  Sign In
                  <LogIn size={17} />
                </Link>
                <Link to="/register">Sign Up</Link>
              </>
            )}
          </div>
        </div>
        <div className="inline-block lg:hidden xl:hidden">
          <button className="flex items-center">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
