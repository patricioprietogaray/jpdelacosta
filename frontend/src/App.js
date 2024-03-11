//import Principal from './components/app/principal';

import { useState } from "react";
import PantallaPrincipal from "./components/pantallaPrincipal";
import BotonesPrincipal from "./components/botonesPrincipal";

function App() {
  //Manejador de los botones
  const [boton, setBoton] = useState('');
  //funcion que recibe que boton presionó
  const presiono = (presionoBoton) => {
    setBoton(presionoBoton);
  }

  return (
    <>
      <PantallaPrincipal />
      <BotonesPrincipal />

    </>
  );
}

export default App;
