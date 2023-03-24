const mongoose = require('mongoose');
const faker = require('faker')
//conexion a la DB

const url = 'mongodb+srv://Rios:elefante1@demeter.1ioyyf1.mongodb.net/Demeter'

mongoose.connect(url, {
    useNewUrlParser : true, useUnifiedTopology : true

}).then(() => console.log("YATAAA")).catch((e) => console.log("yabe" + e))

// creacion de los esquemas
const ComprasSchema = mongoose.Schema({
    producto : String,
    precio : String,
    fecha : String,
    lote: Number,
    cantidad : Number
},{ versionKey: false })

const VentasSchema = mongoose.Schema({
    producto : String,
    precio : String,
    fecha : String,
    insumos : Object,
    cantidad : Number,
    mesero : String
})

const ProveedorSchema = mongoose.Schema({
    nombre : String,
    apellido : String,
    documento : Number,
    insumo : String,
    ciudad : String,
    telefono : Number
})

// creacion de los modelos de mongoose
const compraModel = mongoose.model ("compras", ComprasSchema);
const ventaModel = mongoose.model("ventas", VentasSchema);
const proveedorModel = mongoose.model("proveedores", ProveedorSchema);
// Funciones de creacion de las coleciones y documentos

const crearCompras = async () => {
    const compra = new compraModel({
        producto : faker.commerce.product(),
        precio : faker.commerce.price(),
        fecha : faker.date.recent(),
        lote : faker.datatype.number(100),
        cantidad : faker.datatype.number(30)
    })
    const result = await compra.save()
    console.log(result)
}

const crearVentas = async () => {

    const receta = new Object({
        ingrediente1 : faker.random.word(),
        ingrediente2 : faker.random.word(),
        ingrediente3 : faker.random.word(),
        
    })

    const venta = new ventaModel({
        producto : faker.commerce.product(),
        precio : faker.commerce.price(),
        fecha : faker.date.recent(),
        insumos : receta,
        cantidad : faker.datatype.number(30),
        mesero : faker.name.firstName()
    })
    const result = await venta.save()
    console.log(result)
}



const crearProveedores = async () => {
    const proveedor = new proveedorModel({
        nombre : faker.name.firstName(),
        apellido : faker.name.lastName(),
        documento : faker.datatype.number(1000000),
        insumo : faker.commerce.product(),
        ciudad : faker.address.city(),
        telefono : faker.datatype.number(100000)
    })
    const result = await proveedor.save()
    console.log(result)
}

// ciclo para ejecutar la funcion 100 veces

// for(let i = 0; i <= 100; i++){
//     crearCompras()
// }


// Insertar documentos (save = insertOne() en mongoose)

//insertOne()
const RegCompra = async (compraModel) => {
    const nuevaCompra = new compraModel({
        producto : faker.commerce.product(),
        precio : faker.commerce.price(),
        fecha : faker.date.recent(),
        lote : faker.datatype.number(100),
        cantidad : faker.datatype.number(30)
    })

    const confirm = await nuevaCompra.save()
    console.log(confirm);
}
//RegCompra(compraModel);

//InsertMany()

const registrarCompras = async (ComprasSchema) => {

    const compras = [
        {
            producto : faker.commerce.product(),
            precio : faker.commerce.price(),
            fecha : faker.date.recent(),
            lote : faker.datatype.number(100),
            cantidad : faker.datatype.number(30)
        },
        {
            producto : faker.commerce.product(),
            precio : faker.commerce.price(),
            fecha : faker.date.recent(),
            lote : faker.datatype.number(100),
            cantidad : faker.datatype.number(30)
        },
        {
            producto : faker.commerce.product(),
            precio : faker.commerce.price(),
            fecha : faker.date.recent(),
            lote : faker.datatype.number(100),
            cantidad : faker.datatype.number(30)
        }
    ]

    const confirm = await compraModel.insertMany(compras)
    console.log(confirm);

}


// registrarCompras(compraModel);


//UpdateOne() y updateMany()

//sin upsert
const ActualizarVenta = async (ventaModel) =>{

    const receta = new Object({
        ingrediente1 : faker.random.word(),
        ingrediente2 : faker.random.word(),
        ingrediente3 : faker.random.word(),
        
    })

    const confirm =  await ventaModel.updateOne({
        producto : faker.commerce.product(),
        precio : faker.commerce.price(),
        fecha : faker.date.recent(),
        insumos : receta,
        cantidad : faker.datatype.number(30),
        mesero : faker.name.firstName()
    })
    console.log(confirm)
}

//ActualizarVenta(ventaModel)

//con upsert
const ActualizarVentaUpsert = async (ventaModel) =>{

    const receta = new Object({
        ingrediente1 : faker.random.word(),
        ingrediente2 : faker.random.word(),
        ingrediente3 : faker.random.word(),
        
    })

    const confirm = await ventaModel.updateOne(
        {producto : "carton"},
        {precio : "12.01"},
        {upsert : true}

    )
    console.log(confirm)
}

// ActualizarVentaUpsert(ventaModel)


//updateMany Sin upsert
const ActualizarVentas = async (ventaModel) =>{

    const receta = new Object({
        ingrediente1 : faker.random.word(),
        ingrediente2 : faker.random.word(),
        ingrediente3 : faker.random.word(),
        
    })

    const confirm = await ventaModel.updateMany(
        {producto : "Salad"},
        {insumos : receta},
        //{upsert : true} descomentar para agregar el upsert con upsert
        )
    console.log(confirm)
}

// ActualizarVentas(ventaModel);


//delete one y delete many

const deleteProveedor = async(proveedorModel) => {

    const confirm = await proveedorModel.deleteOne()
    console.log(confirm)
}

// deleteProveedor(proveedorModel)

const deleteProveedores = async(proveedorModel) => {

    const confirm = await proveedorModel.deleteMany({
        apellido : "Moen"
    })
    console.log(confirm)
}

//deleteProveedores(proveedorModel)

// drop


const dropCompras = async (compraModel) => {

    const confirm = await compraModel.collection.drop()

}

// dropCompras(compraModel);


//dropDatabase() NO USAR!!!

// mongoose.connection.dropDatabase();



// lookups 
// Ejemplo $unwind


// compraModel.aggregate([
//     {$lookup:{
//         from: "ventas",
//         localField : "precio",
//         foreignField: "precio",
//         as : "Entradas"
//     }
//     },{
//         $unwind : "$Entradas"

//     }
// ]).then(result => {
//     console.log(result);
// })


//--------------------------------------------------



// proveedorModel.aggregate([
//     {$lookup : {
//         from : "compras",
//         localField : "insumo",
//         foreignField : "producto",
//         as : "Categorisacion"
//     }}


// ]).then(result => {
//     console.log(result)
// })


//----------------------------------------------------------------




// ventaModel.aggregate([
//     {$lookup : {
//         from : "compras",
//         localField : "producto",
//         foreignField : "producto",
//         as: "igualdad"
//     }},
//     {$unwind: "$igualdad"},
//     {$limit : 5}
// ]).then(result => {
//     console.log(result)
// })



//pipelines

//Ejemplo de sort

// compraModel.aggregate([
//     {$match : {producto : "Table"}},
//     {$project : {precio : 1, _id: 0}},
//     {$sort : {precio : -1}}

//     ]).then(result => {
//     console.log(result)
// })


//--------------------------------------------------------



ventaModel.aggregate([
    {$match : {producto : "Pizza"}},
    {$project : {insumos : 1, _id : 0, cantidad: 1}},
    {$unwind : "$insumos"},
    {$limit : 5}
]).then(result => {
    console.log(result)
})

