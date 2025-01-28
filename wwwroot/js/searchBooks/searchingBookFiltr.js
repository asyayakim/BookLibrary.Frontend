import {renderBooksForSearch, updateFilterTags} from "./searchingBookView.js";


export function applyFilters(activeFilters, sortedBooks = []) {
    let filteredBooks = [...sortedBooks];

    activeFilters.forEach(filter => {
        if (filter.type === 'year') {
            const [yearFrom, yearTo] = filter.label
                .replace('Year: ', '')
                .split(' - ')
                .map(year => parseInt(year === 'any' ? NaN : year, 10));

            filteredBooks = filteredBooks.filter(book => {
                const year = parseInt(book.year, 10);
                return (!isNaN(yearFrom) ? year >= yearFrom : true) &&
                    (!isNaN(yearTo) ? year <= yearTo : true);
            });
        }

        if (filter.type === 'genre') {
            let genre = filter.label.toLowerCase();
            filteredBooks = filteredBooks.filter(book =>
                book.genre && book.genre.toLowerCase().includes(genre)
            );
        }
    });

    renderBooksForSearch(filteredBooks);
    updateFilterTags(activeFilters, sortedBooks);
}
