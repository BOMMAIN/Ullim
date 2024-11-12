import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouterPath } from "./path";
import Introduce from "@pages/Introduce";
import MyPage from "@pages/MyPage";
import CommunityPage from "@pages/CommunityPage";
import PostPage from "@pages/PostPage";
import PostWritePage from "@pages/PostWritePage";
import Layout from "@components/features/Layout";
import MedicalReportResultPage from "../pages/MediaclReportResultPage";
import AnalyzePage from "@pages/AnalyzePage"; 
import AnalyzeResultPage from "@pages/AnalyzeResultPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: RouterPath.root, element: <Introduce /> },
      { path: RouterPath.myPage, element: <MyPage /> },
      { path: RouterPath.communityPage, element: <CommunityPage /> },
      { path: RouterPath.postPage, element: <PostPage /> },
      { path: RouterPath.postWritePage, element: <PostWritePage /> },
      { path: RouterPath.medicalReportResultPage, element: <MedicalReportResultPage /> },  // 추가
      { path: RouterPath.analyzePage, element: <AnalyzePage />},
      { path: RouterPath.analyzeResultPage, element: <AnalyzeResultPage />}
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};