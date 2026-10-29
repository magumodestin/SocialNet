    // Search functionality
    document.addEventListener('DOMContentLoaded', function() {
      const searchInput = document.getElementById('searchInput');
      const searchResults = document.getElementById('searchResults');
      const usersSection = document.getElementById('users-section');
      const pagesSection = document.getElementById('pages-section');
      const searchTabs = document.querySelectorAll('.search-tab');
      
      // Sample data for users and pages
      const users = [
        {
          id: 1,
          name: "Dalvin Moore",
          avatar: "member-1.jpg",
          bio: "Web Developer",
          education: "University of Technology",
          location: "New York, USA",
          mutualFriends: 5,
          isFriend: true
        },
        {
          id: 2,
          name: "Browniiey baddie",
          avatar: "member-2.jpg",
          bio: "Photographer",
          education: "Arts Institute",
          location: "Los Angeles, USA",
          mutualFriends: 3,
          isFriend: false,
          friendRequestSent: false
        },
        {
          id: 3,
          name: "Thandolwethu Ngubane",
          avatar: "member-3.jpg",
          bio: "Student",
          education: "University of Pretoria",
          location: "Pretoria, South Africa",
          mutualFriends: 12,
          isFriend: true
        },
        {
          id: 4,
          name: "Destiny",
          avatar: "member-1.jpg",
          bio: "Travel Blogger",
          education: "Tourism Management",
          location: "Cape Town, South Africa",
          mutualFriends: 2,
          isFriend: false,
          friendRequestSent: true
        },
        {
          id: 5,
          name: "venessa",
          avatar: "member-6.jpg",
          bio: "Fashion Designer",
          education: "Fashion Institute",
          location: "Milan, Italy",
          mutualFriends: 7,
          isFriend: false,
          friendRequestSent: false
        }
      ];
      
      const pages = [
        {
          id: 1,
          name: "Quavo",
          avatar: "quavo.png",
          bio: "Artist",
          category: "Musician/Band",
          followers: "2.5M",
          isFollowing: false
        },
        {
          id: 2,
          name: "DJ Khaled",
          avatar: "profile-pic.jpg",
          bio: "We The Best Music",
          category: "Musician/Band",
          followers: "10M",
          isFollowing: true
        },
        {
          id: 3,
          name: "Mr Bean",
          avatar: "profile-pic.jpg",
          bio: "Official Mr Bean Page",
          category: "Public Figure",
          followers: "15M",
          isFollowing: false
        },
        {
          id: 4,
          name: "Chief ben",
          avatar: "profile-pic.jpg",
          bio: "Comedian",
          category: "Comedian",
          followers: "1.2M",
          isFollowing: false
        },
        {
          id: 5,
          name: "AdamW",
          avatar: "profile-pic.jpg",
          bio: "Fitness Coach",
          category: "Fitness Trainer",
          followers: "500K",
          isFollowing: true
        },
        {
          id: 6,
          name: "Anwar Jibawi",
          avatar: "profile-pic.jpg",
          bio: "Content Creator",
          category: "Digital Creator",
          followers: "8M",
          isFollowing: false
        }
      ];
      
      // Search tabs functionality
      searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Remove active class from all tabs
          searchTabs.forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Hide all sections
          document.querySelectorAll('.search-result-section').forEach(section => {
            section.classList.remove('active');
          });
          
          // Show the selected section
          const tabName = this.getAttribute('data-tab');
          document.getElementById(`${tabName}-section`).classList.add('active');
          
          // If there's a search query, perform search
          if (searchInput.value.trim()) {
            performSearch(searchInput.value.trim());
          }
        });
      });
      
      // Search input event listeners
      searchInput.addEventListener('focus', function() {
        searchResults.classList.add('active');
        // Show recent searches or default content
        if (!searchInput.value.trim()) {
          showDefaultContent();
        }
      });
      
      searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query) {
          performSearch(query);
        } else {
          showDefaultContent();
        }
      });
      
      // Close search results when clicking outside
      document.addEventListener('click', function(e) {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
          searchResults.classList.remove('active');
        }
      });
      
      function showDefaultContent() {
        const activeTab = document.querySelector('.search-tab.active').getAttribute('data-tab');
        
        if (activeTab === 'users') {
          usersSection.innerHTML = `
            <div class="no-results">
              <p>Search for users by name</p>
            </div>
          `;
        } else {
          pagesSection.innerHTML = `
            <div class="no-results">
              <p>Search for pages by name</p>
            </div>
          `;
        }
      }
      
      function performSearch(query) {
        const activeTab = document.querySelector('.search-tab.active').getAttribute('data-tab');
        const lowercaseQuery = query.toLowerCase();
        
        if (activeTab === 'users') {
          const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(lowercaseQuery)
          );
          
          displayUserResults(filteredUsers);
        } else {
          const filteredPages = pages.filter(page => 
            page.name.toLowerCase().includes(lowercaseQuery)
          );
          
          displayPageResults(filteredPages);
        }
      }
      
      function displayUserResults(users) {
        if (users.length === 0) {
          usersSection.innerHTML = `
            <div class="no-results">
              <p>No users found</p>
            </div>
          `;
          return;
        }
        
        usersSection.innerHTML = '';
        
        users.forEach(user => {
          const userElement = document.createElement('div');
          userElement.className = 'search-result-item';
          userElement.addEventListener('click', function() {
            openProfileModal(user, 'user');
          });
          
          let actionButton;
          if (user.isFriend) {
            actionButton = `<button class="search-action-btn friends-btn">Friends</button>`;
          } else if (user.friendRequestSent) {
            actionButton = `<button class="search-action-btn friend-request-sent">Request Sent</button>`;
          } else {
            actionButton = `<button class="search-action-btn add-friend-btn" onclick="sendFriendRequest(${user.id}, event)">Add Friend</button>`;
          }
          
          userElement.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}">
            <div class="search-result-info">
              <h4>${user.name}</h4>
              <p>${user.bio} • ${user.mutualFriends} mutual friends</p>
            </div>
            ${actionButton}
          `;
          
          usersSection.appendChild(userElement);
        });
      }
      
      function displayPageResults(pages) {
        if (pages.length === 0) {
          pagesSection.innerHTML = `
            <div class="no-results">
              <p>No pages found</p>
            </div>
          `;
          return;
        }
        
        pagesSection.innerHTML = '';
        
        pages.forEach(page => {
          const pageElement = document.createElement('div');
          pageElement.className = 'search-result-item';
          pageElement.addEventListener('click', function() {
            openProfileModal(page, 'page');
          });
          
          let actionButton;
          if (page.isFollowing) {
            actionButton = `<button class="search-action-btn following-btn" onclick="toggleFollow(${page.id}, event)">Following</button>`;
          } else {
            actionButton = `<button class="search-action-btn follow-btn" onclick="toggleFollow(${page.id}, event)">Follow</button>`;
          }
          
          pageElement.innerHTML = `
            <img src="${page.avatar}" alt="${page.name}">
            <div class="search-result-info">
              <h4>${page.name}</h4>
              <p>${page.category} • ${page.followers} followers</p>
            </div>
            ${actionButton}
          `;
          
          pagesSection.appendChild(pageElement);
        });
      }
      
      // Initialize with default content
      showDefaultContent();
    });
    
    // Friend request functionality
    function sendFriendRequest(userId, event) {
      event.stopPropagation();
      
      // In a real app, this would make an API call
      const button = event.target;
      button.textContent = 'Request Sent';
      button.className = 'search-action-btn friend-request-sent';
      button.onclick = null;
      
      // Show notification
      alert('Friend request sent!');
    }
    
    // Follow/unfollow functionality for pages
    function toggleFollow(pageId, event) {
      event.stopPropagation();
      
      const button = event.target;
      if (button.textContent === 'Follow') {
        button.textContent = 'Following';
        button.className = 'search-action-btn following-btn';
        
        // Show notification
        alert('You are now following this page');
      } else {
        button.textContent = 'Follow';
        button.className = 'search-action-btn follow-btn';
        
        // Show notification
        alert('You have unfollowed this page');
      }
    }
    
    // Profile modal functionality
    function openProfileModal(profile, type) {
      const modal = document.getElementById('profileModal');
      const header = document.getElementById('profileModalHeader');
      const avatar = document.getElementById('profileModalAvatar');
      const name = document.getElementById('profileModalName');
      const bio = document.getElementById('profileModalBio');
      const details = document.getElementById('profileModalDetails');
      const actions = document.getElementById('profileModalActions');
      
      // Set profile information
      avatar.src = profile.avatar;
      name.textContent = profile.name;
      bio.textContent = profile.bio;
      
      // Set header background (in a real app, this would be a cover photo)
      header.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${profile.avatar})`;
      
      // Set details based on profile type
      details.innerHTML = '';
      if (type === 'user') {
        details.innerHTML = `
          <div class="profile-detail-item">
            <i class="fas fa-graduation-cap profile-detail-icon"></i>
            <span>${profile.education}</span>
          </div>
          <div class="profile-detail-item">
            <i class="fas fa-map-marker-alt profile-detail-icon"></i>
            <span>${profile.location}</span>
          </div>
          <div class="profile-detail-item">
            <i class="fas fa-users profile-detail-icon"></i>
            <span>${profile.mutualFriends} mutual friends</span>
          </div>
        `;
        
        // Set action buttons for users
        actions.innerHTML = '';
        if (profile.isFriend) {
          actions.innerHTML = `
            <button class="profile-action-btn message-btn">Message</button>
            <button class="profile-action-btn friends-btn">Friends</button>
          `;
        } else if (profile.friendRequestSent) {
          actions.innerHTML = `
            <button class="profile-action-btn message-btn">Message</button>
            <button class="profile-action-btn friend-request-sent">Request Sent</button>
          `;
        } else {
          actions.innerHTML = `
            <button class="profile-action-btn message-btn">Message</button>
            <button class="profile-action-btn add-friend-btn" onclick="sendFriendRequest(${profile.id})">Add Friend</button>
          `;
        }
      } else {
        // For pages
        details.innerHTML = `
          <div class="profile-detail-item">
            <i class="fas fa-tag profile-detail-icon"></i>
            <span>${profile.category}</span>
          </div>
          <div class="profile-detail-item">
            <i class="fas fa-users profile-detail-icon"></i>
            <span>${profile.followers} followers</span>
          </div>
        `;
        
        // Set action buttons for pages
        actions.innerHTML = '';
        if (profile.isFollowing) {
          actions.innerHTML = `
            <button class="profile-action-btn message-btn">Message</button>
            <button class="profile-action-btn following-btn" onclick="toggleFollow(${profile.id})">Following</button>
          `;
        } else {
          actions.innerHTML = `
            <button class="profile-action-btn message-btn">Message</button>
            <button class="profile-action-btn follow-btn" onclick="toggleFollow(${profile.id})">Follow</button>
          `;
        }
      }
      
      // Show the modal
      modal.classList.add('active');
    }
    
    function closeProfileModal() {
      const modal = document.getElementById('profileModal');
      modal.classList.remove('active');
    }