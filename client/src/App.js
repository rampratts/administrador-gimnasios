import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";
import { UserContext } from './context/UserContext';

import Login from './components/login/Login';

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import UserRequests from "./api/UserRequests";

export default () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInfo, setUserInfo] = useContext(UserContext);
  
  const loadApp = async () => {
    try {
      const res = await UserRequests.verifyToken();
      if(res.data.auth) {
        setUserInfo({...userInfo, isLogged: true});
      }
    } catch (error) {
      setUserInfo({...userInfo, isLogged: false});
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => { 
    loadApp()
  }, [])

  if(!isLoaded) {
    return (<h1>Cargando</h1>); 
  }else if(!userInfo.isLogged) {
    return (
      <LoginApp/>
    )
  } else {
    return (
      <FullApp/>
    );
  }
}

const LoginApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route component={() => <Redirect to="/login"/>}/>
      </Switch>
    </Router>
  )
}

const FullApp = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const setUserData = async () => {
    const res = await UserRequests.verifyToken();
    if(res.data.auth) {
      setUserInfo({
        ...userInfo,
        nombre_usuario: res.data.nombre_usuario,
        tipo_usuario: res.data.tipo_usuario
      })
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    setUserData();
  }, [])

  if(!isLoaded){
    return (<h1>Cargando</h1>)
  } else { 
    return(
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          })}
        </div>
      </Router>
    )
  }
}
