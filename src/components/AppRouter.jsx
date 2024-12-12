import React from 'react';
import {SwitchTransition} from "react-transition-group";
import {Route, Routes} from "react-router-dom";
import Error from "../pages/Error";
import StockStorekeeper from "../pages/StockStorekeeper";
import Supplies from "../pages/Supplies";
import Planning from "../pages/Planning";
import AnalysisStock from "../pages/AnalysisStock";
import AnalysisDemand from "../pages/AnalysisDemand";
import LoginPage from "../pages/LoginPage";
import Stock from "../pages/Stock";
import ProtectedRoute from "./ProtectedRoute";
import RegistrPage from "../pages/RegistrPage";

const AppRouter = ({setIsAuthenticated}) => {
    return (
        <SwitchTransition>
            <Routes>
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/registr" element={<RegistrPage setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/stock-keeper" element={<ProtectedRoute><StockStorekeeper/></ProtectedRoute>}/>
                <Route path="/stock" element={<ProtectedRoute><Stock/></ProtectedRoute>}/>
                <Route path="/supplies" element={<ProtectedRoute><Supplies/></ProtectedRoute>}/>
                <Route path="/error" element={<ProtectedRoute><Error/></ProtectedRoute>}/>
                <Route path="/planning" element={<ProtectedRoute><Planning/></ProtectedRoute>}/>
                <Route path="/analysstock" element={<ProtectedRoute><AnalysisStock/></ProtectedRoute>}/>
                <Route path="/analysdemand" element={<ProtectedRoute><AnalysisDemand/></ProtectedRoute>}/>
                <Route path="*" element={<ProtectedRoute><Error/></ProtectedRoute>}/>
            </Routes>
        </SwitchTransition>
    );
};

export default AppRouter;