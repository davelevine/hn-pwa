// Components
import React, { useMemo } from "react";
import { Navbar, NavItem } from "./Navbar";
import {
  Route,
  Switch,
  NavLink
} from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Thread from "./Pages/Thread";
import User from "./Pages/User";
import ErrorHandler from "./Pages/ErrorHandler";

function App() {
  return (
    <div className="break-words dark:text-white">
      <Navbar>
        <NavLink
          activeClassName="bg-opacity-10 bg-black rounded-md dark:text-orange"
          to="/news"
          isActive={(match, location) => {
            if (!match && location.pathname === "/") {
              return true;
            }
            return match;
          }}
        >
          <NavItem>Top</NavItem>
        </NavLink>
        <NavLink
          activeClassName="bg-opacity-10 bg-black rounded-md dark:text-orange"
          to="/newest"
        >
          <NavItem>New</NavItem>
        </NavLink>
        <NavLink
          activeClassName="bg-opacity-10 bg-black rounded-md dark:text-orange"
          to="/best"
        >
          <NavItem>Best</NavItem>
        </NavLink>
        <NavLink
          activeClassName="bg-opacity-10 bg-black rounded-md dark:text-orange"
          to="/ask"
        >
          <NavItem>Ask</NavItem>
        </NavLink>
        <NavLink
          activeClassName="bg-opacity-10 bg-black rounded-md dark:text-orange"
          to="/show"
        >
          <NavItem>Show</NavItem>
        </NavLink>
      </Navbar>

      <main className="sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <Switch>
          <Route path="/" exact>
            <MemoizedHome sort="news" />
          </Route>

          {/* Handle category links */}
          <Route path="/news/:pageNum?">
            <MemoizedHome sort="news" />
          </Route>
          <Route path="/newest/:pageNum?">
            <MemoizedHome sort="newest" />
          </Route>
          <Route path="/ask/:pageNum?">
            <MemoizedHome sort="ask" />
          </Route>
          <Route path="/show/:pageNum?">
            <MemoizedHome sort="show" />
          </Route>
          <Route path="/best/:pageNum?">
            <MemoizedHome sort="best" />
          </Route>

          {/* Handle discussion threads */}
          <Route path="/item/:itemId">
            <Thread />
          </Route>

          {/* Handle user profiles */}
          <Route path="/user/:username">
            <User />
          </Route>

          {/* Handle all other routes */}
          <Route path="*">
            <ErrorHandler error="">
              <>
                <span style={{ fontSize: '24px', display: 'block' }}>404 error</span>
                <span style={{ display: 'block' }}>Not all those who wander are lost, but you are.</span>
              </>
            </ErrorHandler>
          </Route>

        </Switch>
      </main>
    </div>
  );
}

function HomeWrapper({ sort }) {
  const memoizedHome = useMemo(() => <Home sort={sort} />, [sort]);
  return memoizedHome;
}

const MemoizedHome = React.memo(HomeWrapper);

export default App;
