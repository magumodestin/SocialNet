<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SocialNet</title>
  <link rel="stylesheet" href="stylo.css">

</head>
<body>
    
    <nav>
	<div class="nav-left">
	<h2 style="font-family:'Segoe Script', cursive; font-size:30px; color:green;">SocialNet</h2>
<ul>
  <li><a href="notification.php"><img src="notification.gif" alt="Notification"></a></li>
  <li><a href="message.php"><img src="message.gif" alt="Message"></a></li>
  <li><a href="watch.php"><img src="watch.gif" alt="Watch"></a></li>
</ul>

	</div>
	<div class="nav-right">
	<div class ="search-box">
	<img src="search.gif">
	<input type="text" placeholder="Search">
	</div>
	</div>
	<div class="nav-user-icon online" onclick="settingsMenuTogle()">
	<img src="profile-pic.jpg">
	</div>
	<!----------settings-menu-------------->
	<div class="settings-menu">
	
	<div id="dark-btn">
	<span></span>
	</div>
	<div class="settings-menu-inner" >
	 <div class="user-profile">
   <img src="profile-pic.jpg">
 <div>
  <p> Dêstîñëë Dèstîñëë</p>
  <a href="#">See Your profile</a>
  </div>
      </div>
	  <hr>
	   <div class="user-profile" style="
	   font-size:12px;
	color:#1876f2;
	text-decoration: none;">
   <img src="feedback.gif">
 <div>
  <p> Give Feedback</p>
  <br>
  </br>
  <a href="#">Help us to improve new Design of our social media</a>
  </div>
      </div>
	  <hr>
	  
	  
	  <div class="settings-links">
	    <img src="settings.gif" class="settings-icon">
		<a href="#">Settings & Privacy <img src="arrow.jpg"
		width="10px"></a>
	  </div>
	  
	    <div class="settings-links">
	    <img src="Help.gif" class="settings-icon">
		<a href="#">Help & Support<img src="arrow.jpg"
		width="10"></a>
	  </div>
	  
	    <div class="settings-links">
	    <img src="darkmode.gif" class="settings-icon">
		<a href="#">Display & accessibility <img src="arrow.jpg"
		width="10"></a>
	  </div>
	  
	    <div class="settings-links">
	    <img src="logout.gif" class="settings-icon">
		<a href="index.php">Logout<img src="arrow.jpg"
		width="10"></a>
	  </div>
	</div>
	</div>
	
	</nav>
	
  <div class="container">
  <!-- left-sidebar-->
  <div class="left-sidebar">
  <div class="imp-links">
  <a href="dashboard.php"><img src="home.gif">Home</a>
  <a href="friends.php"><img src="friends.gif">Friends</a>
  <a href="groups.php"><img src="group.gif">Groups</a>
  <a href="marketplace.php"><img src="marketplace.gif">Marketplace</a>
  <a href="watch.php"><img src="watch.gif">Watch</a>
  
  <!-- See More link with functionality -->
  <div class="see-more" id="seeMoreBtn">
    <a>
      <img src="arrow.jpg" class="see-more-icon" style="width: 25px; margin-right:15px;">See More
    </a>
  </div>
  
  <!-- Hidden links that will appear when "See More" is clicked -->
  <div class="hidden-links" id="hiddenLinks">
    <a href="birthdays.php"><img src="birthday.gif">Birthdays</a>
    <a href="pages.php"><img src="flag.png">Pages</a>

    <a href="memories.php"><img src="memories.png">Memories</a>
    <a href="saved.php"><img src="save.gif">Saved</a>
  </div>
  </div>
  
  <div class="shortcut-links">
   <p> Your shortcuts</p>
   <a href="#"><img src="web_developer.jpg">Web Developers</a>
    <a href="#"><img src="shortcut-2.jpg">front-End Developer</a>
	 <a href="#"><img src="webdesign.jpg">Web Design course</a>
	  <a href="#"><img src="fullstack.jpg">Full stack Development </a>
	  </div>
	  </div>
	  
    <!-- main-content-->
  <div class="main-content">
  
  <div class="story-gallery">
  <div class="story story1" data-story-id="1">
  <img src="upload.jpg">
  <p>post Story</p>
  </div>
    <div class="story story2" data-story-id="2">
  <img src="member-2.jpg">
  <p>Browniiey baddie</p>
  </div>
    <div class="story story3" data-story-id="3">
  <img src="member-6.jpg">
  <p>venessa</p>
  </div>
    <div class="story story4" data-story-id="4">
  <img src="member-3.jpg">
  <p>Trust</p>
  </div>
    <div class="story story5" data-story-id="5">
  <img src="member-1.jpg">
  <p>Destiny</p>
  </div>
    <div class="story story6" data-story-id="6">
  <img src="redmoon.jpg">
  <p>Mrr Hectic</p>
  </div>
  </div>
  
  
    <div class="write-post-contaier">
  <div class="user-profile">
    <img src="profile-pic.jpg">
 <div>
  <p> Dêstîñëë Dèstîñëë</p>
  <small> <p style="color:gray;">Public </p> <i class="fas fa-caret-down"></i></small>
  </div>
      </div>
	 
	  <div class="post-input-container">
	  <div class="post-row">
	    <div class="post-container">
    <div class="user-profile">
    <img src="profile-pic.jpg">
 <div>
  <p> Dêstîñëë Dèstîñëë</p>
  <span> june 24 2025, 13:40</span>
  </div>
  <a href="#"><i class="fas fa-ellipsi"></i></a>
      </div>
	  <textarea rows="3" placeholder="What's on your mind Dêstîñëë Dèstîñëë?"></textarea>
	  <div class="add-post-links">
	  <a href="#"><img src="video.jpg">Live Video</a>
	  <a href="#"><img src="camera.jpg">Photos/video</a>
	  <a href="#"><img src="feelings.jpg">Feelings/activity</a>
	  </div>
	  
  
  </div>

	    <div class="post-container">
    <div class="user-profile">
    <img src="profile-pic.jpg">
 <div>
  <p> Dêstîñëë Dèstîñëë</p>
  <span> Just Now</span>
  </div>
  <a href="#"><i class="fas fa-ellipsi"></i></a>
      </div>

  
	  <p class="post-text">watch YouTube Tutorials to learn Full stack Development @YouTube Channel to watch more videos for Web Design, web Development course, etc. <a href="#"> #courseEra</a>
	  <a href="#"> #YouTubeChannel</a></p>
  <img src="coursera.jpg" style=" width: 100%;height:70%;margin-bottom: 1px;border-radius:4px;" class="post-img">
  	  <div class="contaier-post">
	  <div class="add-post-links">
	  <a href="#"><img src="like.png"></a>
	  <a href="#"><img src="comment.jpg"></a>
	  <a href="#"><img src="share.jpg"></a>
	
	  
<div class="post-profile-icon">
  <img src="profile-pic.jpg"  <img src="profile-pic.jpg" style="width: 40px; height: 40px; border-radius: 50%; text-align:left;"alt="Browniiey"><i class="fas fa-caret-down"></i>  <i class="fas fa-caret-down"></i> 
 
  </div>
  </div>
  </div> 
  </div>
  	    <div class="post-container">
    <div class="user-profile">
    <img src="member-2.jpg">
 <div>
  <p> Browniiey baddie</p>
  <span> September 10</span>
  </div>
  <a href="#"><i class="fas fa-ellipsi"></i></a>
      </div>

  
	  <p class="post-text">
	    Picture Perfect 📷📸 <p style="color:blue"></p>
  <img src="status-3.jpg" style="width: 100%;height:70%;margin-bottom: 1px;border-radius:4px;" class="post-img">
  	  <div class="contaier-post">
	  <div class="add-post-links">
	  <a href="#"><img src="like.png">30</a>
	  <a href="#"><img src="comment.jpg">5</a>
	  <a href="#"><img src="share.jpg">3</a>
	  <div class="post-profile-icon">
  <img src="profile-pic.jpg" style="width: 40px; height: 40px; border-radius: 50%; text-align:left;"alt="Browniiey"><i class="fas fa-caret-down"></i>  <i class="fas fa-caret-down"></i> 
 
  </div>
	  </div>
</div>
 
  </div>
   <div class="post-container">
    <div class="user-profile">
    <img src="member-1.jpg">
 <div>
  <p> Dalvin Moore</p>
  <span> September 15</span>
  </div>
  <a href="#"><i class="fas fa-ellipsi"></i></a>
      </div>

  
	  <p class="post-text">
	   Facts👌🤞
	  </p>
  <img src="post.jpg" style="width: 49%;height:18%;margin-bottom: 1px;border-radius:4px;" class="post-img">
  	  <div class="contaier-post">
	  <div class="add-post-links">
	  <a href="#"><img src="like.png">18</a>
	  <a href="#"><img src="comment.jpg">1</a>
	  <a href="#"><img src="share.jpg">2</a>
	  <div class="post-profile-icon">
  <img src="profile-pic.jpg" style="width: 40px; height: 40px; border-radius: 50%; text-align:left;"alt="Browniiey"><i class="fas fa-caret-down"></i>  <i class="fas fa-caret-down"></i> 
 
  </div>
	  </div>
</div>
 
  </div>
   <div class="post-container">
    <div class="user-profile">
    <img src="member-3.jpg">
 <div>
  <p> Thandolwethu Ngubane</p>
  <span> September 01</span>
  </div>
  <a href="#"><i class="fas fa-ellipsi"></i></a>
      </div>

  
	  <p class="post-text">
	   have Friends but don't trust them <p style="color:blue">
	  </p>
  <img src="trust-no-one.jpg" style="width: 100%;height:70%;margin-bottom: 1px;border-radius:4px;" class="post-img">
  	  <div class="contaier-post">
	  <div class="add-post-links">
	  <a href="#"><img src="like.png">120</a>
	  <a href="#"><img src="comment.jpg">45</a>
	  <a href="#"><img src="share.jpg">20</a>
	  <div class="post-profile-icon">
  <img src="profile-pic.jpg" style="width: 40px; height: 40px; border-radius: 50%; text-align:left;"alt="Browniiey"><i class="fas fa-caret-down"></i>  <i class="fas fa-caret-down"></i> 
 
  </div>
	  </div>
</div>
 
  </div>
  
   <div class="post-container">
    <div class="user-profile">
    <img src="member-1.jpg">
 <div>
  <p> dest iny</p>
  <span> August 30</span>
  </div>
  <a href="#"><i class="fas fa-ellipsi"></i></a>
      </div>

  
	  <p class="post-text">
	   holiday vibes <p style="color:blue">#vacation holiday</p> <p style="color:blue">@sun city
	  </p>
  <img src="suncity.jpg" style="width: 100%;height:70%;margin-bottom: 1px;border-radius:4px;" class="post-img">
  	  <div class="contaier-post">
	  <div class="add-post-links">
	  <a href="#"><img src="like.png">10</a>
	  <a href="#"><img src="comment.jpg">45</a>
	  <a href="#"><img src="share.jpg">20</a>
	  <div class="post-profile-icon">
  <img src="profile-pic.jpg" style="width: 40px; height: 40px; border-radius: 50%; text-align:left;"alt="Browniiey"><i class="fas fa-caret-down"></i>  <i class="fas fa-caret-down"></i> 
 
  </div>
	  </div>
</div>
 
  </div>
   <div class="post-container">
    <div class="user-profile">
    <img src="member-6.jpg">
 <div>
  <p> venessa</p>
  <span> August 30</span>
  </div>
  <a href="#"><i class="fas fa-ellipsi"></i></a>
      </div>

  
	  <p class="post-text">
	   💫💫Life is Good explore while you can 💫🚀<p style="color:blue">#LifeJourney</p> <p style="color:blue">
	  </p>
  <img src="status-1.jpg" style="width: 100%;height:70%;margin-bottom: 1px;border-radius:4px;" class="post-img">
  	  <div class="contaier-post">
	  <div class="add-post-links">
	  <a href="#"><img src="like.png">120</a>
	  <a href="#"><img src="comment.jpg">45</a>
	  <a href="#"><img src="share.jpg">20</a>
	  <div class="post-profile-icon">
  <img src="profile-pic.jpg" style="width: 40px; height: 40px; border-radius: 50%; text-align:left;"alt="Browniiey"><i class="fas fa-caret-down"></i>  <i class="fas fa-caret-down"></i> 
 
  </div>
	  </div>
</div>
 
  </div>
  
  </div></div> </div>
  <button type="button"style="	display: block;
	margin: auto;
	cursor:pointer;
	padding: 5px 10px;
	border: 1px solid #0c1c47;
	color:#fff;
	background: #0c1c47;
	border-radius: 4px;">Load More</button>
  </div>
    <!-- right-sidebar-->
 <div class="right-sidebar">
  
  <div class="sidebar-title">
  <h4>Events</h4>
  <a href="#">See All</a>
  </div>
  
  <div class="event">
    <div class="left-event">
	<h2> 18</h3>
	<span> March</span>
	</div>
	<div class="right-event">
	<h4>Dance Party</h4>
	<p>Pretoria Garderns</p>
	<a href="#">More info</a>
 </div>
 </div>
 
   <div class="event">
    <div class="left-event">
	<h2> 22</h3>
	<span> june</span>
	</div>
	<div class="right-event">
	<h4>Web Design Bootcamp (WDB)</h4>
	<p>Pretoria Garderns</p>
	<a href="#">More info</a>
 </div>
 </div>
  <div class="sidebar-title">
    <h4>Advertisnment</h4>
	<a href="#">Close</a> 
 </div>
   <img src="Advertisment.jpg" class="sidebar-ads">
   

   </div>  
 </div>
 
 <!-- Story Modal -->
<div class="story-modal" id="storyModal">
  <div class="modal-content">
    <div class="story-progress" id="storyProgress"></div>
    <div class="modal-header">
      <img id="modalUserImg" src="" alt="User">
      <div class="user-info">
        <p id="modalUserName"></p>
        <span id="modalTimeAgo"></span>
      </div>
      <button class="close-modal" onclick="closeStoryModal()">×</button>
    </div>
    <div class="modal-body" id="modalStoryBody">
      <!-- Story content will be inserted here -->
    </div>
    <div class="modal-footer">
      <p id="modalStoryText"></p>
    </div>
  </div>
</div>

<script src="scripto.js"></script>
<script>
// Story Data
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

// Add click events to stories
document.addEventListener('DOMContentLoaded', function() {
    const storyElements = document.querySelectorAll('.story');
    storyElements.forEach((story, index) => {
        story.addEventListener('click', function() {
            const storyId = parseInt(this.getAttribute('data-story-id'));
            openStoryModal(storyId);
        });
    });
});
</script>
 </body>
 </html>