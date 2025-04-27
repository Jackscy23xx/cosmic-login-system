// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const logoutBtn = document.getElementById('logoutBtn');

// Google Apps Script Deployment ID
const scriptId = 'AKfycbxjFJIlqYkMsM5ARgFugXZpTPyPagh1V0Bqj7513mzvEJip_HHbloU842Omd_mDWar5'; // Replace with your actual script ID
const scriptUrl = `https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbxjFJIlqYkMsM5ARgFugXZpTPyPagh1V0Bqj7513mzvEJip_HHbloU842Omd_mDWar5/exec`;

// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('dashboard.html')) {
        checkLoginStatus();
        updateDashboardDate();
        loadDashboardData();
    }
});

// Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'login',
                    email: email,
                    password: password
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                localStorage.setItem('userToken', result.token);
                localStorage.setItem('userData', JSON.stringify(result.user));
                window.location.href = 'dashboard.html';
            } else {
                showNotification(result.message, 'error');
            }
        } catch (error) {
            showNotification('Cosmic connection failed. Try again later.', 'error');
            console.error('Login error:', error);
        }
    });
}

// Signup Form Submission
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        if (password !== confirmPassword) {
            showNotification('Quantum keys do not match', 'error');
            return;
        }
        
        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'signup',
                    name: name,
                    email: email,
                    password: password
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Singularity created successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showNotification(result.message, 'error');
            }
        } catch (error) {
            showNotification('Failed to establish cosmic connection', 'error');
            console.error('Signup error:', error);
        }
    });
}

// Logout Button
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        window.location.href = 'index.html';
    });
}

// Check Login Status
function checkLoginStatus() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load user data
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        document.getElementById('dashboardUsername').textContent = userData.name;
        document.getElementById('dashboardEmail').textContent = userData.email;
    }
}

// Update Dashboard Date
function updateDashboardDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const dateString = now.toLocaleDateString('en-US', options);
    document.getElementById('currentDate').textContent = `Stardate: ${dateString}`;
}

// Load Dashboard Data
function loadDashboardData() {
    // Generate random metrics
    document.getElementById('metric1').textContent = `${Math.floor(Math.random() * 30) + 70}%`;
    document.getElementById('metric2').textContent = `${(Math.random() * 0.8 + 0.5).toFixed(2)} GW`;
    document.getElementById('metric3').textContent = `${Math.floor(Math.random() * 10) + 85}%`;
    
    // Update progress bars
    const metric1Value = parseInt(document.getElementById('metric1').textContent);
    const metric2Value = parseFloat(document.getElementById('metric2').textContent);
    const metric3Value = parseInt(document.getElementById('metric3').textContent);
    
    document.querySelector('.nebula-card .progress-bar').style.width = `${metric1Value}%`;
    document.querySelector('.galaxy-card .progress-bar').style.width = `${(metric2Value / 1.3) * 100}%`;
    document.querySelector('.supernova-card .progress-bar').style.width = `${metric3Value}%`;
    
    // Generate anomalies
    const anomalies = [
        { type: 'Gravitational Wave', severity: 'Moderate', time: '12 minutes ago' },
        { type: 'Solar Flare', severity: 'High', time: '38 minutes ago' },
        { type: 'Magnetic Shift', severity: 'Low', time: '1 hour ago' },
        { type: 'Dark Matter', severity: 'Critical', time: '2 hours ago' }
    ];
    
    const anomalyList = document.getElementById('anomalyList');
    anomalyList.innerHTML = '';
    
    anomalies.forEach(anomaly => {
        const anomalyItem = document.createElement('div');
        anomalyItem.className = 'anomaly-item';
        
        let iconClass = 'fas fa-exclamation-triangle';
        let iconColor = '#ec4899';
        
        if (anomaly.severity === 'High') {
            iconClass = 'fas fa-bolt';
            iconColor = '#f59e0b';
        } else if (anomaly.severity === 'Critical') {
            iconClass = 'fas fa-skull-crossbones';
            iconColor = '#ef4444';
        } else if (anomaly.severity === 'Low') {
            iconClass = 'fas fa-info-circle';
            iconColor = '#5eead4';
        }
        
        anomalyItem.innerHTML = `
            <div class="anomaly-icon" style="background: rgba(${hexToRgb(iconColor)}, 0.1); color: ${iconColor}">
                <i class="${iconClass}"></i>
            </div>
            <div class="anomaly-info">
                <h4>${anomaly.type}</h4>
                <p>${anomaly.severity} • ${anomaly.time}</p>
            </div>
        `;
        
        anomalyList.appendChild(anomalyItem);
    });
    
    // Generate weather data
    const weatherData = [
        { type: 'Solar Wind', value: `${(Math.random() * 500 + 300).toFixed(0)} km/s` },
        { type: 'Cosmic Radiation', value: `${(Math.random() * 0.5 + 0.3).toFixed(2)} µSv` },
        { type: 'Aurora Activity', value: `${Math.floor(Math.random() * 5) + 1}/5` },
        { type: 'Meteor Shower', value: 'Eta Aquariids' }
    ];
    
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = '';
    
    weatherData.forEach(weather => {
        const weatherItem = document.createElement('div');
        weatherItem.className = 'weather-item';
        
        weatherItem.innerHTML = `
            <div class="weather-info">
                <div class="weather-icon">
                    <i class="fas fa-wind"></i>
                </div>
                <div class="weather-text">
                    <h4>${weather.type}</h4>
                    <p>Current reading</p>
                </div>
            </div>
            <div class="weather-value">${weather.value}</div>
        `;
        
        weatherDisplay.appendChild(weatherItem);
    });
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-family: 'Ubuntu', sans-serif;
        transform: translateX(150%);
        transition: transform 0.3s ease-out;
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background: rgba(16, 185, 129, 0.9);
        border-left: 5px solid #10b981;
    }
    
    .notification.error {
        background: rgba(239, 68, 68, 0.9);
        border-left: 5px solid #ef4444;
    }
`;
document.head.appendChild(notificationStyles);