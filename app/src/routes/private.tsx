import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";

function PrivateRoutes() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<h1>Feed</h1>} />
          <Route path="profile">
            <Route path=":userId" element={<h1>User Profile</h1>} />
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