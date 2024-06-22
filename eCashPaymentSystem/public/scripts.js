document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('paymentSection').style.display = 'block';
    } else {
        alert(data.error);
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('paymentSection').style.display = 'block';
    } else {
        alert(data.error);
    }
});

document.getElementById('payButton').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const method = document.getElementById('method').value;
    const token = localStorage.getItem('token');

    const response = await fetch('/api/payments/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ userId: 'your_user_id', amount, method })
    });

    const data = await response.json();
    if (response.ok) {
        const qrCode = document.getElementById('qrCode');
        qrCode.innerHTML = `<img src="${data.qrCode}" />`;
    } else {
        alert(data.error);
    }
});

