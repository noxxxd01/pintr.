import { SquarePen, Trash2 } from "lucide-react";
import {
  useGetAllPostQuery,
  useDeletePostMutation,
} from "../../redux/api/post";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllPost = () => {
  const { data: posts, refetch } = useGetAllPostQuery();
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id).unwrap();
        toast.success("Post deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete post");
      }
    }
  };
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-4 container mx-auto px-4 md:px-0 lg:px-0 xl:px-0 ">
      {posts?.map((post) => (
        <div className="mb-4 flex flex-col" key={post._id}>
          <img className="rounded-lg" src={post.image} alt={post.name} />
          <div className="flex items-center justify-between py-2 ">
            <h1 className="text-gray-600 font-medium text-sm">{post.name}</h1>
            <div className="flex items-center gap-4">
              <Link
                className="text-gray-500"
                to={`/admin/post/update-post/${post._id}`}
              >
                <SquarePen size={17} />
              </Link>
              <button
                className="text-red-500"
                onClick={() => handleDelete(post._id)}
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPost;
