import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import PrivateRoute from "./pages/auth/PrivateRoute.jsx";
import Profile from "./pages/user/Profile.jsx";
import AdminRoute from "./pages/admin/AdminRoute.jsx";
import GenreLists from "./pages/admin/GenreLists.jsx";
import CreatePost from "./pages/admin/CreatePost.jsx";
import AllPost from "./pages/admin/AllPost.jsx";
import UpdatePost from "./pages/admin/UpdatePost.jsx";
import PostDetail from "./pages/user/PostDetail.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/genre" element={<GenreLists />} />
        <Route path="/admin/post/create" element={<CreatePost />} />
        <Route path="/admin/posts" element={<AllPost />} />
        <Route path="/admin/post/update-post/:id" element={<UpdatePost />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
