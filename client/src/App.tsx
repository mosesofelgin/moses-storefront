import { lazy, Suspense, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import GlobalNav from "./components/GlobalNav";
import { isFocusedRoutePath, shouldShowVaultGate } from "./lib/routePolicy";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import VaultGate, { isVaultUnlocked } from "./components/VaultGate";

const Links = lazy(() => import("./pages/Links"));
const ClarityProject = lazy(() => import("./pages/ClarityProject"));
const Success = lazy(() => import("./pages/Success"));
const Downloads = lazy(() => import("./pages/Downloads"));
const Listen = lazy(() => import("./pages/Listen"));
const Store = lazy(() => import("./pages/Store"));
const Connect = lazy(() => import("./pages/Connect"));
const Bathsheba = lazy(() => import("./pages/Bathsheba"));
const BathshebaListen = lazy(() => import("./pages/BathshebaListen"));
const Dedication = lazy(() => import("./pages/Mixtape"));
const Abcs = lazy(() => import("./pages/Abcs"));
const AbcsListen = lazy(() => import("./pages/AbcsListen"));
const IfIWroteAMixtape = lazy(() => import("./pages/IfIWroteAMixtape"));
const MixtapeListen = lazy(() => import("./pages/MixtapeListen"));
const NewGenesis = lazy(() => import("./pages/NewGenesis"));
const NewGenesisListen = lazy(() => import("./pages/NewGenesisListen"));
const Artist = lazy(() => import("./pages/Artist"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Event = lazy(() => import("./pages/Event"));
const Projects = lazy(() => import("./pages/Projects"));
const ClaritySales = lazy(() => import("./pages/ClaritySales"));

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-zinc-950 px-4 text-center text-zinc-400">
      <p className="font-display text-2xl tracking-[0.16em]">OPENING THE VAULT…</p>
    </div>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
      <Route path={"/success"} component={Success} />
      <Route path={"/downloads"} component={Downloads} />
      <Route path={"/clarity"} component={ClarityProject} />
      <Route path={"/links"} component={Links} />
      <Route path={"/listen"} component={() => <ErrorBoundary><Listen /></ErrorBoundary>} />
      <Route path={"/store"} component={Store} />
      <Route path={"/connect"} component={Connect} />
      <Route path={"/bathsheba/listen"} component={() => <ErrorBoundary><BathshebaListen /></ErrorBoundary>} />
      <Route path={"/bathsheba"} component={Bathsheba} />
      <Route path={"/dedication"} component={() => <ErrorBoundary><Dedication /></ErrorBoundary>} />
      <Route path={"/abcs/listen"} component={() => <ErrorBoundary><AbcsListen /></ErrorBoundary>} />
      <Route path={"/abcs"} component={Abcs} />
      <Route path={"/mixtape/listen"} component={() => <ErrorBoundary><MixtapeListen /></ErrorBoundary>} />
      <Route path={"/mixtape"} component={IfIWroteAMixtape} />
      <Route path={"/new-genesis/listen"} component={() => <ErrorBoundary><NewGenesisListen /></ErrorBoundary>} />
      <Route path={"/new-genesis"} component={NewGenesis} />
      <Route path={"/artist"} component={Artist} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/event"} component={Event} />
      <Route path={"/clarity-sales"} component={ClaritySales} />
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  const [vaultOpen, setVaultOpen] = useState(() => isVaultUnlocked());
  const [currentPath] = useLocation();

  const shouldShowGate = shouldShowVaultGate(currentPath, vaultOpen);
  const isFocusedRoute = isFocusedRoutePath(currentPath);

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
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-amber-400 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-zinc-950 focus:shadow-lg"
            >
              Skip to main content
            </a>
            {!isFocusedRoute && <GlobalNav />}
            <div id="main-content" tabIndex={-1}>
              <Router />
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
