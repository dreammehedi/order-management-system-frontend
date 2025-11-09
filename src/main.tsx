import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { theme } from "antd";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AuthInitializer from "./components/AuthInitializer";
import "./index.css";
import router from "./router/router";
import { persistor, store } from "./services/store";

const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider context={helmetContext}>
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
            <AuthInitializer>
              <RouterProvider router={router} />
            </AuthInitializer>
          </ConfigProvider>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
