//const productos = require('../productos.json');
const nodemailer = require("nodemailer");
const db = require('../db')



//CONTROLLERS FRONT 

const inicioGET = (req,res)=> {
	res.render('index' , {
		titulo: 'Inicio'
	});
	
}





const detallesProductoGET_ID = (req,res)=> {
	
	console.log("ID--> ", req.params.id) // si puso id 1 , la consulta es where id= 1 en la consulta de la base de datos
	// m muestra en la consola lo q pone en la url, params son los parametros d la url , los params despues de la barrita
	//req body formulario a todos los campos de un formulario, req params para la url
	console.log("ID--> " , req.params)
	let id = req.params.id // almaceno el objeto en una variable y la propiedad id porq m interesa tomar esa propiedad del objeto
	let sql ="SELECT * FROM productos WHERE id = ? " // porq va a ser depende del id q este tomando
	db.query(sql, id , (error, data) => {
		console.log(data)
		if(error) res.send(`Ocurrio un error ${error.code}`) // si hay un error avisale al usuario, con res.send
		if(data=="") {
			res.status(404).render('404' , {
				mensaje: `Producto con ID ${id} no existente`
			})
		} else {
			res.render('detalles-producto' , {
				titulo : `Detalles producto ${id}`,
				productos : data[0]
				
			})
		}
		
	})

	
}


const sobreNosotrosGET = (req,res)=> {
	res.render('sobre-nosotros' , {
		titulo: 'Sobre Nosotros'
	});
	
	
}



const comoComprarGET = (req,res)=> {
	res.render('como-comprar' , {
		titulo: 'Como Comprar'
	});
	
	
}


const productosGET = (req,res)=> {
	//GUARDAR LA CONSULTA EN UNA VARIABLE
	let sql = "SELECT * FROM productos"
	db.query(sql,(error, data)=> {
		if(error) res.send(`Ocurrio un error ${error.code}`)
			console.log(data)
		res.render('productos', {
			titulo : 'Productos',
			productos: data
		})
	
	
		
	
		
	})
	
	
	}
	
	
const contactoGET = (req,res)=> {
	res.render('contacto' , {
		titulo: 'Contacto'
	});
	
	
}


const contactoPOST = (req,res)=> {
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: //process.env.EMAIL_USER, 
    pass: //process.env.EMAIL_PASS 
	
	



 
  }
});





//usar dotenv para referenciar variables para q no esten a la vista de todos , q esas variables solo se definan en nuestra pc 
//datos sensibles 
//git ignore junto con nodemodules. node modules lo vuelvo a instalar con npm i
// .env nunca se sube a github al igual q node_modules
	
	//2.definimos el cuerpo de mail CUERPO
	console.log("BODY: " , req.body)
	let data = req.body //info recibida del formulario
	let mailOptions = {
		from: data.email, 
		to: 'probando@prueba' ,//mail al q quiero q envie esta info, que pongo usando mailtrap.io? Funciona poniendo cualquier mail
		subject : data.asunto,
		text : data.comentarios
	}
	
	//3. enviamos el mail  MAIL
	transport.sendMail(mailOptions, (err, info) => {
		if(err) {
			console.log(err)
			res.status(500, err.message)
			res.status(500).render('/contacto' , {
				mensaje: `ha ocurrido el siguiente error ${err.message}`
				
			})
		}else {
			console.log('email enviado')
			res.status(200).render('contacto' , {
				mensaje : `tu email ha sido enviado correctamente`
			})
		}
		
	})
}


//controllers BACK


const adminGET = (req,res) => {
	let sql = "SELECT * FROM productos"
	db.query(sql,(error,data) =>{
		if(error) res.send(`Ocurrio el siguiente error ${error.code}`);
		res.render('admin' , {
			titulo: 'Panel de Control',
			productos : data
			
		})
		
		
	})
	
	
}


const agregarProductoGET = (req,res) => { //falta hacerle la ruta post
	res.render('agregar-producto' , {
		titulo: 'Agregar producto'
		
	})

	
	
}

const agregarProductoPOST = (req, res) => {

	console.log("DATOS FORM --> " , req.body)
	const detallesProducto = req.body
	let sql = "INSERT INTO productos SET ? "  
	db.query(sql, detallesProducto, (error, data) => {
		
		if(error) res.send(`Ocurrio el siguiente error ${error.code}`)
			console.log('Producto agregado correctamente')
			
	})

	res.render('agregar-producto', {
		mensaje: 'Producto agregado correctamente',
		titulo: 'Agregar Producto'
		
	})
}

const editarProductoGET = (req,res) => {
	res.render('editar-producto' , {
		titulo : 'Editar Producto' // falta hacerle la ruta post correspondiente, leyendo base de datos con UPDATE
	})
	
}

const loginGET = (req,res)=> { //falta hacer el metodo post para el login
	res.render('log-in' , {
		titulo: 'Log In'
	});
	
	
}


module.exports = {
	editarProductoGET,
	agregarProductoGET,
	adminGET,
	contactoPOST,
	contactoGET,
	productosGET,
	comoComprarGET,
	sobreNosotrosGET,
	detallesProductoGET_ID, //PORQ VOY A DETECTAR CADA PRODUCTO POR SU ID
	loginGET,
	inicioGET,
	agregarProductoPOST
	
	
	
}

// ex cuerpo de funcion de productosGET
/*res.render('productos' , {
			titulo: 'Productos', 
			productos: productos
			
		})*/