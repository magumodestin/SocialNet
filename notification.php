<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notifications - SocialNet</title>
    <link rel="stylesheet" href="notification.css">
</head>
<body>
    <div class="notification-header">
        <h2>Notifications</h2>
    </div>

    <div class="notification-container">
        <div class="notification-filter">
            <button class="filter-btn active">All</button>
            <button class="filter-btn">Unread</button>
            <button class="filter-btn">Friends</button>
            <button class="filter-btn">Likes</button>
        </div>

        <!-- Friend Request from Browniiey baddie -->
        <div class="notification-item unread">
            <div class="notification-avatar" style="background-color: #ff6b6b;">B</div>
            <div class="notification-content">
                <div class="notification-text">
                    <span class="notification-user">Browniiey baddie</span> started following you.
                </div>
                <div class="notification-time">Just now</div>
                <div class="notification-actions">
                    <button class="action-btn accept-btn">Confirm</button>
                    <button class="action-btn delete-btn">Delete</button>
                </div>
            </div>
            <span class="notification-badge"></span>
        </div>

        <!-- Like Notification from venessa -->
        <div class="notification-item unread">
            <div class="notification-avatar" style="background-color: #4ecdc4;">V</div>
            <div class="notification-content">
                <div class="notification-text">
                    <span class="notification-user">venessa</span> liked your post: "Beautiful sunset at the beach! 🌅"
                </div>
                <div class="notification-time">15 minutes ago</div>
                <div class="notification-actions">
                    <button class="action-btn accept-btn">View Post</button>
                </div>
            </div>
            <span class="notification-badge"></span>
        </div>

        <!-- Comment Notification from Trust -->
        <div class="notification-item unread">
            <div class="notification-avatar" style="background-color: #45b7d1;">T</div>
            <div class="notification-content">
                <div class="notification-text">
                    <span class="notification-user">Trust</span> commented on your photo: "This looks amazing! 😍"
                </div>
                <div class="notification-time">1 hour ago</div>
                <div class="notification-actions">
                    <button class="action-btn accept-btn">Reply</button>
                </div>
            </div>
            <span class="notification-badge"></span>
        </div>

        <!-- Share Notification from Destiny -->
        <div class="notification-item">
            <div class="notification-avatar" style="background-color: #96ceb4;">D</div>
            <div class="notification-content">
                <div class="notification-text">
                    <span class="notification-user">Destiny</span> shared your post about web development.
                </div>
                <div class="notification-time">2 hours ago</div>
                <div class="notification-actions">
                    <button class="action-btn accept-btn">View Share</button>
                </div>
            </div>
        </div>

        <!-- Message Notification from Mrr Hectic -->
        <div class="notification-item unread">
            <div class="notification-avatar" style="background-color: #feca57;">M</div>
            <div class="notification-content">
                <div class="notification-text">
                    <span class="notification-user">Mrr Hectic</span> sent you a message: "Hey, when are we meeting for the project?"
                </div>
                <div class="notification-time">3 hours ago</div>
                <div class="notification-actions">
                    <button class="action-btn accept-btn">Reply</button>
                </div>
            </div>
            <span class="notification-badge"></span>
        </div>

        <!-- Group Notification with Browniiey baddie -->
        <div class="notification-item">
            <div class="notification-avatar" style="background-color: #ff9ff3;">B</div>
            <div class="notification-content">
                <div class="notification-text">
                    <span class="notification-user">Browniiey baddie</span> added you to the group "Creative Designers".
                </div>
                <div class="notification-time">Yesterday</div>
                <div class="notification-actions">
                    <button class="action-btn accept-btn">Visit Group</button>
                </div>
            </div>
        </div>

        <!-- Event Notification from venessa -->
        <div class="notification-item">
            <div class="notification-avatar" style="background-color: #54a0ff;">V</div>
            <div class="notification-content">
                <div class="notification-text">
                    <span class="notification-user">venessa</span> invited you to the event "Weekend Coding Session".
                </div>
                <div class="notification-time">2 days ago</div>
                <div class="notification-actions">
                    <button class="action-btn accept-btn">RSVP</button>
                    <button class="action-btn delete-btn">Decline</button>
                </div>
            </div>
        </div>

        <!-- Tag Notification from Trust -->
        <div class="notification-item">
            <div class="notification-avatar" style="background-color: #5f27cd;">T</div>
            <div class="notification-content">
                <div class="notification-text">
                    <span class="notification-user">Trust</span> tagged you in a post: "Check out this awesome design by @You!"
                </div>
                <div class="notification-time">3 days ago</div>
                <div class="notification-actions">
                    <button class="action-btn accept-btn">View Post</button>
                </div>
            </div>
        </div>

        <!-- Birthday Reminder for Destiny -->
        <div class="notification-item">
            <div class="notification-avatar" style="background-color: #00d2d3;">D</div>
            <div class="notification-content">
                <div class="notification-text">
                    It's <span class="notification-user">Destiny</span>'s birthday tomorrow! Don't forget to wish them.
                </div>
                <div class="notification-time">1 week ago</div>
                <div class="notification-actions">
                    <button class="action-btn accept-btn">Send Wish</button>
                </div>
            </div>
        </div>

        <!-- Memory Notification with Mrr Hectic -->
        <div class="notification-item">
            <div class="notification-avatar" style="background-color: #ff9f43;">M</div>
            <div class="notification-content">
                <div class="notification-text">
                    You have a memory with <span class="notification-user">Mrr Hectic</span> from 1 year ago.
                </div>
                <div class="notification-time">1 year ago</div>
                <div class="notification-actions">
                    <button class="action-btn accept-btn">View Memory</button>
                </div>
            </div>
        </div>
    </div>

    <script src="notification.js"></script>
</body>
</html>