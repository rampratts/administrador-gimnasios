import React, { useEffect, useState } from "react";
import instance from '../../api/axios.instance';

import {
  Card,
  CardHeader,
} from "shards-react";

const Ubicacion = () => {
  const [ubicacion, setUbicacion] = useState("");

  const getUbicacion = async () => {
    const res = await instance.get('gimnasios/');
    setUbicacion(res.data.direccion);
  }

  useEffect(() => {
    getUbicacion();
  }, [])

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h4 className="m-0 ml-3">Ubicación - {ubicacion}</h4>
      </CardHeader>
        <iframe height="375px" title="map" id="gmap_canvas" style={{borderRadius: '0px 0px 8px 8px'}} src={`https://maps.google.com/maps?q=${encodeURI(ubicacion)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    </Card>
  );
}

export default Ubicacion;
