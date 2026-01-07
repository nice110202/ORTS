// LRMS System JavaScript - Updated with All Latest Changes

// Global function to toggle the desktop sidebar
function toggleSidebar(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const btn = document.getElementById('sidebar-toggle');

    if (!sidebar || !btn) return;

    // Prevent rapid double toggles
    if (toggleSidebar._lock) return;
    toggleSidebar._lock = true;
    setTimeout(() => { toggleSidebar._lock = false; }, 450); // Slightly longer than animation

    const isHidden = sidebar.classList.contains('hidden');

    if (isHidden) {
        // Show sidebar with smooth animation
        // Force layout recalculation to enable CSS transition
        sidebar.style.display = 'block';
        void sidebar.offsetWidth; // Trigger reflow

        sidebar.classList.remove('hidden');
        mainContent?.classList.remove('fullwidth');

        // Save state
        localStorage.setItem('sidebarHidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
    } else {
        // Hide sidebar with smooth animation
        sidebar.classList.add('hidden');
        mainContent?.classList.add('fullwidth');

        // Hide display after animation completes
        setTimeout(() => {
            if (sidebar.classList.contains('hidden')) {
                sidebar.style.display = 'block'; // Keep visible for transform to work
            }
        }, 450);

        // Save state
        localStorage.setItem('sidebarHidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
    }
}

// Ensure function is available globally
window.toggleSidebar = toggleSidebar;

document.addEventListener('DOMContentLoaded', function () {
    // =====================
    // MOBILE SIDEBAR TOGGLE WITH ANIMATIONS
    // =====================

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeMobileSidebar = document.getElementById('close-mobile-sidebar');

    function openMobileSidebar() {
        // Show overlay with fade and blur
        sidebarOverlay.classList.remove('opacity-0', 'pointer-events-none');
        sidebarOverlay.classList.add('opacity-100', 'pointer-events-auto');

        // Slide in sidebar
        mobileSidebar.classList.remove('-translate-x-full');
        mobileSidebar.classList.add('translate-x-0');

        // Animate menu items with stagger effect
        const menuItems = mobileSidebar.querySelectorAll('nav a, nav > div');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50 + (index * 30));
        });

        // Animate header
        const header = mobileSidebar.querySelector('.sidebar-header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                header.style.transition = 'all 0.3s ease-out';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    function closeMobileSidebarFn() {
        // Hide overlay with fade
        sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
        sidebarOverlay.classList.remove('opacity-100', 'pointer-events-auto');

        // Slide out sidebar
        mobileSidebar.classList.add('-translate-x-full');
        mobileSidebar.classList.remove('translate-x-0');

        // Restore body scroll
        document.body.style.overflow = '';
    }

    mobileMenuBtn?.addEventListener('click', openMobileSidebar);
    closeMobileSidebar?.addEventListener('click', closeMobileSidebarFn);
    sidebarOverlay?.addEventListener('click', closeMobileSidebarFn);

    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileSidebar && !mobileSidebar.classList.contains('-translate-x-full')) {
            closeMobileSidebarFn();
        }
    });

    // Desktop sidebar should only be toggled via the toggle button
    // Auto-close on outside click has been removed to prevent unwanted behavior

    // =====================
    // DESKTOP SIDEBAR TOGGLE
    // =====================

    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    // Load sidebar hidden state from localStorage (new behavior: hide sidebar and expand main content)
    const sidebarHidden = localStorage.getItem('sidebarHidden') === 'true';
    if (sidebarHidden && sidebar) {
        sidebar.classList.add('hidden');
        mainContent?.classList.add('fullwidth');
    }

    // NOTE: Desktop sidebar toggle is handled by the inline script in the template
    // to allow deterministic animation order and avoid duplicate toggles.

    // =====================
    // DARK MODE TOGGLE
    // =====================

    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load theme from localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.classList.add('dark');
        updateThemeIcon(true);
    }

    themeToggle?.addEventListener('click', function () {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        const darkIcon = document.querySelector('.dark-mode-icon');
        const lightIcon = document.querySelector('.light-mode-icon');

        if (isDark) {
            darkIcon?.classList.add('hidden');
            lightIcon?.classList.remove('hidden');
        } else {
            darkIcon?.classList.remove('hidden');
            lightIcon?.classList.add('hidden');
        }
    }

    // =====================
    // FULLSCREEN TOGGLE
    // =====================

    window.toggleFullscreen = function () {
        const fullscreenIcon = document.getElementById('fullscreen-icon');

        if (!document.fullscreenElement) {
            // Enter fullscreen
            document.documentElement.requestFullscreen().then(() => {
                if (fullscreenIcon) {
                    fullscreenIcon.classList.remove('bi-fullscreen');
                    fullscreenIcon.classList.add('bi-fullscreen-exit');
                }
            }).catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            // Exit fullscreen
            document.exitFullscreen().then(() => {
                if (fullscreenIcon) {
                    fullscreenIcon.classList.remove('bi-fullscreen-exit');
                    fullscreenIcon.classList.add('bi-fullscreen');
                }
            }).catch(err => {
                console.error('Error attempting to exit fullscreen:', err);
            });
        }
    };

    // Listen for fullscreen changes (e.g., user pressing ESC)
    document.addEventListener('fullscreenchange', function () {
        const fullscreenIcon = document.getElementById('fullscreen-icon');
        if (fullscreenIcon) {
            if (document.fullscreenElement) {
                fullscreenIcon.classList.remove('bi-fullscreen');
                fullscreenIcon.classList.add('bi-fullscreen-exit');
            } else {
                fullscreenIcon.classList.remove('bi-fullscreen-exit');
                fullscreenIcon.classList.add('bi-fullscreen');
            }
        }
    });


    // =====================
    // DROPDOWN TOGGLES
    // =====================

    const notificationsBtn = document.getElementById('notifications-btn');
    const notificationsDropdown = document.getElementById('notifications-dropdown');
    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    notificationsBtn?.addEventListener('click', function (e) {
        e.stopPropagation();
        notificationsDropdown?.classList.toggle('hidden');
        profileDropdown?.classList.add('hidden');
    });

    profileBtn?.addEventListener('click', function (e) {
        e.stopPropagation();
        profileDropdown?.classList.toggle('hidden');
        notificationsDropdown?.classList.add('hidden');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function () {
        notificationsDropdown?.classList.add('hidden');
        profileDropdown?.classList.add('hidden');
    });

    // =====================
    // DRAG TO SCROLL
    // =====================

    class DragScroll {
        constructor(element) {
            this.element = element;
            this.isDown = false;
            this.startX = 0;
            this.scrollLeft = 0;

            this.init();
        }

        init() {
            this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
            this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
            this.element.addEventListener('mouseup', this.onMouseUp.bind(this));
            this.element.addEventListener('mousemove', this.onMouseMove.bind(this));

            // Touch support
            this.element.addEventListener('touchstart', this.onTouchStart.bind(this));
            this.element.addEventListener('touchend', this.onTouchEnd.bind(this));
            this.element.addEventListener('touchmove', this.onTouchMove.bind(this));
        }

        onMouseDown(e) {
            this.isDown = true;
            this.element.classList.add('active');
            this.startX = e.pageX - this.element.offsetLeft;
            this.scrollLeft = this.element.scrollLeft;
        }

        onMouseLeave() {
            this.isDown = false;
            this.element.classList.remove('active');
        }

        onMouseUp() {
            this.isDown = false;
            this.element.classList.remove('active');
        }

        onMouseMove(e) {
            if (!this.isDown) return;
            e.preventDefault();
            const x = e.pageX - this.element.offsetLeft;
            const walk = (x - this.startX) * 2;
            this.element.scrollLeft = this.scrollLeft - walk;
        }

        onTouchStart(e) {
            this.isDown = true;
            this.startX = e.touches[0].pageX - this.element.offsetLeft;
            this.scrollLeft = this.element.scrollLeft;
        }

        onTouchEnd() {
            this.isDown = false;
        }

        onTouchMove(e) {
            if (!this.isDown) return;
            const x = e.touches[0].pageX - this.element.offsetLeft;
            const walk = (x - this.startX) * 2;
            this.element.scrollLeft = this.scrollLeft - walk;
        }
    }

    // Initialize drag scroll on all elements with .drag-scroll class
    document.querySelectorAll('.drag-scroll').forEach(element => {
        new DragScroll(element);
    });

    // =====================
    // TOAST NOTIFICATIONS
    // =====================

    window.showToast = function (message, type = 'info') {
        const toast = document.createElement('div');
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        const icons = {
            success: 'bi-check-circle-fill',
            error: 'bi-x-circle-fill',
            warning: 'bi-exclamation-triangle-fill',
            info: 'bi-info-circle-fill'
        };

        toast.className = `${colors[type]} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 translate-x-0 opacity-100 min-w-[300px]`;
        toast.innerHTML = `
            <i class="bi ${icons[type]} text-xl"></i>
            <span class="font-semibold">${message}</span>
        `;

        const container = document.getElementById('toast-container');
        container?.appendChild(toast);

        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    };

    // =====================
    // MODAL FUNCTIONS
    // =====================

    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });

    // =====================
    // NAVIGATION ACTIVE STATE
    // =====================

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // =====================
    // QUICK SEARCH FOCUS
    // =====================

    window.focusSearch = function () {
        const searchInput = document.getElementById('quick-search');
        searchInput?.focus();
    };

    // Keyboard shortcut Ctrl+K to focus search
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            focusSearch();
        }
    });

    // =====================
    // NOTIFICATION FUNCTIONS
    // =====================

    window.clearAllNotifications = function () {
        const notifications = document.querySelectorAll('[data-notification-id]');
        notifications.forEach(notification => {
            notification.style.transition = 'all 0.3s ease-out';
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(20px)';
            setTimeout(() => notification.remove(), 300);
        });
        showToast('All notifications cleared', 'success');
    };

    // =====================
    // DOCUMENT UPLOAD HANDLER
    // =====================

    window.handleDocumentUpload = function () {
        showToast('Document uploaded successfully!', 'success');
        closeModal('upload-modal');
    };

    // =====================
    // PAGE LOADER
    // =====================

    window.showPageLoader = function () {
        document.getElementById('page-loader')?.classList.remove('hidden');
    };

    window.hidePageLoader = function () {
        document.getElementById('page-loader')?.classList.add('hidden');
    };

    // Hide loader when page is fully loaded
    window.addEventListener('load', function () {
        hidePageLoader();
    });

    // =====================
    // INITIALIZE ANIMATIONS
    // =====================

    // Add fade-in animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    console.log('LRMS System initialized successfully!');
});