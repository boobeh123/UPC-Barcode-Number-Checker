document.querySelector('button').addEventListener('click', getFetch);       // Listens for click on button

// Function requires user to enter barcode number and click button to submit
function getFetch() {
// choice will grab the UPC number from the input field
const choice = document.querySelector('#barcode').value;
// the twelve digit number will be pasted where the template literal ${} sits
const UPC_Number = `https://world.openfoodfacts.org/api/v0/product/${choice}.json`;

fetch(UPC_Number)                                                           // Fetches 12-Digit UPC Barcode number 737628064502
    .then(response => response.json())                                      // Parse response as JSON
    .then(data => {                                                         // Save JSON in variable data
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
            // document.querySelector('#product-name').innerText = `Product name: ${data.product.product_name}`
            // Displays product image on page
            // document.querySelector('#product-image').src = data.product.image_url
            // Displays product nutrition on page
            // document.querySelector('#product-nutrition').src = data.product.image_nutrition_url

            // Call constructor and pass data product property 
            const UPC_product = new ProductInfo(data.product)
            // Displays name, image, and nutrition using one method vs many functions
            UPC_product.displayUPC_Product();
            // Creates table elements and displays ingredients
            UPC_product.displayUPC_Ingredients();

        // If object with status property is equal to 0, alert user to check their UPC code
        } else if (data.status === 0) {
            alert(`Product ${choice} does not exist. Try again.`)
        }
    })
    .catch(err => {
        console.log(`error: ${err}`);                                       // Error handling
    })
}

// Using a class allows the use of constructors and methods
class ProductInfo {
    // Properties of data.product object will be passed into constructor
    constructor(productProperty) {
        this.name = productProperty.product_name                            // product_name is the property
        this.image = productProperty.image_url                              // image_url is the property
        this.nutrition = productProperty.image_nutrition_url                // image_nutrition_url '' '' ''
        this.ingredients = productProperty.ingredients                      // ingredients '' '' ''
    }

    // Method to display product name and images onto page
    displayUPC_Product() {
        document.querySelector('#product-name').innerText = this.name
        document.querySelector('#product-image').src = this.image
        document.querySelector('#product-nutrition').src = this.nutrition
    }

    // Method deletes first index/row to clear table
    // Then method adds <tr> & <td> tags, and inserts text into <td> tags
    displayUPC_Ingredients() {
        let tableRef = document.querySelector('#product-ingredient')        // Inserts <tr> tags on <table>
        for (let i = 1; i < tableRef.rows.length;) {                         // Iterate through table starting at the first index,
            tableRef.deleteRow(i);                                          // Then delete rows at index 1. No need to increment iterations (Index 3 becomes index 2 on removal, index 2 becomes index 1)
        }

        for (let key in this.ingredients) {                                 // Iterate through properties in ingredient list
        let newRow = tableRef.insertRow(-1)                                 // Inserts a new row on a given table
        let newCell = newRow.insertCell(0)                                  // Inserts a new cell on a given row
        let newText = document.createTextNode(this.ingredients[key].text)   // Creates a new text node
        newCell.appendChild(newText)                                        // Inserts text (ingredient) into cell
        if (this.ingredients[key].vegetarian == null ? 'unknown' : this.ingredients[key].vegetarian) {
            newCell.classList.add('non-veg-item')
        }
        }  
    }
}