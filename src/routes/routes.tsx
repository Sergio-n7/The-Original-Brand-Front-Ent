import { ThemeProvider } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";

import { theme } from "../components/theme/Theme";
import NavBar from "../components/navBar/NavBar";
import Signin from "../components/signin/Signin";
import Register from "../components/register/Register";
import GarmetHome from "../components/garmets/GarmetHome";
import GarmetDetails from "../components/garmets/GarmetDetails";
import DashboardHome from "../components/dashboard/DashboardHome";
import DashboardUser from "../components/dashboard/DashboardUser";
import DashboardGarmet from "../components/dashboard/DashboardGarmet";
import GarmetEdit from "../components/dashboard/GarmetEdit";
import Container1 from "../components/container1/pictureHome";

const routes = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Container1} />
          <Route exact path="/" component={GarmetHome} />
          <Route path="/garmets/:garmetId" component={GarmetDetails} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={DashboardHome} />
          <Route exact path="/dashboard/user" component={DashboardUser} />
          <Route exact path="/dashboard/garmet" component={DashboardGarmet} />
          <Route path="/dashboard/product/:garmetId" component={GarmetEdit} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default routes;
