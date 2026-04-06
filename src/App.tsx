import { Suspense, createContext, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import React from "react";
import { persistStore } from "redux-persist";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppContextType } from "./global/contexts";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./global/ThemeContext";
type Props = {
  assetMap?: {
    "styles.css": string;
    "main.js": string;
    manifest?: string;
    "vite-plugin-pwa:register-sw"?: string;
    "additional-styles": string[];
    "additional-jss": string[];
    initialContentMap: {
      title: string;
      description?: string;
      "hello-message"?: string;
    };
    baseUrl: string;
    initialI18nStore?: {}; //to be used with the middleware
    initialLanguage?: string;
    clientFirstAcceptLanguage?: string;
  };
};

//create a context to be used to pass app props down the component hierarcy, as the need arises.
export const AppContext = createContext<AppContextType>(null);

const App: React.FC<Props> = ({ assetMap }) => {
  const appBody = () => {
    //can be used at DEV time and PROD time

    //Default settings on dev mode
    let baseUrl = "/";
    // let title = "Hello World";

    if (assetMap) {
      //prod mode. Sent by ssr endpoint.
      baseUrl = assetMap.baseUrl;
      // title = assetMap.initialContentMap.title!;
    }

    let persister = persistStore(store);
    return (
      <AppContext.Provider value={{ baseUrl }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <ThemeProvider>
            <HelmetProvider>
                <Router>
                    <Routes>
                    <Route
                      path="/"
                      element={
                        <Suspense fallback={<PageLoader />}>
                          {React.createElement(
                            lazy(() => import("../src/pages/LandingPage"))
                          )}
                        </Suspense>
                      }
                    />
                      <Route
                        path="/dashboard"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(
                                () =>
                                  import(
                                    "../src/pages/DashboardPage"
                                  )
                              )
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="/transactions"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(
                                () =>
                                  import(
                                    "../src/pages/TransactionsPage"
                                  )
                              )
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="/accounts"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(
                                () =>
                                  import(
                                    "../src/pages/AccountsPage"
                                  )
                              )
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="/investments"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(
                                () =>
                                  import(
                                    "../src/pages/InvestmentsPage"
                                  )
                              )
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="/creditcards"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(
                                () =>
                                  import(
                                    "../src/pages/CreditCardsPage"
                                  )
                              )
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="/loans"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(
                                () =>
                                  import(
                                    "../src/pages/LoansPage"
                                  )
                              )
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="/services"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(
                                () =>
                                  import(
                                    "../src/pages/ServicesPage"
                                  )
                              )
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="/privileges"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(
                                () =>
                                  import(
                                    "../src/pages/PrivilegesPage"
                                  )
                              )
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="/insights"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(
                                () =>
                                  import(
                                    "../src/pages/InsightsPage"
                                  )
                              )
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="/settings"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(
                                () =>
                                  import(
                                    "../src/pages/SettingsPage"
                                  )
                              )
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="*"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            {React.createElement(
                              lazy(() => import("../src/pages/DashboardPage"))
                            )}
                          </Suspense>
                        }
                      />
                    </Routes>
                </Router>
            </HelmetProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </AppContext.Provider>
    );
  };

  //Prepare extra css if any
  const additionStyles = () => {
    if (assetMap) {
      let _additionStyles = assetMap["additional-styles"].map(
        (additionalStyle) => {
          return <link rel="stylesheet" href={additionalStyle} />;
        }
      );
      return _additionStyles;
    }
  };

  //Prepare extra Jss if any
  const additionalJss = () => {
    if (assetMap) {
      let _additionalJss = assetMap["additional-jss"].map((additionalJs) => {
        return <script src={additionalJs} />;
      });
      return _additionalJss;
    }
  };

  //compose conditional output
  const output = () => {
    if (assetMap) {
      //send whole document if ssr
      return (
        <html>
          <head>
            <link rel="stylesheet" href={assetMap["styles.css"]} />
            {/* additional Styles if any */}
            {additionStyles()}

            {assetMap["manifest"] && (
              <link rel="manifest" href={assetMap["manifest"]}></link>
            )}
            {assetMap["vite-plugin-pwa:register-sw"] && (
              <script
                id="vite-plugin-pwa:register-sw"
                src="/registerSW.js"
              ></script>
            )}
            {assetMap.initialContentMap && (
              <title>{assetMap.initialContentMap["title"]}</title>
            )}
          </head>
          {appBody()}
          {/* additional Jss if any*/}
          {additionalJss()}
        </html>
      );
    } else {
      return (
        <>
          {appBody()}
          {/* //only the body in dev mode. CSS should be available at
          dev mode with createRoot */}
        </>
      );
    }
  };
  return <>{output()}</>;
};

export default App;
