document.addEventListener('DOMContentLoaded', function() {
    const flightTable = document.getElementById('flight-table');
    const notificationForm = document.getElementById('notification-form');

    function updateFlights() {
        fetch('http://localhost:5000/api/flights')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Flight data received:', data); // For debugging
                flightTable.innerHTML = '<tr><th>Flight</th><th>Status</th><th>Gate</th></tr>';
                data.forEach(flight => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${flight.flight_number || 'N/A'}</td><td>${flight.status || 'N/A'}</td><td>${flight.gate || 'N/A'}</td>`;
                    flightTable.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching flight data:', error));
    }

    notificationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch('http://localhost:5000/api/subscribe', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Error subscribing:', error));
    });

    setInterval(updateFlights, 30000); // Update flights every 30 seconds
    updateFlights(); // Initial call to populate table on page load
});
