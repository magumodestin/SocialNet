const birthdays = [
    { name: "Brownie Baddie", date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2) },
    { name: "Thandolwethu Ngubane", date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5) },
    { name: "Dalvin", date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1) },
    { name: "Vennesa", date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 3) },
    { name: "Mrr Hectic", date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7) },
    { name: "Destiny", date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 10) },
    { name: "Thabo", date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 14) }
];

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
} else {
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
});

function formatDate(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
        return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return "Tomorrow";
    } else {
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }
}

function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
}

function renderBirthdays() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingContainer = document.getElementById('upcomingBirthdays');
    const pastContainer = document.getElementById('pastBirthdays');
    
    upcomingContainer.innerHTML = '';
    pastContainer.innerHTML = '';

    const sortedBirthdays = [...birthdays].sort((a, b) => a.date - b.date);
    
    const upcoming = sortedBirthdays.filter(b => {
        const birthdayThisYear = new Date(b.date);
        birthdayThisYear.setFullYear(today.getFullYear());
        return birthdayThisYear >= today;
    });
    
    const past = sortedBirthdays.filter(b => {
        const birthdayThisYear = new Date(b.date);
        birthdayThisYear.setFullYear(today.getFullYear());
        return birthdayThisYear < today;
    });
    
    if (upcoming.length > 0) {
        upcoming.forEach(birthday => {
            const birthdayElement = document.createElement('div');
            birthdayElement.className = 'birthday-item upcoming';
            
            const avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.textContent = getInitials(birthday.name);
            
            const info = document.createElement('div');
            info.className = 'birthday-info';
            
            const name = document.createElement('div');
            name.className = 'name';
            name.textContent = birthday.name;
            
            const date = document.createElement('div');
            date.className = 'birthday-date';
            date.textContent = formatDate(birthday.date);
            
            info.appendChild(name);
            info.appendChild(date);
            
            const button = document.createElement('button');
            button.className = 'action-button';
            button.textContent = 'Post';
            
            birthdayElement.appendChild(avatar);
            birthdayElement.appendChild(info);
            birthdayElement.appendChild(button);
            
            upcomingContainer.appendChild(birthdayElement);
        });
    } else {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No upcoming birthdays';
        upcomingContainer.appendChild(emptyState);
    }
    

    if (past.length > 0) {
        past.forEach(birthday => {
            const birthdayElement = document.createElement('div');
            birthdayElement.className = 'birthday-item past';
            
            const avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.textContent = getInitials(birthday.name);
            
            const info = document.createElement('div');
            info.className = 'birthday-info';
            
            const name = document.createElement('div');
            name.className = 'name';
            name.textContent = birthday.name;
            
            const date = document.createElement('div');
            date.className = 'birthday-date';
            date.textContent = formatDate(birthday.date);
            
            info.appendChild(name);
            info.appendChild(date);
            
            const button = document.createElement('button');
            button.className = 'action-button';
            button.textContent = 'Post';
            
            birthdayElement.appendChild(avatar);
            birthdayElement.appendChild(info);
            birthdayElement.appendChild(button);
            
            pastContainer.appendChild(birthdayElement);
        });
    } else {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No past birthdays';
        pastContainer.appendChild(emptyState);
    }
}

document.addEventListener('DOMContentLoaded', renderBirthdays);