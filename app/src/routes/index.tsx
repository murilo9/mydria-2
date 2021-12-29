import React from "react";
import PrivateRoutes from "./private";

import PublicRoutes from './public';

function AppRoutes() {
  const token = 'afea';
  return token ? <PrivateRoutes /> : <PublicRoutes />
}

export default AppRoutes