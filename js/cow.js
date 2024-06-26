'use strict';
// cow-button

(() => {
  const dialog = document.getElementById('cowDialog');
  const openDialog = document.getElementById('key');
  const closeCowBtn = document.getElementById('closeCowBtn');
  openDialog.addEventListener('click', async () => {

    const response = await fetch('cow.html');
    document.getElementById('cowContent').innerHTML = await response.text();
    dialog.showModal();
    closeCowBtn.addEventListener('click', () => dialog.close());
    if (dialog.open) {
      const findCowButton = document.getElementById('find-cow-button');
      const cowInfoTable = document.getElementById('cow-info-table');
      const map = L.map('cow-map');
      setTimeout(() => {
        map.setView([60, 24], 7);

        L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        }).addTo(map);
      }, 100);

      findCowButton.addEventListener('click', function() {
        const latitude = Math.random() * (90 - (-90)) + (-90);
        const longitude = Math.random() * (180 - (-180)) + (-180);

        map.setView([latitude, longitude], 5);
        L.marker([latitude, longitude]).
            addTo(map).
            bindPopup('Tauno').
            openPopup();

        fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`).
            then(response => response.json()).
            then(data => {
              const locationName = data.display_name;
              const apiKey = '7d8f87496ac04244db9d9f436de08758';
              const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' +
                  latitude + '&lon=' + longitude + '&appid=' + apiKey;

              cowInfoTable.innerHTML = `
                    <tr>
                        <td>Location:</td>
                        <td>${locationName}</td>
                    </tr>
                `;

              fetch(apiUrl).then(response => response.json()).then(data => {
                const weatherDescription = data.weather[0].description;
                const temperature = (data.main.temp - 273.15).toFixed(1);
                cowInfoTable.innerHTML += `
                            <tr>
                                <td>Weather:</td>
                                <td>${weatherDescription}</td>
                            </tr>
                            <tr>
                                <td>Temperature:</td>
                                <td>${temperature} °C</td>
                            </tr>
                        `;
              }).catch(error => {
                console.error('Error fetching weather data:', error);
                cowInfoTable.innerHTML += `<tr><td colspan="2">Error fetching weather data</td></tr>`;
              });
            }).
            catch(error => {
              console.error('Error fetching location data:', error);
              cowInfoTable.innerHTML = `<tr><td colspan="2">Error fetching location data</td></tr>`;
            });
      });
    }
  });
})();
