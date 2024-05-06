document.querySelector('.form-input').addEventListener('submit', (event) => {
    event.preventDefault()
    formHandler()
})


async function formHandler() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const login = {
        email:email,
        password:password,
    }

    if (login) {
        const baseUrl = window.location.origin
        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
                })
    
            if (!response.ok) {
                return window.location.assign('/login')
            }
            
            return window.location.assign('/index')

        } catch (err) {
        throw new Error(err)
        }
    }
}