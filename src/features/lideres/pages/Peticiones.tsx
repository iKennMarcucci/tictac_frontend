import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Header } from "@/components";
import { TabsPeticiones } from "@/features/directivos/components";

const Peticiones = () => {
    const location = useLocation();

    useEffect(() => {
      const htmlElement = document.querySelector("html");
      if (htmlElement) {
        // Verificación de nulidad
        htmlElement.style.scrollBehavior = "auto";
        window.scroll({ top: 0 });
        htmlElement.style.scrollBehavior = "";
      }
    }, [location.pathname]); // triggered on route change
  
    return (
        <div>
            <Header titulo="Listado de Peticiones" subtitulo="Listado"/>
            <div className="mt-3">
                <TabsPeticiones />
            </div>
        </div>
    );
};

export default Peticiones;