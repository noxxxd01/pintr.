import { apiSlice } from "./apiSlice";
import { POST_URL, UPLOAD_URL } from "../constants";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => `${POST_URL}/posts`,
    }),

    createPost: builder.mutation({
      query: (newPost) => ({
        url: `${POST_URL}/create-post`,
        method: "POST",
        body: newPost,
      }),
    }),

    updatePost: builder.mutation({
      query: ({ id, updatedPost }) => ({
        url: `${POST_URL}/update-post/${id}`,
        method: "PUT",
        body: updatedPost,
      }),
    }),

    addComment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `${POST_URL}/${id}/comments`,
        method: "POST",
        body: comment,
      }),
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/delete-post/${id}`,
        method: "DELETE",
      }),
    }),

    getSinglePost: builder.query({
      query: (id) => `${POST_URL}/posts/${id}`,
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useCreatePostMutation,
  useUploadImageMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddCommentMutation,
  useGetSinglePostQuery,
} = postApiSlice;
