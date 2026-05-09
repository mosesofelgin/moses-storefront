import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Links from "./pages/Links";
import ClarityProject from "./pages/ClarityProject";
import Success from "./pages/Success";
import Downloads from "./pages/Downloads";
import Listen from "./pages/Listen";
import Store from "./pages/Store";
import Connect from "./pages/Connect";
import Bathsheba from "./pages/Bathsheba";
import BathshebaListen from "./pages/BathshebaListen";
import Dedication from "./pages/Mixtape";
import IfIWroteAMixtape from "./pages/IfIWroteAMixtape";
import MixtapeListen from "./pages/MixtapeListen";
import NewGenesis from "./pages/NewGenesis";
import NewGenesisListen from "./pages/NewGenesisListen";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/success"} component={Success} />
      <Route path={"/downloads"} component={Downloads} />
      <Route path={"/clarity"} component={ClarityProject} />
      <Route path={"/links"} component={Links} />
      <Route path={"/listen"} component={Listen} />
      <Route path={"/store"} component={Store} />
      <Route path={"/connect"} component={Connect} />
      <Route path={"/bathsheba/listen"} component={BathshebaListen} />
      <Route path={"/bathsheba"} component={Bathsheba} />
      <Route path={"/dedication"} component={Dedication} />
      <Route path={"/mixtape/listen"} component={MixtapeListen} />
      <Route path={"/mixtape"} component={IfIWroteAMixtape} />
      <Route path={"/new-genesis/listen"} component={NewGenesisListen} />
      <Route path={"/new-genesis"} component={NewGenesis} />
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
