
document.querySelector('.form-input').addEventListener('submit', (event) => {
    event.preventDefault()
    formHandler()
})


async function formHandler() {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const register = {
        name:name,
        email:email,
        password:password,
    }

    if (register) {
        const baseUrl = window.location.origin
        try {
            const response = await fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(register),
                })
    
            if (!response.ok) {
                return window.location.assign('/register')
            }
            
            return window.location.assign('/login')

        } catch (err) {
        throw new Error(err)
        }
    }
}