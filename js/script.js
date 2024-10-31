// Select DOM elements
const contactForm = document.getElementById('contactForm');
const contacts = document.getElementById('contacts');
const errorMessage = document.getElementById('error-message');
const clearListBtn = document.getElementById('clearListBtn');

// Function to show error messages
function showError(message) {
    errorMessage.textContent = message;
}

// Function to clear error messages
function clearError() {
    errorMessage.textContent = 'You may not create an empty contact';
}

// Function to validate contact input
function validateContact(name, phone) {
    if (!name || !phone) {
        return 'Both name and phone number are required.';
    }
    return null;
}

// Function to create a new contact
function createContact(name, phone) {
    // Create a new list item for the contact
    const listItem = document.createElement('li');
    listItem.classList.add('contact');
    listItem.innerHTML = `
        <input type="text" value="${name}" disabled />
        <input type="tel" value="${phone}" disabled />
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    `;

    // Append the new contact to the list
    contacts.appendChild(listItem);

    // Add event listeners for edit and delete buttons
    const editButton = listItem.querySelector('.editBtn');
    const deleteButton = listItem.querySelector('.deleteBtn');

    // Bind the edit functionality
    editButton.addEventListener('click', function() {
        editContact(listItem, editButton);
    });

    // Bind the delete functionality
    deleteButton.addEventListener('click', function() {
        deleteContact(listItem);
    });
}

// Function to edit a contact
function editContact(listItem, editButton) {
    const inputs = listItem.querySelectorAll('input[type="text"], input[type="tel"]');
    const isDisabled = inputs[0].disabled;

    // Toggle between enable and disable for editing
    inputs.forEach(input => input.disabled = !isDisabled);
    editButton.textContent = isDisabled ? 'Save' : 'Edit';

    // Save the changes and validate input when editing is done
    if (!isDisabled) {
        editButton.addEventListener('click', function saveContact() {
            const name = inputs[0].value.trim();
            const phone = inputs[1].value.trim();
            const validationError = validateContact(name, phone);
            
            if (validationError) {
                showError(validationError);
            } else {
                clearError();
                inputs.forEach(input => input.disabled = true);
                editButton.textContent = 'Edit';
            }
            editButton.removeEventListener('click', saveContact);
        }, { once: true });
    }
}

// Function to delete a contact
function deleteContact(listItem) {
    contacts.removeChild(listItem);
}

// Function to clear the entire contact list
function clearContactList() {
    contacts.innerHTML = '';
    clearError();
}

// Event listener for form submission
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const name = contactForm.name.value.trim();
    const phone = contactForm.phone.value.trim();
    const validationError = validateContact(name, phone);

    if (validationError) {
        showError(validationError);
    } else {
        clearError();
        createContact(name, phone);
        contactForm.reset(); // Clear input fields after adding contact
    }
});

// Event listener for "Clear List" button
clearListBtn.addEventListener('click', clearContactList);
