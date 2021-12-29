import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function PublicRoutes() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route index element={<h1>Login or Sign Up</h1>} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default PublicRoutes