// Following data
const following = [
    { name: "DJ Khaled", location: "USA", color: "#1877f2" },
    { name: "Quavo", location: "USA", color: "#42b883" },
    { name: "Chief Ben", location: "USA", color: "#ff6b6b" },
    { name: "Anwar Jibawi", location: "USA", color: "#9c88ff" },
    { name: "Mr. Bean", location: "UK", color: "#fbc531" },
    { name: "Adam W", location: "USA", color: "#e84118" },
    { name: "Taylor Swift", location: "USA", color: "#00a8ff" },
    { name: "Drake", location: "Canada", color: "#8c7ae6" },
    { name: "Adele", location: "UK", color: "#44bd32" },
    { name: "K.O", location: "South Africa", color: "#ff6b35" },
    { name: "Emtee", location: "South Africa", color: "#0c2461" },
    { name: "DJ Jaivane", location: "South Africa", color: "#8e44ad" },
    { name: "Ed Sheeran", location: "UK", color: "#e1b12c" },
    { name: "Beyoncé", location: "USA", color: "#c23616" },
    { name: "Rihanna", location: "Barbados", color: "#0097e6" },
    { name: "Harry Styles", location: "UK", color: "#8e44ad" },
    { name: "Billie Eilish", location: "USA", color: "#16a085" },
    { name: "Post Malone", location: "USA", color: "#d35400" },
    { name: "Ariana Grande", location: "USA", color: "#c44569" },
    { name: "The Weeknd", location: "Canada", color: "#273c75" },
    { name: "Dua Lipa", location: "UK", color: "#e056fd" },
    { name: "Bruno Mars", location: "USA", color: "#f97f51" },
    { name: "Doja Cat", location: "USA", color: "#badc58" },
    { name: "Lizzo", location: "USA", color: "#ff7979" },
    { name: "SZA", location: "USA", color: "#686de0" },
    { name: "Kendrick Lamar", location: "USA", color: "#30336b" },
    { name: "Tyler, The Creator", location: "USA", color: "#130f40" },
    { name: "Jack Harlow", location: "USA", color: "#6ab04c" },
    { name: "Lil Nas X", location: "USA", color: "#eb4d4b" },
    { name: "Megan Thee Stallion", location: "USA", color: "#f9ca24" },
    { name: "Cardi B", location: "USA", color: "#f0932b" },
    { name: "Nicki Minaj", location: "USA", color: "#eb3b5a" },
    { name: "Travis Scott", location: "USA", color: "#0c2461" }
];

// Sample posts data for each user
const postsData = {
    "DJ Khaled": [
        { type: "image", content: "Another one!", image: "https://picsum.photos/400/400?random=1" },
        { type: "video", content: "We the best!", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
        { type: "image", content: "Bless up!", image: "https://picsum.photos/400/400?random=2" },
        { type: "image", content: "Major key alert!", image: "https://picsum.photos/400/400?random=3" },
        { type: "video", content: "They don't want you to win", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
    ],
    "Quavo": [
        { type: "image", content: "New music coming soon!", image: "https://picsum.photos/400/400?random=4" },
        { type: "video", content: "Studio session", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        { type: "image", content: "Huncho!", image: "https://picsum.photos/400/400?random=5" },
        { type: "image", content: "On tour", image: "https://picsum.photos/400/400?random=6" },
        { type: "video", content: "Live performance", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
    ],
    "Taylor Swift": [
        { type: "image", content: "Eras Tour!", image: "https://picsum.photos/400/400?random=7" },
        { type: "video", content: "New music video", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
        { type: "image", content: "In the studio", image: "https://picsum.photos/400/400?random=8" },
        { type: "image", content: "With my cats", image: "https://picsum.photos/400/400?random=9" },
        { type: "video", content: "Behind the scenes", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" }
    ],
    "Drake": [
        { type: "image", content: "OVO", image: "https://picsum.photos/400/400?random=10" },
        { type: "video", content: "New track", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
        { type: "image", content: "Toronto love", image: "https://picsum.photos/400/400?random=11" },
        { type: "image", content: "Champagne Papi", image: "https://picsum.photos/400/400?random=12" },
        { type: "video", content: "Live from Toronto", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" }
    ],
    "K.O": [
        { 
            type: "album", 
            content: "Phara City out now on all platforms!", 
            image: "https://images.genius.com/4d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d.1000x1000x1.jpg",
            title: "Phara City",
            info: "New Album",
            youtubeLink: "https://www.youtube.com/watch?v=OUTOO0TmGyo"
        },
        { type: "image", content: "In the studio working on new music", image: "https://picsum.photos/400/400?random=13" },
        { type: "video", content: "Behind the scenes of Phara City", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        { type: "image", content: "Performing live in Johannesburg", image: "https://picsum.photos/400/400?random=14" },
        { type: "image", content: "New merch coming soon!", image: "https://picsum.photos/400/400?random=15" }
    ],
    "Emtee": [
        { 
            type: "album", 
            content: "DIY 3 out now! My latest project", 
            image: "https://images.genius.com/5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e.1000x1000x1.jpg",
            title: "DIY 3",
            info: "Latest Album",
            youtubeLink: "https://www.youtube.com/watch?v=DIY3EMTEE"
        },
        { type: "image", content: "On set for new music video", image: "https://picsum.photos/400/400?random=16" },
        { type: "video", content: "Live performance snippet", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
        { type: "image", content: "With the team at the studio", image: "https://picsum.photos/400/400?random=17" },
        { type: "image", content: "Thank you for all the support!", image: "https://picsum.photos/400/400?random=18" }
    ],
    "DJ Jaivane": [
        { 
            type: "album", 
            content: "New single 'Amapiano' dropping soon!", 
            image: "https://images.genius.com/6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f.1000x1000x1.jpg",
            title: "Amapiano",
            info: "Upcoming Single",
            youtubeLink: "https://www.youtube.com/watch?v=DJJAIVANE"
        },
        { type: "image", content: "Mixing in the studio", image: "https://picsum.photos/400/400?random=19" },
        { type: "video", content: "Live set at Club 54", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
        { type: "image", content: "New equipment just arrived", image: "https://picsum.photos/400/400?random=20" },
        { type: "image", content: "Behind the decks", image: "https://picsum.photos/400/400?random=21" }
    ]
};

// Function to generate avatar initials
function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
}

// Function to generate following cards
function generateFollowingCards(people = following) {
    const followingList = document.getElementById('followingList');
    followingList.innerHTML = '';
    
    if (people.length === 0) {
        followingList.innerHTML = '<div class="no-results">No matching results found</div>';
        return;
    }
    
    people.forEach(person => {
        const card = document.createElement('div');
        card.className = 'following-card';
        
        const initials = getInitials(person.name);
        
        card.innerHTML = `
            <div class="avatar" style="background-color: ${person.color}">${initials}</div>
            <div class="name">${person.name}</div>
            <div class="location">${person.location}</div>
            <button class="btn btn-following">Following</button>
        `;
        
        card.addEventListener('click', () => {
            openProfileModal(person);
        });
        
        followingList.appendChild(card);
    });
}

// Function to open profile modal
function openProfileModal(person) {
    const modal = document.getElementById('profileModal');
    const profileAvatar = document.getElementById('profileAvatar');
    const profileName = document.getElementById('profileName');
    const profileLocation = document.getElementById('profileLocation');
    const postsCount = document.getElementById('postsCount');
    const followersCount = document.getElementById('followersCount');
    const followingCount = document.getElementById('followingCount');
    const postsGrid = document.getElementById('postsGrid');
    
    // Set profile info
    profileAvatar.style.backgroundColor = person.color;
    profileAvatar.textContent = getInitials(person.name);
    profileName.textContent = person.name;
    profileLocation.textContent = person.location;
    
    // Generate random stats
    postsCount.textContent = Math.floor(Math.random() * 100) + 10;
    followersCount.textContent = Math.floor(Math.random() * 1000000).toLocaleString();
    followingCount.textContent = Math.floor(Math.random() * 1000) + 50;
    
    // Generate posts
    postsGrid.innerHTML = '';
    const posts = postsData[person.name] || generateRandomPosts(person.name);
    
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        
        if (post.type === 'image') {
            postItem.innerHTML = `
                <img src="${post.image}" alt="Post" class="post-image">
                <div class="post-caption">${post.content}</div>
            `;
        } else if (post.type === 'video') {
            postItem.innerHTML = `
                <video class="post-video" controls>
                    <source src="${post.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="post-caption">${post.content}</div>
            `;
        } else if (post.type === 'album') {
            postItem.className = 'post-item album-post';
            postItem.innerHTML = `
                <img src="${post.image}" alt="Album" class="post-image">
                <div class="album-overlay">
                    <div class="album-title">${post.title}</div>
                    <div class="album-info">${post.info}</div>
                    <div class="post-caption">${post.content}</div>
                    <a href="${post.youtubeLink}" target="_blank" class="youtube-link">Watch on YouTube</a>
                </div>
            `;
        }
        
        postsGrid.appendChild(postItem);
    });
    
    modal.style.display = 'block';
}

// Function to generate random posts for users without predefined posts
function generateRandomPosts(name) {
    const posts = [];
    const postTypes = ['image', 'video'];
    const captions = [
        "Having a great day!",
        "New project coming soon",
        "Check this out!",
        "Amazing experience",
        "Can't wait to share more",
        "Behind the scenes",
        "Throwback",
        "What do you think?",
        "Exciting news coming soon",
        "Working hard"
    ];
    
    for (let i = 0; i < 5; i++) {
        const type = postTypes[Math.floor(Math.random() * postTypes.length)];
        const caption = captions[Math.floor(Math.random() * captions.length)];
        
        if (type === 'image') {
            posts.push({
                type: 'image',
                content: caption,
                image: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`
            });
        } else {
            posts.push({
                type: 'video',
                content: caption,
                video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            });
        }
    }
    
    return posts;
}

// Function to handle search
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        generateFollowingCards();
        return;
    }
    
    const filteredFollowing = following.filter(person => 
        person.name.toLowerCase().includes(searchTerm)
    );
    
    generateFollowingCards(filteredFollowing);
}

// Function to toggle dark/light mode
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    generateFollowingCards();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').textContent = '🌙';
    }
    
    // Add event listener for search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    // Add event listener for modal close button
    const closeModal = document.getElementById('closeModal');
    const modal = document.getElementById('profileModal');
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Add event listener for theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});