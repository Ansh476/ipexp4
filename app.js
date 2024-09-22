document.addEventListener("DOMContentLoaded", function () {

    const personalDetailsForm = document.getElementById('personalDetailsForm');
    const orderForm = document.getElementById('orderForm');
    const receiptDiv = document.getElementById('receipt');

    let personalDetailsSubmitted = false;

    personalDetailsForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const dob = document.getElementById('dateob').value;
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');

        if (name === '') {
            alert('Name is required.');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?<!\.)$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (dob === '') {
            alert('Date of birth is required.');
            return;
        }

        const phonePattern = /^[6-9]\d{9}$/;
        const repetitiveNumbers = /^(.)\1+$/; 

        if (!phonePattern.test(phone) || repetitiveNumbers.test(phone)) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        if (address === '') {
            alert('Address is required.');
            return;
        }

        if (!gender) {
            alert('Gender is required.');
            return;
        }

        personalDetailsSubmitted = true;
        alert('Personal details submitted successfully.');
    });

    orderForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!personalDetailsSubmitted) {
            alert('Please submit your personal details first.');
            return;
        }

        const tagline = document.getElementById('tagline').value.trim();
        const delivery = document.querySelector('input[name="delivery"]:checked');
        const tandc = document.getElementById('tandc').checked;

        if (tagline.length === 0) {
            alert('Tagline is required.');
            return;
        } else if (tagline.length > 100) {
            alert('Tagline must be under 100 characters.');
            return;
        }

        if (!delivery) {
            alert('Please select a delivery option.');
            return;
        }

        if (!tandc) {
            alert('You must agree to the terms and conditions.');
            return;
        }

        generateReceipt();
    });

    function generateReceipt() {
        receiptDiv.innerHTML = '';

        const currentDate = new Date().toLocaleDateString('en-IN');

        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const tagline = document.getElementById('tagline').value.trim();
        const size = document.getElementById('size').value;

        const receiptContent = `
            <h2>Order Receipt</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Tagline:</strong> ${tagline}</p>
            <p><strong>Size:</strong> ${size}</p>
            <p><strong>Date:</strong> ${currentDate}</p>
        `;
        receiptDiv.innerHTML = receiptContent;
    }
});
