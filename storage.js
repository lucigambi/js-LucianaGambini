/*const prodictoUno = {
    titulo: "arroz",
    precio: 12.20,
    descripcion: "Lapiz para dibujar"
    stock: 0.5
    codigo: "WIOEWE",
    palabrasClaves:["arroz", "gallo","cereal" ]
}

producto.titulo
console.log(productoUno.titulo[2])


productoUno.precio = 200
crossOriginIsolated.log*/


class Producto { 
    constructor(titulo, descripcion, precio) { 
        this.titulo = titulo
        this.descripcion = descripcion
        this.precio = precio
    }

    calcularIva() { 
        this precioIva = this.precio * 1.21
        return precioIva
    }

    saberSiTieneDescuento(cantidad)
    if (this.precio) > 400 && cantidad > 4) {
    return true
}else {
    return false
}
}
}
    //metodos son acciones que realiza el objeto ejemplo : el objeto auto por un metodo(acciones) se enciende
    //en el objeto persona dormir es un metodo


const productoUno = new Producto("Fideos", "Descripcion Fideos")
console.log(productoUno)
const productoDos = new Producto("Coca Cola", "Descripcion Fideos")
console.log(productoDos.precio)
console.log(productoUno.calcularIva())
console.log(productoDno.calcularIva())

//metodo de un produucto: calcular precio + IVA
//si llamo al metodo calcular iva del precio al objeto producto



   
