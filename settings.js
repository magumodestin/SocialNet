   // Dark Mode Toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        // Check for saved theme preference or respect OS preference
        if (localStorage.getItem('darkMode') === 'enabled' || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('darkMode'))) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
                showToast('Dark mode enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
                showToast('Dark mode disabled');
            }
        });

        // Sidebar Navigation
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        const settingsSections = document.querySelectorAll('.settings-section');
        
        sidebarItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all sidebar items
                sidebarItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Get the section to show
                const sectionId = this.getAttribute('data-section');
                
                // Hide all sections
                settingsSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show the selected section
                document.getElementById(sectionId).classList.add('active');
            });
        });

        // Editable Fields Functionality
        function setupEditableField(fieldId) {
            const valueElement = document.getElementById(`${fieldId}-value`);
            const inputElement = document.getElementById(`${fieldId}-input`);
            const editButton = document.getElementById(`${fieldId}-edit-btn`);
            const saveButton = document.getElementById(`${fieldId}-save-btn`);
            const cancelButton = document.getElementById(`${fieldId}-cancel-btn`);
            
            let originalValue = valueElement.textContent;
            
            editButton.addEventListener('click', function() {
                // Switch to edit mode
                valueElement.style.display = 'none';
                inputElement.style.display = 'block';
                editButton.style.display = 'none';
                saveButton.style.display = 'block';
                cancelButton.style.display = 'block';
                
                // Focus on the input field
                inputElement.focus();
            });
            
            saveButton.addEventListener('click', function() {
                const newValue = inputElement.value.trim();
                
                if (newValue && newValue !== originalValue) {
                    // Update the value
                    valueElement.textContent = newValue;
                    originalValue = newValue;
                    
                    // Save to localStorage (simulating server save)
                    localStorage.setItem(fieldId, newValue);
                    
                    // Show success message
                    showToast(`${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} updated successfully`);
                }
                
                // Switch back to view mode
                exitEditMode();
            });
            
            cancelButton.addEventListener('click', function() {
                // Revert to original value
                inputElement.value = originalValue;
                
                // Switch back to view mode
                exitEditMode();
            });
            
            function exitEditMode() {
                valueElement.style.display = 'block';
                inputElement.style.display = 'none';
                editButton.style.display = 'block';
                saveButton.style.display = 'none';
                cancelButton.style.display = 'none';
            }
            
            // Load saved value from localStorage if available
            const savedValue = localStorage.getItem(fieldId);
            if (savedValue) {
                valueElement.textContent = savedValue;
                inputElement.value = savedValue;
                originalValue = savedValue;
            }
        }

        // Initialize editable fields
        setupEditableField('username');
        setupEditableField('email');
        setupEditableField('mobile');

        // Toast Notification Function
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Save settings when dropdowns change
        const dropdowns = document.querySelectorAll('select');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', function() {
                // Save to localStorage
                localStorage.setItem(this.id, this.value);
                showToast('Setting saved');
            });
            
            // Load saved value
            const savedValue = localStorage.getItem(this.id);
            if (savedValue) {
                this.value = savedValue;
            }
        });

        // Save settings when toggles change
        const toggles = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', function() {
                // Save to localStorage
                localStorage.setItem(this.id, this.checked);
                showToast('Setting saved');
            });
            
            // Load saved value
            const savedValue = localStorage.getItem(this.id);
            if (savedValue !== null) {
                this.checked = savedValue === 'true';
            }
        });