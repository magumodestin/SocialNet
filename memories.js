// Sample data for saved items
const savedItems = {
    all: [
        {
            id: 1,
            type: 'post',
            author: { name: 'Jane Smith', avatar: 'JS' },
            time: '2 days ago',
            content: 'Just finished reading this amazing article about the future of renewable energy. Definitely worth saving for future reference!',
            image: 'Article Preview Image',
            category: 'post',
            likes: 24,
            liked: false,
            comments: [
                { author: 'Mike Johnson', text: 'Great read! Thanks for sharing.' },
                { author: 'Sarah Wilson', text: 'This is so informative!' }
            ]
        },
        {
            id: 2,
            type: 'video',
            author: { name: 'Tech Review Channel', avatar: 'TR' },
            time: '3 days ago',
            content: 'This video explains the latest smartphone features in such detail. Saved it to watch again before my next phone purchase.',
            video: {
                thumbnail: 'Video Thumbnail',
                duration: '12:45',
                title: 'Smartphone Camera Comparison 2023'
            },
            category: 'videos',
            likes: 15,
            liked: true,
            comments: [
                { author: 'Alex Chen', text: 'Very helpful comparison!' }
            ]
        },
        {
            id: 3,
            type: 'photo',
            author: { name: 'Nature Photography', avatar: 'NP' },
            time: '1 week ago',
            content: 'Stunning landscape from my recent hiking trip. Saving this as inspiration for my next photography project.',
            image: 'Mountain Landscape',
            category: 'photos',
            likes: 42,
            liked: false,
            comments: []
        },
        {
            id: 4,
            type: 'link',
            author: { name: 'Web Dev Daily', avatar: 'WD' },
            time: '1 week ago',
            content: 'This CSS tutorial is incredibly helpful for creating modern layouts. Saving for reference.',
            link: {
                domain: 'css-tricks.com',
                title: 'Complete Guide to Flexbox',
                description: 'Learn how to use the CSS Flexbox layout module to create responsive web designs.',
                image: 'CSS Tricks Preview'
            },
            category: 'links',
            likes: 8,
            liked: false,
            comments: []
        }
    ],
    videos: [
        {
            id: 2,
            type: 'video',
            author: { name: 'Tech Review Channel', avatar: 'TR' },
            time: '3 days ago',
            content: 'This video explains the latest smartphone features in such detail. Saved it to watch again before my next phone purchase.',
            video: {
                thumbnail: 'Video Thumbnail',
                duration: '12:45',
                title: 'Smartphone Camera Comparison 2023'
            },
            category: 'videos',
            likes: 15,
            liked: true,
            comments: [
                { author: 'Alex Chen', text: 'Very helpful comparison!' }
            ]
        }
    ],
    photos: [
        {
            id: 3,
            type: 'photo',
            author: { name: 'Nature Photography', avatar: 'NP' },
            time: '1 week ago',
            content: 'Stunning landscape from my recent hiking trip. Saving this as inspiration for my next photography project.',
            image: 'Mountain Landscape',
            category: 'photos',
            likes: 42,
            liked: false,
            comments: []
        }
    ],
    links: [
        {
            id: 4,
            type: 'link',
            author: { name: 'Web Dev Daily', avatar: 'WD' },
            time: '1 week ago',
            content: 'This CSS tutorial is incredibly helpful for creating modern layouts. Saving for reference.',
            link: {
                domain: 'css-tricks.com',
                title: 'Complete Guide to Flexbox',
                description: 'Learn how to use the CSS Flexbox layout module to create responsive web designs.',
                image: 'CSS Tricks Preview'
            },
            category: 'links',
            likes: 8,
            liked: false,
            comments: []
        }
    ],
    marketplace: [
        {
            id: 9,
            type: 'marketplace',
            author: { name: 'Local Seller', avatar: 'LS' },
            time: '2 days ago',
            content: 'This vintage camera is in great condition. Saving to consider purchasing.',
            image: 'Vintage Camera',
            price: '$120',
            category: 'marketplace',
            likes: 5,
            liked: false,
            comments: []
        }
    ],
    groups: [
        {
            id: 10,
            type: 'group',
            author: { name: 'Hiking Enthusiasts', avatar: 'HE' },
            time: '5 days ago',
            content: 'This group has amazing trail recommendations. Saving to check out their upcoming events.',
            image: 'Group Banner',
            category: 'groups',
            likes: 12,
            liked: false,
            comments: []
        }
    ],
    pages: [
        {
            id: 11,
            type: 'page',
            author: { name: 'National Geographic', avatar: 'NG' },
            time: '1 week ago',
            content: 'This page shares incredible wildlife photography. Saving to follow their content.',
            image: 'Page Banner',
            category: 'pages',
            likes: 31,
            liked: false,
            comments: []
        }
    ]
};

// Category titles and descriptions
const categoryInfo = {
    all: {
        title: 'Saved Posts',
        description: 'Posts you\'ve saved for later'
    },
    videos: {
        title: 'Saved Videos',
        description: 'Videos you\'ve saved for later'
    },
    photos: {
        title: 'Saved Photos',
        description: 'Photos you\'ve saved for later'
    },
    links: {
        title: 'Saved Links',
        description: 'Links you\'ve saved for later'
    },
    marketplace: {
        title: 'Saved Marketplace Items',
        description: 'Items from Marketplace you\'ve saved for later'
    },
    groups: {
        title: 'Saved Groups',
        description: 'Groups you\'ve saved for later'
    },
    pages: {
        title: 'Saved Pages',
        description: 'Pages you\'ve saved for later'
    }
};

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Apply dark mode if previously enabled
if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '🌙';
} else {
    darkModeToggle.textContent = '☀️';
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update button text and save preference
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'true');
    } else {
        darkModeToggle.textContent = '☀️';
        localStorage.setItem('darkMode', 'false');
    }
});

// Function to render posts based on category
function renderPosts(category) {
    const container = document.getElementById('saved-posts-container');
    const pageTitle = document.getElementById('page-title');
    const pageDescription = document.getElementById('page-description');
    
    // Update page title and description
    pageTitle.textContent = categoryInfo[category].title;
    pageDescription.textContent = categoryInfo[category].description;
    
    // Clear container
    container.innerHTML = '';
    
    // Get posts for the selected category
    const posts = savedItems[category];
    
    if (posts.length === 0) {
        container.innerHTML = '<div class="post"><p>No saved items in this category.</p></div>';
        return;
    }
    
    // Render each post
    posts.forEach(post => {
        let postHTML = '';
        
        if (post.type === 'video') {
            postHTML = `
                <div class="post" data-id="${post.id}">
                    <div class="post-header">
                        <div class="post-author-avatar">${post.author.avatar}</div>
                        <div class="post-author-info">
                            <div class="post-author-name">${post.author.name}</div>
                            <div class="post-time">${post.time}</div>
                        </div>
                    </div>
                    
                    <div class="post-content">
                        <p>${post.content}</p>
                    </div>
                    
                    <div class="video-container">
                        <div class="video-thumbnail">${post.video.thumbnail}</div>
                        <div class="video-play-button">
                            <svg viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                        <div class="video-duration">${post.video.duration}</div>
                    </div>
                    
                    <div class="category-tag">Video</div>
                    
                    <div class="post-actions">
                        <button class="post-action like-button ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                            <img src="${post.liked ? 'liked.png' : 'like.png'}" alt="Like">
                            <span>${post.liked ? 'Liked' : 'Like'}</span>
                        </button>
                        <button class="post-action comment-button" data-id="${post.id}">
                            <img src="comment.jpg" alt="Comment">
                            <span>Comment</span>
                        </button>
                        <button class="post-action share-button" data-id="${post.id}">
                            <img src="share.jpg" alt="Share">
                            <span>Share</span>
                        </button>
                        <button class="post-action save-button saved">
                            <img src="saved.png" alt="Saved">
                            <span>Saved</span>
                        </button>
                    </div>
                    
                    <div class="comment-section" id="comment-section-${post.id}" style="display: none;">
                        <div class="comment-input">
                            <div class="comment-avatar">D</div>
                            <input type="text" placeholder="Write a comment..." id="comment-input-${post.id}">
                        </div>
                        <div class="comments-list" id="comments-list-${post.id}">
                            ${post.comments.map(comment => `
                                <div class="comment">
                                    <div class="comment-avatar">${comment.author.charAt(0)}</div>
                                    <div class="comment-content">
                                        <div class="comment-author">${comment.author}</div>
                                        <div class="comment-text">${comment.text}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else if (post.type === 'link') {
            postHTML = `
                <div class="post" data-id="${post.id}">
                    <div class="post-header">
                        <div class="post-author-avatar">${post.author.avatar}</div>
                        <div class="post-author-info">
                            <div class="post-author-name">${post.author.name}</div>
                            <div class="post-time">${post.time}</div>
                        </div>
                    </div>
                    
                    <div class="post-content">
                        <p>${post.content}</p>
                    </div>
                    
                    <div class="link-preview">
                        <div class="link-image">${post.link.image}</div>
                        <div class="link-info">
                            <div class="link-domain">${post.link.domain}</div>
                            <div class="link-title">${post.link.title}</div>
                            <div class="link-description">${post.link.description}</div>
                        </div>
                    </div>
                    
                    <div class="category-tag">Link</div>
                    
                    <div class="post-actions">
                        <button class="post-action like-button ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                            <img src="${post.liked ? 'liked.png' : 'like.png'}" alt="Like">
                            <span>${post.liked ? 'Liked' : 'Like'}</span>
                        </button>
                        <button class="post-action comment-button" data-id="${post.id}">
                            <img src="comment.jpg" alt="Comment">
                            <span>Comment</span>
                        </button>
                        <button class="post-action share-button" data-id="${post.id}">
                            <img src="share.jpg" alt="Share">
                            <span>Share</span>
                        </button>
                        <button class="post-action save-button saved">
                            <img src="saved.png" alt="Saved">
                            <span>Saved</span>
                        </button>
                    </div>
                    
                    <div class="comment-section" id="comment-section-${post.id}" style="display: none;">
                        <div class="comment-input">
                            <div class="comment-avatar">D</div>
                            <input type="text" placeholder="Write a comment..." id="comment-input-${post.id}">
                        </div>
                        <div class="comments-list" id="comments-list-${post.id}">
                            ${post.comments.map(comment => `
                                <div class="comment">
                                    <div class="comment-avatar">${comment.author.charAt(0)}</div>
                                    <div class="comment-content">
                                        <div class="comment-author">${comment.author}</div>
                                        <div class="comment-text">${comment.text}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Regular post with image
            postHTML = `
                <div class="post" data-id="${post.id}">
                    <div class="post-header">
                        <div class="post-author-avatar">${post.author.avatar}</div>
                        <div class="post-author-info">
                            <div class="post-author-name">${post.author.name}</div>
                            <div class="post-time">${post.time}</div>
                        </div>
                    </div>
                    
                    <div class="post-content">
                        <p>${post.content}</p>
                    </div>
                    
                    <div class="post-image">
                        ${post.image}
                    </div>
                    
                    ${post.category !== 'post' ? `<div class="category-tag">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</div>` : ''}
                    
                    <div class="post-actions">
                        <button class="post-action like-button ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                            <img src="${post.liked ? 'liked.png' : 'like.png'}" alt="Like">
                            <span>${post.liked ? 'Liked' : 'Like'}</span>
                        </button>
                        <button class="post-action comment-button" data-id="${post.id}">
                            <img src="comment.jpg" alt="Comment">
                            <span>Comment</span>
                        </button>
                        <button class="post-action share-button" data-id="${post.id}">
                            <img src="share.jpg" alt="Share">
                            <span>Share</span>
                        </button>
                        <button class="post-action save-button saved">
                            <img src="saved.png" alt="Saved">
                            <span>Saved</span>
                        </button>
                    </div>
                    
                    <div class="comment-section" id="comment-section-${post.id}" style="display: none;">
                        <div class="comment-input">
                            <div class="comment-avatar">D</div>
                            <input type="text" placeholder="Write a comment..." id="comment-input-${post.id}">
                        </div>
                        <div class="comments-list" id="comments-list-${post.id}">
                            ${post.comments.map(comment => `
                                <div class="comment">
                                    <div class="comment-avatar">${comment.author.charAt(0)}</div>
                                    <div class="comment-content">
                                        <div class="comment-author">${comment.author}</div>
                                        <div class="comment-text">${comment.text}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        
        container.innerHTML += postHTML;
    });
    
    // Re-attach event listeners
    attachEventListeners();
}

// Function to attach event listeners
function attachEventListeners() {
    // Like button functionality
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            const post = findPostById(postId);
            
            if (post) {
                post.liked = !post.liked;
                if (post.liked) {
                    post.likes++;
                    this.innerHTML = '<img src="liked.png" alt="Liked"><span>Liked</span>';
                    this.classList.add('liked');
                } else {
                    post.likes--;
                    this.innerHTML = '<img src="like.png" alt="Like"><span>Like</span>';
                    this.classList.remove('liked');
                }
                
                // Show like animation
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
    
    // Comment button functionality
    document.querySelectorAll('.comment-button').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            const commentSection = document.getElementById(`comment-section-${postId}`);
            
            if (commentSection.style.display === 'none') {
                commentSection.style.display = 'block';
                // Focus on the comment input
                document.getElementById(`comment-input-${postId}`).focus();
            } else {
                commentSection.style.display = 'none';
            }
            
            // Show click animation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Comment input functionality
    document.querySelectorAll('.comment-input input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                const postId = this.id.split('-')[2];
                const post = findPostById(postId);
                
                if (post) {
                    const newComment = {
                        author: 'Dave',
                        text: this.value.trim()
                    };
                    
                    post.comments.push(newComment);
                    
                    const commentsList = document.getElementById(`comments-list-${postId}`);
                    commentsList.innerHTML += `
                        <div class="comment">
                            <div class="comment-avatar">D</div>
                            <div class="comment-content">
                                <div class="comment-author">Dave</div>
                                <div class="comment-text">${this.value.trim()}</div>
                            </div>
                        </div>
                    `;
                    
                    // Clear input and show success animation
                    this.value = '';
                    this.style.backgroundColor = '#e8f5e8';
                    setTimeout(() => {
                        this.style.backgroundColor = '';
                    }, 1000);
                }
            }
        });
    });
    
    // Share button functionality
    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            const post = findPostById(postId);
            
            if (post) {
                // Simulate sharing functionality
                alert(`Sharing post by ${post.author.name}`);
                
                // Show share animation
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
    
    // Save button functionality
    document.querySelectorAll('.save-button').forEach(button => {
        button.addEventListener('click', function() {
            const isCurrentlySaved = this.classList.contains('saved');
            
            if (isCurrentlySaved) {
                this.classList.remove('saved');
                this.innerHTML = '<img src="save.png" alt="Save"><span>Save</span>';
                alert('Post removed from saved items');
            } else {
                this.classList.add('saved');
                this.innerHTML = '<img src="saved.png" alt="Saved"><span>Saved</span>';
                alert('Post saved!');
            }
            
            // Show animation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Helper function to find post by ID
function findPostById(postId) {
    for (const category in savedItems) {
        const post = savedItems[category].find(p => p.id == postId);
        if (post) return post;
    }
    return null;
}

// Initialize the page with 'all' category
document.addEventListener('DOMContentLoaded', function() {
    renderPosts('all');
    
    // Add event listeners to sidebar menu items
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.sidebar-menu a').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get category from data attribute
            const category = this.getAttribute('data-category');
            
            // Render posts for the selected category
            renderPosts(category);
        });
    });
});