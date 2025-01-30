export async function fetchAndDisplayEvents() {
    const eventsContainer = document.getElementById('events');
    eventsContainer.innerHTML = '<div class="loading">Loading events...</div>';

    try {
        const response = await fetch('http://localhost:5294/api/GetEvents?location=Oslo');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events = await response.json();
        console.log(events);
        renderEvents(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        eventsContainer.innerHTML = `
            <div class="error-message">
                Failed to load events. Please try again later.
                <br><small>${error.message}</small>
            </div>
        `;
    }
}

function renderEvents(events) {
    const container = document.getElementById('events');
    container.innerHTML = events.length > 0
        ? events.map(event => {
            const eventDate = new Date(event.dates?.start?.localDate);
            const day = eventDate.getDate(); 
            const month = eventDate.toLocaleString('default', { month: 'short' }); 

            return `
                <div class="event-card">
                    ${event.images?.length > 0 ? `
                        <img src="${event.images[0].url}" 
                             alt="${event.name}" 
                             class="event-image">` : ''}
                    <div class="event-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <div class="event-details">
                        <h3>${event.name}</h3>
                        <div class="event-meta">
                            <p class="event-location">
                                📍 ${[
                event._embedded?.venues[0]?.name,
                event._embedded?.venues[0]?.city?.name
            ].filter(Boolean).join(', ')}
                            </p>
                        </div>
                        <a href="${event.url}" 
                           target="_blank" 
                           class="event-link">
                            More Details
                        </a>
                    </div>
                </div>
            `;
        }).join('')
        : '<p class="no-events">No upcoming events found</p>';
}
