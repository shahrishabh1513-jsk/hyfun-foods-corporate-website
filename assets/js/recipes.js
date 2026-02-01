/* ============================================
   RECIPES PAGE JAVASCRIPT
   ============================================ */

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
            title: 'Loaded Cheese Fries Supreme',
            image: './assets/image/french_fries.png',
            time: '15 minutes',
            servings: '4 servings',
            difficulty: 'Easy',
            tags: ['Party Snack', 'Cheesy', 'American'],
            ingredients: [
                '1 pack HyFun French Fries',
                '1 cup shredded mozzarella cheese',
                '1/2 cup shredded cheddar cheese',
                '2 jalapeños, sliced',
                '1/4 cup sour cream',
                '2 spring onions, chopped',
                '1/4 cup bacon bits (optional)',
                '2 tbsp olive oil',
                'Salt and pepper to taste'
            ],
            instructions: [
                'Preheat oven to 220°C (430°F).',
                'Spread HyFun French Fries on a baking tray in a single layer.',
                'Drizzle with olive oil and season with salt and pepper.',
                'Bake for 12-15 minutes until golden and crispy.',
                'Remove from oven and sprinkle both cheeses evenly over the fries.',
                'Return to oven for 2-3 minutes until cheese is melted.',
                'Top with jalapeños, spring onions, and bacon bits.',
                'Dollop sour cream on top and serve immediately.'
            ],
            tips: [
                'For extra crispiness, air fry at 200°C for 10 minutes',
                'Add chopped cilantro for freshness',
                'Serve immediately for best texture',
                'You can use any HyFun potato product as base'
            ],
            nutrition: {
                calories: '420 kcal',
                carbs: '38g',
                protein: '15g',
                fat: '22g'
            }
        },
        2: {
            title: 'Aloo Tikki Burger Deluxe',
            image: './assets/image/Aloo_Tikki.png',
            time: '20 minutes',
            servings: '2 servings',
            difficulty: 'Medium',
            tags: ['Indian', 'Burger', 'Street Food'],
            ingredients: [
                '2 HyFun Aloo Tikki patties',
                '2 burger buns',
                '1 tomato, sliced',
                '1 onion, sliced',
                '4 lettuce leaves',
                '2 tbsp mayonnaise',
                '1 tbsp mint chutney',
                '1 tbsp tomato ketchup',
                '2 slices cheese (optional)',
                'Butter for toasting'
            ],
            instructions: [
                'Cook HyFun Aloo Tikki according to package instructions.',
                'Meanwhile, slice the burger buns in half and toast lightly with butter.',
                'Prepare the sauces: mix mayonnaise with mint chutney.',
                'Spread the mint-mayo sauce on the bottom bun.',
                'Place lettuce leaves on the sauce.',
                'Add a HyFun Aloo Tikki patty on top.',
                'Layer with tomato and onion slices.',
                'Add cheese slice if using.',
                'Drizzle tomato ketchup on the top bun.',
                'Close the burger and serve hot.'
            ],
            tips: [
                'Add sliced cucumbers for extra crunch',
                'Use whole wheat buns for healthier option',
                'Make it spicy with green chili slices',
                'Serve with sweet potato fries on the side'
            ],
            nutrition: {
                calories: '380 kcal',
                carbs: '42g',
                protein: '18g',
                fat: '16g'
            }
        },
        3: {
            title: 'Gourmet Veggie Burger',
            image: './assets/image/veg_burger_patties.png',
            time: '25 minutes',
            servings: '2 servings',
            difficulty: 'Easy',
            tags: ['Healthy', 'Vegetarian', 'Gourmet'],
            ingredients: [
                '2 HyFun Veg Burger Patties',
                '2 whole wheat burger buns',
                '1 avocado, sliced',
                '1/2 red onion, sliced',
                'Handful of arugula',
                '2 tbsp hummus',
                '1 tbsp sriracha sauce',
                '1 tbsp olive oil',
                'Salt and pepper to taste'
            ],
            instructions: [
                'Cook HyFun Veg Burger Patties according to package instructions.',
                'Toast the burger buns until lightly golden.',
                'Spread hummus on the bottom bun.',
                'Layer with arugula and red onion slices.',
                'Place the cooked veggie patty on top.',
                'Add avocado slices.',
                'Drizzle with sriracha sauce.',
                'Season with salt and pepper.',
                'Close the burger and serve.'
            ],
            tips: [
                'Add sprouts for extra nutrition',
                'Use guacamole instead of plain avocado',
                'Grill the buns for smoky flavor',
                'Add pickled onions for tanginess'
            ],
            nutrition: {
                calories: '320 kcal',
                carbs: '35g',
                protein: '22g',
                fat: '12g'
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