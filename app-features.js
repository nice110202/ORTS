
// Global Data Store
const AppData = {
    documents: [],
    users: [],
    notifications: [],
    auditLogs: [],
    currentUser: {
        id: 1,
        name: 'Admin User',
        email: 'admin@lgu.gov.ph',
        role: 'Administrator',
        profilePicture: null
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', function () {
    initializeData();

    // Load last viewed section from localStorage, or default to dashboard
    const lastSection = localStorage.getItem('currentSection') || 'dashboard';
    showSection(lastSection);

    loadNotifications();

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Ctrl+K for search
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            document.getElementById('quick-search').focus();
        }
    });

    // Setup drag and drop
    setupDragAndDrop();
});

// Initialize Sample Data
function initializeData() {
    // Sample Documents
    AppData.documents = [
        {
            id: 1,
            reference: 'ORD-2025-001',
            title: 'Annual Budget Ordinance 2025',
            type: 'ordinance',
            status: 'approved',
            date: '2025-01-15',
            uploadedBy: 'Admin User',
            uploadedAt: '2025-01-15 10:30 AM',
            fileSize: '2.5 MB',
            description: 'Annual budget allocation for fiscal year 2025',
            tags: ['budget', 'finance', '2025'],
            views: 45,
            downloads: 12
        },
        {
            id: 2,
            reference: 'RES-2025-042',
            title: 'COVID-19 Response Resolution',
            type: 'resolution',
            status: 'approved',
            date: '2025-02-01',
            uploadedBy: 'Officer User',
            uploadedAt: '2025-02-01 02:15 PM',
            fileSize: '1.8 MB',
            description: 'Resolution for enhanced COVID-19 response measures',
            tags: ['health', 'covid-19', 'emergency'],
            views: 78,
            downloads: 23
        },
        {
            id: 3,
            reference: 'SM-2025-11',
            title: 'Regular Session Minutes - November 2025',
            type: 'session',
            status: 'pending',
            date: '2025-11-20',
            uploadedBy: 'Staff User',
            uploadedAt: '2025-11-21 09:00 AM',
            fileSize: '3.2 MB',
            description: 'Minutes of the regular session held on November 20, 2025',
            tags: ['session', 'minutes', 'november'],
            views: 12,
            downloads: 3
        },
        {
            id: 4,
            reference: 'AG-2025-12',
            title: 'December Session Agenda',
            type: 'agenda',
            status: 'draft',
            date: '2025-12-01',
            uploadedBy: 'Admin User',
            uploadedAt: '2025-11-28 04:45 PM',
            fileSize: '856 KB',
            description: 'Agenda for the December regular session',
            tags: ['agenda', 'december', 'session'],
            views: 8,
            downloads: 2
        }
    ];

    // Sample Users
    AppData.users = [
        { id: 1, name: 'Admin User', email: 'admin@lgu.gov.ph', role: 'Administrator', status: 'active', department: 'IT Department', lastLogin: '2025-12-02 08:30 AM' },
        { id: 2, name: 'Officer Smith', email: 'officer@lgu.gov.ph', role: 'Officer', status: 'active', department: 'Legislative', lastLogin: '2025-12-02 07:15 AM' },
        { id: 3, name: 'Staff Jones', email: 'staff@lgu.gov.ph', role: 'Staff', status: 'active', department: 'Records', lastLogin: '2025-12-01 05:20 PM' },
        { id: 4, name: 'Viewer Brown', email: 'viewer@lgu.gov.ph', role: 'Viewer', status: 'inactive', department: 'Public', lastLogin: '2025-11-30 03:10 PM' }
    ];

    // Sample Notifications
    AppData.notifications = [
        { id: 1, title: 'New document uploaded', message: 'Ordinance No. 2025-001 has been uploaded to the system', time: '2 hours ago', timestamp: '2025-12-02 14:30', type: 'document', read: false, icon: 'bi-file-earmark-text', color: 'blue' },
        { id: 2, title: 'Document approved', message: 'Resolution No. 2025-042 has been approved', time: '5 hours ago', timestamp: '2025-12-02 11:30', type: 'approval', read: false, icon: 'bi-check-circle', color: 'green' },
        { id: 3, title: 'New user registered', message: 'Viewer Brown joined the system', time: '1 day ago', timestamp: '2025-12-01 16:30', type: 'user', read: true, icon: 'bi-person-plus', color: 'purple' },
        { id: 4, title: 'Document pending review', message: 'Session Minutes SM-2025-11 awaiting your review', time: '2 days ago', timestamp: '2025-11-30 09:15', type: 'document', read: true, icon: 'bi-clock-history', color: 'yellow' },
        { id: 5, title: 'System update completed', message: 'Legislative tracking system updated to v2.1.0', time: '3 days ago', timestamp: '2025-11-29 22:00', type: 'system', read: true, icon: 'bi-gear', color: 'gray' },
        { id: 6, title: 'Document rejected', message: 'Proposal PRO-2025-008 needs revision', time: '3 days ago', timestamp: '2025-11-29 15:45', type: 'alert', read: false, icon: 'bi-exclamation-triangle', color: 'red' },
        { id: 7, title: 'New comment added', message: 'Officer Smith commented on ORD-2025-003', time: '4 days ago', timestamp: '2025-11-28 13:20', type: 'comment', read: true, icon: 'bi-chat-left-text', color: 'blue' },
        { id: 8, title: 'Reminder: Session tomorrow', message: 'Regular council session scheduled for Dec 03', time: '5 days ago', timestamp: '2025-11-27 08:00', type: 'reminder', read: true, icon: 'bi-bell', color: 'amber' },
        { id: 9, title: 'Document finalized', message: 'Ordinance No. 2025-002 has been finalized', time: '1 week ago', timestamp: '2025-11-25 16:00', type: 'approval', read: true, icon: 'bi-check-circle-fill', color: 'green' },
        { id: 10, title: 'Audit log exported', message: 'Monthly audit report has been generated', time: '1 week ago', timestamp: '2025-11-24 10:30', type: 'system', read: true, icon: 'bi-download', color: 'gray' }
    ];

    // Sample Audit Logs
    AppData.auditLogs = [
        { id: 1, user: 'Admin User', action: 'upload', description: 'Uploaded document ORD-2025-001', timestamp: '2025-12-02 10:30 AM', ipAddress: '192.168.1.100' },
        { id: 2, user: 'Officer Smith', action: 'approve', description: 'Approved document RES-2025-042', timestamp: '2025-12-02 09:15 AM', ipAddress: '192.168.1.101' },
        { id: 3, user: 'Staff Jones', action: 'update', description: 'Updated document SM-2025-11', timestamp: '2025-12-01 04:45 PM', ipAddress: '192.168.1.102' },
        { id: 4, user: 'Admin User', action: 'delete', description: 'Deleted draft document AG-2024-15', timestamp: '2025-12-01 02:20 PM', ipAddress: '192.168.1.100' }
    ];
}

// Section Management
function showSection(sectionName) {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    // Redirect reading sections to workflow-tracking with appropriate tab
    const readingSectionMap = {
        'first-reading': 'first-reading',
        'committee-stage': 'committee',
        'second-reading': 'second-reading',
        'third-reading': 'third-reading'
    };

    if (readingSectionMap[sectionName]) {
        // Redirect to workflow tracking
        showSection('workflow-tracking');
        // Switch to the appropriate tab after a brief delay
        setTimeout(() => {
            const tabName = readingSectionMap[sectionName];
            if (typeof switchWorkflowTab === 'function') {
                switchWorkflowTab(tabName);
            }
        }, 100);
        return;
    }

    // Save current section to localStorage for page refresh persistence
    localStorage.setItem('currentSection', sectionName);

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionName) {
            item.classList.add('active');
        }
    });

    // Update page header and breadcrumb
    updatePageHeader(sectionName);

    // Load section content
    switch (sectionName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'documents':
            renderDocuments();
            break;
        case 'search':
            renderSearch();
            break;
        case 'analytics':
            renderAnalytics();
            break;
        case 'users':
            renderUsers();
            break;
        case 'audit':
            renderAudit();
            break;
        case 'profile':
            renderProfile();
            break;
        case 'research-analysis':
            renderResearchAnalysis();
            break;
        case 'amendment-history':
            renderAmendmentHistory();
            break;
        case 'proposals':
            renderProposals();
            break;
        case 'multi-stage-dashboard':
            renderMultiStageDashboard();
            break;
        case 'voting-enactment':
            renderVotingEnactment();
            break;
        case 'post-approval':
            renderPostApproval();
            break;
        case 'publication':
            renderPublicationManagement();
            break;
        case 'final-approval':
            renderFinalApprovalImplementation();
            break;
        case 'doc-status':
            renderDocumentStatusLocation();
            break;
        case 'finalization-distribution':
            renderFinalizationDistribution();
            break;
        case 'documents':
            renderDocuments();
            break;

        case 'notifications':
            renderNotifications();
            break;

        case 'workflow-tracking':
            renderWorkflowTracking();
            break;
        case 'legislative-reading':
            renderLegislativeReading();
            break;
        default:
            contentArea.innerHTML = '<p class="text-gray-600">Section not found</p>';
    }
}

// Update page title and breadcrumb navigation
function updatePageHeader(sectionName) {
    const pageTitleEl = document.getElementById('page-title');
    const breadcrumbEl = document.getElementById('breadcrumb-current');

    if (!pageTitleEl || !breadcrumbEl) return;

    const sectionTitles = {
        'dashboard': 'Dashboard',
        'documents': 'Documents',
        'search': 'Search Documents',
        'analytics': 'Analytics & Reports',
        'users': 'User Management',
        'audit': 'Audit Logs',
        'profile': 'My Profile',
        'proposals': 'Proposal Submission',
        'multi-stage-dashboard': 'Multi-Stage Dashboard',
        'voting-enactment': 'Approval & Enactment',
        'post-approval': 'Post Approval',
        'publication': 'Publication Management',
        'final-approval': 'Final Approval & Implementation',
        'doc-status': 'Document Status & Location',
        'finalization-distribution': 'Document Finalization & Distribution',
        'legislative-reading': 'Legislative Reading & Workflow',
        'workflow-tracking': 'Workflow Tracking'
    };

    const title = sectionTitles[sectionName] || 'Dashboard';

    pageTitleEl.textContent = title;

    // Update breadcrumb
    breadcrumbEl.innerHTML = `<span class="text-gray-800 font-medium">${title}</span>`;
}


// Generic modal helper (replaces prompt/alert flows)
let __inputModalCallback = null;
function openInputModal(options) {
    // options: { title, defaultValue, multiline (bool), placeholder, onConfirm }
    const modal = document.getElementById('input-modal');
    const titleEl = document.getElementById('input-modal-title');
    const field = document.getElementById('input-modal-field');
    if (!modal || !titleEl || !field) return;
    titleEl.textContent = options.title || 'Input';
    field.value = options.defaultValue || '';
    field.placeholder = options.placeholder || '';
    field.rows = options.multiline ? 8 : 2;
    __inputModalCallback = typeof options.onConfirm === 'function' ? options.onConfirm : null;
    openModal('input-modal');
    // focus
    setTimeout(() => field.focus(), 50);
}

function confirmInputModal() {
    const field = document.getElementById('input-modal-field');
    const value = field ? field.value : null;
    closeInputModal();
    if (__inputModalCallback) {
        try { __inputModalCallback(value); } catch (e) { console.error(e); }
    }
}

function closeInputModal() {
    __inputModalCallback = null;
    closeModal('input-modal');
}

function openViewModal(title, html) {
    const modal = document.getElementById('view-modal');
    const container = document.getElementById('document-details');
    const heading = modal ? modal.querySelector('h3') : null;
    if (heading) heading.textContent = title || 'Details';
    if (container) container.innerHTML = html || '';
    openModal('view-modal');
}

// ==============================
// DASHBOARD MODULE
// ==============================
function renderDashboard() {
    const totalDocs = AppData.documents.length;
    const approvedDocs = AppData.documents.filter(d => d.status === 'approved').length;
    const pendingDocs = AppData.documents.filter(d => d.status === 'pending').length;
    const activeUsers = AppData.users.filter(u => u.status === 'active').length;

    const html = `
        <!-- Welcome Banner -->
        <div class="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-xl p-8 mb-6 text-white transform hover:scale-[1.01] transition-all duration-300 animate-fade-in">
            <div class="flex items-center justify-between">
                <div class="animate-slide-in-left">
                    <h1 class="text-3xl font-bold mb-2">Welcome back, ${AppData.currentUser.name}! 👋</h1>
                    <p class="text-red-100 text-lg">Here's what's happening with your legislative records today.</p>
                </div>
                <div class="hidden lg:block animate-slide-in-right">
                    <i class="bi bi-speedometer2 text-8xl opacity-20"></i>
                </div>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-100 group cursor-pointer">
                <div class="flex items-center">
                    <div class="flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <div class="bg-red-100 rounded-lg p-3">
                            <i class="bi bi-file-earmark-text text-red-600 text-3xl"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm text-gray-600 transition-colors duration-200 group-hover:text-red-600">Total Documents</p>
                        <p class="text-2xl font-bold text-gray-900 transform transition-all duration-300 group-hover:scale-110">${totalDocs}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-200 group cursor-pointer">
                <div class="flex items-center">
                    <div class="flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <div class="bg-green-100 rounded-lg p-3">
                            <i class="bi bi-check-circle text-green-600 text-3xl"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm text-gray-600 transition-colors duration-200 group-hover:text-green-600">Approved</p>
                        <p class="text-2xl font-bold text-gray-900 transform transition-all duration-300 group-hover:scale-110">${approvedDocs}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-300 group cursor-pointer">
                <div class="flex items-center">
                    <div class="flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <div class="bg-yellow-100 rounded-lg p-3">
                            <i class="bi bi-clock-history text-yellow-600 text-3xl"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm text-gray-600 transition-colors duration-200 group-hover:text-yellow-600">Pending</p>
                        <p class="text-2xl font-bold text-gray-900 transform transition-all duration-300 group-hover:scale-110">${pendingDocs}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-400 group cursor-pointer">
                <div class="flex items-center">
                    <div class="flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <div class="bg-purple-100 rounded-lg p-3">
                            <i class="bi bi-people text-purple-600 text-3xl"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm text-gray-600 transition-colors duration-200 group-hover:text-purple-600">Active Users</p>
                        <p class="text-2xl font-bold text-gray-900 transform transition-all duration-300 group-hover:scale-110">${activeUsers}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts and Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- Document Types Chart -->
            <div class="lg:col-span-2 bg-white rounded-xl shadow-md p-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-500">
                <h2 class="text-lg font-bold text-gray-800 mb-4">Documents by Type</h2>
                <div class="chart-container" style="position: relative; height: 280px; max-height: 280px;">
                    <canvas id="documentTypesChart"></canvas>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-600">
                <h2 class="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div class="space-y-3">
                    <button onclick="openModal('upload-modal')" class="btn-primary w-full flex items-center justify-center">
                        <i class="bi bi-upload mr-2"></i>Upload Document
                    </button>
                    <button onclick="showSection('search')" class="btn-outline w-full flex items-center justify-center">
                        <i class="bi bi-search mr-2"></i>Advanced Search
                    </button>
                    <button onclick="showSection('analytics')" class="btn-outline w-full flex items-center justify-center">
                        <i class="bi bi-bar-chart mr-2"></i>View Reports
                    </button>
                    <button onclick="showSection('users')" class="btn-outline w-full flex items-center justify-center">
                        <i class="bi bi-people mr-2"></i>Manage Users
                    </button>
                </div>
            </div>
        </div>

        <!-- Recent Documents -->
        <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-700">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-bold text-gray-800">Recent Documents</h2>
                <button onclick="showSection('documents')" class="text-sm text-red-600 hover:text-red-700 font-medium">View All →</button>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${AppData.documents.slice(0, 5).map(doc => `
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4 text-sm font-medium text-gray-900">${doc.reference}</td>
                                <td class="px-6 py-4 text-sm text-gray-700">${doc.title}</td>
                                <td class="px-6 py-4 text-sm text-gray-700">${capitalizeFirstLetter(doc.type)}</td>
                                <td class="px-6 py-4">${getStatusBadge(doc.status)}</td>
                                <td class="px-6 py-4 text-sm text-gray-700">${doc.date}</td>
                                <td class="px-6 py-4 text-sm">
                                    <button onclick="viewDocument(${doc.id})" class="text-red-600 hover:text-red-700 mr-2" title="View">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;

    // Initialize chart
    setTimeout(() => renderDocumentTypesChart(), 100);
}

function renderDocumentTypesChart() {
    const ctx = document.getElementById('documentTypesChart');
    if (!ctx) return;

    const typeCounts = {};
    AppData.documents.forEach(doc => {
        typeCounts[doc.type] = (typeCounts[doc.type] || 0) + 1;
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(typeCounts).map(t => capitalizeFirstLetter(t)),
            datasets: [{
                data: Object.values(typeCounts),
                backgroundColor: [
                    '#dc2626',
                    '#16a34a',
                    '#2563eb',
                    '#f59e0b',
                    '#8b5cf6'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// ==============================
// DOCUMENTS MODULE
// ==============================
function renderDocuments() {
    const html = `
        <div class="mb-6 animate-fade-in">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 class="text-2xl font-bold text-gray-800">Document Management</h1>
                <button onclick="openModal('upload-modal')" class="btn-primary">
                    <i class="bi bi-upload mr-2"></i>Upload New Document
                </button>
            </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6 animate-fade-in-up animation-delay-100">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select id="filterType" class="input-field" onchange="filterDocuments()">
                    <option value="">All Types</option>
                    <option value="ordinance">Ordinance</option>
                    <option value="resolution">Resolution</option>
                    <option value="session">Session Minutes</option>
                    <option value="agenda">Agenda</option>
                </select>
                <select id="filterStatus" class="input-field" onchange="filterDocuments()">
                    <option value="">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="draft">Draft</option>
                </select>
                <input type="text" id="searchDocs" class="input-field" placeholder="Search documents..." oninput="filterDocuments()">
                <button onclick="resetFilters()" class="btn-outline">
                    <i class="bi bi-arrow-clockwise mr-2"></i>Reset
                </button>
            </div>
        </div>

        <!-- Documents Table -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in-up animation-delay-200">
            <div class="overflow-x-auto">
                <table class="min-w-full" id="documentsTable">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onclick="sortDocuments('reference')">
                                Reference <i class="bi bi-arrow-down-up text-xs"></i>
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onclick="sortDocuments('title')">
                                Title <i class="bi bi-arrow-down-up text-xs"></i>
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onclick="sortDocuments('type')">
                                Type <i class="bi bi-arrow-down-up text-xs"></i>
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onclick="sortDocuments('status')">
                                Status <i class="bi bi-arrow-down-up text-xs"></i>
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onclick="sortDocuments('date')">
                                Date <i class="bi bi-arrow-down-up text-xs"></i>
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="documentsList" class="divide-y divide-gray-200">
                        <!-- Populated by filterDocuments() -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
    filterDocuments();
}

// ==============================
// LEGISLATIVE WORKFLOW TRACKING MODULE
// ==============================

function renderWorkflowTracking() {
    const docs = AppData.documents;

    // Calculate workflow statistics
    const stats = {
        total: docs.length,
        inFirstReading: docs.filter(d => d.firstReading && !d.firstReading.referred).length,
        inCommittee: docs.filter(d => d.committeeStage && d.committeeStage.assigned && !d.committeeStage.reportFiled).length,
        inSecondReading: docs.filter(d => d.secondReading && !d.secondReading.approved).length,
        inThirdReading: docs.filter(d => d.thirdReading && !d.thirdReading.passed).length,
        completed: docs.filter(d => (d.thirdReading && d.thirdReading.passed) || (d.secondReading && d.secondReading.resolutionFinalApproval)).length,
        resolutions: docs.filter(d => d.type === 'resolution').length,
        ordinances: docs.filter(d => d.type === 'ordinance').length
    };

    const html = `
        <!-- Premium Gradient Header -->
        <div class="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl shadow-2xl p-8 mb-6 text-white animate-fade-in overflow-hidden">
            <!-- Decorative Background -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div class="relative z-10 flex items-center gap-5">
                <div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-xl">
                    <i class="bi bi-diagram-3 text-5xl"></i>
                </div>
                <div>
                    <h1 class="text-4xl font-bold mb-2 tracking-tight">Legislative Workflow Tracking</h1>
                    <p class="text-red-50 text-base flex items-center gap-2">
                        <i class="bi bi-info-circle"></i>
                        Comprehensive tracking and management of documents through all legislative stages
                    </p>
                </div>
            </div>
        </div>

        <!-- Breadcrumb Navigation -->
        <div class="bg-white rounded-xl shadow-md p-4 mb-6 animate-fade-in-up">
            <nav class="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
                <a href="#" onclick="showSection('dashboard'); return false;" class="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1">
                    <i class="bi bi-house-door"></i>
                    <span>Home</span>
                </a>
                <i class="bi bi-chevron-right text-gray-400 text-xs"></i>
                <span class="text-gray-800 font-semibold" id="workflow-breadcrumb-current">Legislative Workflow</span>
            </nav>
        </div>

        <!-- Workflow Overview Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 animate-fade-in-up animation-delay-100">
            <div class="bg-white rounded-xl p-6 border-t-4 border-indigo-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-files text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${stats.total}</span>
                </div>
                <h3 class="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Total Documents</h3>
                <p class="text-xs text-gray-500">All proposals tracked</p>
            </div>

            <div class="bg-white rounded-xl p-6 border-t-4 border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-arrow-repeat text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${stats.inFirstReading + stats.inCommittee + stats.inSecondReading + stats.inThirdReading}</span>
                </div>
                <h3 class="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">In Progress</h3>
                <p class="text-xs text-gray-500">Currently processing</p>
            </div>

            <div class="bg-white rounded-xl p-6 border-t-4 border-green-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-check-circle text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${stats.completed}</span>
                </div>
                <h3 class="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">Completed</h3>
                <p class="text-xs text-gray-500">Fully processed</p>
            </div>

            <div class="bg-white rounded-xl p-6 border-t-4 border-purple-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-bookmark-star text-white text-2xl"></i>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold text-gray-800">${stats.resolutions}R / ${stats.ordinances}O</div>
                    </div>
                </div>
                <h3 class="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-1">Document Types</h3>
                <p class="text-xs text-gray-500">Resolutions / Ordinances</p>
            </div>
        </div>

        <!-- Tabbed Navigation for Reading Stages -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 animate-fade-in-up animation-delay-200">
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex overflow-x-auto">
                    <button onclick="switchWorkflowTab('overview')" id="tab-overview"
                        class="workflow-tab whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 border-red-600 text-red-600 transition-colors">
                        <i class="bi bi-speedometer2 mr-2"></i>Overview
                    </button>
                    <button onclick="switchWorkflowTab('first-reading')" id="tab-first-reading"
                        class="workflow-tab whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">
                        <i class="bi bi-1-circle mr-2"></i>First Reading
                    </button>
                    <button onclick="switchWorkflowTab('committee')" id="tab-committee"
                        class="workflow-tab whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">
                        <i class="bi bi-people mr-2"></i>Committee Stage
                    </button>
                    <button onclick="switchWorkflowTab('second-reading')" id="tab-second-reading"
                        class="workflow-tab whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">
                        <i class="bi bi-2-circle mr-2"></i>Second Reading
                    </button>
                    <button onclick="switchWorkflowTab('third-reading')" id="tab-third-reading"
                        class="workflow-tab whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">
                        <i class="bi bi-3-circle mr-2"></i>Third Reading
                    </button>
                </nav>
            </div>

            <!-- Overview Tab -->
            <div id="content-overview" class="workflow-tab-content p-6">
                ${renderWorkflowOverview(docs, stats)}
            </div>

            <!-- First Reading Tab -->
            <div id="content-first-reading" class="workflow-tab-content hidden p-6">
                ${renderFirstReadingContent(docs)}
            </div>

            <!-- Committee Stage Tab -->
            <div id="content-committee" class="workflow-tab-content hidden p-6">
                ${renderCommitteeContent(docs)}
            </div>

            <!-- Second Reading Tab -->
            <div id="content-second-reading" class="workflow-tab-content hidden p-6">
                ${renderSecondReadingContent(docs)}
            </div>

            <!-- Third Reading Tab -->
            <div id="content-third-reading" class="workflow-tab-content hidden p-6">
                ${renderThirdReadingContent(docs)}
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

// Tab switching function for workflow tracking
function switchWorkflowTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.workflow-tab').forEach(tab => {
        tab.classList.remove('border-red-600', 'text-red-600');
        tab.classList.add('border-transparent', 'text-gray-500');
    });

    document.getElementById(`tab-${tabName}`).classList.remove('border-transparent', 'text-gray-500');
    document.getElementById(`tab-${tabName}`).classList.add('border-red-600', 'text-red-600');

    // Update content
    document.querySelectorAll('.workflow-tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    document.getElementById(`content-${tabName}`).classList.remove('hidden');

    // Update breadcrumb
    const breadcrumbTitles = {
        'overview': 'Overview',
        'first-reading': 'First Reading',
        'committee': 'Committee Stage',
        'second-reading': 'Second Reading',
        'third-reading': 'Third Reading'
    };

    const breadcrumbEl = document.getElementById('workflow-breadcrumb-current');
    if (breadcrumbEl && breadcrumbTitles[tabName]) {
        breadcrumbEl.textContent = `Legislative Workflow › ${breadcrumbTitles[tabName]}`;
    }
}

// Helper functions to generate full content for each stage
function renderFirstReadingFullContent() {
    const docs = AppData.documents;
    // This will return the same HTML as the standalone First Reading page
    return generateFirstReadingHTML(docs);
}

function renderCommitteeStageFullContent() {
    const docs = AppData.documents;
    // This will return the same HTML as the standalone Committee Stage page
    return generateCommitteeStageHTML(docs);
}

function renderSecondReadingFullContent() {
    const docs = AppData.documents;
    // This will return the same HTML as the standalone Second Reading page
    return generateSecondReadingHTML(docs);
}

function renderThirdReadingFullContent() {
    const docs = AppData.documents;
    // This will return the same HTML as the standalone Third Reading page
    return generateThirdReadingHTML(docs);
}

// Generate First Reading HTML (extracted from renderFirstReading)
function generateFirstReadingHTML(docs) {
    // Reuse the exact HTML from renderFirstReading but without the header
    return `
        <!-- Stats Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-fade-in-up animation-delay-100">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Total Documents</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.length}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-files text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">Scheduled</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.filter(d => d.firstReading && d.firstReading.scheduledAt).length}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-calendar-check text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-1">Referred</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.filter(d => d.firstReading && d.firstReading.referred).length}</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-people text-white text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Documents Grid -->
        <div class="grid grid-cols-1 gap-4 animate-fade-in-up animation-delay-200">
            ${generateFirstReadingDocuments(docs)}
        </div>
    `;
}

// Helper to generate First Reading documents list with full functionality
function generateFirstReadingDocuments(docs) {
    if (docs.length === 0) {
        return `
            <div class="bg-white rounded-xl shadow-md p-12 text-center">
                <i class="bi bi-inbox text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg">No documents available</p>
            </div>
        `;
    }

    return docs.map((doc, index) => {
        // ensure firstReading object exists
        if (!doc.firstReading) doc.firstReading = {
            scheduledAt: null,
            minutes: '',
            referred: false,
            titleRead: false,
            titleReadAt: null,
            agendaIncluded: false,
            agendaDetails: null
        };
        const scheduled = doc.firstReading.scheduledAt ? doc.firstReading.scheduledAt : '';
        const hasMinutes = doc.firstReading.minutes && doc.firstReading.minutes.trim().length > 0;
        const isReferred = doc.firstReading.referred;
        const titleRead = doc.firstReading.titleRead || false;
        const agendaIncluded = doc.firstReading.agendaIncluded || false;

        return `
            <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 animate-fade-in-up" style="animation-delay: ${100 + index * 50}ms">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-start gap-4 flex-1">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                <i class="bi bi-file-earmark-text text-white text-xl"></i>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2 flex-wrap">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                        ${doc.reference}
                                    </span>
                                    ${isReferred ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800"><i class="bi bi-check-circle mr-1"></i>Referred</span>' : ''}
                                    ${titleRead ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800"><i class="bi bi-book mr-1"></i>Title Read</span>' : ''}
                                    ${agendaIncluded ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><i class="bi bi-list-check mr-1"></i>On Agenda</span>' : ''}
                                </div>
                                <h3 class="text-lg font-bold text-gray-800 mb-1">${doc.title}</h3>
                                <p class="text-sm text-gray-600">${doc.type || 'Document'} ${doc.author ? '• ' + doc.author : ''}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Schedule Section -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i class="bi bi-calendar3 text-blue-600"></i>
                            Schedule First Reading
                        </label>
                        <div class="flex items-center gap-2">
                            <input 
                                type="datetime-local" 
                                id="fr-sched-${doc.id}" 
                                value="${scheduled}" 
                                class="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm font-medium"
                            />
                            <button 
                                onclick="scheduleFirstReading(${doc.id})" 
                                class="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg">
                                <i class="bi bi-calendar-plus mr-2"></i>Set
                            </button>
                        </div>
                        ${scheduled ? `<p class="text-xs text-green-600 mt-2 flex items-center"><i class="bi bi-check-circle mr-1"></i> Scheduled for ${new Date(scheduled).toLocaleString()}</p>` : ''}
                    </div>

                    <!-- Minutes Section -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i class="bi bi-journal-text text-blue-600"></i>
                            Session Minutes
                        </label>
                        <textarea 
                            id="fr-minutes-${doc.id}" 
                            placeholder="Enter session minutes and discussions..." 
                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none text-sm"
                            rows="3">${doc.firstReading.minutes || ''}</textarea>
                        <button 
                            onclick="saveFirstReadingMinutes(${doc.id})" 
                            class="mt-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg">
                            <i class="bi bi-save mr-2"></i>Save Minutes
                        </button>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-wrap gap-3">
                        <button 
                            onclick="markTitleRead(${doc.id})" 
                            class="flex-1 px-4 py-2.5 ${titleRead ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-blue-600 text-white hover:bg-blue-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            <i class="bi bi-${titleRead ? 'check-circle-fill' : 'book'}"></i>
                            ${titleRead ? 'Title Read ✓' : 'Mark Title as Read'}
                        </button>
                        
                        <button 
                            onclick="includeInAgenda(${doc.id})" 
                            class="flex-1 px-4 py-2.5 ${agendaIncluded ? 'bg-amber-100 text-amber-700 border-2 border-amber-300' : 'bg-amber-600 text-white hover:bg-amber-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            <i class="bi bi-${agendaIncluded ? 'check-circle-fill' : 'list-check'}"></i>
                            ${agendaIncluded ? 'On Agenda ✓' : 'Include in Agenda'}
                        </button>
                        
                        <button 
                            onclick="referToCommittee(${doc.id})" 
                            class="flex-1 px-4 py-2.5 ${isReferred ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' : 'bg-purple-600 text-white hover:bg-purple-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            <i class="bi bi-${isReferred ? 'check-circle-fill' : 'people'}"></i>
                            ${isReferred ? 'Referred ✓' : 'Refer to Committee'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// For now, create simplified versions for other stages - will be expanded
function generateCommitteeStageHTML(docs) {
    return `
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div class="flex">
                <div class="flex-shrink-0">
                    <i class="bi bi-info-circle text-yellow-400 text-xl"></i>
                </div>
                <div class="ml-3">
                    <p class="text-sm text-yellow-700">
                        <strong>Optional Stage:</strong> Committee Stage functionality will be fully integrated here. Documents can proceed directly to Second Reading if no committee review is needed.
                    </p>
                </div>
            </div>
        </div>
        <p class="text-gray-600">Committee Stage full functionality coming soon...</p>
    `;
}

function generateSecondReadingHTML(docs) {
    const secondReadingDocsAll = docs.filter(d => d.secondReading);
    const secondReadingDocsActive = secondReadingDocsAll.filter(d => !d.secondReading.approved);
    const secondReadingDocsApproved = secondReadingDocsAll.filter(d => d.secondReading.approved);

    if (docs.length === 0) {
        return `
            <div class="bg-white rounded-xl shadow-md p-12 text-center">
                <i class="bi bi-inbox text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg">No documents available</p>
            </div>
        `;
    }

    return `
        <!-- Enhanced Stats Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 animate-fade-in-up animation-delay-100">
            <!-- Total Documents -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-chat-left-text text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${secondReadingDocsAll.length}</span>
                </div>
                <h3 class="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-1">Total Documents</h3>
                <p class="text-xs text-gray-500">In second reading</p>
            </div>
            
            <!-- Active Debates -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-orange-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-megaphone text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${secondReadingDocsActive.length}</span>
                </div>
                <h3 class="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-1">Active Debates</h3>
                <p class="text-xs text-gray-500">Pending approval</p>
            </div>
            
            <!-- Amendments Filed -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-amber-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-pencil-square text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${docs.filter(d => d.secondReading && d.secondReading.amendments).length}</span>
                </div>
                <h3 class="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-1">With Amendments</h3>
                <p class="text-xs text-gray-500">Proposals submitted</p>
            </div>
            
            <!-- Approved -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-green-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-check-circle text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${secondReadingDocsApproved.length}</span>
                </div>
                <h3 class="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">Approved</h3>
                <p class="text-xs text-gray-500">Moved to next stage</p>
            </div>
        </div>

        <!-- Documents Grid -->
        <div class="grid grid-cols-1 gap-4 animate-fade-in-up animation-delay-200">
            ${generateSecondReadingDocuments(docs)}
        </div>
    `;
}

// Helper function to generate Second Reading documents
function generateSecondReadingDocuments(docs) {
    return docs.map((doc, index) => {
        if (!doc.secondReading) doc.secondReading = { debateDate: '', amendments: '', approved: false };
        const debateScheduled = doc.secondReading.debateDate ? doc.secondReading.debateDate : '';
        const hasAmendments = doc.secondReading.amendments && doc.secondReading.amendments.trim().length > 0;
        const isApproved = doc.secondReading.approved;
        const isResolution = doc.type === 'resolution' || (doc.secondReading && doc.secondReading.isResolution);
        const rulesReviewed = doc.secondReading.rulesReview && doc.secondReading.rulesReview.reviewed;

        return `
            <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-300 animate-fade-in-up" style="animation-delay: ${100 + index * 50}ms">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-start gap-4 flex-1">
                            <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                <i class="bi bi-2-circle text-white text-xl"></i>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2 flex-wrap">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                                        ${doc.reference}
                                    </span>
                                    ${isResolution ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800"><i class="bi bi-bookmark-star mr-1"></i>Resolution</span>' : ''}
                                    ${hasAmendments ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><i class="bi bi-pencil mr-1"></i>Amendments Filed</span>' : ''}
                                    ${rulesReviewed ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><i class="bi bi-shield-check mr-1"></i>Rules Reviewed</span>' : ''}
                                    ${isApproved ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800"><i class="bi bi-check-circle mr-1"></i>Approved</span>' : ''}
                                </div>
                                <h3 class="text-lg font-bold text-gray-800 mb-1">${doc.title}</h3>
                                <p class="text-sm text-gray-600">${doc.type || 'Document'} ${doc.author ? '• ' + doc.author : ''}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Schedule Debate Section -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i class="bi bi-calendar3 text-orange-600"></i>
                            Schedule Debate Session
                        </label>
                        <div class="flex items-center gap-2">
                            <input 
                                type="datetime-local" 
                                id="debate-${doc.id}" 
                                value="${debateScheduled}" 
                                class="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none text-sm font-medium"
                            />
                            <button 
                                onclick="scheduleDebate(${doc.id})" 
                                class="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg">
                                <i class="bi bi-calendar-plus mr-2"></i>Set
                            </button>
                        </div>
                        ${debateScheduled ? `<p class="text-xs text-green-600 mt-2 flex items-center"><i class="bi bi-check-circle mr-1"></i> Scheduled for ${new Date(debateScheduled).toLocaleString()}</p>` : ''}
                    </div>

                    <!-- Amendments Section -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i class="bi bi-pencil-square text-orange-600"></i>
                            Proposed Amendments
                        </label>
                        <button 
                            onclick="fileAmendments(${doc.id})" 
                            class="w-full px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg">
                            <i class="bi bi-plus-circle mr-2"></i>File Amendments
                        </button>
                        ${hasAmendments ? `<p class="text-xs text-green-600 mt-2 flex items-center"><i class="bi bi-check-circle mr-1"></i> Amendments on file</p>` : ''}
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-wrap gap-3">
                        ${!rulesReviewed ? `
                        <button 
                            onclick="toggleRulesReview(${doc.id})" 
                            class="flex-1 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            <i class="bi bi-shield-check"></i>
                            Rules Committee Review
                        </button>
                        ` : ''}
                        
                        ${isResolution ? `
                        <button 
                            onclick="approveResolution(${doc.id})" 
                            class="flex-1 px-4 py-2.5 ${isApproved ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-purple-600 text-white hover:bg-purple-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            <i class="bi bi-${isApproved ? 'check-circle-fill' : 'bookmark-star'}"></i>
                            ${isApproved ? 'Resolution Approved ✓' : 'Approve Resolution (Final)'}
                        </button>
                        ` : `
                        <button 
                            onclick="progressToThirdReading(${doc.id})" 
                            class="flex-1 px-4 py-2.5 ${isApproved ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-green-600 text-white hover:bg-green-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            <i class="bi bi-${isApproved ? 'check-circle-fill' : 'arrow-right-circle'}"></i>
                            ${isApproved ? 'Moved to Third Reading ✓' : 'Progress to Third Reading'}
                        </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function generateThirdReadingHTML(docs) {
    if (docs.length === 0) {
        return `
            <div class="bg-white rounded-xl shadow-md p-12 text-center">
                <i class="bi bi-inbox text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg">No documents in third reading</p>
            </div>
        `;
    }

    return `
        <!-- Stats Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-fade-in-up animation-delay-100">
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">For Voting</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.filter(d => d.thirdReading && !d.thirdReading.passed).length}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-hand-thumbs-up text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Passed</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.filter(d => d.thirdReading && d.thirdReading.passed).length}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-check-circle text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-red-600 uppercase tracking-wider mb-1">Rejected</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.filter(d => d.thirdReading && d.thirdReading.rejected).length}</p>
                    </div>
                    <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-x-circle text-white text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Documents Grid -->
        <div class="grid grid-cols-1 gap-4 animate-fade-in-up animation-delay-200">
            ${generateThirdReadingDocuments(docs)}
        </div>
    `;
}

// Helper function to generate Third Reading documents
function generateThirdReadingDocuments(docs) {
    return docs.map((doc, index) => {
        if (!doc.thirdReading) doc.thirdReading = { votingDate: '', yesVotes: 0, noVotes: 0, abstain: 0, passed: false, rejected: false };
        const hasVoted = doc.thirdReading.passed || doc.thirdReading.rejected;
        const totalVotes = (doc.thirdReading.yesVotes || 0) + (doc.thirdReading.noVotes || 0) + (doc.thirdReading.abstain || 0);

        return `
            <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-green-300 animate-fade-in-up" style="animation-delay: ${100 + index * 50}ms">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-start gap-4 flex-1">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                <i class="bi bi-3-circle text-white text-xl"></i>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2 flex-wrap">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                        ${doc.reference}
                                    </span>
                                    ${doc.thirdReading.passed ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><i class="bi bi-check-circle mr-1"></i>Passed</span>' : ''}
                                    ${doc.thirdReading.rejected ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800"><i class="bi bi-x-circle mr-1"></i>Rejected</span>' : ''}
                                    ${totalVotes > 0 && !hasVoted ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><i class="bi bi-hourglass-split mr-1"></i>Voting Recorded</span>' : ''}
                                </div>
                                <h3 class="text-lg font-bold text-gray-800 mb-1">${doc.title}</h3>
                                <p class="text-sm text-gray-600">${doc.type || 'Document'} ${doc.author ? '• ' + doc.author : ''}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Voting Section -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <i class="bi bi-hand-thumbs-up text-green-600"></i>
                            Record Final Voting
                        </label>
                        <div class="grid grid-cols-3 gap-3 mb-3">
                            <div>
                                <label class="block text-xs text-gray-600 mb-1">Yes Votes</label>
                                <input type="number" id="yes-${doc.id}" value="${doc.thirdReading.yesVotes || 0}" min="0" 
                                    class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none text-sm"/>
                            </div>
                            <div>
                                <label class="block text-xs text-gray-600 mb-1">No Votes</label>
                                <input type="number" id="no-${doc.id}" value="${doc.thirdReading.noVotes || 0}" min="0"
                                    class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none text-sm"/>
                            </div>
                            <div>
                                <label class="block text-xs text-gray-600 mb-1">Abstain</label>
                                <input type="number" id="abstain-${doc.id}" value="${doc.thirdReading.abstain || 0}" min="0"
                                    class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm"/>
                            </div>
                        </div>
                        ${totalVotes > 0 ? `
                        <div class="bg-white rounded-lg p-3 mb-3 border-2 border-gray-200">
                            <p class="text-xs font-semibold text-gray-600 mb-2">Vote Tally</p>
                            <div class="flex items-center gap-4 text-sm">
                                <span class="text-green-600 font-bold"><i class="bi bi-hand-thumbs-up mr-1"></i>${doc.thirdReading.yesVotes || 0}</span>
                                <span class="text-red-600 font-bold"><i class="bi bi-hand-thumbs-down mr-1"></i>${doc.thirdReading.noVotes || 0}</span>
                                <span class="text-gray-600 font-bold"><i class="bi bi-dash-circle mr-1"></i>${doc.thirdReading.abstain || 0}</span>
                                <span class="ml-auto text-gray-800 font-bold">Total: ${totalVotes}</span>
                            </div>
                        </div>
                        ` : ''}
                        <button onclick="saveThirdReadingVotes(${doc.id})" 
                            class="w-full px-6 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg">
                            <i class="bi bi-save mr-2"></i>Save Votes
                        </button>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-wrap gap-3">
                        <button 
                            onclick="markPassed(${doc.id})" 
                            class="flex-1 px-4 py-2.5 ${doc.thirdReading.passed ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' : 'bg-green-600 text-white hover:bg-green-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            <i class="bi bi-${doc.thirdReading.passed ? 'check-circle-fill' : 'check-circle'}"></i>
                            ${doc.thirdReading.passed ? 'Passed ✓' : 'Mark as Passed'}
                        </button>
                        
                        <button 
                            onclick="markRejected(${doc.id})" 
                            class="flex-1 px-4 py-2.5 ${doc.thirdReading.rejected ? 'bg-red-100 text-red-700 border-2 border-red-300' : 'bg-red-600 text-white hover:bg-red-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            <i class="bi bi-${doc.thirdReading.rejected ? 'x-circle-fill' : 'x-circle'}"></i>
                            ${doc.thirdReading.rejected ? 'Rejected ✓' : 'Mark as Rejected'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Workflow Overview Content
function renderWorkflowOverview(docs, stats) {
    return `
        <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <i class="bi bi-diagram-3-fill text-red-600 text-2xl"></i>
            Workflow Pipeline
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <!-- First Reading Stage -->
            <div class="relative">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                    <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <i class="bi bi-1-circle text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 text-sm mb-1">First Reading</h3>
                    <p class="text-2xl font-bold text-blue-600">${stats.inFirstReading}</p>
                    <p class="text-xs text-gray-500 mt-1">documents</p>
                </div>
                <div class="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <i class="bi bi-arrow-right text-gray-300 text-2xl"></i>
                </div>
            </div>

            <!-- Committee Stage -->
            <div class="relative">
                <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                    <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <i class="bi bi-people text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 text-sm mb-1">Committee</h3>
                    <p class="text-2xl font-bold text-indigo-600">${stats.inCommittee}</p>
                    <p class="text-xs text-gray-500 mt-1">documents</p>
                </div>
                <div class="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <i class="bi bi-arrow-right text-gray-300 text-2xl"></i>
                </div>
            </div>

            <!-- Second Reading Stage -->
            <div class="relative">
                <div class="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                    <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <i class="bi bi-2-circle text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 text-sm mb-1">Second Reading</h3>
                    <p class="text-2xl font-bold text-orange-600">${stats.inSecondReading}</p>
                    <p class="text-xs text-gray-500 mt-1">documents</p>
                </div>
                <div class="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <i class="bi bi-arrow-right text-gray-300 text-2xl"></i>
                </div>
            </div>

            <!-- Third Reading Stage -->
            <div class="relative">
                <div class="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                    <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <i class="bi bi-3-circle text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 text-sm mb-1">Third Reading</h3>
                    <p class="text-2xl font-bold text-green-600">${stats.inThirdReading}</p>
                    <p class="text-xs text-gray-500 mt-1">documents</p>
                </div>
                <div class="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <i class="bi bi-arrow-right text-gray-300 text-2xl"></i>
                </div>
            </div>

            <!-- Completed Stage -->
            <div>
                <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                    <div class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                        <i class="bi bi-check-circle-fill text-white text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-800 text-sm mb-1">Completed</h3>
                    <p class="text-2xl font-bold text-emerald-600">${stats.completed}</p>
                    <p class="text-xs text-gray-500 mt-1">documents</p>
                </div>
            </div>
        </div>

        <!-- All Documents Summary -->
        <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3 mt-8">
            <i class="bi bi-list-check text-red-600 text-2xl"></i>
            All Documents - Workflow Status
        </h3>
        ${docs.length === 0 ? `
            <div class="text-center py-16">
                <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                    <i class="bi bi-inbox text-5xl text-gray-300"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-700 mb-2">No Documents Found</h3>
                <p class="text-gray-500">There are currently no documents in the system</p>
            </div>
        ` : `
            <div class="space-y-4">
                ${docs.map((doc, index) => {
        const currentStage = getDocumentWorkflowStage(doc);
        const progress = calculateWorkflowProgress(doc);

        return `
                        <div class="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style="animation-delay: ${index * 50}ms">
                            <div class="flex items-start justify-between gap-4">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                                            ${doc.reference}
                                        </span>
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${doc.type === 'resolution' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">
                                            <i class="bi bi-${doc.type === 'resolution' ? 'bookmark-star' : 'file-earmark-text'} mr-1"></i>
                                            ${doc.type || 'Document'}
                                        </span>
                                        ${getWorkflowStageBadge(currentStage)}
                                    </div>
                                    <h3 class="text-lg font-bold text-gray-800 mb-1">${doc.title}</h3>
                                    <p class="text-sm text-gray-600">${doc.author || 'Unknown Author'}</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-3xl font-bold ${progress === 100 ? 'text-green-600' : 'text-indigo-600'} mb-1">${progress}%</div>
                                    <p class="text-xs text-gray-500">Progress</p>
                                </div>
                            </div>
                            
                            <!-- Progress Bar -->
                            <div class="mt-4">
                                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div class="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500 shadow-sm" style="width: ${progress}%"></div>
                                </div>
                            </div>
                            
                            <!-- Workflow Checkpoints -->
                            <div class="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
                                ${getWorkflowCheckpoints(doc)}
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
        `}
    `;
}

// Render First Reading Content (uses existing full functionality)
function renderFirstReadingContent(docs) {
    // Call the existing renderFirstReading function content directly
    const firstReadingHtml = renderFirstReadingFullContent();
    return firstReadingHtml;
}

// Render Committee Content (uses existing full functionality)
function renderCommitteeContent(docs) {
    // Call the existing renderCommitteeStage function content directly
    const committeeHtml = renderCommitteeStageFullContent();
    return committeeHtml;
}

// Render Second Reading Content (uses existing full functionality)
function renderSecondReadingContent(docs) {
    // Call the existing renderSecondReading function content directly
    const secondReadingHtml = renderSecondReadingFullContent();
    return secondReadingHtml;
}

// Render Third Reading Content (uses existing full functionality)
function renderThirdReadingContent(docs) {
    // Call the existing renderThirdReading function content directly
    const thirdReadingHtml = renderThirdReadingFullContent();
    return thirdReadingHtml;
}

const docs = AppData.documents;

// Calculate workflow statistics
const stats = {
    total: docs.length,
    inFirstReading: docs.filter(d => d.firstReading && !d.firstReading.referred).length,
    inCommittee: docs.filter(d => d.committeeStage && d.committeeStage.assigned && !d.committeeStage.reportFiled).length,
    inSecondReading: docs.filter(d => d.secondReading && !d.secondReading.approved).length,
    inThirdReading: docs.filter(d => d.thirdReading && !d.thirdReading.passed).length,
    completed: docs.filter(d => (d.thirdReading && d.thirdReading.passed) || (d.secondReading && d.secondReading.resolutionFinalApproval)).length,
    resolutions: docs.filter(d => d.type === 'resolution').length,
    ordinances: docs.filter(d => d.type === 'ordinance').length
};

const html = `
        <!-- Premium Gradient Header -->
        <div class="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl shadow-2xl p-8 mb-6 text-white animate-fade-in overflow-hidden">
            <!-- Decorative Background -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div class="relative z-10 flex items-center gap-5">
                <div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-xl">
                    <i class="bi bi-diagram-3 text-5xl"></i>
                </div>
                <div>
                    <h1 class="text-4xl font-bold mb-2 tracking-tight">Legislative Workflow Tracking</h1>
                    <p class="text-red-50 text-base flex items-center gap-2">
                        <i class="bi bi-info-circle"></i>
                        Comprehensive tracking of documents through all legislative stages
                    </p>
                </div>
            </div>
        </div>

        <!-- Workflow Overview Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 animate-fade-in-up animation-delay-100">
            <div class="bg-white rounded-xl p-6 border-t-4 border-indigo-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-files text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${stats.total}</span>
                </div>
                <h3 class="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Total Documents</h3>
                <p class="text-xs text-gray-500">All proposals tracked</p>
            </div>

            <div class="bg-white rounded-xl p-6 border-t-4 border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-arrow-repeat text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${stats.inFirstReading + stats.inCommittee + stats.inSecondReading + stats.inThirdReading}</span>
                </div>
                <h3 class="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">In Progress</h3>
                <p class="text-xs text-gray-500">Currently processing</p>
            </div>

            <div class="bg-white rounded-xl p-6 border-t-4 border-green-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-check-circle text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${stats.completed}</span>
                </div>
                <h3 class="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">Completed</h3>
                <p class="text-xs text-gray-500">Fully processed</p>
            </div>

            <div class="bg-white rounded-xl p-6 border-t-4 border-purple-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-bookmark-star text-white text-2xl"></i>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold text-gray-800">${stats.resolutions}R / ${stats.ordinances}O</div>
                    </div>
                </div>
                <h3 class="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-1">Document Types</h3>
                <p class="text-xs text-gray-500">Resolutions / Ordinances</p>
            </div>
        </div>

        <!-- Workflow Pipeline Visualization -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 animate-fade-in-up animation-delay-200">
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <i class="bi bi-diagram-3-fill text-indigo-600 text-2xl"></i>
                    Workflow Pipeline
                </h2>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <!-- First Reading Stage -->
                    <div class="relative">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                                <i class="bi bi-1-circle text-white text-2xl"></i>
                            </div>
                            <h3 class="font-bold text-gray-800 text-sm mb-1">First Reading</h3>
                            <p class="text-2xl font-bold text-blue-600">${stats.inFirstReading}</p>
                            <p class="text-xs text-gray-500 mt-1">documents</p>
                        </div>
                        <div class="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                            <i class="bi bi-arrow-right text-gray-300 text-2xl"></i>
                        </div>
                    </div>

                    <!-- Committee Stage -->
                    <div class="relative">
                        <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                            <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                                <i class="bi bi-people text-white text-2xl"></i>
                            </div>
                            <h3 class="font-bold text-gray-800 text-sm mb-1">Committee</h3>
                            <p class="text-2xl font-bold text-indigo-600">${stats.inCommittee}</p>
                            <p class="text-xs text-gray-500 mt-1">documents</p>
                        </div>
                        <div class="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                            <i class="bi bi-arrow-right text-gray-300 text-2xl"></i>
                        </div>
                    </div>

                    <!-- Second Reading Stage -->
                    <div class="relative">
                        <div class="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                            <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                                <i class="bi bi-2-circle text-white text-2xl"></i>
                            </div>
                            <h3 class="font-bold text-gray-800 text-sm mb-1">Second Reading</h3>
                            <p class="text-2xl font-bold text-orange-600">${stats.inSecondReading}</p>
                            <p class="text-xs text-gray-500 mt-1">documents</p>
                        </div>
                        <div class="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                            <i class="bi bi-arrow-right text-gray-300 text-2xl"></i>
                        </div>
                    </div>

                    <!-- Third Reading Stage -->
                    <div class="relative">
                        <div class="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                                <i class="bi bi-3-circle text-white text-2xl"></i>
                            </div>
                            <h3 class="font-bold text-gray-800 text-sm mb-1">Third Reading</h3>
                            <p class="text-2xl font-bold text-green-600">${stats.inThirdReading}</p>
                            <p class="text-xs text-gray-500 mt-1">documents</p>
                        </div>
                        <div class="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                            <i class="bi bi-arrow-right text-gray-300 text-2xl"></i>
                        </div>
                    </div>

                    <!-- Completed Stage -->
                    <div>
                        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                            <div class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                                <i class="bi bi-check-circle-fill text-white text-2xl"></i>
                            </div>
                            <h3 class="font-bold text-gray-800 text-sm mb-1">Completed</h3>
                            <p class="text-2xl font-bold text-emerald-600">${stats.completed}</p>
                            <p class="text-xs text-gray-500 mt-1">documents</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Documents by Stage -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up animation-delay-300">
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <i class="bi bi-list-check text-indigo-600 text-2xl"></i>
                    All Documents - Workflow Status
                </h2>
            </div>
            <div class="p-6">
                ${docs.length === 0 ? `
                    <div class="text-center py-16">
                        <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                            <i class="bi bi-inbox text-5xl text-gray-300"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-700 mb-2">No Documents Found</h3>
                        <p class="text-gray-500">There are currently no documents in the system</p>
                    </div>
                ` : `
                    <div class="space-y-4">
                        ${docs.map((doc, index) => {
    const currentStage = getDocumentWorkflowStage(doc);
    const progress = calculateWorkflowProgress(doc);

    return `
                                <div class="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style="animation-delay: ${index * 50}ms">
                                    <div class="flex items-start justify-between gap-4">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-3 mb-2">
                                                <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                                                    ${doc.reference}
                                                </span>
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${doc.type === 'resolution' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">
                                                    <i class="bi bi-${doc.type === 'resolution' ? 'bookmark-star' : 'file-earmark-text'} mr-1"></i>
                                                    ${doc.type || 'Document'}
                                                </span>
                                                ${getWorkflowStageBadge(currentStage)}
                                            </div>
                                            <h3 class="text-lg font-bold text-gray-800 mb-1">${doc.title}</h3>
                                            <p class="text-sm text-gray-600">${doc.author || 'Unknown Author'}</p>
                                        </div>
                                        <div class="text-right">
                                            <div class="text-3xl font-bold ${progress === 100 ? 'text-green-600' : 'text-indigo-600'} mb-1">${progress}%</div>
                                            <p class="text-xs text-gray-500">Progress</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Progress Bar -->
                                    <div class="mt-4">
                                        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 shadow-sm" style="width: ${progress}%"></div>
                                        </div>
                                    </div>
                                    
                                    <!-- Workflow Checkpoints -->
                                    <div class="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
                                        ${getWorkflowCheckpoints(doc)}
                                    </div>
                                </div>
                            `;
}).join('')}
                    </div>
                `}
            </div>
        </div>
    `;

document.getElementById('content-area').innerHTML = html;


// Helper function to determine current workflow stage
function getDocumentWorkflowStage(doc) {
    if (doc.thirdReading && doc.thirdReading.passed) return 'completed';
    if (doc.secondReading && doc.secondReading.resolutionFinalApproval) return 'completed';
    if (doc.thirdReading) return 'third-reading';
    if (doc.secondReading && doc.secondReading.approved) return 'third-reading';
    if (doc.secondReading) return 'second-reading';
    if (doc.committeeStage && doc.committeeStage.reportFiled) return 'second-reading';
    if (doc.committeeStage && doc.committeeStage.assigned) return 'committee';
    if (doc.firstReading && doc.firstReading.referred) return 'committee';
    if (doc.firstReading) return 'first-reading';
    return 'submitted';
}

// Helper function to calculate workflow progress
function calculateWorkflowProgress(doc) {
    let progress = 0;

    // Submitted: 10%
    progress += 10;

    // First Reading: +20%
    if (doc.firstReading) progress += 20;

    // Committee Stage: +20%
    if (doc.committeeStage && doc.committeeStage.reportFiled) progress += 20;

    // Second Reading: +30%
    if (doc.secondReading && doc.secondReading.approved) progress += 30;

    // Third Reading (for ordinances) or Final (for resolutions): +20%
    if ((doc.thirdReading && doc.thirdReading.passed) || (doc.secondReading && doc.secondReading.resolutionFinalApproval)) progress += 20;

    return Math.min(progress, 100);
}

// Helper function to get workflow stage badge
function getWorkflowStageBadge(stage) {
    const badges = {
        'submitted': '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700"><i class="bi bi-circle-fill mr-1"></i>Submitted</span>',
        'first-reading': '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"><i class="bi bi-1-circle mr-1"></i>First Reading</span>',
        'committee': '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700"><i class="bi bi-people mr-1"></i>Committee</span>',
        'second-reading': '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700"><i class="bi bi-2-circle mr-1"></i>Second Reading</span>',
        'third-reading': '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700"><i class="bi bi-3-circle mr-1"></i>Third Reading</span>',
        'completed': '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700"><i class="bi bi-check-circle-fill mr-1"></i>Completed</span>'
    };
    return badges[stage] || badges['submitted'];
}

// Helper function to get workflow checkpoints
function getWorkflowCheckpoints(doc) {
    const checkpoints = [
        { name: '1st', checked: !!doc.firstReading, icon: 'bi-1-circle' },
        { name: 'Com', checked: doc.committeeStage && doc.committeeStage.reportFiled, icon: 'bi-people' },
        { name: '2nd', checked: doc.secondReading && doc.secondReading.approved, icon: 'bi-2-circle' },
        { name: '3rd', checked: doc.thirdReading && doc.thirdReading.passed, icon: 'bi-3-circle' },
        { name: 'Done', checked: (doc.thirdReading && doc.thirdReading.passed) || (doc.secondReading && doc.secondReading.resolutionFinalApproval), icon: 'bi-check-circle-fill' }
    ];

    return checkpoints.map(cp => `
        <div class="flex items-center justify-center p-2 rounded-lg ${cp.checked ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100 border-2 border-gray-200'}">
            <i class="bi ${cp.icon} ${cp.checked ? 'text-green-600' : 'text-gray-400'} mr-1"></i>
            <span class="text-xs font-semibold ${cp.checked ? 'text-green-700' : 'text-gray-500'}">${cp.name}</span>
        </div>
    `).join('');
}

// ==============================
// FIRST READING MANAGEMENT
// ==============================

function renderFirstReading() {
    const docs = AppData.documents;
    const html = `
        <!-- Premium Gradient Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 mb-6 text-white animate-fade-in">
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                    <i class="bi bi-1-circle text-4xl"></i>
                </div>
                <div>
                    <h1 class="text-3xl font-bold">First Reading Management</h1>
                    <p class="text-blue-100 text-sm mt-1">Schedule sessions, record minutes, and manage committee referrals</p>
                </div>
            </div>
        </div>

        <!-- Stats Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-fade-in-up animation-delay-100">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Total Documents</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.length}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-files text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">Scheduled</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.filter(d => d.firstReading && d.firstReading.scheduledAt).length}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-calendar-check text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-1">Referred</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.filter(d => d.firstReading && d.firstReading.referred).length}</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-people text-white text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Documents Grid -->
        <div class="grid grid-cols-1 gap-4 animate-fade-in-up animation-delay-200">
            ${docs.length === 0 ? `
                <div class="bg-white rounded-xl shadow-md p-12 text-center">
                    <i class="bi bi-inbox text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 text-lg">No documents available</p>
                </div>
            ` : docs.map((doc, index) => {
        // ensure firstReading object exists
        if (!doc.firstReading) doc.firstReading = {
            scheduledAt: null,
            minutes: '',
            referred: false,
            titleRead: false,
            titleReadAt: null,
            agendaIncluded: false,
            agendaDetails: null
        };
        const scheduled = doc.firstReading.scheduledAt ? doc.firstReading.scheduledAt : '';
        const hasMinutes = doc.firstReading.minutes && doc.firstReading.minutes.trim().length > 0;
        const isReferred = doc.firstReading.referred;
        const titleRead = doc.firstReading.titleRead || false;
        const agendaIncluded = doc.firstReading.agendaIncluded || false;

        return `
                    <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 animate-fade-in-up" style="animation-delay: ${100 + index * 50}ms">
                        <div class="p-6">
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex items-start gap-4 flex-1">
                                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                        <i class="bi bi-file-earmark-text text-white text-xl"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-2 flex-wrap">
                                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                                ${doc.reference}
                                            </span>
                                            ${isReferred ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800"><i class="bi bi-check-circle mr-1"></i>Referred</span>' : ''}
                                            ${titleRead ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800"><i class="bi bi-book mr-1"></i>Title Read</span>' : ''}
                                            ${agendaIncluded ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><i class="bi bi-list-check mr-1"></i>On Agenda</span>' : ''}
                                        </div>
                                        <h3 class="text-lg font-bold text-gray-800 mb-1">${doc.title}</h3>
                                        <p class="text-sm text-gray-600">${doc.type || 'Document'} ${doc.author ? '• ' + doc.author : ''}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Schedule Section -->
                            <div class="bg-gray-50 rounded-lg p-4 mb-4">
                                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="bi bi-calendar3 text-blue-600"></i>
                                    Schedule First Reading
                                </label>
                                <div class="flex items-center gap-2">
                                    <input 
                                        type="datetime-local" 
                                        id="fr-sched-${doc.id}" 
                                        value="${scheduled}" 
                                        class="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm font-medium"
                                    />
                                    <button 
                                        onclick="scheduleFirstReading(${doc.id})" 
                                        class="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm whitespace-nowrap"
                                    >
                                        <i class="bi bi-check2 mr-1"></i>Save
                                    </button>
                                </div>
                                ${scheduled ? `<p class="text-xs text-green-600 mt-2 flex items-center gap-1"><i class="bi bi-check-circle-fill"></i>Scheduled for ${new Date(scheduled).toLocaleString()}</p>` : ''}
                            </div>

                            <!-- Title Reading Tracking Section -->
                            <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="flex items-center gap-2">
                                            <i class="bi bi-book text-green-600 text-lg"></i>
                                            <span class="text-sm font-semibold text-gray-700">Title Reading</span>
                                        </div>
                                        ${titleRead ? `
                                            <span class="text-xs text-green-600 font-medium flex items-center gap-1">
                                                <i class="bi bi-check-circle-fill"></i>
                                                Read on ${doc.firstReading.titleReadAt ? new Date(doc.firstReading.titleReadAt).toLocaleString() : 'Unknown'}
                                            </span>
                                        ` : `
                                            <span class="text-xs text-gray-500">Not yet read</span>
                                        `}
                                    </div>
                                    <button 
                                        onclick="toggleTitleRead(${doc.id})" 
                                        class="px-4 py-2 ${titleRead ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-green-600 hover:bg-green-700 text-white'} rounded-lg font-semibold transition-all duration-200 text-xs whitespace-nowrap flex items-center gap-2"
                                    >
                                        <i class="bi bi-${titleRead ? 'x-circle' : 'check-circle'}"></i>
                                        ${titleRead ? 'Unmark' : 'Mark as Read'}
                                    </button>
                                </div>
                            </div>

                            <!-- Agenda Inclusion Section -->
                            <div class="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 mb-4">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="flex items-center gap-2">
                                            <i class="bi bi-list-check text-amber-600 text-lg"></i>
                                            <span class="text-sm font-semibold text-gray-700">Agenda Status</span>
                                        </div>
                                        ${agendaIncluded ? `
                                            <span class="text-xs text-amber-700 font-medium flex items-center gap-1">
                                                <i class="bi bi-check-circle-fill"></i>
                                                Included ${doc.firstReading.agendaDetails ? '• Session: ' + doc.firstReading.agendaDetails.sessionDate : ''}
                                            </span>
                                        ` : `
                                            <span class="text-xs text-gray-500">Not on agenda</span>
                                        `}
                                    </div>
                                    <button 
                                        onclick="toggleAgendaInclusion(${doc.id})" 
                                        class="px-4 py-2 ${agendaIncluded ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-amber-600 hover:bg-amber-700 text-white'} rounded-lg font-semibold transition-all duration-200 text-xs whitespace-nowrap flex items-center gap-2"
                                    >
                                        <i class="bi bi-${agendaIncluded ? 'x-circle' : 'plus-circle'}"></i>
                                        ${agendaIncluded ? 'Remove from Agenda' : 'Add to Agenda'}
                                    </button>
                                </div>
                            </div>

                            <!-- Minutes & Actions Section -->
                            <div class="flex items-center gap-3 flex-wrap">
                                <!-- Minutes Status -->
                                <div class="flex-1 bg-gray-50 rounded-lg p-3">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <i class="bi bi-journal-text text-gray-600"></i>
                                            <span class="text-sm font-medium text-gray-700">Minutes:</span>
                                            ${hasMinutes ?
                '<span class="text-xs text-green-600 font-semibold flex items-center gap-1"><i class="bi bi-check-circle-fill"></i>Recorded</span>' :
                '<span class="text-xs text-gray-400">Not recorded</span>'
            }
                                        </div>
                                        <div class="flex items-center gap-2">
                                            ${hasMinutes ? `<button onclick="viewFirstReadingMinutes(${doc.id})" class="px-3 py-1.5 bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-md text-xs font-medium transition-all"><i class="bi bi-eye mr-1"></i>View</button>` : ''}
                                            <button onclick="addFirstReadingMinutes(${doc.id})" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold transition-all transform hover:scale-105">
                                                <i class="bi bi-${hasMinutes ? 'pencil' : 'plus-lg'} mr-1"></i>${hasMinutes ? 'Edit' : 'Add'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Refer to Committee Button -->
                                <button 
                                    onclick="referToCommittee(${doc.id})" 
                                    class="px-6 py-3 ${isReferred ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transform hover:scale-105'} text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-sm whitespace-nowrap"
                                    ${isReferred ? 'disabled' : ''}
                                >
                                    <i class="bi bi-send mr-2"></i>
                                    ${isReferred ? 'Already Referred' : 'Refer to Committee'}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

function scheduleFirstReading(docId) {
    const input = document.getElementById(`fr-sched-${docId}`);
    if (!input) return;
    const value = input.value;
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.firstReading) doc.firstReading = { scheduledAt: null, minutes: '', referred: false };
    doc.firstReading.scheduledAt = value || null;
    showToast(value ? 'First reading scheduled' : 'First reading schedule cleared', 'success');
    renderFirstReading();
}

function addFirstReadingMinutes(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const existing = doc.firstReading && doc.firstReading.minutes ? doc.firstReading.minutes : '';
    openInputModal({
        title: `First reading minutes for ${doc.reference}`,
        defaultValue: existing,
        multiline: true,
        placeholder: 'Paste or type first reading minutes (plain text)...',
        onConfirm: (minutes) => {
            if (minutes === null || minutes === undefined) return;
            if (!doc.firstReading) doc.firstReading = { scheduledAt: null, minutes: '', referred: false };
            doc.firstReading.minutes = minutes.trim();
            showToast('First reading minutes saved', 'success');
            renderFirstReading();
        }
    });
}

function viewFirstReadingMinutes(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc || !doc.firstReading || !doc.firstReading.minutes) {
        showToast('No minutes available', 'warning');
        return;
    }
    openViewModal(`Minutes for ${doc.reference}`, `<pre class="whitespace-pre-wrap text-sm">${doc.firstReading.minutes.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`);
}

function referToCommittee(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    // Auto-trigger referral: set status and flag
    doc.status = 'referred';
    if (!doc.firstReading) doc.firstReading = { scheduledAt: null, minutes: '', referred: false };
    doc.firstReading.referred = true;

    // Add audit log entry
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({
        id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1),
        user: AppData.currentUser.name,
        action: 'refer',
        description: `Referred ${doc.reference} to committee`,
        timestamp: new Date().toLocaleString(),
        ipAddress: '127.0.0.1'
    });

    showToast('Document referred to committee and status updated', 'success');
    renderFirstReading();
}

function getFirstReadingBadge(doc) {
    if (doc.firstReading && doc.firstReading.referred) return '<span class="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">Referred to Committee</span>';
    if (doc.status === 'referred') return '<span class="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">Referred to Committee</span>';
    if (doc.firstReading && doc.firstReading.scheduledAt) return '<span class="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">Scheduled</span>';
    return '<span class="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">Pending</span>';
}

// Toggle title read status
function toggleTitleRead(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.firstReading) doc.firstReading = {
        scheduledAt: null,
        minutes: '',
        referred: false,
        titleRead: false,
        titleReadAt: null,
        agendaIncluded: false,
        agendaDetails: null
    };

    doc.firstReading.titleRead = !doc.firstReading.titleRead;

    if (doc.firstReading.titleRead) {
        doc.firstReading.titleReadAt = new Date().toISOString();
        showToast('Title marked as read', 'success');

        // Add audit log entry
        AppData.auditLogs = AppData.auditLogs || [];
        AppData.auditLogs.push({
            id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1),
            user: AppData.currentUser.name,
            action: 'title_read',
            description: `Marked title as read for ${doc.reference}`,
            timestamp: new Date().toLocaleString(),
            ipAddress: '127.0.0.1'
        });
    } else {
        doc.firstReading.titleReadAt = null;
        showToast('Title unmarked', 'info');
    }

    renderFirstReading();
}

// Toggle agenda inclusion
function toggleAgendaInclusion(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.firstReading) doc.firstReading = {
        scheduledAt: null,
        minutes: '',
        referred: false,
        titleRead: false,
        titleReadAt: null,
        agendaIncluded: false,
        agendaDetails: null
    };

    if (!doc.firstReading.agendaIncluded) {
        // Adding to agenda - prompt for session date
        openInputModal({
            title: `Add ${doc.reference} to Agenda`,
            defaultValue: '',
            multiline: false,
            placeholder: 'Enter session date (e.g., January 15, 2025)',
            onConfirm: (sessionDate) => {
                if (!sessionDate || sessionDate.trim() === '') {
                    showToast('Agenda inclusion cancelled', 'warning');
                    return;
                }

                doc.firstReading.agendaIncluded = true;
                doc.firstReading.agendaDetails = {
                    sessionDate: sessionDate.trim(),
                    addedAt: new Date().toISOString(),
                    addedBy: AppData.currentUser.name
                };

                showToast('Document added to agenda', 'success');

                // Add audit log entry
                AppData.auditLogs = AppData.auditLogs || [];
                AppData.auditLogs.push({
                    id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1),
                    user: AppData.currentUser.name,
                    action: 'add_to_agenda',
                    description: `Added ${doc.reference} to agenda for session: ${sessionDate}`,
                    timestamp: new Date().toLocaleString(),
                    ipAddress: '127.0.0.1'
                });

                renderFirstReading();
            }
        });
    } else {
        // Removing from agenda
        doc.firstReading.agendaIncluded = false;
        doc.firstReading.agendaDetails = null;
        showToast('Document removed from agenda', 'info');

        // Add audit log entry
        AppData.auditLogs = AppData.auditLogs || [];
        AppData.auditLogs.push({
            id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1),
            user: AppData.currentUser.name,
            action: 'remove_from_agenda',
            description: `Removed ${doc.reference} from agenda`,
            timestamp: new Date().toLocaleString(),
            ipAddress: '127.0.0.1'
        });

        renderFirstReading();
    }
}


// ==============================
// COMMITTEE STAGE MANAGEMENT
// ==============================

function renderCommitteeStage() {
    const docs = AppData.documents;
    const committeeDocsAll = docs.filter(d => d.committeeStage);
    const committeeDocsActive = committeeDocsAll.filter(d => d.committeeStage.assigned && !d.committeeStage.reportFiled);
    const committeeDocsCompleted = committeeDocsAll.filter(d => d.committeeStage.reportFiled);

    const html = `
        <!-- Premium Gradient Header with Enhanced Design -->
        <div class="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-2xl shadow-2xl p-8 mb-6 text-white animate-fade-in overflow-hidden">
            <!-- Decorative Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div class="relative z-10 flex items-center gap-5">
                <div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-xl">
                    <i class="bi bi-people-fill text-5xl"></i>
                </div>
                <div>
                    <h1 class="text-4xl font-bold mb-2 tracking-tight">Committee Stage</h1>
                    <p class="text-purple-100 text-base flex items-center gap-2">
                        <i class="bi bi-info-circle"></i>
                        Manage committee assignments, hearings, deliberations, and reports
                    </p>
                </div>
            </div>
        </div>

        <!-- Enhanced Stats Overview Cards with Icons & Progress -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 animate-fade-in-up animation-delay-100">
            <!-- Total in Committee -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-purple-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-people text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${committeeDocsAll.length}</span>
                </div>
                <h3 class="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-1">Total Documents</h3>
                <p class="text-xs text-gray-500">In committee stage</p>
            </div>
            
            <!-- Active Reviews -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-clock-history text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${committeeDocsActive.length}</span>
                </div>
                <h3 class="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Active Reviews</h3>
                <p class="text-xs text-gray-500">Currently in progress</p>
            </div>
            
            <!-- Hearings Scheduled -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-indigo-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-calendar-event text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${docs.filter(d => d.committeeStage && d.committeeStage.hearingDate).length}</span>
                </div>
                <h3 class="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Hearings Scheduled</h3>
                <p class="text-xs text-gray-500">Upcoming & completed</p>
            </div>
            
            <!-- Reports Completed -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-green-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-file-earmark-check text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${committeeDocsCompleted.length}</span>
                </div>
                <h3 class="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">Reports Filed</h3>
                <p class="text-xs text-gray-500">Ready for next stage</p>
            </div>
        </div>

        <!-- Documents Section with Enhanced Cards -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 animate-fade-in-up animation-delay-200">
            <div class="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-purple-100">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <i class="bi bi-folder-open text-purple-600 text-2xl"></i>
                        Committee Documents
                    </h2>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                        ${docs.length} total
                    </span>
                </div>
            </div>
            
            <div class="p-6">
                ${docs.length === 0 ? `
                    <div class="text-center py-16">
                        <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                            <i class="bi bi-inbox text-5xl text-gray-300"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-700 mb-2">No Documents Found</h3>
                        <p class="text-gray-500">There are currently no documents in the committee stage</p>
                    </div>
                ` : `
                    <div class="space-y-5">
                        ${docs.map((doc, index) => {
        if (!doc.committeeStage) doc.committeeStage = { assigned: false, committee: '', hearingDate: '', reportFiled: false, report: '' };
        const hasCommittee = doc.committeeStage.committee && doc.committeeStage.committee.trim().length > 0;
        const hasHearing = doc.committeeStage.hearingDate && doc.committeeStage.hearingDate.trim().length > 0;
        const hasReport = doc.committeeStage.reportFiled;
        const isComplete = hasCommittee && hasReport;
        const progress = (!hasCommittee ? 0 : !hasHearing ? 33 : !hasReport ? 66 : 100);

        return `
                                <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-purple-200 animate-fade-in-up" style="animation-delay: ${100 + index * 50}ms">
                                    <!-- Card Header -->
                                    <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-4">
                                                <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                                                    <i class="bi bi-file-earmark-text text-white text-2xl"></i>
                                                </div>
                                                <div>
                                                    <div class="flex items-center gap-2 mb-1">
                                                        <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-white/90 text-purple-700 shadow-sm">
                                                            ${doc.reference}
                                                        </span>
                                                        ${isComplete ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-400 text-white"><i class="bi bi-check-circle-fill mr-1"></i>Complete</span>' : ''}
                                                        ${hasHearing && !hasReport ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-400 text-white"><i class="bi bi-clock-fill mr-1"></i>In Progress</span>' : ''}
                                                    </div>
                                                    <h3 class="text-lg font-bold text-white line-clamp-1">${doc.title}</h3>
                                                    <p class="text-sm text-purple-100">${doc.type || 'Document'} ${doc.author ? '• ' + doc.author : ''}</p>
                                                </div>
                                            </div>
                                            <div class="text-right">
                                                <div class="text-3xl font-bold text-white mb-1">${progress}%</div>
                                                <p class="text-xs text-purple-100">Progress</p>
                                            </div>
                                        </div>
                                        
                                        <!-- Progress Bar -->
                                        <div class="mt-4">
                                            <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                                                <div class="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500 shadow-sm" style="width: ${progress}%"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Card Body -->
                                    <div class="p-6">
                                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                            <!-- Committee Assignment -->
                                            <div class="bg-white rounded-xl p-5 border-2 border-purple-100 shadow-sm hover:shadow-md transition-all">
                                                <label class="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                                    <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                        <i class="bi bi-people text-purple-600"></i>
                                                    </div>
                                                    <span>Committee Assignment</span>
                                                    ${hasCommittee ? '<span class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700"><i class="bi bi-check-circle-fill mr-1"></i>Assigned</span>' : '<span class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500"><i class="bi bi-dash-circle mr-1"></i>Not Assigned</span>'}
                                                </label>
                                                <div class="flex items-center gap-2">
                                                    <input 
                                                        type="text" 
                                                        id="comm-${doc.id}" 
                                                        value="${doc.committeeStage.committee || ''}" 
                                                        placeholder="e.g., Finance Committee"
                                                        class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-sm font-medium placeholder-gray-400"
                                                    />
                                                    <button 
                                                        onclick="assignCommittee(${doc.id})" 
                                                        class="px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm whitespace-nowrap"
                                                    >
                                                        <i class="bi bi-check2 mr-1"></i>Assign
                                                    </button>
                                                </div>
                                                ${hasCommittee ? `<p class="mt-2 text-xs text-green-600 flex items-center gap-1"><i class="bi bi-info-circle-fill"></i>Assigned to: <span class="font-semibold">${doc.committeeStage.committee}</span></p>` : ''}
                                            </div>

                                            <!-- Hearing Schedule -->
                                            <div class="bg-white rounded-xl p-5 border-2 border-indigo-100 shadow-sm hover:shadow-md transition-all">
                                                <label class="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                                    <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                        <i class="bi bi-calendar-event text-indigo-600"></i>
                                                    </div>
                                                    <span>Committee Hearing</span>
                                                    ${hasHearing ? '<span class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700"><i class="bi bi-check-circle-fill mr-1"></i>Scheduled</span>' : '<span class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500"><i class="bi bi-dash-circle mr-1"></i>Not Scheduled</span>'}
                                                </label>
                                                <div class="flex items-center gap-2">
                                                    <input 
                                                        type="datetime-local" 
                                                        id="hearing-${doc.id}" 
                                                        value="${doc.committeeStage.hearingDate || ''}" 
                                                        class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-sm font-medium"
                                                    />
                                                    <button 
                                                        onclick="scheduleHearing(${doc.id})" 
                                                        class="px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm whitespace-nowrap"
                                                    >
                                                        <i class="bi bi-check2 mr-1"></i>Save
                                                    </button>
                                                </div>
                                                ${hasHearing ? `<p class="mt-2 text-xs text-green-600 flex items-center gap-1"><i class="bi bi-calendar-check-fill"></i>${new Date(doc.committeeStage.hearingDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>` : ''}
                                            </div>
                                        </div>

                                        <!-- Committee Report Section -->
                                        <div class="mt-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-100">
                                            <div class="flex items-center justify-between mb-3">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                                                        <i class="bi bi-file-earmark-text text-white text-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-sm font-bold text-gray-800">Committee Report</h4>
                                                        <p class="text-xs text-gray-600">Findings and recommendations</p>
                                                    </div>
                                                </div>
                                                ${hasReport ?
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-green-500 text-white shadow-md"><i class="bi bi-check-circle-fill mr-1.5"></i>Report Filed</span>' :
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200"><i class="bi bi-exclamation-triangle-fill mr-1.5"></i>Pending</span>'
            }
                                            </div>
                                            
                                            ${hasReport ? `
                                                <div class="bg-white rounded-lg p-4 mb-3 border border-green-200">
                                                    <p class="text-sm text-gray-700 leading-relaxed line-clamp-3">${doc.committeeStage.report || 'No report content'}</p>
                                                </div>
                                            ` : ''}
                                            
                                            <button 
                                                onclick="fileCommitteeReport(${doc.id})" 
                                                class="w-full px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                                            >
                                                <i class="bi bi-${hasReport ? 'pencil-square' : 'file-earmark-plus'} mr-2"></i>${hasReport ? 'Edit Committee Report' : 'File Committee Report'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
    }).join('')}
                    </div>
                `}
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

function assignCommittee(docId) {
    const input = document.getElementById(`comm-${docId}`);
    if (!input) return;
    const value = input.value.trim();
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.committeeStage) doc.committeeStage = { assigned: false, committee: '', hearingDate: '', reportFiled: false, report: '' };
    doc.committeeStage.committee = value;
    doc.committeeStage.assigned = value.length > 0;
    showToast(value ? 'Committee assigned' : 'Committee assignment cleared', 'success');
    renderCommitteeStage();
}

function scheduleHearing(docId) {
    const input = document.getElementById(`hearing-${docId}`);
    if (!input) return;
    const value = input.value;
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.committeeStage) doc.committeeStage = { assigned: false, committee: '', hearingDate: '', reportFiled: false, report: '' };
    doc.committeeStage.hearingDate = value || '';
    showToast(value ? 'Hearing scheduled' : 'Hearing schedule cleared', 'success');
    renderCommitteeStage();
}

function fileCommitteeReport(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const existing = doc.committeeStage && doc.committeeStage.report ? doc.committeeStage.report : '';
    openInputModal({
        title: `Committee report for ${doc.reference}`,
        defaultValue: existing,
        multiline: true,
        placeholder: 'Enter committee findings and recommendations...',
        onConfirm: (report) => {
            if (report === null || report === undefined) return;
            if (!doc.committeeStage) doc.committeeStage = { assigned: false, committee: '', hearingDate: '', reportFiled: false, report: '' };
            doc.committeeStage.report = report.trim();
            doc.committeeStage.reportFiled = report.trim().length > 0;
            showToast('Committee report filed', 'success');
            renderCommitteeStage();
        }
    });
}

// ==============================
// SECOND READING MANAGEMENT
// ==============================

function renderSecondReading() {
    const docs = AppData.documents;
    const secondReadingDocsAll = docs.filter(d => d.secondReading);
    const secondReadingDocsActive = secondReadingDocsAll.filter(d => !d.secondReading.approved);
    const secondReadingDocsApproved = secondReadingDocsAll.filter(d => d.secondReading.approved);

    const html = `
        <!-- Premium Gradient Header with Enhanced Design -->
        <div class="relative bg-gradient-to-br from-amber-500 via-orange-400 to-orange-500 rounded-2xl shadow-2xl p-8 mb-6 text-white animate-fade-in overflow-hidden">
            <!-- Decorative Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div class="relative z-10 flex items-center gap-5">
                <div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-xl">
                    <i class="bi bi-2-circle text-5xl"></i>
                </div>
                <div>
                    <h1 class="text-4xl font-bold mb-2 tracking-tight">Second Reading</h1>
                    <p class="text-orange-50 text-base flex items-center gap-2">
                        <i class="bi bi-info-circle"></i>
                        Debate, interpellation, amendments, and detailed deliberation
                    </p>
                </div>
            </div>
        </div>

        <!-- Enhanced Stats Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 animate-fade-in-up animation-delay-100">
            <!-- Total Documents -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-chat-left-text text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${secondReadingDocsAll.length}</span>
                </div>
                <h3 class="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-1">Total Documents</h3>
                <p class="text-xs text-gray-500">In second reading</p>
            </div>
            
            <!-- Active Debates -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-orange-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-megaphone text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${secondReadingDocsActive.length}</span>
                </div>
                <h3 class="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-1">Active Debates</h3>
                <p class="text-xs text-gray-500">Pending approval</p>
            </div>
            
            <!-- Amendments Filed -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-amber-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-pencil-square text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${docs.filter(d => d.secondReading && d.secondReading.amendments).length}</span>
                </div>
                <h3 class="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-1">With Amendments</h3>
                <p class="text-xs text-gray-500">Proposals submitted</p>
            </div>
            
            <!-- Approved -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-green-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-check-circle text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${secondReadingDocsApproved.length}</span>
                </div>
                <h3 class="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">Approved</h3>
                <p class="text-xs text-gray-500">Ready for third reading</p>
            </div>
        </div>

        <!-- Documents Section with Enhanced Cards -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 animate-fade-in-up animation-delay-200">
            <div class="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <i class="bi bi-folder-open text-amber-600 text-2xl"></i>
                        Second Reading Documents
                    </h2>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-amber-100 text-amber-700">
                        ${docs.length} total
                    </span>
                </div>
            </div>
            
            <div class="p-6">
                ${docs.length === 0 ? `
                    <div class="text-center py-16">
                        <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                            <i class="bi bi-inbox text-5xl text-gray-300"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-700 mb-2">No Documents Found</h3>
                        <p class="text-gray-500">There are currently no documents in second reading</p>
                    </div>
                ` : `
                    <div class="space-y-5">
                        ${docs.map((doc, index) => {
        if (!doc.secondReading) doc.secondReading = {
            debateDate: '',
            amendments: '',
            approved: false,
            committeeReportSynced: false,
            committeeReportSource: null,
            rulesReview: {
                reviewed: false,
                reviewedBy: null,
                reviewedAt: null,
                approved: false
            },
            isResolution: doc.type === 'resolution',
            resolutionFinalApproval: false
        };
        const hasDebate = doc.secondReading.debateDate && doc.secondReading.debateDate.trim().length > 0;
        const hasAmendments = doc.secondReading.amendments && doc.secondReading.amendments.trim().length > 0;
        const isApproved = doc.secondReading.approved;
        const isResolution = doc.secondReading.isResolution || doc.type === 'resolution';
        const rulesReviewed = doc.secondReading.rulesReview && doc.secondReading.rulesReview.reviewed;
        const progress = (!hasDebate ? 0 : !hasAmendments ? 50 : !isApproved ? 75 : 100);

        return `
                                <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-yellow-200 animate-fade-in-up" style="animation-delay: ${100 + index * 50}ms">
                                    <!-- Card Header -->
                                    <div class="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-4">
                                                <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                                                    <i class="bi bi-file-earmark-text text-white text-2xl"></i>
                                                </div>
                                                <div>
                                                    <div class="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-white/90 text-amber-700 shadow-sm">
                                                            ${doc.reference}
                                                        </span>
                                                        ${isResolution ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-400 text-white"><i class="bi bi-bookmark-star-fill mr-1"></i>Resolution</span>' : ''}
                                                        ${rulesReviewed ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-400 text-white"><i class="bi bi-shield-check mr-1"></i>Rules Approved</span>' : ''}
                                                        ${isApproved ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-400 text-white"><i class="bi bi-check-circle-fill mr-1"></i>Approved</span>' : ''}
                                                        ${hasDebate && !isApproved ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-400 text-white"><i class="bi bi-clock-fill mr-1"></i>In Debate</span>' : ''}
                                                    </div>
                                                    <h3 class="text-lg font-bold text-white line-clamp-1">${doc.title}</h3>
                                                    <p class="text-sm text-orange-100">${doc.type || 'Document'} ${doc.author ? '• ' + doc.author : ''}</p>
                                                </div>
                                            </div>
                                            <div class="text-right">
                                                <div class="text-3xl font-bold text-white mb-1">${progress}%</div>
                                                <p class="text-xs text-orange-100">Progress</p>
                                            </div>
                                        </div>
                                        
                                        <!-- Progress Bar -->
                                        <div class="mt-4">
                                            <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                                                <div class="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500 shadow-sm" style="width: ${progress}%"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Card Body -->
                                    <div class="p-6">
                                        <!-- Committee Recommendation Section -->
                                        <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border-2 border-purple-100 mb-5">
                                            <div class="flex items-center justify-between mb-3">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                                                        <i class="bi bi-people text-white text-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-sm font-bold text-gray-800">Committee Report</h4>
                                                        <p class="text-xs text-gray-600">${doc.secondReading.committeeReportSynced ? 'Synced from Committee System' : 'Manual entry'}</p>
                                                    </div>
                                                </div>
                                                ${doc.secondReading.recommendation ?
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-500 text-white shadow-md"><i class="bi bi-check-circle-fill mr-1.5"></i>Filed</span>' :
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200"><i class="bi bi-dash-circle mr-1.5"></i>None</span>'
            }
                                            </div>
                                            ${doc.secondReading.recommendation ? `
                                                <div class="bg-white rounded-lg p-4 mb-3 border border-purple-200">
                                                    ${doc.secondReading.committeeReportSource ? `<p class="text-xs font-semibold text-purple-600 mb-2"><i class="bi bi-link-45deg mr-1"></i>From: ${doc.secondReading.committeeReportSource}</p>` : ''}
                                                    <p class="text-sm text-gray-700 leading-relaxed line-clamp-3">${doc.secondReading.recommendation}</p>
                                                </div>
                                            ` : ''}
                                            <div class="flex gap-2">
                                                <button 
                                                    onclick="syncCommitteeReport(${doc.id})" 
                                                    class="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                                                >
                                                    <i class="bi bi-arrow-repeat mr-2"></i>Sync from Committee
                                                </button>
                                                <button 
                                                    onclick="addCommitteeRec(${doc.id})" 
                                                    class="flex-1 px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                                                >
                                                    <i class="bi bi-${doc.secondReading.recommendation ? 'pencil-square' : 'plus-lg'} mr-2"></i>${doc.secondReading.recommendation ? 'Edit' : 'Add'} Manual
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Committee on Rules / Floor Leader Review Section -->
                                        <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-5 border-2 border-teal-100 mb-5">
                                            <div class="flex items-center justify-between mb-3">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                                                        <i class="bi bi-shield-check text-white text-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-sm font-bold text-gray-800">Rules Committee Review</h4>
                                                        <p class="text-xs text-gray-600">Majority Floor Leader approval</p>
                                                    </div>
                                                </div>
                                                ${rulesReviewed ?
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500 text-white shadow-md"><i class="bi bi-check-circle-fill mr-1.5"></i>Approved</span>' :
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200"><i class="bi bi-hourglass-split mr-1.5"></i>Pending</span>'
            }
                                            </div>
                                            ${rulesReviewed ? `
                                                <div class="bg-white rounded-lg p-4 mb-3 border border-teal-200">
                                                    <p class="text-xs text-teal-700 mb-1"><i class="bi bi-person-check mr-1"></i>Reviewed by: ${doc.secondReading.rulesReview.reviewedBy || 'Unknown'}</p>
                                                    <p class="text-xs text-gray-600"><i class="bi bi-calendar mr-1"></i>Date: ${doc.secondReading.rulesReview.reviewedAt ? new Date(doc.secondReading.rulesReview.reviewedAt).toLocaleString() : 'Unknown'}</p>
                                                </div>
                                            ` : ''}
                                            <button 
                                                onclick="toggleRulesReview(${doc.id})" 
                                                class="w-full px-5 py-3 ${rulesReviewed ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800'} text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                                                ${rulesReviewed ? 'disabled' : ''}
                                            >
                                                <i class="bi bi-${rulesReviewed ? 'check-circle-fill' : 'shield-check'} mr-2"></i>${rulesReviewed ? 'Already Approved' : 'Mark as Reviewed & Approved'}
                                            </button>
                                        </div>

                                        <!-- Debate & Interpellation Section -->
                                        <div class="bg-white rounded-xl p-5 border-2 border-amber-100 shadow-sm hover:shadow-md transition-all mb-5">
                                            <div class="flex items-center justify-between mb-3">
                                                <label class="block text-sm font-bold text-gray-700 flex items-center gap-2">
                                                    <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                                        <i class="bi bi-megaphone text-amber-600"></i>
                                                    </div>
                                                    <span>Debate Schedule</span>
                                                </label>
                                                ${hasDebate ? '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700"><i class="bi bi-check-circle-fill mr-1"></i>Scheduled</span>' : '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500"><i class="bi bi-dash-circle mr-1"></i>Not Scheduled</span>'}
                                            </div>
                                            <div class="flex items-center gap-2 mb-3">
                                                <input 
                                                    type="datetime-local" 
                                                    id="debate-${doc.id}" 
                                                    value="${doc.secondReading.debateDate || ''}" 
                                                    class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none text-sm font-medium"
                                                />
                                                <button 
                                                    onclick="scheduleDebate(${doc.id})" 
                                                    class="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm whitespace-nowrap"
                                                >
                                                    <i class="bi bi-check2 mr-1"></i>Save
                                                </button>
                                            </div>
                                            ${hasDebate ? `<p class="text-xs text-green-600 flex items-center gap-1 mb-3"><i class="bi bi-calendar-check-fill"></i>${new Date(doc.secondReading.debateDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>` : ''}
                                            
                                            <!-- Debate Notes -->
                                            <div class="mt-3 pt-3 border-t border-gray-100">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-xs font-semibold text-gray-700">Debate Notes & Interpellation</span>
                                                    ${doc.secondReading.debate ? '<span class="text-xs text-green-600"><i class="bi bi-check-circle-fill mr-1"></i>Recorded</span>' : ''}
                                                </div>
                                                <div class="flex gap-2">
                                                    <button 
                                                        onclick="addDebateNotes(${doc.id})" 
                                                        class="flex-1 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-all text-xs"
                                                    >
                                                        <i class="bi bi-${doc.secondReading.debate ? 'pencil' : 'plus-lg'} mr-1"></i>${doc.secondReading.debate ? 'Edit' : 'Add'} Notes
                                                    </button>
                                                    ${doc.secondReading.debate ? `
                                                        <button 
                                                            onclick="viewDebateNotes(${doc.id})" 
                                                            class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all text-xs"
                                                        >
                                                            <i class="bi bi-eye mr-1"></i>View
                                                        </button>
                                                    ` : ''}
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Amendments Section -->
                                        <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-orange-100 mb-5">
                                            <div class="flex items-center justify-between mb-3">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                                                        <i class="bi bi-pencil-square text-white text-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-sm font-bold text-gray-800">Proposed Amendments</h4>
                                                        <p class="text-xs text-gray-600">Changes and modifications</p>
                                                    </div>
                                                </div>
                                                ${doc.secondReading.amendments && (Array.isArray(doc.secondReading.amendments) ? doc.secondReading.amendments.length > 0 : doc.secondReading.amendments.trim()) ?
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-500 text-white shadow-md"><i class="bi bi-check-circle-fill mr-1.5"></i>Filed</span>' :
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200"><i class="bi bi-dash-circle mr-1.5"></i>None</span>'
            }
                                            </div>
                                            
                                            ${doc.secondReading.amendments && (Array.isArray(doc.secondReading.amendments) ? doc.secondReading.amendments.length > 0 : doc.secondReading.amendments.trim()) ? `
                                                <div class="bg-white rounded-lg p-4 mb-3 border border-orange-200">
                                                    <p class="text-xs font-semibold text-gray-600 mb-2">${Array.isArray(doc.secondReading.amendments) ? doc.secondReading.amendments.length + ' amendment(s) filed' : 'Amendment filed'}</p>
                                                </div>
                                            ` : ''}
                                            
                                            <button 
                                                onclick="manageSecondReadingAmendments(${doc.id})" 
                                                class="w-full px-5 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                                            >
                                                <i class="bi bi-list-ul mr-2"></i>Manage Amendments
                                            </button>
                                        </div>

                                        <!-- Voting Results Section -->
                                        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-100 mb-5">
                                            <div class="flex items-center justify-between mb-3">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                                        <i class="bi bi-hand-thumbs-up text-white text-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-sm font-bold text-gray-800">Voting Results</h4>
                                                        <p class="text-xs text-gray-600">Second reading votes</p>
                                                    </div>
                                                </div>
                                                ${doc.secondReading.voting && (doc.secondReading.voting.yesVotes > 0 || doc.secondReading.voting.noVotes > 0) ?
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500 text-white shadow-md"><i class="bi bi-check-circle-fill mr-1.5"></i>Recorded</span>' :
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200"><i class="bi bi-dash-circle mr-1.5"></i>No Votes</span>'
            }
                                            </div>
                                            
                                            ${doc.secondReading.voting && (doc.secondReading.voting.yesVotes > 0 || doc.secondReading.voting.noVotes > 0) ? `
                                                <div class="bg-white rounded-lg p-4 mb-3 border border-blue-200">
                                                    <div class="grid grid-cols-3 gap-4 text-center">
                                                        <div>
                                                            <div class="text-2xl font-bold text-green-600">${doc.secondReading.voting.yesVotes || 0}</div>
                                                            <div class="text-xs text-gray-600">Yes</div>
                                                        </div>
                                                        <div>
                                                            <div class="text-2xl font-bold text-red-600">${doc.secondReading.voting.noVotes || 0}</div>
                                                            <div class="text-xs text-gray-600">No</div>
                                                        </div>
                                                        <div>
                                                            <div class="text-2xl font-bold text-gray-600">${doc.secondReading.voting.abstain || 0}</div>
                                                            <div class="text-xs text-gray-600">Abstain</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ` : ''}
                                            
                                            <button 
                                                onclick="recordVotes(${doc.id})" 
                                                class="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                                            >
                                                <i class="bi bi-${doc.secondReading.voting && (doc.secondReading.voting.yesVotes > 0 || doc.secondReading.voting.noVotes > 0) ? 'pencil-square' : 'plus-lg'} mr-2"></i>${doc.secondReading.voting && (doc.secondReading.voting.yesVotes > 0 || doc.secondReading.voting.noVotes > 0) ? 'Update' : 'Record'} Votes
                                            </button>
                                        </div>

                                        <!-- Approval & Progress Section -->
                                        <div class="bg-gradient-to-br ${isApproved ? 'from-green-50 to-emerald-50 border-green-200' : 'from-indigo-50 to-purple-50 border-indigo-200'} rounded-xl p-5 border-2">
                                            <div class="flex items-center justify-between mb-3">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-10 h-10 bg-gradient-to-br ${isApproved ? 'from-green-500 to-green-600' : 'from-indigo-500 to-indigo-600'} rounded-xl flex items-center justify-center shadow-md">
                                                        <i class="bi bi-${isApproved ? 'check-circle' : 'hourglass-split'} text-white text-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-sm font-bold text-gray-800">${isResolution ? 'Final Approval' : 'Approval Status'}</h4>
                                                        <p class="text-xs text-gray-600">${isApproved ? (isResolution ? 'Resolution completed' : 'Ready for Third Reading') : 'Pending completion'}</p>
                                                    </div>
                                                </div>
                                                ${isApproved ?
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-green-500 text-white shadow-md"><i class="bi bi-check-circle-fill mr-1.5"></i>Approved</span>' :
                '<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200"><i class="bi bi-clock-fill mr-1.5"></i>Pending</span>'
            }
                                            </div>
                                            
                                            ${isResolution && !isApproved ? `
                                                <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-3">
                                                    <p class="text-sm text-purple-800 font-semibold flex items-center gap-2 mb-2">
                                                        <i class="bi bi-info-circle-fill"></i>
                                                        Resolution Endpoint
                                                    </p>
                                                    <p class="text-xs text-purple-700">
                                                        This is a <strong>Resolution</strong>. Upon approval, it will be marked as complete and will <strong>NOT</strong> proceed to Third Reading.
                                                    </p>
                                                </div>
                                            ` : ''}
                                            
                                            ${!isApproved ? `
                                                <button 
                                                    onclick="${isResolution ? 'approveResolution' : 'progressToThirdReading'}(${doc.id})" 
                                                    class="w-full px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                                                >
                                                    <i class="bi bi-${isResolution ? 'check-circle-fill' : 'arrow-right-circle'} mr-2"></i>${isResolution ? 'Approve Resolution (Final)' : 'Progress to Third Reading'}
                                                </button>
                                            ` : `
                                                <div class="bg-white rounded-lg p-4 border border-green-200">
                                                    <p class="text-sm text-green-700 font-semibold flex items-center gap-2">
                                                        <i class="bi bi-check-circle-fill text-lg"></i>
                                                        ${isResolution ? 'This resolution has been approved and completed' : 'This document has been completed and progressed to Third Reading'}
                                                    </p>
                                                </div>
                                            `}
                                        </div>
                                    </div>
                                </div>
                            `;
    }).join('')}
                    </div>
                `}
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

function scheduleDebate(docId) {
    const input = document.getElementById(`debate-${docId}`);
    if (!input) return;
    const value = input.value;
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.secondReading) doc.secondReading = { debateDate: '', amendments: '', approved: false };
    doc.secondReading.debateDate = value || '';
    showToast(value ? 'Debate scheduled' : 'Debate schedule cleared', 'success');
    renderSecondReading();
}

function fileAmendments(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const existing = doc.secondReading && doc.secondReading.amendments ? doc.secondReading.amendments : '';
    openInputModal({
        title: `Amendments for ${doc.reference}`,
        defaultValue: existing,
        multiline: true,
        placeholder: 'Enter proposed amendments...',
        onConfirm: (amendments) => {
            if (amendments === null || amendments === undefined) return;
            if (!doc.secondReading) doc.secondReading = { debateDate: '', amendments: '', approved: false };
            doc.secondReading.amendments = amendments.trim();
            showToast('Amendments filed', 'success');
            renderSecondReading();
        }
    });
}

function approveSecondReading(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.secondReading) doc.secondReading = { debateDate: '', amendments: '', approved: false };
    doc.secondReading.approved = true;
    showToast('Second reading approved', 'success');
    renderSecondReading();
}

// Sync committee report from Committee System
function syncCommitteeReport(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    // Check if document has committee stage data
    if (doc.committeeStage && doc.committeeStage.report && doc.committeeStage.report.trim()) {
        if (!doc.secondReading) doc.secondReading = { debateDate: '', amendments: '', approved: false };

        doc.secondReading.recommendation = doc.committeeStage.report;
        doc.secondReading.committeeReportSynced = true;
        doc.secondReading.committeeReportSource = doc.committeeStage.committee || 'Committee System';

        showToast('Committee report synced successfully', 'success');

        // Add audit log
        AppData.auditLogs = AppData.auditLogs || [];
        AppData.auditLogs.push({
            id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1),
            user: AppData.currentUser.name,
            action: 'sync_committee_report',
            description: `Synced committee report from ${doc.committeeStage.committee || 'Committee System'} for ${doc.reference}`,
            timestamp: new Date().toLocaleString(),
            ipAddress: '127.0.0.1'
        });

        renderSecondReading();
    } else {
        showToast('No committee report found to sync. Please ensure the document has gone through committee stage.', 'warning');
    }
}

// Toggle Rules Committee / Floor Leader review
function toggleRulesReview(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.secondReading) doc.secondReading = { debateDate: '', amendments: '', approved: false };
    if (!doc.secondReading.rulesReview) {
        doc.secondReading.rulesReview = {
            reviewed: false,
            reviewedBy: null,
            reviewedAt: null,
            approved: false
        };
    }

    if (doc.secondReading.rulesReview.reviewed) {
        showToast('This document has already been reviewed', 'info');
        return;
    }

    doc.secondReading.rulesReview.reviewed = true;
    doc.secondReading.rulesReview.reviewedBy = AppData.currentUser.name;
    doc.secondReading.rulesReview.reviewedAt = new Date().toISOString();
    doc.secondReading.rulesReview.approved = true;

    showToast('Document approved by Rules Committee / Floor Leader', 'success');

    // Add audit log
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({
        id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1),
        user: AppData.currentUser.name,
        action: 'rules_review',
        description: `Approved ${doc.reference} by Rules Committee / Floor Leader`,
        timestamp: new Date().toLocaleString(),
        ipAddress: '127.0.0.1'
    });

    renderSecondReading();
}

// Approve resolution (endpoint - no third reading)
function approveResolution(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.secondReading) doc.secondReading = { debateDate: '', amendments: '', approved: false };

    doc.secondReading.approved = true;
    doc.secondReading.resolutionFinalApproval = true;
    doc.status = 'approved';

    showToast('Resolution approved and finalized (no Third Reading required)', 'success');

    // Add audit log
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({
        id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1),
        user: AppData.currentUser.name,
        action: 'approve_resolution',
        description: `Approved resolution ${doc.reference} - endpoint at Second Reading`,
        timestamp: new Date().toLocaleString(),
        ipAddress: '127.0.0.1'
    });

    renderSecondReading();
}

// Progress to third reading (existing function - update to handle resolutions)
function progressToThirdReading(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    // Check if it's a resolution
    if (doc.type === 'resolution' || (doc.secondReading && doc.secondReading.isResolution)) {
        showToast('This is a resolution. Use "Approve Resolution" instead.', 'warning');
        return;
    }

    if (!doc.secondReading) doc.secondReading = { debateDate: '', amendments: '', approved: false };
    doc.secondReading.approved = true;

    // Initialize third reading if not exists
    if (!doc.thirdReading) {
        doc.thirdReading = {
            votingDate: '',
            votes: { yes: 0, no: 0, abstain: 0 },
            passed: false
        };
    }

    showToast('Document progressed to Third Reading', 'success');

    // Add audit log
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({
        id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1),
        user: AppData.currentUser.name,
        action: 'progress_third_reading',
        description: `Progressed ${doc.reference} to Third Reading`,
        timestamp: new Date().toLocaleString(),
        ipAddress: '127.0.0.1'
    });

    renderSecondReading();
}


// ==============================
// THIRD READING MANAGEMENT
// ==============================

function renderThirdReading() {
    const docs = AppData.documents;
    const html = `
        <!-- Premium Gradient Header -->
        <div class="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl shadow-xl p-8 mb-6 text-white animate-fade-in">
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                    <i class="bi bi-3-circle text-4xl"></i>
                </div>
                <div>
                    <h1 class="text-3xl font-bold">Third Reading Management</h1>
                    <p class="text-green-100 text-sm mt-1">Final voting, approval, and passage tracking</p>
                </div>
            </div>
        </div>

        <!-- Stats Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-fade-in-up animation-delay-100">
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">For Voting</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.filter(d => d.thirdReading && !d.thirdReading.passed).length}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-hand-thumbs-up text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Passed</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.filter(d => d.thirdReading && d.thirdReading.passed).length}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-check-circle text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-red-600 uppercase tracking-wider mb-1">Rejected</p>
                        <p class="text-3xl font-bold text-gray-800">${docs.filter(d => d.thirdReading && d.thirdReading.rejected).length}</p>
                    </div>
                    <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-x-circle text-white text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Documents Grid -->
        <div class="grid grid-cols-1 gap-4 animate-fade-in-up animation-delay-200">
            ${docs.length === 0 ? `
                <div class="bg-white rounded-xl shadow-md p-12 text-center">
                    <i class="bi bi-inbox text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 text-lg">No documents in third reading</p>
                </div>
            ` : docs.map((doc, index) => {
        if (!doc.thirdReading) doc.thirdReading = { votingDate: '', yesVotes: 0, noVotes: 0, abstain: 0, passed: false, rejected: false };
        const hasVoted = doc.thirdReading.passed || doc.thirdReading.rejected;
        const totalVotes = (doc.thirdReading.yesVotes || 0) + (doc.thirdReading.noVotes || 0) + (doc.thirdReading.abstain || 0);

        return `
                    <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-green-300 animate-fade-in-up" style="animation-delay: ${100 + index * 50}ms">
                        <div class="p-6">
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex items-start gap-4 flex-1">
                                    <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                        <i class="bi bi-hand-thumbs-up text-white text-xl"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-2">
                                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                                ${doc.reference}
                                            </span>
                                            ${doc.thirdReading.passed ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><i class="bi bi-check-circle mr-1"></i>Passed</span>' : ''}
                                            ${doc.thirdReading.rejected ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800"><i class="bi bi-x-circle mr-1"></i>Rejected</span>' : ''}
                                        </div>
                                        <h3 class="text-lg font-bold text-gray-800 mb-1">${doc.title}</h3>
                                        <p class="text-sm text-gray-600">${doc.type || 'Document'} ${doc.author ? '• ' + doc.author : ''}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Voting Date -->
                            <div class="bg-gray-50 rounded-lg p-4 mb-4">
                                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="bi bi-calendar-check text-green-600"></i>
                                    Schedule Voting
                                </label>
                                <div class="flex items-center gap-2">
                                    <input 
                                        type="datetime-local" 
                                        id="vote-${doc.id}" 
                                        value="${doc.thirdReading.votingDate || ''}" 
                                        class="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none text-sm font-medium"
                                        ${hasVoted ? 'disabled' : ''}
                                    />
                                    <button 
                                        onclick="scheduleVoting(${doc.id})" 
                                        class="px-5 py-2.5 ${hasVoted ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transform hover:scale-105'} text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-sm whitespace-nowrap"
                                        ${hasVoted ? 'disabled' : ''}
                                    >
                                        <i class="bi bi-check2 mr-1"></i>Save
                                    </button>
                                </div>
                            </div>

                            ${totalVotes > 0 ? `
                            <!-- Vote Results -->
                            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-4">
                                <p class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <i class="bi bi-bar-chart"></i>
                                    Voting Results
                                </p>
                                <div class="grid grid-cols-3 gap-3">
                                    <div class="bg-white rounded-lg p-3 text-center border-2 border-green-200">
                                        <p class="text-2xl font-bold text-green-600">${doc.thirdReading.yesVotes || 0}</p>
                                        <p class="text-xs text-gray-600">Yes</p>
                                    </div>
                                    <div class="bg-white rounded-lg p-3 text-center border-2 border-red-200">
                                        <p class="text-2xl font-bold text-red-600">${doc.thirdReading.noVotes || 0}</p>
                                        <p class="text-xs text-gray-600">No</p>
                                    </div>
                                    <div class="bg-white rounded-lg p-3 text-center border-2 border-gray-200">
                                        <p class="text-2xl font-bold text-gray-600">${doc.thirdReading.abstain || 0}</p>
                                        <p class="text-xs text-gray-600">Abstain</p>
                                    </div>
                                </div>
                            </div>
                            ` : ''}

                            <!-- Actions -->
                            <div class="flex items-center gap-3 flex-wrap">
                                <button 
                                    onclick="recordVotes(${doc.id})" 
                                    class="flex-1 px-5 py-3 ${hasVoted ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-105'} text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                                    ${hasVoted ? 'disabled' : ''}
                                >
                                    <i class="bi bi-pencil-square mr-2"></i>
                                    ${totalVotes > 0 ? 'Edit Votes' : 'Record Votes'}
                                </button>

                                <button 
                                    onclick="markAsPassed(${doc.id})" 
                                    class="px-6 py-3 ${doc.thirdReading.passed ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105'} text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-sm whitespace-nowrap"
                                    ${doc.thirdReading.passed ? 'disabled' : ''}
                                >
                                    <i class="bi bi-check-circle mr-2"></i>
                                    Mark as Passed
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

function scheduleVoting(docId) {
    const input = document.getElementById(`vote-${docId}`);
    if (!input) return;
    const value = input.value;
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.thirdReading) doc.thirdReading = { votingDate: '', yesVotes: 0, noVotes: 0, abstain: 0, passed: false, rejected: false };
    doc.thirdReading.votingDate = value || '';
    showToast(value ? 'Voting scheduled' : 'Voting schedule cleared', 'success');
    renderThirdReading();
}

function recordVotes(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.thirdReading) doc.thirdReading = { votingDate: '', yesVotes: 0, noVotes: 0, abstain: 0, passed: false, rejected: false };

    const yesVotes = prompt(`Enter YES votes for ${doc.reference}:`, doc.thirdReading.yesVotes || '0');
    if (yesVotes === null) return;
    const noVotes = prompt(`Enter NO votes for ${doc.reference}:`, doc.thirdReading.noVotes || '0');
    if (noVotes === null) return;
    const abstain = prompt(`Enter ABSTAIN votes for ${doc.reference}:`, doc.thirdReading.abstain || '0');
    if (abstain === null) return;

    doc.thirdReading.yesVotes = parseInt(yesVotes) || 0;
    doc.thirdReading.noVotes = parseInt(noVotes) || 0;
    doc.thirdReading.abstain = parseInt(abstain) || 0;

    showToast('Votes recorded', 'success');
    renderThirdReading();
}

function markAsPassed(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.thirdReading) doc.thirdReading = { votingDate: '', yesVotes: 0, noVotes: 0, abstain: 0, passed: false, rejected: false };
    doc.thirdReading.passed = true;
    doc.thirdReading.rejected = false;
    showToast('Document marked as passed', 'success');
    renderThirdReading();
}

// ==============================
// ALL DOCUMENTS - DOCUMENT MANAGEMENT
// ==============================

function renderDocuments() {
    const docs = AppData.documents;
    const html = `
        <!-- Simple Header -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i class="bi bi-file-earmark-text text-red-600 text-2xl"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">All Documents</h1>
                    <p class="text-gray-600 text-sm mt-1">Manage document metadata, tags, categories, and keywords</p>
                </div>
            </div>
        </div>

        <!-- Simple Documents Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 class="text-lg font-semibold text-gray-800">All Documents (${docs.length})</h3>
            </div>
            ${docs.length === 0 ? `
                <div class="text-center py-16">
                    <i class="bi bi-inbox text-5xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">No documents available</p>
                </div>
            ` : `
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${docs.map(doc => {
        if (!doc.metadata) doc.metadata = {
            bucketNumber: '',
            subjects: [],
            category: '',
            keywords: [],
            relatedDocs: [],
            versions: [],
            searchIndexed: false,
            pdfFiles: [],
            ocrProcessed: false
        };

        return `
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="text-sm font-semibold text-gray-900">${doc.reference}</span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="text-sm text-gray-900 max-w-xs truncate">${doc.title}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            ${doc.metadata.category ?
                `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${doc.metadata.category}</span>`
                : '<span class="text-xs text-gray-400">No category</span>'}
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex flex-wrap gap-1">
                                                ${doc.metadata.subjects.slice(0, 2).map(s =>
                    `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">${s}</span>`
                ).join('')}
                                                ${doc.metadata.subjects.length > 2 ? `<span class="text-xs text-gray-500">+${doc.metadata.subjects.length - 2}</span>` : ''}
                                                ${doc.metadata.subjects.length === 0 ? '<span class="text-xs text-gray-400">No tags</span>' : ''}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                                            <button onclick="editDocumentMetadata(${doc.id})" 
                                                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none transition">
                                                <i class="bi bi-pencil mr-1"></i>Edit
                                            </button>
                                        </td>
                                    </tr>
                                `;
    }).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

function editDocumentMetadata(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.metadata) doc.metadata = {
        bucketNumber: '',
        subjects: [],
        category: '',
        keywords: [],
        relatedDocs: [],
        versions: [],
        searchIndexed: false,
        pdfFiles: [],
        ocrProcessed: false
    };

    // Create a comprehensive metadata editing interface
    const modalHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Bucket Number</label>
                <input type="text" id="meta-bucket" value="${doc.metadata.bucketNumber || ''}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="e.g., BUCKET-2025-001">
            </div>
            
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select id="meta-category" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="">Select Category</option>
                    <option value="Revenue" ${doc.metadata.category === 'Revenue' ? 'selected' : ''}>💰 Revenue</option>
                    <option value="Zoning" ${doc.metadata.category === 'Zoning' ? 'selected' : ''}>🏗️ Zoning</option>
                    <option value="Public Safety" ${doc.metadata.category === 'Public Safety' ? 'selected' : ''}>🚨 Public Safety</option>
                    <option value="Health" ${doc.metadata.category === 'Health' ? 'selected' : ''}>🏥 Health</option>
                    <option value="Education" ${doc.metadata.category === 'Education' ? 'selected' : ''}>🎓 Education</option>
                    <option value="Infrastructure" ${doc.metadata.category === 'Infrastructure' ? 'selected' : ''}>🏛️ Infrastructure</option>
                    <option value="Social Services" ${doc.metadata.category === 'Social Services' ? 'selected' : ''}>👥 Social Services</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Subject Tags (comma-separated)</label>
                <input type="text" id="meta-subjects" value="${doc.metadata.subjects.join(', ')}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="e.g., taxation, property, assessment">
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Keywords (comma-separated)</label>
                <input type="text" id="meta-keywords" value="${doc.metadata.keywords.join(', ')}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="e.g., budget, ordinance, regulation">
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Related Documents (comma-separated document references)</label>
                <input type="text" id="meta-related" value="${doc.metadata.relatedDocs.join(', ')}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="e.g., ORD-2024-001, RES-2024-050">
            </div>

            <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="meta-indexed" ${doc.metadata.searchIndexed ? 'checked' : ''} class="w-4 h-4 text-red-600 rounded">
                    <span class="text-sm font-medium text-gray-700">Search Indexed</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="meta-ocr" ${doc.metadata.ocrProcessed ? 'checked' : ''} class="w-4 h-4 text-red-600 rounded">
                    <span class="text-sm font-medium text-gray-700">OCR Processed</span>
                </label>
            </div>
        </div>
    `;

    // Use a custom modal approach
    const existingModal = document.getElementById('metadata-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'metadata-modal';
    modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h3 class="text-xl font-bold text-white">Edit Metadata: ${doc.reference}</h3>
                <button onclick="document.getElementById('metadata-modal').remove()" class="text-white hover:bg-white/20 rounded-lg p-2 transition">
                    <i class="bi bi-x-lg text-xl"></i>
                </button>
            </div>
            <div class="p-6">
                ${modalHTML}
                <div class="flex gap-3 mt-6">
                    <button onclick="saveDocumentMetadata(${doc.id})" class="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all transform hover:scale-105">
                        <i class="bi bi-save mr-2"></i>Save Metadata
                    </button>
                    <button onclick="document.getElementById('metadata-modal').remove()" class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function saveDocumentMetadata(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    doc.metadata.bucketNumber = document.getElementById('meta-bucket').value.trim();
    doc.metadata.category = document.getElementById('meta-category').value;
    doc.metadata.subjects = document.getElementById('meta-subjects').value.split(',').map(s => s.trim()).filter(s => s);
    doc.metadata.keywords = document.getElementById('meta-keywords').value.split(',').map(k => k.trim()).filter(k => k);
    doc.metadata.relatedDocs = document.getElementById('meta-related').value.split(',').map(r => r.trim()).filter(r => r);
    doc.metadata.searchIndexed = document.getElementById('meta-indexed').checked;
    doc.metadata.ocrProcessed = document.getElementById('meta-ocr').checked;

    document.getElementById('metadata-modal').remove();
    showToast('Metadata saved successfully', 'success');
    renderDocuments();
}

// ==============================
// METADATA & DOCUMENT MANAGEMENT
// ==============================
// REMOVED: Metadata management functionality has been disabled per user request
/*
function renderMetadataManagement() {
    const docs = AppData.documents;
    const html = `
        <!-- Simple Header -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i class="bi bi-tags text-red-600 text-2xl"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">Metadata Management</h1>
                    <p class="text-gray-600 text-sm mt-1">Manage document tags, categories, and keywords</p>
                </div>
            </div>
        </div>

        <!-- Simple Documents Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 class="text-lg font-semibold text-gray-800">All Documents (${docs.length})</h3>
            </div>
            ${docs.length === 0 ? `
                <div class="text-center py-16">
                    <i class="bi bi-inbox text-5xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">No documents available</p>
                </div>
            ` : `
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${docs.map(doc => {
        if (!doc.metadata) doc.metadata = {
            bucketNumber: '',
            subjects: [],
            category: '',
            keywords: [],
            relatedDocs: [],
            versions: [],
            searchIndexed: false,
            pdfFiles: [],
            ocrProcessed: false
        };

        return `
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="text-sm font-semibold text-gray-900">${doc.reference}</span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="text-sm text-gray-900 max-w-xs truncate">${doc.title}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            ${doc.metadata.category ?
                `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${doc.metadata.category}</span>`
                : '<span class="text-xs text-gray-400">No category</span>'}
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex flex-wrap gap-1">
                                                ${doc.metadata.subjects.slice(0, 2).map(s =>
                    `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">${s}</span>`
                ).join('')}
                                                ${doc.metadata.subjects.length > 2 ? `<span class="text-xs text-gray-500">+${doc.metadata.subjects.length - 2}</span>` : ''}
                                                ${doc.metadata.subjects.length === 0 ? '<span class="text-xs text-gray-400">No tags</span>' : ''}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                                            <button onclick="editDocumentMetadata(${doc.id})" 
                                                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none transition">
                                                <i class="bi bi-pencil mr-1"></i>Edit
                                            </button>
                                        </td>
                                    </tr>
                                `;
    }).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

function openMetadataSection(section) {
    const sectionNames = {
        'bucket': 'Bucket Number Management',
        'tagging': 'Subject Matter Tagging',
        'categorization': 'Document Categorization',
        'keywords': 'Keywords & Tags',
        'related': 'Related Documents Linking',
        'versions': 'Version Control & Amendments',
        'search': 'Full-Text Search Indexing',
        'repository': 'Document Repository',
        'ocr': 'OCR Processing'
    };

    showToast(`Opening ${sectionNames[section]}...`, 'info');
    // Here you can expand to show detailed management interfaces for each section
}

function editDocumentMetadata(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.metadata) doc.metadata = {
        bucketNumber: '',
        subjects: [],
        category: '',
        keywords: [],
        relatedDocs: [],
        versions: [],
        searchIndexed: false,
        pdfFiles: [],
        ocrProcessed: false
    };

    // Create a comprehensive metadata editing interface
    const modalHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Bucket Number</label>
                <input type="text" id="meta-bucket" value="${doc.metadata.bucketNumber || ''}" class="input-field-enhanced" placeholder="e.g., BUCKET-2025-001">
            </div>
            
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select id="meta-category" class="input-field-enhanced">
                    <option value="">Select Category</option>
                    <option value="Revenue" ${doc.metadata.category === 'Revenue' ? 'selected' : ''}>💰 Revenue</option>
                    <option value="Zoning" ${doc.metadata.category === 'Zoning' ? 'selected' : ''}>🏗️ Zoning</option>
                    <option value="Public Safety" ${doc.metadata.category === 'Public Safety' ? 'selected' : ''}>🚨 Public Safety</option>
                    <option value="Health" ${doc.metadata.category === 'Health' ? 'selected' : ''}>🏥 Health</option>
                    <option value="Education" ${doc.metadata.category === 'Education' ? 'selected' : ''}>🎓 Education</option>
                    <option value="Infrastructure" ${doc.metadata.category === 'Infrastructure' ? 'selected' : ''}>🏛️ Infrastructure</option>
                    <option value="Social Services" ${doc.metadata.category === 'Social Services' ? 'selected' : ''}>👥 Social Services</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Subject Tags (comma-separated)</label>
                <input type="text" id="meta-subjects" value="${doc.metadata.subjects.join(', ')}" class="input-field-enhanced" placeholder="e.g., taxation, property, assessment">
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Keywords (comma-separated)</label>
                <input type="text" id="meta-keywords" value="${doc.metadata.keywords.join(', ')}" class="input-field-enhanced" placeholder="e.g., budget, ordinance, regulation">
            </div>

            <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="meta-indexed" ${doc.metadata.searchIndexed ? 'checked' : ''} class="w-4 h-4 text-teal-600 rounded">
                    <span class="text-sm font-medium text-gray-700">Search Indexed</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="meta-ocr" ${doc.metadata.ocrProcessed ? 'checked' : ''} class="w-4 h-4 text-teal-600 rounded">
                    <span class="text-sm font-medium text-gray-700">OCR Processed</span>
                </label>
            </div>
        </div>
    `;

    // Use a custom modal approach
    const existingModal = document.getElementById('metadata-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'metadata-modal';
    modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h3 class="text-xl font-bold text-white">Edit Metadata: ${doc.reference}</h3>
                <button onclick="document.getElementById('metadata-modal').remove()" class="text-white hover:bg-white/20 rounded-lg p-2 transition">
                    <i class="bi bi-x-lg text-xl"></i>
                </button>
            </div>
            <div class="p-6">
                ${modalHTML}
                <div class="flex gap-3 mt-6">
                    <button onclick="saveDocumentMetadata(${doc.id})" class="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg font-semibold transition-all transform hover:scale-105">
                        <i class="bi bi-save mr-2"></i>Save Metadata
                    </button>
                    <button onclick="document.getElementById('metadata-modal').remove()" class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function saveDocumentMetadata(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    doc.metadata.bucketNumber = document.getElementById('meta-bucket').value.trim();
    doc.metadata.category = document.getElementById('meta-category').value;
    doc.metadata.subjects = document.getElementById('meta-subjects').value.split(',').map(s => s.trim()).filter(s => s);
    doc.metadata.keywords = document.getElementById('meta-keywords').value.split(',').map(k => k.trim()).filter(k => k);
    doc.metadata.searchIndexed = document.getElementById('meta-indexed').checked;
    doc.metadata.ocrProcessed = document.getElementById('meta-ocr').checked;

    document.getElementById('metadata-modal').remove();
    showToast('Metadata saved successfully', 'success');
    renderMetadataManagement();
}
*/


// ==============================
// DOCUMENT STATUS & LOCATION
// ==============================

function renderDocumentStatusLocation(docId) {
    const docs = AppData.documents || [];
    const stats = computeStageStats();
    const stalled = docs.filter(d => isStalled(d, 14) && !['enacted', 'approved', 'archived', 'failed'].includes((d.status || '').toLowerCase()));
    const bottlenecks = identifyBottlenecksByOffice();

    // If no doc selected, show selector + summary
    if (!docId) {
        const rows = docs.map(d => {
            const loc = d.currentLocation || 'N/A';
            const statusBadge = getStatusBadge(d.status || 'draft');
            const locationBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <i class="bi bi-geo-alt text-xs mr-1"></i>${loc}
            </span>`;
            const isDocStalled = isStalled(d, 14);
            return `
                <tr class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="px-6 py-4 text-sm font-semibold text-gray-900">${d.reference}</td>
                    <td class="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">${d.title}</td>
                    <td class="px-6 py-4 text-sm">${statusBadge}</td>
                    <td class="px-6 py-4 text-sm">${locationBadge}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${d.uploadedAt || '-'}</td>
                    <td class="px-6 py-4 text-sm">
                        <button onclick="renderDocumentStatusLocation(${d.id})" class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                            <i class="bi bi-box-arrow-up-right mr-1"></i>Open
                        </button>
                        ${isDocStalled ? '<span class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"><i class="bi bi-exclamation-triangle text-xs mr-1"></i>Stalled</span>' : ''}
                    </td>
                </tr>`;
        }).join('');

        const html = `
            <!-- Gradient Header -->
            <div class="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-xl p-8 mb-6 text-white animate-fade-in">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                <i class="bi bi-geo-alt text-2xl"></i>
                            </div>
                            <h1 class="text-3xl font-bold">Document Status & Location</h1>
                        </div>
                        <p class="text-red-100 text-sm">Track document status, office location, transfers, and timelines in real-time.</p>
                    </div>
                    <div class="hidden lg:block">
                        <i class="bi bi-diagram-3 text-8xl opacity-20"></i>
                    </div>
                </div>
            </div>

            <!-- Enhanced Stat Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500 transform hover:scale-105 hover:shadow-xl transition-all duration-300 group">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">Total Documents</p>
                            <p class="text-3xl font-bold text-gray-900">${docs.length}</p>
                        </div>
                        <div class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <i class="bi bi-file-earmark-text text-blue-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-md p-6 border-t-4 border-red-500 transform hover:scale-105 hover:shadow-xl transition-all duration-300 group">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">Stalled / Forgotten</p>
                            <p class="text-3xl font-bold text-red-600">${stalled.length}</p>
                            ${stalled.length > 0 ? '<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1"><i class="bi bi-exclamation-triangle text-xs mr-1"></i>Needs Attention</span>' : '<span class="text-xs text-green-600 mt-1 inline-block"><i class="bi bi-check-circle mr-1"></i>All on track</span>'}
                        </div>
                        <div class="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <i class="bi bi-clock-history text-red-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500 transform hover:scale-105 hover:shadow-xl transition-all duration-300 group">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">Office Bottlenecks</p>
                            <p class="text-3xl font-bold text-gray-900">${Object.keys(bottlenecks).length}</p>
                            ${Object.keys(bottlenecks).length > 0 ? '<span class="text-xs text-yellow-600 mt-1 inline-block"><i class="bi bi-funnel mr-1"></i>Review needed</span>' : '<span class="text-xs text-green-600 mt-1 inline-block"><i class="bi bi-check-circle mr-1"></i>Flowing smoothly</span>'}
                        </div>
                        <div class="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <i class="bi bi-funnel text-yellow-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enhanced Documents Table -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6 animate-fade-in-up animation-delay-100">
                <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <i class="bi bi-list-ul text-red-600"></i>
                        All Documents
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${rows || '<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">No documents found</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Enhanced Bottleneck Visualization -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in-up animation-delay-200">
                <div class="flex items-center gap-2 mb-4">
                    <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <i class="bi bi-funnel-fill text-yellow-600 text-xl"></i>
                    </div>
                    <h2 class="text-lg font-bold text-gray-800">Bottleneck Analysis by Office</h2>
                </div>
                <div class="space-y-4">
                    ${Object.keys(bottlenecks).length ? Object.keys(bottlenecks).map(off => {
            const count = bottlenecks[off].count;
            const maxCount = Math.max(...Object.values(bottlenecks).map(b => b.count));
            const percentage = (count / maxCount) * 100;
            const colorClass = count > 5 ? 'bg-red-500' : count > 2 ? 'bg-yellow-500' : 'bg-green-500';
            return `
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <i class="bi bi-building text-gray-600"></i>
                                        <span class="text-sm font-medium text-gray-700">${off}</span>
                                    </div>
                                    <span class="text-sm font-semibold text-gray-900">${count} document${count !== 1 ? 's' : ''}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="${colorClass} h-2.5 rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
                                </div>
                            </div>
                        `;
        }).join('') : '<div class="text-center py-8"><i class="bi bi-check-circle text-green-500 text-4xl mb-2"></i><p class="text-sm text-gray-600">No bottlenecks detected - all offices are processing documents smoothly!</p></div>'}
                </div>
            </div>
        `;

        document.getElementById('content-area').innerHTML = html;
        return;
    }

    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) { showToast('Document not found', 'error'); return; }
    if (!doc.transferHistory) doc.transferHistory = [];
    if (!doc.statusTransitions) doc.statusTransitions = [];

    const timeline = buildTimelineForDoc(doc) || [];

    // Expected vs actual: compare expectedProcessingDays vs actual elapsed days since upload or first processing
    const expectedDays = doc.expectedProcessingDays || null;
    const uploadedAt = doc.uploadedAt ? new Date(doc.uploadedAt) : null;
    const actualDays = uploadedAt ? Math.round((Date.now() - uploadedAt.getTime()) / (1000 * 60 * 60 * 24)) : null;
    const isDocStalled = isStalled(doc, 14);
    const daysDiff = expectedDays && actualDays ? actualDays - expectedDays : null;

    const html = `
        <!-- Gradient Header -->
        <div class="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-xl p-8 mb-6 text-white animate-fade-in">
            <div class="flex items-center justify-between">
                <div>
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <i class="bi bi-file-earmark-text text-2xl"></i>
                        </div>
                        <h1 class="text-3xl font-bold">${doc.reference}</h1>
                        ${isDocStalled ? '<span class="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white animate-pulse"><i class="bi bi-exclamation-triangle mr-1"></i>Stalled</span>' : ''}
                    </div>
                    <p class="text-red-100 text-sm">${doc.title}</p>
                    <button onclick="renderDocumentStatusLocation()" class="mt-3 inline-flex items-center px-4 py-2 border border-white/30 text-sm font-medium rounded-md text-white hover:bg-white/10 transition-all duration-200">
                        <i class="bi bi-arrow-left mr-2"></i>Back to List
                    </button>
                </div>
                <div class="hidden lg:block">
                    <i class="bi bi-diagram-3 text-8xl opacity-20"></i>
                </div>
            </div>
        </div>

        <!-- Enhanced Stat Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-gray-600">Current Status</p>
                    <i class="bi bi-info-circle text-blue-500 text-xl"></i>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-2">${doc.status || 'Draft'}</p>
                ${getStatusBadge(doc.status || 'draft')}
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-gray-600">Current Location</p>
                    <i class="bi bi-geo-alt text-purple-500 text-xl"></i>
                </div>
                <p class="text-2xl font-bold text-gray-900">${doc.currentLocation || 'Not assigned'}</p>
                ${doc.currentLocation ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-2"><i class="bi bi-building text-xs mr-1"></i>Active</span>' : ''}
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 border-l-4 ${daysDiff && daysDiff > 0 ? 'border-red-500' : 'border-green-500'} transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-gray-600">Processing Time</p>
                    <i class="bi bi-clock-history ${daysDiff && daysDiff > 0 ? 'text-red-500' : 'text-green-500'} text-xl"></i>
                </div>
                ${expectedDays ? `<p class="text-sm text-gray-600">Expected: <span class="font-semibold">${expectedDays} days</span></p>` : '<p class="text-sm text-gray-500">Expected: N/A</p>'}
                ${actualDays !== null ? `<p class="text-sm text-gray-600">Actual: <span class="font-semibold ${daysDiff && daysDiff > 0 ? 'text-red-600' : 'text-green-600'}">${actualDays} days</span></p>` : '<p class="text-sm text-gray-500">Actual: N/A</p>'}
                ${daysDiff && daysDiff > 0 ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-2"><i class="bi bi-exclamation-triangle text-xs mr-1"></i>${daysDiff} days overdue</span>` : daysDiff !== null ? '<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-2"><i class="bi bi-check-circle text-xs mr-1"></i>On track</span>' : ''}
            </div>
        </div>

        <!-- Transfer History with Enhanced UI -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in-up animation-delay-100">
            <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <i class="bi bi-arrow-left-right text-indigo-600 text-xl"></i>
                </div>
                <h2 class="text-lg font-bold text-gray-800">Transfer History</h2>
            </div>
            ${doc.transferHistory.length > 0 ? `
                <div class="space-y-3 mb-4">
                    ${doc.transferHistory.map((t, idx) => `
                        <div class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div class="flex-shrink-0">
                                <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <i class="bi bi-arrow-right text-indigo-600 text-sm"></i>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">${t.from || 'Origin'}</span>
                                    <i class="bi bi-arrow-right text-gray-400 text-xs"></i>
                                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">${t.to}</span>
                                </div>
                                <p class="text-xs text-gray-500 mt-1"><i class="bi bi-person text-xs mr-1"></i>${t.by || 'system'} • ${t.timestamp}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : '<p class="text-sm text-gray-500 mb-4 italic">No transfer history yet</p>'}
            <div class="flex items-center gap-2 pt-4 border-t border-gray-200">
                <input type="text" id="transferToOffice" placeholder="Enter office name..." class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm" />
                <button onclick="transferDocument(${doc.id})" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                    <i class="bi bi-send mr-2"></i>Transfer
                </button>
            </div>
        </div>

        <!-- Status Transitions with Enhanced UI -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in-up animation-delay-200">
            <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i class="bi bi-arrow-repeat text-green-600 text-xl"></i>
                </div>
                <h2 class="text-lg font-bold text-gray-800">Status Transitions Log</h2>
            </div>
            ${doc.statusTransitions.length > 0 ? `
                <div class="space-y-3 mb-4">
                    ${doc.statusTransitions.map((s, idx) => `
                        <div class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div class="flex-shrink-0">
                                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <i class="bi bi-check text-green-600 text-sm"></i>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <span class="text-sm text-gray-600">${s.from || '—'}</span>
                                    <i class="bi bi-arrow-right text-gray-400 text-xs"></i>
                                    <span class="text-sm font-semibold text-gray-900">${s.to}</span>
                                    ${s.note ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"><i class="bi bi-sticky text-xs mr-1"></i>${s.note}</span>` : ''}
                                </div>
                                <p class="text-xs text-gray-500 mt-1"><i class="bi bi-person text-xs mr-1"></i>${s.by || 'system'} • ${s.timestamp}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : '<p class="text-sm text-gray-500 mb-4 italic">No status transitions yet</p>'}
            <div class="flex items-center gap-2 pt-4 border-t border-gray-200">
                <select id="newStatus-${doc.id}" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm">
                    <option value="draft">Draft</option>
                    <option value="submitted">Submitted</option>
                    <option value="referred">Referred</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="enacted">Enacted</option>
                    <option value="archived">Archived</option>
                </select>
                <button onclick="addStatusTransition(${doc.id})" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200">
                    <i class="bi bi-plus-circle mr-2"></i>Add Transition
                </button>
            </div>
        </div>

        <!-- Visual Timeline -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in-up animation-delay-300">
            <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i class="bi bi-clock-history text-blue-600 text-xl"></i>
                </div>
                <h2 class="text-lg font-bold text-gray-800">Processing Timeline</h2>
            </div>
            <div class="mb-3">
                <p class="text-sm text-gray-600">Current Stage: <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${getStageForDoc(doc)}</span></p>
            </div>
            ${timeline.length > 0 ? `
                <div class="relative">
                    <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div class="space-y-4">
                        ${timeline.slice(-5).reverse().map((t, idx) => `
                            <div class="relative flex items-start gap-4 pl-2">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ring-4 ring-white shadow">
                                        <i class="bi bi-circle-fill text-white text-xs"></i>
                                    </div>
                                </div>
                                <div class="flex-1 bg-gray-50 rounded-lg p-3">
                                    <p class="text-sm font-semibold text-gray-900">${t.title}</p>
                                    ${t.description ? `<p class="text-xs text-gray-600 mt-1">${t.description}</p>` : ''}
                                    ${t.time ? `<p class="text-xs text-gray-500 mt-1"><i class="bi bi-clock text-xs mr-1"></i>${t.time}</p>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : '<div class="text-center py-8"><i class="bi bi-calendar-x text-gray-300 text-4xl mb-2"></i><p class="text-sm text-gray-500 italic">No timeline events recorded</p></div>'}
        </div>

        <!-- Automated Alerts -->
        ${isDocStalled ? `
            <div class="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl shadow-lg p-6 mb-6 animate-fade-in-up animation-delay-400">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center animate-pulse">
                            <i class="bi bi-exclamation-triangle-fill text-white text-2xl"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-bold text-red-900 mb-2">Document Stalled Alert</h3>
                        <p class="text-sm text-red-800 mb-4">This document has been stalled for more than 14 days. Immediate action is required to prevent further delays.</p>
                        <div class="flex items-center gap-3">
                            <button onclick="sendAutomatedAlert(${doc.id})" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-md">
                                <i class="bi bi-bell mr-2"></i>Send Alert Notification
                            </button>
                            <span class="text-xs text-red-700"><i class="bi bi-info-circle mr-1"></i>This will notify responsible parties</span>
                        </div>
                    </div>
                </div>
            </div>
        ` : `
            <div class="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-xl shadow-md p-6 mb-6 animate-fade-in-up animation-delay-400">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-check-circle-fill text-white text-2xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-green-900 mb-1">No Alerts</h3>
                        <p class="text-sm text-green-800">Document is processing normally without delays.</p>
                    </div>
                </div>
            </div>
        `}
    `;

    document.getElementById('content-area').innerHTML = html;
}

function transferDocument(docId) {
    const to = document.getElementById('transferToOffice')?.value || '';
    if (!to) { showToast('Please enter target office', 'warning'); return; }
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const from = doc.currentLocation || 'Origin';
    const ts = new Date().toLocaleString();
    doc.currentLocation = to;
    doc.transferHistory = doc.transferHistory || [];
    doc.transferHistory.push({ from, to, by: AppData.currentUser.name, timestamp: ts });

    // Add status transitions log entry for transfer
    doc.statusTransitions = doc.statusTransitions || [];
    doc.statusTransitions.push({ from: doc.status || '—', to: doc.status || '—', by: AppData.currentUser.name, timestamp: ts, note: `Transferred to ${to}` });

    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'transfer', description: `Transferred ${doc.reference} from ${from} to ${to}`, timestamp: ts, ipAddress: '127.0.0.1' });

    showToast(`Transferred to ${to}`, 'success');
    renderDocumentStatusLocation(docId);
}

function addStatusTransition(docId) {
    const sel = document.getElementById(`newStatus-${docId}`);
    if (!sel) return;
    const newStatus = sel.value;
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const from = doc.status || '—';
    doc.status = newStatus;
    const ts = new Date().toLocaleString();
    doc.statusTransitions = doc.statusTransitions || [];
    doc.statusTransitions.push({ from, to: newStatus, by: AppData.currentUser.name, timestamp: ts });
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'status-change', description: `Changed status for ${doc.reference} from ${from} to ${newStatus}`, timestamp: ts, ipAddress: '127.0.0.1' });
    showToast('Status updated', 'success');
    renderDocumentStatusLocation(docId);
}

function sendAutomatedAlert(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    AppData.notifications = AppData.notifications || [];
    const ts = new Date().toLocaleString();
    AppData.notifications.push({ id: (AppData.notifications.length ? AppData.notifications[AppData.notifications.length - 1].id + 1 : 1), docId, title: `Stalled document ${doc.reference}`, message: `Document ${doc.reference} appears stalled in ${doc.currentLocation || 'Unknown'}`, timestamp: ts });
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'alert-sent', description: `Automated alert sent for ${doc.reference}`, timestamp: ts, ipAddress: '127.0.0.1' });
    showToast('Alert created and logged', 'success');
    renderDocumentStatusLocation(docId);
}

function identifyBottlenecksByOffice() {
    const docs = AppData.documents || [];
    const byOffice = {};
    docs.forEach(d => {
        const office = d.currentLocation || 'Unassigned';
        byOffice[office] = byOffice[office] || { count: 0, docs: [] };
        byOffice[office].count++;
        byOffice[office].docs.push(d);
    });
    return byOffice;
}

function filterDocuments() {
    const typeFilter = document.getElementById('filterType')?.value || '';
    const statusFilter = document.getElementById('filterStatus')?.value || '';
    const searchTerm = document.getElementById('searchDocs')?.value.toLowerCase() || '';

    let filtered = AppData.documents.filter(doc => {
        const matchesType = !typeFilter || doc.type === typeFilter;
        const matchesStatus = !statusFilter || doc.status === statusFilter;
        const matchesSearch = !searchTerm ||
            doc.title.toLowerCase().includes(searchTerm) ||
            doc.reference.toLowerCase().includes(searchTerm) ||
            doc.description.toLowerCase().includes(searchTerm);

        return matchesType && matchesStatus && matchesSearch;
    });

    const tbody = document.getElementById('documentsList');
    if (!tbody) return;

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">No documents found</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(doc => `
        <tr class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-sm font-medium text-gray-900">${doc.reference}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${doc.title}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${capitalizeFirstLetter(doc.type)}</td>
            <td class="px-6 py-4">${getStatusBadge(doc.status)}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${formatDate(doc.date)}</td>
            <td class="px-6 py-4 text-sm space-x-2">
                <button onclick="viewDocument(${doc.id})" class="text-blue-600 hover:text-blue-700" title="View">
                    <i class="bi bi-eye"></i>
                </button>
                <button onclick="editDocument(${doc.id})" class="text-green-600 hover:text-green-700" title="Edit">
                    <i class="bi bi-pencil"></i>
                </button>
                <button onclick="deleteDocument(${doc.id})" class="text-red-600 hover:text-red-700" title="Delete">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function sortDocuments(field) {
    AppData.documents.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
    });
    filterDocuments();
}

function resetFilters() {
    document.getElementById('filterType').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('searchDocs').value = '';
    filterDocuments();
}

function viewDocument(id) {
    const doc = AppData.documents.find(d => d.id === id);
    if (!doc) return;

    document.getElementById('view-title').textContent = doc.title;
    document.getElementById('view-reference').textContent = doc.reference;
    document.getElementById('view-type').textContent = capitalizeFirstLetter(doc.type);
    document.getElementById('view-status').innerHTML = getStatusBadge(doc.status);
    document.getElementById('view-date').textContent = formatDate(doc.date);
    document.getElementById('view-uploaded-by').textContent = doc.uploadedBy;
    document.getElementById('view-uploaded-at').textContent = doc.uploadedAt;
    document.getElementById('view-size').textContent = doc.fileSize;
    document.getElementById('view-views').textContent = doc.views;
    document.getElementById('view-downloads').textContent = doc.downloads;
    document.getElementById('view-description').textContent = doc.description;
    document.getElementById('view-tags').innerHTML = doc.tags.map(tag =>
        `<span class="tag">${tag}</span>`
    ).join('');

    openModal('view-modal');
}

function editDocument(id) {
    const doc = AppData.documents.find(d => d.id === id);
    if (!doc) return;

    showNotification('Edit functionality would open a form here', 'info');
}

function deleteDocument(id) {
    if (!confirm('Are you sure you want to delete this document?')) return;

    const index = AppData.documents.findIndex(d => d.id === id);
    if (index > -1) {
        AppData.documents.splice(index, 1);
        filterDocuments();
        showNotification('Document deleted successfully', 'success');

        // Add audit log
        addAuditLog('delete', `Deleted document ID ${id}`);
    }
}

// ==============================
// SEARCH MODULE
// ==============================
function renderSearch() {
    const html = `
        <div class="mb-6 animate-fade-in">
            <h1 class="text-2xl font-bold text-gray-800">Advanced Search</h1>
            <p class="text-gray-600 mt-1">Use filters to find specific documents</p>
        </div>

        <!-- Advanced Search Form -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6 animate-fade-in-up animation-delay-100">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                    <input type="text" id="advSearchKeywords" class="input-field" placeholder="Search keywords...">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Reference Number</label>
                    <input type="text" id="advSearchReference" class="input-field" placeholder="e.g., ORD-2025-001">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                    <select id="advSearchType" class="input-field">
                        <option value="">All Types</option>
                        <option value="ordinance">Ordinance</option>
                        <option value="resolution">Resolution</option>
                        <option value="session">Session Minutes</option>
                        <option value="agenda">Agenda</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select id="advSearchStatus" class="input-field">
                        <option value="">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Date From</label>
                    <input type="date" id="advSearchDateFrom" class="input-field">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Date To</label>
                    <input type="date" id="advSearchDateTo" class="input-field">
                </div>
            </div>
            <div class="mt-4 flex gap-3">
                <button onclick="performAdvancedSearch()" class="btn-primary">
                    <i class="bi bi-search mr-2"></i>Search
                </button>
                <button onclick="clearAdvancedSearch()" class="btn-outline">
                    <i class="bi bi-x-circle mr-2"></i>Clear
                </button>
            </div>
        </div>

        <!-- Search Results -->
        <div id="searchResults" class="space-y-4">
            <!-- Results populated by performAdvancedSearch() -->
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

function performAdvancedSearch() {
    const keywords = document.getElementById('advSearchKeywords').value.toLowerCase();
    const reference = document.getElementById('advSearchReference').value.toLowerCase();
    const type = document.getElementById('advSearchType').value;
    const status = document.getElementById('advSearchStatus').value;
    const dateFrom = document.getElementById('advSearchDateFrom').value;
    const dateTo = document.getElementById('advSearchDateTo').value;

    const results = AppData.documents.filter(doc => {
        const matchesKeywords = !keywords ||
            doc.title.toLowerCase().includes(keywords) ||
            doc.description.toLowerCase().includes(keywords) ||
            doc.tags.some(tag => tag.toLowerCase().includes(keywords));

        const matchesReference = !reference || doc.reference.toLowerCase().includes(reference);
        const matchesType = !type || doc.type === type;
        const matchesStatus = !status || doc.status === status;
        const matchesDateFrom = !dateFrom || new Date(doc.date) >= new Date(dateFrom);
        const matchesDateTo = !dateTo || new Date(doc.date) <= new Date(dateTo);

        return matchesKeywords && matchesReference && matchesType && matchesStatus && matchesDateFrom && matchesDateTo;
    });

    const resultsContainer = document.getElementById('searchResults');

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="bg-white rounded-xl shadow-md p-12 text-center animate-fade-in">
                <i class="bi bi-search text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-600 text-lg">No documents found matching your search criteria</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = `
        <div class="bg-white rounded-xl shadow-md p-6 mb-4 animate-fade-in">
            <p class="text-sm text-gray-600">Found <strong>${results.length}</strong> document(s)</p>
        </div>
        ${results.map(doc => `
            <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <h3 class="text-lg font-bold text-gray-800">${doc.title}</h3>
                            ${getStatusBadge(doc.status)}
                        </div>
                        <p class="text-sm text-gray-600 mb-2">${doc.reference} • ${capitalizeFirstLetter(doc.type)} • ${formatDate(doc.date)}</p>
                        <p class="text-gray-700 mb-3">${doc.description}</p>
                        <div class="flex items-center gap-4 text-sm text-gray-500">
                            <span><i class="bi bi-eye mr-1"></i>${doc.views} views</span>
                            <span><i class="bi bi-download mr-1"></i>${doc.downloads} downloads</span>
                            <span><i class="bi bi-file-earmark mr-1"></i>${doc.fileSize}</span>
                        </div>
                        <div class="mt-3">
                            ${doc.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="ml-4 flex gap-2">
                        <button onclick="viewDocument(${doc.id})" class="btn-primary text-sm">
                            <i class="bi bi-eye mr-1"></i>View
                        </button>
                    </div>
                </div>
            </div>
        `).join('')}
    `;
}

function clearAdvancedSearch() {
    document.getElementById('advSearchKeywords').value = '';
    document.getElementById('advSearchReference').value = '';
    document.getElementById('advSearchType').value = '';
    document.getElementById('advSearchStatus').value = '';
    document.getElementById('advSearchDateFrom').value = '';
    document.getElementById('advSearchDateTo').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

// ==============================
// ANALYTICS MODULE
// ==============================
function renderAnalytics() {
    const html = `
        <div class="mb-6 animate-fade-in">
            <h1 class="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
            <p class="text-gray-600 mt-1">View detailed reports and statistics</p>
        </div>

        <!-- Analytics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-100">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-800">Monthly Uploads</h3>
                    <i class="bi bi-graph-up text-2xl text-red-600"></i>
                </div>
                <p class="text-3xl font-bold text-gray-900">24</p>
                <p class="text-sm text-green-600 mt-2"><i class="bi bi-arrow-up mr-1"></i>12% from last month</p>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-200">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-800">Total Views</h3>
                    <i class="bi bi-eye text-2xl text-blue-600"></i>
                </div>
                <p class="text-3xl font-bold text-gray-900">1,234</p>
                <p class="text-sm text-green-600 mt-2"><i class="bi bi-arrow-up mr-1"></i>8% from last month</p>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-300">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-800">Total Downloads</h3>
                    <i class="bi bi-download text-2xl text-green-600"></i>
                </div>
                <p class="text-3xl font-bold text-gray-900">567</p>
                <p class="text-sm text-red-600 mt-2"><i class="bi bi-arrow-down mr-1"></i>3% from last month</p>
            </div>
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-400">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Documents Over Time</h3>
                <canvas id="documentsOverTimeChart"></canvas>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-500">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Documents by Status</h3>
                <canvas id="documentsByStatusChart"></canvas>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-600">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Top Uploaders</h3>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                <span class="text-red-600 font-bold">AU</span>
                            </div>
                            <span class="text-gray-800">Admin User</span>
                        </div>
                        <span class="text-gray-600 font-medium">12 documents</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <span class="text-blue-600 font-bold">OS</span>
                            </div>
                            <span class="text-gray-800">Officer Smith</span>
                        </div>
                        <span class="text-gray-600 font-medium">8 documents</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <span class="text-green-600 font-bold">SJ</span>
                            </div>
                            <span class="text-gray-800">Staff Jones</span>
                        </div>
                        <span class="text-gray-600 font-medium">4 documents</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-700">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Popular Documents</h3>
                <div class="space-y-3">
                    ${AppData.documents.slice(0, 5).map(doc => `
                        <div class="flex items-center justify-between py-2 border-b border-gray-100">
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-800">${doc.title}</p>
                                <p class="text-xs text-gray-500">${doc.reference}</p>
                            </div>
                            <span class="text-sm text-gray-600">${doc.views} views</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;

    setTimeout(() => {
        renderDocumentsOverTimeChart();
        renderDocumentsByStatusChart();
    }, 100);
}

function renderDocumentsOverTimeChart() {
    const ctx = document.getElementById('documentsOverTimeChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Documents Uploaded',
                data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45],
                borderColor: '#dc2626',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderDocumentsByStatusChart() {
    const ctx = document.getElementById('documentsByStatusChart');
    if (!ctx) return;

    const statusCounts = {
        approved: 0,
        pending: 0,
        draft: 0
    };

    AppData.documents.forEach(doc => {
        if (statusCounts.hasOwnProperty(doc.status)) {
            statusCounts[doc.status]++;
        }
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Approved', 'Pending', 'Draft'],
            datasets: [{
                label: 'Documents',
                data: [statusCounts.approved, statusCounts.pending, statusCounts.draft],
                backgroundColor: ['#16a34a', '#f59e0b', '#6b7280']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// ==============================
// USERS MODULE
// ==============================
function renderUsers() {
    const html = `
        <div class="mb-6 animate-fade-in">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 class="text-2xl font-bold text-gray-800">User Management</h1>
                <button onclick="openAddUserModal()" class="btn-primary">
                    <i class="bi bi-person-plus mr-2"></i>Add New User
                </button>
            </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in-up animation-delay-100">
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${AppData.users.map(user => `
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                            <span class="text-red-600 font-bold">${getInitials(user.name)}</span>
                                        </div>
                                        <span class="text-sm font-medium text-gray-900">${user.name}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-700">${user.email}</td>
                                <td class="px-6 py-4 text-sm text-gray-700">${user.role}</td>
                                <td class="px-6 py-4 text-sm text-gray-700">${user.department}</td>
                                <td class="px-6 py-4">${getUserStatusBadge(user.status)}</td>
                                <td class="px-6 py-4 text-sm text-gray-700">${user.lastLogin}</td>
                                <td class="px-6 py-4 text-sm space-x-2">
                                    <button onclick="editUser(${user.id})" class="text-blue-600 hover:text-blue-700" title="Edit">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button onclick="toggleUserStatus(${user.id})" class="text-yellow-600 hover:text-yellow-700" title="Toggle Status">
                                        <i class="bi bi-toggle-on"></i>
                                    </button>
                                    <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-700" title="Delete">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

function openAddUserModal() {
    showNotification('Add user form would appear here', 'info');
}

function editUser(id) {
    const user = AppData.users.find(u => u.id === id);
    if (!user) return;

    showNotification(`Edit user: ${user.name}`, 'info');
}

function toggleUserStatus(id) {
    const user = AppData.users.find(u => u.id === id);
    if (!user) return;

    user.status = user.status === 'active' ? 'inactive' : 'active';
    renderUsers();
    showNotification(`User status updated to ${user.status}`, 'success');
    addAuditLog('update', `Changed status of user ${user.name} to ${user.status}`);
}

function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    const index = AppData.users.findIndex(u => u.id === id);
    if (index > -1) {
        const user = AppData.users[index];
        AppData.users.splice(index, 1);
        renderUsers();
        showNotification('User deleted successfully', 'success');
        addAuditLog('delete', `Deleted user ${user.name}`);
    }
}

// ==============================
// AUDIT MODULE
// ==============================
function renderAudit() {
    const html = `
        <div class="mb-6 animate-fade-in">
            <h1 class="text-2xl font-bold text-gray-800">Audit Logs</h1>
            <p class="text-gray-600 mt-1">Track all system activities and changes</p>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6 animate-fade-in-up animation-delay-100">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select id="filterAction" class="input-field" onchange="filterAuditLogs()">
                    <option value="">All Actions</option>
                    <option value="upload">Upload</option>
                    <option value="approve">Approve</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                </select>
                <input type="text" id="filterUser" class="input-field" placeholder="Filter by user..." oninput="filterAuditLogs()">
                <input type="date" id="filterDate" class="input-field" onchange="filterAuditLogs()">
                <button onclick="resetAuditFilters()" class="btn-outline">
                    <i class="bi bi-arrow-clockwise mr-2"></i>Reset
                </button>
            </div>
        </div>

        <!-- Audit Logs Table -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in-up animation-delay-200">
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                        </tr>
                    </thead>
                    <tbody id="auditLogsList" class="divide-y divide-gray-200">
                        <!-- Populated by filterAuditLogs() -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
    filterAuditLogs();
}

function filterAuditLogs() {
    const actionFilter = document.getElementById('filterAction')?.value || '';
    const userFilter = document.getElementById('filterUser')?.value.toLowerCase() || '';
    const dateFilter = document.getElementById('filterDate')?.value || '';

    let filtered = AppData.auditLogs.filter(log => {
        const matchesAction = !actionFilter || log.action === actionFilter;
        const matchesUser = !userFilter || log.user.toLowerCase().includes(userFilter);
        const matchesDate = !dateFilter || log.timestamp.includes(dateFilter);

        return matchesAction && matchesUser && matchesDate;
    });

    const tbody = document.getElementById('auditLogsList');
    if (!tbody) return;

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500">No audit logs found</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(log => `
        <tr class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-sm text-gray-700">${log.timestamp}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">${log.user}</td>
            <td class="px-6 py-4">${getActionBadge(log.action)}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${log.description}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${log.ipAddress}</td>
        </tr>
    `).join('');
}

function resetAuditFilters() {
    document.getElementById('filterAction').value = '';
    document.getElementById('filterUser').value = '';
    document.getElementById('filterDate').value = '';
    filterAuditLogs();
}

function addAuditLog(action, description) {
    const newLog = {
        id: AppData.auditLogs.length + 1,
        user: AppData.currentUser.name,
        action: action,
        description: description,
        timestamp: new Date().toLocaleString(),
        ipAddress: '192.168.1.100'
    };

    AppData.auditLogs.unshift(newLog);
}

// ==============================
// PROFILE MODULE
// ==============================
function renderProfile() {
    const currentUser = AppData.currentUser;
    const stats = {
        documents: AppData.documents.filter(d => d.uploadedBy === currentUser.name).length,
        activities: 117,
        memberSince: 'Nov 2025',
        lastActive: '13m ago'
    };

    const html = `
        <!-- Profile Header Banner -->
        <div class="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-xl p-8 mb-6 text-white animate-fade-in">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
                <!-- Profile Picture -->
                <div class="relative">
                    <input type="file" id="profilePictureInput" accept="image/*" class="hidden" onchange="handleProfilePictureUpload(event)">
                    ${currentUser.profilePicture ?
            `<img id="profileImage" src="${currentUser.profilePicture}" alt="Profile" class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover">` :
            `<div id="profileImage" class="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                            <span class="text-red-600 text-4xl font-bold">${getInitials(currentUser.name)}</span>
                        </div>`
        }
                    <button onclick="document.getElementById('profilePictureInput').click()" class="absolute bottom-0 right-0 bg-white text-red-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transform hover:scale-110 transition-all duration-200 shadow-lg">
                        <i class="bi bi-camera-fill"></i>
                    </button>
                </div>
                
                <!-- User Info -->
                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-3xl font-bold mb-2">${currentUser.name}</h1>
                    <p class="text-red-100 text-lg mb-3">${currentUser.email}</p>
                    <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            <i class="bi bi-person-badge"></i> ${currentUser.role}
                        </span>
                        <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            <i class="bi bi-building"></i> IT Department
                        </span>
                        <span class="bg-green-400 bg-opacity-90 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            <i class="bi bi-check-circle-fill"></i> Active
                        </span>
                    </div>
                </div>

                <!-- Edit Profile Button -->
                <div class="flex items-center">
                    <button onclick="toggleEditMode()" class="bg-white text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2">
                        <i class="bi bi-pencil"></i> Edit Profile
                    </button>
                </div>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-100">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Documents</span>
                    <i class="bi bi-file-earmark-text text-2xl text-red-600"></i>
                </div>
                <p class="text-3xl font-bold text-gray-900">${stats.documents}</p>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-200">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Activities</span>
                    <i class="bi bi-activity text-2xl text-green-600"></i>
                </div>
                <p class="text-3xl font-bold text-gray-900">${stats.activities}</p>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-300">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Member Since</span>
                    <i class="bi bi-calendar-check text-2xl text-purple-600"></i>
                </div>
                <p class="text-2xl font-bold text-gray-900">${stats.memberSince}</p>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-400">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm">Last Active</span>
                    <i class="bi bi-clock-history text-2xl text-blue-600"></i>
                </div>
                <p class="text-2xl font-bold text-gray-900">${stats.lastActive}</p>
            </div>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Personal Information -->
            <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-md p-6 mb-6 animate-fade-in-up animation-delay-500">
                    <div class="flex items-center gap-3 mb-6">
                        <i class="bi bi-person-circle text-2xl text-red-600"></i>
                        <h2 class="text-xl font-bold text-gray-800">Personal Information</h2>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input type="text" id="editFullName" class="input-field" value="${currentUser.name}" disabled>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <input type="text" id="editUsername" class="input-field" value="admin" disabled>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input type="email" id="editEmail" class="input-field" value="${currentUser.email}" disabled>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input type="tel" id="editPhone" class="input-field" value="1954654564" disabled>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                            <input type="text" id="editDepartment" class="input-field" value="IT Department" disabled>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Position</label>
                            <input type="text" id="editPosition" class="input-field" value="secretary" disabled>
                        </div>
                    </div>
                    
                    <div id="saveProfileBtn" class="mt-6 hidden">
                        <button onclick="saveProfile()" class="btn-primary mr-3">
                            <i class="bi bi-save mr-2"></i>Save Changes
                        </button>
                        <button onclick="toggleEditMode()" class="btn-outline">
                            <i class="bi bi-x-circle mr-2"></i>Cancel
                        </button>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-600">
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center gap-3">
                            <i class="bi bi-clock-history text-2xl text-red-600"></i>
                            <h2 class="text-xl font-bold text-gray-800">Recent Activity</h2>
                        </div>
                        <a href="#" onclick="showSection('audit'); return false;" class="text-sm text-red-600 hover:text-red-700 font-medium">View All</a>
                    </div>
                    
                    <div class="space-y-4">
                        ${AppData.auditLogs.filter(log => log.user === currentUser.name).slice(0, 5).map(log => `
                            <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <div class="flex-shrink-0">
                                    <i class="bi bi-check-circle text-blue-600 text-xl"></i>
                                </div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-gray-800">${log.description}</p>
                                    <p class="text-xs text-gray-500 mt-1">${log.timestamp}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Account Security -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-xl shadow-md p-6 mb-6 animate-fade-in-up animation-delay-700">
                    <div class="flex items-center gap-3 mb-6">
                        <i class="bi bi-shield-check text-2xl text-red-600"></i>
                        <h2 class="text-xl font-bold text-gray-800">Account Security</h2>
                    </div>
                    
                    <div class="space-y-4">
                        <button onclick="openChangePasswordModal()" class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group">
                            <div class="flex items-center gap-3">
                                <i class="bi bi-key text-xl text-gray-600 group-hover:text-red-600 transition"></i>
                                <div class="text-left">
                                    <p class="text-sm font-medium text-gray-800">Change Password</p>
                                    <p class="text-xs text-gray-500">Update your password</p>
                                </div>
                            </div>
                            <i class="bi bi-chevron-right text-gray-400"></i>
                        </button>

                        <button onclick="showNotification('Two-Factor Authentication coming soon', 'info')" class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group">
                            <div class="flex items-center gap-3">
                                <i class="bi bi-shield-lock text-xl text-gray-600 group-hover:text-red-600 transition"></i>
                                <div class="text-left">
                                    <p class="text-sm font-medium text-gray-800">Two-Factor Auth</p>
                                    <p class="text-xs text-gray-500">Not enabled</p>
                                </div>
                            </div>
                            <i class="bi bi-chevron-right text-gray-400"></i>
                        </button>

                        <button onclick="showSection('audit')" class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group">
                            <div class="flex items-center gap-3">
                                <i class="bi bi-clock-history text-xl text-gray-600 group-hover:text-red-600 transition"></i>
                                <div class="text-left">
                                    <p class="text-sm font-medium text-gray-800">Login History</p>
                                    <p class="text-xs text-gray-500">View recent logins</p>
                                </div>
                            </div>
                            <i class="bi bi-chevron-right text-gray-400"></i>
                        </button>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="bg-white rounded-xl shadow-md p-6 animate-fade-in-up animation-delay-800">
                    <div class="flex items-center gap-3 mb-6">
                        <i class="bi bi-link-45deg text-2xl text-red-600"></i>
                        <h2 class="text-xl font-bold text-gray-800">Quick Links</h2>
                    </div>
                    
                    <div class="space-y-3">
                        <button onclick="showNotification('Account Settings coming soon', 'info')" class="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition">
                            <i class="bi bi-gear text-gray-600"></i>
                            <span class="text-sm text-gray-700">Account Settings</span>
                        </button>
                        <button onclick="showSection('documents')" class="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition">
                            <i class="bi bi-files text-gray-600"></i>
                            <span class="text-sm text-gray-700">My Documents</span>
                        </button>
                        <button onclick="showNotification('Help Center coming soon', 'info')" class="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition">
                            <i class="bi bi-question-circle text-gray-600"></i>
                            <span class="text-sm text-gray-700">Help Center</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

// Profile Picture Upload Handler
function handleProfilePictureUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showNotification('Please upload a valid image file (JPEG, PNG, GIF, or WEBP)', 'error');
        return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File size must be less than 5MB', 'error');
        return;
    }

    // Read and display the image
    const reader = new FileReader();
    reader.onload = function (e) {
        AppData.currentUser.profilePicture = e.target.result;

        // Update profile image
        const profileImage = document.getElementById('profileImage');
        if (profileImage) {
            if (profileImage.tagName === 'IMG') {
                profileImage.src = e.target.result;
            } else {
                // Replace div with img
                const img = document.createElement('img');
                img.id = 'profileImage';
                img.src = e.target.result;
                img.alt = 'Profile';
                img.className = 'w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover';
                profileImage.parentNode.replaceChild(img, profileImage);
            }
        }

        // Update navbar profile picture
        updateNavbarProfilePicture(e.target.result);

        showNotification('Profile picture updated successfully!', 'success');
        addAuditLog('update', 'Updated profile picture');
    };
    reader.readAsDataURL(file);
}

// Update navbar profile picture
function updateNavbarProfilePicture(imageUrl) {
    // Update top navbar profile picture
    const navProfilePic = document.querySelector('#profile-menu');
    if (navProfilePic) {
        // Check if it already has an image
        const existingImg = navProfilePic.querySelector('img');
        if (existingImg) {
            existingImg.src = imageUrl;
        } else {
            // Replace icon with image
            navProfilePic.innerHTML = `<img src="${imageUrl}" alt="Profile" class="w-8 h-8 rounded-full border-2 border-white object-cover">`;
        }
    }

    // Update sidebar profile picture
    const sidebarProfilePic = document.querySelector('#sidebar-profile-pic');
    if (sidebarProfilePic) {
        const existingImg = sidebarProfilePic.querySelector('img');
        if (existingImg) {
            existingImg.src = imageUrl;
        } else {
            sidebarProfilePic.innerHTML = `<img src="${imageUrl}" alt="Profile" class="w-10 h-10 rounded-full border-2 border-white object-cover">`;
        }
    }
}

// Toggle edit mode
let isEditMode = false;
function toggleEditMode() {
    isEditMode = !isEditMode;

    const fields = ['editFullName', 'editUsername', 'editEmail', 'editPhone', 'editDepartment', 'editPosition'];
    const saveBtn = document.getElementById('saveProfileBtn');

    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.disabled = !isEditMode;
            if (isEditMode) {
                field.classList.add('border-red-300', 'focus:border-red-500');
            } else {
                field.classList.remove('border-red-300', 'focus:border-red-500');
            }
        }
    });

    if (saveBtn) {
        if (isEditMode) {
            saveBtn.classList.remove('hidden');
        } else {
            saveBtn.classList.add('hidden');
        }
    }
}

// Save profile changes
function saveProfile() {
    AppData.currentUser.name = document.getElementById('editFullName').value;
    AppData.currentUser.email = document.getElementById('editEmail').value;

    showNotification('Profile updated successfully!', 'success');
    addAuditLog('update', 'Updated profile information');

    toggleEditMode();
    renderProfile();
}

// Open change password modal
function openChangePasswordModal() {
    const modal = document.createElement('div');
    modal.id = 'changePasswordModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-gray-800">Change Password</h2>
                    <button onclick="closeChangePasswordModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="bi bi-x-lg text-xl"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input type="password" id="currentPassword" class="input-field" placeholder="Enter current password">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input type="password" id="newPassword" class="input-field" placeholder="Enter new password">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input type="password" id="confirmPassword" class="input-field" placeholder="Confirm new password">
                    </div>
                </div>
            </div>
            
            <div class="p-6 border-t border-gray-200 flex gap-3">
                <button onclick="changePassword()" class="btn-primary flex-1">
                    <i class="bi bi-key mr-2"></i>Update Password
                </button>
                <button onclick="closeChangePasswordModal()" class="btn-outline flex-1">
                    Cancel
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.remove();
    }
}

function changePassword() {
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (!current || !newPass || !confirm) {
        showNotification('Please fill in all password fields', 'error');
        return;
    }

    if (newPass !== confirm) {
        showNotification('New passwords do not match', 'error');
        return;
    }

    if (newPass.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }

    closeChangePasswordModal();
    showNotification('Password changed successfully!', 'success');
    addAuditLog('update', 'Changed account password');
}

function updateProfile() {
    showNotification('Profile updated successfully', 'success');
    addAuditLog('update', 'Updated profile information');
}

function changePassword() {
    showNotification('Password changed successfully', 'success');
    addAuditLog('update', 'Changed account password');
}

function updateProfile() {
    showNotification('Profile updated successfully', 'success');
    addAuditLog('update', 'Updated profile information');
}

function changePassword() {
    showNotification('Password changed successfully', 'success');
    addAuditLog('update', 'Changed account password');
}

// ==============================
// UPLOAD DOCUMENT FUNCTIONALITY
// ==============================
function handleDocumentUpload(event) {
    event.preventDefault();

    const formData = {
        reference: document.getElementById('docReference').value,
        title: document.getElementById('docTitle').value,
        type: document.getElementById('docType').value,
        date: document.getElementById('docDate').value,
        status: document.getElementById('docStatus').value,
        description: document.getElementById('docDescription').value,
        tags: document.getElementById('docTags').value.split(',').map(t => t.trim())
    };

    // Validate
    if (!formData.reference || !formData.title || !formData.type || !formData.date) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Create new document
    const newDoc = {
        id: AppData.documents.length + 1,
        ...formData,
        uploadedBy: AppData.currentUser.name,
        uploadedAt: new Date().toLocaleString(),
        fileSize: '1.2 MB',
        views: 0,
        downloads: 0
    };

    AppData.documents.unshift(newDoc);

    // Close modal and reset form
    closeModal('upload-modal');
    document.getElementById('uploadForm').reset();

    // Show success notification
    showNotification('Document uploaded successfully', 'success');

    // Add audit log
    addAuditLog('upload', `Uploaded document ${formData.reference}`);

    // Refresh if on documents page
    if (document.getElementById('documentsList')) {
        filterDocuments();
    }
}

// Setup drag and drop
function setupDragAndDrop() {
    const dropzone = document.getElementById('dropzone');
    if (!dropzone) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.classList.add('border-red-600', 'bg-red-50');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
            dropzone.classList.remove('border-red-600', 'bg-red-50');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            showNotification(`File "${files[0].name}" ready to upload`, 'info');
        }
    }, false);
}

// ==============================
// UTILITY FUNCTIONS
// ==============================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function loadNotifications() {
    const notifsList = document.getElementById('notifications-list');
    if (!notifsList) return;

    const unreadCount = AppData.notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notif-badge');

    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    notifsList.innerHTML = AppData.notifications.map(notif => `
        <a href="#" class="block px-4 py-3 hover:bg-gray-50 transition ${!notif.read ? 'bg-blue-50' : ''}">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    ${getNotificationIcon(notif.type)}
                </div>
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium text-gray-800">${notif.title}</p>
                    <p class="text-xs text-gray-600">${notif.message}</p>
                    <p class="text-xs text-gray-500 mt-1">${notif.time}</p>
                </div>
            </div>
        </a>
    `).join('');
}

function showNotification(message, type = 'info') {
    const colors = {
        success: 'bg-green-100 text-green-800 border-green-300',
        error: 'bg-red-100 text-red-800 border-red-300',
        info: 'bg-blue-100 text-blue-800 border-blue-300',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    };

    const icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        info: 'bi-info-circle-fill',
        warning: 'bi-exclamation-triangle-fill'
    };

    const notif = document.createElement('div');
    notif.className = `fixed top-4 right-4 ${colors[type]} px-6 py-4 rounded-lg shadow-lg border-2 flex items-center gap-3 z-50 animate-fade-in`;
    notif.innerHTML = `
        <i class="bi ${icons[type]} text-xl"></i>
        <span class="font-medium">${message}</span>
    `;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.classList.add('opacity-0', 'transform', 'translate-x-full');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function getStatusBadge(status) {
    const badges = {
        approved: '<span class="badge badge-success">Approved</span>',
        pending: '<span class="badge badge-warning">Pending</span>',
        draft: '<span class="badge badge-secondary">Draft</span>'
    };
    return badges[status] || '<span class="badge badge-secondary">Unknown</span>';
}

function getUserStatusBadge(status) {
    const badges = {
        active: '<span class="badge badge-success">Active</span>',
        inactive: '<span class="badge badge-secondary">Inactive</span>'
    };
    return badges[status] || '<span class="badge badge-secondary">Unknown</span>';
}

function getActionBadge(action) {
    const badges = {
        upload: '<span class="badge badge-info">Upload</span>',
        approve: '<span class="badge badge-success">Approve</span>',
        update: '<span class="badge badge-warning">Update</span>',
        delete: '<span class="badge badge-danger">Delete</span>'
    };
    return badges[action] || '<span class="badge badge-secondary">' + action + '</span>';
}

function getNotificationIcon(type) {
    const icons = {
        document: '<i class="bi bi-file-earmark-text text-red-600"></i>',
        approval: '<i class="bi bi-check-circle text-green-600"></i>',
        user: '<i class="bi bi-person text-blue-600"></i>'
    };
    return icons[type] || '<i class="bi bi-bell text-gray-600"></i>';
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function renderProposals() {
    const html = `
        <!-- Modern Gradient Header -->
        <div class="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-xl p-8 mb-6 text-white transform hover:scale-[1.01] transition-all duration-300 animate-fade-in">
            <div class="flex items-center justify-between">
                <div class="animate-slide-in-left">
                    <div class="flex items-center gap-4 mb-2">
                        <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                            <i class="bi bi-file-earmark-text text-4xl"></i>
                        </div>
                        <div>
                            <h1 class="text-3xl font-bold">Proposal Submission & Intake</h1>
                            <p class="text-red-100 text-sm mt-1">Streamlined digital submission process for legislative proposals</p>
                        </div>
                    </div>
                </div>
                <div class="hidden lg:block animate-slide-in-right">
                    <i class="bi bi-clipboard-check text-8xl opacity-20"></i>
                </div>
            </div>
        </div>

        <!-- Enhanced Submission Form Card with Glassmorphism -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 mb-6 transform hover:shadow-2xl transition-all duration-300 animate-fade-in-up animation-delay-100">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-red-100">
                <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                    <i class="bi bi-pencil-square text-white text-2xl"></i>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">Digital Submission Form</h3>
                    <p class="text-sm text-gray-600">Complete the form below to submit your proposal</p>
                </div>
            </div>
            
            <form id="proposal-form" onsubmit="handleProposalSubmission(event)" class="proposal-form-enhanced">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="form-group-enhanced">
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                            <i class="bi bi-file-text text-red-600 text-lg"></i>
                            Proposal Title
                        </label>
                        <input type="text" name="title" class="input-field-enhanced" placeholder="Enter a descriptive proposal title" required>
                    </div>
                    <div class="form-group-enhanced">
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                            <i class="bi bi-tag text-red-600 text-lg"></i>
                            Type
                        </label>
                        <select name="type" class="input-field-enhanced" required>
                            <option value="Ordinance">📜 Ordinance</option>
                            <option value="Resolution">📋 Resolution</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div class="form-group-enhanced">
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                            <i class="bi bi-person-badge text-red-600 text-lg"></i>
                            Submitting Councilor
                        </label>
                        <input type="text" name="councilor" class="input-field-enhanced" placeholder="Enter councilor name" required>
                    </div>
                    <div class="form-group-enhanced">
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                            <i class="bi bi-person-check text-red-600 text-lg"></i>
                            Author / Sponsor
                        </label>
                        <input type="text" name="author" class="input-field-enhanced" placeholder="Author or sponsor name" required>
                    </div>
                </div>

                <div class="mt-6 form-group-enhanced">
                    <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <i class="bi bi-file-earmark-text text-red-600 text-lg"></i>
                        Proposal Draft / Text
                    </label>
                    <textarea name="description" class="input-field-enhanced" rows="6" placeholder="Enter the full text of your proposal or draft here..." required></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div class="form-group-enhanced">
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                            <i class="bi bi-folder text-red-600 text-lg"></i>
                            Initial Category
                        </label>
                        <select name="category" class="input-field-enhanced">
                            <option value="General">🏛️ General</option>
                            <option value="Finance">💰 Finance</option>
                            <option value="Infrastructure">🏗️ Infrastructure</option>
                            <option value="Health">🏥 Health</option>
                            <option value="Education">🎓 Education</option>
                            <option value="Other">📌 Other</option>
                        </select>
                    </div>
                    <div class="form-group-enhanced">
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                            <i class="bi bi-bucket text-red-600 text-lg"></i>
                            Bucket Number
                        </label>
                        <div class="flex items-center gap-2">
                            <input type="text" id="bucketNumber" name="bucketNumber" class="input-field-enhanced" placeholder="Optional or generate" />
                            <button type="button" onclick="assignBucketNumberToField()" class="btn-outline-enhanced">
                                <i class="bi bi-hash"></i> Assign
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Enhanced File Upload Zone -->
                <div class="mt-6 form-group-enhanced text-center">
                    <label class="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <i class="bi bi-paperclip text-red-600 text-lg"></i>
                        Upload Supporting Document(s)
                    </label>
                    <div class="file-upload-zone text-center" id="fileUploadZone">
                        <input type="file" name="supportingDocuments" id="supportingDocuments" class="hidden" accept=".pdf,.doc,.docx,.txt" multiple onchange="updateFileName(this)">
                        <label for="supportingDocuments" class="file-upload-label group w-full">
                            <div class="flex flex-col items-center justify-center py-4 text-center w-full">
                                <i class="bi bi-cloud-upload text-4xl text-red-600 mb-2 transform group-hover:scale-110 transition-transform"></i>
                                <p class="text-base font-semibold text-gray-700 mb-1">Click to upload or drag and drop</p>
                                <p class="text-sm text-gray-500">PDF, DOC, DOCX, TXT (max 5MB per file)</p>
                            </div>
                        </label>
                        <div id="fileName" class="mt-3 text-sm text-gray-600"></div>
                    </div>
                </div>

                <!-- Enhanced Checkboxes -->
                <div class="mt-6 flex flex-wrap items-center justify-center gap-6">
                    <label class="checkbox-enhanced">
                        <input type="checkbox" name="submitToSecretary" class="form-checkbox-enhanced" />
                        <span class="checkbox-label">
                            <i class="bi bi-send-check mr-2"></i>
                            Submit to Council Secretary
                        </span>
                    </label>
                    <label class="checkbox-enhanced">
                        <input type="checkbox" name="autoAssignBucket" class="form-checkbox-enhanced" />
                        <span class="checkbox-label">
                            <i class="bi bi-magic mr-2"></i>
                            Auto-generate bucket number
                        </span>
                    </label>
                </div>

                <!-- Enhanced Submit Button -->
                <div class="mt-8 flex items-center justify-center gap-4">
                    <button type="submit" class="btn-primary-enhanced">
                        <i class="bi bi-cloud-upload mr-2"></i>
                        Submit Proposal
                    </button>
                    <button type="reset" class="btn-outline-enhanced">
                        <i class="bi bi-x-circle mr-2"></i>
                        Clear Form
                    </button>
                </div>
            </form>
        </div>

        <!-- Info Cards Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- Numbering System Info Card -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-200">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-hash text-white text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Numbering System</h3>
                </div>
                <p class="text-sm text-gray-700 mb-3">Proposals are automatically numbered:</p>
                <div class="bg-white rounded-lg p-3 mb-2">
                    <p class="text-xs font-mono text-blue-800 font-semibold">PROP-YYYY-NNN</p>
                </div>
                <ul class="text-xs text-gray-600 space-y-1">
                    <li>• <strong>YYYY</strong>: Submission year</li>
                    <li>• <strong>NNN</strong>: Sequential number (001+)</li>
                </ul>
            </div>

            <!-- Bucket System Info Card -->
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-6 border-l-4 border-purple-500 transform hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-300">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-bucket text-white text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Bucket Tracking</h3>
                </div>
                <p class="text-sm text-gray-700 mb-3">Group related proposals:</p>
                <div class="bg-white rounded-lg p-3 mb-2">
                    <p class="text-xs font-mono text-purple-800 font-semibold">BUCKET-YYYY-NNN</p>
                </div>
                <p class="text-xs text-gray-600">Auto-generated or manually assigned for batch tracking</p>
            </div>

            <!-- Quick Stats Card -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 border-l-4 border-green-500 transform hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-400">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-graph-up text-white text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Quick Stats</h3>
                </div>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-700">Total Proposals:</span>
                        <span class="text-lg font-bold text-green-700">${(AppData.documents || []).length}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-700">Draft:</span>
                        <span class="text-sm font-semibold text-gray-600">${(AppData.documents || []).filter(d => !d.status || d.status === 'draft').length}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-700">Submitted:</span>
                        <span class="text-sm font-semibold text-gray-600">${(AppData.documents || []).filter(d => d.status === 'submitted').length}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sponsorship Forms Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Sponsorship Declaration Card -->
            <div class="bg-white rounded-xl shadow-lg border-t-4 border-indigo-500 p-6 transform hover:shadow-2xl transition-all duration-300 animate-fade-in-up animation-delay-500">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <i class="bi bi-person-check text-indigo-600 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">Sponsorship Declaration</h3>
                </div>
                <form id="sponsorship-form" onsubmit="handleSponsorshipDeclaration(event)">
                    <div class="space-y-4">
                        <div class="form-group-enhanced">
                            <label class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <i class="bi bi-file-earmark text-indigo-600"></i>
                                Proposal Number
                            </label>
                            <input type="text" name="proposal-number" class="input-field-enhanced" placeholder="e.g., PROP-2025-001" required>
                        </div>
                        <div class="form-group-enhanced">
                            <label class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <i class="bi bi-person text-indigo-600"></i>
                                Sponsor Name
                            </label>
                            <input type="text" name="sponsor" class="input-field-enhanced" placeholder="Enter sponsor name" required>
                        </div>
                    </div>
                    <div class="mt-6">
                        <button type="submit" class="btn-primary-enhanced w-full">
                            <i class="bi bi-person-check mr-2"></i>
                            Declare Sponsorship
                        </button>
                    </div>
                </form>
            </div>

            <!-- Co-Sponsorship Card -->
            <div class="bg-white rounded-xl shadow-lg border-t-4 border-teal-500 p-6 transform hover:shadow-2xl transition-all duration-300 animate-fade-in-up animation-delay-600">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <i class="bi bi-people text-teal-600 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">Co-Sponsorship Management</h3>
                </div>
                <form id="co-sponsorship-form" onsubmit="handleCoSponsorship(event)">
                    <div class="space-y-4">
                        <div class="form-group-enhanced">
                            <label class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <i class="bi bi-file-earmark text-teal-600"></i>
                                Proposal Number
                            </label>
                            <input type="text" name="proposal-number" class="input-field-enhanced" placeholder="e.g., PROP-2025-001" required>
                        </div>
                        <div class="form-group-enhanced">
                            <label class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <i class="bi bi-person-plus text-teal-600"></i>
                                Co-Sponsor Name
                            </label>
                            <input type="text" name="co-sponsor" class="input-field-enhanced" placeholder="Enter co-sponsor name" required>
                        </div>
                    </div>
                    <div class="mt-6">
                        <button type="submit" class="btn-primary-enhanced w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800">
                            <i class="bi bi-people mr-2"></i>
                            Add Co-Sponsor
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Enhanced Proposals Table -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 animate-fade-in-up animation-delay-700">
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <i class="bi bi-table text-red-600 text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800">Existing Proposals</h3>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                        <i class="bi bi-file-earmark-text"></i>
                        <span>${(AppData.documents || []).length} total</span>
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Reference</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Title</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Bucket</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Submitted</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${(AppData.documents || []).length === 0 ? `
                            <tr>
                                <td colspan="7" class="px-6 py-12 text-center">
                                    <i class="bi bi-inbox text-6xl text-gray-300 mb-4"></i>
                                    <p class="text-gray-500">No proposals yet. Submit your first proposal above!</p>
                                </td>
                            </tr>
                        ` : (AppData.documents || []).map((d, index) => `
                            <tr class="hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent transition-all duration-200 transform hover:scale-[1.01] animate-fade-in-up" style="animation-delay: ${100 + index * 50}ms">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-2">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            ${d.reference}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-medium text-gray-900">${d.title}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${d.type === 'Ordinance' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">
                                        ${d.type === 'Ordinance' ? '📜' : '📋'} ${d.type || '—'}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    ${getEnhancedStatusBadge(d.status)}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    ${d.bucketNumber ? `<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"><i class="bi bi-bucket mr-1"></i>${d.bucketNumber}</span>` : '<span class="text-gray-400 text-xs">Not assigned</span>'}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    ${d.submittedToSecretaryAt || '—'}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <div class="flex items-center justify-center gap-2">
                                        <button onclick="openProposalDetails(${d.id})" class="inline-flex items-center px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 hover:text-indigo-900 rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-105">
                                            <i class="bi bi-eye mr-1"></i> View
                                        </button>
                                        ${(!d.status || d.status === 'draft') ? `
                                            <button onclick="sendToCouncilSecretary(${d.id})" class="inline-flex items-center px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-900 rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-105">
                                                <i class="bi bi-send mr-1"></i> Send
                                            </button>
                                        ` : `
                                            <span class="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium">
                                                <i class="bi bi-check-circle mr-1"></i> Submitted
                                            </span>
                                        `}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

// Helper function for enhanced status badges
function getEnhancedStatusBadge(status) {
    const badges = {
        'draft': '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300"><i class="bi bi-pencil mr-1"></i>Draft</span>',
        'submitted': '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300"><i class="bi bi-check-circle mr-1"></i>Submitted</span>',
        'approved': '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-300"><i class="bi bi-hand-thumbs-up mr-1"></i>Approved</span>',
        'pending': '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-300"><i class="bi bi-clock mr-1"></i>Pending</span>'
    };
    return badges[status] || badges['draft'];
}

// Handle Proposal Submission
function handleProposalSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const title = formData.get('title');
    const type = formData.get('type') || 'Ordinance';
    const councilor = formData.get('councilor');
    const author = formData.get('author');
    const description = formData.get('description');
    const category = formData.get('category') || 'General';
    const bucketNumberField = formData.get('bucketNumber') || '';
    const submitToSecretary = formData.get('submitToSecretary') === 'on' || formData.get('submitToSecretary') === 'true';
    const autoAssignBucket = formData.get('autoAssignBucket') === 'on' || formData.get('autoAssignBucket') === 'true';
    const files = document.getElementById('supportingDocuments')?.files || [];

    // Validate file sizes (max 5MB per file)
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if (f.size > 5 * 1024 * 1024) {
            showToast(`File "${f.name}" exceeds the 5MB limit.`, 'error');
            return;
        }
    }

    console.log('Proposal Submitted:');
    console.log({ title, type, councilor, author, category, bucketNumberField, submitToSecretary, files });

    // Create or assign reference and bucket
    const reference = generateProposalReference();
    const bucket = autoAssignBucket ? generateBucketNumber() : (bucketNumberField.trim() || null);

    // Compose document object for in-memory store
    const newDocId = AppData.documents.length ? Math.max(...AppData.documents.map(d => d.id)) + 1 : 1;
    const doc = {
        id: newDocId,
        reference,
        title,
        type,
        author,
        submitter: councilor,
        title_short: title,
        title_long: title,
        description,
        category,
        bucketNumber: bucket,
        supportingDocuments: Array.from(files).map(f => ({ name: f.name, size: f.size, type: f.type })),
        status: submitToSecretary ? 'submitted' : 'draft',
        uploadedAt: new Date().toLocaleString(),
        uploadedBy: AppData.currentUser.name
    };

    // Persist in-memory
    AppData.documents = AppData.documents || [];
    AppData.documents.push(doc);

    // Audit log
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'proposal-submitted', description: `Submitted ${reference} (${title}) by ${councilor}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
    if (submitToSecretary) {
        AppData.auditLogs.push({ id: AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1, user: AppData.currentUser.name, action: 'submitted-to-secretary', description: `Submitted ${reference} to Council Secretary`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
    }

    showToast('Proposal submitted successfully!', 'success');
    form.reset();
    renderProposals();

    // Example: Send data to the server (replace with actual API endpoint)
    fetch('/api/proposals', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Server Response:', data);
            showToast('Proposal submitted successfully!', 'success');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Failed to submit proposal.', 'error');
        });
}

// Handle Sponsorship Declaration
function handleSponsorshipDeclaration(event) {
    event.preventDefault();
    const form = event.target;
    const proposalNumber = form['proposal-number'].value;
    const sponsor = form.sponsor.value;

    console.log(`Sponsorship Declared: ${proposalNumber} by ${sponsor}`);
    showToast('Sponsorship declared successfully!', 'success');
    form.reset();
}

// Handle Co-Sponsorship
function handleCoSponsorship(event) {
    event.preventDefault();
    const form = event.target;
    const proposalNumber = form['proposal-number'].value;
    const coSponsor = form['co-sponsor'].value;

    console.log(`Co-Sponsorship Added: ${proposalNumber} by ${coSponsor}`);
    showToast('Co-sponsorship added successfully!', 'success');
    form.reset();
}

// Update file name display when selecting files
function updateFileName(input) {
    const span = document.getElementById('fileName');
    if (!span) return;
    if (!input || !input.files || input.files.length === 0) {
        span.textContent = 'No files chosen';
        return;
    }
    const names = Array.from(input.files).map(f => f.name).join(', ');
    span.textContent = names;
}

function generateProposalReference() {
    const year = new Date().getFullYear();
    const prefix = `PROP-${year}-`;
    const existing = (AppData.documents || []).filter(d => d.reference && d.reference.startsWith(prefix)).map(d => d.reference);
    const nums = existing.map(r => parseInt(r.split('-').pop()) || 0);
    const max = nums.length ? Math.max(...nums) : 0;
    const next = String(max + 1).padStart(3, '0');
    return `${prefix}${next}`;
}

function generateBucketNumber() {
    const year = new Date().getFullYear();
    const prefix = `BUCKET-${year}-`;
    const existing = (AppData.documents || []).filter(d => d.bucketNumber && d.bucketNumber.startsWith(prefix)).map(d => d.bucketNumber);
    const nums = existing.map(b => parseInt(b.split('-').pop()) || 0);
    const max = nums.length ? Math.max(...nums) : 0;
    const next = String(max + 1).padStart(3, '0');
    return `${prefix}${next}`;
}

function assignBucketNumberToField() {
    const el = document.getElementById('bucketNumber');
    if (!el) return;
    el.value = generateBucketNumber();
    showToast('Bucket number assigned', 'success');
}

// Send a proposal to the Council Secretary with an optional note
function sendToCouncilSecretary(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (doc.status === 'submitted' || doc.status === 'submitted_to_secretary') {
        showToast('Proposal already submitted to the Council Secretary', 'info');
        return;
    }

    openInputModal({
        title: `Note to Council Secretary for ${doc.reference} (optional)`, defaultValue: doc.secretaryNote || '', multiline: true, placeholder: 'Enter a note for the secretary (optional)...', onConfirm: (note) => {
            if (note === null || note === undefined) return; // cancelled
            doc.status = 'submitted';
            doc.submittedToSecretaryAt = new Date().toLocaleString();
            doc.secretaryNote = note.trim();

            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'submitted-to-secretary', description: `Submitted ${doc.reference} to Council Secretary${note.trim() ? ' with note' : ''}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });

            showToast('Proposal sent to Council Secretary', 'success');
            renderProposals();
        }
    });
}

function openProposalDetails(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const files = (doc.supportingDocuments || []).map(f => `<li>${f.name} (${Math.round(f.size / 1024)} KB)</li>`).join('') || '<li>No attachments</li>';
    const html = `
        <div class="space-y-3">
            <div><strong>Reference:</strong> ${doc.reference}</div>
            <div><strong>Title:</strong> ${doc.title}</div>
            <div><strong>Type:</strong> ${doc.type || '—'}</div>
            <div><strong>Author / Sponsor:</strong> ${doc.author || '—'}</div>
            <div><strong>Category:</strong> ${doc.category || '—'}</div>
            <div><strong>Bucket:</strong> ${doc.bucketNumber || '—'}</div>
            <div><strong>Status:</strong> ${doc.status || 'draft'}</div>
            <div><strong>Submitted to Secretary:</strong> ${doc.submittedToSecretaryAt || '—'}</div>
            <div><strong>Attachments:</strong><ul class="list-disc ml-5">${files}</ul></div>
            <div><strong>Draft / Text:</strong><pre class="whitespace-pre-wrap text-sm">${(doc.description || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre></div>
        </div>
    `;
    openViewModal(`Details — ${doc.reference}`, html);
}

// ==============================
// RESEARCH & ANALYSIS INTEGRATION
// ==============================

function setCommitteeDeadline(docId) {
    const deadlineInput = document.getElementById(`comm-deadline-${docId}`);
    if (!deadlineInput) return;
    const deadline = deadlineInput.value;
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.committee) doc.committee = { name: '', status: 'pending', hearingRecord: '', report: '', amendments: [], deadline: null, reminded: false };
    doc.committee.deadline = deadline || null;
    showToast(deadline ? `Deadline set to ${deadline}` : 'Deadline cleared', 'success');
    renderCommitteeStage();
}

function sendReminderCommittee(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.committee) doc.committee = { name: '', status: 'pending', hearingRecord: '', report: '', amendments: [], deadline: null, reminded: false };

    doc.committee.reminded = true;

    // Log reminder
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({
        id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1),
        user: AppData.currentUser.name,
        action: 'reminder',
        description: `Sent committee reminder for ${doc.reference}${doc.committee.name ? ' to ' + doc.committee.name : ''}`,
        timestamp: new Date().toLocaleString(),
        ipAddress: '127.0.0.1'
    });

    showToast('Reminder sent to committee', 'success');
    renderCommitteeStage();
}

// ==============================
// RESEARCH & ANALYSIS INTEGRATION
// ==============================

function renderResearchAnalysis() {
    const docs = AppData.documents;
    const html = `
        <div class="mb-6 animate-fade-in">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold text-gray-800">Research & Analysis Integration</h1>
                <p class="text-sm text-gray-600">Link research, policy analysis, legal opinions, and impact assessments</p>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Research Reports</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy Analysis</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Legal Opinion</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impact Assessment</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Similar Legislation</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${docs.map(doc => {
        if (!doc.research) doc.research = { reports: [], policyAnalysis: '', legalOpinion: '', impactAssessment: '', similarLegislation: [] };
        const research = doc.research;
        const reportCount = (research.reports && research.reports.length) || 0;
        const legisCount = (research.similarLegislation && research.similarLegislation.length) || 0;
        return `
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4 text-sm font-medium text-gray-900">${doc.reference}</td>
                                <td class="px-6 py-4 text-sm">
                                    <span class="font-semibold">${reportCount}</span> report(s)
                                    <button onclick="manageResearchReports(${doc.id})" class="ml-2 text-blue-600 hover:text-blue-800">Manage</button>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    ${research.policyAnalysis ? `<button onclick="viewPolicyAnalysis(${doc.id})" class="text-green-600 hover:text-green-800">View</button>` : '<span class="text-gray-400">None</span>'}
                                    <button onclick="addPolicyAnalysis(${doc.id})" class="ml-2 text-green-600 hover:text-green-800">Add / Edit</button>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    ${research.legalOpinion ? `<button onclick="viewLegalOpinion(${doc.id})" class="text-purple-600 hover:text-purple-800">View</button>` : '<span class="text-gray-400">None</span>'}
                                    <button onclick="addLegalOpinion(${doc.id})" class="ml-2 text-purple-600 hover:text-purple-800">Add / Edit</button>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    ${research.impactAssessment ? `<button onclick="viewImpactAssessment(${doc.id})" class="text-orange-600 hover:text-orange-800">View</button>` : '<span class="text-gray-400">None</span>'}
                                    <button onclick="addImpactAssessment(${doc.id})" class="ml-2 text-orange-600 hover:text-orange-800">Add / Edit</button>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <span class="font-semibold">${legisCount}</span> reference(s)
                                    <button onclick="manageSimilarLegislation(${doc.id})" class="ml-2 text-indigo-600 hover:text-indigo-800">Manage</button>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <button onclick="generateResearchSummary(${doc.id})" class="text-red-600 hover:text-red-800" title="Generate summary">📄 Summary</button>
                                </td>
                            </tr>`;
    }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

function manageResearchReports(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.research) doc.research = { reports: [], policyAnalysis: '', legalOpinion: '', impactAssessment: '', similarLegislation: [] };
    openInputModal({
        title: `Research reports for ${doc.reference}`,
        defaultValue: '',
        multiline: false,
        placeholder: 'Type "add" to add, "view" to view, or paste report name/URL directly',
        onConfirm: (action) => {
            if (action === null || action === undefined) return;
            const a = action.trim();
            if (a.toLowerCase() === 'add') {
                openInputModal({
                    title: `Add research report for ${doc.reference}`,
                    defaultValue: '',
                    multiline: false,
                    placeholder: 'Enter report name or URL...',
                    onConfirm: (report) => {
                        if (report === null || report === undefined) return;
                        doc.research.reports = doc.research.reports || [];
                        doc.research.reports.push({ name: report.trim(), date: new Date().toLocaleString() });
                        showToast('Research report linked', 'success');
                        renderResearchAnalysis();
                    }
                });
            } else if (a.toLowerCase() === 'view') {
                const list = doc.research.reports && doc.research.reports.length
                    ? doc.research.reports.map((r, i) => `${i + 1}. ${r.name} (${r.date})`).join('<br>')
                    : 'No reports linked yet';
                openViewModal(`Research reports for ${doc.reference}`, `<div class="text-sm whitespace-pre-wrap">${list}</div>`);
                return;
            } else if (a.length > 0) {
                doc.research.reports = doc.research.reports || [];
                doc.research.reports.push({ name: a, date: new Date().toLocaleString() });
                showToast('Research report linked', 'success');
                renderResearchAnalysis();
            }
        }
    });
}

function addPolicyAnalysis(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const existing = doc.research && doc.research.policyAnalysis ? doc.research.policyAnalysis : '';
    openInputModal({
        title: `Policy analysis for ${doc.reference}`,
        defaultValue: existing,
        multiline: true,
        placeholder: 'Enter or paste policy analysis... ',
        onConfirm: (analysis) => {
            if (analysis === null || analysis === undefined) return;
            if (!doc.research) doc.research = { reports: [], policyAnalysis: '', legalOpinion: '', impactAssessment: '', similarLegislation: [] };
            doc.research.policyAnalysis = analysis.trim();
            showToast('Policy analysis saved', 'success');
            renderResearchAnalysis();
        }
    });
}

function viewPolicyAnalysis(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc || !doc.research || !doc.research.policyAnalysis) {
        showToast('No policy analysis available', 'warning');
        return;
    }
    openViewModal(`Policy Analysis for ${doc.reference}`, `<pre class="whitespace-pre-wrap text-sm">${doc.research.policyAnalysis.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`);
}

function addLegalOpinion(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const existing = doc.research && doc.research.legalOpinion ? doc.research.legalOpinion : '';
    openInputModal({
        title: `Legal opinion for ${doc.reference}`,
        defaultValue: existing,
        multiline: true,
        placeholder: 'Enter legal opinion or review...',
        onConfirm: (opinion) => {
            if (opinion === null || opinion === undefined) return;
            if (!doc.research) doc.research = { reports: [], policyAnalysis: '', legalOpinion: '', impactAssessment: '', similarLegislation: [] };
            doc.research.legalOpinion = opinion.trim();
            showToast('Legal opinion saved', 'success');
            renderResearchAnalysis();
        }
    });
}

function viewLegalOpinion(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc || !doc.research || !doc.research.legalOpinion) {
        showToast('No legal opinion available', 'warning');
        return;
    }
    openViewModal(`Legal Opinion for ${doc.reference}`, `<pre class="whitespace-pre-wrap text-sm">${doc.research.legalOpinion.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`);
}

function addImpactAssessment(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const existing = doc.research && doc.research.impactAssessment ? doc.research.impactAssessment : '';
    openInputModal({
        title: `Impact assessment for ${doc.reference}`,
        defaultValue: existing,
        multiline: true,
        placeholder: 'Enter impact assessment...',
        onConfirm: (assessment) => {
            if (assessment === null || assessment === undefined) return;
            if (!doc.research) doc.research = { reports: [], policyAnalysis: '', legalOpinion: '', impactAssessment: '', similarLegislation: [] };
            doc.research.impactAssessment = assessment.trim();
            showToast('Impact assessment saved', 'success');
            renderResearchAnalysis();
        }
    });
}

function viewImpactAssessment(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc || !doc.research || !doc.research.impactAssessment) {
        showToast('No impact assessment available', 'warning');
        return;
    }
    openViewModal(`Impact Assessment for ${doc.reference}`, `<pre class="whitespace-pre-wrap text-sm">${doc.research.impactAssessment.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`);
}

function manageSimilarLegislation(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.research) doc.research = { reports: [], policyAnalysis: '', legalOpinion: '', impactAssessment: '', similarLegislation: [] };

    openInputModal({
        title: `Similar legislation for ${doc.reference}`,
        defaultValue: '',
        multiline: false,
        placeholder: 'Type "add" to add, "view" to view, or enter "LGU Name / Ordinance Ref"',
        onConfirm: (action) => {
            if (action === null || action === undefined) return;
            const a = action.trim();
            if (a.toLowerCase() === 'add') {
                openInputModal({
                    title: `Add similar legislation for ${doc.reference}`,
                    defaultValue: '',
                    multiline: false,
                    placeholder: 'Enter LGU name...',
                    onConfirm: (lgu) => {
                        if (lgu === null || lgu === undefined) return;
                        openInputModal({
                            title: `Enter ordinance reference for ${lgu}`,
                            defaultValue: '',
                            multiline: false,
                            placeholder: 'Enter ordinance ref...',
                            onConfirm: (ordinance) => {
                                if (ordinance === null || ordinance === undefined) return;
                                doc.research.similarLegislation = doc.research.similarLegislation || [];
                                doc.research.similarLegislation.push({ lgu: lgu.trim(), ordinance: ordinance.trim(), date: new Date().toLocaleString() });
                                showToast('Similar legislation reference added', 'success');
                                renderResearchAnalysis();
                            }
                        });
                    }
                });
            } else if (a.toLowerCase() === 'view') {
                const list = doc.research.similarLegislation && doc.research.similarLegislation.length
                    ? doc.research.similarLegislation.map((l, i) => `${i + 1}. ${l.ordinance} from ${l.lgu} (${l.date})`).join('<br>')
                    : 'No similar legislation references yet';
                openViewModal(`Similar Legislation for ${doc.reference}`, `<div class="text-sm whitespace-pre-wrap">${list}</div>`);
                return;
            } else {
                const parts = a.split('/');
                if (parts.length === 2) {
                    doc.research.similarLegislation = doc.research.similarLegislation || [];
                    doc.research.similarLegislation.push({ lgu: parts[0].trim(), ordinance: parts[1].trim(), date: new Date().toLocaleString() });
                    showToast('Similar legislation reference added', 'success');
                    renderResearchAnalysis();
                } else {
                    showToast('Please use format: "LGU Name / Ordinance Ref"', 'warning');
                    return;
                }
            }
        }
    });
}

function generateResearchSummary(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.research) doc.research = { reports: [], policyAnalysis: '', legalOpinion: '', impactAssessment: '', similarLegislation: [] };

    const research = doc.research;
    const reportList = research.reports && research.reports.length
        ? research.reports.map(r => `• ${r.name}`).join('\n')
        : '(No reports linked)';
    const legisRefList = research.similarLegislation && research.similarLegislation.length
        ? research.similarLegislation.map(l => `• ${l.ordinance} from ${l.lgu}`).join('\n')
        : '(No similar legislation referenced)';

    const summary = `
Research & Analysis Summary for ${doc.reference}
================================================

RESEARCH REPORTS:
${reportList}

POLICY ANALYSIS:
${research.policyAnalysis || '(No analysis provided)'}

LEGAL OPINION:
${research.legalOpinion || '(No legal opinion provided)'}

IMPACT ASSESSMENT:
${research.impactAssessment || '(No impact assessment provided)'}

SIMILAR LEGISLATION (Other LGUs):
${legisRefList}

Generated: ${new Date().toLocaleString()}
    `;

    openViewModal(`Research & Analysis Summary for ${doc.reference}`, `<pre class="whitespace-pre-wrap text-sm">${summary.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`);
    showToast('Research summary generated', 'info');
}

// ==============================
// AMENDMENT HISTORY & COMPARISON
// ==============================

function renderAmendmentHistory() {
    const docs = AppData.documents;
    const html = `
        <div class="mb-6 animate-fade-in">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold text-gray-800">Amendment History & Comparison</h1>
                <p class="text-sm text-gray-600">Track amendments, compare versions, and review acceptance/rejection history</p>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amendments</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Accepted</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rejected</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amendment Log</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comparison</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Final Report</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${docs.map(doc => {
        if (!doc.amendments) doc.amendments = { log: [], originalText: doc.title, currentText: doc.title };
        const amendments = doc.amendments;
        const total = amendments.log.length;
        const accepted = amendments.log.filter(a => a.status === 'accepted').length;
        const rejected = amendments.log.filter(a => a.status === 'rejected').length;
        return `
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4 text-sm font-medium text-gray-900">${doc.reference}</td>
                                <td class="px-6 py-4 text-sm font-semibold">${total}</td>
                                <td class="px-6 py-4 text-sm text-green-700 font-semibold">${accepted}</td>
                                <td class="px-6 py-4 text-sm text-red-700 font-semibold">${rejected}</td>
                                <td class="px-6 py-4 text-sm">
                                    <button onclick="viewAmendmentLog(${doc.id})" class="text-blue-600 hover:text-blue-800">View Log</button>
                                    <button onclick="addAmendment(${doc.id})" class="ml-2 text-blue-600 hover:text-blue-800">Add</button>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <button onclick="compareVersions(${doc.id})" class="text-purple-600 hover:text-purple-800">Compare</button>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <button onclick="generateComparisonReport(${doc.id})" class="text-orange-600 hover:text-orange-800">Report</button>
                                </td>
                            </tr>`;
    }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

function addAmendment(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.amendments) doc.amendments = { log: [], originalText: doc.title, currentText: doc.title };
    openInputModal({
        title: `Who proposed this amendment?`,
        defaultValue: '',
        multiline: false,
        placeholder: 'Proposer name or title',
        onConfirm: (proposedBy) => {
            if (proposedBy === null || proposedBy === undefined) return;
            openInputModal({
                title: `Enter the amended text`,
                defaultValue: '',
                multiline: true,
                placeholder: 'Amendment text...',
                onConfirm: (amendedText) => {
                    if (amendedText === null || amendedText === undefined) return;
                    openInputModal({
                        title: `Amendment status (accepted/rejected/pending)`,
                        defaultValue: 'pending',
                        multiline: false,
                        placeholder: 'accepted / rejected / pending',
                        onConfirm: (statusChoices) => {
                            const status = (statusChoices && ['accepted', 'rejected', 'pending'].includes(statusChoices.toLowerCase())) ? statusChoices.toLowerCase() : 'pending';
                            const amendment = {
                                id: doc.amendments.log.length + 1,
                                proposedBy: proposedBy.trim(),
                                text: amendedText.trim(),
                                status: status,
                                date: new Date().toLocaleString()
                            };
                            doc.amendments.log.push(amendment);
                            if (status === 'accepted') doc.amendments.currentText = amendedText.trim();
                            AppData.auditLogs = AppData.auditLogs || [];
                            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'amendment', description: `Amendment ${status.toUpperCase()} for ${doc.reference} by ${proposedBy}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
                            showToast(`Amendment recorded as ${status}`, 'success');
                            renderAmendmentHistory();
                        }
                    });
                }
            });
        }
    });
}

function viewAmendmentLog(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc || !doc.amendments || !doc.amendments.log.length) {
        showToast('No amendments logged yet', 'warning');
        return;
    }

    const log = doc.amendments.log.map((a, i) => `<div class=\"mb-2\"><strong>${i + 1}. [${a.status.toUpperCase()}]</strong> ${a.text}<br/><span class=\"text-xs text-gray-500\">Proposed by: ${a.proposedBy} • ${a.date}</span></div>`).join('');
    openViewModal(`Amendment Log for ${doc.reference}`, `<div class=\"text-sm\">${log}</div>`);
}

function compareVersions(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc || !doc.amendments) {
        showToast('No amendment history available', 'warning');
        return;
    }

    const amendments = doc.amendments;
    const original = amendments.originalText || doc.title;
    const current = amendments.currentText || doc.title;

    const comparison = `
ORIGINAL TEXT:
"${original}"

CURRENT TEXT (After Amendments):
"${current}"

AMENDMENTS APPLIED: ${amendments.log.filter(a => a.status === 'accepted').length}
AMENDMENTS REJECTED: ${amendments.log.filter(a => a.status === 'rejected').length}
AMENDMENTS PENDING: ${amendments.log.filter(a => a.status === 'pending').length}

Total Changes: ${amendments.log.length}
    `;
    openViewModal(`Amendment comparison for ${doc.reference}`, `<pre class=\"whitespace-pre-wrap text-sm\">${comparison.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`);
}

function generateComparisonReport(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.amendments) doc.amendments = { log: [], originalText: doc.title, currentText: doc.title };

    const amendments = doc.amendments;
    const original = amendments.originalText || doc.title;
    const current = amendments.currentText || doc.title;
    const acceptedList = amendments.log.filter(a => a.status === 'accepted').length > 0
        ? amendments.log
            .filter(a => a.status === 'accepted')
            .map((a, i) => `${i + 1}. ${a.text}\n   Proposed by: ${a.proposedBy} (${a.date})`)
            .join('\n\n')
        : '(No accepted amendments)';
    const rejectedList = amendments.log.filter(a => a.status === 'rejected').length > 0
        ? amendments.log
            .filter(a => a.status === 'rejected')
            .map((a, i) => `${i + 1}. ${a.text}\n   Proposed by: ${a.proposedBy} (${a.date})`)
            .join('\n\n')
        : '(No rejected amendments)';

    const report = `
================================================================================
AMENDMENT HISTORY & COMPARISON REPORT
Document: ${doc.reference} - ${doc.title}
Generated: ${new Date().toLocaleString()}
================================================================================

ORIGINAL TEXT:
${original}

FINAL TEXT (After All Accepted Amendments):
${current}

================================================================================
DETAILED AMENDMENT HISTORY
================================================================================

ACCEPTED AMENDMENTS (${amendments.log.filter(a => a.status === 'accepted').length}):
${acceptedList}

REJECTED AMENDMENTS (${amendments.log.filter(a => a.status === 'rejected').length}):
${rejectedList}

PENDING AMENDMENTS (${amendments.log.filter(a => a.status === 'pending').length}):
${amendments.log.filter(a => a.status === 'pending').length > 0
            ? amendments.log
                .filter(a => a.status === 'pending')
                .map((a, i) => `${i + 1}. ${a.text}\n   Proposed by: ${a.proposedBy} (${a.date})`)
                .join('\n\n')
            : '(No pending amendments)'}

================================================================================
SUMMARY
================================================================================
Total Amendments: ${amendments.log.length}
Total Accepted: ${amendments.log.filter(a => a.status === 'accepted').length}
Total Rejected: ${amendments.log.filter(a => a.status === 'rejected').length}
Total Pending: ${amendments.log.filter(a => a.status === 'pending').length}
Acceptance Rate: ${amendments.log.length > 0 ? Math.round((amendments.log.filter(a => a.status === 'accepted').length / amendments.log.length) * 100) : 0}%

================================================================================
    `;

    openViewModal(`Amendment Comparison Report for ${doc.reference}`, `<pre class=\"whitespace-pre-wrap text-sm\">${report.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`);
    showToast('Amendment comparison report generated', 'info');
}

// ==============================
// SECOND READING MANAGEMENT
// ==============================

// ==============================
// POST-APPROVAL PROCESSING
// ==============================

function renderPostApproval(docId) {
    // If no docId provided, show a selector/list of documents to open Post-Approval for
    if (!docId) {
        const docs = AppData.documents || [];
        const rows = docs.map(d => {
            const stage = (d.status || '').replace(/\-/g, ' ');
            return `
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 text-sm font-medium">${d.reference}</td>
                        <td class="px-6 py-4 text-sm">${d.title}</td>
                        <td class="px-6 py-4 text-sm">${stage || 'N/A'}</td>
                        <td class="px-6 py-4 text-sm">
                            <button onclick="renderPostApproval(${d.id})" class="text-teal-600 hover:text-teal-800">Open</button>
                        </td>
                    </tr>`;
        }).join('');

        const html = `
                <div class="mb-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-2xl font-bold text-gray-800">Post-Approval Processing</h1>
                        <div>
                            <button onclick="showSection('third-reading')" class="btn-outline">Back</button>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">Select a document to manage Post-Approval workflows (engrossment, signatures, veto, override, finalization).</p>
                </div>

                <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                ${rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

        document.getElementById('content-area').innerHTML = html;
        return;
    }

    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) { showToast('Document not found', 'error'); return; }
    if (!doc.postApproval) doc.postApproval = { transmitted: false, signatures: { presiding: null, members: [], mayor: null }, committeeOfWhole: false, veto: { issued: false, reason: '', date: null }, override: { votes: null, succeeded: false }, finalApprovedText: null };

    const pa = doc.postApproval;

    const membersList = pa.signatures.members.length ? pa.signatures.members.map((m, i) => `<div class="text-sm">${i + 1}. ${m.name} <span class=\"text-xs text-gray-500\">(${m.date})</span></div>`).join('') : '<div class="text-sm text-gray-400">No member signatures yet</div>';

    const html = `
            <div class="mb-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-800">Post-Approval Processing — ${doc.reference}</h1>
                    <div>
                        <button onclick="renderThirdReading()" class="btn-outline">Back to Third Reading</button>
                    </div>
                </div>
                <p class="text-sm text-gray-600 mt-1">Manage engrossment, signatures, committee-of-the-whole, veto and override, and finalize approved version.</p>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Engrossment & Transmission</h2>
                <div class="flex items-center gap-4">
                    <div class="text-sm">Transmitted for Engrossment: <strong>${pa.transmitted ? 'Yes' : 'No'}</strong></div>
                    <button onclick="transmitForEngrossment(${doc.id})" class="btn-primary text-sm">Transmit to LP for Engrossment</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Signature Tracking</h2>
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <p class="text-sm font-medium">Presiding Officer</p>
                        <div class="mt-2 text-sm">${pa.signatures.presiding ? `${pa.signatures.presiding.name} <span class=\"text-xs text-gray-500\">(${pa.signatures.presiding.date})</span>` : '<span class="text-gray-400">Not signed</span>'}</div>
                        <div class="mt-2">
                            <button onclick="addPresidingSignature(${doc.id})" class="btn-outline text-sm">Add/Update Presiding Signature</button>
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-medium">Mayor</p>
                        <div class="mt-2 text-sm">${pa.signatures.mayor ? `${pa.signatures.mayor.name} <span class=\"text-xs text-gray-500\">(${pa.signatures.mayor.date})</span>` : '<span class="text-gray-400">Not signed</span>'}</div>
                        <div class="mt-2">
                            <button onclick="addMayorSignature(${doc.id})" class="btn-outline text-sm">Add/Update Mayor Signature</button>
                        </div>
                    </div>
                </div>

                <div class="mt-4">
                    <p class="text-sm font-medium">Member Signatures</p>
                    <div class="mt-2">${membersList}</div>
                    <div class="mt-3">
                        <button onclick="addMemberSignature(${doc.id})" class="btn-primary text-sm">Add Member Signature</button>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Committee of the Whole</h2>
                <div class="flex items-center gap-4">
                    <div class="text-sm">Convene as Committee of the Whole: <strong>${pa.committeeOfWhole ? 'Yes' : 'No'}</strong></div>
                    <button onclick="toggleCommitteeOfWhole(${doc.id})" class="btn-outline text-sm">Toggle Committee of the Whole</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Veto & Override</h2>
                <div class="mb-3">
                    <div class="text-sm">Veto Issued: <strong>${pa.veto.issued ? 'Yes' : 'No'}</strong></div>
                    ${pa.veto.issued ? `<div class="text-sm text-gray-600">Reason: ${pa.veto.reason} <br/><span class="text-xs text-gray-500">(${pa.veto.date})</span></div>` : ''}
                    <div class="mt-2">
                        <button onclick="issueVeto(${doc.id})" class="btn-warning text-sm">Issue Veto</button>
                        <button onclick="clearVeto(${doc.id})" class="btn-outline text-sm ml-2">Clear Veto</button>
                    </div>
                </div>
                <div>
                    <div class="text-sm">Override Vote: ${pa.override.votes ? `Y:${pa.override.votes.yes} N:${pa.override.votes.no} A:${pa.override.votes.abstain}` : '<span class="text-gray-400">No override recorded</span>'} ${pa.override.succeeded ? '<span class="text-green-600 font-semibold"> (Succeeded)</span>' : ''}</div>
                    <div class="mt-2"><button onclick="recordOverrideVote(${doc.id})" class="btn-primary text-sm">Record Override Vote</button></div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Final Approved Version</h2>
                <div class="text-sm">Current Final Text: <span class=\"text-gray-700\">${pa.finalApprovedText ? pa.finalApprovedText.substring(0, 200) + (pa.finalApprovedText.length > 200 ? '...' : '') : '<span class="text-gray-400">Not consolidated</span>'}</span></div>
                <div class="mt-3">
                    <button onclick="consolidateFinalVersion(${doc.id})" class="btn-primary text-sm">Consolidate / Edit Final Approved Version</button>
                    <button onclick="viewFinalApprovedVersion(${doc.id})" class="btn-outline text-sm ml-2">View Final Approved Version</button>
                </div>
            </div>
        `;

    document.getElementById('content-area').innerHTML = html;
}

function transmitForEngrossment(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.postApproval) doc.postApproval = { transmitted: false, signatures: { presiding: null, members: [], mayor: null }, committeeOfWhole: false, veto: { issued: false, reason: '', date: null }, override: { votes: null, succeeded: false }, finalApprovedText: null };
    doc.postApproval.transmitted = true;
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'transmit-engrossment', description: `Transmitted ${doc.reference} to LP for engrossment`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
    showToast('Transmitted to LP for Engrossment', 'success');
    renderPostApproval(docId);
}

function addPresidingSignature(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Presiding Officer signature (name)', defaultValue: doc.postApproval && doc.postApproval.signatures && doc.postApproval.signatures.presiding ? doc.postApproval.signatures.presiding.name : '', multiline: false, placeholder: 'Name of Presiding Officer', onConfirm: (name) => {
            if (name === null || name === undefined) return;
            if (!doc.postApproval) doc.postApproval = { transmitted: false, signatures: { presiding: null, members: [], mayor: null }, committeeOfWhole: false, veto: { issued: false, reason: '', date: null }, override: { votes: null, succeeded: false }, finalApprovedText: null };
            doc.postApproval.signatures.presiding = { name: name.trim(), date: new Date().toLocaleString() };
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'signature', description: `Presiding Officer signed ${doc.reference}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast('Presiding Officer signature recorded', 'success');
            renderPostApproval(docId);
        }
    });
}

function addMemberSignature(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Member signature (name)', defaultValue: '', multiline: false, placeholder: 'Member name', onConfirm: (name) => {
            if (name === null || name === undefined) return;
            if (!doc.postApproval) doc.postApproval = { transmitted: false, signatures: { presiding: null, members: [], mayor: null }, committeeOfWhole: false, veto: { issued: false, reason: '', date: null }, override: { votes: null, succeeded: false }, finalApprovedText: null };
            doc.postApproval.signatures.members = doc.postApproval.signatures.members || [];
            doc.postApproval.signatures.members.push({ name: name.trim(), date: new Date().toLocaleString() });
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'signature', description: `Member ${name.trim()} signed ${doc.reference}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast('Member signature recorded', 'success');
            renderPostApproval(docId);
        }
    });
}

function addMayorSignature(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Mayor signature (name)', defaultValue: doc.postApproval && doc.postApproval.signatures && doc.postApproval.signatures.mayor ? doc.postApproval.signatures.mayor.name : '', multiline: false, placeholder: 'Mayor name', onConfirm: (name) => {
            if (name === null || name === undefined) return;
            if (!doc.postApproval) doc.postApproval = { transmitted: false, signatures: { presiding: null, members: [], mayor: null }, committeeOfWhole: false, veto: { issued: false, reason: '', date: null }, override: { votes: null, succeeded: false }, finalApprovedText: null };
            doc.postApproval.signatures.mayor = { name: name.trim(), date: new Date().toLocaleString() };
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'signature', description: `Mayor signed ${doc.reference}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast('Mayor signature recorded', 'success');
            renderPostApproval(docId);
        }
    });
}

function toggleCommitteeOfWhole(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.postApproval) doc.postApproval = { transmitted: false, signatures: { presiding: null, members: [], mayor: null }, committeeOfWhole: false, veto: { issued: false, reason: '', date: null }, override: { votes: null, succeeded: false }, finalApprovedText: null };
    doc.postApproval.committeeOfWhole = !doc.postApproval.committeeOfWhole;
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'committee-whole', description: `${doc.reference} committee-of-the-whole toggled to ${doc.postApproval.committeeOfWhole}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
    showToast(doc.postApproval.committeeOfWhole ? 'Convene as Committee of the Whole' : 'Committee of the Whole cleared', 'info');
    renderPostApproval(docId);
}

function issueVeto(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Veto reason (brief)', defaultValue: doc.postApproval && doc.postApproval.veto ? doc.postApproval.veto.reason : '', multiline: true, placeholder: 'Enter veto reason', onConfirm: (reason) => {
            if (reason === null || reason === undefined) return;
            if (!doc.postApproval) doc.postApproval = { transmitted: false, signatures: { presiding: null, members: [], mayor: null }, committeeOfWhole: false, veto: { issued: false, reason: '', date: null }, override: { votes: null, succeeded: false }, finalApprovedText: null };
            doc.postApproval.veto = { issued: true, reason: reason.trim(), date: new Date().toLocaleString() };
            doc.status = 'vetoed';
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'veto', description: `Veto issued for ${doc.reference}: ${reason.trim()}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast('Veto recorded', 'warning');
            renderPostApproval(docId);
        }
    });
}

function clearVeto(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc || !doc.postApproval) return;
    doc.postApproval.veto = { issued: false, reason: '', date: null };
    if (doc.thirdReading && doc.thirdReading.enacted) doc.status = 'enacted';
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'veto-cleared', description: `Veto cleared for ${doc.reference}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
    showToast('Veto cleared', 'success');
    renderPostApproval(docId);
}

function recordOverrideVote(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.postApproval) doc.postApproval = { transmitted: false, signatures: { presiding: null, members: [], mayor: null }, committeeOfWhole: false, veto: { issued: false, reason: '', date: null }, override: { votes: null, succeeded: false }, finalApprovedText: null };
    // Collect votes with nested modals (could be replaced by a form modal)
    openInputModal({
        title: 'Override YES votes', defaultValue: doc.postApproval.override.votes ? String(doc.postApproval.override.votes.yes) : '0', multiline: false, placeholder: 'YES votes', onConfirm: (yes) => {
            if (yes === null || yes === undefined) return;
            openInputModal({
                title: 'Override NO votes', defaultValue: doc.postApproval.override.votes ? String(doc.postApproval.override.votes.no) : '0', multiline: false, placeholder: 'NO votes', onConfirm: (no) => {
                    if (no === null || no === undefined) return;
                    openInputModal({
                        title: 'Override ABSTAIN votes', defaultValue: doc.postApproval.override.votes ? String(doc.postApproval.override.votes.abstain) : '0', multiline: false, placeholder: 'ABSTAIN votes', onConfirm: (abstain) => {
                            if (abstain === null || abstain === undefined) return;
                            const votes = { yes: parseInt(yes) || 0, no: parseInt(no) || 0, abstain: parseInt(abstain) || 0 };
                            doc.postApproval.override.votes = votes;
                            // simple override logic: override succeeds if yes > no (adjust according to local rules)
                            doc.postApproval.override.succeeded = votes.yes > votes.no;
                            if (doc.postApproval.override.succeeded) {
                                doc.status = 'enacted';
                                if (!doc.postApproval.finalApprovedText) doc.postApproval.finalApprovedText = (doc.amendments && doc.amendments.currentText) || doc.title;
                            }
                            AppData.auditLogs = AppData.auditLogs || [];
                            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'override-vote', description: `Override vote for ${doc.reference}: Y ${votes.yes} N ${votes.no} A ${votes.abstain} — ${doc.postApproval.override.succeeded ? 'SUCCEEDED' : 'FAILED'}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
                            showToast(`Override vote recorded — ${doc.postApproval.override.succeeded ? 'Succeeded' : 'Not succeeded'}`, doc.postApproval.override.succeeded ? 'success' : 'warning');
                            renderPostApproval(docId);
                        }
                    });
                }
            });
        }
    });
}

function consolidateFinalVersion(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const current = (doc.postApproval && doc.postApproval.finalApprovedText) || (doc.amendments && doc.amendments.currentText) || doc.title;
    openInputModal({
        title: 'Consolidate Final Approved Version (editable)', defaultValue: current, multiline: true, placeholder: 'Edit final approved text...', onConfirm: (text) => {
            if (text === null || text === undefined) return;
            if (!doc.postApproval) doc.postApproval = { transmitted: false, signatures: { presiding: null, members: [], mayor: null }, committeeOfWhole: false, veto: { issued: false, reason: '', date: null }, override: { votes: null, succeeded: false }, finalApprovedText: null };
            doc.postApproval.finalApprovedText = text.trim();
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'consolidate-final', description: `Final approved version consolidated for ${doc.reference}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast('Final approved version saved', 'success');
            renderPostApproval(docId);
        }
    });
}

function viewFinalApprovedVersion(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc || !doc.postApproval || !doc.postApproval.finalApprovedText) {
        showToast('No final approved version available', 'warning');
        return;
    }
    openViewModal(`Final Approved Version — ${doc.reference}`, `<pre class="whitespace-pre-wrap text-sm">${doc.postApproval.finalApprovedText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`);
}

// ==============================
// MULTI-STAGE STATUS DASHBOARD
// ==============================

function getStageForDoc(doc) {
    // Map document status to user-friendly stage
    const s = (doc.status || '').toLowerCase();
    if (s.includes('first')) return 'First Reading';
    if (s.includes('committee') || s.includes('referred')) return 'Committee Stage';
    if (s.includes('second')) return 'Second Reading';
    if (s.includes('third') || s.includes('final')) return 'Third Reading';
    if (s.includes('enacted') || s.includes('approved')) return 'Enacted';
    if (s.includes('failed')) return 'Failed';
    return 'Intake / Draft';
}

function stageColor(stage) {
    switch (stage) {
        case 'First Reading': return 'bg-blue-100 text-blue-800';
        case 'Committee Stage': return 'bg-yellow-100 text-yellow-800';
        case 'Second Reading': return 'bg-purple-100 text-purple-800';
        case 'Third Reading': return 'bg-indigo-100 text-indigo-800';
        case 'Enacted': return 'bg-green-100 text-green-800';
        case 'Failed': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-700';
    }
}

function computeStageStats() {
    const stats = {};
    AppData.documents.forEach(doc => {
        const stage = getStageForDoc(doc);
        stats[stage] = stats[stage] || { count: 0, docs: [] };
        stats[stage].count++;
        stats[stage].docs.push(doc);
    });
    return stats;
}

function identifyBottlenecks(stats) {
    // Bottleneck = stage with highest count and/or oldest average upload date
    let topStage = null;
    let maxCount = 0;
    Object.keys(stats).forEach(stage => {
        if (stats[stage].count > maxCount) {
            maxCount = stats[stage].count;
            topStage = stage;
        }
    });
    return { stage: topStage, count: maxCount };
}

function isStalled(doc, days = 14) {
    const dateStr = doc.uploadedAt || doc.date || doc.uploaded_at;
    if (!dateStr) return false;
    const parsed = new Date(dateStr);
    if (isNaN(parsed)) return false;
    const diff = (Date.now() - parsed.getTime()) / (1000 * 60 * 60 * 24);
    const finalStatuses = ['enacted', 'approved', 'failed'];
    if (finalStatuses.includes((doc.status || '').toLowerCase())) return false;
    return diff > days;
}

function buildTimelineForDoc(doc) {
    // Use audit logs to build a simple timeline for the document
    const entries = AppData.auditLogs.filter(a => a.description && a.description.includes(doc.reference));
    // Always include creation/upload event
    const timeline = [];
    if (doc.uploadedAt) timeline.push({ title: 'Uploaded', time: doc.uploadedAt });
    entries.forEach(e => {
        timeline.push({ title: e.action, description: e.description, time: e.timestamp });
    });
    // Sort by time if possible
    timeline.sort((a, b) => new Date(a.time) - new Date(b.time));
    return timeline;
}

function renderMultiStageDashboard() {
    const stats = computeStageStats();
    const bottleneck = identifyBottlenecks(stats);

    const stageCards = Object.keys(stats).map(stage => `
            <div class="bg-white rounded-lg p-4 shadow-sm">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">${stage}</p>
                        <p class="text-2xl font-bold">${stats[stage].count}</p>
                    </div>
                    <div class="${stageColor(stage)} px-3 py-1 rounded-full text-sm">${stage}</div>
                </div>
            </div>
        `).join('');

    // List stalled items
    const stalled = AppData.documents.filter(d => isStalled(d));

    const html = `
            <div class="mb-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-800">Multi-Stage Status Dashboard</h1>
                    <div>
                        <button onclick="renderPublicPortal()" class="btn-outline">Open Public Portal</button>
                    </div>
                </div>
                <p class="text-sm text-gray-600 mt-1">Visual workflow tracker, realtime status, timelines, and bottleneck identification.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                ${stageCards}
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-bold mb-3">Bottleneck</h2>
                <p class="text-sm text-gray-700">Stage with highest workload: <strong>${bottleneck.stage || '—'}</strong> (${bottleneck.count || 0} items)</p>
                <div class="mt-4">
                    <h3 class="text-sm font-semibold">Top items at bottleneck</h3>
                    <ul class="list-disc list-inside text-sm text-gray-700">
                        ${bottleneck.stage ? stats[bottleneck.stage].docs.slice(0, 5).map(d => `<li>${d.reference} — ${d.title}</li>`).join('') : '<li>No items</li>'}
                    </ul>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-bold mb-3">Stalled Items (>${14} days)</h2>
                ${stalled.length ? `<ul class="list-disc list-inside text-sm text-red-700">${stalled.map(s => `<li>${s.reference} — ${s.title} (status: ${s.status || 'unknown'})</li>`).join('')}</ul>` : '<p class="text-sm text-gray-600">No stalled items.</p>'}
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-bold mb-3">Timeline Samples</h2>
                <div class="space-y-3">
                    ${AppData.documents.slice(0, 5).map(doc => {
        const timeline = buildTimelineForDoc(doc);
        return `
                            <div class="border rounded p-3">
                                <div class="flex items-center justify-between">
                                    <div><strong>${doc.reference}</strong> — ${doc.title}</div>
                                    <div class="text-sm text-gray-500">${getStageForDoc(doc)}</div>
                                </div>
                                <div class="mt-2 text-sm text-gray-700">${timeline.length ? timeline.map(t => `<div>• <strong>${t.title}</strong> — ${t.time || ''} ${t.description ? '- ' + t.description : ''}</div>`).join('') : '<em>No timeline events</em>'}</div>
                            </div>
                        `;
    }).join('')}
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-bold mb-3">Statistics per Stage</h2>
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${Object.keys(stats).map(stage => {
        const count = stats[stage].count;
        const total = AppData.documents.length || 1;
        const percentage = ((count / total) * 100).toFixed(1);
        return `
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-6 py-4 text-sm font-medium">${stage}</td>
                                        <td class="px-6 py-4 text-sm">${count}</td>
                                        <td class="px-6 py-4 text-sm">${percentage}%</td>
                                    </tr>
                                `;
    }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

    document.getElementById('content-area').innerHTML = html;
}

function renderPublicPortal() {
    // Simple public-facing view: minimal fields, enacted docs visible
    const publicDocs = AppData.documents.filter(d => ['enacted', 'approved'].includes((d.status || '').toLowerCase()));
    const html = `
            <div class="mb-4">
                <button onclick="renderMultiStageDashboard()" class="btn-outline">Back to Dashboard</button>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-lg font-bold mb-3">Public Transparency Portal</h2>
                <p class="text-sm text-gray-600 mb-4">Public list of enacted/approved items and basic metadata.</p>
                <ul class="list-disc list-inside text-sm text-gray-800">
                    ${publicDocs.length ? publicDocs.map(d => `<li><strong>${d.reference}</strong>: ${d.title} — Status: ${d.status}</li>`).join('') : '<li>No public items available</li>'}
                </ul>
            </div>
        `;
    document.getElementById('content-area').innerHTML = html;
}

// ==============================
// PUBLICATION MANAGEMENT
// ==============================

function renderPublicationManagement(docId) {
    // If no docId provided, show a selector/list of documents to open Publication Management for
    if (!docId) {
        const docs = AppData.documents || [];
        const rows = docs.map(d => {
            const stage = (d.status || '').replace(/\-/g, ' ');
            return `
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 text-sm font-medium">${d.reference}</td>
                        <td class="px-6 py-4 text-sm">${d.title}</td>
                        <td class="px-6 py-4 text-sm">${stage || 'N/A'}</td>
                        <td class="px-6 py-4 text-sm">
                            <button onclick="renderPublicationManagement(${d.id})" class="text-indigo-600 hover:text-indigo-800">Open</button>
                        </td>
                    </tr>`;
        }).join('');

        const html = `
                <div class="mb-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-2xl font-bold text-gray-800">Publication Management</h1>
                        <div>
                            <button onclick="showSection('post-approval')" class="btn-outline">Back</button>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">Select a document to manage publication workflows (post to AAB, scheduling, proofs, effectivity, compliance, public posting).</p>
                </div>

                <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                ${rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

        document.getElementById('content-area').innerHTML = html;
        return;
    }

    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) { showToast('Document not found', 'error'); return; }
    if (!doc.publication) doc.publication = { postedToAAB: false, aaDate: null, scheduledDate: null, proofSubmitted: false, proofFile: null, effectivityDate: null, complianceStatus: 'pending', publicPostingVerified: false, publicPostingDate: null };

    const pub = doc.publication;

    const html = `
            <div class="mb-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-800">Publication Management — ${doc.reference}</h1>
                    <div>
                        <button onclick="renderPublicationManagement()" class="btn-outline">Back to List</button>
                    </div>
                </div>
                <p class="text-sm text-gray-600 mt-1">Manage AAB publication, scheduling, proofs, effectivity dates, compliance, and public posting verification.</p>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Post to AAB Publication</h2>
                <div class="flex items-center gap-4">
                    <div class="text-sm">Posted to AAB: <strong>${pub.postedToAAB ? 'Yes' : 'No'}</strong></div>
                    ${pub.aaDate ? `<div class="text-sm text-gray-600">Posted on: ${pub.aaDate}</div>` : ''}
                    <button onclick="postToAAB(${doc.id})" class="btn-primary text-sm">Post to AAB</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Publication Scheduling</h2>
                <div class="text-sm">Scheduled Publication Date: <strong>${pub.scheduledDate ? pub.scheduledDate : '<span class="text-gray-400">Not scheduled</span>'}</strong></div>
                <div class="mt-3">
                    <button onclick="setPublicationSchedule(${doc.id})" class="btn-primary text-sm">Set / Update Schedule</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Publication Proof Tracking</h2>
                <div class="text-sm">Proof Submitted: <strong>${pub.proofSubmitted ? 'Yes' : 'No'}</strong></div>
                ${pub.proofFile ? `<div class="text-sm text-gray-600 mt-2">Proof File: <span class="font-mono text-xs">${pub.proofFile}</span></div>` : ''}
                <div class="mt-3">
                    <button onclick="uploadPublicationProof(${doc.id})" class="btn-primary text-sm">Upload / Update Proof</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Effectivity Date Calculation</h2>
                <div class="text-sm">Calculated Effectivity Date: <strong>${pub.effectivityDate ? pub.effectivityDate : '<span class="text-gray-400">Not calculated</span>'}</strong></div>
                <div class="mt-3">
                    <button onclick="calculateEffectivityDate(${doc.id})" class="btn-primary text-sm">Calculate Effectivity Date</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Legal Publication Compliance</h2>
                <div class="text-sm">Compliance Status: <strong>${pub.complianceStatus}</strong></div>
                <div class="mt-3">
                    <button onclick="updateComplianceStatus(${doc.id})" class="btn-primary text-sm">Update Compliance Status</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Public Posting Verification</h2>
                <div class="text-sm">Public Posting Verified: <strong>${pub.publicPostingVerified ? 'Yes' : 'No'}</strong></div>
                ${pub.publicPostingDate ? `<div class="text-sm text-gray-600 mt-2">Verified on: ${pub.publicPostingDate}</div>` : ''}
                <div class="mt-3">
                    <button onclick="verifyPublicPosting(${doc.id})" class="btn-primary text-sm">Verify Public Posting</button>
                </div>
            </div>
        `;

    document.getElementById('content-area').innerHTML = html;
}

function postToAAB(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.publication) doc.publication = { postedToAAB: false, aaDate: null, scheduledDate: null, proofSubmitted: false, proofFile: null, effectivityDate: null, complianceStatus: 'pending', publicPostingVerified: false, publicPostingDate: null };
    doc.publication.postedToAAB = true;
    doc.publication.aaDate = new Date().toLocaleString();
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'post-aab', description: `Posted ${doc.reference} to AAB Publication`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
    showToast('Posted to AAB Publication', 'success');
    renderPublicationManagement(docId);
}

function setPublicationSchedule(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Publication scheduled date (YYYY-MM-DD)', defaultValue: doc.publication && doc.publication.scheduledDate ? doc.publication.scheduledDate : '', multiline: false, placeholder: 'e.g., 2025-12-15', onConfirm: (date) => {
            if (date === null || date === undefined) return;
            if (!doc.publication) doc.publication = { postedToAAB: false, aaDate: null, scheduledDate: null, proofSubmitted: false, proofFile: null, effectivityDate: null, complianceStatus: 'pending', publicPostingVerified: false, publicPostingDate: null };
            doc.publication.scheduledDate = date.trim();
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'pub-schedule', description: `Set publication schedule for ${doc.reference} to ${date.trim()}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast('Publication schedule set', 'success');
            renderPublicationManagement(docId);
        }
    });
}

function uploadPublicationProof(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Proof file name or reference (for demo)', defaultValue: doc.publication && doc.publication.proofFile ? doc.publication.proofFile : '', multiline: false, placeholder: 'e.g., Proof_ORD-2025-001_v1.pdf', onConfirm: (file) => {
            if (file === null || file === undefined) return;
            if (!doc.publication) doc.publication = { postedToAAB: false, aaDate: null, scheduledDate: null, proofSubmitted: false, proofFile: null, effectivityDate: null, complianceStatus: 'pending', publicPostingVerified: false, publicPostingDate: null };
            doc.publication.proofSubmitted = true;
            doc.publication.proofFile = file.trim();
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'pub-proof', description: `Uploaded publication proof for ${doc.reference}: ${file.trim()}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast('Publication proof recorded', 'success');
            renderPublicationManagement(docId);
        }
    });
}

function calculateEffectivityDate(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Effectivity calculation rule (days from publication)', defaultValue: '15', multiline: false, placeholder: 'e.g., 15 (days)', onConfirm: (days) => {
            if (days === null || days === undefined) return;
            if (!doc.publication) doc.publication = { postedToAAB: false, aaDate: null, scheduledDate: null, proofSubmitted: false, proofFile: null, effectivityDate: null, complianceStatus: 'pending', publicPostingVerified: false, publicPostingDate: null };
            const numDays = parseInt(days) || 15;
            const pubDate = doc.publication.scheduledDate ? new Date(doc.publication.scheduledDate) : new Date();
            const effDate = new Date(pubDate);
            effDate.setDate(effDate.getDate() + numDays);
            doc.publication.effectivityDate = effDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'effectivity-calc', description: `Calculated effectivity date for ${doc.reference}: ${doc.publication.effectivityDate} (${numDays} days from publication)`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast(`Effectivity date calculated: ${doc.publication.effectivityDate}`, 'success');
            renderPublicationManagement(docId);
        }
    });
}

function updateComplianceStatus(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Legal publication compliance status', defaultValue: doc.publication && doc.publication.complianceStatus ? doc.publication.complianceStatus : 'pending', multiline: false, placeholder: 'pending / compliant / non-compliant', onConfirm: (status) => {
            if (status === null || status === undefined) return;
            if (!doc.publication) doc.publication = { postedToAAB: false, aaDate: null, scheduledDate: null, proofSubmitted: false, proofFile: null, effectivityDate: null, complianceStatus: 'pending', publicPostingVerified: false, publicPostingDate: null };
            doc.publication.complianceStatus = status.trim();
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'compliance-update', description: `Updated compliance status for ${doc.reference} to ${status.trim()}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast('Compliance status updated', 'success');
            renderPublicationManagement(docId);
        }
    });
}

function verifyPublicPosting(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Confirm public posting verification (yes/no)', defaultValue: 'yes', multiline: false, placeholder: 'yes or no', onConfirm: (confirm) => {
            if (confirm === null || confirm === undefined) return;
            if (!doc.publication) doc.publication = { postedToAAB: false, aaDate: null, scheduledDate: null, proofSubmitted: false, proofFile: null, effectivityDate: null, complianceStatus: 'pending', publicPostingVerified: false, publicPostingDate: null };
            if (confirm.toLowerCase() === 'yes') {
                doc.publication.publicPostingVerified = true;
                doc.publication.publicPostingDate = new Date().toLocaleString();
                AppData.auditLogs = AppData.auditLogs || [];
                AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'public-posting-verified', description: `Verified public posting for ${doc.reference}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
                showToast('Public posting verified', 'success');
            } else {
                showToast('Public posting verification cancelled', 'warning');
            }
            renderPublicationManagement(docId);
        }
    });
}

// ==============================
// FINAL APPROVAL & IMPLEMENTATION
// ==============================

function renderFinalApprovalImplementation(docId) {
    // If no docId provided, show a selector/list of documents
    if (!docId) {
        const docs = AppData.documents || [];
        const rows = docs.map(d => {
            const stage = (d.status || '').replace(/\-/g, ' ');
            return `
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 text-sm font-medium">${d.reference}</td>
                        <td class="px-6 py-4 text-sm">${d.title}</td>
                        <td class="px-6 py-4 text-sm">${stage || 'N/A'}</td>
                        <td class="px-6 py-4 text-sm">
                            <button onclick="renderFinalApprovalImplementation(${d.id})" class="text-green-600 hover:text-green-800">Open</button>
                        </td>
                    </tr>`;
        }).join('');

        const html = `
                <div class="mb-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-2xl font-bold text-gray-800">Final Approval & Implementation</h1>
                        <div>
                            <button onclick="showSection('publication')" class="btn-outline">Back</button>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">Select a document to manage final approval, effectivity, implementation assignment, compliance tracking, impact assessment, and archiving.</p>
                </div>

                <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                ${rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

        document.getElementById('content-area').innerHTML = html;
        return;
    }

    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) { showToast('Document not found', 'error'); return; }
    if (!doc.finalApproval) doc.finalApproval = { approved: false, approvalDate: null, effectivityDate: null, implementationAssignee: null, implementationDeadline: null, complianceTrackingActive: false, impactAssessmentLinked: false, archived: false, archiveDate: null };

    const fa = doc.finalApproval;

    const html = `
            <div class="mb-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-800">Final Approval & Implementation — ${doc.reference}</h1>
                    <div>
                        <button onclick="renderFinalApprovalImplementation()" class="btn-outline">Back to List</button>
                    </div>
                </div>
                <p class="text-sm text-gray-600 mt-1">Finalize approval status, manage effectivity, assign implementation, track compliance, link impact assessments, and archive when complete.</p>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Approved Legislative Measures Status</h2>
                <div class="flex items-center gap-4">
                    <div class="text-sm">Officially Approved: <strong>${fa.approved ? 'Yes' : 'No'}</strong></div>
                    ${fa.approvalDate ? `<div class="text-sm text-gray-600">Approved on: ${fa.approvalDate}</div>` : ''}
                    <button onclick="markAsApproved(${doc.id})" class="btn-primary text-sm">Mark as Approved</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Effectivity Date Management</h2>
                <div class="text-sm">Effectivity Date: <strong>${fa.effectivityDate ? fa.effectivityDate : '<span class="text-gray-400">Not set</span>'}</strong></div>
                <div class="mt-3">
                    <button onclick="setEffectivityDate(${doc.id})" class="btn-primary text-sm">Set / Update Effectivity Date</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Implementation Assignment</h2>
                <div class="text-sm">Assigned To: <strong>${fa.implementationAssignee ? fa.implementationAssignee : '<span class="text-gray-400">Not assigned</span>'}</strong></div>
                ${fa.implementationDeadline ? `<div class="text-sm text-gray-600 mt-2">Implementation Deadline: ${fa.implementationDeadline}</div>` : ''}
                <div class="mt-3">
                    <button onclick="assignImplementation(${doc.id})" class="btn-primary text-sm">Assign Implementation</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Monitoring & Compliance Tracking</h2>
                <div class="flex items-center gap-4">
                    <div class="text-sm">Tracking Active: <strong>${fa.complianceTrackingActive ? 'Yes' : 'No'}</strong></div>
                    <button onclick="toggleComplianceTracking(${doc.id})" class="btn-outline text-sm">Toggle Tracking</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Impact Assessment Linkage</h2>
                <div class="flex items-center gap-4">
                    <div class="text-sm">Impact Assessment Linked: <strong>${fa.impactAssessmentLinked ? 'Yes' : 'No'}</strong></div>
                    <button onclick="linkImpactAssessment(${doc.id})" class="btn-primary text-sm">Link / Update Impact Assessment</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 class="text-lg font-semibold mb-4">Archiving</h2>
                <div class="flex items-center gap-4">
                    <div class="text-sm">Archived: <strong>${fa.archived ? 'Yes' : 'No'}</strong></div>
                    ${fa.archiveDate ? `<div class="text-sm text-gray-600">Archived on: ${fa.archiveDate}</div>` : ''}
                    <button onclick="triggerArchiving(${doc.id})" class="btn-warning text-sm">Trigger Archiving</button>
                </div>
            </div>
        `;

    document.getElementById('content-area').innerHTML = html;
}

function markAsApproved(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.finalApproval) doc.finalApproval = { approved: false, approvalDate: null, effectivityDate: null, implementationAssignee: null, implementationDeadline: null, complianceTrackingActive: false, impactAssessmentLinked: false, archived: false, archiveDate: null };
    doc.finalApproval.approved = true;
    doc.finalApproval.approvalDate = new Date().toLocaleString();
    doc.status = 'approved';
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'final-approval', description: `Marked ${doc.reference} as officially approved`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
    showToast('Document marked as approved', 'success');
    renderFinalApprovalImplementation(docId);
}

function setEffectivityDate(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Effectivity date (YYYY-MM-DD)', defaultValue: doc.finalApproval && doc.finalApproval.effectivityDate ? doc.finalApproval.effectivityDate : '', multiline: false, placeholder: 'e.g., 2025-12-20', onConfirm: (date) => {
            if (date === null || date === undefined) return;
            if (!doc.finalApproval) doc.finalApproval = { approved: false, approvalDate: null, effectivityDate: null, implementationAssignee: null, implementationDeadline: null, complianceTrackingActive: false, impactAssessmentLinked: false, archived: false, archiveDate: null };
            doc.finalApproval.effectivityDate = date.trim();
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'effectivity-set', description: `Set effectivity date for ${doc.reference} to ${date.trim()}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast('Effectivity date set', 'success');
            renderFinalApprovalImplementation(docId);
        }
    });
}

function assignImplementation(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Implementation assignee (name/title)', defaultValue: doc.finalApproval && doc.finalApproval.implementationAssignee ? doc.finalApproval.implementationAssignee : '', multiline: false, placeholder: 'e.g., Department of Health', onConfirm: (assignee) => {
            if (assignee === null || assignee === undefined) return;
            openInputModal({
                title: 'Implementation deadline (YYYY-MM-DD)', defaultValue: doc.finalApproval && doc.finalApproval.implementationDeadline ? doc.finalApproval.implementationDeadline : '', multiline: false, placeholder: 'e.g., 2025-12-31', onConfirm: (deadline) => {
                    if (deadline === null || deadline === undefined) return;
                    if (!doc.finalApproval) doc.finalApproval = { approved: false, approvalDate: null, effectivityDate: null, implementationAssignee: null, implementationDeadline: null, complianceTrackingActive: false, impactAssessmentLinked: false, archived: false, archiveDate: null };
                    doc.finalApproval.implementationAssignee = assignee.trim();
                    doc.finalApproval.implementationDeadline = deadline.trim();
                    AppData.auditLogs = AppData.auditLogs || [];
                    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'implementation-assign', description: `Assigned ${doc.reference} implementation to ${assignee.trim()} with deadline ${deadline.trim()}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
                    showToast('Implementation assigned', 'success');
                    renderFinalApprovalImplementation(docId);
                }
            });
        }
    });
}

function toggleComplianceTracking(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.finalApproval) doc.finalApproval = { approved: false, approvalDate: null, effectivityDate: null, implementationAssignee: null, implementationDeadline: null, complianceTrackingActive: false, impactAssessmentLinked: false, archived: false, archiveDate: null };
    doc.finalApproval.complianceTrackingActive = !doc.finalApproval.complianceTrackingActive;
    AppData.auditLogs = AppData.auditLogs || [];
    AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'compliance-tracking', description: `Toggled compliance tracking for ${doc.reference} to ${doc.finalApproval.complianceTrackingActive}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
    showToast(doc.finalApproval.complianceTrackingActive ? 'Compliance tracking activated' : 'Compliance tracking deactivated', 'info');
    renderFinalApprovalImplementation(docId);
}

function linkImpactAssessment(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Impact assessment reference or notes', defaultValue: doc.finalApproval && doc.finalApproval.impactAssessmentLinked ? 'Linked' : '', multiline: true, placeholder: 'e.g., IA-2025-001 conducted; Budget impact: +500K pesos', onConfirm: (assessment) => {
            if (assessment === null || assessment === undefined) return;
            if (!doc.finalApproval) doc.finalApproval = { approved: false, approvalDate: null, effectivityDate: null, implementationAssignee: null, implementationDeadline: null, complianceTrackingActive: false, impactAssessmentLinked: false, archived: false, archiveDate: null };
            doc.finalApproval.impactAssessmentLinked = true;
            AppData.auditLogs = AppData.auditLogs || [];
            AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'impact-linkage', description: `Linked impact assessment for ${doc.reference}: ${assessment.trim()}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
            showToast('Impact assessment linked', 'success');
            renderFinalApprovalImplementation(docId);
        }
    });
}

function triggerArchiving(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    openInputModal({
        title: 'Confirm archiving (yes/no)', defaultValue: 'yes', multiline: false, placeholder: 'yes or no', onConfirm: (confirm) => {
            if (confirm === null || confirm === undefined) return;
            if (!doc.finalApproval) doc.finalApproval = { approved: false, approvalDate: null, effectivityDate: null, implementationAssignee: null, implementationDeadline: null, complianceTrackingActive: false, impactAssessmentLinked: false, archived: false, archiveDate: null };
            if (confirm.toLowerCase() === 'yes') {
                doc.finalApproval.archived = true;
                doc.finalApproval.archiveDate = new Date().toLocaleString();
                doc.status = 'archived';
                AppData.auditLogs = AppData.auditLogs || [];
                AppData.auditLogs.push({ id: (AppData.auditLogs.length ? AppData.auditLogs[AppData.auditLogs.length - 1].id + 1 : 1), user: AppData.currentUser.name, action: 'archived', description: `Archived ${doc.reference}`, timestamp: new Date().toLocaleString(), ipAddress: '127.0.0.1' });
                showToast('Document archived', 'success');
            } else {
                showToast('Archiving cancelled', 'warning');
            }
            renderFinalApprovalImplementation(docId);
        }
    });
}


// ==============================
// NOTIFICATIONS PAGE
// ==============================

function renderNotifications() {
    const notifications = AppData.notifications || [];
    const unreadCount = notifications.filter(n => !n.read).length;

    const html = `
        <!-- Header -->
        <div class="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 rounded-2xl shadow-2xl p-8 mb-8 text-white animate-fade-in overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            <div class="relative flex items-center justify-between">
                <div>
                    <div class="flex items-center gap-3 mb-3">
                        <div class="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                            <i class="bi bi-bell text-3xl"></i>
                        </div>
                        <div>
                            <h1 class="text-4xl font-bold">Notifications</h1>
                            <p class="text-blue-100 mt-1 text-lg">Manage and view all your notifications</p>
                        </div>
                    </div>
                </div>
                <div class="hidden lg:block">
                    <i class="bi bi-bell-fill text-9xl opacity-10"></i>
                </div>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">Total Notifications</p>
                        <p class="text-3xl font-bold text-gray-800">${notifications.length}</p>
                    </div>
                    <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-bell text-white text-2xl"></i>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">Unread</p>
                        <p class="text-3xl font-bold text-orange-600">${unreadCount}</p>
                    </div>
                    <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-envelope-open text-white text-2xl"></i>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">Read</p>
                        <p class="text-3xl font-bold text-green-600">${notifications.length - unreadCount}</p>
                    </div>
                    <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-check-circle text-white text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters and Actions -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex flex-wrap gap-3">
                    <select id="filter-type" onchange="filterNotifications()" class="input-field-enhanced">
                        <option value="">All Types</option>
                        <option value="document">Documents</option>
                        <option value="approval">Approvals</option>
                        <option value="user">Users</option>
                        <option value="system">System</option>
                        <option value="alert">Alerts</option>
                        <option value="comment">Comments</option>
                        <option value="reminder">Reminders</option>
                    </select>

                    <select id="filter-status" onchange="filterNotifications()" class="input-field-enhanced">
                        <option value="">All Status</option>
                        <option value="unread">Unread Only</option>
                        <option value="read">Read Only</option>
                    </select>

                    <select id="sort-by" onchange="filterNotifications()" class="input-field-enhanced">
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="type">By Type</option>
                    </select>
                </div>

                <div class="flex gap-2 flex-wrap">
                    <button onclick="markAllAsRead()" class="btn-outline text-sm">
                        <i class="bi bi-check-all mr-1"></i>Mark All Read
                    </button>
                    <button onclick="deleteAllRead()" class="btn-outline text-sm text-red-600 border-red-300 hover:bg-red-50">
                        <i class="bi bi-trash mr-1"></i>Delete Read
                    </button>
                </div>
            </div>
        </div>

        <!-- Notifications List -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-xl font-bold text-gray-800">All Notifications</h3>
            </div>
            
            <div id="notifications-list" class="divide-y divide-gray-100">
                ${renderNotificationsList(notifications)}
            </div>

            ${notifications.length === 0 ? `
                <div class="p-12 text-center">
                    <i class="bi bi-bell-slash text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 text-lg">No notifications yet</p>
                </div>
            ` : ''}
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
    filterNotifications();
}

function renderNotificationsList(notifications) {
    if (!notifications || notifications.length === 0) return '';

    return notifications.map(notif => {
        const iconColorClasses = {
            'blue': 'bg-blue-100 text-blue-600',
            'green': 'bg-green-100 text-green-600',
            'purple': 'bg-purple-100 text-purple-600',
            'yellow': 'bg-yellow-100 text-yellow-600',
            'gray': 'bg-gray-100 text-gray-600',
            'red': 'bg-red-100 text-red-600',
            'amber': 'bg-amber-100 text-amber-600'
        };

        const colorClass = iconColorClasses[notif.color] || 'bg-gray-100 text-gray-600';
        const readClass = notif.read ? 'bg-gray-50' : 'bg-white';
        const readIndicator = notif.read ? '' : '<div class="w-2 h-2 bg-blue-600 rounded-full"></div>';

        return `
            <div class="${readClass} p-6 hover:bg-gray-50 transition-all duration-200 notification-item" data-id="${notif.id}" data-type="${notif.type}" data-read="${notif.read}">
                <div class="flex items-start gap-4">
                    <div class="${colorClass} rounded-full p-3 shrink-0">
                        <i class="bi ${notif.icon} text-xl"></i>
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between gap-4 mb-2">
                            <div class="flex items-center gap-2">
                                ${readIndicator}
                                <h4 class="text-base font-semibold text-gray-900">${notif.title}</h4>
                            </div>
                            <span class="text-xs text-gray-500 shrink-0">${notif.time}</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-3">${notif.message}</p>
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="px-2 py-1 text-xs font-semibold rounded-full ${getTypeColorClass(notif.type)}">${capitalizeFirstLetter(notif.type)}</span>
                            
                            <div class="flex gap-2 ml-auto">
                                ${notif.read ?
                `<button onclick="markAsUnread(${notif.id})" class="text-xs text-gray-600 hover:text-blue-600 transition-colors">
                                        <i class="bi bi-envelope"></i> Mark Unread
                                    </button>` :
                `<button onclick="markAsRead(${notif.id})" class="text-xs text-blue-600 hover:text-blue-700 transition-colors">
                                        <i class="bi bi-check"></i> Mark Read
                                    </button>`
            }
                                <button onclick="deleteNotification(${notif.id})" class="text-xs text-red-600 hover:text-red-700 transition-colors">
                                    <i class="bi bi-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function getTypeColorClass(type) {
    const typeColors = {
        'document': 'bg-blue-100 text-blue-800',
        'approval': 'bg-green-100 text-green-800',
        'user': 'bg-purple-100 text-purple-800',
        'system': 'bg-gray-100 text-gray-800',
        'alert': 'bg-red-100 text-red-800',
        'comment': 'bg-indigo-100 text-indigo-800',
        'reminder': 'bg-amber-100 text-amber-800'
    };
    return typeColors[type] || 'bg-gray-100 text-gray-800';
}

function filterNotifications() {
    const typeFilter = document.getElementById('filter-type')?.value || '';
    const statusFilter = document.getElementById('filter-status')?.value || '';
    const sortBy = document.getElementById('sort-by')?.value || 'newest';

    let filtered = [...AppData.notifications];

    // Filter by type
    if (typeFilter) {
        filtered = filtered.filter(n => n.type === typeFilter);
    }

    // Filter by status
    if (statusFilter === 'unread') {
        filtered = filtered.filter(n => !n.read);
    } else if (statusFilter === 'read') {
        filtered = filtered.filter(n => n.read);
    }

    // Sort
    if (sortBy === 'newest') {
        filtered.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'oldest') {
        filtered.sort((a, b) => a.id - b.id);
    } else if (sortBy === 'type') {
        filtered.sort((a, b) => a.type.localeCompare(b.type));
    }

    // Update the list
    const listContainer = document.getElementById('notifications-list');
    if (listContainer) {
        listContainer.innerHTML = renderNotificationsList(filtered);
    }
}

function markAsRead(id) {
    const notif = AppData.notifications.find(n => n.id === id);
    if (notif) {
        notif.read = true;
        showToast('Marked as read', 'success');
        renderNotifications();
    }
}

function markAsUnread(id) {
    const notif = AppData.notifications.find(n => n.id === id);
    if (notif) {
        notif.read = false;
        showToast('Marked as unread', 'info');
        renderNotifications();
    }
}

function markAllAsRead() {
    AppData.notifications.forEach(n => n.read = true);
    showToast('All notifications marked as read', 'success');
    renderNotifications();
}

function deleteNotification(id) {
    if (confirm('Are you sure you want to delete this notification?')) {
        const index = AppData.notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            AppData.notifications.splice(index, 1);
            showToast('Notification deleted', 'success');
            renderNotifications();
        }
    }
}

function deleteAllRead() {
    const readCount = AppData.notifications.filter(n => n.read).length;
    if (readCount === 0) {
        showToast('No read notifications to delete', 'info');
        return;
    }

    if (confirm(`Are you sure you want to delete ${readCount} read notification(s)?`)) {
        AppData.notifications = AppData.notifications.filter(n => !n.read);
        showToast(`${readCount} notification(s) deleted`, 'success');
        renderNotifications();
    }
}

