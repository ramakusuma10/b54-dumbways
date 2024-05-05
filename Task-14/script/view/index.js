document.querySelectorAll('.btn-warning').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', async () => {
        const id = deleteBtn.dataset.id
        const baseUrl = window.location.origin

        await fetch(`${baseUrl}/addproject/${id}`, {
            method: 'DELETE',
        })

        window.location.assign('/index')
    })
})
