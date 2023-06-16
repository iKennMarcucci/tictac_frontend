import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "@/utils/AxiosInstance.tsx";
import { CircularProgress } from "@mui/material";

const tabsData = [
  { id: 0, title: "Todos", },
  { id: 1, title: "Relaciones sociales y practicas cívicas", },
  { id: 2, title: "Sexualidad y construcción de ciudadanía", },
  { id: 3, title: "Educación ambiental", },
  { id: 4, title: "Emprendimiento", },
  { id: 5, title: "TIC", },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [eje, setEje] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsLoading(true);
    switch (id) {
      case 1:
        setEje("1");
        break;
      case 2:
        setEje("2");
        break;
      case 3:
        setEje("3");
        break;
      case 4:
        setEje("4");
        break;
      case 5:
        setEje("5");
        break;
      default:
        setEje("0");
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/herramienta/list/institucion?eje=${eje}`);
        const data = response.data.map((item) => ({
          id: item.idHerramienta,
          titulo: item.nombreHerramienta,
          autor: item.docenteAutor,
        }));
        setRows(data);
        console.log(rows);
        console.log(activeTab);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [eje]);

  return (
    <div className="w-full">
      <ul className="flex">
        {tabsData.map((tab, index) => (
          <li key={tab.id}>
            <button
              className={`${activeTab === index
                ? "bg-white text-azul-50 border-azul-50"
                : "bg-gray-100"
                } text-sm px-4 py-2 text-gray-500 font-semibold uppercase border-b-2 transition duration-300`}
              //onClick={() => setActiveTab(index)}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          rows.length == 0 ? (
            <p>No se encontraron herramientas...</p>
          ) : (


            <div className="mt-4">
              {rows.map((tab, _index) => (
                <div
                  className="border-2 border-gray-100 max-w-4xl shadow-sm rounded-md p-4"
                  key={tab.id}
                //hidden={activeTab !== 0}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold">{tab.titulo}</p>
                    <Link to={`/menu-lideres/verherramienta/${tab.nombreHerramienta}`}>
                      <button
                        className="bg-azul-50 hover:bg-azul-100 text-white font-medium px-6 py-2 rounded-md transition duration-300"
                        type="button"
                      >
                        Ver
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
              {/* {rows.map((tab, index) => (
          <div
            className="border-2 border-gray-100 max-w-4xl shadow-sm rounded-md p-4"
            key={tab.id}
            hidden={activeTab !== index || activeTab === 0}
          >
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">{tab.nombreHerramienta}</p>
              <Link to={`/menu-lideres/verherramienta/${tab.nombreHerramienta}`}>
                <button
                  className="bg-azul-50 hover:bg-azul-100 text-white font-medium px-6 py-2 rounded-md transition duration-300"
                  type="button"
                >
                  Ver
                </button>
              </Link>
            </div>
          </div>
        ))} */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tabs;
