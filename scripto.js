// Dark Mode Functionality
var settingsmenu = document.querySelector(".settings-menu");
var darkBtn = document.getElementById("dark-btn");

function settingsMenuTogle(){
    settingsmenu.classList.toggle("settings-menu-height");
    
    // Reset see more state when closing menu
    if (!settingsmenu.classList.contains("settings-menu-height")) {
        const hiddenItems = document.getElementById('hidden-items');
        const seeMoreToggle = document.getElementById('see-more-toggle');
        if (hiddenItems && seeMoreToggle) {
            hiddenItems.classList.remove('show');
            seeMoreToggle.classList.remove('expanded');
            seeMoreToggle.querySelector('span').textContent = 'See More';
            settingsmenu.classList.remove('expanded');
        }
    }
}

darkBtn.onclick = function(){
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");
    
    if(localStorage.getItem("theme") == "light"){
        localStorage.setItem("theme", "dark");
    }
    else{
        localStorage.setItem("theme", "light");
    }
}

// Check and apply saved theme on page load
if(localStorage.getItem("theme") == "light"){
    darkBtn.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme");
}
else if(localStorage.getItem("theme") == "dark"){
    darkBtn.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme");
}
else{
    localStorage.setItem("theme", "light");
}

// Toggle "See More" functionality
function initializeSeeMore() {
    const seeMoreToggle = document.getElementById('see-more-toggle');
    const hiddenItems = document.getElementById('hidden-items');
    const settingsMenu = document.querySelector('.settings-menu');
    
    if (seeMoreToggle && hiddenItems && settingsMenu) {
        seeMoreToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanding = !hiddenItems.classList.contains('show');
            
            if (isExpanding) {
                // Expand
                hiddenItems.classList.add('show');
                seeMoreToggle.classList.add('expanded');
                settingsMenu.classList.add('expanded');
                seeMoreToggle.querySelector('span').textContent = 'See Less';
            } else {
                // Collapse
                hiddenItems.classList.remove('show');
                seeMoreToggle.classList.remove('expanded');
                settingsMenu.classList.remove('expanded');
                seeMoreToggle.querySelector('span').textContent = 'See More';
            }
        });
    }
}

// Story Data Management
function getStories() {
    const stories = JSON.parse(localStorage.getItem('socialNetStories')) || [];
    // Filter out expired stories (older than 24 hours)
    const now = new Date().getTime();
    const validStories = stories.filter(story => {
        const storyTime = new Date(story.timestamp).getTime();
        return (now - storyTime) < (24 * 60 * 60 * 1000); // 24 hours in milliseconds
    });
    
    // Update localStorage with only valid stories
    if (validStories.length !== stories.length) {
        localStorage.setItem('socialNetStories', JSON.stringify(validStories));
    }
    
    return validStories;
}

function saveStory(story) {
    const stories = getStories();
    stories.unshift(story);
    localStorage.setItem('socialNetStories', JSON.stringify(stories));
}

// Render stories in the story gallery
function renderStories() {
    const storyGallery = document.querySelector('.story-gallery');
    if (!storyGallery) return;
    
    const userStories = getStories();
    
    // Clear only user stories (not the default ones)
    const userStoryElements = storyGallery.querySelectorAll('.story[data-story-id^="user-"]');
    userStoryElements.forEach(story => story.remove());
    
    // Add user's stories after the "Post Story" but before default stories
    const postStoryElement = storyGallery.querySelector('.story1');
    
    userStories.forEach((story, index) => {
        const storyElement = document.createElement('div');
        storyElement.className = `story story-user-${index + 1}`;
        storyElement.setAttribute('data-story-id', `user-${story.id}`);
        
        storyElement.innerHTML = `
            <img src="${story.userImg}" alt="${story.userName}">
            <p>${story.userName}</p>
        `;
        
        // Add custom background style for the story
        storyElement.style.backgroundImage = `linear-gradient(transparent, rgba(0,0,0,0.5)), url('${story.media}')`;
        storyElement.style.backgroundSize = 'cover';
        storyElement.style.backgroundPosition = 'center';
        storyElement.style.cursor = 'pointer';
        
        // Add click event to open the story
        storyElement.addEventListener('click', function() {
            openStoryModal(`user-${story.id}`);
        });
        
        // Insert after the "Post Story" element
        postStoryElement.parentNode.insertBefore(storyElement, postStoryElement.nextSibling);
    });
}

// Combined stories array (user stories + default stories)
function getAllStories() {
    const userStories = getStories();
    const defaultStories = [
        {
            id: 2,
            userImg: 'imgs/member-2.jpeg',
            userName: 'Browniiey baddie',
            media: 'imgs/status-6.jpeg',
            mediaType: 'image',
            timeAgo: '2 hours ago'
        },
        {
            id: 3,
            userImg: 'imgs/member-6.jpg',
            userName: 'venessa',
            media: 'imgs/status-2.jpeg',
            mediaType: 'image',
            timeAgo: '5 hours ago'
        },
        {
            id: 4,
            userImg: 'imgs/member-3.jpg',
            userName: 'Trust',
            media: 'imgs/member-4.jpg',
            mediaType: 'image',
            timeAgo: '1 day ago'
        },
        {
            id: 5,
            userImg: 'imgs/member-1.jpg',
            userName: 'Destiny',
            media: 'imgs/member-5.jpg',
            mediaType: 'image',
            timeAgo: '2 days ago'
        },
        {
            id: 6,
            userImg: 'imgs/redmoon.jpg',
            userName: 'Mrr Hectic',
            media: 'imgs/ronaldo.png',
            mediaType: 'image',
            timeAgo: '3 days ago'
        }
    ];
    
    return [...userStories, ...defaultStories];
}

// Enhanced story posting functionality
function postStory() {
    const fileInput = document.getElementById('storyFileInput');
    const caption = document.getElementById('storyCaption').value;
    
    if (!fileInput.files[0]) {
        alert('Please select an image or video to post');
        return;
    }
    
    const file = fileInput.files[0];
    const fileType = file.type.split('/')[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const newStory = {
            id: Date.now().toString(),
            userImg: 'imgs/profile-pic.jpg',
            userName: 'Dêstîñëë Dèstîñëë',
            media: e.target.result,
            mediaType: fileType,
            storyText: caption,
            timestamp: new Date().toISOString(),
            timeAgo: 'Just now'
        };
        
        // Save to localStorage
        saveStory(newStory);
        
        // Re-render stories
        renderStories();
        
        // Close modal and show success message
        closeStoryUpload();
        showTempMessage('Story posted successfully! It will be visible for 24 hours.');
    };
    
    reader.readAsDataURL(file);
}

// Search Data - Friends from story gallery and Pages
const searchData = {
    friends: [
        {
            id: 2,
            name: 'Browniiey baddie',
            img: 'imgs/member-2.jpeg',
            type: 'friend',
            status: 'not_friends',
            friends: '189 friends',
            education: 'Fashion Institute',
            location: 'Johannesburg, South Africa'
        },
        {
            id: 3,
            name: 'venessa',
            img: 'imgs/member-6.jpg',
            type: 'friend',
            status: 'not_friends',
            about: 'Student',
            friends: '156 friends',
            education: 'Art College',
            location: 'Cape Town, South Africa'
        },
        {
            id: 4,
            name: 'Trust',
            img: 'imgs/member-3.jpg',
            type: 'friend',
            status: 'not_friends',
            friends: '278 friends',
            education: 'Music Academy',
            location: 'Durban, South Africa'
        },
        {
            id: 5,
            name: 'Destiny',
            img: 'imgs/member-1.jpg',
            type: 'friend',
            status: 'not_friends',
            friends: '312 friends',
            education: 'Business School',
            location: 'Pretoria, South Africa'
        },
        {
            id: 6,
            name: 'Mrr Hectic',
            img: 'imgs/redmoon.jpg',
            type: 'friend',
            status: 'not_friends',
            about: 'Gamer and Streamer',
            friends: '134 friends',
            education: 'Online Courses',
            location: 'Johannesburg, South Africa'
        }
    ],
    pages: [
        {
            id: 101,
            name: 'Quavo',
            img: 'imgs/member-3.jpg',
            type: 'page',
            category: 'Musician',
            status: 'not_following',
            about: 'American rapper, singer, and songwriter. Member of Migos.',
            location: 'Atlanta, USA'
        },
        {
            id: 102,
            name: 'DJ Khaled',
            img: 'imgs/DJKhaled.jpg',
            type: 'page',
            category: 'DJ/Producer',
            status: 'not_following',
            about: 'American DJ, record producer, and record executive.',
            location: 'Miami, USA'
        },
        {
            id: 103,
            name: 'Anwar Jibawi',
            img: 'imgs/profile-pic.jpg',
            type: 'page',
            category: 'Influencer',
            status: 'not_following',
            about: 'Social media influencer and content creator.',
            location: 'Dubai, UAE'
        },
        {
            id: 104,
            name: 'Adam W',
            img: 'imgs/member-1.jpg',
            type: 'page',
            category: 'Fitness Coach',
            status: 'not_following',
            about: 'Professional fitness coach and nutritionist.',
            location: 'Los Angeles, USA'
        },
        {
            id: 105,
            name: 'Chief Ben',
            img: 'imgs/member-2.jpeg',
            type: 'page',
            category: 'Comedian',
            status: 'not_following',
            about: 'Zimbabwean comedian/skit maker',
            location: 'Zimbabwe'
        },
        {
            id: 106,
            name: 'Mr Bean',
            img: 'imgs/redmoon.jpg',
            type: 'page',
            category: 'Actor',
            status: 'not_following',
            about: 'British comedian and actor known for physical comedy.',
            location: 'London, UK'
        }
    ]
};

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchTabs = document.querySelectorAll('.search-tab');
const searchSections = document.querySelectorAll('.search-result-section');

searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        searchTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all sections
        searchSections.forEach(section => section.classList.remove('active'));
        // Show corresponding section
        document.getElementById(`${tab.dataset.tab}Results`).classList.add('active');
        
        // If there's search text, perform search for the active tab
        if (searchInput.value.trim()) {
            performSearch(searchInput.value.trim(), tab.dataset.tab);
        }
    });
});

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.trim();
    
    if (searchTerm) {
        performSearch(searchTerm, getActiveTab());
        searchResults.classList.add('active');
    } else {
        searchResults.classList.remove('active');
    }
});

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-box')) {
        searchResults.classList.remove('active');
    }
});

// Get active tab
function getActiveTab() {
    return document.querySelector('.search-tab.active').dataset.tab;
}

// Perform search
function performSearch(term, type) {
    let results = [];
    
    if (type === 'all') {
        results = [
            ...searchData.friends.filter(item => 
                item.name.toLowerCase().includes(term.toLowerCase())
            ),
            ...searchData.pages.filter(item => 
                item.name.toLowerCase().includes(term.toLowerCase())
            )
        ];
    } else if (type === 'friends') {
        results = searchData.friends.filter(item => 
            item.name.toLowerCase().includes(term.toLowerCase())
        );
    } else if (type === 'pages') {
        results = searchData.pages.filter(item => 
            item.name.toLowerCase().includes(term.toLowerCase())
        );
    }
    
    displaySearchResults(results, type);
}

// Display search results
function displaySearchResults(results, type) {
    const resultsContainer = document.getElementById(`${type}Results`);
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
        return;
    }
    
    resultsContainer.innerHTML = '';
    
    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.setAttribute('data-id', item.id);
        resultItem.setAttribute('data-type', item.type);
        
        let actionButton = '';
        if (item.type === 'friend') {
            if (item.status === 'not_friends') {
                actionButton = `<button class="friend-btn" onclick="sendFriendRequest(${item.id})">Friend</button>`;
            } else if (item.status === 'requested') {
                actionButton = `<button class="following-btn" onclick="cancelFriendRequest(${item.id})"></button>`;
            } else if (item.status === 'friends') {
                actionButton = `<button class="following-btn" onclick="unfriend(${item.id})">Friends</button>`;
            }
        } else if (item.type === 'page') {
            if (item.status === 'not_following') {
                actionButton = `<button class="follow-btn" onclick="followPage(${item.id})">Follow</button>`;
            } else if (item.status === 'following') {
                actionButton = `<button class="following-btn" onclick="unfollowPage(${item.id})">Following</button>`;
            }
        }
        
        resultItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="search-result-info">
                <h4>${item.name}</h4>
                <p>${item.type === 'friend' ? 'Friend' : item.category}</p>
            </div>
            <div class="search-result-actions">
                ${actionButton}
            </div>
        `;
        
        // Add click event to open profile modal
        resultItem.addEventListener('click', function(e) {
            if (!e.target.closest('.search-result-actions')) {
                openProfileModal(item);
            }
        });
        
        resultsContainer.appendChild(resultItem);
    });
}

// Friend request functionality
function sendFriendRequest(id) {
    const friend = searchData.friends.find(f => f.id === id);
    if (friend) {
        friend.status = 'requested';
        updateSearchResults();
        // In a real app, you would send this to a server
        console.log(`Friend request sent to ${friend.name}`);
    }
}

function cancelFriendRequest(id) {
    const friend = searchData.friends.find(f => f.id === id);
    if (friend) {
        friend.status = 'not_friends';
        updateSearchResults();
        console.log(`Friend request to ${friend.name} cancelled`);
    }
}

function unfriend(id) {
    const friend = searchData.friends.find(f => f.id === id);
    if (friend) {
        friend.status = 'not_friends';
        updateSearchResults();
        console.log(`Unfriended ${friend.name}`);
    }
}

// Page follow functionality
function followPage(id) {
    const page = searchData.pages.find(p => p.id === id);
    if (page) {
        page.status = 'following';
        updateSearchResults();
        // Save to localStorage
        saveFollowStatus(id, 'following');
        console.log(`Following ${page.name}`);
    }
}

function unfollowPage(id) {
    const page = searchData.pages.find(p => p.id === id);
    if (page) {
        page.status = 'not_following';
        updateSearchResults();
        // Save to localStorage
        saveFollowStatus(id, 'not_following');
        console.log(`Unfollowed ${page.name}`);
    }
}

// Save follow status to localStorage
function saveFollowStatus(id, status) {
    let followData = JSON.parse(localStorage.getItem('followData')) || {};
    followData[id] = status;
    localStorage.setItem('followData', JSON.stringify(followData));
}

// Load follow status from localStorage
function loadFollowStatus() {
    const followData = JSON.parse(localStorage.getItem('followData')) || {};
    
    // Update page status based on saved data
    searchData.pages.forEach(page => {
        if (followData[page.id]) {
            page.status = followData[page.id];
        }
    });
}

// Update search results after status change
function updateSearchResults() {
    if (searchInput.value.trim()) {
        performSearch(searchInput.value.trim(), getActiveTab());
    }
}

// Profile modal functionality
function openProfileModal(item) {
    const modal = document.getElementById('profileModal');
    const title = document.getElementById('profileModalTitle');
    const img = document.getElementById('profileModalImg');
    const name = document.getElementById('profileModalName');
    const type = document.getElementById('profileModalType');
    const about = document.getElementById('profileModalAbout');
    const actionBtn = document.getElementById('profileActionBtn');
    const friendsSection = document.getElementById('profileModalFriendsSection');
    const friends = document.getElementById('profileModalFriends');
    const educationSection = document.getElementById('profileModalEducationSection');
    const education = document.getElementById('profileModalEducation');
    const locationSection = document.getElementById('profileModalLocationSection');
    const location = document.getElementById('profileModalLocation');
    
    // Set modal content based on item type
    title.textContent = item.name;
    img.src = item.img;
    name.textContent = item.name;
    
    if (item.type === 'friend') {
        type.textContent = 'Friend';
        about.textContent = item.about || 'No bio available';
        friendsSection.style.display = 'block';
        friends.textContent = item.friends;
        educationSection.style.display = 'block';
        education.textContent = item.education;
        locationSection.style.display = 'block';
        location.textContent = item.location;
        
        // Set action button based on friend status
        if (item.status === 'not_friends') {
            actionBtn.textContent = 'Add Friend';
            actionBtn.className = 'friend-btn';
            actionBtn.onclick = () => {
                sendFriendRequest(item.id);
                closeProfileModal();
            };
        } else if (item.status === 'requested') {
            actionBtn.textContent = 'Requested';
            actionBtn.className = 'following-btn';
            actionBtn.onclick = () => {
                cancelFriendRequest(item.id);
                closeProfileModal();
            };
        } else if (item.status === 'friends') {
            actionBtn.textContent = 'Friends';
            actionBtn.className = 'following-btn';
            actionBtn.onclick = () => {
                unfriend(item.id);
                closeProfileModal();
            };
        }
    } else if (item.type === 'page') {
        type.textContent = item.category;
        about.textContent = item.about;
        friendsSection.style.display = 'none';
        educationSection.style.display = 'none';
        locationSection.style.display = 'block';
        location.textContent = item.location;
        
        // Set action button based on follow status
        if (item.status === 'not_following') {
            actionBtn.textContent = 'Follow';
            actionBtn.className = 'follow-btn';
            actionBtn.onclick = () => {
                followPage(item.id);
                closeProfileModal();
            };
        } else if (item.status === 'following') {
            actionBtn.textContent = 'Following';
            actionBtn.className = 'following-btn';
            actionBtn.onclick = () => {
                unfollowPage(item.id);
                closeProfileModal();
            };
        }
    }
    
    modal.classList.add('active');
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.remove('active');
}

// Story Modal Functionality
let currentStoryIndex = 0;
let progressInterval;
let currentVideo = null;

function openStoryModal(storyId) {
    const allStories = getAllStories();
    let storyIndex;
    
    if (storyId.startsWith('user-')) {
        // User story
        const userStoryId = storyId.replace('user-', '');
        storyIndex = allStories.findIndex(story => story.id === userStoryId);
    } else {
        // Default story
        storyIndex = allStories.findIndex(story => story.id === parseInt(storyId));
    }
    
    if (storyIndex === -1) return;
    
    currentStoryIndex = storyIndex;
    const story = allStories[storyIndex];
    
    // Update modal content
    document.getElementById('modalUserImg').src = story.userImg;
    document.getElementById('modalUserName').textContent = story.userName;
    document.getElementById('modalTimeAgo').textContent = story.timeAgo;
    document.getElementById('modalStoryText').textContent = story.storyText || '';
    
    // Create progress bars
    createProgressBars(allStories);
    
    // Load media content
    loadStoryMedia(story);
    
    // Show modal
    document.getElementById('storyModal').classList.add('active');
    
    // Start progress animation (only for images)
    if (story.mediaType === 'image') {
        startProgressAnimation();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function loadStoryMedia(story) {
    const modalBody = document.getElementById('modalStoryBody');
    
    // Clear previous content
    modalBody.innerHTML = `
        <button class="story-nav story-prev" onclick="prevStory()">‹</button>
        <button class="story-nav story-next" onclick="nextStory()">›</button>
    `;
    
    if (story.mediaType === 'image') {
        const img = document.createElement('img');
        img.src = story.media;
        img.alt = story.storyText || 'Story image';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        modalBody.appendChild(img);
    } else if (story.mediaType === 'video') {
        const video = document.createElement('video');
        video.src = story.media;
        video.controls = true;
        video.autoplay = true;
        video.muted = false;
        video.className = 'story-video';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        
        // Add video controls
        const controls = document.createElement('div');
        controls.className = 'video-controls';
        controls.innerHTML = `
            <button onclick="togglePlayPause(this)">⏯️ Play/Pause</button>
            <button onclick="toggleMute(this)">🔇 Mute</button>
        `;
        
        modalBody.appendChild(video);
        modalBody.appendChild(controls);
        currentVideo = video;
        
        // Stop progress bar for videos
        clearInterval(progressInterval);
    }
}

function togglePlayPause(button) {
    if (currentVideo) {
        if (currentVideo.paused) {
            currentVideo.play();
        } else {
            currentVideo.pause();
        }
    }
}

function toggleMute(button) {
    if (currentVideo) {
        currentVideo.muted = !currentVideo.muted;
        button.textContent = currentVideo.muted ? '🔊 Unmute' : '🔇 Mute';
    }
}

function closeStoryModal() {
    document.getElementById('storyModal').classList.remove('active');
    clearInterval(progressInterval);
    if (currentVideo) {
        currentVideo.pause();
        currentVideo = null;
    }
    document.body.style.overflow = 'auto';
}

function createProgressBars(stories) {
    const progressContainer = document.getElementById('storyProgress');
    progressContainer.innerHTML = '';
    
    stories.forEach((story, index) => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressFill.id = `progress-${index}`;
        progressBar.appendChild(progressFill);
        progressContainer.appendChild(progressBar);
    });
}

function startProgressAnimation() {
    const progressFill = document.getElementById(`progress-${currentStoryIndex}`);
    let width = 0;
    
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (width >= 100) {
            nextStory();
            return;
        }
        width += 0.5;
        progressFill.style.width = width + '%';
    }, 50);
}

function nextStory() {
    const allStories = getAllStories();
    if (currentStoryIndex < allStories.length - 1) {
        currentStoryIndex++;
        updateModalContent();
    } else {
        closeStoryModal();
    }
}

function prevStory() {
    if (currentStoryIndex > 0) {
        currentStoryIndex--;
        updateModalContent();
    }
}

function updateModalContent() {
    const allStories = getAllStories();
    const story = allStories[currentStoryIndex];
    
    document.getElementById('modalUserImg').src = story.userImg;
    document.getElementById('modalUserName').textContent = story.userName;
    document.getElementById('modalTimeAgo').textContent = story.timeAgo;
    document.getElementById('modalStoryText').textContent = story.storyText || '';
    
    loadStoryMedia(story);
    
    if (story.mediaType === 'image') {
        startProgressAnimation();
    }
}

// Story Upload Functionality
function openStoryUpload() {
    document.getElementById('storyUploadModal').classList.add('active');
    resetStoryUpload();
}

function closeStoryUpload() {
    document.getElementById('storyUploadModal').classList.remove('active');
    resetStoryUpload();
}

function resetStoryUpload() {
    document.getElementById('storyFileInput').value = '';
    document.getElementById('previewImage').style.display = 'none';
    document.getElementById('previewVideo').style.display = 'none';
    document.getElementById('noPreviewText').style.display = 'block';
    document.getElementById('storyCaption').value = '';
    document.getElementById('postStoryBtn').disabled = true;
}

function openFileUpload(type) {
    document.getElementById('storyFileInput').click();
    document.getElementById('storyFileInput').setAttribute('data-type', type);
}

document.getElementById('storyFileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const fileType = file.type.split('/')[0];
    const previewImage = document.getElementById('previewImage');
    const previewVideo = document.getElementById('previewVideo');
    const noPreviewText = document.getElementById('noPreviewText');
    const postBtn = document.getElementById('postStoryBtn');
    
    if (fileType === 'image') {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            previewVideo.style.display = 'none';
            noPreviewText.style.display = 'none';
            postBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    } else if (fileType === 'video') {
        const videoURL = URL.createObjectURL(file);
        previewVideo.src = videoURL;
        previewVideo.style.display = 'block';
        previewImage.style.display = 'none';
        noPreviewText.style.display = 'none';
        postBtn.disabled = false;
    } else {
        alert('Please select an image or video file');
        resetStoryUpload();
    }
});

let posts = JSON.parse(localStorage.getItem('socialNetPosts')) || [];
let currentEditPostId = null;

const postTextarea = document.getElementById('postTextarea');
const postButton = document.getElementById('postButton');
const postsContainer = document.querySelector('.posts-container');
const editPostModal = document.getElementById('editPostModal');
const editPostTextarea = document.getElementById('editPostTextarea');
const saveEditButton = document.getElementById('saveEditButton');

document.addEventListener('DOMContentLoaded', function() {
    initializeSeeMore();
    loadFollowStatus();
    renderStories(); // Initialize stories

    // Add click events to default stories
    const defaultStoryElements = document.querySelectorAll('.story[data-story-id]:not(.story1)');
    defaultStoryElements.forEach(story => {
        story.addEventListener('click', function() {
            openStoryModal(story.dataset.storyId);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            if (this.value.trim()) {
                searchResults.classList.add('active');
            }
        });
    }

    renderPosts();

    if (postButton) {
        postButton.addEventListener('click', createNewPost);
    }

    if (postTextarea) {
        postTextarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                createNewPost();
            }
        });
    }

    if (saveEditButton) {
        saveEditButton.addEventListener('click', saveEditedPost);
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.post-actions')) {
            document.querySelectorAll('.post-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('comments-modal')) {
            document.body.removeChild(e.target);
        }
        if (e.target.classList.contains('share-modal')) {
            document.body.removeChild(e.target);
        }
        if (e.target === document.getElementById('profileModal')) {
            closeProfileModal();
        }
        if (e.target === document.getElementById('storyModal')) {
            closeStoryModal();
        }
        if (e.target === document.getElementById('storyUploadModal')) {
            closeStoryUpload();
        }
        if (e.target === editPostModal) {
            closeEditModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (document.getElementById('storyModal').classList.contains('active')) {
            if (e.key === 'Escape') {
                closeStoryModal();
            } else if (e.key === 'ArrowRight') {
                nextStory();
            } else if (e.key === 'ArrowLeft') {
                prevStory();
            } else if (e.key === ' ') {
                // Space bar for video play/pause
                if (currentVideo) {
                    e.preventDefault();
                    togglePlayPause();
                }
            }
        }
    });

    // Initialize existing posts functionality
    initializeExistingPosts();
    loadPostInteractions();
});


function createNewPost() {
    const content = postTextarea.value.trim();
    const mediaFile = document.getElementById('mediaUploadInput').files[0];
    
    if (!content && !mediaFile) {
        alert('Please write something or add media to post!');
        return;
    }
    
    const post = {
        id: Date.now().toString(),
        content: content,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        author: 'Dêstîñëë Dèstîñëë',
        authorImg: 'imgs/profile-pic.jpg'
    };
    
    // Add media if present
    if (mediaFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            post.media = {
                type: mediaFile.type.split('/')[0],
                src: e.target.result
            };
            
            // Save and render the post with media
            saveAndRenderPost(post);
        };
        reader.readAsDataURL(mediaFile);
    } else {
        // Save and render the post without media
        saveAndRenderPost(post);
    }
}

function saveAndRenderPost(post) {
    posts.unshift(post);
    savePostsToStorage();
    renderPosts();
    
    // Reset form
    postTextarea.value = '';
    removeMediaPreview();
    
    showTempMessage('Post created successfully!');
}

function savePostsToStorage() {
    localStorage.setItem('socialNetPosts', JSON.stringify(posts));
}

function renderPosts() {
    if (!postsContainer) return;
    
    // Clear only the dynamically added posts, keep the existing ones
    const dynamicPosts = postsContainer.querySelectorAll('.post-container[data-post-id]');
    dynamicPosts.forEach(post => post.remove());
    
    if (posts.length === 0) {
        return;
    }
    
    // Add new posts at the beginning
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.insertBefore(postElement, postsContainer.firstChild);
    });
}

function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post-container';
    postElement.setAttribute('data-post-id', post.id);
    
    let mediaHtml = '';
    if (post.media) {
        if (post.media.type === 'image') {
            mediaHtml = `<img src="${post.media.src}" style="width: 100%; border-radius: 4px; margin-bottom: 1px;" class="post-img">`;
        } else {
            mediaHtml = `
                <div style="position: relative;">
                    <img src="${post.media.src}" style="width: 100%; border-radius: 4px; margin-bottom: 1px;" class="post-img">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); color: white; padding: 10px; border-radius: 50%;">
                        ▶️
                    </div>
                </div>
            `;
        }
    }
    
    postElement.innerHTML = `
        <div class="user-profile">
            <img src="${post.authorImg}" alt="${post.author}">
            <div>
                <p>${post.author}</p>
                <span>${formatPostDate(post.timestamp)}</span>
            </div>
            <div class="post-actions">
                <button class="post-menu-btn" onclick="togglePostMenu('${post.id}')">⋯</button>
                <div class="post-menu" id="postMenu-${post.id}">
                    <button onclick="editPost('${post.id}')">✏️Edit Post</button>
                    <button onclick="deletePost('${post.id}')">🗑️Delete Post</button>
                </div>
            </div>
        </div>
        <p class="post-text">${escapeHtml(post.content)}</p>
        ${mediaHtml}
        <div class="post-stats">
            <span>${post.likes} likes</span>
            <span>${post.comments} comments</span>
            <span>${post.shares} shares</span>
        </div>
        <div class="add-post-links">
            <a href="#" class="${post.liked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
                <img src="${post.liked ? 'imgs/liked.png' : 'imgs/like.png'}" style="width: 20px; margin-right: 5px;">
                Like
            </a>
            <a href="#" onclick="openCommentsModal('${post.id}')">
                <img src="imgs/comment.jpg" style="width: 20px; margin-right: 5px;">
                Comment
            </a>
            <a href="#" onclick="sharePost('${post.id}')">
                <img src="imgs/share.jpg" style="width: 20px; margin-right: 5px;">
                Share
            </a>
        </div>
    `;
    
    return postElement;
}

// Format post date
function formatPostDate(timestamp) {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return postDate.toLocaleDateString();
}

// Toggle post menu
function togglePostMenu(postId) {
    // Close all other open menus
    document.querySelectorAll('.post-menu').forEach(menu => {
        if (menu.id !== `postMenu-${postId}`) {
            menu.style.display = 'none';
        }
    });
    
    const menu = document.getElementById(`postMenu-${postId}`);
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Edit post
function editPost(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    currentEditPostId = postId;
    editPostTextarea.value = post.content;
    editPostModal.classList.add('active');
    
    // Close the menu
    document.getElementById(`postMenu-${postId}`).style.display = 'none';
}

// Save edited post
function saveEditedPost() {
    if (!currentEditPostId) return;
    
    const newContent = editPostTextarea.value.trim();
    if (!newContent) {
        alert('Post content cannot be empty!');
        return;
    }
    
    const post = posts.find(p => p.id === currentEditPostId);
    if (post) {
        post.content = newContent;
        post.timestamp = new Date().toISOString(); // Update timestamp
        savePostsToStorage();
        renderPosts();
        closeEditModal();
        showTempMessage('Post updated successfully!');
    }
}

// Delete post
function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) {
        return;
    }
    
    posts = posts.filter(p => p.id !== postId);
    savePostsToStorage();
    renderPosts();
    showTempMessage('Post deleted successfully!');
}

// Close edit modal
function closeEditModal() {
    editPostModal.classList.remove('active');
    currentEditPostId = null;
}

// Toggle like
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes = post.liked ? post.likes + 1 : Math.max(0, post.likes - 1);
        savePostsToStorage();
        renderPosts();
    }
}

// Share post
function sharePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.shares++;
        savePostsToStorage();
        renderPosts();
        showTempMessage('Post shared successfully!');
    }
}

// Open comments modal
function openCommentsModal(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    // Create comments modal
    const modal = document.createElement('div');
    modal.className = 'comments-modal';
    modal.innerHTML = `
        <div class="comments-content">
            <div class="comments-header">
                <h3>Comments</h3>
                <button class="close-comments">&times;</button>
            </div>
            <div class="post-preview">
                <div class="user-profile">
                    <img src="${post.authorImg}" alt="${post.author}">
                    <div>
                        <p>${post.author}</p>
                        <p>${post.content}</p>
                    </div>
                </div>
            </div>
            <div class="comments-list" id="commentsList-${postId}">
                <!-- Comments will be loaded here -->
            </div>
            <div class="add-comment">
                <div class="comment-input-container">
                    <input type="text" class="comment-input" placeholder="Write a comment...">
                    <button class="submit-comment">Post</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Load comments
    loadComments(postId);
    
    // Event listeners
    modal.querySelector('.close-comments').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.submit-comment').addEventListener('click', () => {
        submitComment(postId);
    });
    
    modal.querySelector('.comment-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitComment(postId);
        }
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Load comments for a post
function loadComments(postId) {
    const commentsList = document.getElementById(`commentsList-${postId}`);
    if (!commentsList) return;
    
    // Clear existing comments
    commentsList.innerHTML = '';
    
    // Get post comments from storage or initialize
    let postComments = JSON.parse(localStorage.getItem(`postComments_${postId}`)) || [];
    
    if (postComments.length === 0) {
        commentsList.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No comments yet. Be the first to comment!</div>';
        return;
    }
    
    postComments.forEach((comment, index) => {
        const commentItem = createCommentElement(comment, index, postId);
        commentsList.appendChild(commentItem);
    });
}

function createCommentElement(comment, index, postId) {
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    commentItem.style.cssText = 'padding: 10px; border-bottom: 1px solid #eee;';
    commentItem.dataset.commentIndex = index;
    
    if (comment.isEditing) {
        commentItem.innerHTML = `
            <div class="comment-user" style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                <img src="imgs/profile-pic.jpg" style="width: 30px; height: 30px; border-radius: 50%;">
                <strong>${comment.user}</strong>
            </div>
            <div class="comment-edit-container" style="margin-bottom: 5px;">
                <input type="text" class="comment-edit-input" value="${comment.text}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div class="comment-actions" style="display: flex; gap: 10px;">
                <button class="save-comment" style="background: #1876f2; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 12px;">Save</button>
                <button class="cancel-edit" style="background: #666; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 12px;">Cancel</button>
            </div>
        `;
    } else {
        commentItem.innerHTML = `
            <div class="comment-user" style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                <img src="imgs/profile-pic.jpg" style="width: 30px; height: 30px; border-radius: 50%;">
                <strong>${comment.user}</strong>
                <span style="color: #666; font-size: 12px;">${comment.time}</span>
            </div>
            <p style="margin: 0 0 5px 0;">${comment.text}</p>
            <div class="comment-actions" style="display: flex; gap: 10px;">
                <button class="edit-comment" style="background: none; border: none; color: #1876f2; cursor: pointer; font-size: 12px;">Edit</button>
                <button class="delete-comment" style="background: none; border: none; color: #ff4444; cursor: pointer; font-size: 12px;">Delete</button>
            </div>
        `;
    }
    
    return commentItem;
}

function submitComment(postId) {
    const modal = document.querySelector('.comments-modal');
    if (!modal) return;
    
    const commentInput = modal.querySelector('.comment-input');
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        alert('Please enter a comment');
        return;
    }
    
    // Create new comment
    const newComment = {
        user: 'Dêstîñëë Dèstîñëë',
        text: commentText,
        time: 'Just now',
        isEditing: false
    };
    
    // Get existing comments
    let postComments = JSON.parse(localStorage.getItem(`postComments_${postId}`)) || [];
    
    // Add new comment
    postComments.push(newComment);
    
    // Save to localStorage
    localStorage.setItem(`postComments_${postId}`, JSON.stringify(postComments));
    
    // Update post comment count
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments = postComments.length;
        savePostsToStorage();
        renderPosts();
    }
    
    // Reload comments
    loadComments(postId);
    
    // Clear input
    commentInput.value = '';
    
    // Show success message
    showTempMessage('Comment added successfully!');
}

// Initialize existing posts functionality
function initializeExistingPosts() {
    // Add event listeners for like, comment, and share buttons on existing posts
    document.addEventListener('click', function(e) {
        // Like button functionality
        if (e.target.closest('.like-btn')) {
            e.preventDefault();
            e.stopPropagation();
            handleLike(e.target.closest('.like-btn'));
        }
        
        // Comment button functionality
        if (e.target.closest('.comment-btn')) {
            e.preventDefault();
            e.stopPropagation();
            handleComment(e.target.closest('.comment-btn'));
        }
        
        // Share button functionality
        if (e.target.closest('.share-btn')) {
            e.preventDefault();
            e.stopPropagation();
            handleShare(e.target.closest('.share-btn'));
        }
    });
}

// Handle like functionality for existing posts
function handleLike(likeBtn) {
    const postId = likeBtn.getAttribute('data-post-id');
    const likeIcon = likeBtn.querySelector('.like-icon');
    const likeCount = likeBtn.querySelector('.like-count');
    
    let currentLikes = parseInt(likeCount.textContent) || 0;
    const isLiked = likeBtn.classList.contains('liked');
    
    if (isLiked) {
        // Unlike
        likeBtn.classList.remove('liked');
        likeIcon.src = 'imgs/like.png';
        likeCount.textContent = Math.max(0, currentLikes - 1);
    } else {
        // Like
        likeBtn.classList.add('liked');
        likeIcon.src = 'imgs/liked.png';
        likeCount.textContent = currentLikes + 1;
    }
    
    // Add animation
    likeIcon.classList.add('like-animation');
    setTimeout(() => {
        likeIcon.classList.remove('like-animation');
    }, 300);
    
    // Save to localStorage
    savePostInteraction(postId, 'likes', likeCount.textContent);
    
    // Show success message
    showTempMessage(isLiked ? 'Post unliked!' : 'Post liked!');
}

// Handle comment functionality for existing posts
function handleComment(commentBtn) {
    const postId = commentBtn.getAttribute('data-post-id');
    const commentCount = commentBtn.querySelector('.comment-count');
    
    // Create comment modal
    const modal = document.createElement('div');
    modal.className = 'comments-modal';
    modal.innerHTML = `
        <div class="comments-content">
            <div class="comments-header">
                <h3>Comments</h3>
                <button class="close-comments">&times;</button>
            </div>
            <div class="post-preview">
                <div class="user-profile">
                    <img src="imgs/profile-pic.jpg" alt="User">
                    <div>
                        <p>Post Preview</p>
                        <p>This is the post content that users are commenting on.</p>
                    </div>
                </div>
            </div>
            <div class="comments-list" id="commentsList-${postId}">
                <!-- Comments will be loaded here -->
            </div>
            <div class="add-comment">
                <div class="comment-input-container">
                    <input type="text" class="comment-input" placeholder="Write a comment...">
                    <button class="submit-comment">Post</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Load comments for this post
    loadExistingPostComments(postId);
    
    // Event listeners
    modal.querySelector('.close-comments').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.submit-comment').addEventListener('click', () => {
        submitExistingPostComment(postId, commentCount);
    });
    
    modal.querySelector('.comment-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitExistingPostComment(postId, commentCount);
        }
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Load comments for existing posts
function loadExistingPostComments(postId) {
    const commentsList = document.getElementById(`commentsList-${postId}`);
    if (!commentsList) return;
    
    // Clear existing comments
    commentsList.innerHTML = '';
    
    // Get post comments from storage or initialize
    let postComments = JSON.parse(localStorage.getItem(`existingPostComments_${postId}`)) || [];
    
    if (postComments.length === 0) {
        commentsList.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No comments yet. Be the first to comment!</div>';
        return;
    }
    
    postComments.forEach((comment, index) => {
        const commentItem = createExistingCommentElement(comment, index, postId);
        commentsList.appendChild(commentItem);
    });
}

// Create comment element for existing posts
function createExistingCommentElement(comment, index, postId) {
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    commentItem.style.cssText = 'padding: 10px; border-bottom: 1px solid #eee;';
    commentItem.dataset.commentIndex = index;
    
    if (comment.isEditing) {
        commentItem.innerHTML = `
            <div class="comment-user" style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                <img src="imgs/profile-pic.jpg" style="width: 30px; height: 30px; border-radius: 50%;">
                <strong>${comment.user}</strong>
            </div>
            <div class="comment-edit-container" style="margin-bottom: 5px;">
                <input type="text" class="comment-edit-input" value="${comment.text}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div class="comment-actions" style="display: flex; gap: 10px;">
                <button class="save-comment" style="background: #1876f2; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 12px;">Save</button>
                <button class="cancel-edit" style="background: #666; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 12px;">Cancel</button>
            </div>
        `;
    } else {
        commentItem.innerHTML = `
            <div class="comment-user" style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                <img src="imgs/profile-pic.jpg" style="width: 30px; height: 30px; border-radius: 50%;">
                <strong>${comment.user}</strong>
                <span style="color: #666; font-size: 12px;">${comment.time}</span>
            </div>
            <p style="margin: 0 0 5px 0;">${comment.text}</p>
            <div class="comment-actions" style="display: flex; gap: 10px;">
                <button class="edit-comment" style="background: none; border: none; color: #1876f2; cursor: pointer; font-size: 12px;">Edit</button>
                <button class="delete-comment" style="background: none; border: none; color: #ff4444; cursor: pointer; font-size: 12px;">Delete</button>
            </div>
        `;
    }
    
    // Add event listeners for edit and delete
    const editBtn = commentItem.querySelector('.edit-comment');
    const deleteBtn = commentItem.querySelector('.delete-comment');
    const saveBtn = commentItem.querySelector('.save-comment');
    const cancelBtn = commentItem.querySelector('.cancel-edit');
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            editExistingComment(postId, index);
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            deleteExistingComment(postId, index);
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveExistingCommentEdit(postId, index);
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            cancelExistingCommentEdit(postId, index);
        });
    }
    
    return commentItem;
}

// Submit comment for existing posts
function submitExistingPostComment(postId, commentCount) {
    const modal = document.querySelector('.comments-modal');
    if (!modal) return;
    
    const commentInput = modal.querySelector('.comment-input');
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        alert('Please enter a comment');
        return;
    }
    
    // Create new comment
    const newComment = {
        user: 'Dêstîñëë Dèstîñëë',
        text: commentText,
        time: 'Just now',
        isEditing: false
    };
    
    // Get existing comments
    let postComments = JSON.parse(localStorage.getItem(`existingPostComments_${postId}`)) || [];
    
    // Add new comment
    postComments.push(newComment);
    
    // Save to localStorage
    localStorage.setItem(`existingPostComments_${postId}`, JSON.stringify(postComments));
    
    // Update comment count
    const currentComments = parseInt(commentCount.textContent) || 0;
    commentCount.textContent = currentComments + 1;
    
    // Save comment count
    savePostInteraction(postId, 'comments', commentCount.textContent);
    
    // Reload comments
    loadExistingPostComments(postId);
    
    // Clear input
    commentInput.value = '';
    
    // Show success message
    showTempMessage('Comment added successfully!');
}

// Handle share functionality for existing posts
function handleShare(shareBtn) {
    const postId = shareBtn.getAttribute('data-post-id');
    const shareCount = shareBtn.querySelector('.share-count');
    
    // Create share modal
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-content">
            <div class="share-header">
                <h3>Share Post</h3>
                <button class="close-share">&times;</button>
            </div>
            <div class="share-options">
                <div class="share-option" data-share-type="friends">
                    <img src="imgs/profile-pic.jpg" alt="Friends">
                    <div>
                        <h4>Share on your timeline</h4>
                        <p>Share on your own timeline</p>
                    </div>
                </div>
                <div class="share-option" data-share-type="friend">
                    <img src="imgs/member-2.jpeg" alt="Friend">
                    <div>
                        <h4>Send to a friend</h4>
                        <p>Send in a private message</p>
                    </div>
                </div>
                <div class="share-option" data-share-type="group">
                    <img src="imgs/member-3.jpg" alt="Group">
                    <div>
                        <h4>Share in a group</h4>
                        <p>Share in one of your groups</p>
                    </div>
                </div>
            </div>
            <div class="share-footer">
                <button class="cancel-share">Cancel</button>
                <button class="confirm-share">Share</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    let selectedShareType = null;
    
    // Event listeners for share options
    const shareOptions = modal.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', () => {
            shareOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedShareType = option.getAttribute('data-share-type');
        });
    });
    
    // Event listeners for modal buttons
    modal.querySelector('.close-share').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.cancel-share').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.confirm-share').addEventListener('click', () => {
        if (!selectedShareType) {
            alert('Please select a sharing option');
            return;
        }
        
        // Update share count
        const currentShares = parseInt(shareCount.textContent) || 0;
        shareCount.textContent = currentShares + 1;
        
        // Save share count
        savePostInteraction(postId, 'shares', shareCount.textContent);
        
        // Show success message
        showTempMessage(`Post shared ${getShareTypeText(selectedShareType)}!`);
        
        // Close modal
        document.body.removeChild(modal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Get share type text for display
function getShareTypeText(shareType) {
    switch(shareType) {
        case 'friends':
            return 'on your timeline';
        case 'friend':
            return 'with a friend';
        case 'group':
            return 'in a group';
        default:
            return '';
    }
}

// Save post interactions to localStorage
function savePostInteraction(postId, type, value) {
    let postInteractions = JSON.parse(localStorage.getItem('existingPostInteractions')) || {};
    
    if (!postInteractions[postId]) {
        postInteractions[postId] = {};
    }
    
    postInteractions[postId][type] = value;
    localStorage.setItem('existingPostInteractions', JSON.stringify(postInteractions));
}

// Load post interactions from localStorage
function loadPostInteractions() {
    const postInteractions = JSON.parse(localStorage.getItem('existingPostInteractions')) || {};
    
    // Apply saved interactions to posts
    Object.keys(postInteractions).forEach(postId => {
        const interactions = postInteractions[postId];
        
        // Update like count
        const likeBtn = document.querySelector(`.like-btn[data-post-id="${postId}"]`);
        if (likeBtn && interactions.likes) {
            const likeCount = likeBtn.querySelector('.like-count');
            likeCount.textContent = interactions.likes;
        }
        
        // Update comment count
        const commentBtn = document.querySelector(`.comment-btn[data-post-id="${postId}"]`);
        if (commentBtn && interactions.comments) {
            const commentCount = commentBtn.querySelector('.comment-count');
            commentCount.textContent = interactions.comments;
        }
        
        // Update share count
        const shareBtn = document.querySelector(`.share-btn[data-post-id="${postId}"]`);
        if (shareBtn && interactions.shares) {
            const shareCount = shareBtn.querySelector('.share-count');
            shareCount.textContent = interactions.shares;
        }
    });
}

// Edit existing comment
function editExistingComment(postId, commentIndex) {
    let postComments = JSON.parse(localStorage.getItem(`existingPostComments_${postId}`)) || [];
    
    if (postComments[commentIndex]) {
        postComments[commentIndex].isEditing = true;
        localStorage.setItem(`existingPostComments_${postId}`, JSON.stringify(postComments));
        loadExistingPostComments(postId);
    }
}

// Delete existing comment
function deleteExistingComment(postId, commentIndex) {
    if (!confirm('Are you sure you want to delete this comment?')) {
        return;
    }
    
    let postComments = JSON.parse(localStorage.getItem(`existingPostComments_${postId}`)) || [];
    
    if (postComments[commentIndex]) {
        postComments.splice(commentIndex, 1);
        localStorage.setItem(`existingPostComments_${postId}`, JSON.stringify(postComments));
        
        // Update comment count
        const commentBtn = document.querySelector(`.comment-btn[data-post-id="${postId}"]`);
        if (commentBtn) {
            const commentCount = commentBtn.querySelector('.comment-count');
            const currentComments = parseInt(commentCount.textContent) || 0;
            commentCount.textContent = Math.max(0, currentComments - 1);
            savePostInteraction(postId, 'comments', commentCount.textContent);
        }
        
        loadExistingPostComments(postId);
        showTempMessage('Comment deleted successfully!');
    }
}

// Save edited comment
function saveExistingCommentEdit(postId, commentIndex) {
    const modal = document.querySelector('.comments-modal');
    if (!modal) return;
    
    const commentItem = modal.querySelector(`[data-comment-index="${commentIndex}"]`);
    const editInput = commentItem.querySelector('.comment-edit-input');
    const newText = editInput.value.trim();
    
    if (!newText) {
        alert('Comment cannot be empty');
        return;
    }
    
    let postComments = JSON.parse(localStorage.getItem(`existingPostComments_${postId}`)) || [];
    
    if (postComments[commentIndex]) {
        postComments[commentIndex].text = newText;
        postComments[commentIndex].isEditing = false;
        postComments[commentIndex].time = 'Edited just now';
        localStorage.setItem(`existingPostComments_${postId}`, JSON.stringify(postComments));
        loadExistingPostComments(postId);
        showTempMessage('Comment updated successfully!');
    }
}

// Cancel comment edit
function cancelExistingCommentEdit(postId, commentIndex) {
    let postComments = JSON.parse(localStorage.getItem(`existingPostComments_${postId}`)) || [];
    
    if (postComments[commentIndex]) {
        postComments[commentIndex].isEditing = false;
        localStorage.setItem(`existingPostComments_${postId}`, JSON.stringify(postComments));
        loadExistingPostComments(postId);
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showTempMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #4CAF50;
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (document.body.contains(messageDiv)) {
            document.body.removeChild(messageDiv);
        }
    }, 3000);
}

// Enhanced Like functionality for existing posts
document.addEventListener('click', function(e) {
    // Like button functionality - more specific targeting
    if (e.target.closest('.add-post-links a') && 
        (e.target.closest('a').querySelector('img').src.includes('imgs/like.png') || 
         e.target.closest('a').querySelector('img').src.includes('imgs/liked.png'))) {
        
        // Prevent default link behavior to stop page refresh/navigation
        e.preventDefault();
        e.stopPropagation();
        
        const likeLink = e.target.closest('a');
        const likeImg = likeLink.querySelector('img');
        const likeCount = likeLink.textContent.match(/\d+/);
        let currentLikes = parseInt(likeCount ? likeCount[0] : 0);
        
        if (likeImg.src.includes('imgs/like.png')) {
            // Unlike to like
            likeImg.src = 'imgs/liked.png';
            likeLink.innerHTML = `<img src="imgs/liked.png" style="width: 20px; margin-right: 5px;">${currentLikes + 1}`;
            likeLink.style.color = '#1876f2';
            likeLink.classList.add('liked');
        } else {
            // Like to unlike
            likeImg.src = 'imgs/like.png';
            likeLink.innerHTML = `<img src="imgs/like.png" style="width: 20px; margin-right: 5px;">${Math.max(0, currentLikes - 1)}`;
            likeLink.style.color = '#626262';
            likeLink.classList.remove('liked');
        }
        

        likeImg.classList.add('like-animation');
        setTimeout(() => {
            likeImg.classList.remove('like-animation');
        }, 300);
    }
});

// Media Upload functionality
function openMediaUpload() {
    document.getElementById('mediaUploadInput').click();
}

document.getElementById('mediaUploadInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const fileType = file.type.split('/')[0];
    const previewImg = document.getElementById('previewImg');
    const mediaPreview = document.getElementById('mediaPreview');
    
    if (fileType === 'image' || fileType === 'video') {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (fileType === 'image') {
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';
            } else {
                // For videos, we'll just show a thumbnail with a play icon
                previewImg.src = 'imgs/video.jpg';
                previewImg.style.display = 'block';
            }
            mediaPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image or video file');
    }
});

function removeMediaPreview() {
    document.getElementById('mediaPreview').style.display = 'none';
    document.getElementById('mediaUploadInput').value = '';
}

// Feelings/Activity functionality
let selectedFeeling = null;

function openFeelingsModal() {
    document.getElementById('feelingsModal').classList.add('active');
}

function closeFeelingsModal() {
    document.getElementById('feelingsModal').classList.remove('active');
    // Reset selections
    document.querySelectorAll('.feeling-option').forEach(option => {
        option.classList.remove('selected');
    });
    selectedFeeling = null;
}

// Add event listeners to feeling options
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.feeling-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selection from all options
            document.querySelectorAll('.feeling-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Select this option
            this.classList.add('selected');
            selectedFeeling = {
                feeling: this.getAttribute('data-feeling'),
                icon: this.getAttribute('data-icon')
            };
        });
    });
});

function saveFeeling() {
    if (!selectedFeeling) {
        alert('Please select a feeling or activity');
        return;
    }
    
    // Update the preview
    const feelingPreview = document.getElementById('feelingPreview');
    const feelingIcon = document.getElementById('feelingIcon');
    const feelingText = document.getElementById('feelingText');
    
    feelingIcon.src = selectedFeeling.icon;
    feelingText.textContent = `Feeling ${selectedFeeling.feeling}`;
    feelingPreview.style.display = 'flex';
    
    closeFeelingsModal();
}

// Live Video functionality
let isLive = false;
let liveStream = null;

function openLiveVideoModal() {
    document.getElementById('liveVideoModal').classList.add('active');
}

function closeLiveVideoModal() {
    document.getElementById('liveVideoModal').classList.remove('active');
    if (isLive) {
        stopLiveVideo();
    }
}

function startLiveVideo() {
    const title = document.getElementById('liveTitle').value || 'Live Stream';
    const privacy = document.getElementById('livePrivacy').value;
    
    // Simulate starting a live stream
    isLive = true;
    document.getElementById('startLiveBtn').style.display = 'none';
    document.getElementById('stopLiveBtn').style.display = 'inline-block';
    
    // Update preview
    const livePreview = document.getElementById('livePreview');
    livePreview.innerHTML = `
        <div class="camera-placeholder" style="background: #000; color: white; text-align: center; padding: 20px;">
        <h3>🔴 LIVE</h3>
        <p>${title}</p>
        <p>Streaming to: ${privacy}</p>
        <p>Viewers: 0</p>
        </div>
    `;
    
    // Create a live video post
    createLiveVideoPost(title, privacy);
    
    showTempMessage('Live stream started!');
}

function stopLiveVideo() {
    isLive = false;
    document.getElementById('startLiveBtn').style.display = 'inline-block';
    document.getElementById('stopLiveBtn').style.display = 'none';
    
    // Reset preview
    const livePreview = document.getElementById('livePreview');
    livePreview.innerHTML = `
        <div class="camera-placeholder">
        <img src="imgs/camera.jpg" alt="Camera">
        <p>Camera preview will appear here</p>
        </div>
    `;
    
    closeLiveVideoModal();
    showTempMessage('Live stream ended!');
}

function createLiveVideoPost(title, privacy) {
    const post = {
        id: 'live-' + Date.now(),
        type: 'live',
        author: 'Dêstîñëë Dèstîñëë',
        authorImg: 'imgs/profile-pic.jpg',
        title: title,
        privacy: privacy,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        viewers: Math.floor(Math.random() * 100) + 1
    };
    
    // Add to posts array
    if (!window.posts) window.posts = [];
    window.posts.unshift(post);
    
    // Save to localStorage
    savePostsToStorage();
    
    // Render the post
    renderPosts();
}

// Story data structure that persists for 24 hours
function getStories() {
    const stories = JSON.parse(localStorage.getItem('socialNetStories')) || [];
    // Filter out expired stories (older than 24 hours)
    const now = new Date().getTime();
    const validStories = stories.filter(story => {
        const storyTime = new Date(story.timestamp).getTime();
        return (now - storyTime) < (24 * 60 * 60 * 1000); // 24 hours in milliseconds
    });
    
    // Update localStorage with only valid stories
    if (validStories.length !== stories.length) {
        localStorage.setItem('socialNetStories', JSON.stringify(validStories));
    }
    
    return validStories;
}

function saveStory(story) {
    const stories = getStories();
    stories.unshift(story);
    localStorage.setItem('socialNetStories', JSON.stringify(stories));
}

// Initialize stories when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderStories();
});