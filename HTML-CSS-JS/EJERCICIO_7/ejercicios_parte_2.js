// 9) Crear una función, a partir de la lógica aplicada en ejercicio 3, que reciba dos valores y muestre cuál es el mayor. En caso de ser iguales, deberá indicarlo. //

function retornaMayor (val1, val2) {
    if (val1 > val2) {
        return val1 + " es mayor que " + val2
    }
    else if (val2 > val1) {
        return val2 + " es mayor que " + val1
    }
    else {
        return "Los dos números son iguales..."
    }
}

var nro1 = parseInt(prompt("Ingrese un número:"))
var nro2 = parseInt(prompt("Ingrese otro número:"))

alert(retornaMayor(nro1, nro2))

// 10) Crear una función que reciba un número y muestre tantos asteriscos como la cantidad de veces que se pasó como parámetro. //

function asteriscos (cant_asteriscos) {
    var resultado = ""
    for (var i = 0; i < cant_asteriscos; i++) {
        var resultado = resultado + "*"
    }
    alert(resultado)
}
var param = parseInt(prompt("Ingrese un número. La cantidad de asteriscos a mostrar por pantalla estará determinada por ese número:"))

asteriscos(param)

// 11) Crear una función que reciba el monto de un producto, y el medio de pago: C (tarjeta de crédito), E (efectivo) y D (tarjeta de débito). Si el monto del producto es menor a $200 no se aplicará ningún descuento, pero si el monto a abonar es entre $200 y $400 se aplicará un descuento del 30% si el medio de pago es efectivo, 20% si se realiza con débito y 10% con tarjeta de crédito. Para montos mayores a $400, el descuento es el mismo sin importar el medio de pago, dicho descuento es del 40%. //

var monto = parseFloat(prompt("Ingrese el monto del producto:"))
var medioPago = prompt("Ingrese el medio de pago (C - TARJETA DE CRÉDITO; E - EFECTIVO; D - TARJETA DE DÉBITO):")

function pagoDeProducto (montoProducto, medioDePagoProducto) {
    if (montoProducto > 0 && montoProducto <= 200) {
        montoAbonar = montoProducto
        alert("No se aplicará ningún descuento. Monto a abonar: " + montoAbonar)
    }
    else if (montoProducto > 200 && montoProducto <= 400) {
        if (medioDePagoProducto == "E") {
            montoAbonar = montoProducto - (montoProducto * 0.3)
            alert("¡Descuento del 30%! Monto a abonar: $" + montoAbonar)
        }
        else if (medioDePagoProducto == "D") {
            montoAbonar = montoProducto - (montoProducto * 0.2)
            alert("¡Descuento del 20%! Monto a abonar: $" + montoAbonar)
        }
        else if (medioDePagoProducto == "C") {
            montoAbonar = montoProducto - (montoProducto * 0.1)
            alert("¡Descuento del 10%! Monto a abonar: $" + montoAbonar)
        }
        else {
            alert("¿Qué medio de pago es ese?")
        }
    }
    else {
        montoAbonar = montoProducto - (montoProducto * 0.4)
        alert("¡Increíble! ¡Descuento del 40%! Monto a abonar: $" + montoAbonar)
    }
}

pagoDeProducto(monto, medioPago)

// 12) Crear una función que reciba un número que represente la altura de un medio-árbol. Deberá generar de manera escalonada el mismo. 

var altura = parseInt(prompt("Ingrese la altura del árbol:"))

function medioArbol (alt) {
    var resultado = ""
    for (var i = 0; i < alt; i++) {
        resultado = resultado + "*".repeat(i+1) + "\n"
    }
    alert(resultado)
}

medioArbol(altura)

// 13) Crear una función que reciba un número que indica el día de la semana y retorne una cadena de texto indicando a qué día corresponde. Ejemplo: si es 1, deberá retornar lunes, 2 retornará martes, y así siguiendo. Si el día es 6 o 7 deberá retornar “fin de semana”. En caso de un valor que no represente un día de la semana deberá retornar un mensaje de error. //

var dia_en_numero = parseInt(prompt("Ingrese un número. Se indicará a qué dia de la semana corresponde:"))

function queDiaEs (dia_nro) {
    switch (dia_nro) {
        case 1:
            alert("Lunes")
            break
        case 2:
            alert("Martes")
            break
        case 3:
            alert("Miércoles")
            break
        case 4:
            alert("Jueves")
            break
        case 5:
            alert("Viernes")
            break
        case 6:
            alert("Fin De Semana")
        case 7:
            alert("Fin De Semana")
            break
        default:
            alert("Ese número no corresponde a ningún día de la semana. Debe estar entre 1 y 7.")
            break
    }
}

queDiaEs(dia_en_numero)

// 14) Crear una función que genere un array de varios elementos numéricos y muestre por pantalla el promedio de esos números. El tamaño y los valores deben ser ingresados por el usuario (comando prompt) en dicho orden. TIP: El dato ingresado con prompt es de tipo string, usar split() para quitar los espacios y usar la función Number para transformarlo.

var t = parseInt(prompt("Ingrese el tamaño del array de números:"))

function promedioDeNumerosDeArray (tam) {

    var array = []
    var suma = 0

    for (var i = 1; i <= tam; i++) {
        nro = parseInt(prompt("Ingrese el valor del número " + i + " del array:"))
        array.push(nro)
    
    }

    for (i in array) {
        suma = suma + array[i]
    }
    var promedio = suma / tam

    return promedio
}

p = promedioDeNumerosDeArray(t)

alert("Promedio de los números del array: "+ p)

// 15) Utilizar la función que genera el medio-árbol (ejercicio 12): crear un campo de entrada que le permita al usuario ingresar la altura del mismo. Incluir un botón que al presionarlo, invoque a la función generada previamente con el valor ingresado por el usuario para que la misma muestre el medio-árbol. Deberá incluir validación de datos ingresados por el usuario. //

function medioArbol () {
    var altura = prompt("Ingrese la altura del árbol:")
    if (altura < 0 || isNaN(altura)) {
        alert("Altura mal ingresada.")
    }
    else {
        var resultado = ""
        for (var i = 0; i < altura; i++) {
            resultado = resultado + "*".repeat(i+1) + "\n"
        }
        alert(resultado)
    }
}

document.getElementById("boton").onclick = medioArbol