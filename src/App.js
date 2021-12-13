import React from 'react'
import Menu from "./components/manu/Menu"
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import form_estudiante from "./screen/Formulario_estudiantes";
import form_maestro from"./screen/Formulario_maestros";
import registroAlumno from "./screen/Registro_alumnos";
import registromestros from "./screen/Registro_maestros"

function App() {
  return (
    <>
     <Router>
     <Menu/>
    <Switch>
          <Route path='/' exact component={form_estudiante}/>
          <Route path='/registrar_maestro' exact component={form_maestro}/>
          <Route   exact path='/alumnos' component={registroAlumno}/>
          <Route   exact path='/maestros' component={registromestros}/>
        </Switch>
      </Router>
    </>
  )
}

export default App
