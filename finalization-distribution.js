// ==============================
// DOCUMENT FINALIZATION & DISTRIBUTION MODULE
// ==============================

function renderFinalizationDistribution() {
    const docs = AppData.documents || [];

    // Separate resolutions and ordinances
    const resolutions = docs.filter(d => d.type === 'resolution');
    const ordinances = docs.filter(d => d.type === 'ordinance');

    const html = `
        <div class="mb-6 animate-fade-in">
            <!-- Premium Gradient Header -->
            <div class="bg-gradient-to-r from-red-700 via-red-800 to-red-900 rounded-2xl shadow-xl p-8 text-white">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                        <i class="bi bi-send-check text-4xl"></i>
                    </div>
                    <div>
                        <h1 class="text-3xl font-bold">Document Finalization & Distribution</h1>
                        <p class="text-red-100 text-sm mt-1">Track printing, publication, distribution, and acknowledgment receipts</p>
                    </div>
                </div>
            </div>
            
            <!-- Action Button -->
            <div class="flex justify-end mt-4">
                <button onclick="openModal('add-distribution-modal')" class="btn-primary-enhanced">
                    <i class="bi bi-plus-circle mr-2"></i>Update Distribution Status
                </button>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600">Pending Printing</p>
                        <p class="text-2xl font-bold text-gray-900">${docs.filter(d => !d.finalization?.printed).length}</p>
                    </div>
                    <i class="bi bi-printer text-3xl text-blue-500"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600">Pending Distribution</p>
                        <p class="text-2xl font-bold text-gray-900">${docs.filter(d => !d.finalization?.distributed).length}</p>
                    </div>
                    <i class="bi bi-send text-3xl text-yellow-500"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600">Pending Acknowledgment</p>
                        <p class="text-2xl font-bold text-gray-900">${docs.filter(d => !d.finalization?.acknowledged).length}</p>
                    </div>
                    <i class="bi bi-receipt text-3xl text-purple-500"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600">Completed</p>
                        <p class="text-2xl font-bold text-gray-900">${docs.filter(d => d.finalization?.completed).length}</p>
                    </div>
                    <i class="bi bi-check-circle text-3xl text-green-500"></i>
                </div>
            </div>
        </div>

        <!-- Tabs for Resolutions and Ordinances -->
        <div class="bg-white rounded-xl shadow-md mb-6">
            <div class="border-b border-gray-200">
                <nav class="flex -mb-px">
                    <button onclick="switchFinalizationTab('resolutions')" id="tab-resolutions" 
                        class="finalization-tab px-6 py-4 text-sm font-medium border-b-2 border-red-600 text-red-600">
                        Resolutions (${resolutions.length})
                    </button>
                    <button onclick="switchFinalizationTab('ordinances')" id="tab-ordinances"
                        class="finalization-tab px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                        Ordinances (${ordinances.length})
                    </button>
                </nav>
            </div>
            
            <!-- Resolutions Tab Content -->
            <div id="content-resolutions" class="tab-content p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Resolution Finalization & Distribution Tracking</h3>
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Printing Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sanggunian Distribution</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dept/Agency Distribution</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acknowledgment</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${resolutions.length > 0 ? resolutions.map(doc => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${doc.reference}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${doc.title}</td>
                                    <td class="px-6 py-4">${getFinalizationStatusBadge(doc, 'printing')}</td>
                                    <td class="px-6 py-4">${getFinalizationStatusBadge(doc, 'sanggunian')}</td>
                                    <td class="px-6 py-4">${getFinalizationStatusBadge(doc, 'department')}</td>
                                    <td class="px-6 py-4">${getFinalizationStatusBadge(doc, 'acknowledgment')}</td>
                                    <td class="px-6 py-4">
                                        <button onclick="manageResolutionDistribution(${doc.id})" class="text-blue-600 hover:text-blue-800 mr-2" title="Manage">
                                            <i class="bi bi-gear"></i>
                                        </button>
                                        <button onclick="viewDistributionHistory(${doc.id})" class="text-gray-600 hover:text-gray-800" title="History">
                                            <i class="bi bi-clock-history"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('') : '<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No resolutions found</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Ordinances Tab Content -->
            <div id="content-ordinances" class="tab-content p-6 hidden">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Ordinance Finalization & Distribution Tracking</h3>
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publication</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posting</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distribution</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acknowledgment</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Effectivity Date</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${ordinances.length > 0 ? ordinances.map(doc => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${doc.reference}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${doc.title}</td>
                                    <td class="px-6 py-4">${getFinalizationStatusBadge(doc, 'publication')}</td>
                                    <td class="px-6 py-4">${getFinalizationStatusBadge(doc, 'posting')}</td>
                                    <td class="px-6 py-4">${getFinalizationStatusBadge(doc, 'distribution')}</td>
                                    <td class="px-6 py-4">${getFinalizationStatusBadge(doc, 'acknowledgment')}</td>
                                    <td class="px-6 py-4 text-sm">${doc.finalization?.effectivityDate || '<span class="text-gray-400">Not set</span>'}</td>
                                    <td class="px-6 py-4">
                                        <button onclick="manageOrdinanceDistribution(${doc.id})" class="text-blue-600 hover:text-blue-800 mr-2" title="Manage">
                                            <i class="bi bi-gear"></i>
                                        </button>
                                        <button onclick="viewDistributionHistory(${doc.id})" class="text-gray-600 hover:text-gray-800" title="History">
                                            <i class="bi bi-clock-history"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('') : '<tr><td colspan="8" class="px-6 py-4 text-center text-gray-500">No ordinances found</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

// Helper function to get finalization status badges
function getFinalizationStatusBadge(doc, type) {
    if (!doc.finalization) doc.finalization = {};

    const statuses = {
        printing: doc.finalization.printed,
        sanggunian: doc.finalization.sanggunianDistributed,
        department: doc.finalization.departmentDistributed,
        acknowledgment: doc.finalization.acknowledged,
        publication: doc.finalization.published,
        posting: doc.finalization.posted,
        distribution: doc.finalization.distributed
    };

    const status = statuses[type];

    if (status) {
        return '<span class="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800"><i class="bi bi-check-circle mr-1"></i>Completed</span>';
    } else {
        return '<span class="inline-flex items-center px-2 py-1 rounded text-xs bg-orange-200 text-orange-900"><i class="bi bi-clock mr-1"></i>Pending</span>';
    }
}

// Tab switching function
function switchFinalizationTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.finalization-tab').forEach(tab => {
        tab.classList.remove('border-red-600', 'text-red-600');
        tab.classList.add('border-transparent', 'text-gray-500');
    });

    document.getElementById(`tab-${tabName}`).classList.remove('border-transparent', 'text-gray-500');
    document.getElementById(`tab-${tabName}`).classList.add('border-red-600', 'text-red-600');

    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    document.getElementById(`content-${tabName}`).classList.remove('hidden');
}

// Manage Resolution Distribution
function manageResolutionDistribution(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.finalization) doc.finalization = {};

    const html = `
        <div class="space-y-4">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Manage Distribution - ${doc.reference}</h3>
            
            <!-- Printing Status -->
            <div class="border rounded-lg p-4">
                <label class="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" id="printed-${docId}" ${doc.finalization.printed ? 'checked' : ''} 
                        class="w-4 h-4 text-red-600 rounded focus:ring-red-500">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900">Printing Completed</p>
                        <p class="text-sm text-gray-500">Mark when document has been printed</p>
                    </div>
                </label>
                ${doc.finalization.printed ? `<p class="text-xs text-gray-500 mt-2">Completed on: ${doc.finalization.printedDate || 'N/A'}</p>` : ''}
            </div>
            
            <!-- Sanggunian Distribution -->
            <div class="border rounded-lg p-4">
                <label class="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" id="sanggunian-${docId}" ${doc.finalization.sanggunianDistributed ? 'checked' : ''} 
                        class="w-4 h-4 text-red-600 rounded focus:ring-red-500">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900">Distributed to Sanggunian Members</p>
                        <p class="text-sm text-gray-500">Track distribution to all council members</p>
                    </div>
                </label>
                ${doc.finalization.sanggunianDistributed ? `<p class="text-xs text-gray-500 mt-2">Distributed on: ${doc.finalization.sanggunianDate || 'N/A'}</p>` : ''}
            </div>
            
            <!-- Department/Agency Distribution -->
            <div class="border rounded-lg p-4">
                <label class="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" id="department-${docId}" ${doc.finalization.departmentDistributed ? 'checked' : ''} 
                        class="w-4 h-4 text-red-600 rounded focus:ring-red-500">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900">Distributed to Departments/Agencies</p>
                        <p class="text-sm text-gray-500">Track distribution to concerned offices</p>
                    </div>
                </label>
                <input type="text" id="dept-list-${docId}" placeholder="Enter department names..." 
                    value="${doc.finalization.departments || ''}"
                    class="input-field mt-2 text-sm">
            </div>
            
            <!-- Acknowledgment Receipt -->
            <div class="border rounded-lg p-4">
                <label class="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" id="acknowledged-${docId}" ${doc.finalization.acknowledged ? 'checked' : ''} 
                        class="w-4 h-4 text-red-600 rounded focus:ring-red-500">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900">Acknowledgment Receipts Received</p>
                        <p class="text-sm text-gray-500">All recipients have acknowledged receipt</p>
                    </div>
                </label>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
                <button onclick="closeModal('view-modal')" class="btn-outline">Cancel</button>
                <button onclick="saveResolutionDistribution(${docId})" class="btn-primary">
                    <i class="bi bi-save mr-2"></i>Save Changes
                </button>
            </div>
        </div>
    `;

    openViewModal('Manage Distribution', html);
}

// Save Resolution Distribution
function saveResolutionDistribution(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.finalization) doc.finalization = {};

    const today = new Date().toISOString().split('T')[0];

    doc.finalization.printed = document.getElementById(`printed-${docId}`).checked;
    if (doc.finalization.printed && !doc.finalization.printedDate) {
        doc.finalization.printedDate = today;
    }

    doc.finalization.sanggunianDistributed = document.getElementById(`sanggunian-${docId}`).checked;
    if (doc.finalization.sanggunianDistributed && !doc.finalization.sanggunianDate) {
        doc.finalization.sanggunianDate = today;
    }

    doc.finalization.departmentDistributed = document.getElementById(`department-${docId}`).checked;
    doc.finalization.departments = document.getElementById(`dept-list-${docId}`).value;

    doc.finalization.acknowledged = document.getElementById(`acknowledged-${docId}`).checked;

    // Check if all steps are completed
    if (doc.finalization.printed && doc.finalization.sanggunianDistributed &&
        doc.finalization.departmentDistributed && doc.finalization.acknowledged) {
        doc.finalization.completed = true;
    }

    closeModal('view-modal');
    showToast('Distribution status updated successfully', 'success');
    renderFinalizationDistribution();
}

// Manage Ordinance Distribution
function manageOrdinanceDistribution(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.finalization) doc.finalization = {};

    const html = `
        <div class="space-y-4">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Manage Distribution - ${doc.reference}</h3>
            
            <!-- Publication Management -->
            <div class="border rounded-lg p-4">
                <label class="flex items-center space-x-3 cursor-pointer mb-3">
                    <input type="checkbox" id="published-${docId}" ${doc.finalization.published ? 'checked' : ''} 
                        class="w-4 h-4 text-red-600 rounded focus:ring-red-500">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900">Publication Completed</p>
                        <p class="text-sm text-gray-500">Mark when ordinance has been published</p>
                    </div>
                </label>
                <div class="grid grid-cols-2 gap-3 mt-2">
                    <div>
                        <label class="text-xs text-gray-600">Publication Date</label>
                        <input type="date" id="pub-date-${docId}" value="${doc.finalization.publicationDate || ''}" 
                            class="input-field text-sm">
                    </div>
                    <div>
                        <label class="text-xs text-gray-600">Publication Outlet</label>
                        <input type="text" id="pub-outlet-${docId}" value="${doc.finalization.publicationOutlet || ''}" 
                            placeholder="e.g., Official Gazette" class="input-field text-sm">
                    </div>
                </div>
            </div>
            
            <!-- Posting Locations -->
            <div class="border rounded-lg p-4">
                <label class="flex items-center space-x-3 cursor-pointer mb-3">
                    <input type="checkbox" id="posted-${docId}" ${doc.finalization.posted ? 'checked' : ''} 
                        class="w-4 h-4 text-red-600 rounded focus:ring-red-500">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900">Posted at Designated Locations</p>
                        <p class="text-sm text-gray-500">Track posting at public bulletin boards</p>
                    </div>
                </label>
                <textarea id="posting-locations-${docId}" placeholder="Enter posting locations and dates..." 
                    class="input-field text-sm" rows="2">${doc.finalization.postingLocations || ''}</textarea>
            </div>
            
            <!-- Distribution -->
            <div class="border rounded-lg p-4">
                <label class="flex items-center space-x-3 cursor-pointer mb-3">
                    <input type="checkbox" id="distributed-${docId}" ${doc.finalization.distributed ? 'checked' : ''} 
                        class="w-4 h-4 text-red-600 rounded focus:ring-red-500">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900">Final Distribution to Departments/Agencies</p>
                        <p class="text-sm text-gray-500">Distribute to all concerned parties</p>
                    </div>
                </label>
                <input type="text" id="dist-agencies-${docId}" placeholder="Enter agency names..." 
                    value="${doc.finalization.distributionAgencies || ''}"
                    class="input-field text-sm">
            </div>
            
            <!-- Acknowledgment Receipt -->
            <div class="border rounded-lg p-4">
                <label class="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" id="ack-ord-${docId}" ${doc.finalization.acknowledged ? 'checked' : ''} 
                        class="w-4 h-4 text-red-600 rounded focus:ring-red-500">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900">Acknowledgment Receipts Received</p>
                        <p class="text-sm text-gray-500">All recipients have acknowledged receipt</p>
                    </div>
                </label>
            </div>
            
            <!-- Effectivity Date -->
            <div class="border rounded-lg p-4">
                <label class="text-sm font-medium text-gray-900">Effectivity Date</label>
                <input type="date" id="effectivity-${docId}" value="${doc.finalization.effectivityDate || ''}" 
                    class="input-field mt-2">
                <p class="text-xs text-gray-500 mt-1">Date when the ordinance takes effect</p>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
                <button onclick="closeModal('view-modal')" class="btn-outline">Cancel</button>
                <button onclick="saveOrdinanceDistribution(${docId})" class="btn-primary">
                    <i class="bi bi-save mr-2"></i>Save Changes
                </button>
            </div>
        </div>
    `;

    openViewModal('Manage Distribution', html);
}

// Save Ordinance Distribution
function saveOrdinanceDistribution(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.finalization) doc.finalization = {};

    doc.finalization.published = document.getElementById(`published-${docId}`).checked;
    doc.finalization.publicationDate = document.getElementById(`pub-date-${docId}`).value;
    doc.finalization.publicationOutlet = document.getElementById(`pub-outlet-${docId}`).value;

    doc.finalization.posted = document.getElementById(`posted-${docId}`).checked;
    doc.finalization.postingLocations = document.getElementById(`posting-locations-${docId}`).value;

    doc.finalization.distributed = document.getElementById(`distributed-${docId}`).checked;
    doc.finalization.distributionAgencies = document.getElementById(`dist-agencies-${docId}`).value;

    doc.finalization.acknowledged = document.getElementById(`ack-ord-${docId}`).checked;
    doc.finalization.effectivityDate = document.getElementById(`effectivity-${docId}`).value;

    // Check if all steps are completed
    if (doc.finalization.published && doc.finalization.posted &&
        doc.finalization.distributed && doc.finalization.acknowledged) {
        doc.finalization.completed = true;
    }

    closeModal('view-modal');
    showToast('Distribution status updated successfully', 'success');
    renderFinalizationDistribution();
}

// View Distribution History
function viewDistributionHistory(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc || !doc.finalization) {
        showToast('No distribution history available', 'info');
        return;
    }

    const isOrdinance = doc.type === 'ordinance';

    const html = `
        <div class="space-y-4">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Distribution History - ${doc.reference}</h3>
            
            <div class="border-l-4 border-blue-500 pl-4 space-y-3">
                ${isOrdinance ? `
                    ${doc.finalization.published ? `
                        <div class="flex items-start">
                            <i class="bi bi-check-circle text-green-600 mr-2 mt-1"></i>
                            <div>
                                <p class="font-medium">Published</p>
                                <p class="text-sm text-gray-600">${doc.finalization.publicationDate || 'Date not recorded'} - ${doc.finalization.publicationOutlet || 'Outlet not specified'}</p>
                            </div>
                        </div>
                    ` : ''}
                    ${doc.finalization.posted ? `
                        <div class="flex items-start">
                            <i class="bi bi-check-circle text-green-600 mr-2 mt-1"></i>
                            <div>
                                <p class="font-medium">Posted at Locations</p>
                                <p class="text-sm text-gray-600">${doc.finalization.postingLocations || 'Locations not specified'}</p>
                            </div>
                        </div>
                    ` : ''}
                ` : `
                    ${doc.finalization.printed ? `
                        <div class="flex items-start">
                            <i class="bi bi-check-circle text-green-600 mr-2 mt-1"></i>
                            <div>
                                <p class="font-medium">Printed</p>
                                <p class="text-sm text-gray-600">${doc.finalization.printedDate || 'Date not recorded'}</p>
                            </div>
                        </div>
                    ` : ''}
                    ${doc.finalization.sanggunianDistributed ? `
                        <div class="flex items-start">
                            <i class="bi bi-check-circle text-green-600 mr-2 mt-1"></i>
                            <div>
                                <p class="font-medium">Distributed to Sanggunian</p>
                                <p class="text-sm text-gray-600">${doc.finalization.sanggunianDate || 'Date not recorded'}</p>
                            </div>
                        </div>
                    ` : ''}
                `}
                
                ${doc.finalization.distributed || doc.finalization.departmentDistributed ? `
                    <div class="flex items-start">
                        <i class="bi bi-check-circle text-green-600 mr-2 mt-1"></i>
                        <div>
                            <p class="font-medium">Distributed to Departments/Agencies</p>
                            <p class="text-sm text-gray-600">${isOrdinance ? (doc.finalization.distributionAgencies || 'Not specified') : (doc.finalization.departments || 'Not specified')}</p>
                        </div>
                    </div>
                ` : ''}
                
                ${doc.finalization.acknowledged ? `
                    <div class="flex items-start">
                        <i class="bi bi-check-circle text-green-600 mr-2 mt-1"></i>
                        <div>
                            <p class="font-medium">Acknowledgment Received</p>
                            <p class="text-sm text-gray-600">All recipients acknowledged</p>
                        </div>
                    </div>
                ` : ''}
                
                ${isOrdinance && doc.finalization.effectivityDate ? `
                    <div class="flex items-start">
                        <i class="bi bi-calendar-check text-blue-600 mr-2 mt-1"></i>
                        <div>
                            <p class="font-medium">Effectivity Date</p>
                            <p class="text-sm text-gray-600">${doc.finalization.effectivityDate}</p>
                        </div>
                    </div>
                ` : ''}
            </div>
            
            ${!doc.finalization.completed ? `
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                    <p class="text-sm text-yellow-800"><i class="bi bi-exclamation-triangle mr-2"></i>Distribution process not yet complete</p>
                </div>
            ` : `
                <div class="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                    <p class="text-sm text-green-800"><i class="bi bi-check-circle mr-2"></i>All distribution steps completed</p>
                </div>
            `}
        </div>
    `;

    openViewModal('Distribution History', html);
}
