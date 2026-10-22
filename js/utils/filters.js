/* =========================================
   FILTROS Y ORDENAMIENTO
   Funciones para procesar destinos
========================================= */

/* =========================================
   BUSCAR PAÍSES POR NOMBRE
========================================= */

export function buscarPaises(paises, texto) {
  const textoNormalizado = texto.trim().toLowerCase();

  /* =====================================
       RETORNAR TODOS SI NO HAY BÚSQUEDA
    ====================================== */

  if (!textoNormalizado) {
    return paises;
  }

  /* =====================================
       FILTRAR POR NOMBRE
    ====================================== */

  return paises.filter((pais) => {
    const nombre = pais.names?.common?.toLowerCase() ?? "";

    return nombre.includes(textoNormalizado);
  });
}

/* =========================================
   FILTRAR POR CONTINENTE
========================================= */

export function filtrarPorContinente(paises, continente) {
  /* =====================================
       RETORNAR TODOS LOS CONTINENTES
    ====================================== */

  if (continente === "all") {
    return paises;
  }

  /* =====================================
       FILTRAR REGIÓN
    ====================================== */

  return paises.filter((pais) => pais.region === continente);
}

/* =========================================
   ORDENAR PAÍSES
========================================= */

export function ordenarPaises(paises, criterio) {
  /* =====================================
       CREAR COPIA DEL ARREGLO
    ====================================== */

  const paisesOrdenados = [...paises];

  /* =====================================
       ORDENAR A-Z
    ====================================== */

  if (criterio === "az") {
    return paisesOrdenados.sort((a, b) => {
      const nombreA = a.names?.common ?? "";

      const nombreB = b.names?.common ?? "";

      return nombreA.localeCompare(nombreB);
    });
  }

  /* =====================================
       ORDENAR Z-A
    ====================================== */

  if (criterio === "za") {
    return paisesOrdenados.sort((a, b) => {
      const nombreA = a.names?.common ?? "";

      const nombreB = b.names?.common ?? "";

      return nombreB.localeCompare(nombreA);
    });
  }

  /* =====================================
       RETORNAR SIN CAMBIOS
    ====================================== */

  return paisesOrdenados;
}

/* =========================================
   PROCESAR PAÍSES
========================================= */

export function procesarPaises(paises, texto, continente, criterioOrden) {
  /* =====================================
       BUSCAR POR NOMBRE
    ====================================== */

  let resultado = buscarPaises(paises, texto);

  /* =====================================
       FILTRAR POR CONTINENTE
    ====================================== */

  resultado = filtrarPorContinente(resultado, continente);

  /* =====================================
       ORDENAR RESULTADOS
    ====================================== */

  resultado = ordenarPaises(resultado, criterioOrden);

  /* =====================================
       RETORNAR RESULTADOS
    ====================================== */

  return resultado;
}
