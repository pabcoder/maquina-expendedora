// Cargamos la librería que vamos a usar
const prompt = require('prompt-sync')();

// Definimos algunas opciones para usar en el proceso
let opcionMenu = "1";       // Opcion del menu inicial
let opcionProducto = "";    // Opcion del producto escogido
let billete = "";           // Opcion de la denominacion escogida

// Productos disponibles
const productos = [
    {
        nombre: 'Gaseosa',
        valor: 2000
    },{
        nombre: 'Pasabocas',
        valor: 2000
    },{
        nombre: 'Chicles',
        valor: 1500
    },{
        nombre: 'Chocolatina',
        valor: 3000
    },{
        nombre: 'Yogurt',
        valor: 3000
    }
];

// Denominaciones disponibles
const denominaciones = [500, 1000, 5000, 10000, 20000, 50000];

// Denominaciones a devolver en un array de objetos
const denominacionesADevolver = denominaciones.map(
    function(d) {
        return {
            valor: d,
            cantidad: 0
        }
    }
);

// Iniciamos con un while para preguntar las distintas opciones
while (opcionMenu === "1") {
    console.log('--- MENU ---');
    console.log('1. Comprar producto');
    console.log('2. Salir');
    opcionMenu = prompt('Ingresa tu opción:');

    // Si la opcion es 2 entonces no entra al if, termina el while y termina el programa
    if (opcionMenu === "1") {


        // Imprimimos el menu de productos
        console.log('--- PRODUCTOS ---');
        productos.forEach(
            function(p, i) {
                console.log(( i + 1 ) + '. ' + p.nombre + ' ('+ p.valor +')');
            }
        );
        opcionProducto = prompt('Ingresa tu opción:');


        
        // Imprimimos el menu de denominaciones a usar
        console.log('--- CON QUE BILLETE VAS A PAGAR? ---');
        denominaciones.forEach(
            function(d, i) {
                console.log(( i + 1 ) + '. ' + d);
            }
        );
        billete = prompt('Ingresa tu opción:');


        
        // Sacamos el producto y la denominacion escogida en un variable cada uno, de los arrays iniciales productos y denominaciones
        const productoEscogido = productos[parseInt(opcionProducto) - 1];
        const denominacionEscogida = denominaciones[parseInt(billete) - 1];
        let valorADevolver = denominacionEscogida - productoEscogido.valor;
        console.log('valorADevolver: ', valorADevolver);


        
        // Sacamos las denominaciones disponibles que vamos a devolver
        let denominacionesDisponibles = denominaciones.filter(
            function(d) {
                return d < denominacionEscogida;
            }
        )


        
        /*
            Hacemos el proceso:
            1. Recorremos las denominaciones disponibles de mayor a menos
            2. Luego vamos viendo, dentro de cada iteracion en el arreglo, cuantos de cada item vamos a devolver
        */
        for (let i = (denominacionesDisponibles.length); i >= 0; i--) {            
            const d = denominacionesDisponibles[i - 1];

            while (valorADevolver >= d) {
                valorADevolver = valorADevolver - d;

                const d2 = denominacionesADevolver.find(
                    function(de){
                        return de.valor === d;
                    }
                )

                d2.cantidad++;
            }
        }

        // Devolvemos la cantidad de billetes de distintas denominaciones que el usuario debe recibir
        console.log(denominacionesADevolver);
    }
}
