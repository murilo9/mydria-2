import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function AppRoutes() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="route1" element={<h1>Route1</h1>} />
        <Route path="route1/child1" element={<h1>Route1 Child1</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default AppRoutes