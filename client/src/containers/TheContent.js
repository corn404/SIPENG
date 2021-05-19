import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "../routes";
import routes_fakultas from "../routes_fakultas";
import { useSelector } from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  const users = useSelector((x) => x.users.currentUser);
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {users.role === "admin" ? (
              <>
                {routes.map((route, idx) => {
                  return (
                    route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (
                          <CFade>
                            <route.component {...props} />
                          </CFade>
                        )}
                      />
                    )
                  );
                })}
              </>
            ) : (
              <>
                {routes_fakultas.map((route, idx) => {
                  return (
                    route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (
                          <CFade>
                            <route.component {...props} />
                          </CFade>
                        )}
                      />
                    )
                  );
                })}
              </>
            )}

            <Redirect from="/" to="/pengaduan" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
