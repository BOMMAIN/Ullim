import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouterPath } from "./path";
import Introduce from "@pages/Introduce";
import MyPage from "@pages/MyPage";
import CommunityPage from "@pages/CommunityPage";
import PostPage from "@pages/PostPage";
import PostWritePage from "@pages/PostWritePage";
import Layout from "@components/features/Layout";
import Login from "@pages/Login";
import SignUp from "@pages/SignUp";
import Onboarding1 from "@pages/Onboarding1";
import Onboarding2 from "@pages/Onboarding2";
import Onboarding3 from "@pages/Onboarding3";
import Onboarding4 from "@pages/Onboarding4";
import HeartList from "@pages/HeartList";



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: RouterPath.root, element: <Introduce /> },
      { path: RouterPath.myPage, element: <MyPage /> },
      { path: RouterPath.communityPage, element: <CommunityPage /> },
      { path: RouterPath.postPage, element: <PostPage /> },
      { path: RouterPath.postWritePage, element: <PostWritePage /> },
      { path: RouterPath.login, element: <Login /> },
      { path: RouterPath.signup, element: <SignUp /> },
      { path: RouterPath.onboarding1, element: <Onboarding1 /> },
      { path: RouterPath.onboarding2, element: <Onboarding2 /> },
      { path: RouterPath.onboarding3, element: <Onboarding3 /> },
      { path: RouterPath.onboarding4, element: <Onboarding4 /> },
      { path: RouterPath.heartlist, element: <HeartList /> }
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
