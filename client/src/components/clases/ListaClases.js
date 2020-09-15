import React, { useState, useEffect } from "react";

import {
  Row
} from "shards-react";
import Spinner from '../utils/Spinner';
import ClaseItem from './ClaseItem';
import ClasesRequests from "../../api/ClasesRequests";

const ListaClases = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clases, setClases] = useState([]);
  const [clasesDeUsuario, setClasesDeUsuario] = useState([]);
  
  const loadClases = async () => {
    setIsLoading(true);

    try {
      const res = await ClasesRequests.getClases();
      const clasesDeUsuarioRes = await ClasesRequests.clasesDeUsuario();
      setClases(res.data);

      clasesDeUsuarioRes.data.forEach(clase => {
        setClasesDeUsuario([...clasesDeUsuario, clase.id])
      });
    } catch (error) {
      
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadClases()
  }, [])

  if(isLoading){
    return (
      <Spinner />
    )
  } else {
    return (
      <Row>
        {
          clases.length ? 
          clases.map(clase => (
            <ClaseItem clase={clase} registrado={clasesDeUsuario.includes(clase.id)} />
          ))
          :
          <p>No hay clases registradas en el sistema.</p>
        }
      </Row>
    ); 
  } 
}

export default ListaClases;
