// Sample data for plants
const initialPlants = [
    {
        id: 1,
        plantName: "Monstera Deliciosa",
        farmerName: "Emily Parker",
        farmerAvatar: "/placeholder.svg?height=40&width=40",
        weather: "Partly Cloudy",
        temperature: "24°C",
        careInstructions: "Water once a week. Keep in indirect sunlight. Mist leaves occasionally for humidity. Rotate the plant periodically to ensure even growth. Repot every 2-3 years in spring.",
        image: "/placeholder.svg?height=400&width=600",
        likes: 42,
        comments: [
            {
                id: 1,
                username: "Jane Smith",
                avatar: "/placeholder.svg?height=32&width=32",
                text: "This plant looks amazing! I've been trying to grow one myself but haven't had much luck. Any tips?",
                time: "1 hour ago"
            },
            {
                id: 2,
                username: "Alex Johnson",
                avatar: "/placeholder.svg?height=32&width=32",
                text: "Beautiful specimen! The leaves look so healthy.",
                time: "30 minutes ago"
            }
        ]
    },
    {
        id: 2,
        plantName: "Fiddle Leaf Fig",
        farmerName: "Marcus Johnson",
        farmerAvatar: "/placeholder.svg?height=40&width=40",
        weather: "Sunny",
        temperature: "28°C",
        careInstructions: "Water when top inch of soil is dry. Place in bright, indirect light. Avoid drafts and sudden temperature changes. Clean leaves regularly to remove dust. Fertilize during growing season.",
        image: "/placeholder.svg?height=400&width=600",
        likes: 36,
        comments: [
            {
                id: 1,
                username: "Sarah Williams",
                avatar: "/placeholder.svg?height=32&width=32",
                text: "I've been struggling with my fiddle leaf fig. This is inspiring!",
                time: "2 hours ago"
            }
        ]
    },
    {
        id: 3,
        plantName: "Snake Plant",
        farmerName: "Sophia Williams",
        farmerAvatar: "/placeholder.svg?height=40&width=40",
        weather: "Indoor",
        temperature: "22°C",
        careInstructions: "Water sparingly, only when soil is completely dry. Tolerates low light conditions but grows best in indirect sunlight. Very drought tolerant. Perfect for beginners or those who travel frequently.",
        image: "/placeholder.svg?height=400&width=600",
        likes: 29,
        comments: [
            {
                id: 1,
                username: "Michael Brown",
                avatar: "/placeholder.svg?height=32&width=32",
                text: "These are so easy to care for! I have three in my apartment.",
                time: "3 hours ago"
            }
        ]
    }
];

// DOM Elements
const farmersFeed = document.querySelector('.farmers-feed');
const addPlantBtn = document.getElementById('addPlantBtn');
const addPlantModal = document.getElementById('addPlantModal');
const closeAddPlantModal = document.getElementById('closeAddPlantModal');
const cancelAddPlant = document.getElementById('cancelAddPlant');
const addPlantForm = document.getElementById('addPlantForm');
const plantDetailsModal = document.getElementById('plantDetailsModal');
const closePlantDetailsModal = document.getElementById('closePlantDetailsModal');
const uploadArea = document.getElementById('uploadArea');
const uploadBtn = document.getElementById('uploadBtn');
const plantImage = document.getElementById('plantImage');
const previewArea = document.getElementById('previewArea');
const imagePreview = document.getElementById('imagePreview');
const changeImgBtn = document.getElementById('changeImgBtn');
const navbar = document.querySelector('.navbar');
const dashboardBtn = document.getElementById('dashboardBtn');
const feedBtn = document.getElementById('feedBtn');
const dashboardSection = document.getElementById('dashboardSection');
const farmersFeedSection = document.getElementById('farmersFeedSection');

// Global variables
let plants = [...initialPlants];
let selectedImageFile = null;

// Initialize the app
function init() {
    renderPlants();
    setupEventListeners();
    initDashboard();
}

// Render all plants in the feed
function renderPlants() {
    farmersFeed.innerHTML = '';
    
    plants.forEach(plant => {
        const plantCard = document.createElement('div');
        plantCard.className = 'plant-card';
        plantCard.innerHTML = `
            <div class="card-content">
                <div class="plant-image-container" data-id="${plant.id}">
                    <img src="${plant.image}" alt="${plant.plantName}">
                </div>
                <div class="plant-info">
                    <div class="farmer-info">
                        <div class="farmer-img">
                            <img src="${plant.farmerAvatar}" alt="${plant.farmerName}">
                        </div>
                        <div>
                            <h3>${plant.farmerName}</h3>
                            <p class="post-time">2 hours ago</p>
                        </div>
                    </div>
                    <h2 class="plant-name" data-id="${plant.id}">${plant.plantName}</h2>
                    <div class="plant-meta">
                        <div class="meta-item">
                            <i class="fas fa-cloud"></i>
                            <span>${plant.weather}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-thermometer-half"></i>
                            <span>${plant.temperature}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-tint"></i>
                            <span>Weekly</span>
                        </div>
                    </div>
                    <p class="plant-description">${plant.careInstructions}</p>
                    <span class="read-more" data-id="${plant.id}">Read more</span>
                </div>
            </div>
            <div class="card-footer">
                <button class="action-btn like-btn" data-id="${plant.id}">
                    <i class="far fa-heart"></i>
                    <span>${plant.likes}</span>
                </button>
                <button class="action-btn comment-btn" data-id="${plant.id}">
                    <i class="far fa-comment"></i>
                    <span>${plant.comments.length}</span>
                </button>
                <button class="action-btn share-btn">
                    <i class="fas fa-share"></i>
                    <span class="sr-only">Share</span>
                </button>
            </div>
        `;
        
        farmersFeed.appendChild(plantCard);
    });
}

// Initialize the dashboard
function initDashboard() {
    // Create and render the pie chart
    const ctx = document.getElementById('plantTypesChart').getContext('2d');
    
    const plantTypesChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Tropical', 'Succulents', 'Herbs', 'Flowering', 'Foliage'],
            datasets: [{
                data: [35, 25, 15, 15, 10],
                backgroundColor: [
                    'rgba(138, 43, 226, 0.8)', // Purple
                    'rgba(255, 105, 180, 0.8)', // Pink
                    'rgba(65, 105, 225, 0.8)', // Blue
                    'rgba(255, 165, 0, 0.8)', // Orange
                    'rgba(46, 204, 113, 0.8)' // Green
                ],
                borderColor: [
                    'rgba(138, 43, 226, 1)',
                    'rgba(255, 105, 180, 1)',
                    'rgba(65, 105, 225, 1)',
                    'rgba(255, 165, 0, 1)',
                    'rgba(46, 204, 113, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#F0F0F0',
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(34, 34, 34, 0.9)',
                    titleColor: '#F0F0F0',
                    bodyColor: '#F0F0F0',
                    bodyFont: {
                        family: 'Inter'
                    },
                    titleFont: {
                        family: 'Inter'
                    },
                    padding: 12,
                    boxPadding: 8
                }
            }
        }
    });
}

// Set up all event listeners
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Dashboard and Feed navigation
    dashboardBtn.addEventListener('click', () => {
        dashboardSection.style.display = 'block';
        farmersFeedSection.style.display = 'none';
        dashboardBtn.classList.add('active');
        feedBtn.classList.remove('active');
    });
    
    feedBtn.addEventListener('click', () => {
        dashboardSection.style.display = 'none';
        farmersFeedSection.style.display = 'grid';
        dashboardBtn.classList.remove('active');
        feedBtn.classList.add('active');
    });
    
    // Add plant modal
    addPlantBtn.addEventListener('click', () => {
        addPlantModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeAddPlantModal.addEventListener('click', closeAddPlantModalFunc);
    cancelAddPlant.addEventListener('click', closeAddPlantModalFunc);
    
    // Close modal when clicking outside
    addPlantModal.addEventListener('click', (e) => {
        if (e.target === addPlantModal) {
            closeAddPlantModalFunc();
        }
    });
    
    plantDetailsModal.addEventListener('click', (e) => {
        if (e.target === plantDetailsModal) {
            closePlantDetailsModalFunc();
        }
    });
    
    // Image upload
    uploadArea.addEventListener('click', () => {
        plantImage.click();
    });
    
    uploadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        plantImage.click();
    });
    
    plantImage.addEventListener('change', handleImageUpload);
    
    changeImgBtn.addEventListener('click', () => {
        plantImage.click();
    });
    
    // Add plant form submission
    addPlantForm.addEventListener('submit', handleAddPlant);
    
    // Close plant details modal
    closePlantDetailsModal.addEventListener('click', closePlantDetailsModalFunc);
    
    // Event delegation for plant cards
    farmersFeed.addEventListener('click', (e) => {
        // Open plant details
        if (e.target.classList.contains('plant-name') || 
            e.target.classList.contains('read-more') || 
            e.target.closest('.plant-image-container')) {
            
            const id = e.target.dataset.id || e.target.closest('[data-id]').dataset.id;
            openPlantDetails(parseInt(id));
        }
        
        // Like button
        if (e.target.closest('.like-btn')) {
            const likeBtn = e.target.closest('.like-btn');
            const id = likeBtn.dataset.id;
            toggleLike(parseInt(id));
            
            // Update UI
            const likeCount = likeBtn.querySelector('span');
            const plant = plants.find(p => p.id === parseInt(id));
            likeCount.textContent = plant.likes;
            
            // Toggle heart icon
            const heartIcon = likeBtn.querySelector('i');
            heartIcon.classList.toggle('far');
            heartIcon.classList.toggle('fas');
            heartIcon.classList.toggle('text-red-500');
        }
        
        // Comment button
        if (e.target.closest('.comment-btn')) {
            const id = e.target.closest('.comment-btn').dataset.id;
            openPlantDetails(parseInt(id), true);
        }
    });
    
    // Add comment in details modal
    const commentInput = document.querySelector('.comment-input input');
    const postCommentBtn = document.querySelector('.post-comment-btn');
    
    postCommentBtn.addEventListener('click', () => {
        if (commentInput.value.trim() !== '') {
            const plantId = plantDetailsModal.dataset.plantId;
            addComment(parseInt(plantId), commentInput.value);
            commentInput.value = '';
        }
    });
    
    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && commentInput.value.trim() !== '') {
            const plantId = plantDetailsModal.dataset.plantId;
            addComment(parseInt(plantId), commentInput.value);
            commentInput.value = '';
        }
    });
    
    // Task checkboxes
    document.querySelectorAll('.task-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.style.opacity = '0.5';
                taskItem.querySelector('.task-title').style.textDecoration = 'line-through';
            } else {
                taskItem.style.opacity = '1';
                taskItem.querySelector('.task-title').style.textDecoration = 'none';
            }
        });
    });
}

// Close add plant modal
function closeAddPlantModalFunc() {
    addPlantModal.classList.remove('active');
    document.body.style.overflow = '';
    addPlantForm.reset();
    previewArea.style.display = 'none';
    uploadArea.style.display = 'block';
    selectedImageFile = null;
}

// Close plant details modal
function closePlantDetailsModalFunc() {
    plantDetailsModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle image upload
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        selectedImageFile = file;
        const reader = new FileReader();
        
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            uploadArea.style.display = 'none';
            previewArea.style.display = 'block';
        };
        
        reader.readAsDataURL(file);
    }
}

// Handle add plant form submission
function handleAddPlant(e) {
    e.preventDefault();
    
    const plantName = document.getElementById('plantName').value;
    const weather = document.getElementById('weather').value;
    const temperature = document.getElementById('temperature').value;
    const careInstructions = document.getElementById('careInstructions').value;
    
    // Create image URL (in a real app, you'd upload the image to a server)
    let imageUrl = "/placeholder.svg?height=400&width=600";
    if (selectedImageFile) {
        // In a real app, you'd upload the image and get a URL back
        // For this demo, we'll use the data URL
        imageUrl = URL.createObjectURL(selectedImageFile);
    }
    
    // Create new plant object
    const newPlant = {
        id: plants.length + 1,
        plantName,
        farmerName: "You",
        farmerAvatar: "/placeholder.svg?height=40&width=40",
        weather,
        temperature,
        careInstructions,
        image: imageUrl,
        likes: 0,
        comments: []
    };
    
    // Add to plants array
    plants.unshift(newPlant);
    
    // Re-render plants
    renderPlants();
    
    // Close modal
    closeAddPlantModalFunc();
}

// Open plant details modal
function openPlantDetails(id, focusComments = false) {
    const plant = plants.find(p => p.id === id);
    if (!plant) return;
    
    // Set plant details
    document.getElementById('detailsImage').src = plant.image;
    document.getElementById('farmerAvatar').src = plant.farmerAvatar;
    document.getElementById('farmerName').textContent = plant.farmerName;
    document.getElementById('detailsPlantName').textContent = plant.plantName;
    document.getElementById('detailsWeather').textContent = plant.weather;
    document.getElementById('detailsTemperature').textContent = plant.temperature;
    document.getElementById('detailsCareInstructions').textContent = plant.careInstructions;
    document.getElementById('detailsLikes').textContent = plant.likes;
    document.getElementById('detailsComments').textContent = plant.comments.length;
    document.getElementById('commentCount').textContent = plant.comments.length;
    
    // Set plant ID for reference
    plantDetailsModal.dataset.plantId = id;
    
    // Render comments
    renderComments(plant.comments);
    
    // Open modal
    plantDetailsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on comments if requested
    if (focusComments) {
        setTimeout(() => {
            document.querySelector('.comment-input input').focus();
        }, 300);
    }
}

// Render comments in details modal
function renderComments(comments) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="text-center text-secondary">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment';
        commentEl.innerHTML = `
            <div class="user-img">
                <img src="${comment.avatar}" alt="${comment.username}">
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <h4>${comment.username}</h4>
                    <span>${comment.time}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
            </div>
        `;
        
        commentsList.appendChild(commentEl);
    });
}

// Add a comment to a plant
function addComment(plantId, commentText) {
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return;
    
    const newComment = {
        id: plant.comments.length + 1,
        username: "You",
        avatar: "/placeholder.svg?height=32&width=32",
        text: commentText,
        time: "Just now"
    };
    
    plant.comments.push(newComment);
    
    // Update UI
    document.getElementById('detailsComments').textContent = plant.comments.length;
    document.getElementById('commentCount').textContent = plant.comments.length;
    renderComments(plant.comments);
    
    // Update plant card in feed
    renderPlants();
}

// Toggle like on a plant
function toggleLike(plantId) {
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return;
    
    plant.likes += 1;
    
    // If in details modal, update the like count
    if (plantDetailsModal.classList.contains('active') && 
        parseInt(plantDetailsModal.dataset.plantId) === plantId) {
        document.getElementById('detailsLikes').textContent = plant.likes;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);