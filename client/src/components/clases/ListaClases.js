import React from "react";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "shards-react";

const ListaClases = () => {
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h4 className="m-0 ml-3">Clases</h4>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem>
          <p>Componente inicial para lista de clases</p>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}

export default ListaClases;
