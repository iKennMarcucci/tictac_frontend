import { useState, useEffect } from "react";
import { Link, useNavigate  } from 'react-router-dom';
import axios from "@/utils/AxiosInstance.tsx";
import { CircularProgress } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const tabsData = [
  { id: 0, title: "Todos", },
  { id: 1, title: "Relaciones sociales y practicas cívicas", },
  { id: 2, title: "Sexualidad y construcción de ciudadanía", },
  { id: 3, title: "Educación ambiental", },
  { id: 4, title: "Emprendimiento", },
  { id: 5, title: "TIC", },
];

const TabsPeticiones = () => {
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const handleMensajeChange = (event) => {
    setMensaje(event.target.value);
    console.log(mensaje);
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/herramienta/listPendientes/institucion?documento=${localStorage.getItem("documento")}`);
        const data = response.data.map((item) => ({
          id: item.idHerramienta,
          titulo: item.nombreHerramienta,
          autor: item.docenteAutor,
        }));
        setRows(data);
        console.log(rows);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoading]);

  const handleClick = async (id, mensaje, estado) => {
    const formData = {
      mensaje: mensaje,
      estado: estado,
    };
    try {
      setIsLoading(true)
      const response = await axios.put(`/herramienta/validar/${id}`, formData);
      setMensaje("");
      console.log('Exito', response.data);
    } catch (error) {
      setMensaje("");
      console.error('Error', error);
    }
  };

  return (
    <div className="w-full">
      <ul className="flex">
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
                  key={tabsData.id}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold">{tab.titulo}</p>
                    <Link to={`/menu-lideres/verherramienta/${tab.content}`}>
                      <button
                        className="bg-azul-50 hover:bg-azul-100 text-white font-medium px-6 py-2 rounded-md transition duration-300"
                        type="button"
                      >
                        Ver
                      </button>
                    </Link>
                    <Accordion >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Respuesta</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <textarea onChange={handleMensajeChange} name="feedback" id="feedback" cols={20} rows={3} style={{ padding: "5px", border: "1px solid", borderRadius: 5 }} placeholder="Feedback" />
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={3}
                          style={{ margin: 0 }}
                        >
                          <Grid item xs style={{ padding: 0 }}>
                            <button
                              style={{ background: "#0F08", border: "1px solid", borderRadius: "50%", width: 30, height: 30 }}
                              onClick={() => handleClick(tab.id, mensaje, 1)}
                              >
                              Si
                            </button>
                          </Grid>
                          <Grid item xs={6} style={{ padding: 0 }}>
                            <p>
                              ¿Validar?
                            </p>
                          </Grid>
                          <Grid item xs style={{ padding: 0 }}>
                            <button
                              style={{ background: "#F008", border: "1px solid", borderRadius: "50%", width: 30, height: 30 }}
                              onClick={() => handleClick(tab.id, mensaje, 0)}
                              >
                              No
                            </button>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TabsPeticiones;
