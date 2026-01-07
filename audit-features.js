/**
 * Audit Features - JavaScript functionality for audit view
 * Implements audit-specific dashboards, logs, and reports
 */

// Initialize audit features  
document.addEventListener('DOMContentLoaded', function () {
    console.log('Audit features loaded');
    showSection('audit-dashboard');
});

// Show different sections within audit view
function showSection(sectionName) {
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active', 'bg-purple-700');
        if (item.getAttribute('data-section') === sectionName) {
            item.classList.add('active', 'bg-purple-700');
        }
    });

    let content = '';
    let title = '';

    switch (sectionName) {
        case 'audit-dashboard':
            content = renderAuditDashboard();
            title = 'Audit Dashboard';
            break;
        case 'audit-logs':
            content = renderAuditLogs();
            title = 'Audit Logs';
            break;
        case 'document-history':
            content = renderDocumentHistory();
            title = 'Document History';
            break;
        case 'user-activity':
            content = renderUserActivity();
            title = 'User Activity';
            break;
        case 'access-reports':
            content = renderAccessReports();
            title = 'Access Reports';
            break;
        case 'system-analytics':
            content = renderSystemAnalytics();
            title = 'System Analytics';
            break;
        case 'export-tools':
            content = renderExportTools();
            title = 'Export Tools';
            break;
        default:
            content = renderAuditDashboard();
            title = 'Audit Dashboard';
    }

    pageTitle.textContent = title;
    breadcrumbCurrent.textContent = title;
    contentArea.innerHTML = content;

    // Log the page view
    logActivity('PAGE_VIEW', { section: sectionName });
}

// Render Audit Dashboard
function renderAuditDashboard() {
    const logs = getActivityLogs();
    const recentLogs = logs.slice(0, 10);

    // Get unique users and actions
    const uniqueUsers = new Set(logs.map(log => log.user)).size;
    const todayLogs = logs.filter(log => {
        const logDate = new Date(log.timestamp);
        const today = new Date();
        return logDate.toDateString() === today.toDateString();
    }).length;

    return `
        <div class="space-y-6">
            <!-- Overview Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Total Logs</p>
                            <p class="text-3xl font-bold text-gray-900">${logs.length}</p>
                        </div>
                        <div class="bg-red-100 rounded-full p-3">
                            <i class="bi bi-journal-text text-red-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Today's Activities</p>
                            <p class="text-3xl font-bold text-gray-900">${todayLogs}</p>
                        </div>
                        <div class="bg-blue-100 rounded-full p-3">
                            <i class="bi bi-calendar-check text-blue-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Active Users</p>
                            <p class="text-3xl font-bold text-gray-900">${uniqueUsers}</p>
                        </div>
                        <div class="bg-green-100 rounded-full p-3">
                            <i class="bi bi-people text-green-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-600">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">System Status</p>
                            <p class="text-lg font-bold text-green-600">Healthy</p>
                        </div>
                        <div class="bg-green-100 rounded-full p-3">
                            <i class="bi bi-check-circle text-green-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Recent Activity -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                    <h3 class="text-lg font-bold text-white">
                        <i class="bi bi-activity mr-2"></i>Recent Activity
                    </h3>
                </div>
                <div class="p-6">
                    ${recentLogs.length > 0 ? `
                        <div class="space-y-3">
                            ${recentLogs.map(log => `
                                <div class="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition">
                                    <div class="bg-red-100 rounded-full p-2 mt-1">
                                        <i class="bi bi-circle-fill text-red-600 text-xs"></i>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900">${log.action}</p>
                                        <p class="text-xs text-gray-600">${log.user} - ${log.role}</p>
                                        <p class="text-xs text-gray-500 mt-1">${formatTimestamp(log.timestamp)}</p>
                                    </div>
                                    <span class="text-xs text-gray-500 whitespace-nowrap">${log.page}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="text-center py-8 text-gray-500">
                            <i class="bi bi-inbox text-4xl mb-2"></i>
                            <p>No recent activity</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}

// Render Audit Logs with Filtering
function renderAuditLogs() {
    return `
        <div class="space-y-6">
            <!-- Header -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="bi bi-journal-text mr-2"></i>Activity Audit Logs
                </h2>
                
                <!-- Filters -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input type="text" id="search-user" placeholder="Filter by user..." 
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    
                    <select id="filter-role" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option value="">All Roles</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Staff">Staff</option>
                        <option value="Auditor">Auditor</option>
                    </select>
                    
                    <input type="date" id="start-date" 
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                        
                    <button onclick="applyLogFilters()" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
                        <i class="bi bi-funnel mr-2"></i>Apply Filters
                    </button>
                </div>
                
                <button onclick="clearLogFilters()" class="text-sm text-red-600 hover:text-red-700">
                    <i class="bi bi-x-circle mr-1"></i>Clear Filters
                </button>
            </div>
            
            <!-- Logs Table -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200" id="logs-table">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200" id="logs-tbody">
                            <!-- Logs will be inserted here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Apply log filters
function applyLogFilters() {
    const user = document.getElementById('search-user').value;
    const role = document.getElementById('filter-role').value;
    const startDate = document.getElementById('start-date').value;

    const filters = {};
    if (user) filters.user = user;
    if (role) filters.role = role;
    if (startDate) filters.startDate = startDate;

    const filteredLogs = getActivityLogs(filters);
    updateLogsTable(filteredLogs);

    logActivity('FILTER_APPLIED', { filters });
}

// Clear log filters
function clearLogFilters() {
    document.getElementById('search-user').value = '';
    document.getElementById('filter-role').value = '';
    document.getElementById('start-date').value = '';

    const allLogs = getActivityLogs();
    updateLogsTable(allLogs);

    logActivity('FILTER_CLEARED');
}

// Update logs table
function updateLogsTable(logs) {
    const tbody = document.getElementById('logs-tbody');
    if (!tbody) return;

    if (logs.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="bi bi-inbox text-4xl mb-2"></i>
                    <p>No logs found</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = logs.map(log => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatTimestamp(log.timestamp)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${log.user}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(log.role)} text-white">
                    ${log.role}
                </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">${log.action}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${log.page}</td>
        </tr>
    `).join('');
}

// Render other sections (simplified for now)
function renderDocumentHistory() {
    return `
        <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
                <i class="bi bi-clock-history mr-2"></i>Document History
            </h2>
            <p class="text-gray-600">Document change history and version tracking will be displayed here.</p>
            <p class="text-sm text-gray-500 mt-2">This feature tracks all modifications to legislative documents.</p>
        </div>
    `;
}

function renderUserActivity() {
    const logs = getActivityLogs();
    const userStats = {};

    logs.forEach(log => {
        if (!userStats[log.user]) {
            userStats[log.user] = { count: 0, role: log.role };
        }
        userStats[log.user].count++;
    });

    return `
        <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
                <i class="bi bi-person-lines-fill mr-2"></i>User Activity Summary
            </h2>
            <div class="space-y-3">
                ${Object.entries(userStats).map(([user, stats]) => `
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p class="font-medium text-gray-900">${user}</p>
                            <p class="text-sm text-gray-600">${stats.role}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-red-600">${stats.count}</p>
                            <p class="text-xs text-gray-500">activities</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderAccessReports() {
    return `
        <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
                <i class="bi bi-file-earmark-bar-graph mr-2"></i>Access Reports
            </h2>
            <p class="text-gray-600">User access patterns and login reports will be displayed here.</p>
            <p class="text-sm text-gray-500 mt-2">Track who accessed what and when.</p>
        </div>
    `;
}

function renderSystemAnalytics() {
    return `
        <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
                <i class="bi bi-graph-up mr-2"></i>System Analytics
            </h2>
            <p class="text-gray-600">System usage analytics and performance metrics will be displayed here.</p>
            <p class="text-sm text-gray-500 mt-2">Monitor system health and usage patterns.</p>
        </div>
    `;
}

function renderExportTools() {
    return `
        <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
                <i class="bi bi-download mr-2"></i>Export Tools
            </h2>
            <div class="space-y-4">
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <i class="bi bi-file-earmark-spreadsheet text-4xl text-gray-400 mb-3"></i>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Export Activity Logs</h3>
                    <p class="text-sm text-gray-600 mb-4">Download all activity logs as CSV file</p>
                    <button onclick="exportActivityLogs()" 
                        class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
                        <i class="bi bi-download mr-2"></i>Export to CSV
                    </button>
                </div>
                
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <i class="bi bi-file-earmark-pdf text-4xl text-gray-400 mb-3"></i>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Generate PDF Report</h3>
                    <p class="text-sm text-gray-600 mb-4">Create comprehensive audit report</p>
                    <button onclick="alert('PDF export feature coming soon')" 
                        class="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg cursor-not-allowed">
                        <i class="bi bi-file-pdf mr-2"></i>Coming Soon
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Helper function to format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Load logs table when audit logs section is shown
setTimeout(() => {
    const tbody = document.getElementById('logs-tbody');
    if (tbody) {
        const allLogs = getActivityLogs();
        updateLogsTable(allLogs);
    }
}, 100);
