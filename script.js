// NES.css Link Tree JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle')
    const body = document.body
    const icon = themeToggle.querySelector('i')

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme)
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme')
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        
        body.setAttribute('data-theme', newTheme)
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'
        
        localStorage.setItem('theme', newTheme)
        
        // Add a flash effect when changing themes
        const flash = document.createElement('div')
        flash.className = 'theme-flash'
        body.appendChild(flash)
        
        setTimeout(() => {
            flash.remove()
        }, 300)
    })

    // Ripple effect on link cards
    const linkCards = document.querySelectorAll('.link-card')
    
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect()
            const size = Math.max(rect.width, rect.height)
            
            const ripple = document.createElement('span')
            ripple.className = 'ripple'
            ripple.style.width = ripple.style.height = `${size}px`
            ripple.style.left = `${e.clientX - rect.left - size/2}px`
            ripple.style.top = `${e.clientY - rect.top - size/2}px`
            
            this.appendChild(ripple)
            
            setTimeout(() => {
                ripple.remove()
            }, 600)
        })
    })

    // Optional: Add hover sound effect
    /*
    const hoverSound = new Audio('hover.mp3');
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
    */

    // Analytics tracking (optional)
    linkCards.forEach(card => {
        card.addEventListener('click', function() {
            const linkName = this.querySelector('span').textContent
            console.log(`Link clicked: ${linkName}`)
            // Add your analytics tracking code here
        })
    })
    
    // Add scanline animation that doesn't go over the main container
    const scanline = document.createElement('div')
    scanline.className = 'scanline'
    body.appendChild(scanline)
    
    // Create a mask for the scanline to not go over the main container
    const container = document.querySelector('.nes-container')
    const containerRect = container.getBoundingClientRect()
    
    // Update scanline position on scroll and resize
    window.addEventListener('scroll', updateScanlinePosition)
    window.addEventListener('resize', updateScanlinePosition)
    
    function updateScanlinePosition() {
        const containerRect = container.getBoundingClientRect()
        const scanlineTop = scanline.getBoundingClientRect().top
        
        // If scanline is within the container's vertical range, hide it
        if (scanlineTop >= containerRect.top && scanlineTop <= containerRect.bottom) {
            scanline.style.opacity = '0'
        } else {
            scanline.style.opacity = '1'
        }
    }
    
    // Add glitch effect on hover for link cards
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('glitch')
            setTimeout(() => {
                this.classList.remove('glitch')
            }, 500)
        })
    })
})
