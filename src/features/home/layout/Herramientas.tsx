import { Header } from "@/features/home/components";
import { useState, useEffect } from "react";
import axios from "@/utils/AxiosInstance.tsx";
import { Link } from 'react-router-dom';
import { herramientas } from "@/features/home/utils/herramientas";
import { CircularProgress } from "@mui/material";

const Herramientas = () => {
  // const filters = [
  //   {
  //     label: "Relaciones sociales y practicas civicas",
  //     value: "relacionesSocialesYPracticasCivicas",
  //   },
  //   {
  //     label: "Sexualidad y construcción de ciudadanía",
  //     value: "sexualidadYConstrucciónDeCiudadanía",
  //   },
  //   { label: "Educación ambiental", value: "educaciónAmbiental" },
  //   { label: "Emprendimiento", value: "emprendimiento" },
  //   { label: "Tic", value: "tic" },
  // ];

  const tabsData = [
    { id: 1, title: "Relaciones sociales y practicas cívicas", },
    { id: 2, title: "Sexualidad y construcción de ciudadanía", },
    { id: 3, title: "Educación ambiental", },
    { id: 4, title: "Emprendimiento", },
    { id: 5, title: "TIC", },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [eje, setEje] = useState('1');

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  // const [selectedFilter, setSelectedFilter] = useState<string>(
  //   filters[0].value
  // );

  // const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedFilter(event.target.value);
  // };

  // Filtrar las cartas según el filtro seleccionado
  // const filteredHerramientas = herramientas.filter(
  //   (herramienta) => herramienta.categoria === selectedFilter
  // );
  const handleTabClick = (id) => {
    setActiveTab(id - 1);
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
        setEje("1");
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/herramienta/list/home?eje=${eje}`);
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
    <section className="px-12 py-10" id="contenido-audiovisual">
      <Header titulo="Herramientas" />
      <div className="flex flex-wrap gap-3 items-center mt-8 w-full overflow-x-auto">
        <ul className="flex">
          {tabsData.map((tab, index) => (
            <li key={tab.id}>
              <button
                className={`${activeTab === index
                  ? "bg-azul-100 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700 transition duration-300"
                  } px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 text-center text-sm md:text-base`}
                //onClick={() => setActiveTab(index)}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Mostrar las cartas filtradas */}
      <div className="mt-4">
        <div>
          {isLoading ? (
            <CircularProgress />
          ) : (
            rows.length == 0 ? (
              <p>No se encontraron herramientas...</p>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                {rows.map((tab, _index) => (
                  <div style={{flexBasis: '40%', flexGrow: 0, margin:10}} 
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
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )


  // return (
  //   <section className="px-12 py-10" id="herramientas">
  //     <Header titulo="Herramientas" />
  //     <div className="flex flex-wrap gap-3 items-center mt-8 w-full overflow-x-auto">
  //       {tabsData.map((filter) => (
  //         <label
  //           key={filter.id}
  //           className={`${
  //             selectedFilter === filter.value
  //               ? "bg-azul-100 text-white"
  //               : "bg-gray-200 hover:bg-gray-300 text-gray-700 transition duration-300"
  //           } px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 text-center text-sm md:text-base`}
  //         >
  //           <input
  //             type="radio"
  //             name="filter"
  //             value={filter.value}
  //             checked={selectedFilter === filter.value}
  //             onChange={handleFilterChange}
  //             className="sr-only"
  //           />
  //           {filter.label}
  //         </label>
  //       ))}
  //     </div>
  //     <div className="mt-8 flex justify-center flex-col gap-3">
  //       {filteredHerramientas.map((herramienta) => (
  //         <div
  //           key={herramienta.id}
  //           className="bg-white rounded-lg shadow-md max-w-[800px] flex items-center justify-between"
  //         >
  //           <h3 className="font-semibold text-sm md:text-lg mb-2 rounded-tl-lg rounded-tr-lg p-3">
  //             {herramienta.titulo}
  //           </h3>
  //           <button className="text-sm md:text-base px-4 py-1 bg-azul-50 hover:bg-azul-100 transition duration-300 rounded-lg text-white font-medium">
  //             Ver
  //           </button>
  //         </div>
  //       ))}
  //     </div>
  //   </section>
  // );
};

export default Herramientas;
