import axios from 'axios';

// 🚀 Usamos la ruta de tu microservicio desplegado en Railway
// Se asume que el endpoint base para empleados es /api/empleado
const API_BASE_URL = "https://render-production-d894.up.railway.app/api/empleado"; 

// Si tu microservicio ya maneja la entidad 'reservaciones', y este es el servicio de 'empleados'
// te sugiero renombrar este archivo a 'empleadoService.js' para mayor claridad.

// --- Funciones CRUD completas para Empleado ---

export const listarEmpleados = () => axios.get(API_BASE_URL);

export const crearEmpleado = (empleado) => axios.post(API_BASE_URL, empleado);

export const getEmpleadoById = (idEmpleado) => axios.get(`${API_BASE_URL}/${idEmpleado}`);

export const updateEmpleado = (idEmpleado, empleado) => axios.put(`${API_BASE_URL}/${idEmpleado}`, empleado);

export const deleteEmpleado = (idEmpleado) => axios.delete(`${API_BASE_URL}/${idEmpleado}`);