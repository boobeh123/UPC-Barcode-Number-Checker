// Will be able to use template literal to search up any UPC barcode number -> https://world.openfoodfacts.org/api/v0/product/${UPCNumber}.json
// URL is currently hardcoded to interact with openfoodfact's API
const FOOD_URL = 'https://world.openfoodfacts.org/api/v0/product/737628064502.json';

fetch(FOOD_URL)                                                             // Fetches 12-Digit UPC Barcode number 737628064502
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);                                                  // Returns Object with product property
        console.log(data.product);                                          // Accessing the product property
        console.log(`Brand name: ` + data.product.brands);                  // Log the product brand property
        console.log(`Categories: ` + data.product.categories);              // Log the product categories property
        console.log(`Product name: ` + data.product.product_name);          // Log the product product_name property
        console.log(`Type of food: ` + data.product.generic_name);          
        console.log(`Ingredients: ` + data.product.ingredients_text);       
        console.log(`Image URL: ` + data.product.image_url);                // Returns the image of the product
    })