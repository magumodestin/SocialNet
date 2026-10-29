    // Sample user data
    const users = [
      {
        id: 1,
        name: "Browniiey baddie",
        profilePic: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        bio: "Digital Creator | Photography Enthusiast",
        followers: 1250,
        following: 356,
        posts: 89,
        isOnline: true
      },
      {
        id: 2,
        name: "venessa",
        profilePic: "Status- 3.jpg",
        bio: "Travel Blogger | Adventure Seeker",
        followers: 890,
        following: 234,
        posts: 45,
        isOnline: false
      },
      {
        id: 3,
        name: "Trust",
        profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        bio: "Software Developer | Tech Enthusiast",
        followers: 567,
        following: 123,
        posts: 23,
        isOnline: true
      },
      {
        id: 4,
        name: "Destiny",
        profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        bio: "Fashion Influencer | Model",
        followers: 2340,
        following: 567,
        posts: 156,
        isOnline: false
      },
      {
        id: 5,
        name: "Mrr Hectic",
        profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        bio: "Music Producer | DJ",
        followers: 1780,
        following: 289,
        posts: 67,
        isOnline: true
      }
    ];

    // Story Data
   // Story Data and functionality (keep your existing story code)
const stories = [
    {
        id: 1,
        userImg: 'profile-pic.jpg',
        userName: 'Dêstîñëë Dèstîñëë',
        media: 'profile-pic.jpg',
        mediaType: 'image',
        storyText: 'post Story',
        timeAgo: 'Just now'
    },
    {
        id: 2,
        userImg: 'member-2.jpg',
        userName: 'Browniiey baddie',
        media: 'status-3.jpg',
        mediaType: 'image',
        storyText: 'Picture Perfect 📷📸',
        timeAgo: '2 hours ago'
    },
    {
        id: 3,
        userImg: 'member-6.jpg',
        userName: 'venessa',
        media: 'status-2.jpg',
        mediaType: 'image',
        storyText: 'Life is Good explore while you can 💫🚀',
        timeAgo: '5 hours ago'
    },
    {
        id: 4,
        userImg: 'member-3.jpg',
        userName: 'Trust',
        media: 'Quavo.mp4',
        mediaType: 'video',
        storyText: 'Have Friends but don\'t trust them',
        timeAgo: '1 day ago'
    },
    {
        id: 5,
        userImg: 'member-1.jpg',
        userName: 'Destiny',
        media: 'member-5.jpg',
        mediaType: 'image',
        storyText: 'Holiday vibes #vacation @sun city',
        timeAgo: '2 days ago'
    },
    {
        id: 6,
        userImg: 'redmoon.jpg',
        userName: 'Mrr Hectic',
        media: 'member-4.jpg',
        mediaType: 'image',
        storyText: 'Exploring new horizons',
        timeAgo: '3 days ago'
    }
];

    // Dark Mode Functionality
    var settingsmenu = document.querySelector(".settings-menu");
    var darkBtn = document.getElementById("dark-btn");

    function settingsMenuToggle() {
      settingsmenu.classList.toggle("settings-menu-height");
    }

    darkBtn.onclick = function() {
      darkBtn.classList.toggle("dark-btn-on");
      document.body.classList.toggle("dark-theme");
      
      if(localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    }

    // Check and apply saved theme on page load
    if(localStorage.getItem("theme") == "light") {
      darkBtn.classList.remove("dark-btn-on");
      document.body.classList.remove("dark-theme");
    } else if(localStorage.getItem("theme") == "dark") {
      darkBtn.classList.add("dark-btn-on");
      document.body.classList.add("dark-theme");
    } else {
      localStorage.setItem("theme", "light");
    }

    // See More Functionality for Sidebar
    document.addEventListener('DOMContentLoaded', function() {
      const seeMoreBtn = document.getElementById('seeMoreBtn');
      const hiddenLinks = document.getElementById('hiddenLinks');
      
      if (seeMoreBtn && hiddenLinks) {
        seeMoreBtn.addEventListener('click', function() {
          hiddenLinks.classList.toggle('expanded');
          
          // Change the text and rotate icon when expanded
          const seeMoreLink = this.querySelector('a');
          if (hiddenLinks.classList.contains('expanded')) {
            this.classList.add('expanded');
            seeMoreLink.innerHTML = '<img src="arrow.jpg" class="see-more-icon" style="width: 25px; margin-right:15px;">See Less';
          } else {
            this.classList.remove('expanded');
            seeMoreLink.innerHTML = '<img src="arrow.jpg" class="see-more-icon" style="width: 25px; margin-right:15px;">See More';
          }
        });
      }
      
      // Initialize like, comment, and share functionality
      initializePostInteractions();
      
      // Add click events to stories
      const storyElements = document.querySelectorAll('.story');
      storyElements.forEach((story, index) => {
        if (story.getAttribute('data-story-id')) {
          story.addEventListener('click', function() {
            const storyId = parseInt(this.getAttribute('data-story-id'));
            openStoryModal(storyId);
          });
        }
      });
    });

    // Search functionality
    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', function(e) {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length === 0) {
        searchResults.style.display = 'none';
        return;
      }
      
      searchTimeout = setTimeout(() => {
        performSearch(query);
      }, 300);
    });

    searchInput.addEventListener('focus', function() {
      if (this.value.trim().length > 0) {
        performSearch(this.value.trim());
      }
    });

    document.addEventListener('click', function(e) {
      if (!searchResults.contains(e.target) && e.target !== searchInput) {
        searchResults.style.display = 'none';
      }
    });

    function performSearch(query) {
      const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      
      displaySearchResults(filteredUsers);
    }

    function displaySearchResults(results) {
      searchResults.innerHTML = '';
      
      if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'search-result-item';
        noResults.innerHTML = '<p style="text-align: center; color: #65676b; margin: 0;">No users found</p>';
        searchResults.appendChild(noResults);
      } else {
        results.forEach(user => {
          const resultItem = document.createElement('div');
          resultItem.className = 'search-result-item';
          resultItem.innerHTML = `
            <img src="${user.profilePic}" alt="${user.name}">
            <div class="search-result-info">
              <p>${user.name}</p>
              <span>${user.isOnline ? 'Online' : 'Offline'}</span>
            </div>
          `;
          
          resultItem.addEventListener('click', function() {
            showUserProfile(user);
            searchResults.style.display = 'none';
            searchInput.value = '';
          });
          
          searchResults.appendChild(resultItem);
        });
      }
      
      searchResults.style.display = 'block';
    }

    function showUserProfile(user) {
      // Create modal if it doesn't exist
      let profileModal = document.getElementById('userProfileModal');
      
      if (!profileModal) {
        profileModal = document.createElement('div');
        profileModal.id = 'userProfileModal';
        profileModal.className = 'user-profile-modal';
        document.body.appendChild(profileModal);
      }
      
      profileModal.innerHTML = `
        <div class="user-profile-content">
          <div class="user-profile-header">
            <img id="modalProfilePic" src="${user.profilePic}" alt="${user.name}">
            <button class="close-profile-modal" onclick="closeUserProfile()">×</button>
          </div>
          <div class="user-profile-info">
            <h3 id="modalUserName">${user.name}</h3>
            <p id="modalUserBio">${user.bio}</p>
            <div class="user-stats">
              <div class="stat-item">
                <div class="stat-number" id="modalFollowers">${user.followers.toLocaleString()}</div>
                <div class="stat-label">Followers</div>
              </div>
              <div class="stat-item">
                <div class="stat-number" id="modalFollowing">${user.following.toLocaleString()}</div>
                <div class="stat-label">Following</div>
              </div>
              <div class="stat-item">
                <div class="stat-number" id="modalPosts">${user.posts.toLocaleString()}</div>
                <div class="stat-label">Posts</div>
              </div>
            </div>
            <div class="profile-actions">
              <button class="profile-btn message-btn">Message</button>
              <button class="profile-btn follow-btn">Follow</button>
            </div>
          </div>
        </div>
      `;
      
      // Add event listeners for buttons
      const messageBtn = profileModal.querySelector('.message-btn');
      const followBtn = profileModal.querySelector('.follow-btn');
      
      messageBtn.onclick = function() {
        alert(`Opening chat with ${user.name}`);
      };
      
      followBtn.onclick = function() {
        const isFollowing = followBtn.textContent === 'Following';
        followBtn.textContent = isFollowing ? 'Follow' : 'Following';
        followBtn.style.background = isFollowing ? '#e4e6eb' : '#1876f2';
        followBtn.style.color = isFollowing ? '#1c1e21' : 'white';
      };
      
      profileModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeUserProfile() {
      const profileModal = document.getElementById('userProfileModal');
      if (profileModal) {
        profileModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
      const profileModal = document.getElementById('userProfileModal');
      if (profileModal && e.target === profileModal) {
        closeUserProfile();
      }
    });

    // Story Upload Functionality
    function openStoryUpload() {
      // Create upload modal if it doesn't exist
      let uploadModal = document.getElementById('storyUploadModal');
      
      if (!uploadModal) {
        uploadModal = document.createElement('div');
        uploadModal.id = 'storyUploadModal';
        uploadModal.className = 'story-upload-modal';
        document.body.appendChild(uploadModal);
      }
      
      uploadModal.innerHTML = `
        <div class="story-upload-content">
          <div class="upload-header">
            <h3>Create Story</h3>
            <button class="close-upload-modal" onclick="closeStoryUpload()">×</button>
          </div>
          
          <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
            <div class="upload-icon">📷</div>
            <div class="upload-text">
              <h4>Add Photos or Videos</h4>
              <p>Click to browse or drag and drop</p>
              <p style="font-size: 12px; margin-top: 5px;">Supports: JPG, PNG, MP4, MOV</p>
            </div>
          </div>
          
          <input type="file" id="fileInput" accept="image/*,video/*" multiple>
          
          <div class="preview-container" id="previewContainer">
            <img id="mediaPreview" alt="Preview">
            <video class="video-preview" id="videoPreview" controls></video>
          </div>
          
          <div class="upload-actions">
            <button class="upload-btn cancel-btn" onclick="closeStoryUpload()">Cancel</button>
            <button class="upload-btn post-btn" id="postStoryBtn" onclick="postStory()" disabled>Post Story</button>
          </div>
        </div>
      `;
      
      // Add event listeners
      setupUploadFunctionality();
      
      uploadModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function setupUploadFunctionality() {
      const fileInput = document.getElementById('fileInput');
      const uploadArea = document.getElementById('uploadArea');
      const previewContainer = document.getElementById('previewContainer');
      const mediaPreview = document.getElementById('mediaPreview');
      const videoPreview = document.getElementById('videoPreview');
      const postBtn = document.getElementById('postStoryBtn');
      
      // File input change
      fileInput.addEventListener('change', function(e) {
        handleFileSelection(e.target.files[0]);
      });
      
      // Drag and drop functionality
      uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
      });
      
      uploadArea.addEventListener('dragleave', function() {
        uploadArea.classList.remove('dragover');
      });
      
      uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          handleFileSelection(files[0]);
        }
      });
      
      function handleFileSelection(file) {
        if (!file) return;
        
        // Check file type
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        const validVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
        
        if (!validImageTypes.includes(file.type) && !validVideoTypes.includes(file.type)) {
          alert('Please select a valid image or video file.');
          return;
        }
        
        // Check file size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
          alert('File size too large. Please select a file smaller than 50MB.');
          return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
          if (validImageTypes.includes(file.type)) {
            // It's an image
            mediaPreview.src = e.target.result;
            mediaPreview.style.display = 'block';
            videoPreview.style.display = 'none';
          } else {
            // It's a video
            videoPreview.src = e.target.result;
            videoPreview.style.display = 'block';
            mediaPreview.style.display = 'none';
          }
          
          previewContainer.style.display = 'block';
          postBtn.disabled = false;
        };
        
        reader.readAsDataURL(file);
      }
    }

    function postStory() {
      const mediaPreview = document.getElementById('mediaPreview');
      const videoPreview = document.getElementById('videoPreview');
      const postBtn = document.getElementById('postStoryBtn');
      
      // Show loading state
      postBtn.innerHTML = 'Posting...';
      postBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        alert('Story posted successfully!');
        closeStoryUpload();
        resetUploadForm();
      }, 1500);
    }

    function resetUploadForm() {
      const fileInput = document.getElementById('fileInput');
      const previewContainer = document.getElementById('previewContainer');
      const mediaPreview = document.getElementById('mediaPreview');
      const videoPreview = document.getElementById('videoPreview');
      const postBtn = document.getElementById('postStoryBtn');
      
      if (fileInput) fileInput.value = '';
      if (previewContainer) previewContainer.style.display = 'none';
      if (mediaPreview) {
        mediaPreview.src = '';
        mediaPreview.style.display = 'none';
      }
      if (videoPreview) {
        videoPreview.src = '';
        videoPreview.style.display = 'none';
      }
      if (postBtn) {
        postBtn.innerHTML = 'Post Story';
        postBtn.disabled = true;
      }
    }

    function closeStoryUpload() {
      const uploadModal = document.getElementById('storyUploadModal');
      if (uploadModal) {
        uploadModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
      const uploadModal = document.getElementById('storyUploadModal');
      if (uploadModal && e.target === uploadModal) {
        closeStoryUpload();
      }
    });

    // Story Modal Functionality
    let currentStoryIndex = 0;
    let progressInterval;
    let currentVideo = null;

    function openStoryModal(storyId) {
      const storyIndex = stories.findIndex(story => story.id === storyId);
      if (storyIndex === -1) return;
      
      currentStoryIndex = storyIndex;
      const story = stories[storyIndex];
      
      // Update modal content
      document.getElementById('modalUserImg').src = story.userImg;
      document.getElementById('modalUserName').textContent = story.userName;
      document.getElementById('modalTimeAgo').textContent = story.timeAgo;
      document.getElementById('modalStoryText').textContent = story.storyText;
      
      // Create progress bars
      createProgressBars();
      
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
        img.alt = story.storyText;
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

    function createProgressBars() {
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
      if (currentStoryIndex < stories.length - 1) {
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
      const story = stories[currentStoryIndex];
      
      document.getElementById('modalUserImg').src = story.userImg;
      document.getElementById('modalUserName').textContent = story.userName;
      document.getElementById('modalTimeAgo').textContent = story.timeAgo;
      document.getElementById('modalStoryText').textContent = story.storyText;
      
      loadStoryMedia(story);
      
      if (story.mediaType === 'image') {
        startProgressAnimation();
      }
    }

    // Close modal when clicking outside content
    document.getElementById('storyModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeStoryModal();
      }
    });

    // Keyboard navigation
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

    // Like, Comment, and Share Functionality
    function initializePostInteractions() {
      // Like functionality
      document.querySelectorAll('.add-post-links a').forEach(link => {
        const img = link.querySelector('img');
        if (img) {
          // Like functionality
          if (img.src.includes('like')) {
            link.addEventListener('click', function(e) {
              e.preventDefault();
              toggleLike(this);
            });
          }
          
          // Comment functionality
          if (img.src.includes('comment')) {
            link.addEventListener('click', function(e) {
              e.preventDefault();
              toggleCommentSection(this);
            });
          }
          
          // Share functionality
          if (img.src.includes('share')) {
            link.addEventListener('click', function(e) {
              e.preventDefault();
              sharePost(this);
            });
          }
        }
      });
    }

    // Like functionality
    function toggleLike(likeElement) {
      const img = likeElement.querySelector('img');
      const currentText = likeElement.innerHTML;
      
      // Extract current like count
      let likeCount = 0;
      const countMatch = currentText.match(/>(\d+)$/);
      if (countMatch) {
        likeCount = parseInt(countMatch[1]);
      }
      
      // Check if already liked (has liked.png)
      if (img.src.includes('liked.png')) {
        // Unlike - change back to like.jpg and decrease count
        img.src = 'liked.png';
        likeCount = Math.max(0, likeCount - 1);
        likeElement.innerHTML = `<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzYyNjI2MiI+PHBhdGggZD0iTTEyIDIxLjM1bC0xLjQ1LTEuMzJDNS40IDE1LjM2IDIgMTIuMjggMiA4LjUgMiA1LjQyIDQuNDIgMyA3LjUgM2MxLjc0IDAgMy40MS44MSA0LjUgMi4wOUMxMy4wOSAzLjgxIDE0Ljc2IDMgMTYuNSAzIDE5LjU4IDMgMjIgNS40MiAyMiA4LjVjMCAzLjc4LTMuNCA2Ljg2LTguNTUgMTEuNTRMMTIgMjEuMzV6Ii8+PC9zdmc+">${likeCount > 0 ? likeCount : ''}`;
        likeElement.classList.remove('liked');
      } else {
        // Like - change to liked.png and increase count
        img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmMDAwMCI+PHBhdGggZD0iTTEyIDIxLjM1bC0xLjQ1LTEuMzJDNS40IDE1LjM2IDIgMTIuMjggMiA4LjUgMiA1LjQyIDQuNDIgMyA3LjUgM2MxLjc0IDAgMy40MS44MSA0LjUgMi4wOUMxMy4wOSAzLjgxIDE0Ljc2IDMgMTYuNSAzIDE5LjU4IDMgMjIgNS40MiAyMiA4LjVjMCAzLjc4LTMuNCA2Ljg2LTguNTUgMTEuNTRMMTIgMjEuMzV6Ii8+PC9zdmc+';
        likeCount++;
        likeElement.innerHTML = `<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmMDAwMCI+PHBhdGggZD0iTTEyIDIxLjM1bC0xLjQ1LTEuMzJDNS40IDE1LjM2IDIgMTIuMjggMiA4LjUgMiA1LjQyIDQuNDIgMyA3LjUgM2MxLjc0IDAgMy40MS44MSA0LjUgMi4wOUMxMy4wOSAzLjgxIDE0Ljc2IDMgMTYuNSAzIDE5LjU4IDMgMjIgNS40MiAyMiA4LjVjMCAzLjc4LTMuNCA2Ljg2LTguNTUgMTEuNTRMMTIgMjEuMzV6Ii8+PC9zdmc+">${likeCount}`;
        likeElement.classList.add('liked');
      }
      
      // Update the text content
      if (likeCount === 0) {
        likeElement.innerHTML = `<img src="${img.src}">`;
      } else {
        likeElement.innerHTML = `<img src="${img.src}">${likeCount}`;
      }
    }

    // Comment functionality
    function toggleCommentSection(commentElement) {
      const postContainer = commentElement.closest('.post-container');
      let commentSection = postContainer.querySelector('.comment-section');
      
      if (!commentSection) {
        // Create comment section if it doesn't exist
        commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        commentSection.style.cssText = `
          margin-top: 15px;
          padding: 15px;
          background: #f0f2f5;
          border-radius: 8px;
          border: 1px solid #dddfe2;
        `;
        commentSection.innerHTML = `
          <div class="comment-input-container" style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="User" style="width: 32px; height: 32px; border-radius: 50%;">
            <input type="text" placeholder="Write a comment..." class="comment-input" style="flex: 1; padding: 8px 12px; border: 1px solid #dddfe2; border-radius: 20px; outline: none;">
            <button class="comment-btn" style="padding: 8px 16px; background: #1876f2; color: white; border: none; border-radius: 6px; cursor: pointer;">Post</button>
          </div>
          <div class="comments-list" style="max-height: 200px; overflow-y: auto;"></div>
        `;
        
        // Insert after the post interactions
        const postInteractions = postContainer.querySelector('.add-post-links');
        postInteractions.parentNode.insertBefore(commentSection, postInteractions.nextSibling);
        
        // Add event listener for comment button
        const commentBtn = commentSection.querySelector('.comment-btn');
        const commentInput = commentSection.querySelector('.comment-input');
        
        commentBtn.addEventListener('click', function() {
          addComment(commentSection, commentInput.value);
          commentInput.value = '';
        });
        
        commentInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            addComment(commentSection, commentInput.value);
            commentInput.value = '';
          }
        });
        
        // Update comment count
        updateCommentCount(postContainer, 0);
      }
      
      // Toggle comment section visibility
      commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'block';
      
      // Focus on input when opening
      if (commentSection.style.display === 'block') {
        commentSection.querySelector('.comment-input').focus();
      }
    }

    function addComment(commentSection, commentText) {
      if (commentText.trim() === '') return;
      
      const commentsList = commentSection.querySelector('.comments-list');
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';
      commentElement.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 10px;
        padding: 8px;
        background: white;
        border-radius: 8px;
      `;
      
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      
      commentElement.innerHTML = `
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="User" style="width: 32px; height: 32px; border-radius: 50%;">
        <div class="comment-content" style="flex: 1;">
          <p style="margin: 0 0 4px 0; font-weight: bold;">You</p>
          <p style="margin: 0 0 4px 0;">${commentText}</p>
          <span style="font-size: 12px; color: #65676b;">${timeString}</span>
        </div>
      `;
      
      commentsList.appendChild(commentElement);
      
      // Update comment count
      const postContainer = commentSection.closest('.post-container');
      updateCommentCount(postContainer);
    }

    function updateCommentCount(postContainer, specificCount = null) {
      const commentLink = postContainer.querySelector('a[href="#"]:has(img[src*="comment"])');
      const currentText = commentLink.innerHTML;
      
      let commentCount = 0;
      const countMatch = currentText.match(/>(\d+)$/);
      if (countMatch) {
        commentCount = parseInt(countMatch[1]);
      }
      
      if (specificCount !== null) {
        commentCount = specificCount;
      } else {
        commentCount++;
      }
      
      commentLink.innerHTML = `<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzYyNjI2MiI+PHBhdGggZD0iTTIwIDJINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmg0djRsNC00aDhjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTYgOWgtMnYyaC0ydi0yaC0ydi0yaDJWN2gydjJoMnYyeiIvPjwvc3ZnPg==">${commentCount}`;
    }

    // Share functionality
    function sharePost(shareElement) {
      const postContainer = shareElement.closest('.post-container');
      const postText = postContainer.querySelector('.post-text')?.textContent || '';
      const postImage = postContainer.querySelector('.post-img')?.src || '';
      
      // Create share modal
      const shareModal = document.createElement('div');
      shareModal.className = 'share-modal';
      shareModal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        min-width: 300px;
        font-family: Arial, sans-serif;
      `;
      
      shareModal.innerHTML = `
        <h3 style="margin: 0 0 15px 0; color: #1c1e21;">Share Post</h3>
        <p style="margin: 0 0 15px 0; color: #65676b;">Share this post with your friends?</p>
        <div style="margin: 15px 0; padding: 10px; background: #f0f2f5; border-radius: 5px; font-size: 14px; color: #1c1e21;">
          ${postText.substring(0, 100)}${postText.length > 100 ? '...' : ''}
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
          <button class="cancel-share" style="padding: 8px 16px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; color: #1c1e21;">Cancel</button>
          <button class="confirm-share" style="padding: 8px 16px; background: #1876f2; color: white; border: none; border-radius: 4px; cursor: pointer;">Share Now</button>
        </div>
      `;
      
      // Add overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
      `;
      
      document.body.appendChild(overlay);
      document.body.appendChild(shareModal);
      
      // Event listeners for share modal
      shareModal.querySelector('.cancel-share').addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.body.removeChild(shareModal);
      });
      
      shareModal.querySelector('.confirm-share').addEventListener('click', function() {
        // Update share count
        const currentText = shareElement.innerHTML;
        let shareCount = 0;
        
        const countMatch = currentText.match(/>(\d+)$/);
        if (countMatch) {
          shareCount = parseInt(countMatch[1]);
        }
        
        shareCount++;
        shareElement.innerHTML = `<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzYyNjI2MiI+PHBhdGggZD0iTTE4IDE2LjA4Yy0uNzYgMC0xLjQ0LjMtMS45Ni43N0wuOTEgMTEuN2MuMDUtLjIzLjA5LS40Ni4wOS0uN3MtLjA0LS40Ny0uMDktLjdMOS4wNCA3LjE1QzkuNTYgNy42IDEwLjI0IDggMTEgOHMxLjQ0LS4zIDEuOTYtLjc1TDE4LjA4IDEyYy0uMDUuMjMtLjA5LjQ2LS4wOS43cy4wNC40Ny4wOS43bC01LjEyIDMuODVjLS41Mi0uNDUtMS4yLS43NS0xLjk2LS43NXMtMS40NC4zLTEuOTYuNzVMNS45MiAxMi43Yy4wNS4yMy4wOS40Ni4wOS43cy0uMDQuNDctLjA5LjdsNS4xMiAzLjg1Yy41Mi0uNDUgMS4yLS43NSAxLjk2LS43NXoiLz48L3N2Zz4=">${shareCount}`;
        
        // Show success message
        alert('Post shared successfully!');
        
        document.body.removeChild(overlay);
        document.body.removeChild(shareModal);
      });
      
      // Close modal when clicking overlay
      overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.body.removeChild(shareModal);
      });
    }