import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import GlobalNav from "./components/GlobalNav";
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
import Abcs from "./pages/Abcs";
import AbcsListen from "./pages/AbcsListen";
import IfIWroteAMixtape from "./pages/IfIWroteAMixtape";
import MixtapeListen from "./pages/MixtapeListen";
import NewGenesis from "./pages/NewGenesis";
import NewGenesisListen from "./pages/NewGenesisListen";
import Artist from "./pages/Artist";
import Checkout from "./pages/Checkout";
import VaultGate, { isVaultUnlocked } from "./components/VaultGate";
import Event from "./pages/Event";
import ClaritySales from "./pages/ClaritySales";

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
      <Route path={"/abcs/listen"} component={AbcsListen} />
      <Route path={"/abcs"} component={Abcs} />
      <Route path={"/mixtape/listen"} component={MixtapeListen} />
      <Route path={"/mixtape"} component={IfIWroteAMixtape} />
      <Route path={"/new-genesis/listen"} component={NewGenesisListen} />
      <Route path={"/new-genesis"} component={NewGenesis} />
      <Route path={"/artist"} component={Artist} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/event"} component={Event} />
      <Route path={"/clarity-sales"} component={ClaritySales} />
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
  const [vaultOpen, setVaultOpen] = useState(() => isVaultUnlocked());
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Gate only shows on homepage; sales/event/links pages bypass it
  const bypassPaths = ['/clarity-sales', '/event', '/links', '/checkout', '/artist'];
  const shouldShowGate = !vaultOpen && !bypassPaths.some(path => currentPath.startsWith(path));

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {shouldShowGate && (
            <VaultGate onUnlock={() => setVaultOpen(true)} />
          )}
          <div
            className={shouldShowGate ? 'pointer-events-none select-none opacity-0' : ''}
            aria-hidden={shouldShowGate}
          >
            <GlobalNav />
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
