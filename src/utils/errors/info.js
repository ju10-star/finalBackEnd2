export const generateProductErrorInfo = (product) => {
    return `
        una o mas porpiedades estan incompletas o no son validas.
        Campos requeridos
        title: debe ser un string, se recibió ${product.title}
        description: debe ser un string, se recibió ${product.description}
        price: debe ser un number, se recibió ${product.price}
        stock: debe ser un number, se recibió ${product.stock}
        category: debe ser un string, se recibió ${product.category}
    `;
}