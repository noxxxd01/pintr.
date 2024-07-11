import { useNavigate } from "react-router-dom";
import { useGetAllPostQuery } from "../redux/api/post";

const Home = () => {
  const { data: posts } = useGetAllPostQuery();
  const navigate = useNavigate();

  const toPost = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="columns-2 md:columns-4 gap-4 space-y-4 px-4 md:px-3 lg:px-0">
        {posts?.map((post) => (
          <div key={post._id} onClick={() => toPost(post._id)}>
            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-xl cursor-pointer">
              <img
                src={post.image}
                alt={post.name}
                className="max-w-xs transition duration-300 ease-in-out hover:scale-110 w-full h-auto hover:opacity-95"
              />
            </div>
            <p className="text-gray-600 font-medium">{post.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
