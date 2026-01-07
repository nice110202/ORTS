/**
 * Authentication Utilities - Shared authentication and role management
 * Used across multiple views (staff, audit, etc.)
 */

// Get current user from session/localStorage
function getCurrentUser() {
    const localUser = localStorage.getItem('currentUser');
    const sessionUser = sessionStorage.getItem('currentUser');

    if (localUser) {
        return JSON.parse(localUser);
    } else if (sessionUser) {
        return JSON.parse(sessionUser);
    }
    return null;
}

// Get user's assigned role
function getUserRole() {
    const user = getCurrentUser();
    return user ? user.role : null;
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true' ||
        sessionStorage.getItem('isLoggedIn') === 'true';
}

// Require specific role access (redirect if unauthorized)
function requireRole(allowedRoles) {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }

    const userRole = getUserRole();
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (!rolesArray.includes(userRole)) {
        console.warn(`Access denied. User role: ${userRole}, Required: ${rolesArray.join(', ')}`);
        redirectByRole(); // Redirect to appropriate view
        return false;
    }

    return true;
}

// Redirect user to appropriate view based on role
function redirectByRole() {
    const userRole = getUserRole();

    switch (userRole) {
        case 'Administrator':
        case 'Staff':
            window.location.href = 'system-template-full.html';
            break;
        case 'Auditor':
            window.location.href = 'audit-view.html';
            break;
        default:
            console.warn('Unknown role:', userRole);
            logout();
    }
}

// Centralized logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear all stored session data
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('currentUser');

        // Redirect to login page
        window.location.href = 'login.html?logout=success';
    }
    return false;
}

// Log user activity for audit trail
function logActivity(action, details = {}) {
    const user = getCurrentUser();
    if (!user) return;

    const activityLog = {
        timestamp: new Date().toISOString(),
        user: user.email,
        role: user.role,
        action: action,
        details: details,
        page: window.location.pathname
    };

    // Get existing logs
    let logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');

    // Add new log
    logs.unshift(activityLog);

    // Keep only last 1000 entries
    if (logs.length > 1000) {
        logs = logs.slice(0, 1000);
    }

    // Save back to localStorage
    localStorage.setItem('activityLogs', JSON.stringify(logs));

    console.log('Activity logged:', activityLog);
}

// Get activity logs with optional filtering
function getActivityLogs(filters = {}) {
    let logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');

    // Apply filters
    if (filters.user) {
        logs = logs.filter(log => log.user === filters.user);
    }
    if (filters.role) {
        logs = logs.filter(log => log.role === filters.role);
    }
    if (filters.action) {
        logs = logs.filter(log => log.action.toLowerCase().includes(filters.action.toLowerCase()));
    }
    if (filters.startDate) {
        logs = logs.filter(log => new Date(log.timestamp) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
        logs = logs.filter(log => new Date(log.timestamp) <= new Date(filters.endDate));
    }

    return logs;
}

// Clear activity logs (admin only)
function clearActivityLogs() {
    const userRole = getUserRole();
    if (userRole !== 'Administrator') {
        console.error('Only administrators can clear activity logs');
        return false;
    }

    if (confirm('Are you sure you want to clear all activity logs? This action cannot be undone.')) {
        localStorage.removeItem('activityLogs');
        logActivity('SYSTEM', { message: 'Activity logs cleared' });
        return true;
    }
    return false;
}

// Export logs to CSV
function exportActivityLogs(filters = {}) {
    const logs = getActivityLogs(filters);

    if (logs.length === 0) {
        alert('No logs to export');
        return;
    }

    // Create CSV content
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Details', 'Page'];
    const csvRows = [headers.join(',')];

    logs.forEach(log => {
        const row = [
            log.timestamp,
            log.user,
            log.role,
            log.action,
            JSON.stringify(log.details).replace(/,/g, ';'),
            log.page
        ];
        csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    logActivity('EXPORT', { type: 'CSV', records: logs.length });
}

// Get role display name
function getRoleDisplayName(role) {
    const displayNames = {
        'Administrator': 'Administrator',
        'Staff': 'Staff Member',
        'Auditor': 'Auditor',
        'Committee': 'Committee Member',
        'Viewer': 'Viewer'
    };
    return displayNames[role] || role;
}

// Get role badge color
function getRoleBadgeColor(role) {
    const colors = {
        'Administrator': 'bg-red-600',
        'Staff': 'bg-blue-600',
        'Auditor': 'bg-purple-600',
        'Committee': 'bg-green-600',
        'Viewer': 'bg-gray-600'
    };
    return colors[role] || 'bg-gray-600';
}

// Check if user can access audit view
function canAccessAuditView() {
    const userRole = getUserRole();
    // Staff and Auditors can access audit view
    return ['Administrator', 'Staff', 'Auditor'].includes(userRole);
}
