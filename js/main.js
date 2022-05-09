document.querySelector('button').addEventListener('click', getFetch);       // Listens for click on button

// Function requires user to enter barcode number and click button to submit
function getFetch(userInput) {
// choice will store the actual twelve digit number 
const choice = userInput;
// the twelve digit number will be pasted where the template literal ${} sits
const UPC_Number = `https://world.openfoodfacts.org/api/v0/product/${choice}.json`;

fetch(UPC_Number)                                                           // Fetches 12-Digit UPC Barcode number 737628064502
    .then(response => response.json())
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
    .catch(err => {
        console.log(`error: ${err}`);                                       // Error handling
    })
}