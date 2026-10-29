<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SocialNet Help & Support</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        :root {
            --bg-color: #fafafa;
            --text-color: #262626;
            --card-bg: white;
            --border-color: #dbdbdb;
            --secondary-text: #8e8e8e;
            --primary-color: #0095f6;
            --shadow: 0 1px 3px rgba(0,0,0,0.1);
            --hover-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .dark-mode {
            --bg-color: #121212;
            --text-color: #f5f5f5;
            --card-bg: #1e1e1e;
            --border-color: #333333;
            --secondary-text: #a8a8a8;
            --primary-color: #0095f6;
            --shadow: 0 1px 3px rgba(0,0,0,0.3);
            --hover-shadow: 0 4px 8px rgba(0,0,0,0.4);
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            transition: background-color 0.3s, color 0.3s;
        }

        .container {
            max-width: 935px;
            margin: 0 auto;
            padding: 30px 20px;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0 30px;
            border-bottom: 1px solid var(--border-color);
        }

        .logo {
            font-size: 22px;
            font-weight: 600;
            color: var(--text-color);
        }

        .nav-links {
            display: flex;
            gap: 20px;
            align-items: center;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--text-color);
            font-size: 14px;
            font-weight: 500;
        }

        .theme-toggle {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            transition: background-color 0.2s;
        }

        .theme-toggle:hover {
            background-color: rgba(0,0,0,0.05);
        }

        .dark-mode .theme-toggle:hover {
            background-color: rgba(255,255,255,0.1);
        }

        .search-container {
            margin: 30px 0;
            position: relative;
        }

        .search-box {
            width: 100%;
            padding: 12px 20px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background-color: var(--bg-color);
            color: var(--text-color);
            font-size: 14px;
            padding-left: 40px;
            transition: border-color 0.3s, background-color 0.3s;
        }

        .search-box:focus {
            outline: none;
            border-color: var(--primary-color);
        }

        .search-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--secondary-text);
        }

        .help-categories {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .category-card {
            background-color: var(--card-bg);
            border-radius: 8px;
            padding: 20px;
            box-shadow: var(--shadow);
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
        }

        .category-card:hover {
            transform: translateY(-3px);
            box-shadow: var(--hover-shadow);
        }

        .category-icon {
            font-size: 24px;
            margin-bottom: 10px;
            color: var(--primary-color);
        }

        .category-title {
            font-weight: 600;
            margin-bottom: 8px;
        }

        .category-desc {
            font-size: 14px;
            color: var(--secondary-text);
        }

        .popular-topics {
            margin-top: 40px;
        }

        .section-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .topics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 15px;
        }

        .topic-item {
            background-color: var(--card-bg);
            border-radius: 8px;
            padding: 15px;
            box-shadow: var(--shadow);
            cursor: pointer;
            transition: all 0.2s;
        }

        .topic-item:hover {
            background-color: var(--bg-color);
        }

        .topic-title {
            font-weight: 500;
            margin-bottom: 5px;
        }

        .topic-desc {
            font-size: 13px;
            color: var(--secondary-text);
        }

        .search-results {
            display: none;
            margin-top: 20px;
        }

        .result-item {
            background-color: var(--card-bg);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            box-shadow: var(--shadow);
            cursor: pointer;
        }

        .result-title {
            font-weight: 500;
            margin-bottom: 5px;
        }

        .result-desc {
            font-size: 14px;
            color: var(--secondary-text);
        }

        .no-results {
            text-align: center;
            padding: 30px;
            color: var(--secondary-text);
        }

        footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
            font-size: 12px;
            color: var(--secondary-text);
            text-align: center;
        }

        /* Toggle Switch Styles */
        .toggle-container {
            margin: 20px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .toggle-label {
            font-size: 14px;
            color: var(--text-color);
        }

        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }

        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
        }

        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .toggle-slider {
            background-color: var(--primary-color);
        }

        input:checked + .toggle-slider:before {
            transform: translateX(26px);
        }

        /* Phone Number Change Section */
        .phone-section {
            background-color: var(--card-bg);
            border-radius: 8px;
            padding: 20px;
            margin-top: 30px;
            box-shadow: var(--shadow);
        }

        .phone-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 400px;
        }

        .phone-input {
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 14px;
            background-color: var(--bg-color);
            color: var(--text-color);
        }

        .phone-button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
        }

        .phone-button:hover {
            background-color: #0081d6;
        }

        /* Confirmation Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background-color: var(--card-bg);
            padding: 30px;
            border-radius: 8px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .modal-title {
            font-weight: 600;
            margin-bottom: 15px;
            font-size: 18px;
        }

        .modal-message {
            margin-bottom: 20px;
            color: var(--text-color);
        }

        .modal-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
        }

        .modal-button {
            padding: 8px 20px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            font-weight: 500;
        }

        .modal-confirm {
            background-color: #ed4956;
            color: white;
        }

        .modal-cancel {
            background-color: #f0f0f0;
            color: #262626;
        }

        .dark-mode .modal-cancel {
            background-color: #333;
            color: #f5f5f5;
        }

        /* Shaky Text Animation */
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .shake {
            animation: shake 0.5s;
            color: #ed4956;
            font-weight: 600;
        }

        @media (max-width: 768px) {
            .help-categories, .topics-grid {
                grid-template-columns: 1fr;
            }
            
            .nav-links a:not(:last-child) {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">SocialNet Help</div>
            <div class="nav-links">
                <a href="dashboard.html">Home</a>
                <a href="help.php">Help Center</a>
                <a href="help.php">Privacy & Safety</a>
                <button class="theme-toggle" id="themeToggle">🌙</button>
            </div>
        </header>

        <div class="search-container">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-box" placeholder="Search for help, like 'how to change password'">
        </div>

        <div class="help-categories">
            <div class="category-card">
                <div class="category-icon">🔐</div>
                <div class="category-title">Account & Privacy</div>
                <div class="category-desc">Manage your account, privacy settings, and security</div>
            </div>
            <div class="category-card">
                <div class="category-icon">📱</div>
                <div class="category-title">Using SocialNet</div>
                <div class="category-desc">Learn how to post, message, and use features</div>
            </div>
            <div class="category-card">
                <div class="category-icon">🛡️</div>
                <div class="category-title">Privacy & Safety</div>
                <div class="category-desc">Control your privacy and stay safe on SocialNet</div>
            </div>
            <div class="category-card">
                <div class="category-icon">📋</div>
                <div class="category-title">Policies & Reporting</div>
                <div class="category-desc">Community guidelines and how to report issues</div>
            </div>
        </div>

        <div class="toggle-container">
            <span class="toggle-label">Enable notifications for help updates</span>
            <label class="toggle-switch">
                <input type="checkbox">
                <span class="toggle-slider"></span>
            </label>
        </div>

        <div class="phone-section">
            <h3 class="section-title">Change Phone Number</h3>
            <form class="phone-form" id="phoneForm">
                <input type="tel" class="phone-input" placeholder="Enter new phone number" required>
                <button type="submit" class="phone-button">Change Phone Number</button>
            </form>
        </div>

        <div class="popular-topics">
            <div class="section-title">Popular Help Topics</div>
            <div class="topics-grid">
                <div class="topic-item" data-search="change password">
                    <div class="topic-title">How to change your password</div>
                    <div class="topic-desc">Update your password to keep your account secure</div>
                </div>
                <div class="topic-item" data-search="deactivate account">
                    <div class="topic-title">How to deactivate your account</div>
                    <div class="topic-desc">Temporarily disable your SocialNet account</div>
                </div>
                <div class="topic-item" data-search="two-factor authentication">
                    <div class="topic-title">Set up two-factor authentication</div>
                    <div class="topic-desc">Add an extra layer of security to your account</div>
                </div>
                <div class="topic-item" data-search="privacy settings">
                    <div class="topic-title">Adjust your privacy settings</div>
                    <div class="topic-desc">Control who can see your posts and information</div>
                </div>
                <div class="topic-item" data-search="report problem">
                    <div class="topic-title">Report a problem</div>
                    <div class="topic-desc">Let us know if you're experiencing issues</div>
                </div>
                <div class="topic-item" data-search="delete post">
                    <div class="topic-title">Delete a post or story</div>
                    <div class="topic-desc">Remove content you've shared on SocialNet</div>
                </div>
            </div>
        </div>

        <div class="search-results" id="searchResults">
            <!-- Search results will be displayed here -->
        </div>

        <footer>
            <p>© 2023 SocialNet. Help Center</p>
            <p>English (US)</p>
        </footer>
    </div>

    <!-- Confirmation Modal -->
    <div class="modal" id="confirmationModal">
        <div class="modal-content">
            <div class="modal-title">Confirm Phone Number Change</div>
            <div class="modal-message" id="modalMessage">Do you really want to change your phone number?</div>
            <div class="modal-buttons">
                <button class="modal-button modal-confirm" id="confirmButton">Yes, Change It</button>
                <button class="modal-button modal-cancel" id="cancelButton">Cancel</button>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const searchBox = document.querySelector('.search-box');
            const searchResults = document.getElementById('searchResults');
            const topicItems = document.querySelectorAll('.topic-item');
            const phoneForm = document.getElementById('phoneForm');
            const confirmationModal = document.getElementById('confirmationModal');
            const modalMessage = document.getElementById('modalMessage');
            const confirmButton = document.getElementById('confirmButton');
            const cancelButton = document.getElementById('cancelButton');
            const themeToggle = document.getElementById('themeToggle');
            
            // Check for saved theme preference or default to light mode
            const currentTheme = localStorage.getItem('theme') || 'light';
            if (currentTheme === 'dark') {
                document.body.classList.add('dark-mode');
                themeToggle.textContent = '☀️';
            } else {
                themeToggle.textContent = '🌙';
            }
            
            // Theme toggle functionality
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark');
                    themeToggle.textContent = '☀️';
                } else {
                    localStorage.setItem('theme', 'light');
                    themeToggle.textContent = '🌙';
                }
            });
            
            // Sample help articles data
            const helpArticles = [
                {
                    title: "How to change your password",
                    description: "Step-by-step guide to update your SocialNet password",
                    category: "Account & Privacy",
                    searchTerms: ["change password", "update password", "password reset"]
                },
                {
                    title: "Enable two-factor authentication",
                    description: "Add an extra layer of security to your account",
                    category: "Account & Privacy",
                    searchTerms: ["two-factor authentication", "2fa", "security", "login approval"]
                },
                {
                    title: "How to deactivate your account",
                    description: "Temporarily disable your SocialNet account",
                    category: "Account & Privacy",
                    searchTerms: ["deactivate account", "disable account", "temporary deactivation"]
                },
                {
                    title: "Adjust your privacy settings",
                    description: "Control who can see your posts and personal information",
                    category: "Privacy & Safety",
                    searchTerms: ["privacy settings", "private account", "who can see my posts"]
                },
                {
                    title: "Report a problem with the app",
                    description: "Let us know if you're experiencing technical issues",
                    category: "Policies & Reporting",
                    searchTerms: ["report problem", "technical issues", "bug report", "app not working"]
                },
                {
                    title: "Delete a post or story",
                    description: "Remove content you've shared on SocialNet",
                    category: "Using SocialNet",
                    searchTerms: ["delete post", "remove story", "delete content"]
                },
                {
                    title: "How to block someone",
                    description: "Prevent someone from interacting with you on SocialNet",
                    category: "Privacy & Safety",
                    searchTerms: ["block user", "block account", "stop someone from contacting me"]
                },
                {
                    title: "Recover a hacked account",
                    description: "Steps to take if your account has been compromised",
                    category: "Account & Privacy",
                    searchTerms: ["hacked account", "account security", "compromised account"]
                }
            ];

            // Search functionality
            searchBox.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                
                if (searchTerm.length === 0) {
                    searchResults.style.display = 'none';
                    return;
                }
                
                const results = helpArticles.filter(article => {
                    return article.searchTerms.some(term => term.includes(searchTerm)) ||
                           article.title.toLowerCase().includes(searchTerm) ||
                           article.description.toLowerCase().includes(searchTerm);
                });
                
                displaySearchResults(results);
            });

            // Display search results
            function displaySearchResults(results) {
                searchResults.innerHTML = '';
                
                if (results.length === 0) {
                    searchResults.innerHTML = '<div class="no-results">No results found. Try different keywords.</div>';
                } else {
                    results.forEach(article => {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'result-item';
                        resultItem.innerHTML = `
                            <div class="result-title">${article.title}</div>
                            <div class="result-desc">${article.description}</div>
                            <div style="font-size: 12px; color: var(--secondary-text); margin-top: 5px;">Category: ${article.category}</div>
                        `;
                        searchResults.appendChild(resultItem);
                    });
                }
                
                searchResults.style.display = 'block';
            }

            // Click on topic items to populate search
            topicItems.forEach(item => {
                item.addEventListener('click', function() {
                    const searchTerm = this.getAttribute('data-search');
                    searchBox.value = searchTerm;
                    searchBox.dispatchEvent(new Event('input'));
                    searchBox.focus();
                });
            });

            // Phone number change form
            phoneForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const phoneInput = this.querySelector('.phone-input');
                const phoneNumber = phoneInput.value;
                
                // Show confirmation modal with shaky text
                modalMessage.innerHTML = `Do you <span class="shake">really</span> want to change your phone number to <strong>${phoneNumber}</strong>?`;
                confirmationModal.style.display = 'flex';
                
                // Store the phone number for later use
                this.dataset.pendingPhone = phoneNumber;
            });

            // Confirm phone number change
            confirmButton.addEventListener('click', function() {
                const pendingPhone = phoneForm.dataset.pendingPhone;
                
                // In a real app, you would send this to your backend
                alert(`Phone number successfully changed to ${pendingPhone}`);
                
                // Reset form and close modal
                phoneForm.reset();
                confirmationModal.style.display = 'none';
                delete phoneForm.dataset.pendingPhone;
            });

            // Cancel phone number change
            cancelButton.addEventListener('click', function() {
                confirmationModal.style.display = 'none';
                delete phoneForm.dataset.pendingPhone;
            });
        });
    </script>
</body>
</html>