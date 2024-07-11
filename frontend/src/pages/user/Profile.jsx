import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useProfileMutation } from "../../redux/api/users";
import { useEffect, useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showUpdate, setShowUpdate] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile successfully updated");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };

  const toggle = () => {
    setShowUpdate(!showUpdate);
  };

  return (
    <div>
      <form
        onSubmit={handleUpdate}
        className="h-full container mx-auto py-8 px-4 md:px-3 lg:px-3 xl:px-0"
      >
        <div className="bg-white rounded-lg shadow-xl pb-8">
          <div className="w-full h-[250px]">
            <img
              src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
              className="w-full h-full rounded-tl-lg rounded-tr-lg"
            />
          </div>
          <div className="flex flex-col items-center -mt-20">
            <img
              src="https://i.pinimg.com/736x/85/81/47/858147f801932f3c5633c97233531ef2.jpg"
              className="w-40 border-4 border-white rounded-full"
            />
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl">{userInfo.username}</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">{userInfo.email}</p>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
            <div className="flex items-center space-x-4 mt-2">
              <button
                type="submit"
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
              >
                <span>{isLoading ? "Loading..." : "Update"}</span>
              </button>
              <a
                onClick={toggle}
                className="cursor-pointer flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
              >
                <span>Edit Profile</span>
              </a>
            </div>
          </div>
        </div>

        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              {showUpdate ? (
                <>
                  <h4 className="text-xl text-gray-900 font-bold">User Info</h4>
                  <ul className="mt-2 text-gray-700">
                    <li className="flex gap-3 md:gap-3 lg:gap-0 xl:gap-0 items-center border-y py-2">
                      <span className="font-bold w-24">Username:</span>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-[40rem] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Username"
                      />
                    </li>
                    <li className="flex gap-3 md:gap-3 lg:gap-0 xl:gap-0 items-center border-y py-2">
                      <span className="font-bold w-24">Email:</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-[40rem] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Email"
                      />
                    </li>
                    <li className="flex gap-3 md:gap-3 lg:gap-0 xl:gap-0 items-center border-y py-2">
                      <span className="font-bold w-24">Password:</span>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-[40rem] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Password"
                      />
                    </li>
                    <li className="flex gap-3 md:gap-3 lg:gap-0 xl:gap-0 items-center border-y py-2">
                      <span className="font-bold w-24">Confirm Password:</span>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-[40rem] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Confirm Password"
                      />
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <h4 className="text-xl text-gray-900 font-bold">User Info</h4>
                  <ul className="mt-2 text-gray-700">
                    <li className="flex border-y py-2">
                      <span className="font-bold w-24">Username:</span>
                      <span className="text-gray-700">{userInfo.username}</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Email:</span>
                      <span className="text-gray-700">{userInfo.email}</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Joined:</span>
                      <span className="text-gray-700"></span>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
