import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function PrivateRoutes() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Feed</h1>} />
        <Route path="profile">
          <Route path=":userId" element={<h1>User Profile</h1>} />
          <Route index element={<Navigate to="/" />} />
        </Route>
        <Route path="post">
          <Route path=":userId" element={<h1>Some Post</h1>} />
          <Route index element={<Navigate to="/" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default PrivateRoutes