        // Fungsi untuk menampilkan teks loading
        function showLoading(container, message = 'Loading...') {
            const loadingElement = document.createElement('p');
            loadingElement.id = 'loading';
            loadingElement.innerText = message;
            container.innerHTML = ''; // Bersihkan kontainer
            container.appendChild(loadingElement);
        }

        // Fungsi untuk fetch profil berdasarkan username
        async function fetchTikTokProfile(username) {
            const profileContainer = document.getElementById('profile-container');

            // Tampilkan loading
            showLoading(profileContainer, 'Loading profile...');

            try {
                const url = `https://api.tiklydown.eu.org/api/stalk?user=${username}`;
                const response = await fetch(url);
                const result = await response.json();

                if (result.status === 200) {
                    const user = result.data.user;
                    const stats = result.data.stats;

                    // Tambahkan data ke halaman
                    profileContainer.innerHTML = `
                        <center>
                            <img src="${user.avatarLarger}" alt="${user.uniqueId}" class="rounded-full w-20 h-20">
                        </center>
                        <center>
                            <h2>${user.nickname}</h2>
                            <font color="#626262">
                                <p><a href="https://www.tiktok.com/@${user.uniqueId}" target="_blank">@${user.uniqueId}</a></p>
                            </font>
                        </center>
                        <div class="geserrr">
                            <div class="kotakdata">
                                <center>
                                    <font size="2" color="#737373">Following</font>
                                    <p class="text-1xl font-bold">${stats.followingCount}</p>
                                </center>
                            </div>
                            <div class="kotakdata">
                                <center>
                                    <font size="2" color="#737373">Followers</font>
                                    <p class="text-1xl font-bold">${stats.followerCount}</p>
                                </center>
                            </div>
                            <div class="kotakdata">
                                <center>
                                    <font size="2" color="#737373">Likes</font>
                                    <p class="text-1xl font-bold">${stats.heartCount}</p>
                                </center>
                            </div>
                            <div class="kotakdata">
                                <center>
                                    <font size="2" color="#737373">Videos</font>
                                    <p class="text-1xl font-bold">${stats.videoCount}</p>
                                </center>
                            </div>
                        </div>
                    `;
                } else {
                    profileContainer.innerHTML = '<p>Gagal memuat data profil.</p>';
                }
            } catch (error) {
                profileContainer.innerHTML = `Error fetching data 🥹:<br>${error.message}`;
                console.error('Error:', error);
            }
        }

        // Fungsi untuk fetch video berdasarkan username
        async function fetchTikTokData(username) {
            const videoList = document.getElementById('videoList');

            // Tampilkan loading
            showLoading(videoList, 'Loading videos...');

            try {
                const url = `https://tiktok-api15.p.rapidapi.com/index/Tiktok/getUserVideos?unique_id=${username}&count=35&cursor=0`;
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '44114406bbmshdee24010b885bc0p140418jsn3d9caf51b4b3',
                        'x-rapidapi-host': 'tiktok-api15.p.rapidapi.com',
                    },
                };
                const response = await fetch(url, options);
                const result = await response.json();

                if (result.code === 0) {
                    displayVideos(result.data.videos);
                } else {
                    videoList.innerHTML = 'Gagal memuat data video.';
                }
            } catch (error) {
                videoList.innerHTML = `Error fetching videos 🥹:<br>${error.message}`;
                console.error('Error:', error);
            }
        }

        // Fungsi untuk menampilkan video
        function displayVideos(videos) {
            const videoList = document.getElementById('videoList');
            videoList.innerHTML = '';

            videos.forEach((video) => {
                const videoElement = document.createElement('div');
                const timestamp = video.create_time;
                const date = new Date(timestamp * 1000);

                const day = date.getDate();
                const month = date.toLocaleString('en-US', { month: 'short' });
                const year = date.getFullYear();
                const time = date.toTimeString().split(' ')[0];
                const formattedDate = `${day} ${month} ${year} ${time}`;

                videoElement.className = 'video';
                videoElement.innerHTML = `
                    <div class="kotakvideo">
                        <div class="videonya">
                            <video width="150px" height="980px" controls>
                                <source src="${video.play}" type="video/mp4">
                                Browser Anda tidak mendukung tag video.
                            </video>
                        </div>
                        <div class="errrmr">
                            <font size="1" color="#5e5e5e">
                                <p>${formattedDate}</p>
                            </font>
                            <div class="aaaak">
                                <font size="2">
                                    <p>${video.title}</p>
                                </font>
                            </div>
                            <center>
                                <a href="${video.play}" download="namanya.mp4" class="buttono">Download video</a>
                            </center>
                        </div>
                    </div>
                `;
                videoList.appendChild(videoElement);
            });
        }

        // Event listener untuk tombol "Ganti Username"
        document.getElementById('changeUserBtn').addEventListener('click', () => {
            const username = prompt('Masukkan username TikTok:');
            if (username) {
                fetchTikTokProfile(username);
                fetchTikTokData(username);
            }
        });

        // Default fetch untuk username awal
        const defaultUsername = 'qhairulpratama';
        fetchTikTokProfile(defaultUsername);
        fetchTikTokData(defaultUsername);