import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { LensProvider } from "@lens-protocol/react-web";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
const { provider, webSocketProvider } = configureChains(
  [polygon, mainnet],
  [publicProvider()]
);
import { LensConfig, development } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { RouterProvider } from "react-router-dom";
import { routerConfig } from "./router/router.config.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const authenticate = async () => {};

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
};
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig client={client}>
        <LensProvider config={lensConfig}>
          <RouterProvider router={routerConfig} />
        </LensProvider>
      </WagmiConfig>
    </Provider>
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <>
//       <>
//         <Provider store={store}>
//           <RouterProvider router={routerConfig} />
//         </Provider>
//       </>
//     </>
//   </React.StrictMode>
// );
