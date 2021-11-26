import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} caseSensitive={true} />
                <Route path="/personalizar" element={<Dashboard />} caseSensitive={true} />
            </Routes>
        </BrowserRouter>
    );
}