// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { AuthProvider } from "./context/AuthContext";
// import { HelmetProvider } from "react-helmet-async"; // ✅ use async version
// import ErrorBoundary from "./components/ErrorBoundary"; // ✅ import your component

// const root = createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <ErrorBoundary>
//       <HelmetProvider>
//         <AuthProvider>
//             <App />
//         </AuthProvider>
//       </HelmetProvider>
//     </ErrorBoundary>
//   </React.StrictMode>
// );


import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";


const root = createRoot(document.getElementById("root"));
root.render(
<App/>
);
