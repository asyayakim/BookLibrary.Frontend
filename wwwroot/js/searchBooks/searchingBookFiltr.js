export function updateFilterTags(filters) {
    const filterTagsDiv = document.getElementById('filterTags');
    filterTagsDiv.innerHTML = '';

    filters.forEach(filter => {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.textContent = filter.label;

        // Add a click event to remove the filter
        tag.addEventListener('click', () => {
            filter.remove();
            filters = activeFilters.filter(f => f !== filter);
            applyFilters(); // Reapply filters after removing one
        });

        filterTagsDiv.appendChild(tag);
    });
}
export function applyFilters() {
    let filteredBooks = [...sortedBooks];

    activeFilters.forEach(filter => {
        if (filter.type === 'year') {
            const yearFrom = parseInt(document.getElementById('yearFrom').value, 10);
            const yearTo = parseInt(document.getElementById('yearTo').value, 10);
            filteredBooks = filteredBooks.filter(book => {
                const year = parseInt(book.year, 10);
                return (!isNaN(yearFrom) ? year >= yearFrom : true) &&
                    (!isNaN(yearTo) ? year <= yearTo : true);
            });
        }

        if (filter.type === 'genre') {
            const genre = filter.label.split(': ')[1].toLowerCase();
            filteredBooks = filteredBooks.filter(book =>
                book.genre.toLowerCase().includes(genre)
            );
        }
    });

    

    renderBooksForSearch(filteredBooks);
    updateFilterTags(activeFilters);
}
