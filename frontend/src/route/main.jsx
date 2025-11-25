import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// ĐÚNG: đi lên 1 cấp từ src/route -> src
import "../index.css";

import { AuthProvider } from "@auth/useAuth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
