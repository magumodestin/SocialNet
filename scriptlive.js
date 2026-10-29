    // New functionality for Live Video, Photos/Video, and Feelings/Activity
    
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
          <img src="camera.jpg" alt="Camera">
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
        authorImg: 'profile-pic.jpg',
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
    
    // Photos/Video upload functionality
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
            previewImg.src = 'video-thumbnail.jpg';
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
    
    // Enhanced post creation to handle media and feelings
    function createNewPost() {
      const content = document.getElementById('postTextarea').value.trim();
      const mediaFile = document.getElementById('mediaUploadInput').files[0];
      const feeling = selectedFeeling;
      
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
        authorImg: 'profile-pic.jpg'
      };
      
      // Add media if present
      if (mediaFile) {
        post.media = {
          type: mediaFile.type.split('/')[0],
          src: mediaFile.type.split('/')[0] === 'image' ? 
               URL.createObjectURL(mediaFile) : 'video-thumbnail.jpg'
        };
      }
      
      // Add feeling if present
      if (feeling) {
        post.feeling = feeling;
      }
      
      if (!window.posts) window.posts = [];
      window.posts.unshift(post);
      savePostsToStorage();
      renderPosts();
      
      // Reset form
      document.getElementById('postTextarea').value = '';
      removeMediaPreview();
      document.getElementById('feelingPreview').style.display = 'none';
      selectedFeeling = null;
      
      showTempMessage('Post created successfully!');
    }
    
    // Enhanced renderPosts function to handle different post types
    function renderPosts() {
      const postsContainer = document.getElementById('postsContainer');
      if (!postsContainer || !window.posts) return;
      
      postsContainer.innerHTML = '';
      
      if (window.posts.length === 0) {
        postsContainer.innerHTML = `
          <div class="no-posts" style="text-align: center; padding: 40px; color: #666;">
            <p>No posts yet. Share what's on your mind!</p>
          </div>
        `;
        return;
      }
      
      window.posts.forEach(post => {
        if (post.type === 'live') {
          postsContainer.appendChild(createLivePostElement(post));
        } else {
          postsContainer.appendChild(createPostElement(post));
        }
      });
    }
    
    // Create live video post element
    function createLivePostElement(post) {
      const postElement = document.createElement('div');
      postElement.className = 'post-container';
      postElement.setAttribute('data-post-id', post.id);
      
      postElement.innerHTML = `
        <div class="user-profile">
          <img src="${post.authorImg}" alt="${post.author}">
          <div>
            <p>${post.author} <span class="live-indicator">LIVE</span></p>
            <span>${formatPostDate(post.timestamp)}</span>
          </div>
          <div class="post-actions">
            <button class="post-menu-btn" onclick="togglePostMenu('${post.id}')">⋯</button>
            <div class="post-menu" id="postMenu-${post.id}">
              <button onclick="deletePost('${post.id}')">🗑️Delete Post</button>
            </div>
          </div>
        </div>
        <p class="post-text">${post.title}</p>
        <div class="live-video-post">
          <div class="live-video-thumbnail">
            <img src="live-thumbnail.jpg" alt="Live Video">
            <div class="live-overlay">
              <h4>${post.title}</h4>
              <p>🔴 Live Now</p>
              <button class="watch-live-btn">Watch Live</button>
            </div>
          </div>
        </div>
        <div class="live-viewers">
          <img src="viewers.jpg" alt="Viewers">
          <span>${post.viewers} viewers</span>
        </div>
        <div class="post-stats">
          <span>${post.likes} likes</span>
          <span>${post.comments} comments</span>
          <span>${post.shares} shares</span>
        </div>
        <div class="add-post-links">
          <a href="#" class="${post.liked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
            <img src="${post.liked ? 'liked.png' : 'like.png'}" style="width: 20px; margin-right: 5px;">
            Like
          </a>
          <a href="#" onclick="openCommentsModal('${post.id}')">
            <img src="comment.jpg" style="width: 20px; margin-right: 5px;">
            Comment
          </a>
          <a href="#" onclick="sharePost('${post.id}')">
            <img src="share.jpg" style="width: 20px; margin-right: 5px;">
            Share
          </a>
        </div>
      `;
      
      return postElement;
    }
    
    // Enhanced createPostElement to handle media and feelings
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
      
      let feelingHtml = '';
      if (post.feeling) {
        feelingHtml = `
          <div class="post-feeling">
            <img src="${post.feeling.icon}" alt="${post.feeling.feeling}">
            <span>Feeling ${post.feeling.feeling}</span>
          </div>
        `;
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
        ${feelingHtml}
        ${mediaHtml}
        <div class="post-stats">
          <span>${post.likes} likes</span>
          <span>${post.comments} comments</span>
          <span>${post.shares} shares</span>
        </div>
        <div class="add-post-links">
          <a href="#" class="${post.liked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
            <img src="${post.liked ? 'liked.png' : 'like.png'}" style="width: 20px; margin-right: 5px;">
            Like
          </a>
          <a href="#" onclick="openCommentsModal('${post.id}')">
            <img src="comment.jpg" style="width: 20px; margin-right: 5px;">
            Comment
          </a>
          <a href="#" onclick="sharePost('${post.id}')">
            <img src="share.jpg" style="width: 20px; margin-right: 5px;">
            Share
          </a>
        </div>
      `;
      
      return postElement;
    }
    
    // Utility function to show temporary messages
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
    
    // Initialize the enhanced functionality
    document.addEventListener('DOMContentLoaded', function() {
      // Override the existing post creation function
      const postButton = document.getElementById('postButton');
      if (postButton) {
        postButton.addEventListener('click', createNewPost);
      }
      
      // Initialize posts if not already done
      if (!window.posts) {
        window.posts = JSON.parse(localStorage.getItem('socialNetPosts')) || [];
        renderPosts();
      }
    });