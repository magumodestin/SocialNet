        let currentUser = null;
        let currentChatUser = "Browniiey baddie";
        let chatData = {
            "Browniiey baddie": [],
            "Trust": [],
            "Dalvin": [],
            "venessa": [],
            "Mrr Hectic": []
        };

        // Track last seen times for each user
        let lastSeenTimes = {
            "Browniiey baddie": new Date(),
            "Trust": new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            "Dalvin": new Date(),
            "venessa": new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            "Mrr Hectic": new Date()
        };

        // User data with avatar URLs
        const userData = {
            "Destine": {
                avatar: "https://i.pravatar.cc/150?img=1",
                status: "Online"
            },
            "Browniiey baddie": {
                avatar: "member-2.jpg",
                status: "Online"
            },
            "Trust": {
                avatar: "member-3.jpg",
                status: "Away"
            },
            "Dalvin": {
                avatar: "member-1.jpg",
                status: "Online"
            },
            "venessa": {
                avatar: "member-6.jpg",
                status: "Offline"
            },
            "Mrr Hectic": {
                avatar: "redmoon.jpg",
                status: "Online"
            }
        };

        const contacts = document.querySelectorAll('.contact');
        const chatHeader = document.querySelector('.chat-header-info h3');
        const chatHeaderStatus = document.querySelector('.chat-header-info p');
        const currentContactAvatar = document.querySelector('.current-contact-avatar img');
        const chatInput = document.querySelector('.chat-input');
        const chatMessages = document.getElementById('chatMessages');
        const sendButton = document.querySelector('.send-button');
        const clearChatButton = document.getElementById('clearChatButton');
        const logoutButton = document.getElementById('logoutButton');
        const imageModal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const loginModal = document.getElementById('loginModal');
        const userOptions = document.querySelectorAll('.user-option');
        const chatContainer = document.getElementById('chatContainer');
        const currentUserName = document.getElementById('currentUserName');
        const currentUserAvatar = document.getElementById('currentUserAvatar');
        const currentUserStatus = document.getElementById('currentUserStatus');

        function initChat() {
            displayChatMessages();
            updateLastSeenDisplay();
        }

        function formatLastSeen(time) {
            const now = new Date();
            const diff = now - time;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);

            if (minutes < 1) {
                return "just now";
            } else if (minutes < 60) {
                return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
            } else if (hours < 24) {
                return `${hours} hour${hours === 1 ? '' : 's'} ago`;
            } else if (days < 7) {
                return `${days} day${days === 1 ? '' : 's'} ago`;
            } else {
                return time.toLocaleDateString();
            }
        }

        function updateLastSeenDisplay() {
            const contactStatus = document.querySelector(`.contact[data-user="${currentChatUser}"] .contact-status`);
            const statusIndicator = contactStatus.querySelector('.status-indicator');
            
            // Update contact list status
            if (statusIndicator.classList.contains('status-online')) {
                contactStatus.innerHTML = `<span class="status-indicator status-online"></span>Online`;
            } else if (statusIndicator.classList.contains('status-away')) {
                const lastSeen = formatLastSeen(lastSeenTimes[currentChatUser]);
                contactStatus.innerHTML = `<span class="status-indicator status-away"></span>Last seen ${lastSeen}`;
            } else if (statusIndicator.classList.contains('status-offline')) {
                const lastSeen = formatLastSeen(lastSeenTimes[currentChatUser]);
                contactStatus.innerHTML = `<span class="status-indicator status-offline"></span>Last seen ${lastSeen}`;
            }

            // Update chat header status
            if (statusIndicator.classList.contains('status-online')) {
                chatHeaderStatus.innerHTML = `<span class="status-indicator status-online"></span>Online - Active now`;
            } else if (statusIndicator.classList.contains('status-away')) {
                const lastSeen = formatLastSeen(lastSeenTimes[currentChatUser]);
                chatHeaderStatus.innerHTML = `<span class="status-indicator status-away"></span>Away - Last seen ${lastSeen}`;
            } else if (statusIndicator.classList.contains('status-offline')) {
                const lastSeen = formatLastSeen(lastSeenTimes[currentChatUser]);
                chatHeaderStatus.innerHTML = `<span class="status-indicator status-offline"></span>Offline - Last seen ${lastSeen}`;
            }
        }

        function displayChatMessages() {
            chatMessages.innerHTML = '';
            if (chatData[currentChatUser]) {
                chatData[currentChatUser].forEach(msg => {
                    const messageElement = document.createElement('div');
                    const isSent = msg.sender === currentUser;
                    messageElement.classList.add('message', isSent ? 'sent' : 'received');
                    messageElement.innerHTML = `
                        <div class="message-sender">${msg.sender}</div>
                        <div class="message-text">${msg.text}</div>
                        <div class="message-time">${msg.time}</div>
                    `;
                    chatMessages.appendChild(messageElement);
                });
            }
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function updateCurrentUserDisplay() {
            if (currentUser && userData[currentUser]) {
                currentUserName.textContent = currentUser;
                currentUserAvatar.src = userData[currentUser].avatar;
                currentUserStatus.textContent = userData[currentUser].status;
            }
        }

        contacts.forEach(contact => {
            contact.addEventListener('click', function() {
                contacts.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                currentChatUser = this.getAttribute('data-user');
                chatHeader.textContent = currentChatUser;
                const avatarSrc = this.querySelector('.contact-avatar img').src;
                currentContactAvatar.src = avatarSrc;
                displayChatMessages();
                updateLastSeenDisplay();
            });
        });

        function sendMessage() {
            const messageText = chatInput.value.trim();
            if (messageText && currentUser) {
                const now = new Date();
                const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
                const message = { sender: currentUser, text: messageText, time: timeString };
                if (!chatData[currentChatUser]) chatData[currentChatUser] = [];
                chatData[currentChatUser].push(message);
                
                // Update last seen time for the current user
                lastSeenTimes[currentUser] = now;
                
                displayChatMessages();
                chatInput.value = '';
            }
        }

        sendButton.addEventListener('click', sendMessage);

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });

        clearChatButton.addEventListener('click', function() {
            if (confirm("Are you sure you want to clear this chat?")) {
                chatData[currentChatUser] = [];
                displayChatMessages();
            }
        });

        logoutButton.addEventListener('click', function() {
            loginModal.style.display = 'flex';
            chatContainer.style.display = 'none';
            userOptions.forEach(o => o.classList.remove('selected'));
        });

        userOptions.forEach(option => {
            option.addEventListener('click', function() {
                userOptions.forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        function loginUser() {
            const selectedOption = document.querySelector('.user-option.selected');
            if (selectedOption) {
                currentUser = selectedOption.getAttribute('data-user');
                updateCurrentUserDisplay();
                loginModal.style.display = 'none';
                chatContainer.style.display = 'flex';
                initChat();
            } else {
                alert("Please select a user to login as.");
            }
        }

        function showFullImage(imageSrc, userName) {
            modalImage.src = imageSrc;
            modalTitle.textContent = `${userName}'s Profile Picture`;
            imageModal.style.display = 'flex';
        }

        function closeModal() {
            imageModal.style.display = 'none';
        }

        function downloadImage() {
            const imageUrl = modalImage.src;
            const fileName = `profile_${modalTitle.textContent.split("'")[0]}.jpg`;
            
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = fileName;
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) closeModal();
        });

        // Simulate user activity for demo purposes
        function simulateUserActivity() {
            setInterval(() => {
                // Update last seen times for online users (except venessa who is offline)
                const now = new Date();
                if (currentChatUser !== "venessa") {
                    lastSeenTimes[currentChatUser] = now;
                    updateLastSeenDisplay();
                }
            }, 30000); // Update every 30 seconds
        }

        // Initialize the chat and start activity simulation
        simulateUserActivity();