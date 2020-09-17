import React from 'react'
import './App.sass'
import Layout from './components/layout'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {
    RutorView,
    PlayerView,
    HomeView
} from "./views";

function App() {

    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <HomeView />
                    </Route>
                    <Route path="/rutor">
                        <RutorView />
                    </Route>
                    <Route path="/player/:infoHash/:fileIndex?">
                        <PlayerView />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );

}

export default App
