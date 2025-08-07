// 1) Definir una variable numérica, asignarle un valor y sumarle 5. //
var numero = 2
numero += 5
alert(numero)

// 2) Definir dos variables de cadenas, asignarles valores y concatenarlas. 
var cadena_1 = "Hola "
var cadena_2 = "Mundo"
alert(cadena_1 + cadena_2)

// 3) Evaluar si dos números son iguales, diferentes, mayor o menor. Resolver utilizando “if”/”else”.
var nro_1 = parseInt(prompt("Ingrese un número:"))
var nro_2 = parseInt(prompt("Ingrese otro número:"))
if (nro_1 > nro_2) {
    alert(nro_1 + " es mayor que " + nro_2)
}
else if (nro_2 > nro_1) {
    alert(nro_2 + " es mayor que " + nro_1)
}
else if (nro_1 == nro_2) {
    alert("Los números son iguales")
}

// 4) . Utilizando “switch”. Definir una variable numérica. Asignarle un valor entre 1 y 10; mostrar a qué grupo pertenece: ○ Grupo 1: del 1 al 3 ○ Grupo 2: del 4 al 6 ○ Grupo 3: del 7 al 10 - Modifiquemos el ejercicio para que el número lo ingrese el usuario (con “prompt”). //
var numero_4 = parseInt(prompt("Ingrese un número entre 1 y 10:"))
switch (numero_4) {
    case 1:
        alert("El número " + numero_4 + " pertenece al grupo 1")
        break;
    case 2:
        alert("El número " + numero_4 + " pertenece al grupo 1")
        break;
    case 3:
        alert("El número " + numero_4 + " pertenece al grupo 1")
        break;
    case 4:
        alert("El número " + numero_4 + " pertenece al grupo 2")
        break;
    case 5:
        alert("El número " + numero_4 + " pertenece al grupo 2")
        break;
    case 6:
        alert("El número " + numero_4 + " pertenece al grupo 2")
        break;
    case 7:
        alert("El número " + numero_4 + " pertenece al grupo 3")
        break;
    case 8:
        alert("El número " + numero_4 + " pertenece al grupo 3")
        break;
    case 9:
        alert("El número " + numero_4 + " pertenece al grupo 3")
        break;
    case 10:
        alert("El número " + numero_4 + " pertenece al grupo 3")
        break;
    default:
        alert("Debe ingresar un número entre 1 y 10")
        break;
}

// 5) Realizar la sumatoria de 0 a 10 y devolver el valor de la misma. //
var resultado = 0
for (var i = 0; i <= 10; i++) {
    resultado = resultado + i;
}
alert(resultado)

// 6) Generar un array con 10 números, recorrerlo e ir multiplicando todos los elementos,finalmente obtener el producto total. //
resultado = 1
var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for (i in numeros) {
    resultado = resultado * numeros[i]
}
alert(resultado)

// 7) Crear una función que reciba dos valores y retorne el producto de los mismos. //
var arg1 = parseInt(prompt("Ingrese un número:"))
var arg2 = parseInt(prompt("Ingrese otro número:"))

function producto (nro1, nro2) {
    var resultado = nro1 * nro2
    alert("Valor que retorna la función: " + resultado)
}

producto(arg1, arg2)

// 8) Crear una función que reciba dos cadenas y retorne la concatenación de la misma. //
var arg1 = prompt("Ingrese una cadena de texto:")
var arg2 = prompt("Ingrese otra cadena de texto:")

function concatenacion (c1, c2) {
    alert(c1 + " " + c2)
}

concatenacion(arg1, arg2)