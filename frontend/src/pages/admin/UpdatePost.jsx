import { useEffect, useState } from "react";
import {
  useUpdatePostMutation,
  useGetSinglePostQuery,
  useUploadImageMutation,
} from "../../redux/api/post";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const UpdatePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    name: "",
    detail: "",
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const { data: initialPostData } = useGetSinglePostQuery(id);
  const [updatePost] = useUpdatePostMutation();
  const [uploadImage] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (initialPostData) {
      setPost({
        name: initialPostData.name,
        detail: initialPostData.detail,
        genre: initialPostData.genre,
      });
    }
  }, [initialPostData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let updatedPost = { ...post };
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const imageResponse = await uploadImage(formData).unwrap();
        updatedPost = { ...updatedPost, image: imageResponse.image };
        console.log("Updating post with image:", updatedPost); // Log the updated post
      } catch (error) {
        console.error("Error uploading image:", error); // Log the error
        toast.error("Failed to upload image");
        return;
      }
    }

    try {
      console.log("Updating post:", updatedPost); // Log the updated post data
      const response = await updatePost({ id, ...updatedPost }).unwrap();
      console.log("Update response:", response); // Log the response
      toast.success("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error); // Log the error
      toast.error("Failed to update post");
    }
  };
  return (
    <div>
      <form onSubmit={handleUpdate} className="px-5 md:px-4 lg:px-3 xl:px-0">
        <div className="border-b-[1px] border-b-gray-200">
          <div className="container mx-auto py-2 flex justify-between items-center">
            <h1 className="text-2xl font-medium text-gray-700">Update Post</h1>
            <div className="flex items-center">
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="my-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            <div className="border text-gray-400 border-dashed border-gray-300 relative rounded-lg">
              <input
                type="file"
                onChange={handleImageChange}
                className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
              />
              <div className="text-center flex items-center h-full justify-center p-10 absolute top-0 right-0 left-0 m-auto">
                <div>
                  <h4>
                    Drop files anywhere to upload
                    <br />
                    or
                  </h4>
                  <p className="">Select Files</p>
                </div>
              </div>
              {imageName && (
                <div className="text-gray-800 text-sm mb-2 block">
                  Selected file: {imageName}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                <input
                  name="name"
                  type="text"
                  value={post.name}
                  onChange={handleInputChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Description
                </label>
                <textarea
                  name="detail"
                  type="text"
                  value={post.detail}
                  onChange={handleInputChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter description"
                ></textarea>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Genre
                </label>
                <select
                  name="genre"
                  value={post.genre}
                  onChange={handleInputChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                >
                  {isLoadingGenres ? (
                    <option>Loading genres...</option>
                  ) : (
                    genres.map((genre) => (
                      <option key={genre._id} value={genre._id}>
                        {genre.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
