<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SocialNet</title>
  <link rel="stylesheet" href="stylo.css">
   <link rel="stylesheet" href="styl.css">
</head>
<body>
  <!-- Navigation Bar -->
  <nav>
    <div class="nav-left">
      <h2 style="font-family:'Segoe Script', cursive; font-size:30px; color:#A4B569;">SocialNet</h2>
      <ul>
        <li><a href="notification.php"><img src="notification.gif" alt="Notification"></a></li>
        <li><a href="message.php"><img src="message.gif" alt="Message"></a></li>
        <li><a href="watch.php"><img src="watch.gif" alt="Watch"></a></li>
      </ul>
    </div>
    <div class="nav-right">
      <div class="search-box" style="position: relative;">
        <img src="search.gif">
        <input type="text" id="searchInput" placeholder="Search">
        <div class="search-results" id="searchResults">
          <div class="search-tabs">
            <div class="search-tab active" data-tab="all">All</div>
            <div class="search-tab" data-tab="friends">Friends</div>
            <div class="search-tab" data-tab="pages">Pages</div>
          </div>
          <div class="search-result-section active" id="allResults">
            <!-- All results will appear here -->
          </div>
          <div class="search-result-section" id="friendsResults">
            <!-- Friend results will appear here -->
          </div>
          <div class="search-result-section" id="pagesResults">
            <!-- Page results will appear here -->
          </div>
        </div>
      </div>
      <div class="nav-user-icon online" onclick="settingsMenuTogle()">
        <img src="profile-pic.jpg">
      </div>
    </div>

    <!-- Settings Menu -->
    <div class="settings-menu">
      <div id="dark-btn">
        <span></span>
      </div>
      <div class="settings-menu-inner">
        <div class="user-profile">
          <img src="profile-pic.jpg" alt="Profile Picture">
          <div>
            <p>Dêstîñëë Dèstîñëë</p>
            <a href="#">See Your profile</a>
          </div>
        </div>
        <hr>
        <div class="user-profile feedback-section">
          <img src="feedback.gif" alt="Feedback Icon">
          <div>
            <p>Give Feedback</p>
            <a href="#">Help us to improve new Design of our social media</a>
          </div>
        </div>
        <hr>
        
        <div class="settings-links">
          <img src="settings.gif" class="settings-icon" alt="Settings Icon">
          <a href="settings.html">Settings & Privacy</a>
        </div>
        
        <div class="settings-links">
          <img src="Help.gif" class="settings-icon" alt="Help Icon">
          <a href="#">Help & Support</a>
        </div>
        
        <div class="settings-links">
          <img src="darkmode.gif" class="settings-icon" alt="Dark Mode Icon">
          <a href="#">Display & Accessibility</a>
        </div>
        
        <div class="see-more-container" id="see-more-toggle">
          <div class="see-more-icon">
            <img src="arrow.jpg" alt="Arrow">
          </div>
          <span>See More</span>
        </div>
        
        <div class="hidden-items" id="hidden-items">
          <div class="settings-links">
            <img src="birthday.gif" class="settings-icon" alt="Birthday Icon">
            <a href="#">Birthday</a>
          </div> 
		            <div class="settings-links">
            <img src="flag.png" class="settings-icon" alt="Memories Icon">
            <a href="saved.html">saved</a>
          </div>
		  
          <div class="settings-links">
            <img src="memories.png" class="settings-icon" alt="Memories Icon">
            <a href="memories.html">Memories</a>
          </div>
          
          <div class="settings-links">
            <img src="flag.png" class="settings-icon" alt="Flag Icon">
            <a href="#">pages</a>
          </div>
          
          <div class="settings-links">
            <img src="logout.gif" class="settings-icon" alt="Logout Icon">
            <a href="index.php">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main Container -->
  <div class="container">
    <!-- Main Content -->
    <div class="main-content">
      <!-- Story Gallery -->
      <div class="story-gallery">
        <div class="story story1" onclick="openStoryUpload()">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzE4NzZmMiI+PHBhdGggZD0iTTE5IDEzaC02djZoLTJ2LTZINXYtMmg2VjVoMnY2aDZ2MnoiLz48L3N2Zz4=">
          <p>Post Story</p>
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
      
      <!-- Write Post Container -->
      <div class="write-post-container">
        <div class="user-profile">
          <img src="profile-pic.jpg">
          <div>
            <p>Dêstîñëë Dèstîñëë</p>
            <small><p style="color:gray;">Public</p> <i class="fas fa-caret-down"></i></small>
          </div>
        </div>
        
        <div class="post-input-container">
          <textarea id="postTextarea" rows="3" placeholder="What's on your mind Dêstîñëë Dèstîñëë?"></textarea>
          <div class="add-post-links">
            <a href="#"><img src="video.jpg">Live Video</a>
            <a href="#"><img src="camera.jpg">Photos/video</a>
            <a href="#"><img src="feelings.jpg">Feelings/activity</a>
          </div>
        </div>
        <button id="postButton" style="width: 100%; padding: 10px; background-color: #1877f2; color: white; border: none; border-radius: 5px; margin-top: 10px; cursor: pointer;">Post</button>
      </div>
      
      <!-- Posts Container -->
      <div class="posts-container">
        <!-- Post 1 -->
        <div class="post-container">
          <div class="user-profile">
            <img src="profile-pic.jpg">
            <div>
              <p>Dêstîñëë Dèstîñëë</p>
              <span>Just Now</span>
            </div>
            <a href="#"><i class="fas fa-ellipsi"></i></a>
          </div>
          <p class="post-text">watch YouTube Tutorials to learn Full stack Development @YouTube Channel to watch more videos for Web Design, web Development course, etc. <a href="#">#courseEra</a> <a href="#">#YouTubeChannel</a></p>
          <img src="coursera.jpg" style="width: 50%;height:40%;margin-bottom: 1px;border-radius:4px;" class="post-img">
          <div class="container-post">
            <div class="add-post-links">
              <a href="#"><img src="like.png"></a>
              <a href="#"><img src="comment.jpg"></a>
              <a href="#"><img src="share.jpg"></a>
              <div class="post-profile-icon">
                <img src="profile-pic.jpg" style="width: 40px; height: 40px; border-radius: 50%; text-align:left;" alt="Browniiey">
                <i class="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Post 2 -->
        <div class="post-container">
          <div class="user-profile">
            <img src="member-2.jpg">
            <div>
              <p>Browniiey baddie</p>
              <span>September 10</span>
            </div>
            <a href="#"><i class="fas fa-ellipsi"></i></a>
          </div>
          <p class="post-text">Picture Perfect 📷📸</p>
          <img src="status-3.jpg" style="width: 50%;height:50%;margin-bottom: 1px;border-radius:4px;" class="post-img">
          <div class="container-post">
            <div class="add-post-links">
              <a href="#"><img src="like.png">30</a>
              <a href="#"><img src="comment.jpg">5</a>
              <a href="#"><img src="share.jpg">3</a>
              <div class="post-profile-icon">
                <img src="profile-pic.jpg" style="width: 40px; height: 40px; border-radius: 50%; text-align:left;" alt="Browniiey">
                <i class="fas fa-caret-down"></i>
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
  <img src="post.jpg" style="width: 40%;height:50%;margin-bottom: 1px;border-radius:4px;" class="post-img">
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
  <img src="trust-no-one.jpg" style="width: 50%;height:50%;margin-bottom: 1px;border-radius:4px;" class="post-img">
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
  <img src="suncity.jpg" style="width: 50%;height:50%;margin-bottom: 1px;border-radius:4px;" class="post-img">
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
  <img src="status-1.jpg" style="width: 50%;height:50%;margin-bottom: 1px;border-radius:4px;" class="post-img">
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
      </div>
        <button type="button"style="display: block;
	margin: auto;
	width:30%;
	height:50%;
	cursor:pointer;
	padding: 5px 10px;
	border: 1px solid #0c1c47;
	color:#fff;
	background: #0c1c47;
	border-radius: 4px;">Load More</button>
  
    </div>
    
    <!-- Right Sidebar -->
    <div class="right-sidebar">
      <div class="sidebar-title">
        <h4>Events</h4>
        <a href="#">See All</a>
      </div>

      <div class="event">
        <div class="left-event">
          <h2>18</h2>
          <span>March</span>
        </div>
        <div class="right-event">
          <h4>Dance Party</h4>
          <p>Pretoria Gardens</p>
          <a href="#">More info</a>
        </div>
      </div>

      <div class="event">
        <div class="left-event">
          <h2>22</h2>
          <span>June</span>
        </div>
        <div class="right-event">
          <h4>Web Design Bootcamp (WDB)</h4>
          <p>Pretoria Gardens</p>
          <a href="#">More info</a>
        </div>
      </div>

      <div class="sidebar-title">
        <h4>Advertisement</h4>
        <a href="#">Close</a>
      </div>
      <img src="Advertisment.jpg" class="sidebar-ads" alt="Advertisement">
    </div>
  </div>

  <!-- Edit Post Modal -->
  <div class="modal" id="editPostModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Edit Post</h3>
        <button class="close-btn" onclick="closeEditModal()">&times;</button>
      </div>
      <div class="modal-body">
        <textarea id="editPostTextarea"></textarea>
      </div>
      <div class="modal-footer">
        <button class="cancel-btn" onclick="closeEditModal()">Cancel</button>
        <button class="save-btn" id="saveEditButton">Save</button>
      </div>
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
      </div>
      <div class="modal-footer">
        <p id="modalStoryText"></p>
      </div>
    </div>
  </div>
  
  <!-- Story Upload Modal -->
  <div class="story-upload-modal" id="storyUploadModal">
    <div class="upload-modal-content">
      <div class="upload-modal-header">
        <h3>Create Story</h3>
        <button class="close-upload-modal" onclick="closeStoryUpload()">×</button>
      </div>
      <div class="upload-modal-body">
        <div class="upload-options">
          <div class="upload-option" onclick="openFileUpload('image')">
            <img src="camera.jpg" alt="Photo">
            <p>Photo</p>
          </div>
          <div class="upload-option" onclick="openFileUpload('video')">
            <img src="video.jpg" alt="Video">
            <p>Video</p>
          </div>
        </div>
        <input type="file" id="storyFileInput" accept="image/*,video/*" style="display: none;">
        <div class="story-preview" id="storyPreview">
          <img id="previewImage" src="" alt="Preview" style="display: none;">
          <video id="previewVideo" controls style="display: none;"></video>
          <p id="noPreviewText">Select a photo or video to create your story</p>
        </div>
        <div class="story-caption">
          <textarea id="storyCaption" placeholder="Add a caption..."></textarea>
        </div>
      </div>
      <div class="upload-modal-footer">
        <button class="cancel-btn" onclick="closeStoryUpload()">Cancel</button>
        <button class="post-btn" id="postStoryBtn" onclick="postStory()" disabled>Post Story</button>
      </div>
    </div>
  </div>
  
  <!-- Profile Modal -->
  <div class="profile-modal" id="profileModal">
    <div class="profile-modal-content">
      <div class="profile-modal-header">
        <h3 id="profileModalTitle">Profile</h3>
        <button class="close-profile-modal" onclick="closeProfileModal()">×</button>
      </div>
      <div class="profile-modal-body">
        <div class="profile-info">
          <img id="profileModalImg" src="" alt="Profile">
          <div class="profile-details">
            <h4 id="profileModalName"></h4>
            <p id="profileModalType"></p>
            <div class="profile-actions">
              <button id="profileActionBtn" class="friend-btn" >Add Friend</button>
            </div>
          </div>
        </div>
        <div class="profile-section">
          <h4>About</h4>
          <p id="profileModalAbout"></p>
        </div>
        <div class="profile-section" id="profileModalFriendsSection">
          <h4>Friends</h4>
          <p id="profileModalFriends"></p>
        </div>
        <div class="profile-section" id="profileModalEducationSection">
          <h4>Education</h4>
          <p id="profileModalEducation"></p>
        </div>
        <div class="profile-section" id="profileModalLocationSection">
          <h4>Location</h4>
          <p id="profileModalLocation"></p>
        </div>
      </div>
    </div>
  </div>

  <script src="scripto.js"></script>
</body>
</html>