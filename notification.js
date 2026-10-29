// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Here you would typically filter notifications based on the selected filter
        console.log('Filter changed to:', this.textContent);
    });
});

// Mark as read functionality
document.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (!e.target.classList.contains('action-btn')) {
            this.classList.remove('unread');
            const badge = this.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        }
    });
});

// Action buttons functionality
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const action = this.textContent;
        const notification = this.closest('.notification-item');
        const userName = notification.querySelector('.notification-user').textContent;
        
        alert(`Action: ${action} for ${userName}`);
        
        if (action === 'Delete' || action === 'Decline') {
            notification.style.opacity = '0.5';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
        
        if (action === 'Confirm' || action === 'RSVP' || action === 'Send Wish') {
            this.style.backgroundColor = '#42b883';
            this.textContent = '✓ Done';
            setTimeout(() => {
                notification.style.opacity = '0.5';
            }, 1000);
        }
    });
});