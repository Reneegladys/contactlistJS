

// Always select DOM elements first
const contactForm = document.getElementById('contactForm');
const kontakter = document.getElementById('kontakter');
const clearListBtn = document.getElementById('clearListBtn');
const formErrorMessage = contactForm.querySelector('.error-message');

console.log({ contactForm, kontakter, clearListBtn });

function showFormError(message) {
    formErrorMessage.textContent = message;
    formErrorMessage.style.display = 'block';
    console.log("Error:", message);
}

function clearFormError() {
    formErrorMessage.textContent = '';
    formErrorMessage.style.display = 'none';
    console.log("Form error cleared.");
}

function validateContact(name, phone) {
    console.log("Validating contact:", { name, phone });
    if (!name) return 'Name is required.';
    if (!phone) return 'Phone number is required.';
    return null;
}

function createContact(name, phone) {
    console.log("Creating contact:", { name, phone });
    const validationError = validateContact(name, phone);
    if (validationError) {
        showFormError(validationError);
        return;
    }

    clearFormError();

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

    editButton.addEventListener('click', function () {
        console.log("Edit clicked for:", { name, phone });
        editContact(listItem, editButton);
    });

    deleteButton.addEventListener('click', function () {
        console.log("Delete clicked for:", { name, phone });
        deleteContact(listItem);
    });
}

function editContact(listItem, editButton) {
    const nameField = listItem.querySelector('.contact-name');
    const phoneField = listItem.querySelector('.contact-phone');
    const errorDisplay = listItem.querySelector('.error-message');
    const isDisabled = nameField.disabled;

    if (isDisabled) {
        nameField.disabled = false;
        phoneField.disabled = false;
        editButton.textContent = 'Save';
    } else {
        const name = nameField.value.trim();
        const phone = phoneField.value.trim();
        const validationError = validateContact(name, phone);

        if (validationError) {
            errorDisplay.textContent = validationError;
            errorDisplay.style.display = 'block';
        } else {
            errorDisplay.style.display = 'none';
            nameField.disabled = true;
            phoneField.disabled = true;
            editButton.textContent = 'Edit';
        }
    }
}

function deleteContact(listItem) {
    kontakter.removeChild(listItem);
    console.log("Contact deleted.");
}

function clearContactList() {
    kontakter.innerHTML = '';
    clearFormError();
    console.log("All contacts cleared.");
}

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = contactForm.name.value.trim();
    const phone = contactForm.phone.value.trim();
    createContact(name, phone);
    contactForm.reset();
    console.log("Form reset.");
});

clearListBtn.addEventListener('click', function() {
    clearContactList();
});
