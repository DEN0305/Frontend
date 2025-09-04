import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import List from "./List";
import Form from "./Form";

import { ArticuloCaracteristicaProvider } from "context/ArticuloCaracteristicaContext";
import { ArticuloProvider } from "context/ArticuloContext";
import { CaracteristicaProvider } from "context/CaracteristicaContext";

const Index = () => {

    return(
        <>
        <ArticuloProvider>
        <CaracteristicaProvider>
        <ArticuloCaracteristicaProvider>
        <Routes>
            <Route exact path="/" element={<List />} />
            <Route exact path="/detail/:id" element={<Form />} />
            <Route exact path="/add" element={<Form />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </ArticuloCaracteristicaProvider>
        </CaracteristicaProvider>
        </ArticuloProvider>
        </>
    );
}

export default Index;
