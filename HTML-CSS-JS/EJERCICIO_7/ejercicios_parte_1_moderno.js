// ejercicios_parte_1.js - Refactorizado con ES6+ y patrones modernos

class EjerciciosMatematicos {
    constructor() {
        this.historial = [];
    }

    // 1) Operaciones numéricas con validación
    operacionSumar(numero = 2, incremento = 5) {
        try {
            const numeroValido = this.validarNumero(numero, 'número base');
            const incrementoValido = this.validarNumero(incremento, 'incremento');
            
            const resultado = numeroValido + incrementoValido;
            this.registrarOperacion('suma', numeroValido, incrementoValido, resultado);
            
            this.mostrarResultado(`${numeroValido} + ${incrementoValido} = ${resultado}`);
            return resultado;
        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    // 2) Concatenación de cadenas con templates literals
    concatenarCadenas(cadena1 = "Hola", cadena2 = "Mundo") {
        const resultado = `${cadena1} ${cadena2}`;
        this.registrarOperacion('concatenación', cadena1, cadena2, resultado);
        this.mostrarResultado(`Resultado de concatenación: "${resultado}"`);
        return resultado;
    }

    // 3) Comparación de números con operador ternario y arrow functions
    compararNumeros() {
        const obtenerNumero = (mensaje) => {
            const valor = parseFloat(prompt(mensaje));
            if (isNaN(valor)) throw new Error(`Valor inválido: ${mensaje}`);
            return valor;
        };

        try {
            const num1 = obtenerNumero("Ingrese el primer número:");
            const num2 = obtenerNumero("Ingrese el segundo número:");
            
            const resultado = num1 > num2 ? `${num1} es mayor que ${num2}` :
                            num2 > num1 ? `${num2} es mayor que ${num1}` :
                            "Los números son iguales";
            
            this.registrarOperacion('comparación', num1, num2, resultado);
            this.mostrarResultado(resultado);
            return { num1, num2, resultado };
        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    // 4) Sistema de grupos con Map y validación mejorada
    determinarGrupo() {
        const gruposMap = new Map([
            [1, { grupo: 1, rango: '1-3', descripcion: 'Grupo Inicial' }],
            [2, { grupo: 1, rango: '1-3', descripcion: 'Grupo Inicial' }],
            [3, { grupo: 1, rango: '1-3', descripcion: 'Grupo Inicial' }],
            [4, { grupo: 2, rango: '4-6', descripcion: 'Grupo Intermedio' }],
            [5, { grupo: 2, rango: '4-6', descripcion: 'Grupo Intermedio' }],
            [6, { grupo: 2, rango: '4-6', descripcion: 'Grupo Intermedio' }],
            [7, { grupo: 3, rango: '7-10', descripcion: 'Grupo Avanzado' }],
            [8, { grupo: 3, rango: '7-10', descripcion: 'Grupo Avanzado' }],
            [9, { grupo: 3, rango: '7-10', descripcion: 'Grupo Avanzado' }],
            [10, { grupo: 3, rango: '7-10', descripcion: 'Grupo Avanzado' }]
        ]);

        try {
            const numero = parseInt(prompt("Ingrese un número entre 1 y 10:"));
            
            if (!this.validarRango(numero, 1, 10)) {
                throw new Error(`Número ${numero} fuera del rango permitido (1-10)`);
            }

            const grupoInfo = gruposMap.get(numero);
            const mensaje = `El número ${numero} pertenece al ${grupoInfo.descripcion} (${grupoInfo.rango})`;
            
            this.registrarOperacion('clasificación', numero, grupoInfo.grupo, mensaje);
            this.mostrarResultado(mensaje);
            
            return grupoInfo;
        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    // 5) Sumatoria usando reduce y programación funcional
    calcularSumatoria(limite = 10) {
        const numeros = Array.from({ length: limite + 1 }, (_, i) => i);
        const resultado = numeros.reduce((acc, curr) => acc + curr, 0);
        
        this.registrarOperacion('sumatoria', 0, limite, resultado);
        this.mostrarResultado(`Sumatoria de 0 a ${limite} = ${resultado}`);
        return resultado;
    }

    // 6) Producto de array usando programación funcional
    calcularProductoArray(numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
        const resultado = numeros.reduce((acc, curr) => acc * curr, 1);
        
        this.registrarOperacion('producto array', numeros, null, resultado);
        this.mostrarResultado(`Producto del array [${numeros.join(', ')}] = ${resultado}`);
        return resultado;
    }

    // 7) Función producto con validación mejorada
    calcularProducto() {
        try {
            const num1 = this.solicitarNumero("Ingrese el primer número:");
            const num2 = this.solicitarNumero("Ingrese el segundo número:");
            
            const resultado = this.multiplicar(num1, num2);
            this.mostrarResultado(`Producto: ${num1} × ${num2} = ${resultado}`);
            return resultado;
        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    // 8) Concatenación mejorada con validación
    concatenarCadenasInteractivo() {
        try {
            const cadena1 = this.solicitarCadena("Ingrese la primera cadena:");
            const cadena2 = this.solicitarCadena("Ingrese la segunda cadena:");
            
            const resultado = this.concatenar(cadena1, cadena2);
            this.mostrarResultado(`Concatenación: "${resultado}"`);
            return resultado;
        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    // Métodos utilitarios privados
    validarNumero(valor, descripcion) {
        const numero = Number(valor);
        if (isNaN(numero)) {
            throw new Error(`${descripcion} debe ser un número válido`);
        }
        return numero;
    }

    validarRango(numero, min, max) {
        return numero >= min && numero <= max;
    }

    solicitarNumero(mensaje) {
        const valor = parseFloat(prompt(mensaje));
        if (isNaN(valor)) throw new Error(`Debe ingresar un número válido`);
        return valor;
    }

    solicitarCadena(mensaje) {
        const valor = prompt(mensaje);
        if (!valor || valor.trim() === '') throw new Error(`Debe ingresar una cadena válida`);
        return valor.trim();
    }

    multiplicar = (a, b) => a * b;
    concatenar = (str1, str2) => `${str1} ${str2}`;

    registrarOperacion(tipo, entrada1, entrada2, resultado) {
        this.historial.push({
            timestamp: new Date().toISOString(),
            tipo,
            entrada1,
            entrada2,
            resultado
        });
    }

    mostrarResultado(mensaje) {
        console.log(`✅ ${mensaje}`);
        alert(mensaje);
    }

    mostrarError(mensaje) {
        console.error(`❌ Error: ${mensaje}`);
        alert(`Error: ${mensaje}`);
    }

    // Método para mostrar historial
    mostrarHistorial() {
        console.table(this.historial);
        return this.historial;
    }

    // Método para limpiar historial
    limpiarHistorial() {
        this.historial = [];
        console.log('📋 Historial limpiado');
    }

    // Método para ejecutar todos los ejercicios automáticos
    ejecutarTodos() {
        console.log('🎯 Ejecutando todos los ejercicios...');
        this.operacionSumar();
        this.concatenarCadenas();
        this.calcularSumatoria();
        this.calcularProductoArray();
        console.log('✨ Ejercicios automáticos completados');
    }
}

// Instancia global para uso inmediato
const ejercicios = new EjerciciosMatematicos();

// Exportar para uso como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EjerciciosMatematicos, ejercicios };
}

// Auto-ejecución mejorada con manejo de errores
(function inicializar() {
    console.log('🚀 Ejercicios Matemáticos Modernizados - Inicializados');
    console.log('📝 Métodos disponibles:', Object.getOwnPropertyNames(EjerciciosMatematicos.prototype).filter(m => m !== 'constructor'));
    
    // Ejecutar ejercicios automáticos
    ejercicios.ejecutarTodos();
})();
