import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouterPath } from "./path";
import Introduce from "../pages/Introduce";
import MyPage from "../pages/MyPage";
import CommunityPage from "../pages/CommunityPage";
import PostPage from "../pages/PostPage";
import PostWritePage from "../pages/PostWritePage";

const router = createBrowserRouter([
  { path: RouterPath.root, element: <Introduce /> },
  { path: RouterPath.myPage, element: <MyPage /> },
  { path: RouterPath.communityPage, element: <CommunityPage /> },
  { path: RouterPath.postPage, element: <PostPage /> },
  { path: RouterPath.postWritePage, element: <PostWritePage /> },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
