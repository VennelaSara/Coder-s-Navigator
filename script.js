document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitPreferences');

    submitButton.addEventListener('click', function() {
        // Collect user preferences from the form
        const destination = document.getElementById('destination').value;
        const temp_min = document.getElementById('temp_min').value;
        const temp_max = document.getElementById('temp_max').value;
        const weather = document.getElementById('weather').value;
        const traffic = document.getElementById('traffic').value;
        const places_preference = document.getElementById('places_preference').value;
        const public_transit = document.getElementById('public_transit').value;

        // Construct JSON object with preferences
        const preferences = {
            destination: destination,
            temp_min: parseInt(temp_min),
            temp_max: parseInt(temp_max),
            weather: weather,
            traffic: traffic,
            places_preference: places_preference,
            public_transit: public_transit
        };

        // Send preferences to backend API
        fetch('/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferences),
        })
        .then(response => response.json())
        .then(data => {
            // Process recommendations and update UI
            displayRecommendations(data.recommendations);
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error scenario
        });
    });

    function displayRecommendations(recommendations) {
        const recommendationsContainer = document.getElementById('recommendationsContainer');
        recommendationsContainer.innerHTML = ''; // Clear previous recommendations

        recommendations.forEach(rec => {
            const routeElement = document.createElement('div');
            routeElement.classList.add('route');

            routeElement.innerHTML = `
                <h3>Route to ${rec.Destination}</h3>
                <p>Weather: ${rec.Weather.Temperature}°C, ${rec.Weather.Condition}</p>
                <p>Traffic: ${rec.Traffic}</p>
                <p>Accident Prediction: ${rec['Accident Prediction']}</p>
                <p>Places of Interest: ${rec['Places of Interest']}</p>
                <p>Public Transit: ${rec['Public Transit']}</p>
            `;

            recommendationsContainer.appendChild(routeElement);
        });
    }
});
