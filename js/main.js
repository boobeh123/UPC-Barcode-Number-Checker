document.querySelector('button').addEventListener('click', getFetch);       // Listens for click on button

// Function requires user to enter barcode number and click button to submit
function getFetch() {
// choice will grab the UPC number from the input field
const choice = document.querySelector('#barcode').value;
// the twelve digit number will be pasted where the template literal ${} sits
const UPC_Number = `https://world.openfoodfacts.org/api/v0/product/${choice}.json`;

fetch(UPC_Number)                                                           // Fetches 12-Digit UPC Barcode number 737628064502
    .then(response => response.json())
    .then(data => {
        // console.log(data);                                               // Returns Object with product property
        // console.log(data.product);                                       // Accessing the product property
        // console.log(`Brand name: ` + data.product.brands);               // Log the product brand property
        // console.log(`Categories: ` + data.product.categories);           // Log the product categories property
        // console.log(`Product name: ` + data.product.product_name);       // Log the product product_name property
        // console.log(`Type of food: ` + data.product.generic_name);          
        // console.log(`Ingredients: ` + data.product.ingredients_text);       
        // console.log(`Image URL: ` + data.product.image_url);             // Returns the image of the product

        // If object with status property is equal to 1, display product information on page
        if (data.status === 1) {
            // Displays product name on page
            document.querySelector('#product-name').innerText = `Product name: ${data.product.product_name}`
            // Displays product image on page
            document.querySelector('#product-image').src = data.product.image_url
            // Displays product nutrition on page
            document.querySelector('#product-nutrition').src = data.product.image_nutrition_url
        // If object with status property is equal to 0, alert user to check their UPC code
        } else if (data.status === 0) {
            alert(`Product ${choice} does not exist. Try again.`)
        }
    })
    .catch(err => {
        console.log(`error: ${err}`);                                       // Error handling
    })
}