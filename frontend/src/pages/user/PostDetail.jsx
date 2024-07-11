import { ArrowLeft, SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useGetSinglePostQuery,
  useAddCommentMutation,
} from "../../redux/api/post";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

const PostDetail = () => {
  const { id: postId } = useParams();
  const [comment, setComment] = useState("");
  const { data: post, refetch } = useGetSinglePostQuery(postId);
  const { userInfo } = useSelector((state) => state.auth);
  const [addComment] = useAddCommentMutation();

  const handleAddComment = async (e) => {
    e.preventDefault();

    const userHasCommented = post?.comments?.some(
      (c) => c.user === userInfo?._id
    );

    if (userHasCommented) {
      toast.error("You've already commented on this post");
      return;
    }

    try {
      await addComment({ id: postId, comment: { comment } }).unwrap();
      setComment("");
      refetch();
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };
  return (
    <div>
      <Link
        to="/"
        className="z-10 bg-white absolute p-3 rounded-full border-[1px] border-gray-200 ml-5"
      >
        <ArrowLeft size={20} />
      </Link>
      <div className="w-[27rem] md:w-[40rem] lg:w-[65rem] xl:w-[65rem] mx-auto my-10 rounded-3xl relative shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            <img
              className="rounded-3xl w-full lg:rounded-r-none md:w-full"
              src={post?.image}
              alt={post?.name}
            />
          </div>
          <div>
            <div className="m-8">
              <div className="flex flex-col gap-y-5">
                <h1 className="text-3xl text-gray-800 font-semibold">
                  {post?.name}
                </h1>
                <p className="text-gray-700 font-medium">{post?.detail}</p>
              </div>
              <div className="mt-8">
                <div>
                  <h1 className="font-semibold text-xl mb-6">Comments</h1>
                  <div className="h-auto overflow-y-auto scroll-smooth">
                    {post?.comments?.map((c, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-center justify-between">
                          <h1 className="font-medium text-md underline">
                            {c.name}
                          </h1>
                          <span className="text-gray-500 text-xs">
                            {new Date(c.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <p>{c.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {userInfo ? (
                    <form
                      onSubmit={handleAddComment}
                      className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300"
                    >
                      <input
                        type="text"
                        placeholder="add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
                        name="topic"
                      />
                      <button
                        type="submit"
                        className="flex flex-row items-center justify-center px-3 rounded-full  border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-red-500 text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3"
                      >
                        <SendHorizontal size={17} />
                      </button>
                    </form>
                  ) : (
                    <p className="text-red-500 mt-4">
                      Please log in to add a comment.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
