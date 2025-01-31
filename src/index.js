import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import ReactDOM from "react-dom/client"
import React from 'react';
import Home from "./Pages/Home.jsx"
import History from "./Pages/History.jsx"

function Root() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="history" element={<History />} />
                </Route>
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Root/>
    </React.StrictMode>
)