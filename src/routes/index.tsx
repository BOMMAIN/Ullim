import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouterPath } from "./path";
import Introduce from "@pages/Introduce";
import MyPage from "@pages/MyPage";
import CommunityPage from "@pages/CommunityPage";
import PostPage from "@pages/PostPage";
import PostWritePage from "@pages/PostWritePage";
import Layout from "@components/features/Layout";
import MedicalReportResultPage from "@pages/MediaclReportResultPage";
import AnalyzeECGPage from "@pages/AnalyzeECGPage"; 
import AnalyzeECGResultPage from "@pages/AnalyzeECGResultPage";
import AnalyzeDiagnosisPage from "@pages/AnalyzeDiagnosisPage";

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
      { path: RouterPath.analyzePage, element: <AnalyzeECGPage />},
      { path: RouterPath.analyzeResultPage, element: <AnalyzeECGResultPage />},
      { path: RouterPath.analyzeDiagnosisPage, element: <AnalyzeDiagnosisPage />}
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};