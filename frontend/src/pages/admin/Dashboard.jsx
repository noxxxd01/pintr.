import {
  ImagePlus,
  Images,
  LayoutDashboard,
  List,
  Users,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="w-1/4 hidden lg:inline-block">
          <div className="text-gray-500 font-medium flex flex-col gap-y-4 my-8">
            <Link className="flex items-center gap-3 py-2 px-2 rounded-lg transition-all ease-in-out hover:bg-gray-50">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link
              to="/admin/posts"
              className="flex items-center gap-3 py-2 px-2 rounded-lg transition-all ease-in-out hover:bg-gray-50"
            >
              <List size={18} />
              Posts
            </Link>
            <Link
              to="/admin/post/create"
              className="flex items-center gap-3 py-2 px-2 rounded-lg transition-all ease-in-out hover:bg-gray-50"
            >
              <ImagePlus size={18} />
              Create Post
            </Link>
            <Link
              to="/admin/genre"
              className="flex items-center gap-3 py-2 px-2 rounded-lg transition-all ease-in-out hover:bg-gray-50"
            >
              <WandSparkles size={18} />
              Genre
            </Link>
          </div>
        </div>
        <div className="w-full">
          <div className="m-8 grid grid-cols-1 gap-y-5 lg:grid-cols-3">
            <div className="relative px-9 py-10 flex flex-row justify-between items-center text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full lg:w-72">
              <div>
                <span className="text-gray-400 uppercase text-xs">Users</span>
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  2
                </h5>
              </div>
              <div>
                <Users size={40} className="text-green-600" />
              </div>
            </div>
            <div className="relative px-9 py-10 flex flex-row justify-between items-center text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full lg:w-72">
              <div>
                <span className="text-gray-400 uppercase text-xs">Posts</span>
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  2
                </h5>
              </div>
              <div>
                <Images size={40} className="text-red-600" />
              </div>
            </div>
            <div className="relative px-9 py-10 flex flex-row justify-between items-center text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full lg:w-72">
              <div>
                <span className="text-gray-400 uppercase text-xs">Genres</span>
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  2
                </h5>
              </div>
              <div>
                <WandSparkles size={40} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
