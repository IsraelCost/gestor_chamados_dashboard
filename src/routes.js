import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} caseSensitive={true} />
                <Route path="/dashboard" element={<Dashboard isPersonalizatePage={false} />} caseSensitive={true} />
                <Route path="/personalizar" element={<Dashboard isPersonalizatePage={true} />} caseSensitive={true} />
            </Routes>
        </BrowserRouter>
    );
}