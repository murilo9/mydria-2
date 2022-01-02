import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";
import FeedProvider from "../features/posts/components/FeedProvider";
import ProfileProvider from "../features/profiles/components/ProfileProvider";

function PrivateRoutes() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<FeedProvider />} />
          <Route path="profile">
            <Route path=":userId" element={<ProfileProvider />} />
            <Route index element={<Navigate to="/" />} />
          </Route>
          <Route path="post">
            <Route path=":userId" element={<h1>Some Post</h1>} />
            <Route index element={<Navigate to="/" />} />
          </Route>
          <Route path="404" element={<h1>Not found</h1>}>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default PrivateRoutes