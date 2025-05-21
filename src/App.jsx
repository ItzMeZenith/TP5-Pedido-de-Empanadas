import { useState } from 'react'
import './App.css' 

const sectores = ["Sistemas", "Finanzas", "Ventas", "Recursos Humanos", "Soporte", "Depósito",]; 
const gustos = ["Carne", "Pollo", "Jamon y Queso", "Queso y Cebolla", "Carne Picante", "Verdura", "Humita", "Carne cortada a cuchillo", "Dulce de Leche"]; 

function App() {

    const [nombre, setNombre] = useState("");
    const [sector, setSector] = useState(sectores[0]);
    const [empanadas, setEmpanadas] = useState([{ gusto: gustos[0], cantidad: 1 }]);
    const [personas, setPersonas] = useState([]);

    const agregarGusto = () => {
    setEmpanadas(empanadas.concat({ gusto: gustos[0], cantidad: 1 }));
    };

    const cambioDeEmpanadas = (index, campo, valor) => {
        const nuevas = empanadas.map((empanada, i) => {
          if (i === index) {
            if (campo === "cantidad") {
              empanada[campo] = parseInt(valor);
              if (isNaN(empanada[campo])) {
                empanada[campo] = 0;
              }
            } else {
              empanada[campo] = valor;
            }
            return empanada;
          }
          return empanada;
        });
        setEmpanadas(nuevas);
    };

    const submit = (e) => {
    e.preventDefault();
    const persona = { nombre, sector, empanadas };
    setPersonas(personas.concat(persona));
    setNombre("");
    setSector(sectores[0]);
    setEmpanadas([{ gusto: gustos[0], cantidad: 1 }]);
    };

    const resumenPorGusto = personas.reduce((num, persona) => {
    persona.empanadas.forEach(({ gusto, cantidad }) => {
        num[gusto] = (num[gusto] || 0) + cantidad;
    });
    return num;
    }, {});

    const generarOpciones = (opciones) => opciones.map((valor) => <option key={valor} value={valor}>{valor}</option>);

    return (
        <div class="container">
            <h1 class="titulo">🥟Pedido de Empanadas🥟</h1>
            <form onSubmit={submit} class="formulario">
                <div class="fila">
                    <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} class="input" required/>
                    <select value={sector} onChange={(e) => setSector(e.target.value)} class="input">{generarOpciones(sectores)}</select>
                </div>
            
                {empanadas.map((item, i) => (
                <div key={i} class="fila">
                    <select value={item.gusto} onChange={(e) => cambioDeEmpanadas(i, "gusto", e.target.value)} class="select-gusto">{generarOpciones(gustos)}</select>
                    <input type="number" value={item.cantidad} onChange={(e) => cambioDeEmpanadas(i, "cantidad", e.target.value)} class="input-cantidad" min={1}/>
                </div>
                ))}
            
                <button type="button" onClick={agregarGusto} class="boton azul">Agregar otra empanada</button>
            
                <button type="submit" class="boton verde" >Agregar persona</button>
            </form>
            
            <h2>Empanadas a hacer</h2>
            <ul class="lista">
                {Object.entries(resumenPorGusto).map(([gusto, cantidad]) => (
                <li key={gusto}>{gusto}: {cantidad}</li>
                ))}
            </ul>
            
            <h2>Pedidos</h2>
            <ul class="lista">
                {personas.map((p, i) => (
                <li key={i}>
                    <b>{p.nombre}</b> ({p.sector}): {p.empanadas.map(e => `${e.cantidad} de ${e.gusto}`).join(", ")}
                </li>
                ))}
            </ul>
        </div>
    );
    }

export default App 