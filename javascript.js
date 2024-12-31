    // Fungsi untuk mengambil data dari API
    async function fetchTikTokData() {
      const url = 'https://tiktok-api15.p.rapidapi.com/index/Tiktok/getUserVideos?unique_id=%40qhairulpratama&count=0&cursor=0';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '44114406bbmshdee24010b885bc0p140418jsn3d9caf51b4b3',
          'x-rapidapi-host': 'tiktok-api15.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Jika data berhasil diambil
        if (result.code === 0) {
          displayVideos(result.data.videos);
        } else {
          document.getElementById('videoList').innerText = 'Gagal memuat data.';
        }
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('videoList').innerText = 'Terjadi kesalahan saat mengambil data.';
      }
    }

    // Fungsi untuk menampilkan video
    function displayVideos(videos) {
      const videoList = document.getElementById('videoList');
      videoList.innerHTML = '';

      videos.forEach((video) => {
        const videoElement = document.createElement('div');
        
   const timestamp = video.create_time; // Unix timestamp dalam detik
const date = new Date(timestamp * 1000); // Konversi ke milidetik

const day = date.getDate();
const month = date.toLocaleString('en-US', { month: 'short' }); // Bulan disingkat otomatis
const year = date.getFullYear();
const time = date.toTimeString().split(' ')[0]; // Format jam:menit:detik

const formattedDate = `${day} ${month} ${year} ${time}`;

console.log(formattedDate); // Contoh output: "28 Dec 2024 20:38:02"

     
        
        videoElement.className = 'video';
        videoElement.innerHTML = `
      <div class="kotakvideo">
          <div class="videonya">
         <video width="150px" height="980px" controls>
        <source src="${video.play}" type="video/mp4">
        Browser Anda tidak mendukung tag video.
    </video></div>
    <div class="errrmr">
    <font size="1">
    <font color="#5e5e5e">
        <p>${formattedDate}</p>
    </font></font>
    <div class="aaaak">
        <font size="2">
    <p>${video.title}</p></font></div>
    <center>
    <a href="${video.play}" download="namanya.mp4" class="buttono">Download video</a>
    </center>
    </div>
    
      </div>
        `;
        videoList.appendChild(videoElement);
      });
    }

    // Panggil fungsi fetch saat halaman dibuka
    window.onload = fetchTikTokData;
    
    
    
    
    
    
    
    
    
    async function fetchTikTokProfile() {
  const url = 'https://api.tiklydown.eu.org/api/stalk?user=qhairulpratama';
  const profileContainer = document.getElementById('profile-container');
  const loadingText = document.getElementById('loading');

  try {
    const response = await fetch(url);
    const result = await response.json();

    // Hapus teks loading
    loadingText.remove();

    if (result.status === 200) {
      const user = result.data.user;
      const stats = result.data.stats;

      // Pisahkan teks nickname sebelum tanda "—"
      const separator = '—';
      const nickname = user.nickname.includes(separator)
        ? user.nickname.split(separator)[0].trim()
        : user.nickname;

      // Tambahkan data ke halaman
      profileContainer.innerHTML = `
        <center>
          <img src="${user.avatarLarger}" alt="${user.uniqueId}" class="rounded-full w-20 h-20">
        </center>
        <center>
          <h2>${nickname}</h2>
          <font color="#626262">
          <p><a href="https://www.tiktok.com/@${user.uniqueId}" target="_blank">@${user.uniqueId}</a></p>
          </font>
        </center>
        <div class="geserrr">
          <div class="kotakdata">
            <center>
                <font size="2">
              <font color="#737373">Following</font></font>
              <p class="text-1xl font-bold">${stats.followingCount}</p>
            </center>
          </div>
          <div class="kotakdata">
            <center>
                <font size="2">
              <font color="#737373">Followers</font></font>
              <p class="text-1xl font-bold">${stats.followerCount}</p>
            </center>
          </div>
          <div class="kotakdata">
            <center>
                <font size="2">
              <font color="#737373">Likes</font></font>
              <p class="text-1xl font-bold">${stats.heartCount}</p>
            </center>
          </div>
          <div class="kotakdata">
            <center>
                <font size="2">
              <font color="#737373">Videos</font></font>
              <p class="text-1xl font-bold">${stats.videoCount}</p>
            </center>
          </div>
        </div>
      `;
    } else {
      profileContainer.innerHTML = '<p>Failed to fetch data.</p>';
    }
  } catch (error) {
    loadingText.innerHTML = `Error fetching data 🥹:<br>${error.message}`;
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
                const item = data.Infogempa.gempa; // Gunakan objek yang sesuai
                const newsItem = document.createElement('div');
                newsItem.classList.add('untukGempa');
                newsItem.innerHTML = `
                    <center><font size="4px" class="font-medium text-blue-600">Gempa Indonesia Terkini</font></center>
                    <div class="flex">
                        <img alt="Gagal memunculkan peta" class="map-image rounded-lg" src="https://static.bmkg.go.id/${item.Shakemap}" />
                        <div class="w-[calc(75%-20px)]">
                            <p class="text-gray-700 info-text"><strong>Waktu:</strong> ${item.Tanggal} ${item.Jam}</p>
                            <p class="text-gray-700 info-text"><strong>Magnitude:</strong> ${item.Magnitude}</p>
                            <p class="text-gray-700 info-text"><strong>Kedalaman:</strong> ${item.Kedalaman}</p>
                            <a href="#" class="text-blue-500 text-sm" id="toggleText">Baca selengkapnya...</a>                     
                            <div id="moreText" class="more-text">
                                <p class="text-gray-700 info-text"><strong>Koordinat:</strong> ${item.Coordinates}</p>
                                <p class="text-gray-700 info-text"><strong>Lokasi:</strong> ${item.Wilayah}</p>
                                <p class="text-gray-700 info-text"><strong>Potensi:</strong> ${item.Potensi}</p>
                                <p class="text-gray-700 info-text"><strong>Dirasakan:</strong> ${item.Dirasakan}</p>
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
   
 //lovetik tiktok downloader 
 function fetchlovetik() {
            const url = document.getElementById('lovetik-url').value;
            const output = document.getElementById('lovetik-output');

            if (!url) {
                output.textContent = 'URL TikTok wajib diisi!';
                return;
            }

            output.textContent = 'Loading...';
            const apiUrl =`https://tik-downloaders.vercel.app/lovetik?url=${encodeURIComponent(url)}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    output.textContent =`${apiUrl}\n\n ${JSON.stringify(data, null, 2)}`;
                })
                .catch(error => {
                    output.textContent = `Error: ${error.message}`;
                });
        }
        
        
        
 function fetchttsave() {
            const url = document.getElementById('ttsave-url').value;
            const output = document.getElementById('ttsave-output');

            if (!url) {
                output.textContent = 'URL TikTok wajib diisi!';
                return;
            }

            output.textContent = 'Loading...';
            const apiUrl =`https://tik-downloaders.vercel.app/ttsave?url=${encodeURIComponent(url)}`;
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
