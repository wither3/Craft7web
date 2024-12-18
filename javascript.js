async function fetchTikTokProfile() {
  const url = 'https://rullz-api.vercel.app/tikstalk?username=qhairulpratama';
  const profileContainer = document.getElementById('profile-container');
  const loadingText = document.getElementById('loading');

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Hapus teks loading
    loadingText.remove();

    if (data.success) {
      const profile = data.data;

      // Pisahkan teks nickname sebelum tanda "—"
      const separator = '—';
      const nickname = profile.nickname.includes(separator)
        ? profile.nickname.split(separator)[0].trim()
        : profile.nickname;

      // Tambahkan data ke halaman
      profileContainer.innerHTML = `
      <center>
        <img src="${profile.profilePicture}" alt="${profile.username}" class="rounded-full w-20 h-20"></center>
        <center><h2>${nickname}</h2>
        <font color="#626262">
        <p><a href="${profile.profileUrl}" target="_blank">@${profile.username}</a></p></center></font>
  
  <div class="geserrr">
      <div class="kotakdata">
          <center>
          <font color="#737373">following</font>
          <p>${profile.stats.following}</p></center>
          </div>
      <div class="kotakdata">
          <center>
   <font color="#737373">
   <p>followers</p></font>
   <p>${profile.stats.totalFollowers}</p></center>
   </div>
   <div class="kotakdata">
       <center>
        <font color="737373"><p>Like</p></font>
        <p>${profile.stats.totalLikes}</p></center>
        </div>
        
        <div class="kotakdata">
            <center>
        <font color="737373"><p>Video</p></font>
        <p>${profile.stats.totalVideos}</p></center>
        </div>
        </div>
      `;
    } else {
      profileContainer.innerHTML = '<p>Failed to fetch data.</p>';
    }
  } catch (error) {
    loadingText.innerText = 'Error fetching data.';
    console.error('Error:', error);
  }
}

// Jalankan fetch data saat halaman dibuka
window.onload = fetchTikTokProfile;


async function fetchPing() {
      const responseTimeElement = document.querySelector('.response-time');
      try {
        const startTime = performance.now(); // Waktu mulai
        const response = await fetch('https://rullz-api.vercel.app/ping'); // Fetch API
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`); // Cek status respons
        const endTime = performance.now(); // Waktu selesai
        const elapsedTime = (endTime - startTime).toFixed(2); // Hitung waktu respons
        responseTimeElement.textContent = `${elapsedTime} ms`;
        responseTimeElement.classList.remove('error'); // Hapus class error jika ada
      } catch (error) {
        responseTimeElement.textContent = 'Failed to fetch';
        responseTimeElement.classList.add('error'); // Tambahkan class error
        console.error('Error:', error.message);
      }
    }

    // Panggil fungsi fetchPing setiap 1 detik
    setInterval(fetchPing, 2000);

    // Fetch pertama kali saat halaman dimuat
    fetchPing();
    
        const menuButton = document.getElementById('menuButton');
        const closeButton = document.getElementById('closeButton');
        const sidebar = document.getElementById('sidebar');
        const musicButton = document.getElementById('musicButton');
        const audioPlayer = document.getElementById('audioPlayer');
        
        menuButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        closeButton.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });

        musicButton.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        });

        // Fetch earthquake data from API
        fetch('https://rullz-api.vercel.app/gempa')
            .then(response => response.json())
            .then(data => {
                const newsContainer = document.getElementById('newsContainer');
                const item = data; // Only use the first item
                const newsItem = document.createElement('div');
                newsItem.classList.add('untukGempa');
                newsItem.innerHTML = `
             <center><font size="4px" class="font-medium text-blue-600">Gempa Indonesia terkini</font></center>
                    <div class="flex">
                        <img alt="gagal memunculkan peta" class="map-image rounded-lg" src="${item.gambarUrl}" />
                        <div class="w-[calc(75%-20px)]">
                            <p class="text-gray-700 info-text"><strong>Waktu:</strong> ${item.waktu}</p>
                     
                            <p class="text-gray-700 info-text"><strong>Magnitude:</strong> ${item.magnitude}</p>
                            <p class="text-gray-700 info-text"><strong>Kedalaman:</strong> ${item.kedalaman}</p>
    <a href="#" class="text-blue-500 text-sm" id="toggleText">Baca selengkapnya...</a>                     
<div id="moreText" class="more-text">                            <p class="text-gray-700 info-text"><strong>Koordinat:</strong>
       ${item.koordinat}</p>
                            <p class="text-gray-700 info-text"><strong>Lokasi:</strong>${item.lokasi}</p>
                           
                                <p class="text-gray-700 info-text">${item.lokasi}</p>
                                <p class="text-gray-700 info-text"><strong>Saran:</strong> ${item.saran}</p>
                            </div>
                        </div>
                    </div>
                    
                `;
                newsContainer.appendChild(newsItem);

                const toggleText = document.getElementById('toggleText');
                const moreText = document.getElementById('moreText');

                toggleText.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (moreText.style.display === 'none' || moreText.style.display === '') {
                        moreText.style.display = 'block';
                        toggleText.textContent = 'Baca sedikit...';
                    } else {
                        moreText.style.display = 'none';
                        toggleText.textContent = 'Baca selengkapnya...';
                    }
                });
            })
            .catch(error => console.error('Error fetching earthquake data:', error));

        // Handle API Test Form 1 Submission
        function toggleResponse(id) {
            const responseDiv = document.getElementById(id);
            const arrow = document.getElementById(id.replace('response', 'arrow'));
            if (responseDiv.style.display === 'none' || !responseDiv.style.display) {
                responseDiv.style.display = 'block';
                arrow.classList.add('rotate');
            } else {
                responseDiv.style.display = 'none';
                arrow.classList.remove('rotate');
            }
        }

        // Fetch data from BMKG Gempa API
        function fetchGempa() {
            const output = document.getElementById('gempa-output');
            output.textContent = 'Loading...';
            const bmkgApi ='https://rullz-api.vercel.app/gempa';
            fetch(bmkgApi)
                .then(response => response.json())
                .then(data => {
                    output.textContent =`${bmkgApi}\n\n${JSON.stringify(data, null, 2)}`;
                })
                .catch(error => {
                    output.textContent = `Error: ${error.message}`;
                });
        }

        // Fetch data from YouTube Downloader API
        function fetchYouTube() {
            const url = document.getElementById('youtube-url').value;
            const format = document.getElementById('format1').value;
            const output = document.getElementById('youtube-output');

            if (!url || !format) {
                output.textContent = 'URL dan format wajib diisi!';
                return;
            }

            output.textContent = 'Loading...';
            const YTapi =`https://ytdownloader-beryl.vercel.app/api/download?url=${encodeURIComponent(url)}&format=${format}`;
            fetch(YTapi)
                .then(response => response.json())
                .then(data => {
                    output.textContent =`${YTapi}\n\n${JSON.stringify(data, null, 2)}`;
                })
                .catch(error => {
                    output.textContent = `Error: ${error.message}`;
                });
        }

        // Fetch data from TikTok Downloader API
        function fetchTikTok() {
            const url = document.getElementById('tiktok-url').value;
            const output = document.getElementById('tiktok-output');

            if (!url) {
                output.textContent = 'URL TikTok wajib diisi!';
                return;
            }

            output.textContent = 'Loading...';
            const apiUrl =`https://rullz-api.vercel.app/tiktok/download?url=${encodeURIComponent(url)}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    output.textContent =`${apiUrl}\n\n ${JSON.stringify(data, null, 2)}`;
                })
                .catch(error => {
                    output.textContent = `Error: ${error.message}`;
                });
        }
        
                // Fetch data from TikTok Downloader v2 API
        function fetchTikTokt() {
            const url = document.getElementById('tiktok-urll').value;
            const output = document.getElementById('tiktok-outputt');

            if (!url) {
                output.textContent = 'URL TikTok wajib diisi!';
                return;
            }

            output.textContent = 'Loading...';
            const apiUrl =`https://rullz-api.vercel.app/tmate/download?url=${encodeURIComponent(url)}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    output.textContent =`${apiUrl}\n\n ${JSON.stringify(data, null, 2)}`;
                })
                .catch(error => {
                    output.textContent = `Error: ${error.message}`;
                });
        }
                     // Fetch data from Tikwm api
        function fetchTikWM() {
            const url = document.getElementById('tikwm-url').value;
            const output = document.getElementById('tikwm-output');

            if (!url) {
                output.textContent = 'URL TikTok wajib diisi!';
                return;
            }

            output.textContent = 'Loading...';
            const apiUrl =`https://rullz-api.vercel.app/tikwm/download?url=${encodeURIComponent(url)}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    output.textContent =`${apiUrl}\n\n ${JSON.stringify(data, null, 2)}`;
                })
                .catch(error => {
                    output.textContent = `Error: ${error.message}`;
                });
        }
                   // Fetch data from TikTok Downloader ssstik API
        function fetchssstik() {
            const url = document.getElementById('ssstik-url').value;
            const output = document.getElementById('ssstik-output');

            if (!url) {
                output.textContent = 'URL TikTok wajib diisi!';
                return;
            }

            output.textContent = 'Loading...';
            const apiUrl =`https://rullz-api.vercel.app/ssstik/download?url=${encodeURIComponent(url)}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    output.textContent =`${apiUrl}\n\n ${JSON.stringify(data, null, 2)}`;
                })
                .catch(error => {
                    output.textContent = `Error: ${error.message}`;
                });
        }
        
                     // Fetch data from TikTok Downloader musdown API
        function fetchmus() {
            const url = document.getElementById('MSdown-url').value;
            const output = document.getElementById('MSdown-output');

            if (!url) {
                output.textContent = 'URL TikTok wajib diisi!';
                return;
            }

            output.textContent = 'Loading...';
            const apiUrl =`https://rullz-api.vercel.app/msdown/download?url=${encodeURIComponent(url)}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    output.textContent =`${apiUrl}\n\n ${JSON.stringify(data, null, 2)}`;
                })
                .catch(error => {
                    output.textContent = `Error: ${error.message}`;
                });
        }
        
                     // Fetch data from apel musik downloader api
        function fetchApel() {
            const url = document.getElementById('Apel-url').value;
            const output = document.getElementById('Apel-output');

            if (!url) {
                output.textContent = 'URL TikTok wajib diisi!';
                return;
            }

            output.textContent = 'Loading...';
            const apiUrl =`https://rullz-api.vercel.app/tmate/download?url=${encodeURIComponent(url)}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    output.textContent =`${apiUrl}\n\n ${JSON.stringify(data, null, 2)}`;
                })
                .catch(error => {
                    output.textContent = `Error: ${error.message}`;
                });
        }
   
    async function fetchWeather() {
      try {
        const response = await fetch('https://rullz-api.vercel.app/cuaca');
        const data = await response.json();

        if (data.status === "success") {
          const weatherContainer = document.getElementById('weather');
          const cities = data.data;

          for (const city in cities) {
            const { Time, Temperatur, Kondisi } = cities[city];

            // Tentukan video berdasarkan kondisi cuaca
            let videoURL = '';
            if (Kondisi.toLowerCase().includes('rain')) {
              videoURL = 'https://pm6jctnwwrulrr4g.public.blob.vercel-storage.com/desa_dan_sawah_saat_cuaca_hujan_deras-8s0fppwmuroYRfZTlSQzppwkvkn5I8.mp4';
            } else if (Kondisi.toLowerCase().includes('cloudy')) {
              videoURL = 'https://pm6jctnwwrulrr4g.public.blob.vercel-storage.com/desa_di_tengah_sungai_dengan_cuaca_hujan-ErNUrZO1VpvqZcxXcN0VdkBesBv1KR.mp4';
            } else {
              videoURL = 'https://pm6jctnwwrulrr4g.public.blob.vercel-storage.com/desa_di_tengah_sungai_dengan_cuaca_cerah-gaUTLluShjcKOFMxVqP1SQ7yXBOJWr.mp4';
            }

            // Buat elemen kota dengan video background
            const cityElement = document.createElement('div');
            cityElement.classList.add('city');

            cityElement.innerHTML = `
              <video autoplay muted loop>
                <source src="${videoURL}" type="video/mp4">
                Video tidak didukung oleh browser Anda.
              </video>
              <div class="content">
                <p class="text-2xl font-normal">${city}</p>
                <p><strong>Waktu:</strong> ${Time}</p>
                <p><strong>Suhu:</strong> ${Temperatur}°C</p>
                <p><strong>Kondisi:</strong> ${Kondisi}</p>
              </div>
            `;

            weatherContainer.appendChild(cityElement);
          }
        } else {
          alert('Gagal mendapatkan data cuaca.');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Terjadi kesalahan saat mengambil data.');
      }
    }

    fetchWeather();