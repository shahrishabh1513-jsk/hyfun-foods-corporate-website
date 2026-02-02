/* RECIPES PAGE JAVASCRIPT */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all recipes page functionality
    initRecipeSlider();
    initRecipeFilters();
    initRecipeCards();
    initVideoPlayers();
    initRecipeSearch();
    initRecipeModal();
    initVideoModal();
    initFloatingAnimations();
    initCategoryCards();
    
    console.log('Recipes page loaded successfully!');
});

/* Initialize featured recipe slider */
function initRecipeSlider() {
    const slides = document.querySelectorAll('.featured-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length === 0) return;
    
    // Show initial slide
    showSlide(currentSlide);
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            resetInterval();
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            resetInterval();
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    // Dot click
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            resetInterval();
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            currentSlide = slideIndex;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide every 5 seconds
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Trigger animation
        const activeSlide = slides[index];
        activeSlide.style.animation = 'fadeSlide 0.5s ease';
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause auto-slide when hovering over slider
    const slider = document.querySelector('.featured-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

/* Initialize recipe filtering */
function initRecipeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category
            const filter = this.getAttribute('data-filter');
            
            // Show/hide recipes based on filter
            recipeCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                // Add delay for staggered animation
                const delay = index * 50;
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    }, delay);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* Initialize recipe cards interaction */
function initRecipeCards() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    const viewRecipeButtons = document.querySelectorAll('.btn-view-recipe');
    
    // Add animation delay for staggered appearance
    recipeCards.forEach((card, index) => {
        const delay = index * 0.1;
        card.style.animationDelay = `${delay}s`;
        card.style.animation = 'fadeInUp 0.6s ease forwards';
        
        // Add CSS for animation if not already present
        if (!document.querySelector('#recipe-animations')) {
            const style = document.createElement('style');
            style.id = 'recipe-animations';
            style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    });
    
    // View recipe buttons in featured slider
    viewRecipeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeId = this.getAttribute('data-id');
            showRecipeModal(recipeId);
        });
    });
    
    // Recipe card interactions
    recipeCards.forEach(card => {
        // View recipe button
        const viewBtn = card.querySelector('.btn-recipe');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const recipeId = this.getAttribute('data-id');
                showRecipeModal(recipeId);
            });
        }
        
        // Quick view button
        const quickViewBtn = card.querySelector('.quick-view-btn');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const recipeId = this.getAttribute('data-id');
                showRecipeModal(recipeId);
            });
        }
        
        // Card click (for accessibility)
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const recipeId = this.getAttribute('data-id');
                showRecipeModal(recipeId);
            }
        });
    });
    
    // Load more recipes button
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            simulateLoadMoreRecipes();
        });
    }
}

/* Initialize video players */
function initVideoPlayers() {
    // Play buttons for featured slider
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            showVideoModal(videoUrl);
        });
    });
    
    // Small play buttons on recipe cards
    const smallPlayButtons = document.querySelectorAll('.play-btn-small');
    smallPlayButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering card click
            const videoUrl = this.getAttribute('data-video');
            showVideoModal(videoUrl);
        });
    });
    
    // Video play buttons in video section
    const videoPlayButtons = document.querySelectorAll('.video-play-btn');
    videoPlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            showVideoModal(videoUrl);
        });
    });
}

/* Initialize recipe search */
function initRecipeSearch() {
    const searchInput = document.getElementById('recipeSearch');
    const searchBtn = document.querySelector('.search-btn');
    const searchTags = document.querySelectorAll('.search-tag');
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    if (searchInput) {
        // Real-time search
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            performSearch(searchTerm);
        });
        
        // Enter key search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                performSearch(searchTerm);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            performSearch(searchTerm);
        });
    }
    
    // Search tags click
    searchTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
    
    function performSearch(searchTerm) {
        if (!searchTerm.trim()) {
            // Show all recipes if search is empty
            recipeCards.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
            });
            return;
        }
        
        recipeCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('.recipe-desc').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            
            if (title.includes(searchTerm) || 
                desc.includes(searchTerm) || 
                category.includes(searchTerm)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    function filterByCategory(category) {
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
        
        // Update search input to show category
        searchInput.value = category.charAt(0).toUpperCase() + category.slice(1) + ' Recipes';
    }
}

/* Initialize recipe modal */
function initRecipeModal() {
    const modal = document.getElementById('recipeModal');
    const closeBtn = document.getElementById('closeRecipeModal');
    
    if (!modal || !closeBtn) return;
    
    // Close modal button
    closeBtn.addEventListener('click', () => {
        closeRecipeModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeRecipeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeRecipeModal();
        }
    });
}

/* Initialize video modal */
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeVideoModal');
    let player = null;
    
    if (!modal || !closeBtn) return;
    
    // Close modal button
    closeBtn.addEventListener('click', () => {
        closeVideoModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // Function to close video modal and destroy player
    function closeVideoModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Destroy Plyr player if it exists
        if (player) {
            player.destroy();
            player = null;
        }
        
        // Clear video container
        const videoContainer = document.getElementById('videoPlayer');
        if (videoContainer) {
            videoContainer.innerHTML = '';
        }
    }
}

/* Initialize floating animations */
function initFloatingAnimations() {
    // Add hover effects to hero stats
    const heroStats = document.querySelectorAll('.hero-stat');
    heroStats.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            const h3 = stat.querySelector('h3');
            const originalText = h3.textContent;
            h3.style.transform = 'scale(1.1)';
            
            // Add pulse animation to numbers
            if (originalText.includes('+')) {
                const number = originalText.replace('+', '');
                let count = 0;
                const target = parseInt(number);
                const increment = target / 20;
                
                const counter = setInterval(() => {
                    count += increment;
                    h3.textContent = Math.floor(count) + '+';
                    
                    if (count >= target) {
                        h3.textContent = originalText;
                        clearInterval(counter);
                    }
                }, 50);
            }
        });
        
        stat.addEventListener('mouseleave', () => {
            const h3 = stat.querySelector('h3');
            h3.style.transform = 'scale(1)';
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
}

/* Initialize category cards */
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
            
            // Scroll to recipes grid
            const recipesGrid = document.querySelector('.all-recipes');
            if (recipesGrid) {
                recipesGrid.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* Show recipe modal */
function showRecipeModal(recipeId) {
    const modal = document.getElementById('recipeModal');
    const modalContent = document.getElementById('recipeModalContent');
    
    if (!modal || !modalContent) return;
    
    // Get recipe data (in a real app, this would come from an API)
    const recipe = getRecipeData(recipeId);
    
    // Create modal content
    modalContent.innerHTML = `
        <div class="recipe-modal-header">
            <div class="recipe-modal-image">
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
            <div class="recipe-modal-title">
                <h2>${recipe.title}</h2>
                <div class="recipe-modal-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                    <span><i class="fas fa-user-friends"></i> ${recipe.servings}</span>
                    <span><i class="fas fa-fire"></i> ${recipe.difficulty}</span>
                </div>
                <div class="recipe-modal-tags">
                    ${recipe.tags.map(tag => `<span class="recipe-modal-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <div class="recipe-modal-body">
            <div class="recipe-ingredients">
                <h3><i class="fas fa-shopping-basket"></i> Ingredients</h3>
                <ul>
                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recipe-instructions">
                <h3><i class="fas fa-list-ol"></i> Instructions</h3>
                <ol>
                    ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h3><i class="fas fa-lightbulb"></i> Tips & Notes</h3>
                <ul>
                    ${recipe.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recipe-nutrition">
                <h3><i class="fas fa-apple-alt"></i> Nutrition Facts (per serving)</h3>
                <div class="nutrition-grid">
                    <div class="nutrition-item">
                        <span class="nutrition-value">${recipe.nutrition.calories}</span>
                        <span class="nutrition-label">Calories</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="nutrition-value">${recipe.nutrition.carbs}</span>
                        <span class="nutrition-label">Carbs</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="nutrition-value">${recipe.nutrition.protein}</span>
                        <span class="nutrition-label">Protein</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="nutrition-value">${recipe.nutrition.fat}</span>
                        <span class="nutrition-label">Fat</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="recipe-modal-footer">
            <button class="btn btn-print-recipe" onclick="window.print()">
                <i class="fas fa-print"></i> Print Recipe
            </button>
            <button class="btn btn-share-recipe" onclick="shareRecipe(${recipeId})">
                <i class="fas fa-share-alt"></i> Share Recipe
            </button>
        </div>
    `;
    
    // Add CSS for modal content
    if (!document.querySelector('#recipe-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'recipe-modal-styles';
        style.textContent = `
            .recipe-modal-header {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 40px;
                margin-bottom: 40px;
            }
            
            .recipe-modal-image {
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            
            .recipe-modal-image img {
                width: 100%;
                height: 250px;
                object-fit: cover;
            }
            
            .recipe-modal-title h2 {
                font-size: 2rem;
                margin-bottom: 15px;
                color: var(--text-main);
            }
            
            .recipe-modal-meta {
                display: flex;
                gap: 20px;
                margin-bottom: 20px;
                color: var(--text-muted);
            }
            
            .recipe-modal-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .recipe-modal-tag {
                background: rgba(120, 176, 75, 0.1);
                color: var(--green);
                padding: 6px 15px;
                border-radius: 20px;
                font-size: 0.85rem;
            }
            
            .recipe-modal-body {
                display: grid;
                gap: 40px;
            }
            
            .recipe-ingredients h3,
            .recipe-instructions h3,
            .recipe-tips h3,
            .recipe-nutrition h3 {
                font-size: 1.5rem;
                margin-bottom: 20px;
                color: var(--text-main);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .recipe-ingredients ul,
            .recipe-instructions ol,
            .recipe-tips ul {
                padding-left: 20px;
            }
            
            .recipe-ingredients li,
            .recipe-instructions li,
            .recipe-tips li {
                margin-bottom: 10px;
                color: var(--text-muted);
                line-height: 1.6;
            }
            
            .recipe-instructions li {
                margin-bottom: 20px;
            }
            
            .nutrition-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
                margin-top: 20px;
            }
            
            .nutrition-item {
                text-align: center;
                padding: 20px;
                background: var(--bg-card);
                border-radius: 10px;
                border: 1px solid rgba(110, 193, 228, 0.2);
            }
            
            .nutrition-value {
                display: block;
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--green);
                margin-bottom: 5px;
            }
            
            .nutrition-label {
                font-size: 0.9rem;
                color: var(--text-muted);
            }
            
            .recipe-modal-footer {
                display: flex;
                gap: 20px;
                margin-top: 40px;
                padding-top: 30px;
                border-top: 1px solid rgba(0,0,0,0.1);
            }
            
            .btn-print-recipe,
            .btn-share-recipe {
                flex: 1;
                padding: 15px;
            }
            
            @media (max-width: 768px) {
                .recipe-modal-header {
                    grid-template-columns: 1fr;
                }
                
                .recipe-modal-image {
                    height: 200px;
                }
                
                .recipe-modal-image img {
                    height: 200px;
                }
                
                .nutrition-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .recipe-modal-footer {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/* Show video modal */
function showVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoPlayer');
    
    if (!modal || !videoContainer) return;
    
    // Create video player
    videoContainer.innerHTML = `
        <div class="plyr__video-embed" id="player">
            <iframe src="${videoUrl}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1" 
                allowfullscreen allowtransparency allow="autoplay">
            </iframe>
        </div>
    `;
    
    // Initialize Plyr player
    const player = new Plyr('#player', {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3 }
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Store player reference for cleanup
    window.currentPlayer = player;
}

/* Close recipe modal */
function closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/* Simulate loading more recipes */
function simulateLoadMoreRecipes() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    const recipesGrid = document.querySelector('.recipes-grid');
    
    if (!loadMoreBtn || !recipesGrid) return;
    
    // Show loading state
    const originalText = loadMoreBtn.innerHTML;
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        // Create new recipe cards
        const newRecipes = [
            {
                id: 7,
                category: 'healthy',
                title: 'Baked Potato Wedges',
                desc: 'Healthy baked wedges with herbs',
                time: '25 min',
                servings: 4,
                difficulty: 'Easy'
            },
            {
                id: 8,
                category: 'party',
                title: 'Potato Sliders',
                desc: 'Mini sliders with potato patties',
                time: '20 min',
                servings: 6,
                difficulty: 'Medium'
            }
        ];
        
        // Add new recipes to grid
        newRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.setAttribute('data-category', recipe.category);
            recipeCard.setAttribute('data-id', recipe.id);
            
            recipeCard.innerHTML = `
                <div class="recipe-image">
                    <img src="./assets/image/french_fries.png" alt="${recipe.title}">
                    <div class="recipe-overlay">
                        <div class="play-btn-small" data-video="https://www.youtube.com/embed/dQw4w9WgXcQ">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="quick-view-btn" data-id="${recipe.id}">
                            <i class="fas fa-eye"></i> Quick View
                        </div>
                    </div>
                    <div class="recipe-badge">${recipe.time}</div>
                </div>
                <div class="recipe-info">
                    <h3>${recipe.title}</h3>
                    <p class="recipe-desc">${recipe.desc}</p>
                    <div class="recipe-meta-small">
                        <span><i class="fas fa-user-friends"></i> ${recipe.servings}</span>
                        <span><i class="fas fa-fire"></i> ${recipe.difficulty}</span>
                    </div>
                    <button class="btn-recipe" data-id="${recipe.id}">
                        <i class="fas fa-utensils"></i> View Recipe
                    </button>
                </div>
            `;
            
            recipesGrid.appendChild(recipeCard);
            
            // Initialize new card
            const viewBtn = recipeCard.querySelector('.btn-recipe');
            const quickViewBtn = recipeCard.querySelector('.quick-view-btn');
            const playBtn = recipeCard.querySelector('.play-btn-small');
            
            if (viewBtn) {
                viewBtn.addEventListener('click', function() {
                    showRecipeModal(recipe.id);
                });
            }
            
            if (quickViewBtn) {
                quickViewBtn.addEventListener('click', function() {
                    showRecipeModal(recipe.id);
                });
            }
            
            if (playBtn) {
                playBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showVideoModal(this.getAttribute('data-video'));
                });
            }
            
            // Add animation
            recipeCard.style.animation = 'fadeInUp 0.6s ease forwards';
        });
        
        // Update button
        loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Loaded Successfully';
        
        // Hide button after 2 seconds
        setTimeout(() => {
            loadMoreBtn.style.opacity = '0';
            loadMoreBtn.style.transform = 'translateY(20px)';
            setTimeout(() => {
                loadMoreBtn.style.display = 'none';
            }, 300);
        }, 2000);
        
    }, 1500);
}

/* Get recipe data (mock data for demo) */
function getRecipeData(recipeId) {
   const recipes = {
    1: {
        title: 'Arabic Burger',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/N54zWpEUnSg?si=l1_doSRRKKunlKNT',
        time: '15 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Burger', 'Arabic', 'Quick', 'Middle Eastern'],
        ingredients: [
            '2 HyFun Burger Patties',
            '2 burger buns',
            '1/4 cup tahini sauce',
            '2 tbsp garlic mayonnaise',
            '1 tomato, sliced',
            '1 onion, sliced',
            '4 lettuce leaves',
            '2 pickles',
            '1 tsp sumac powder',
            '2 tbsp olive oil'
        ],
        instructions: [
            'Cook HyFun Burger Patties as per package instructions.',
            'Toast burger buns lightly with butter or olive oil.',
            'Prepare the garlic-tahini sauce by mixing tahini with minced garlic and lemon juice.',
            'Spread the sauce on both halves of the buns.',
            'Place lettuce leaves on the bottom bun.',
            'Add the cooked burger patty.',
            'Layer with tomato and onion slices.',
            'Add pickle slices.',
            'Sprinkle sumac powder over the patty.',
            'Close the burger and serve immediately.'
        ],
        tips: [
            'Add hummus for extra creaminess',
            'Use pita bread instead of regular buns for authentic taste',
            'Add fresh mint leaves for extra freshness',
            'Serve with Arabic pickles on the side'
        ],
        nutrition: {
            calories: '420 kcal',
            carbs: '38g',
            protein: '22g',
            fat: '20g'
        }
    },
    2: {
        title: 'Spicy Texan Burger',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/cDzYFRCeQb4?si=q1bTdXXe1U7vV7fx',
        time: '18 minutes',
        servings: '2 servings',
        difficulty: 'Medium',
        tags: ['Burger', 'Spicy', 'American', 'Tex-Mex'],
        ingredients: [
            '2 HyFun Burger Patties',
            '2 brioche buns',
            '4 slices pepper jack cheese',
            '4 onion rings',
            '4 jalapeño slices',
            '2 tbsp chipotle mayo',
            '2 tbsp barbecue sauce',
            'Lettuce leaves',
            '1 tomato, sliced',
            '2 tbsp butter'
        ],
        instructions: [
            'Cook HyFun Burger Patties with Tex-Mex seasoning.',
            'Toast brioche buns with butter until golden brown.',
            'Place pepper jack cheese slices on hot patties to melt.',
            'Spread chipotle mayo on the bottom bun.',
            'Add fresh lettuce leaves and tomato slices.',
            'Place the cheesy patty on top.',
            'Add crispy onion rings and jalapeño slices.',
            'Drizzle with barbecue sauce.',
            'Close the burger and serve hot.'
        ],
        tips: [
            'Add crispy bacon strips for extra flavor',
            'Use onion jam instead of raw onions for sweetness',
            'Make it extra spicy with habanero slices',
            'Serve with loaded potato skins on the side'
        ],
        nutrition: {
            calories: '480 kcal',
            carbs: '42g',
            protein: '25g',
            fat: '24g'
        }
    },
    3: {
        title: 'Three Cheese Messy Burger',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/DzuCZCKJP3Q?si=GI2hqQq18GY_aIDP',
        time: '22 minutes',
        servings: '2 servings',
        difficulty: 'Medium',
        tags: ['Burger', 'Cheesy', 'Indulgent', 'Comfort Food'],
        ingredients: [
            '2 HyFun Burger Patties',
            '2 pretzel buns',
            '2 slices cheddar cheese',
            '2 slices gouda cheese',
            '1/2 cup blue cheese sauce',
            '1/4 cup caramelized onions',
            '2 tbsp garlic butter',
            '2 tbsp truffle oil',
            'Arugula leaves',
            '1 tomato, sliced'
        ],
        instructions: [
            'Cook HyFun Burger Patties to desired doneness.',
            'Brush pretzel buns with garlic butter and toast until golden.',
            'Melt cheddar and gouda cheese on the hot patties.',
            'Spread blue cheese sauce generously on the bottom bun.',
            'Add a layer of caramelized onions.',
            'Place the triple-cheese patty on top.',
            'Add fresh arugula and tomato slices.',
            'Drizzle with truffle oil.',
            'Close the burger and serve with extra napkins.'
        ],
        tips: [
            'Use brioche buns for a sweeter contrast',
            'Add bacon jam for extra sweetness',
            'Have plenty of napkins ready',
            'Serve with sweet potato fries'
        ],
        nutrition: {
            calories: '550 kcal',
            carbs: '45g',
            protein: '28g',
            fat: '30g'
        }
    },
    4: {
        title: 'Sabudana Papdi Chaat',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/aFqNA64UmBM?si=NahMS-_A9QDXRKSM',
        time: '25 minutes',
        servings: '4 servings',
        difficulty: 'Medium',
        tags: ['Indian', 'Chaat', 'Snack', 'Vegetarian'],
        ingredients: [
            '4 HyFun Sabudana Patties',
            '20 papdis (crispy puris)',
            '1 cup boiled potatoes, cubed',
            '1/2 cup nylon sev',
            '1/4 cup chopped coriander',
            '1/4 cup chopped onions',
            '1/4 cup chopped tomatoes',
            '1/2 cup sweet tamarind chutney',
            '1/2 cup green chutney',
            '1/2 cup thick yogurt',
            '1 tsp chaat masala',
            '1 tsp roasted cumin powder'
        ],
        instructions: [
            'Cook HyFun Sabudana Patties as per package instructions and cut into cubes.',
            'Arrange papdis on a serving plate.',
            'Place sabudana patty cubes and boiled potato cubes on papdis.',
            'Drizzle sweet tamarind chutney and green chutney.',
            'Add a spoonful of thick yogurt on each.',
            'Sprinkle chopped onions and tomatoes.',
            'Add generous amount of nylon sev.',
            'Garnish with chopped coriander.',
            'Sprinkle chaat masala and roasted cumin powder.',
            'Serve immediately.'
        ],
        tips: [
            'Add pomegranate seeds for sweetness and color',
            'Use mint-coriander chutney for freshness',
            'Make it spicy with extra green chili',
            'Serve immediately to keep papdis crispy'
        ],
        nutrition: {
            calories: '320 kcal',
            carbs: '48g',
            protein: '8g',
            fat: '12g'
        }
    },
    5: {
        title: 'Punjabi Burger',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/HsRzhU3DX3A?si=y2DcdSD3J-T0gO80',
        time: '20 minutes',
        servings: '2 servings',
        difficulty: 'Medium',
        tags: ['Burger', 'Indian', 'Spicy', 'Street Food'],
        ingredients: [
            '2 HyFun Aloo Tikki',
            '2 pav buns or burger buns',
            '1/2 cup chole (chickpea curry)',
            '2 tbsp tamarind chutney',
            '2 tbsp green chutney',
            '1 onion, finely chopped',
            '1 tomato, chopped',
            '1/4 cup nylon sev',
            '2 tbsp butter',
            '1 tsp chaat masala'
        ],
        instructions: [
            'Cook HyFun Aloo Tikki until crispy and golden brown.',
            'Toast pav buns with butter until lightly crisp.',
            'Place Aloo Tikki on the bottom bun.',
            'Spoon warm chole over the tikki.',
            'Add chopped onions and tomatoes.',
            'Drizzle both tamarind and green chutneys generously.',
            'Top with crunchy nylon sev.',
            'Sprinkle chaat masala.',
            'Close with the top bun and press gently.',
            'Serve immediately.'
        ],
        tips: [
            'Add sliced cucumbers for extra crunch',
            'Use mint-coriander chutney for freshness',
            'Make it extra spicy with green chilies',
            'Serve with masala chai'
        ],
        nutrition: {
            calories: '420 kcal',
            carbs: '52g',
            protein: '15g',
            fat: '18g'
        }
    },
    6: {
        title: 'Value Burgers',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/bgBBAJFAJDc?si=xt9JvRZiNsR4Pzjq',
        time: '15 minutes',
        servings: '4 servings',
        difficulty: 'Easy',
        tags: ['Burger', 'Budget', 'Quick', 'Family'],
        ingredients: [
            '4 HyFun Burger Patties',
            '4 burger buns',
            '4 lettuce leaves',
            '1 tomato, sliced',
            '1 onion, sliced',
            '4 cheese slices',
            '4 tbsp burger sauce',
            '2 tbsp butter',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Cook HyFun Burger Patties as per package instructions.',
            'Toast burger buns with butter until golden.',
            'Spread burger sauce on both halves of buns.',
            'Place lettuce leaf on bottom bun.',
            'Add cooked burger patty.',
            'Place cheese slice on hot patty.',
            'Add tomato and onion slices.',
            'Season with salt and pepper.',
            'Close the burger and serve.'
        ],
        tips: [
            'Add pickles for extra tang',
            'Make your own burger sauce with mayo and ketchup',
            'Use different cheese varieties',
            'Serve with homemade potato wedges'
        ],
        nutrition: {
            calories: '380 kcal',
            carbs: '35g',
            protein: '20g',
            fat: '16g'
        }
    },
    7: {
        title: 'Loaded Fries',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/lO_oxQ2ptME?si=phWBz0x75yRJLoJH',
        time: '12 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Fries', 'Snack', 'Cheesy', 'Quick'],
        ingredients: [
            '1 pack HyFun French Fries',
            '1 cup shredded mozzarella cheese',
            '1/2 cup nacho cheese sauce',
            '2 tbsp chopped spring onions',
            '2 tbsp chopped jalapeños',
            '2 tbsp sour cream',
            '2 tbsp bacon bits (optional)',
            '1 tsp paprika',
            '2 tbsp olive oil'
        ],
        instructions: [
            'Cook HyFun French Fries as per package instructions until crispy.',
            'Preheat oven to 200°C (390°F).',
            'Spread cooked fries in an oven-safe dish.',
            'Sprinkle shredded mozzarella evenly over fries.',
            'Drizzle nacho cheese sauce over the cheese.',
            'Bake for 3-4 minutes until cheese melts.',
            'Remove from oven and top with spring onions and jalapeños.',
            'Add dollops of sour cream.',
            'Sprinkle bacon bits if using.',
            'Dust with paprika and serve immediately.'
        ],
        tips: [
            'Add ground meat for a complete meal',
            'Use different cheese blends',
            'Make it spicy with hot sauce',
            'Serve with guacamole on the side'
        ],
        nutrition: {
            calories: '420 kcal',
            carbs: '45g',
            protein: '12g',
            fat: '22g'
        }
    },
    8: {
        title: 'Aloo Tikki Chaat',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/whXSa0n_sWA?si=3IaE77lUIv81Zxcf',
        time: '20 minutes',
        servings: '4 servings',
        difficulty: 'Medium',
        tags: ['Indian', 'Chaat', 'Street Food', 'Vegetarian'],
        ingredients: [
            '4 HyFun Aloo Tikki',
            '1 cup boiled chickpeas',
            '1/2 cup sweet tamarind chutney',
            '1/2 cup green chutney',
            '1/2 cup beaten yogurt',
            '1 onion, finely chopped',
            '1 tomato, finely chopped',
            '1/4 cup nylon sev',
            '2 tbsp chopped coriander',
            '1 tsp chaat masala',
            '1 tsp roasted cumin powder'
        ],
        instructions: [
            'Cook HyFun Aloo Tikki as per package instructions until crispy.',
            'Place 2 tikkis on each serving plate.',
            'Top with boiled chickpeas.',
            'Drizzle sweet tamarind chutney and green chutney.',
            'Add a spoonful of beaten yogurt.',
            'Sprinkle chopped onions and tomatoes.',
            'Add generous amount of nylon sev.',
            'Garnish with chopped coriander.',
            'Sprinkle chaat masala and roasted cumin powder.',
            'Serve immediately.'
        ],
        tips: [
            'Add pomegranate seeds for sweetness',
            'Use mint-coriander chutney',
            'Make it spicy with extra green chili',
            'Serve with hot puris'
        ],
        nutrition: {
            calories: '280 kcal',
            carbs: '38g',
            protein: '10g',
            fat: '12g'
        }
    },
    9: {
        title: 'Tikki Pav',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/XSCR4n1u1-I?si=daXVXaIm018eI1K2',
        time: '18 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Indian', 'Street Food', 'Quick', 'Vegetarian'],
        ingredients: [
            '2 HyFun Sabudana Patties',
            '4 pav buns',
            '2 tbsp butter',
            '1/2 cup green chutney',
            '1/4 cup sweet tamarind chutney',
            '1 onion, finely chopped',
            '1/4 cup nylon sev',
            '2 tbsp chopped coriander',
            '1 tsp chaat masala'
        ],
        instructions: [
            'Cook HyFun Sabudana Patties as per package instructions.',
            'Slice pav buns horizontally, keeping one side attached.',
            'Toast pav buns with butter until golden.',
            'Spread green chutney on one side of the pav.',
            'Place sabudana patty inside the pav.',
            'Drizzle sweet tamarind chutney over the patty.',
            'Add chopped onions.',
            'Sprinkle nylon sev and chopped coriander.',
            'Dust with chaat masala.',
            'Serve hot.'
        ],
        tips: [
            'Add sliced potatoes for extra bulk',
            'Use garlic chutney for extra flavor',
            'Make it spicy with green chilies',
            'Serve with hot tea'
        ],
        nutrition: {
            calories: '320 kcal',
            carbs: '42g',
            protein: '8g',
            fat: '14g'
        }
    },
    10: {
        title: 'Burger Patty Mini Pizza',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/uyHBpAge8VE?si=GgBQfmm8LFzbHqoG',
        time: '15 minutes',
        servings: '4 servings',
        difficulty: 'Easy',
        tags: ['Pizza', 'Italian', 'Fusion', 'Quick'],
        ingredients: [
            '4 HyFun Burger Patties',
            '1/2 cup pizza sauce',
            '1 cup shredded mozzarella cheese',
            '1/4 cup sliced black olives',
            '1/4 cup sliced bell peppers',
            '1/4 cup sliced mushrooms',
            '1/4 cup sweet corn',
            '1 tsp dried oregano',
            '1 tsp chili flakes',
            '2 tbsp olive oil'
        ],
        instructions: [
            'Flatten HyFun Burger Patties into round pizza bases.',
            'Preheat oven to 220°C (430°F).',
            'Brush both sides with olive oil.',
            'Spread pizza sauce evenly on each patty.',
            'Sprinkle shredded mozzarella cheese.',
            'Add olives, bell peppers, mushrooms, and sweet corn.',
            'Sprinkle dried oregano and chili flakes.',
            'Bake for 10-12 minutes until cheese melts and bubbles.',
            'Drizzle with olive oil before serving.',
            'Slice and serve hot.'
        ],
        tips: [
            'Add fresh basil leaves after baking',
            'Use different cheese blends',
            'Make personal sized pizzas',
            'Serve with garlic bread'
        ],
        nutrition: {
            calories: '320 kcal',
            carbs: '18g',
            protein: '22g',
            fat: '18g'
        }
    },
    11: {
        title: 'Crispy Aloo Tikki Burger',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/hhduaZ2aPCY?si=Zia0iuL9KAFasiaF',
        time: '20 minutes',
        servings: '2 servings',
        difficulty: 'Medium',
        tags: ['Burger', 'Indian', 'Crispy', 'Vegetarian'],
        ingredients: [
            '2 HyFun Aloo Tikki',
            '2 burger buns',
            '2 lettuce leaves',
            '1 tomato, sliced',
            '1 onion, sliced',
            '2 cheese slices',
            '2 tbsp burger sauce',
            '2 tbsp butter',
            '1 tsp chaat masala'
        ],
        instructions: [
            'Cook HyFun Aloo Tikki extra crispy as per package instructions.',
            'Toast burger buns with butter until golden.',
            'Spread burger sauce on both halves of buns.',
            'Place lettuce leaf on bottom bun.',
            'Add crispy Aloo Tikki.',
            'Place cheese slice on hot tikki.',
            'Add tomato and onion slices.',
            'Sprinkle chaat masala.',
            'Close the burger and serve immediately.'
        ],
        tips: [
            'Add sliced cucumbers for extra crunch',
            'Use mint mayonnaise for freshness',
            'Make it spicy with green chutney',
            'Serve with potato chips'
        ],
        nutrition: {
            calories: '380 kcal',
            carbs: '42g',
            protein: '12g',
            fat: '18g'
        }
    },
    12: {
        title: 'Cheesy Alfredo Fries',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/1Bd5xLUqQSA?si=4TWmVaNdwl_ddkBP',
        time: '15 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Fries', 'Italian', 'Cheesy', 'Comfort Food'],
        ingredients: [
            '1 pack HyFun French Fries',
            '1 cup Alfredo sauce',
            '1/2 cup shredded mozzarella',
            '1/4 cup grated parmesan',
            '2 tbsp chopped parsley',
            '1 tsp garlic powder',
            '1/2 tsp black pepper',
            '2 tbsp olive oil'
        ],
        instructions: [
            'Cook HyFun French Fries until golden and crispy.',
            'Preheat oven to 200°C (390°F).',
            'Heat Alfredo sauce until warm.',
            'Spread cooked fries in baking dish.',
            'Pour warm Alfredo sauce over fries.',
            'Sprinkle mozzarella and parmesan cheese.',
            'Bake for 3-4 minutes until cheese melts.',
            'Remove from oven and sprinkle chopped parsley.',
            'Dust with garlic powder and black pepper.',
            'Drizzle with olive oil and serve.'
        ],
        tips: [
            'Add cooked chicken for protein',
            'Use homemade Alfredo sauce',
            'Add cherry tomatoes for freshness',
            'Serve with garlic bread'
        ],
        nutrition: {
            calories: '450 kcal',
            carbs: '42g',
            protein: '15g',
            fat: '25g'
        }
    },
    13: {
        title: 'Loaded French Fries',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/_d8XQsQCMDs?si=hPg8IAj2SbYWtGMQ',
        time: '12 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Fries', 'Snack', 'Loaded', 'Quick'],
        ingredients: [
            '1 pack HyFun French Fries',
            '1/2 cup nacho cheese',
            '1/4 cup sour cream',
            '2 tbsp chopped spring onions',
            '2 tbsp chopped tomatoes',
            '2 tbsp sliced jalapeños',
            '2 tbsp bacon bits',
            '1 tsp paprika',
            '2 tbsp chopped coriander'
        ],
        instructions: [
            'Cook HyFun French Fries until extra crispy.',
            'Arrange fries on serving plate.',
            'Drizzle warm nacho cheese over fries.',
            'Add dollops of sour cream.',
            'Sprinkle chopped spring onions and tomatoes.',
            'Add sliced jalapeños.',
            'Top with bacon bits.',
            'Dust with paprika.',
            'Garnish with chopped coriander.',
            'Serve immediately.'
        ],
        tips: [
            'Add guacamole for creaminess',
            'Use different cheese sauces',
            'Make it vegetarian without bacon',
            'Serve as appetizer'
        ],
        nutrition: {
            calories: '380 kcal',
            carbs: '40g',
            protein: '10g',
            fat: '20g'
        }
    },
    14: {
        title: 'Farali Missal',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/y49r8K0FlIk?si=Vd-kdWGffhs0df5c',
        time: '25 minutes',
        servings: '4 servings',
        difficulty: 'Medium',
        tags: ['Indian', 'Fasting', 'Spicy', 'Vegetarian'],
        ingredients: [
            '4 HyFun Sabudana Patties',
            '1 cup peanuts, roasted',
            '2 potatoes, boiled and cubed',
            '1/2 cup yogurt',
            '2 green chilies, chopped',
            '1 tsp cumin seeds',
            '1 tbsp ghee',
            '1 tsp sugar',
            'Salt to taste',
            'Coriander leaves for garnish'
        ],
        instructions: [
            'Cook HyFun Sabudana Patties and cut into pieces.',
            'Grind roasted peanuts into coarse powder.',
            'Heat ghee in pan, add cumin seeds.',
            'Add chopped green chilies.',
            'Add boiled potato cubes and sauté.',
            'Add peanut powder and mix well.',
            'Add water to make gravy consistency.',
            'Add sugar and salt, simmer for 5 minutes.',
            'Add sabudana patty pieces.',
            'Serve hot garnished with coriander.'
        ],
        tips: [
            'Add rock salt for fasting',
            'Use sendha namak',
            'Make it less spicy as per taste',
            'Serve with yogurt'
        ],
        nutrition: {
            calories: '280 kcal',
            carbs: '35g',
            protein: '10g',
            fat: '12g'
        }
    },
    15: {
        title: 'Tandoori Mayo Burger Wrap',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/Q1tdQzbqs_A?si=kDjy_3gqeR9hySDD',
        time: '18 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Wrap', 'Indian', 'Tandoori', 'Quick'],
        ingredients: [
            '2 HyFun Burger Patties',
            '2 large tortillas',
            '1/4 cup tandoori mayonnaise',
            '1 cup shredded lettuce',
            '1/2 cup sliced onions',
            '1/2 cup sliced tomatoes',
            '1/4 cup mint chutney',
            '2 tbsp butter',
            '1 tsp chaat masala'
        ],
        instructions: [
            'Cook HyFun Burger Patties with tandoori marinade.',
            'Warm tortillas on a skillet.',
            'Spread tandoori mayonnaise on tortillas.',
            'Add shredded lettuce.',
            'Place tandoori burger patty in center.',
            'Add sliced onions and tomatoes.',
            'Drizzle mint chutney.',
            'Sprinkle chaat masala.',
            'Roll tortillas tightly into wraps.',
            'Grill wraps until crisp and serve.'
        ],
        tips: [
            'Add sliced cucumbers for crunch',
            'Use different chutneys',
            'Make it spicy with green chilies',
            'Serve with potato wedges'
        ],
        nutrition: {
            calories: '350 kcal',
            carbs: '32g',
            protein: '18g',
            fat: '16g'
        }
    },
    16: {
        title: 'Veggie Sandwich',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/dbHuCXg0fKg?si=0br1FgrFIElLfYSO',
        time: '15 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Sandwich', 'Healthy', 'Vegetarian', 'Quick'],
        ingredients: [
            '2 HyFun Burger Patties',
            '4 slices bread',
            '2 lettuce leaves',
            '1 tomato, sliced',
            '1 cucumber, sliced',
            '1 onion, sliced',
            '2 tbsp mayonnaise',
            '1 tbsp mustard sauce',
            '2 cheese slices',
            'Butter for toasting'
        ],
        instructions: [
            'Cook HyFun Burger Patties as per instructions.',
            'Toast bread slices with butter until golden.',
            'Spread mayonnaise on one slice, mustard on another.',
            'Place lettuce leaf on bread.',
            'Add cooked burger patty.',
            'Place cheese slice on patty.',
            'Add tomato, cucumber, and onion slices.',
            'Cover with second bread slice.',
            'Cut diagonally and serve.'
        ],
        tips: [
            'Add avocado slices for creaminess',
            'Use whole wheat bread',
            'Add sprouts for nutrition',
            'Serve with tomato soup'
        ],
        nutrition: {
            calories: '320 kcal',
            carbs: '30g',
            protein: '15g',
            fat: '14g'
        }
    },
    17: {
        title: 'French Fry Grilled Cheese',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/LZ67tlLmTVU?si=F2bFCuIkbu7Lrco_',
        time: '12 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Sandwich', 'Cheesy', 'Fusion', 'Quick'],
        ingredients: [
            '1 cup HyFun French Fries',
            '4 slices bread',
            '4 cheese slices',
            '2 tbsp butter',
            '1 tbsp mayonnaise',
            '1 tsp garlic powder',
            '1/2 tsp black pepper'
        ],
        instructions: [
            'Cook HyFun French Fries until crispy.',
            'Butter one side of each bread slice.',
            'Place cheese slice on unbuttered side.',
            'Add crispy french fries on cheese.',
            'Add another cheese slice.',
            'Cover with second bread slice, buttered side out.',
            'Grill on skillet until golden and cheese melts.',
            'Cut diagonally and serve hot.'
        ],
        tips: [
            'Add bacon for extra flavor',
            'Use different cheese varieties',
            'Add tomato slices inside',
            'Serve with ketchup'
        ],
        nutrition: {
            calories: '380 kcal',
            carbs: '35g',
            protein: '15g',
            fat: '20g'
        }
    },
    18: {
        title: 'Aloo Tikki Bao',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/VonSgEfDY60?si=7bQm7yX8O9E8n-Hf',
        time: '20 minutes',
        servings: '4 servings',
        difficulty: 'Medium',
        tags: ['Asian', 'Fusion', 'Vegetarian', 'Steamed'],
        ingredients: [
            '4 HyFun Aloo Tikki',
            '4 bao buns (steamed buns)',
            '1/4 cup hoisin sauce',
            '1/4 cup sliced cucumbers',
            '1/4 cup shredded carrots',
            '2 tbsp sliced spring onions',
            '1 tbsp sesame seeds',
            '1 tbsp soy sauce',
            '1 tsp chili oil'
        ],
        instructions: [
            'Steam bao buns as per package instructions.',
            'Cook HyFun Aloo Tikki until crispy.',
            'Slice bao buns open, keeping one side attached.',
            'Spread hoisin sauce inside buns.',
            'Place crispy Aloo Tikki inside.',
            'Add sliced cucumbers and shredded carrots.',
            'Sprinkle sliced spring onions.',
            'Drizzle soy sauce and chili oil.',
            'Garnish with sesame seeds.',
            'Serve immediately.'
        ],
        tips: [
            'Add pickled vegetables',
            'Use different Asian sauces',
            'Make it spicy with Sriracha',
            'Serve with miso soup'
        ],
        nutrition: {
            calories: '280 kcal',
            carbs: '38g',
            protein: '8g',
            fat: '10g'
        }
    },
    19: {
        title: 'Ragda Patties',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/9ORluDj_aJ0?si=OZ_bseaUkRQFS0x0',
        time: '25 minutes',
        servings: '4 servings',
        difficulty: 'Medium',
        tags: ['Indian', 'Chaat', 'Street Food', 'Vegetarian'],
        ingredients: [
            '4 HyFun Aloo Tikki',
            '1 cup white peas, soaked overnight',
            '1 onion, chopped',
            '1 tomato, chopped',
            '1 tsp ginger-garlic paste',
            '1 tsp turmeric powder',
            '1 tsp red chili powder',
            '1 tsp garam masala',
            '2 tbsp oil',
            'Coriander for garnish'
        ],
        instructions: [
            'Pressure cook white peas until soft.',
            'Heat oil, sauté onions until golden.',
            'Add ginger-garlic paste, sauté.',
            'Add tomatoes, cook until soft.',
            'Add spices and cooked white peas.',
            'Simmer for 10 minutes to make ragda.',
            'Cook HyFun Aloo Tikki until crispy.',
            'Place tikkis on serving plate.',
            'Pour hot ragda over tikkis.',
            'Garnish with coriander and serve.'
        ],
        tips: [
            'Add tamarind chutney for tang',
            'Top with sev and onions',
            'Make it spicy as per taste',
            'Serve with pav'
        ],
        nutrition: {
            calories: '320 kcal',
            carbs: '42g',
            protein: '12g',
            fat: '12g'
        }
    },
    20: {
        title: 'Kung Pao Poppers',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/G-3saDM--II?si=H6Gc04Y46YRFRpmV',
        time: '15 minutes',
        servings: '2 servings',
        difficulty: 'Medium',
        tags: ['Chinese', 'Spicy', 'Appetizer', 'Vegetarian'],
        ingredients: [
            '10-12 HyFun Chilli Garlic Poppers',
            '2 tbsp oil',
            '1/4 cup peanuts',
            '2-3 dried red chilies',
            '1 bell pepper, cubed',
            '1 onion, cubed',
            '2 tbsp soy sauce',
            '1 tbsp vinegar',
            '1 tbsp sugar',
            '1 tsp cornstarch'
        ],
        instructions: [
            'Cook HyFun Chilli Garlic Poppers as per instructions.',
            'Heat oil in wok, add dried red chilies.',
            'Add peanuts, roast until golden.',
            'Add onions and bell peppers, stir fry.',
            'Add cooked poppers to wok.',
            'Mix soy sauce, vinegar, sugar, cornstarch with water.',
            'Pour sauce over poppers and vegetables.',
            'Toss until well coated and sauce thickens.',
            'Serve hot garnished with spring onions.'
        ],
        tips: [
            'Add other vegetables like broccoli',
            'Adjust spice level as needed',
            'Serve with steamed rice',
            'Add sesame oil for flavor'
        ],
        nutrition: {
            calories: '280 kcal',
            carbs: '22g',
            protein: '10g',
            fat: '18g'
        }
    },
    21: {
        title: 'Stir-Fried Poppers with Veggies',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/_mgvuHZHp0g?si=lBFnyCOmb2319juw',
        time: '12 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Chinese', 'Stir Fry', 'Quick', 'Vegetarian'],
        ingredients: [
            '10-12 HyFun Chilli Garlic Poppers',
            '2 tbsp oil',
            '1 cup mixed vegetables (carrots, beans, corn)',
            '1 onion, sliced',
            '1 capsicum, sliced',
            '2 tbsp soy sauce',
            '1 tbsp chili sauce',
            '1 tsp ginger-garlic paste',
            '1 tsp sugar',
            'Spring onions for garnish'
        ],
        instructions: [
            'Cook HyFun Chilli Garlic Poppers as per package.',
            'Heat oil in wok or pan.',
            'Add ginger-garlic paste, sauté.',
            'Add onions, stir fry until translucent.',
            'Add mixed vegetables, stir fry for 3-4 minutes.',
            'Add cooked poppers to vegetables.',
            'Add soy sauce, chili sauce, sugar.',
            'Toss everything together for 2 minutes.',
            'Garnish with spring onions.',
            'Serve hot.'
        ],
        tips: [
            'Add mushrooms for extra flavor',
            'Use different vegetables',
            'Adjust sauces as per taste',
            'Serve with noodles or rice'
        ],
        nutrition: {
            calories: '250 kcal',
            carbs: '20g',
            protein: '8g',
            fat: '15g'
        }
    },
    22: {
        title: 'Schezwan Rice Bowl',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/NOz5bjbc9IE?si=haTUlw0jKJT9SLkW',
        time: '20 minutes',
        servings: '2 servings',
        difficulty: 'Medium',
        tags: ['Chinese', 'Rice Bowl', 'Spicy', 'One Pot'],
        ingredients: [
            '10-12 HyFun Chilli Garlic Poppers',
            '2 cups cooked rice',
            '1 cup mixed vegetables',
            '1 onion, chopped',
            '2 tbsp Schezwan sauce',
            '1 tbsp soy sauce',
            '1 tsp vinegar',
            '2 tbsp oil',
            '1 egg (optional)',
            'Spring onions for garnish'
        ],
        instructions: [
            'Cook HyFun Chilli Garlic Poppers as per package.',
            'Heat oil in wok, scramble egg if using.',
            'Add onions, sauté until golden.',
            'Add mixed vegetables, stir fry.',
            'Add cooked poppers to vegetables.',
            'Add Schezwan sauce, soy sauce, vinegar.',
            'Add cooked rice, mix everything well.',
            'Cook for 3-4 minutes, stirring occasionally.',
            'Garnish with spring onions.',
            'Serve hot.'
        ],
        tips: [
            'Add tofu for protein',
            'Use brown rice for health',
            'Adjust Schezwan sauce spice level',
            'Add sesame seeds for garnish'
        ],
        nutrition: {
            calories: '350 kcal',
            carbs: '48g',
            protein: '12g',
            fat: '12g'
        }
    },
    23: {
        title: 'Cheesy Garlic Baked Poppers',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/j5Vii9oYzM8?si=YGSXFGsfMwDWLT-S',
        time: '18 minutes',
        servings: '4 servings',
        difficulty: 'Easy',
        tags: ['Baked', 'Cheesy', 'Garlic', 'Appetizer'],
        ingredients: [
            '15-20 HyFun Chilli Garlic Poppers',
            '1 cup shredded mozzarella',
            '1/2 cup grated parmesan',
            '1/4 cup cream cheese',
            '2 tbsp butter',
            '4 garlic cloves, minced',
            '1 tsp dried oregano',
            '1 tsp chili flakes',
            '2 tbsp chopped parsley'
        ],
        instructions: [
            'Preheat oven to 200°C (390°F).',
            'Cook HyFun Chilli Garlic Poppers as per package.',
            'In a bowl, mix mozzarella, parmesan, cream cheese.',
            'Melt butter with minced garlic.',
            'Add garlic butter to cheese mixture.',
            'Add oregano and chili flakes.',
            'Place cooked poppers in baking dish.',
            'Spread cheese mixture over poppers.',
            'Bake for 8-10 minutes until cheese melts.',
            'Garnish with parsley and serve.'
        ],
        tips: [
            'Add breadcrumbs for crunch',
            'Use different cheese blends',
            'Add cooked pasta for casserole',
            'Serve with garlic bread'
        ],
        nutrition: {
            calories: '320 kcal',
            carbs: '18g',
            protein: '15g',
            fat: '22g'
        }
    },
    24: {
        title: 'Sticky Sesame Poppers',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/C_VdpC53k-s?si=bzQYBEnc9XFIn1J8',
        time: '15 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Asian', 'Sweet', 'Sticky', 'Appetizer'],
        ingredients: [
            '10-12 HyFun Chilli Garlic Poppers',
            '2 tbsp sesame oil',
            '3 tbsp honey',
            '2 tbsp soy sauce',
            '1 tbsp rice vinegar',
            '1 tsp ginger, grated',
            '1 garlic clove, minced',
            '2 tbsp sesame seeds',
            'Spring onions for garnish'
        ],
        instructions: [
            'Cook HyFun Chilli Garlic Poppers as per package.',
            'In a pan, heat sesame oil.',
            'Add ginger and garlic, sauté briefly.',
            'Add honey, soy sauce, rice vinegar.',
            'Cook until sauce thickens slightly.',
            'Add cooked poppers to sauce.',
            'Toss until well coated.',
            'Sprinkle sesame seeds.',
            'Garnish with spring onions.',
            'Serve hot.'
        ],
        tips: [
            'Add chili flakes for heat',
            'Use maple syrup instead of honey',
            'Toast sesame seeds for flavor',
            'Serve as appetizer'
        ],
        nutrition: {
            calories: '280 kcal',
            carbs: '25g',
            protein: '8g',
            fat: '16g'
        }
    },
    25: {
        title: 'Jalapeno Cheese Popper Skewers',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/U-6onm1uezA?si=qPK8c2VaYijpyU1G',
        time: '20 minutes',
        servings: '4 servings',
        difficulty: 'Medium',
        tags: ['Grilled', 'Skewers', 'Party', 'Appetizer'],
        ingredients: [
            '15-20 HyFun Jalapeno Cheese Poppers',
            '1 bell pepper, cubed',
            '1 onion, cubed',
            '1 zucchini, sliced',
            '2 tbsp olive oil',
            '1 tsp garlic powder',
            '1 tsp paprika',
            '1/2 tsp black pepper',
            'Wooden skewers, soaked'
        ],
        instructions: [
            'Soak wooden skewers in water for 30 minutes.',
            'Cook HyFun Jalapeno Cheese Poppers as per package.',
            'Thread poppers alternating with vegetables on skewers.',
            'Mix olive oil with garlic powder, paprika, black pepper.',
            'Brush oil mixture on skewers.',
            'Grill skewers for 3-4 minutes each side.',
            'Or bake at 200°C for 10-12 minutes.',
            'Brush with more oil while cooking.',
            'Serve hot with dipping sauce.'
        ],
        tips: [
            'Add cherry tomatoes',
            'Use different vegetables',
            'Make different marinades',
            'Serve as party appetizer'
        ],
        nutrition: {
            calories: '220 kcal',
            carbs: '15g',
            protein: '8g',
            fat: '14g'
        }
    },
    26: {
        title: 'Alfredo Spicy Noodles',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/Wohh8XOnnnE?si=QrcZ9AKhUcJIMIEl',
        time: '15 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Pasta', 'Italian', 'Creamy', 'Spicy'],
        ingredients: [
            '10-12 HyFun Jalapeno Cheese Poppers',
            '200g spaghetti or noodles',
            '1 cup Alfredo sauce',
            '1/4 cup milk or cream',
            '2 tbsp butter',
            '3 garlic cloves, minced',
            '1/2 tsp red chili flakes',
            '1/4 cup grated parmesan',
            'Parsley for garnish'
        ],
        instructions: [
            'Cook noodles as per package instructions.',
            'Cook HyFun Jalapeno Cheese Poppers as per package.',
            'In a pan, melt butter, add garlic.',
            'Add Alfredo sauce and milk, heat through.',
            'Add cooked noodles to sauce.',
            'Add cooked poppers to noodles.',
            'Add red chili flakes.',
            'Toss everything together.',
            'Garnish with parmesan and parsley.',
            'Serve hot.'
        ],
        tips: [
            'Add cooked chicken for protein',
            'Use different pasta shapes',
            'Add vegetables like broccoli',
            'Adjust creaminess as desired'
        ],
        nutrition: {
            calories: '420 kcal',
            carbs: '45g',
            protein: '15g',
            fat: '22g'
        }
    },
    27: {
        title: 'Desi Chaat with Sabudana Patty',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/4SeSEVyu_Dw?si=O_mqSpXA9C8uXI3T',
        time: '20 minutes',
        servings: '4 servings',
        difficulty: 'Medium',
        tags: ['Indian', 'Chaat', 'Street Food', 'Vegetarian'],
        ingredients: [
            '4 HyFun Sabudana Patties',
            '1 cup boiled chickpeas',
            '1 cup boiled potatoes, cubed',
            '1/2 cup sweet tamarind chutney',
            '1/2 cup green chutney',
            '1/2 cup beaten yogurt',
            '1/4 cup sev',
            '1 onion, finely chopped',
            '1 tomato, finely chopped',
            'Coriander for garnish'
        ],
        instructions: [
            'Cook HyFun Sabudana Patties until crispy.',
            'Break patties into bite-sized pieces.',
            'In a large bowl, mix chickpeas and potatoes.',
            'Add sabudana patty pieces.',
            'Add both chutneys and yogurt.',
            'Add chopped onions and tomatoes.',
            'Mix everything gently.',
            'Top with generous amount of sev.',
            'Garnish with coriander.',
            'Serve immediately.'
        ],
        tips: [
            'Add pomegranate seeds for color',
            'Use different types of sev',
            'Make it spicy with green chilies',
            'Serve in individual bowls'
        ],
        nutrition: {
            calories: '280 kcal',
            carbs: '38g',
            protein: '10g',
            fat: '12g'
        }
    },
    28: {
        title: 'Crispy Veggie Stix Hot Dog',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/YSs3E4anIKg?si=Ed7H8EYNAt2-09qB',
        time: '12 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['American', 'Hot Dog', 'Crispy', 'Quick'],
        ingredients: [
            '4-6 HyFun Veggie Stix',
            '2 hot dog buns',
            '2 tbsp mayonnaise',
            '1 tbsp mustard sauce',
            '1 tbsp ketchup',
            '1 onion, finely chopped',
            '1 tomato, finely chopped',
            '2 cheese slices',
            'Butter for toasting'
        ],
        instructions: [
            'Cook HyFun Veggie Stix until extra crispy.',
            'Toast hot dog buns with butter.',
            'Spread mayonnaise on one side of bun.',
            'Place crispy veggie stix in bun.',
            'Add cheese slice on top.',
            'Add chopped onions and tomatoes.',
            'Drizzle mustard and ketchup.',
            'Close bun and serve.'
        ],
        tips: [
            'Add relishes for extra flavor',
            'Use different sauces',
            'Add jalapenos for spice',
            'Serve with potato chips'
        ],
        nutrition: {
            calories: '280 kcal',
            carbs: '30g',
            protein: '8g',
            fat: '14g'
        }
    },
    29: {
        title: 'Crunchy Taco with Jalapeño Poppers',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/cTWcfU79bQ8?si=Vl7JdJVKoRoG5sdS',
        time: '15 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Mexican', 'Taco', 'Crunchy', 'Spicy'],
        ingredients: [
            '6-8 HyFun Jalapeno Cheese Poppers',
            '4 taco shells',
            '1 cup shredded lettuce',
            '1/2 cup diced tomatoes',
            '1/4 cup shredded cheese',
            '1/4 cup sour cream',
            '1/4 cup salsa',
            '1 avocado, sliced',
            'Lime wedges for serving'
        ],
        instructions: [
            'Cook HyFun Jalapeno Cheese Poppers as per package.',
            'Warm taco shells as per package.',
            'Place shredded lettuce in taco shells.',
            'Add cooked poppers to each taco.',
            'Add diced tomatoes and avocado slices.',
            'Sprinkle shredded cheese.',
            'Top with sour cream and salsa.',
            'Serve with lime wedges.',
            'Optional: Add hot sauce for extra spice.'
        ],
        tips: [
            'Add ground meat for non-veg version',
            'Use soft tortillas if preferred',
            'Make your own salsa',
            'Serve with Mexican rice'
        ],
        nutrition: {
            calories: '320 kcal',
            carbs: '28g',
            protein: '10g',
            fat: '20g'
        }
    },
    30: {
        title: 'Veggie Stix Burrito',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/8VgYNMsL32E?si=clTydVDJuEjAR-_A',
        time: '18 minutes',
        servings: '2 servings',
        difficulty: 'Medium',
        tags: ['Mexican', 'Burrito', 'Hearty', 'Vegetarian'],
        ingredients: [
            '8-10 HyFun Veggie Stix',
            '2 large flour tortillas',
            '1 cup cooked rice',
            '1 cup black beans',
            '1 cup shredded cheese',
            '1/2 cup salsa',
            '1/4 cup sour cream',
            '1 avocado, sliced',
            '1/4 cup chopped coriander'
        ],
        instructions: [
            'Cook HyFun Veggie Stix until crispy.',
            'Warm tortillas on skillet.',
            'Spread cooked rice in center of tortilla.',
            'Add black beans and crispy veggie stix.',
            'Add shredded cheese and avocado slices.',
            'Add salsa and sour cream.',
            'Sprinkle chopped coriander.',
            'Fold sides of tortilla, then roll tightly.',
            'Grill burrito until golden.',
            'Cut in half and serve.'
        ],
        tips: [
            'Add guacamole for creaminess',
            'Use different beans',
            'Make it spicy with jalapenos',
            'Serve with tortilla chips'
        ],
        nutrition: {
            calories: '450 kcal',
            carbs: '55g',
            protein: '15g',
            fat: '20g'
        }
    },
    31: {
        title: 'Aloo Cheese Frankie',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/sMWZFYKTQuE?si=HAvb1M6Pd81VY6qg',
        time: '15 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Indian', 'Wrap', 'Street Food', 'Vegetarian'],
        ingredients: [
            '6-8 HyFun Potatobets',
            '2 large chapati or tortillas',
            '1/2 cup shredded cheese',
            '1 onion, sliced',
            '1 tomato, sliced',
            '2 tbsp green chutney',
            '2 tbsp tomato ketchup',
            '1 tsp chaat masala',
            'Butter for cooking'
        ],
        instructions: [
            'Cook HyFun Potatobets until crispy.',
            'Warm chapati or tortillas on tawa.',
            'Spread green chutney on one side.',
            'Place crispy potatobets in center.',
            'Add sliced onions and tomatoes.',
            'Sprinkle shredded cheese.',
            'Drizzle tomato ketchup.',
            'Sprinkle chaat masala.',
            'Roll tightly into frankie.',
            'Grill with butter and serve.'
        ],
        tips: [
            'Add different chutneys',
            'Use different vegetables',
            'Make it spicy with green chilies',
            'Serve with potato chips'
        ],
        nutrition: {
            calories: '320 kcal',
            carbs: '35g',
            protein: '10g',
            fat: '16g'
        }
    },
    32: {
        title: 'Cheesy Vegetable Quesadilla',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/l3hieG2kXLI?si=9DG1GGh0rB1lnG7e',
        time: '12 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Mexican', 'Quesadilla', 'Cheesy', 'Quick'],
        ingredients: [
            '6-8 HyFun Jalapeno Cheese Poppers',
            '2 large flour tortillas',
            '1 cup shredded cheese blend',
            '1/2 bell pepper, sliced',
            '1/2 onion, sliced',
            '1/4 cup corn kernels',
            '2 tbsp butter',
            'Salsa and sour cream for serving'
        ],
        instructions: [
            'Cook HyFun Jalapeno Cheese Poppers as per package.',
            'Place one tortilla on skillet.',
            'Sprinkle half cheese on tortilla.',
            'Add cooked poppers, bell peppers, onions, corn.',
            'Sprinkle remaining cheese.',
            'Cover with second tortilla.',
            'Cook until bottom is golden, flip carefully.',
            'Cook other side until golden and cheese melts.',
            'Cut into wedges.',
            'Serve with salsa and sour cream.'
        ],
        tips: [
            'Add different vegetables',
            'Use different cheese varieties',
            'Add cooked chicken for non-veg',
            'Serve with guacamole'
        ],
        nutrition: {
            calories: '380 kcal',
            carbs: '32g',
            protein: '15g',
            fat: '22g'
        }
    },
    33: {
        title: 'Kimchi Veggie Stix',
        image: './assets/image/hyfunrlogo.png',
        youtube: 'https://youtu.be/ZGqVyUoZ5dM?si=_FfI7fbvXIlGtnl8',
        time: '15 minutes',
        servings: '2 servings',
        difficulty: 'Easy',
        tags: ['Korean', 'Fusion', 'Spicy', 'Quick'],
        ingredients: [
            '8-10 HyFun Veggie Stix',
            '1 cup kimchi, chopped',
            '1 onion, sliced',
            '1 bell pepper, sliced',
            '2 tbsp gochujang (Korean chili paste)',
            '1 tbsp soy sauce',
            '1 tsp sesame oil',
            '1 tsp sugar',
            'Sesame seeds for garnish',
            'Spring onions for garnish'
        ],
        instructions: [
            'Cook HyFun Veggie Stix until crispy.',
            'Heat sesame oil in pan.',
            'Add onions, sauté until translucent.',
            'Add bell peppers, stir fry for 2 minutes.',
            'Add chopped kimchi, cook for 2 minutes.',
            'Add gochujang, soy sauce, sugar.',
            'Add crispy veggie stix to pan.',
            'Toss everything together for 2 minutes.',
            'Garnish with sesame seeds and spring onions.',
            'Serve hot.'
        ],
        tips: [
            'Adjust gochujang for spice level',
            'Add other vegetables',
            'Serve with steamed rice',
            'Add tofu for protein'
        ],
        nutrition: {
            calories: '250 kcal',
            carbs: '22g',
            protein: '6g',
            fat: '15g'
        }
    }
};
    
    return recipes[recipeId] || recipes[1];
}

/* Share recipe function */
function shareRecipe(recipeId) {
    const recipe = getRecipeData(recipeId);
    
    if (navigator.share) {
        navigator.share({
            title: recipe.title,
            text: `Check out this delicious ${recipe.title} recipe from HyFun Foods!`,
            url: window.location.href
        })
        .then(() => console.log('Shared successfully'))
        .catch(error => console.log('Sharing failed:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${recipe.title} from HyFun Foods!`)}&url=${encodeURIComponent(window.location.href)}&hashtags=HyFunRecipes`;
        window.open(shareUrl, '_blank');
    }
}

/* Utility function to filter by category */
function filterByCategory(category) {
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
    if (filterBtn) {
        filterBtn.click();
    }
}