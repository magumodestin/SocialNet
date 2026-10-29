      // Dark Mode Functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial state
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isNowDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDarkMode);
    });
}

// Update your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    initializePostState();
    renderPosts('all');
    initializeDarkMode(); // Add this line
    
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

	  // Sample data for saved items
        const savedItems = {
            all: [
                {
                    id: 1,
                    type: 'post',
                    author: { name: 'Sarah Chen', avatar: 'SC' },
                    time: '2 days ago',
                    content: 'Just finished reading this comprehensive guide about React Hooks and their practical applications. Definitely worth saving for future reference!',
                    image: 'React Hooks Guide Preview',
                    category: 'post'
                },
               {
    id: 2,
    type: 'video',
    author: { name: 'Web Dev Simplified', avatar: 'WD' },
    time: '3 days ago',
    content: 'This video explains JavaScript closures in such detail. Saved it to watch again before my next technical interview.',
    video: 'javascript.mp4',
    category: 'videos'
},
                {
                    id: 3,
                    type: 'photo',
                    author: { name: 'CSS Tricks', avatar: 'CT' },
                    time: '1 week ago',
                    content: 'Amazing CSS Grid layout examples. Saving this as inspiration for my next project.',
                    image: 'CSS Grid Layout Examples',
                    category: 'photos'
                },
                {
                    id: 4,
                    type: 'link',
                    author: { name: 'Node.js Weekly', avatar: 'NJ' },
                    time: '1 week ago',
                    content: 'This Node.js performance optimization tutorial is incredibly helpful. Saving for reference.',
                    link: {
                        domain: 'nodejs.org',
                        title: 'Advanced Node.js Performance Optimization',
                        description: 'Learn how to optimize your Node.js applications for better performance and scalability.',
                        image: 'Node.js Performance Preview'
                    },
                    category: 'links'
                }
            ],
            videos: [
                {
                    id: 2,
                    type: 'video',
                    author: { name: 'Web Dev Simplified', avatar: 'WD' },
                    time: '3 days ago',
                    content: 'This video explains JavaScript closures in such detail. Saved it to watch again before my next technical interview.',
                    video: {
                        thumbnail: 'JavaScript Closures Thumbnail',
                        duration: '15:30',
                        title: 'Understanding JavaScript Closures - Complete Guide'
                    },
                    category: 'videos'
                }
            ],
            photos: [
                {
                    id: 3,
                    type: 'photo',
                    author: { name: 'CSS Tricks', avatar: 'CT' },
                    time: '1 week ago',
                    content: 'Amazing CSS Grid layout examples. Saving this as inspiration for my next project.',
                    image: 'CSS Grid Layout Examples',
                    category: 'photos'
                }
            ],
            links: [
                {
                    id: 4,
                    type: 'link',
                    author: { name: 'Node.js Weekly', avatar: 'NJ' },
                    time: '1 week ago',
                    content: 'This Node.js performance optimization tutorial is incredibly helpful. Saving for reference.',
                    link: {
                        domain: 'nodejs.org',
                        title: 'Advanced Node.js Performance Optimization',
                        description: 'Learn how to optimize your Node.js applications for better performance and scalability.',
                        image: 'Node.js Performance Preview'
                    },
                    category: 'links'
                }
            ],
            marketplace: [
                {
                    id: 11,
                    type: 'marketplace',
                    author: { name: 'Code Resources', avatar: 'CR' },
                    time: '2 days ago',
                    content: 'This premium React component library looks amazing. Saving to consider purchasing for my team.',
                    image: 'React Component Library Preview',
                    price: '$89',
                    category: 'marketplace'
                }
            ],
            groups: [
                {
                    id: 12,
                    type: 'group',
                    author: { name: 'React Developers Community', avatar: 'RC' },
                    time: '5 days ago',
                    content: 'This group has amazing React patterns and best practices. Saving to check out their weekly discussions.',
                    image: 'React Community Banner',
                    category: 'groups'
                }
            ],
            pages: [
                {
                    id: 13,
                    type: 'page',
                    author: { name: 'JavaScript Weekly', avatar: 'JW' },
                    time: '1 week ago',
                    content: 'This page shares incredible JavaScript tips and updates. Saving to follow their content regularly.',
                    image: 'JavaScript Weekly Banner',
                    category: 'pages'
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

        // Global state for likes, comments, and shares
        let postState = JSON.parse(localStorage.getItem('postState')) || {};

        // Initialize post state if not exists
        function initializePostState() {
            Object.values(savedItems).flat().forEach(post => {
                if (!postState[post.id]) {
                    postState[post.id] = {
                        likes: 0,
                        isLiked: false,
                        comments: [],
                        shares: 0
                    };
                }
            });
            savePostState();
        }

        // Save post state to localStorage
        function savePostState() {
            localStorage.setItem('postState', JSON.stringify(postState));
        }

        // Like functionality
        function handleLike(postId) {
            if (!postState[postId]) {
                postState[postId] = {
                    likes: 0,
                    isLiked: false,
                    comments: [],
                    shares: 0
                };
            }
            
            if (postState[postId].isLiked) {
                postState[postId].likes--;
                postState[postId].isLiked = false;
            } else {
                postState[postId].likes++;
                postState[postId].isLiked = true;
            }
            
            savePostState();
            updateLikeUI(postId);
        }

        // Update like UI using custom images
        function updateLikeUI(postId) {
            const likeButton = document.querySelector(`.post[data-id="${postId}"] .like-button`);
            const likeCount = document.querySelector(`.post[data-id="${postId}"] .like-count`);
            
            if (likeButton && likeCount) {
                likeButton.classList.toggle('liked', postState[postId].isLiked);
                likeCount.textContent = postState[postId].likes > 0 ? postState[postId].likes : '';
                
                // Update image based on like state
                const imageSrc = postState[postId].isLiked ? 'liked.png' : 'like.png';
                const label = postState[postId].isLiked ? 'Liked' : 'Like';

                likeButton.innerHTML = `
                    <img src="${imageSrc}" alt="${label}" class="action-icon" />
                    ${label}
                    <span class="like-count">${postState[postId].likes > 0 ? postState[postId].likes : ''}</span>
                `;
                
                // Reattach event listener
                likeButton.onclick = function() {
                    handleLike(postId);
                };
            }
        }

        // Comment functionality
        function handleComment(postId, commentText) {
            if (!commentText.trim()) return;
            
            if (!postState[postId]) {
                postState[postId] = {
                    likes: 0,
                    isLiked: false,
                    comments: [],
                    shares: 0
                };
            }
            
            const newComment = {
                id: Date.now(),
                author: 'You',
                text: commentText,
                time: 'Just now'
            };
            
            postState[postId].comments.unshift(newComment);
            savePostState();
            renderComments(postId);
        }

        // Render comments for a post
        function renderComments(postId) {
            const commentsSection = document.querySelector(`.post[data-id="${postId}"] .comment-list`);
            const commentInput = document.querySelector(`.post[data-id="${postId}"] .comment-input`);
            
            if (commentsSection && postState[postId]) {
                commentsSection.innerHTML = '';
                
                postState[postId].comments.forEach(comment => {
                    const commentHTML = `
                        <div class="comment">
                            <div class="comment-avatar">${comment.author.charAt(0)}</div>
                            <div class="comment-content">
                                <div class="comment-author">${comment.author}</div>
                                <div class="comment-text">${comment.text}</div>
                            </div>
                        </div>
                    `;
                    commentsSection.innerHTML += commentHTML;
                });
                
                if (commentInput) {
                    commentInput.value = '';
                }
            }
        }

        // Share functionality
        function handleShare(postId) {
            if (!postState[postId]) {
                postState[postId] = {
                    likes: 0,
                    isLiked: false,
                    comments: [],
                    shares: 0
                };
            }
            
            postState[postId].shares++;
            savePostState();
            
            // Update share count in UI
            const shareButton = document.querySelector(`.post[data-id="${postId}"] .share-button`);
            if (shareButton) {
                const shareCount = shareButton.querySelector('.share-count');
                if (shareCount) {
                    shareCount.textContent = postState[postId].shares > 0 ? postState[postId].shares : '';
                }
            }
            
            // Show share modal
            showShareModal(postId);
        }

        // Show share modal
        function showShareModal(postId) {
            const modal = document.getElementById('shareModal');
            const post = Object.values(savedItems).flat().find(p => p.id === postId);
            
            if (modal && post) {
                modal.classList.add('active');
                
                // Set up share options
                const shareOptions = modal.querySelectorAll('.share-option');
                shareOptions.forEach(option => {
                    option.onclick = function() {
                        const platform = this.getAttribute('data-platform');
                        shareToPlatform(post, platform);
                        modal.classList.remove('active');
                    };
                });
                
                // Close modal
                modal.querySelector('.close-modal').onclick = function() {
                    modal.classList.remove('active');
                };
                
                // Close on background click
                modal.onclick = function(e) {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                };
            }
        }

        // Simulate sharing to different platforms
        function shareToPlatform(post, platform) {
            const platforms = {
                'facebook': 'Facebook',
                'twitter': 'Twitter',
                'linkedin': 'LinkedIn',
                'copy': 'Clipboard'
            };
            
            alert(`Shared to ${platforms[platform]}!`);
        }

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
                const postStateData = postState[post.id] || {
                    likes: 0,
                    isLiked: false,
                    comments: [],
                    shares: 0
                };
                
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
                                <div class="post-action like-button ${postStateData.isLiked ? 'liked' : ''}">
                                    <img src="${postStateData.isLiked ? 'liked.png' : 'like.png'}" alt="${postStateData.isLiked ? 'Liked' : 'Like'}" class="action-icon" />
                                    ${postStateData.isLiked ? 'Liked' : 'Like'}
                                    <span class="like-count">${postStateData.likes > 0 ? postStateData.likes : ''}</span>
                                </div>
                                <div class="post-action comment-button">
                                    <img src="comment.jpg" alt="Comment" class="action-icon" />
                                    Comment
                                </div>
                                <div class="post-action share-button">
                                    <img src="share.jpg" alt="Share" class="action-icon" />
                                    Share
                                    <span class="share-count">${postStateData.shares > 0 ? postStateData.shares : ''}</span>
                                </div>
                                <div class="post-action save-button saved">
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="#42b883">
                                        <path d="M12 0H4C2.9 0 2 0.9 2 2V16L8 12L14 16V2C14 0.9 13.1 0 12 0Z"/>
                                    </svg>
                                    Saved
                                </div>
                            </div>
                            
                            <div class="comments-section">
                                <div class="comment-input-container">
                                    <div class="comment-avatar">D</div>
                                    <input type="text" class="comment-input" placeholder="Write a comment...">
                                    <button class="comment-submit">Post</button>
                                </div>
                                <div class="comment-list">
                                    ${postStateData.comments.map(comment => `
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
                                <div class="post-action like-button ${postStateData.isLiked ? 'liked' : ''}">
                                    <img src="${postStateData.isLiked ? 'liked.png' : 'like.png'}" alt="${postStateData.isLiked ? 'Liked' : 'Like'}" class="action-icon" />
                                    ${postStateData.isLiked ? 'Liked' : 'Like'}
                                    <span class="like-count">${postStateData.likes > 0 ? postStateData.likes : ''}</span>
                                </div>
                                <div class="post-action comment-button">
                                    <img src="comment.jpg" alt="Comment" class="action-icon" />
                                    Comment
                                </div>
                                <div class="post-action share-button">
                                    <img src="share.jpg" alt="Share" class="action-icon" />
                                    Share
                                    <span class="share-count">${postStateData.shares > 0 ? postStateData.shares : ''}</span>
                                </div>
                                <div class="post-action save-button saved">
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="#42b883">
                                        <path d="M12 0H4C2.9 0 2 0.9 2 2V16L8 12L14 16V2C14 0.9 13.1 0 12 0Z"/>
                                    </svg>
                                    Saved
                                </div>
                            </div>
                            
                            <div class="comments-section">
                                <div class="comment-input-container">
                                    <div class="comment-avatar">D</div>
                                    <input type="text" class="comment-input" placeholder="Write a comment...">
                                    <button class="comment-submit">Post</button>
                                </div>
                                <div class="comment-list">
                                    ${postStateData.comments.map(comment => `
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
                                <div class="post-action like-button ${postStateData.isLiked ? 'liked' : ''}">
                                    <img src="${postStateData.isLiked ? 'liked.png' : 'like.png'}" alt="${postStateData.isLiked ? 'Liked' : 'Like'}" class="action-icon" />
                                    ${postStateData.isLiked ? 'Liked' : 'Like'}
                                    <span class="like-count">${postStateData.likes > 0 ? postStateData.likes : ''}</span>
                                </div>
                                <div class="post-action comment-button">
                                    <img src="comment.jpg" alt="Comment" class="action-icon" />
                                    Comment
                                </div>
                                <div class="post-action share-button">
                                    <img src="share.jpg" alt="Share" class="action-icon" />
                                    Share
                                    <span class="share-count">${postStateData.shares > 0 ? postStateData.shares : ''}</span>
                                </div>
                                <div class="post-action save-button saved">
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="#42b883">
                                        <path d="M12 0H4C2.9 0 2 0.9 2 2V16L8 12L14 16V2C14 0.9 13.1 0 12 0Z"/>
                                    </svg>
                                    Saved
                                </div>
                            </div>
                            
                            <div class="comments-section">
                                <div class="comment-input-container">
                                    <div class="comment-avatar">D</div>
                                    <input type="text" class="comment-input" placeholder="Write a comment...">
                                    <button class="comment-submit">Post</button>
                                </div>
                                <div class="comment-list">
                                    ${postStateData.comments.map(comment => `
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
            
            // Attach event listeners
            attachEventListeners();
        }

        // Attach event listeners to all interactive elements
        function attachEventListeners() {
            // Like buttons
            document.querySelectorAll('.like-button').forEach(button => {
                button.addEventListener('click', function() {
                    const postId = parseInt(this.closest('.post').getAttribute('data-id'));
                    handleLike(postId);
                });
            });
            
            // Comment submit buttons
            document.querySelectorAll('.comment-submit').forEach(button => {
                button.addEventListener('click', function() {
                    const postId = parseInt(this.closest('.post').getAttribute('data-id'));
                    const commentInput = this.previousElementSibling;
                    handleComment(postId, commentInput.value);
                });
            });
            
            // Comment input enter key
            document.querySelectorAll('.comment-input').forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const postId = parseInt(this.closest('.post').getAttribute('data-id'));
                        handleComment(postId, this.value);
                    }
                });
            });
            
            // Share buttons
            document.querySelectorAll('.share-button').forEach(button => {
                button.addEventListener('click', function() {
                    const postId = parseInt(this.closest('.post').getAttribute('data-id'));
                    handleShare(postId);
                });
            });
            
            // Save buttons
            document.querySelectorAll('.save-button').forEach(button => {
                button.addEventListener('click', function() {
                    this.classList.toggle('saved');
                    
                    if (this.classList.contains('saved')) {
                        this.innerHTML = `
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="#42b883">
                                <path d="M12 0H4C2.9 0 2 0.9 2 2V16L8 12L14 16V2C14 0.9 13.1 0 12 0Z"/>
                            </svg>
                            Saved
                        `;
                    } else {
                        this.innerHTML = `
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="#65676b">
                                <path d="M12 0H4C2.9 0 2 0.9 2 2V16L8 12L14 16V2C14 0.9 13.1 0 12 0Z"/>
                            </svg>
                            Save
                        `;
                    }
                });
            });
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            initializePostState();
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