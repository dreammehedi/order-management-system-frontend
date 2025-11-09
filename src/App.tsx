// // App.tsx
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ConfigProvider, theme } from "antd";
// import { BrowserRouter, useRoutes } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import { routes } from "./router/router";

// const queryClient = new QueryClient();

const Router = () => {
  const routing = useRoutes(routes);
  return routing;
};

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ConfigProvider
//       theme={{
//         algorithm: theme.darkAlgorithm,
//         token: {
//           colorPrimary: "#3b82f6",
//           colorBgContainer: "hsl(220, 13%, 11%)",
//           colorBgElevated: "hsl(220, 13%, 11%)",
//           colorBorder: "hsl(220, 13%, 18%)",
//           colorText: "hsl(210, 40%, 98%)",
//           colorTextSecondary: "hsl(215, 20%, 65%)",
//         },
//       }}
//     >
//       <BrowserRouter>
//         <AuthProvider>
//           <Router />
//         </AuthProvider>
//       </BrowserRouter>
//     </ConfigProvider>
//   </QueryClientProvider>
// );

// export default App;
// App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./contexts/AuthContext";

import { persistor, store } from "./services/store";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: "#3b82f6",
              colorBgContainer: "hsl(220, 13%, 11%)",
              colorBgElevated: "hsl(220, 13%, 11%)",
              colorBorder: "hsl(220, 13%, 18%)",
              colorText: "hsl(210, 40%, 98%)",
              colorTextSecondary: "hsl(215, 20%, 65%)",
            },
          }}
        >
          <BrowserRouter>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </BrowserRouter>
        </ConfigProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

export default App;
