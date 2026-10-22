/* =========================================
   EXPLORADOR DE VIAJES
   Archivo principal de la aplicación
========================================= */

/* =========================================
   IMPORTACIONES
========================================= */

import { obtenerPaises } from "./api/countriesApi.js";

import {
  mostrarCargando,
  mostrarError,
  renderPaises,
  actualizarContador,
} from "./ui/ui.js";

import { procesarPaises } from "./utils/filters.js";

/* =========================================
   ESTADO DE LA APLICACIÓN
========================================= */

let paises = [];

/* =========================================
   REFERENCIAS DEL DOM
========================================= */

const destinationsContainer = document.querySelector("#destinations-container");

const resultsCount = document.querySelector("#results-count");

const searchInput = document.querySelector("#search-input");

const continentFilter = document.querySelector("#continent-filter");

const sortFilter = document.querySelector("#sort-filter");

/* =========================================
   APLICAR FILTROS
========================================= */

function aplicarFiltros() {
  /* =====================================
       OBTENER VALORES DE LOS CONTROLES
    ====================================== */

  const texto = searchInput.value;

  const continente = continentFilter.value;

  const criterioOrden = sortFilter.value;

  /* =====================================
       PROCESAR LOS PAÍSES
    ====================================== */

  const resultados = procesarPaises(paises, texto, continente, criterioOrden);

  /* =====================================
       RENDERIZAR RESULTADOS
    ====================================== */

  renderPaises(resultados, destinationsContainer);

  /* =====================================
       ACTUALIZAR CONTADOR
    ====================================== */

  actualizarContador(resultados.length, resultsCount);
}

/* =========================================
   REGISTRAR EVENTOS
========================================= */

function registrarEventos() {
  /* =====================================
       BÚSQUEDA EN TIEMPO REAL
    ====================================== */

  searchInput.addEventListener("input", aplicarFiltros);

  /* =====================================
       FILTRO POR CONTINENTE
    ====================================== */

  continentFilter.addEventListener("change", aplicarFiltros);

  /* =====================================
       ORDENAMIENTO
    ====================================== */

  sortFilter.addEventListener("change", aplicarFiltros);
}

/* =========================================
   INICIALIZACIÓN DE LA APLICACIÓN
========================================= */

async function init() {
  console.log("Explorador de Viajes iniciado");

  /* =====================================
       MOSTRAR ESTADO DE CARGA
    ====================================== */

  mostrarCargando(destinationsContainer);

  /* =====================================
       OBTENER PAÍSES DESDE LA API
    ====================================== */

  paises = await obtenerPaises();

  /* =====================================
       COMPROBAR RESULTADOS
    ====================================== */

  console.log("Países obtenidos:", paises);

  /* =====================================
       VALIDAR SI LA API RETORNÓ DATOS
    ====================================== */

  if (paises.length === 0) {
    mostrarError(destinationsContainer);

    actualizarContador(0, resultsCount);

    return;
  }

  /* =====================================
       MOSTRAR RESULTADOS INICIALES
    ====================================== */

  aplicarFiltros();

  /* =====================================
       REGISTRAR EVENTOS
    ====================================== */

  registrarEventos();
}

/* =========================================
   INICIAR APLICACIÓN
========================================= */

init();
