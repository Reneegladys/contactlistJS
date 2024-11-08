// Select DOM elements
const contactForm = document.getElementById('contactForm');
const kontakter = document.getElementById('kontakter');
const clearListBtn = document.getElementById('clearListBtn');
const formErrorMessage = contactForm.querySelector('.error-message');

// Function to show error messages in the form
function showFormError(message) {
    formErrorMessage.textContent = message;
    formErrorMessage.style.display = 'block';
}

// Function to clear form error messages
function clearFormError() {
    formErrorMessage.textContent = '';
    formErrorMessage.style.display = 'none';
}

// Function to validate contact input
function validateContact(name, phone) {
    if (!name) {
        return 'Name is required.';
    }
    if (!phone) {
        return 'Phone number is required.';
    }
    return null;
}

// Function to create a new contact
function createContact(name, phone) {
    const validationError = validateContact(name, phone);
    if (validationError) {
        showFormError(validationError);
        return;
    }

    clearFormError(); // Clear any existing error message

    const listItem = document.createElement('li');
    listItem.classList.add('kontakt');
    listItem.innerHTML = `
        <input type="text" class="contact-name" value="${name}" disabled />
        <input type="tel" class="contact-phone" value="${phone}" disabled />
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
        <p class="error-message" style="display: none; color: red;"></p>
    `;

    kontakter.appendChild(listItem);

    const editButton = listItem.querySelector('.editBtn');
    const deleteButton = listItem.querySelector('.deleteBtn');

    // Bind the edit functionality
    editButton.addEventListener('click', function () {
        editContact(listItem, editButton);
    });

    // Bind the delete functionality
    deleteButton.addEventListener('click', function () {
        deleteContact(listItem);
    });
}

// Function to edit a contact
function editContact(listItem, editButton) {
    const nameField = listItem.querySelector('.contact-name');
    const phoneField = listItem.querySelector('.contact-phone');
    const errorDisplay = listItem.querySelector('.error-message');
    const isDisabled = nameField.disabled;

    if (isDisabled) {
        // Enable fields for editing
        nameField.disabled = false;
        phoneField.disabled = false;
        editButton.textContent = 'Save';
    } else {
        // Validate inputs before saving
        const name = nameField.value.trim();
        const phone = phoneField.value.trim();
        const validationError = validateContact(name, phone);

        if (validationError) {
            errorDisplay.textContent = validationError;
            errorDisplay.style.display = 'block';
        } else {
            errorDisplay.style.display = 'none';
            // Disable fields and save changes
            nameField.disabled = true;
            phoneField.disabled = true;
            editButton.textContent = 'Edit';
        }
    }
}

// Function to delete a contact
function deleteContact(listItem) {
    kontakter.removeChild(listItem);
}

// Function to clear the entire contact list
function clearContactList() {
    kontakter.innerHTML = '';
    clearFormError();
}

// Event listener for the form submission to create a contact
contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = contactForm.name.value.trim();
    const phone = contactForm.phone.value.trim();
    createContact(name, phone);

    // Reset the form after creating a contact
    contactForm.reset();
});

// Event listener for the "Clear List" button to clear all contacts
clearListBtn.addEventListener('click', clearContactList);
