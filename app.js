let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';
tg.MainButton.text = "Менің тапсырысым"; // "My Order"
let selectedItems = []; // Array to hold selected items

// Make sure the main button is visible
tg.MainButton.isVisible = true;
tg.BackButton.isVisible = false;
function addItem(button) {
    const itemElement = button.closest('.item');
    const itemName = itemElement.querySelector('.item-name').textContent; // Get item name
    
    let itemCountElement = itemElement.querySelector('.item-count');
    let count = parseInt(itemCountElement.textContent) || 0;
    count++;
    
    itemCountElement.textContent = count;
    let itemPrice = count * parseInt(itemElement.querySelector('.item-price').textContent.replace("₸", "")); // Get item price
    updateUI(itemElement, count);
    updateSelectedItems(itemName, count, itemPrice); // Update the selected items array
}


function updateSelectedItems(itemName, count, itemPrice) {
    const existingItem = selectedItems.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.count = count; // Update existing item's count
        existingItem.price = itemPrice; // Update existing item's price
    } else {
        selectedItems.push({ name: itemName, count, price: itemPrice }); // Use itemPrice for the new item
    }
}

function updateUI(itemElement, count) {
    const itemCountDisplay = itemElement.querySelector('.item-count');
    const buttonContainer = itemElement.querySelector('.button-container');
    const addButton = itemElement.querySelector('.btn:not(.minus-btn):not(.plus-btn)'); // Select the add button

    if (count > 0) {
        itemCountDisplay.style.display = 'block';
        buttonContainer.style.display = 'flex';
        addButton.style.display = 'none';
    } else {
        itemCountDisplay.style.display = 'none';
        buttonContainer.style.display = 'none';
        addButton.style.display = 'inline-block';
    }
}

function hideDescription(element) {
    element.style.display = 'none'; // Hide the clicked element
}

function toggleDescription(element) {
    const fullDescription = element.nextElementSibling; // Get the next sibling (full description)

    if (fullDescription.style.display === "none" || fullDescription.style.display === "") {
        fullDescription.style.display = "block"; // Show full description
    } else {
        fullDescription.style.display = "none"; // Hide full description
    }
}

// Handle main button click event
// Handle main button click event
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    const orderData = JSON.stringify(selectedItems); // Convert selected items to JSON string
    localStorage.setItem('orderData', orderData); // Store data in local storage
    
    window.location.href = "order.html"; // Redirect to order summary page
});


// Function to display order summary or other actions can be added here

// Example of how to initialize user card or other elements if needed
let usercard = document.getElementById("usercard");
