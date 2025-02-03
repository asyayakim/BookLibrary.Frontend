
export function attachDeleteEventHandlers() {
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            event.stopPropagation(); 
            const id = button.getAttribute('data-isbn');
            await deleteBook(id);
            button.parentElement.parentElement.remove();
        });
    });
}
