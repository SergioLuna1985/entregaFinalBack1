const socket = io()

const title = document.getElementById('title')
const description = document.getElementById('description')
const code = document.getElementById('code')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const thumbnails = document.getElementById('thumbnails')
const button = document.getElementById('button')

const outputProducts = document.getElementById('outputProducts')

button.addEventListener('click', event =>{

    const product = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        thumbnails: thumbnails.value

    }

    socket.emit('newProduct', product)  

    title.value = ''
    description.value = ''
    code.value = ''
    price.value = ''
    stock.value = ''
    category.value = ''
    thumbnails.value = ''

})

socket.on('products', products =>{

    outputProducts.innerHTML = `
        <ul>
            ${products.map(product=>    `<h2>${product.title}</h2>
                                        <p>Descripción: ${product.description}</p>
                                        <p>Código: ${product.code}</p>
                                        <p>Categoria: ${product.category}</p>
                                        <p>Stock: ${product.stock}</p>
                                        <p>Precio: ${product.price}</p>
                                        `).join("")}
        </ul>
    `
})  
