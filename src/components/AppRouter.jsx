import React from 'react';
import {SwitchTransition} from "react-transition-group";
import {Route, Routes} from "react-router-dom";
import Error from "../pages/Error";
import StockStorekeeper from "../pages/StockStorekeeper";
import Supplies from "../pages/Supplies";
import Planning from "../pages/Planning";
import AnalysisStock from "../pages/AnalysisStock";
import AnalysisDemand from "../pages/AnalysisDemand";
import Auth from "../pages/Auth";

const AppRouter = () => {
    return (
        <SwitchTransition>
            <Routes>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/stock-keeper" element={<StockStorekeeper/>}/>
                <Route path="/supplies" element={<Supplies/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/planning" element={<Planning/>}/>
                <Route path="/analysstock" element={<AnalysisStock/>}/>
                <Route path="/analysdemand" element={<AnalysisDemand/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </SwitchTransition>
    );
};

export default AppRouter;