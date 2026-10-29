<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Video Platform</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f9f9f9;
            color: #000;
            transition: background-color 0.3s, color 0.3s;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        body.dark-mode {
            background-color: #121212;
            color: #ddd;
        }

        .video-container {
            width: 90%;
            max-width: 600px;
            margin: 40px auto;
        }

        .video {
            margin-bottom: 25px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            background-color: white;
            transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;
        }

        body.dark-mode .video {
            background-color: #1e1e1e;
            border-color: #444;
            box-shadow: 0 2px 10px rgba(255, 255, 255, 0.05);
        }

        /* Header: profile pic + username + time below username */
        .video-header {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;
            gap: 12px;
        }

        .video-header img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            flex-shrink: 0;
            object-fit: cover;
            border: 2px solid #e0e0e0;
        }

        body.dark-mode .video-header img {
            border-color: #444;
        }

        /* Container for username + time stacked vertically */
        .user-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            line-height: 1.3;
        }

        .user-info .username {
            font-weight: 600;
            font-size: 16px;
        }

        .user-info .time {
            font-size: 13px;
            color: #666;
            margin-top: 2px;
            transition: color 0.3s;
        }

        body.dark-mode .user-info .time {
            color: #aaa;
        }

        .video-wrapper {
            position: relative;
            width: 100%;
        }

        video {
            width: 100%;
            height: auto;
            border-radius: 8px;
            background-color: #000;
        }

        .video-controls {
            position: absolute;
            bottom: 10px;
            left: 10px;
            right: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .video-wrapper:hover .video-controls {
            opacity: 1;
        }

        .mute-btn {
            background: rgba(0, 0, 0, 0.6);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            font-size: 12px;
        }

        .mute-btn:hover {
            background: rgba(0, 0, 0, 0.8);
        }
.nav-icons {
    display: flex;
    gap: 16px;
}

.nav-icons a {
    color: #65676b;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background-color 0.2s;
}

.dark-mode .nav-icons a {
    color: #b0b3b8;
}

.nav-icons a:hover {
    background-color: #f0f2f5;
}

.dark-mode .nav-icons a:hover {
    background-color: #3a3b3c;
}

.nav-icons a.active {
    color: #1877f2;
    background-color: #e7f3ff;
}

.dark-mode .nav-icons a.active {
    color: #2d88ff;
    background-color: #3a3b3c;
}
        .video-actions {
            display: flex;
            align-items: center;
            margin-top: 15px;
            gap: 25px;
        }

        .video-actions div {
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: transform 0.2s;
            padding: 5px 8px;
            border-radius: 6px;
        }

        .video-actions div:hover {
            background-color: rgba(0, 0, 0, 0.05);
            transform: translateY(-2px);
        }

        body.dark-mode .video-actions div:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }

        .video-actions img {
            width: 22px;
            height: 22px;
            margin-right: 6px;
            filter: invert(0);
            transition: filter 0.3s, transform 0.2s;
        }

        body.dark-mode .video-actions img {
            filter: invert(0.8);
        }

        .video-actions .liked img {
            filter: invert(0.4) sepia(1) saturate(5) hue-rotate(175deg);
        }

        .video-actions .comment-text {
            color: #4CAF50;
        }

        .video-actions .shared {
            color: #2196F3;
        }

        #darkModeToggle {
            position: fixed;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            user-select: none;
            transition: color 0.3s, transform 0.2s;
            color: #333;
            z-index: 1000;
            padding: 8px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.8);
        }

        #darkModeToggle:hover {
            transform: scale(1.1);
        }

        body.dark-mode #darkModeToggle {
            color: #ddd;
            background-color: rgba(30, 30, 30, 0.8);
        }

        /* Comment Section */
        .comments-section {
            margin-top: 15px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease;
        }

        .comments-section.expanded {
            max-height: 300px;
        }

        .comment {
            display: flex;
            margin-bottom: 12px;
            padding: 10px;
            background-color: #f5f5f5;
            border-radius: 8px;
        }

        body.dark-mode .comment {
            background-color: #2a2a2a;
        }

        .comment-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-right: 10px;
            object-fit: cover;
        }

        .comment-content {
            flex: 1;
        }

        .comment-author {
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 4px;
        }

        .comment-text {
            font-size: 14px;
            color: #333;
        }

        body.dark-mode .comment-text {
            color: #ddd;
        }

        .add-comment {
            display: flex;
            margin-top: 10px;
        }

        .add-comment input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 20px;
            margin-right: 8px;
            font-size: 14px;
            background-color: #fff;
            color: #333;
        }

        body.dark-mode .add-comment input {
            background-color: #2a2a2a;
            border-color: #444;
            color: #ddd;
        }

        .add-comment button {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.2s;
        }

        .add-comment button:hover {
            background-color: #45a049;
        }

        /* Share Modal */
        .share-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            justify-content: center;
            align-items: center;
        }

        .share-modal-content {
            background-color: white;
            padding: 25px;
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        body.dark-mode .share-modal-content {
            background-color: #1e1e1e;
            color: #ddd;
        }

        .share-modal h3 {
            margin-bottom: 15px;
            text-align: center;
        }

        .share-options {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
        }

        .share-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            padding: 10px;
            border-radius: 8px;
            transition: background-color 0.2s;
        }

        .share-option:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }

        body.dark-mode .share-option:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }

        .share-option img {
            width: 40px;
            height: 40px;
            margin-bottom: 8px;
        }

        .share-modal-actions {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }

        .share-modal-actions button {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
        }

        .share-modal-actions .cancel {
            background-color: #f5f5f5;
            color: #333;
            margin-right: 10px;
        }

        body.dark-mode .share-modal-actions .cancel {
            background-color: #2a2a2a;
            color: #ddd;
        }

        .share-modal-actions .copy-link {
            background-color: #2196F3;
            color: white;
        }

        /* Like animation */
        @keyframes likeAnimation {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }

        .liked-animation {
            animation: likeAnimation 0.4s ease;
        }

        /* Notification */
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
        }

        .notification.show {
            opacity: 1;
        }

        /* Page header */
        .page-header {
            text-align: center;
            font-family: 'Segoe Script', cursive;
            font-size: 30px;
            color: #A4B569;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        body.dark-mode .page-header {
            color: #C5D182;
        }

        /* Loading indicator */
        .loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 14px;
        }
    </style>
</head>
<body>
              <div class="nav-icons">
                <a href="saved.html" class="active">Saved</a>
                <a href="dashboard.html">Home</a>
                <a href="friends.html">Friends</a>
                <a href="groups.html">Groups</a>
            </div>
    <!-- Dark Mode Toggle Button -->
    <button id="darkModeToggle" aria-label="Toggle dark mode">🌙</button>

    <!-- Page Header -->
    <h2 class="page-header">Following latest videos/reels</h2>

    <!-- Share Modal -->
    <div class="share-modal" id="shareModal">
        <div class="share-modal-content">
            <h3>Share this video</h3>
            <div class="share-options">
                <div class="share-option" data-platform="facebook">
                    <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" />
                    <span>Facebook</span>
                </div>
                <div class="share-option" data-platform="twitter">
                    <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" />
                    <span>Twitter</span>
                </div>
                <div class="share-option" data-platform="whatsapp">
                    <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" />
                    <span>WhatsApp</span>
                </div>
            </div>
            <div class="share-modal-actions">
                <button class="cancel" id="cancelShare">Cancel</button>
                <button class="copy-link" id="copyLink">Copy Link</button>
            </div>
        </div>
    </div>

    <!-- Notification -->
    <div class="notification" id="notification">Link copied to clipboard!</div>

    <div class="video-container">

        <!-- Video 1 -->
        <div class="video">
            <div class="video-header">
                <img src="quavo.jpg" alt="Quavo" />
                <div class="user-info">
                    <span class="username">Quavo</span>
                    <span class="time"><b>Just now</b></span>
                </div>
            </div>
            <div class="video-wrapper">
                <video width="100%" height="300" muted loop playsinline poster="https://placehold.co/600x400/333/fff?text=Quavo+Video">
                    <source src="quavo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div class="video-controls">
                    <button class="mute-btn">Unmute</button>
                </div>
            </div>
            <div class="video-actions">
                <div class="like-btn" data-video="1">
                    <img src="like.png" alt="Like" class="like-icon" />
                    <span class="like-count">0</span>
                </div>
                <div class="comment-btn" data-video="1">
                    <img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt="Comment" />
                    <span class="comment-text">comment</span>
                </div>
                <div class="share-btn" data-video="1">
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126509.png" alt="Share" />
                    <span>share</span>
                </div>
            </div>
            <div class="comments-section" id="comments-1">
                <div class="comment">
                    <img src="https://i.pravatar.cc/150?img=5" alt="User" class="comment-avatar" />
                    <div class="comment-content">
                        <div class="comment-author">User123</div>
                        <div class="comment-text">This is amazing! 🔥</div>
                    </div>
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Add a comment..." class="comment-input" data-video="1" />
                    <button class="post-comment" data-video="1">Post</button>
                </div>
            </div>
        </div>

        <!-- Video 2 -->
        <div class="video">
            <div class="video-header">
                <img src="DJKhaled.jpg" alt="DJ Khaled" />
                <div class="user-info">
                    <span class="username">DJ Khaled</span>
                    <span class="time"><b>20 minutes ago</b></span>
                </div>
            </div>
            <div class="video-wrapper">
                <video width="100%" height="300" muted loop playsinline poster="https://placehold.co/600x400/333/fff?text=DJ+Khaled+Video">
                    <source src="DJKhaled.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div class="video-controls">
                    <button class="mute-btn">Unmute</button>
                </div>
            </div>
            <div class="video-actions">
                <div class="like-btn" data-video="2">
                    <img src="like.png" alt="Like" class="like-icon" />
                    <span class="like-count">50</span>
                </div>
                <div class="comment-btn" data-video="2">
                    <img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt="Comment" />
                    <span class="comment-text">10 comments</span>
                </div>
                <div class="share-btn" data-video="2">
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126509.png" alt="Share" />
                    <span>20 shares</span>
                </div>
            </div>
            <div class="comments-section" id="comments-2">
                <div class="comment">
                    <img src="https://i.pravatar.cc/150?img=6" alt="User" class="comment-avatar" />
                    <div class="comment-content">
                        <div class="comment-author">MusicLover</div>
                        <div class="comment-text">Another one! 🎵</div>
                    </div>
                </div>
                <div class="comment">
                    <img src="https://i.pravatar.cc/150?img=7" alt="User" class="comment-avatar" />
                    <div class="comment-content">
                        <div class="comment-author">Fan123</div>
                        <div class="comment-text">We the best! 🔥</div>
                    </div>
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Add a comment..." class="comment-input" data-video="2" />
                    <button class="post-comment" data-video="2">Post</button>
                </div>
            </div>
        </div>

        <!-- Video 3 -->
        <div class="video">
            <div class="video-header">
                <img src="ChiefBen.png" alt="Chief Ben" />
                <div class="user-info">
                    <span class="username">Chief Ben</span>
                    <span class="time">2 hours ago</span>
                </div>
            </div>
            <div class="video-wrapper">
                <video width="100%" height="300" muted loop playsinline poster="https://placehold.co/600x400/333/fff?text=Chief+Ben+Video">
                    <source src="ChiefBen.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div class="video-controls">
                    <button class="mute-btn">Unmute</button>
                </div>
            </div>
            <div class="video-actions">
                <div class="like-btn" data-video="3">
                    <img src="like.png" alt="Like" class="like-icon" />
                    <span class="like-count">200</span>
                </div>
                <div class="comment-btn" data-video="3">
                    <img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt="Comment" />
                    <span class="comment-text">30 comments</span>
                </div>
                <div class="share-btn" data-video="3">
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126509.png" alt="Share" />
                    <span>40 share</span>
                </div>
            </div>
            <div class="comments-section" id="comments-3">
                <div class="comment">
                    <img src="https://i.pravatar.cc/150?img=8" alt="User" class="comment-avatar" />
                    <div class="comment-content">
                        <div class="comment-author">Viewer456</div>
                        <div class="comment-text">Hilarious! 😂</div>
                    </div>
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Add a comment..." class="comment-input" data-video="3" />
                    <button class="post-comment" data-video="3">Post</button>
                </div>
            </div>
        </div>

        <!-- Video 4 - Adam W -->
        <div class="video">
            <div class="video-header">
                <img src="adamw.png" alt="Adam W" />
                <div class="user-info">
                    <span class="username">Adam W</span>
                    <span class="time">5 hours ago</span>
                </div>
            </div>
            <div class="video-wrapper">
                <video width="100%" height="300" muted loop playsinline poster="https://placehold.co/600x400/333/fff?text=Adam+W+Video">
                    <source src="adamw.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div class="video-controls">
                    <button class="mute-btn">Unmute</button>
                </div>
            </div>
            <div class="video-actions">
                <div class="like-btn" data-video="4">
                    <img src="like.png" alt="Like" class="like-icon" />
                    <span class="like-count">350</span>
                </div>
                <div class="comment-btn" data-video="4">
                    <img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt="Comment" />
                    <span class="comment-text">45 comments</span>
                </div>
                <div class="share-btn" data-video="4">
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126509.png" alt="Share" />
                    <span>60 shares</span>
                </div>
            </div>
            <div class="comments-section" id="comments-4">
                <div class="comment">
                    <img src="https://i.pravatar.cc/150?img=9" alt="User" class="comment-avatar" />
                    <div class="comment-content">
                        <div class="comment-author">TechEnthusiast</div>
                        <div class="comment-text">Great content as always! 👏</div>
                    </div>
                </div>
                <div class="comment">
                    <img src="https://i.pravatar.cc/150?img=10" alt="User" class="comment-avatar" />
                    <div class="comment-content">
                        <div class="comment-author">Fan456</div>
                        <div class="comment-text">Love your videos! 🔥</div>
                    </div>
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Add a comment..." class="comment-input" data-video="4" />
                    <button class="post-comment" data-video="4">Post</button>
                </div>
            </div>
        </div>

        <!-- Video 5 - Anwar Jibawi -->
        <div class="video">
            <div class="video-header">
                <img src="anwarjibawi.png" alt="Anwar Jibawi" />
                <div class="user-info">
                    <span class="username">Anwar Jibawi</span>
                    <span class="time">1 day ago</span>
                </div>
            </div>
            <div class="video-wrapper">
                <video width="100%" height="300" muted loop playsinline poster="https://placehold.co/600x400/333/fff?text=Anwar+Jibawi+Video">
                    <source src="anwarjibawi.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div class="video-controls">
                    <button class="mute-btn">Unmute</button>
                </div>
            </div>
            <div class="video-actions">
                <div class="like-btn" data-video="5">
                    <img src="like.png" alt="Like" class="like-icon" />
                    <span class="like-count">520</span>
                </div>
                <div class="comment-btn" data-video="5">
                    <img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt="Comment" />
                    <span class="comment-text">68 comments</span>
                </div>
                <div class="share-btn" data-video="5">
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126509.png" alt="Share" />
                    <span>85 shares</span>
                </div>
            </div>
            <div class="comments-section" id="comments-5">
                <div class="comment">
                    <img src="https://i.pravatar.cc/150?img=11" alt="User" class="comment-avatar" />
                    <div class="comment-content">
                        <div class="comment-author">ComedyLover</div>
                        <div class="comment-text">This had me in tears! 😂😂</div>
                    </div>
                </div>
                <div class="comment">
                    <img src="https://i.pravatar.cc/150?img=12" alt="User" class="comment-avatar" />
                    <div class="comment-content">
                        <div class="comment-author">Fan789</div>
                        <div class="comment-text">Anwar never disappoints! 🔥</div>
                    </div>
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Add a comment..." class="comment-input" data-video="5" />
                    <button class="post-comment" data-video="5">Post</button>
                </div>
            </div>
        </div>

        <!-- Video 6 - Mr Bean -->
        <div class="video">
            <div class="video-header">
                <img src="mrbean.png" alt="Mr Bean" />
                <div class="user-info">
                    <span class="username">Mr Bean</span>
                    <span class="time">3 days ago</span>
                </div>
            </div>
            <div class="video-wrapper">
                <video width="100%" height="300" muted loop playsinline poster="https://placehold.co/600x400/333/fff?text=Mr+Bean+Video">
                    <source src="mr_bean.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div class="video-controls">
                    <button class="mute-btn">Unmute</button>
                </div>
            </div>
            <div class="video-actions">
                <div class="like-btn" data-video="6">
                    <img src="like.png" alt="Like" class="like-icon" />
                    <span class="like-count">1200</span>
                </div>
                <div class="comment-btn" data-video="6">
                    <img src="comment.jpg" alt="Comment" />
                    <span class="comment-text">150 comments</span>
                </div>
                <div class="share-btn" data-video="6">
                    <img src="share.jpg" alt="Share" />
                    <span>210 shares</span>
                </div>
            </div>
            <div class="comments-section" id="comments-6">
                <div class="comment">
                    <img src="https://i.pravatar.cc/150?img=13" alt="User" class="comment-avatar" />
                    <div class="comment-content">
                        <div class="comment-author">ClassicFan</div>
                        <div class="comment-text">Mr Bean never gets old! 😄</div>
                    </div>
                </div>
                <div class="comment">
                    <img src="https://i.pravatar.cc/150?img=14" alt="User" class="comment-avatar" />
                    <div class="comment-content">
                        <div class="comment-author">NostalgiaLover</div>
                        <div class="comment-text">Childhood memories! ❤️</div>
                    </div>
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Add a comment..." class="comment-input" data-video="6" />
                    <button class="post-comment" data-video="6">Post</button>
                </div>
            </div>
        </div>

    </div>

    <script>
        // Dark mode functionality
        const toggleBtn = document.getElementById('darkModeToggle');
        const body = document.body;

        // Load saved mode from localStorage if exists
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            toggleBtn.textContent = '☀️';
        }

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                toggleBtn.textContent = '☀️';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                toggleBtn.textContent = '🌙';
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // Auto-play videos when they come into view
        const videos = document.querySelectorAll('video');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Play when 50% of the video is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Play the video
                    entry.target.play().catch(e => {
                        console.log('Auto-play prevented:', e);
                    });
                } else {
                    // Pause the video when it's not visible
                    entry.target.pause();
                }
            });
        }, observerOptions);

        // Observe each video
        videos.forEach(video => {
            observer.observe(video);
            
            // Add event listener for mute/unmute buttons
            const muteBtn = video.parentElement.querySelector('.mute-btn');
            if (muteBtn) {
                muteBtn.addEventListener('click', () => {
                    video.muted = !video.muted;
                    muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
                });
            }
        });

        // Like functionality
        document.querySelectorAll('.like-btn').forEach(button => {
            button.addEventListener('click', function() {
                const videoId = this.getAttribute('data-video');
                const likeCount = this.querySelector('.like-count');
                const likeIcon = this.querySelector('.like-icon');
                let count = parseInt(likeCount.textContent);
                
                // Toggle liked state
                if (this.classList.contains('liked')) {
                    this.classList.remove('liked');
                    likeIcon.src = 'like.png';
                    count--;
                    likeCount.textContent = count;
                } else {
                    this.classList.add('liked');
                    likeIcon.src = 'liked.png';
                    this.classList.add('liked-animation');
                    count++;
                    likeCount.textContent = count;
                    
                    // Remove animation class after animation completes
                    setTimeout(() => {
                        this.classList.remove('liked-animation');
                    }, 400);
                }
            });
        });

        // Comment functionality
        document.querySelectorAll('.comment-btn').forEach(button => {
            button.addEventListener('click', function() {
                const videoId = this.getAttribute('data-video');
                const commentsSection = document.getElementById(`comments-${videoId}`);
                
                // Toggle comments section
                commentsSection.classList.toggle('expanded');
                
                // Update comment count text
                const commentCount = commentsSection.querySelectorAll('.comment').length;
                this.querySelector('span').textContent = `${commentCount} comments`;
            });
        });

        // Post comment functionality
        document.querySelectorAll('.post-comment').forEach(button => {
            button.addEventListener('click', function() {
                const videoId = this.getAttribute('data-video');
                const commentInput = document.querySelector(`.comment-input[data-video="${videoId}"]`);
                const commentsSection = document.getElementById(`comments-${videoId}`);
                
                if (commentInput.value.trim() !== '') {
                    // Create new comment
                    const newComment = document.createElement('div');
                    newComment.className = 'comment';
                    newComment.innerHTML = `
                        <img src="profile-pic.jpg" alt="User" class="comment-avatar" />
                        <div class="comment-content">
                            <div class="comment-author">You</div>
                            <div class="comment-text">${commentInput.value}</div>
                        </div>
                    `;
                    
                    // Insert before the add-comment section
                    commentsSection.insertBefore(newComment, commentsSection.querySelector('.add-comment'));
                    
                    // Update comment count
                    const commentBtn = document.querySelector(`.comment-btn[data-video="${videoId}"]`);
                    const commentCount = commentsSection.querySelectorAll('.comment').length;
                    commentBtn.querySelector('span').textContent = `${commentCount} comments`;
                    
                    // Clear input
                    commentInput.value = '';
                }
            });
        });

        // Share functionality
        const shareModal = document.getElementById('shareModal');
        const cancelShare = document.getElementById('cancelShare');
        const copyLinkBtn = document.getElementById('copyLink');
        const notification = document.getElementById('notification');
        let currentVideoId = null;

        document.querySelectorAll('.share-btn').forEach(button => {
            button.addEventListener('click', function() {
                currentVideoId = this.getAttribute('data-video');
                shareModal.style.display = 'flex';
            });
        });

        // Close share modal
        cancelShare.addEventListener('click', () => {
            shareModal.style.display = 'none';
        });

        // Copy link functionality
        copyLinkBtn.addEventListener('click', () => {
            const videoLink = `https://example.com/video/${currentVideoId}`;
            
            // Copy to clipboard
            navigator.clipboard.writeText(videoLink).then(() => {
                // Show notification
                notification.classList.add('show');
                
                // Hide notification after 2 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
                
                // Close modal
                shareModal.style.display = 'none';
            }).catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy link to clipboard. Please try again.');
            });
        });

        // Share to social media
        document.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                const videoLink = `https://example.com/video/${currentVideoId}`;
                let shareUrl = '';
                
                switch(platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoLink)}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoLink)}&text=Check out this video!`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this video: ${videoLink}`)}`;
                        break;
                }
                
                // Open share window
                window.open(shareUrl, '_blank', 'width=600,height=400');
                
                // Close modal
                shareModal.style.display = 'none';
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === shareModal) {
                shareModal.style.display = 'none';
            }
        });
    </script>
</body>
</html>