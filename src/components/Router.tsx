import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import FindChallengesPage from "../pages/FindChallengesPage";
import UserProfilePage from "../pages/UserProfilePage";
import IssueChallengePage from "../pages/IssueChallengePage";
import AuthenticationPage from "../pages/AuthenticationPage";
import AcceptChallengePage from "../pages/AcceptChallengePage";
import Error404Page from "../pages/Error404Page";
import LegalPolicyPage from "../pages/LegalPolicyPage";
import { APP_ROUTES } from "../core/routes";
import DeleteChallengePage from "../pages/DeleteChallengePage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTES["landing"].url} element={<LandingPage />} />
        <Route path={APP_ROUTES["auth"].url} element={<AuthenticationPage />} />
        <Route path={APP_ROUTES['home'].url} element={<FindChallengesPage />} />
        <Route path={APP_ROUTES['profile'].url} element={<UserProfilePage />} />
        <Route path={APP_ROUTES['issueChallenge'].url} element={<IssueChallengePage />} />
        <Route path={APP_ROUTES['acceptChallenge'].url} element={<AcceptChallengePage />} />
        <Route path={APP_ROUTES['legal'].url} element={<LegalPolicyPage/>} />
        <Route path={APP_ROUTES['delete'].url} element={<DeleteChallengePage/>} />
        <Route path={APP_ROUTES['deleteChallenge'].url} element={<DeleteChallengePage/>} />
        <Route path={APP_ROUTES['accept'].url} element={<AcceptChallengePage/>} />
        <Route path={APP_ROUTES['acceptChallenge'].url} element={<AcceptChallengePage/>} />
        <Route path={APP_ROUTES['notFound'].url} element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
