import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouterPath } from "./path";
import Introduce from "@pages/Introduce";
import MyPage from "@pages/MyPage";
import CommunityPage from "@pages/CommunityPage";
import PostPage from "@pages/PostPage";
import PostWritePage from "@pages/PostWritePage";
import Layout from "@components/features/Layout";
import DetailPage from "@pages/DetailPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: RouterPath.root, element: <Introduce /> },
      { path: RouterPath.myPage, element: <MyPage /> },
      { path: RouterPath.postPage, element: <PostPage /> },
      { path: RouterPath.communityPage, element: <CommunityPage /> },
      { path: RouterPath.postWritePage, element: <PostWritePage /> },
      { path: RouterPath.postDetailPage, element: <DetailPage /> },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
