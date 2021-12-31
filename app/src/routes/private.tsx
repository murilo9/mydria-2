import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";
import Post from "../features/posts/components/Post";
import MobileProfileCard from "../features/profiles/components/MobileProfileCard";
import ProfileCard from "../features/profiles/components/ProfileCard";
import ProfileLayout from "../features/profiles/layouts/ProfileLayout";

function PrivateRoutes() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<div>
            <h1>Feed</h1>
            <Post />
          </div>} />
          <Route path="profile">
            <Route path=":userId" element={
              <ProfileLayout detailsColumn={
                <>
                  <ProfileCard />
                  <MobileProfileCard />
                </>
              } postsList={<h1>Posts List</h1>} />
            } />
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