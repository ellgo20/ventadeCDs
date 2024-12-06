$(document).ready(function () {
  const precioCD = 3.00;  // Precio unitario del CD
  let comprasAcumuladas = { bruto: 0, descuento: 0, final: 0 }; // Objeto para acumular los valores de cada compra
  let totalArticulos = 0; // Contador de artículos comprados

  // Arreglo de descuentos por marca (marca: descuento)
  const marcas = ["sony", "acer", "princo", "ibm"];
  const descuentos = [0.15, 0.12, 0.10, 0.20];

  // Subrutina para calcular el importe bruto, descuento y final
  function calcularImporte(marca, cantidad) {
    // Obtener el índice de la marca seleccionada
    const indiceMarca = marcas.indexOf(marca);
    
    if (indiceMarca === -1) return;

    // Cálculos
    const importeBruto = precioCD * cantidad;  // Importe bruto
    const descuentoTotal = cantidad * descuentos[indiceMarca];  // Descuento
    const importeFinal = importeBruto - descuentoTotal;  // Importe final

    // Acumular los valores
    comprasAcumuladas.bruto += importeBruto;
    comprasAcumuladas.descuento += descuentoTotal;
    comprasAcumuladas.final += importeFinal;

    // Incrementar el total de artículos comprados
    totalArticulos += parseInt(cantidad);

    // Mostrar los resultados
    $('#importe-bruto').text(comprasAcumuladas.bruto.toFixed(2));
    $('#descuento').text(comprasAcumuladas.descuento.toFixed(2));
    $('#importe-final').text(comprasAcumuladas.final.toFixed(2));

    // Actualizar el total de artículos comprados
    actualizarTotalArticulos();

    // Mostrar gráfico con los valores acumulados
    mostrarGrafico();
  }

  // Subrutina para actualizar el total de artículos comprados
  function actualizarTotalArticulos() {
    $('#compras-totales').text(totalArticulos); // Mostrar el total de artículos
  }

  // Subrutina para mostrar el gráfico
  function mostrarGrafico() {
    const ctx = $('#grafico')[0].getContext('2d');
    
    // Limpiar el gráfico previo antes de redibujarlo
    if (window.chart) {
      window.chart.destroy();
    }

    const datos = {
      labels: ['Importe Bruto', 'Descuento', 'Importe Final'],
      datasets: [{
        label: 'Monto en Soles (S/.)',
        data: [comprasAcumuladas.bruto, comprasAcumuladas.descuento, comprasAcumuladas.final],
        backgroundColor: ['#FF5733', '#33C3FF', '#75FF33'], // Colores del gráfico
        borderColor: ['#FF5733', '#33C3FF', '#75FF33'],
        borderWidth: 1
      }]
    };

    const opciones = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };

    // Crear el gráfico
    window.chart = new Chart(ctx, {
      type: 'bar',  // Tipo de gráfico (barras)
      data: datos,
      options: opciones
    });
  }

  // Evento para calcular el importe cuando se hace clic en el botón
  $('#calcular').click(function () {
    const marca = $('#marca').val();  // Obtener la marca seleccionada
    const cantidad = $('#cantidad').val();  // Obtener la cantidad de CDs
    calcularImporte(marca, cantidad);
  });

  // Evento para borrar los campos y gráficos
  $('#borrar').click(function () {
    $('#marca').val('sony');
    $('#cantidad').val(1);
    $('#importe-bruto').text('0.00');
    $('#descuento').text('0.00');
    $('#importe-final').text('0.00');
    $('#compras-totales').text('0'); // Restablecer el total de artículos a 0

    comprasAcumuladas = { bruto: 0, descuento: 0, final: 0 }; // Vaciar el objeto de compras acumuladas
    totalArticulos = 0; // Reiniciar el contador de artículos

    // Limpiar el gráfico
    if (window.chart) {
      window.chart.destroy();
    }
  });

  // CAPA 1
  window.aceptar = function() {
    $('#capa1').hide();  // Ocultar la capa cuando se presiona "Aceptar"
  };

  window.ocultarYProgramarMostrar = function() {
    $('#capa1').hide();  // Ocultar la capa
  };

  setTimeout(function() {
    $('#capa1').show();  // Mostrar la capa
    $('#capa1').css('top', '0');  // Deslizar la capa desde la parte superior
  }, 1000);  // Esperar 1 segundos para mostrar la capa
});
let cerrarContadorITP = 0; // Contador para el anuncio de inscripciones

// Función para cerrar el anuncio de Coca-Cola
function cerrarAnuncio() {
    document.querySelector('.anuncio-flotante').style.display = 'none'; // Ocultar anuncio de Coca-Cola
}

// Función para cerrar el anuncio de inscripciones después de hacer clic dos veces
function cerrarAnuncio_itp() {
    cerrarContadorITP += 1;  // Incrementar el contador cada vez que se presiona "Cerrar"

    if (cerrarContadorITP >= 2) {
        document.querySelector('#anuncio').style.display = 'none';  // Ocultar anuncio después de dos clics
        cerrarContadorITP = 0;  // Reiniciar el contador
    }
}
