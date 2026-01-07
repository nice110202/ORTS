
// ==============================
// LEGISLATIVE READING & WORKFLOW TRACKING
// ==============================

function renderLegislativeReading() {
    const docs = AppData.documents;

    // Calculate workflow statistics
    const stats = {
        total: docs.length,
        inFirstReading: docs.filter(d => d.firstReading && d.firstReading.titleRead && !d.firstReading.referred).length,
        inSecondReading: docs.filter(d => d.secondReading && !d.secondReading.approved).length,
        inThirdReading: docs.filter(d => d.thirdReading && !d.thirdReading.approved && d.type !== 'resolution').length,
        completed: docs.filter(d => (d.thirdReading && d.thirdReading.approved) || (d.secondReading && d.secondReading.approved && d.type === 'resolution')).length,
        resolutions: docs.filter(d => d.type === 'resolution').length,
        ordinances: docs.filter(d => d.type === 'ordinance').length
    };

    const html = `
        <!-- Premium Gradient Header -->
        <div class="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-2xl shadow-2xl p-8 mb-6 text-white animate-fade-in overflow-hidden">
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
                    <h1 class="text-4xl font-bold mb-2 tracking-tight">Legislative Reading & Workflow Tracking</h1>
                    <p class="text-indigo-50 text-base flex items-center gap-2">
                        <i class="bi bi-info-circle"></i>
                        Track documents through First Reading, Second Reading, and Third Reading stages
                    </p>
                </div>
            </div>
        </div>

        <!-- Tabbed Navigation for Reading Stages -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 animate-fade-in-up animation-delay-100">
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex overflow-x-auto">
                    <button onclick="switchReadingTab('overview')" id="tab-overview"
                        class="reading-tab whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 border-indigo-600 text-indigo-600 transition-colors">
                        <i class="bi bi-speedometer2 mr-2"></i>Overview
                    </button>
                    <button onclick="switchReadingTab('first-reading')" id="tab-first-reading"
                        class="reading-tab whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">
                        <i class="bi bi-1-circle mr-2"></i>First Reading
                    </button>
                    <button onclick="switchReadingTab('second-reading')" id="tab-second-reading"
                        class="reading-tab whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">
                        <i class="bi bi-2-circle mr-2"></i>Second Reading
                    </button>
                    <button onclick="switchReadingTab('third-reading')" id="tab-third-reading"
                        class="reading-tab whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">
                        <i class="bi bi-3-circle mr-2"></i>Third Reading
                    </button>
                </nav>
            </div>

            <!-- Overview Tab -->
            <div id="content-overview" class="reading-tab-content p-6">
                ${renderReadingOverview(docs, stats)}
            </div>

            <!-- First Reading Tab -->
            <div id="content-first-reading" class="reading-tab-content hidden p-6">
                ${renderFirstReadingTab(docs)}
            </div>

            <!-- Second Reading Tab -->
            <div id="content-second-reading" class="reading-tab-content hidden p-6">
                ${renderSecondReadingTab(docs)}
            </div>

            <!-- Third Reading Tab -->
            <div id="content-third-reading" class="reading-tab-content hidden p-6">
                ${renderThirdReadingTab(docs)}
            </div>
        </div>
    `;

    document.getElementById('content-area').innerHTML = html;
}

// Tab switching function for reading tabs
function switchReadingTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.reading-tab').forEach(tab => {
        tab.classList.remove('border-indigo-600', 'text-indigo-600');
        tab.classList.add('border-transparent', 'text-gray-500');
    });

    document.getElementById(`tab-${tabName}`).classList.remove('border-transparent', 'text-gray-500');
    document.getElementById(`tab-${tabName}`).classList.add('border-indigo-600', 'text-indigo-600');

    // Update content
    document.querySelectorAll('.reading-tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    document.getElementById(`content-${tabName}`).classList.remove('hidden');

    // Update breadcrumb
    const breadcrumbTitles = {
        'overview': 'Overview',
        'first-reading': 'First Reading',
        'second-reading': 'Second Reading',
        'third-reading': 'Third Reading'
    };

    const breadcrumbEl = document.getElementById('breadcrumb-current');
    const pageTitleEl = document.getElementById('page-title');
    console.log('Breadcrumb element:', breadcrumbEl);
    console.log('Tab name:', tabName);
    console.log('Title:', breadcrumbTitles[tabName]);

    if (breadcrumbEl && breadcrumbTitles[tabName]) {
        const fullTitle = `Legislative Reading & Workflow › ${breadcrumbTitles[tabName]}`;
        breadcrumbEl.innerHTML = `<span class="text-gray-800 font-medium">${fullTitle}</span>`;

        // Also update page title
        if (pageTitleEl) {
            pageTitleEl.textContent = fullTitle;
        }
    }
}

// Render Reading Overview/Dashboard
function renderReadingOverview(docs, stats) {
    const inProgress = stats.inFirstReading + stats.inSecondReading + stats.inThirdReading;

    return `
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <!-- Total Documents -->
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

            <!-- In Progress -->
            <div class="bg-white rounded-xl p-6 border-t-4 border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <i class="bi bi-arrow-repeat text-white text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold text-gray-800">${inProgress}</span>
                </div>
                <h3 class="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">In Progress</h3>
                <p class="text-xs text-gray-500">Currently processing</p>
            </div>

            <!-- Completed -->
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

            <!-- Document Types -->
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

        <!-- Stage-by-Stage Breakdown -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- First Reading Card -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-md hover:shadow-xl transition-all duration-300">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-1-circle text-white text-2xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-blue-900">First Reading</h3>
                        <p class="text-sm text-blue-700">Title & Committee Review</p>
                    </div>
                </div>
                <div class="text-4xl font-bold text-blue-600 mb-2">${stats.inFirstReading}</div>
                <p class="text-sm text-blue-700">Documents in stage</p>
            </div>

            <!-- Second Reading Card -->
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-500 shadow-md hover:shadow-xl transition-all duration-300">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-2-circle text-white text-2xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-orange-900">Second Reading</h3>
                        <p class="text-sm text-orange-700">Debate & Amendments</p>
                    </div>
                </div>
                <div class="text-4xl font-bold text-orange-600 mb-2">${stats.inSecondReading}</div>
                <p class="text-sm text-orange-700">Documents in stage</p>
            </div>

            <!-- Third Reading Card -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 shadow-md hover:shadow-xl transition-all duration-300">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <i class="bi bi-3-circle text-white text-2xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-green-900">Third Reading</h3>
                        <p class="text-sm text-green-700">Final Voting (Ordinances)</p>
                    </div>
                </div>
                <div class="text-4xl font-bold text-green-600 mb-2">${stats.inThirdReading}</div>
                <p class="text-sm text-green-700">Documents in stage</p>
            </div>
        </div>
    `;
}

// Render First Reading Tab Content
function renderFirstReadingTab(docs) {
    return `
        <div class="space-y-4">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i class="bi bi-1-circle text-white text-xl"></i>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-gray-800">First Reading</h3>
                    <p class="text-sm text-gray-600">Title reading tracking, reading date, committee referral, agenda status</p>
                </div>
            </div>

            ${docs.map((doc, index) => {
        if (!doc.firstReading) doc.firstReading = { titleRead: false, readingDate: '', committeeReferral: '', agendaIncluded: false, referred: false };
        const titleRead = doc.firstReading.titleRead || false;
        const readingDate = doc.firstReading.readingDate || '';
        const committeeReferral = doc.firstReading.committeeReferral || '';
        const agendaIncluded = doc.firstReading.agendaIncluded || false;

        return `
                    <div class="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300" style="animation: fadeInUp 0.3s ease-out ${index * 0.05}s both">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                        ${doc.reference}
                                    </span>
                                    ${titleRead ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800"><i class="bi bi-check-circle mr-1"></i>Title Read</span>' : ''}
                                    ${agendaIncluded ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800"><i class="bi bi-calendar-check mr-1"></i>In Agenda</span>' : ''}
                                </div>
                                <h3 class="text-lg font-bold text-gray-800 mb-1">${doc.title}</h3>
                                <p class="text-sm text-gray-600">${doc.type} • ${doc.author || 'Unknown'}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <!-- Reading Date -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="bi bi-calendar3 text-blue-600 mr-1"></i>Reading Date
                                </label>
                                <input type="date" 
                                    id="reading-date-${doc.id}" 
                                    value="${readingDate}"
                                    onchange="updateFirstReadingDate(${doc.id})"
                                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm"/>
                            </div>

                            <!-- Committee Referral -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="bi bi-people text-blue-600 mr-1"></i>Committee Referral
                                </label>
                                <input type="text" 
                                    id="committee-ref-${doc.id}" 
                                    value="${committeeReferral}"
                                    placeholder="e.g., Finance Committee"
                                    onchange="updateCommitteeReferral(${doc.id})"
                                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm"/>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-3">
                            <button onclick="toggleTitleRead(${doc.id})" 
                                class="px-4 py-2.5 ${titleRead ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-blue-600 text-white hover:bg-blue-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center gap-2">
                                <i class="bi bi-${titleRead ? 'check-circle-fill' : 'book'}"></i>
                                ${titleRead ? 'Title Read ✓' : 'Mark Title as Read'}
                            </button>

                            <button onclick="toggleAgendaInclusion(${doc.id})" 
                                class="px-4 py-2.5 ${agendaIncluded ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' : 'bg-purple-600 text-white hover:bg-purple-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center gap-2">
                                <i class="bi bi-${agendaIncluded ? 'calendar-check-fill' : 'calendar-plus'}"></i>
                                ${agendaIncluded ? 'In Agenda ✓' : 'Include in Agenda'}
                            </button>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;
}

// Render Second Reading Tab Content
function renderSecondReadingTab(docs) {
    return `
        <div class="space-y-4">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <i class="bi bi-2-circle text-white text-xl"></i>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-gray-800">Second Reading</h3>
                    <p class="text-sm text-gray-600">Debate/discussion period, amendments, committee reports, rules review, approval</p>
                </div>
            </div>

            ${docs.map((doc, index) => {
        if (!doc.secondReading) doc.secondReading = { debateStart: '', debateEnd: '', amendmentStart: '', amendmentEnd: '', committeeReport: '', rulesReviewed: false, approved: false, isResolution: false };
        const isResolution = doc.type === 'resolution' || doc.secondReading.isResolution;
        const approved = doc.secondReading.approved || false;
        const rulesReviewed = doc.secondReading.rulesReviewed || false;

        return `
                    <div class="bg-gray-50 rounded-xl p-5 border-l-4 border-orange-500 hover:shadow-lg transition-all duration-300" style="animation: fadeInUp 0.3s ease-out ${index * 0.05}s both">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
                                        ${doc.reference}
                                    </span>
                                    ${isResolution ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800"><i class="bi bi-bookmark-star mr-1"></i>Resolution - No 3rd Reading</span>' : ''}
                                    ${rulesReviewed ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><i class="bi bi-shield-check mr-1"></i>Rules Reviewed</span>' : ''}
                                    ${approved ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800"><i class="bi bi-check-circle mr-1"></i>Approved</span>' : ''}
                                </div>
                                <h3 class="text-lg font-bold text-gray-800 mb-1">${doc.title}</h3>
                                <p class="text-sm text-gray-600">${doc.type} • ${doc.author || 'Unknown'}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <!-- Debate Period -->
                            <div class="col-span-2 bg-white rounded-lg p-4 border-2 border-gray-200">
                                <label class="block text-sm font-bold text-gray-700 mb-3">
                                    <i class="bi bi-megaphone text-orange-600 mr-1"></i>Debate/Discussion Period
                                </label>
                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="block text-xs text-gray-600 mb-1">Start Date</label>
                                        <input type="date" 
                                            id="debate-start-${doc.id}" 
                                            value="${doc.secondReading.debateStart || ''}"
                                            onchange="updateDebatePeriod(${doc.id})"
                                            class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none text-sm"/>
                                    </div>
                                    <div>
                                        <label class="block text-xs text-gray-600 mb-1">End Date</label>
                                        <input type="date" 
                                            id="debate-end-${doc.id}" 
                                            value="${doc.secondReading.debateEnd || ''}"
                                            onchange="updateDebatePeriod(${doc.id})"
                                            class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none text-sm"/>
                                    </div>
                                </div>
                            </div>

                            <!-- Amendment Period -->
                            <div class="col-span-2 bg-white rounded-lg p-4 border-2 border-gray-200">
                                <label class="block text-sm font-bold text-gray-700 mb-3">
                                    <i class="bi bi-pencil-square text-orange-600 mr-1"></i>Amendment Period
                                </label>
                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="block text-xs text-gray-600 mb-1">Start Date</label>
                                        <input type="date" 
                                            id="amend-start-${doc.id}" 
                                            value="${doc.secondReading.amendmentStart || ''}"
                                            onchange="updateAmendmentPeriod(${doc.id})"
                                            class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none text-sm"/>
                                    </div>
                                    <div>
                                        <label class="block text-xs text-gray-600 mb-1">End Date</label>
                                        <input type="date" 
                                            id="amend-end-${doc.id}" 
                                            value="${doc.secondReading.amendmentEnd || ''}"
                                            onchange="updateAmendmentPeriod(${doc.id})"
                                            class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none text-sm"/>
                                    </div>
                                </div>
                            </div>

                            <!-- Committee Report -->
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="bi bi-file-earmark-text text-orange-600 mr-1"></i>Committee Report
                                </label>
                                <textarea 
                                    id="committee-report-${doc.id}" 
                                    rows="3"
                                    placeholder="Synced from Committee System... (manual entry for now)"
                                    onchange="updateCommitteeReport(${doc.id})"
                                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none text-sm resize-none"
                                >${doc.secondReading.committeeReport || ''}</textarea>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-3">
                            <button onclick="toggleRulesReview2nd(${doc.id})" 
                                class="px-4 py-2.5 ${rulesReviewed ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' : 'bg-blue-600 text-white hover:bg-blue-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center gap-2">
                                <i class="bi bi-${rulesReviewed ? 'shield-check-fill' : 'shield-check'}"></i>
                                ${rulesReviewed ? 'Rules Reviewed ✓' : 'Rules/Floor Leader Review'}
                            </button>

                            <button onclick="approveSecondReading2nd(${doc.id})" 
                                class="px-4 py-2.5 ${approved ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-green-600 text-white hover:bg-green-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center gap-2">
                                <i class="bi bi-${approved ? 'check-circle-fill' : 'check-circle'}"></i>
                                ${approved ? 'Approved ✓' : 'Approve Second Reading'}
                            </button>

                            ${isResolution ? `
                            <div class="flex-1 px-4 py-2.5 bg-purple-100 border-2 border-purple-300 rounded-lg text-purple-800 text-sm font-semibold flex items-center justify-center gap-2">
                                <i class="bi bi-info-circle"></i>
                                Resolution Endpoint (No Third Reading Required)
                            </div>
                            ` : ''}
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;
}

// Render Third Reading Tab Content
function renderThirdReadingTab(docs) {
    const ordinances = docs.filter(d => d.type !== 'resolution');

    return `
        <div class="space-y-4">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <i class="bi bi-3-circle text-white text-xl"></i>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-gray-800">Third Reading (Ordinances Only)</h3>
                    <p class="text-sm text-gray-600">Final reading date, final voting, approval/disapproval tracking</p>
                </div>
            </div>

            ${ordinances.length === 0 ? `
                <div class="text-center py-12">
                    <i class="bi bi-info-circle text-gray-400 text-5xl mb-4"></i>
                    <p class="text-gray-500 text-lg">No ordinances available for Third Reading</p>
                    <p class="text-gray-400 text-sm mt-2">Third Reading is only applicable to ordinances (not resolutions)</p>
                </div>
            ` : ''}

            ${ordinances.map((doc, index) => {
        if (!doc.thirdReading) doc.thirdReading = { finalReadingDate: '', yesVotes: 0, noVotes: 0, abstainVotes: 0, approved: false };
        const approved = doc.thirdReading.approved || false;
        const totalVotes = (doc.thirdReading.yesVotes || 0) + (doc.thirdReading.noVotes || 0) + (doc.thirdReading.abstainVotes || 0);

        return `
                    <div class="bg-gray-50 rounded-xl p-5 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300" style="animation: fadeInUp 0.3s ease-out ${index * 0.05}s both">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                        ${doc.reference}
                                    </span>
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                        <i class="bi bi-file-earmark-text mr-1"></i>Ordinance
                                    </span>
                                    ${approved ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800"><i class="bi bi-check-circle mr-1"></i>Approved</span>' : ''}
                                </div>
                                <h3 class="text-lg font-bold text-gray-800 mb-1">${doc.title}</h3>
                                <p class="text-sm text-gray-600">${doc.type} • ${doc.author || 'Unknown'}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <!-- Final Reading Date -->
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="bi bi-calendar3 text-green-600 mr-1"></i>Final Reading Date
                                </label>
                                <input type="date" 
                                    id="final-reading-date-${doc.id}" 
                                    value="${doc.thirdReading.finalReadingDate || ''}"
                                    onchange="updateFinalReadingDate(${doc.id})"
                                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none text-sm"/>
                            </div>

                            <!-- Final Voting -->
                            <div class="col-span-2 bg-white rounded-lg p-4 border-2 border-gray-200">
                                <label class="block text-sm font-bold text-gray-700 mb-3">
                                    <i class="bi bi-hand-thumbs-up text-green-600 mr-1"></i>Final Voting Tracking
                                </label>
                                <div class="grid grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <label class="block text-xs text-gray-600 mb-1">Yes Votes</label>
                                        <input type="number" 
                                            id="yes-votes-${doc.id}" 
                                            value="${doc.thirdReading.yesVotes || 0}"
                                            min="0"
                                            onchange="updateFinalVotes(${doc.id})"
                                            class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none text-sm"/>
                                    </div>
                                    <div>
                                        <label class="block text-xs text-gray-600 mb-1">No Votes</label>
                                        <input type="number" 
                                            id="no-votes-${doc.id}" 
                                            value="${doc.thirdReading.noVotes || 0}"
                                            min="0"
                                            onchange="updateFinalVotes(${doc.id})"
                                            class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none text-sm"/>
                                    </div>
                                    <div>
                                        <label class="block text-xs text-gray-600 mb-1">Abstain</label>
                                        <input type="number" 
                                            id="abstain-votes-${doc.id}" 
                                            value="${doc.thirdReading.abstainVotes || 0}"
                                            min="0"
                                            onchange="updateFinalVotes(${doc.id})"
                                            class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm"/>
                                    </div>
                                </div>
                                ${totalVotes > 0 ? `
                                <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                    <p class="text-xs font-semibold text-gray-600 mb-2">Vote Tally</p>
                                    <div class="flex items-center gap-4 text-sm">
                                        <span class="text-green-600 font-bold"><i class="bi bi-hand-thumbs-up mr-1"></i>${doc.thirdReading.yesVotes || 0}</span>
                                        <span class="text-red-600 font-bold"><i class="bi bi-hand-thumbs-down mr-1"></i>${doc.thirdReading.noVotes || 0}</span>
                                        <span class="text-gray-600 font-bold"><i class="bi bi-dash-circle mr-1"></i>${doc.thirdReading.abstainVotes || 0}</span>
                                        <span class="ml-auto text-gray-800 font-bold">Total: ${totalVotes}</span>
                                    </div>
                                </div>
                                ` : ''}
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-3">
                            <button onclick="approveThirdReading(${doc.id})" 
                                class="flex-1 px-4 py-2.5 ${approved ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-green-600 text-white hover:bg-green-700'} rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                <i class="bi bi-${approved ? 'check-circle-fill' : 'check-circle'}"></i>
                                ${approved ? 'Approved ✓' : 'Approve'}
                            </button>

                            <button onclick="disapproveThirdReading(${doc.id})" 
                                class="flex-1 px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                <i class="bi bi-x-circle"></i>
                                Disapprove
                            </button>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;
}

// ==============================
// FIRST READING HELPER FUNCTIONS
// ==============================

function toggleTitleRead(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.firstReading) doc.firstReading = { titleRead: false, readingDate: '', committeeReferral: '', agendaIncluded: false, referred: false };
    doc.firstReading.titleRead = !doc.firstReading.titleRead;
    showToast(doc.firstReading.titleRead ? 'Title marked as read' : 'Title unmarked', doc.firstReading.titleRead ? 'success' : 'info');
    renderLegislativeReading();
}

function toggleAgendaInclusion(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.firstReading) doc.firstReading = { titleRead: false, readingDate: '', committeeReferral: '', agendaIncluded: false, referred: false };
    doc.firstReading.agendaIncluded = !doc.firstReading.agendaIncluded;
    showToast(doc.firstReading.agendaIncluded ? 'Included in agenda' : 'Removed from agenda', doc.firstReading.agendaIncluded ? 'success' : 'info');
    renderLegislativeReading();
}

function updateFirstReadingDate(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const dateInput = document.getElementById(`reading-date-${docId}`);
    if (!dateInput) return;
    if (!doc.firstReading) doc.firstReading = { titleRead: false, readingDate: '', committeeReferral: '', agendaIncluded: false, referred: false };
    doc.firstReading.readingDate = dateInput.value;
    showToast('Reading date updated', 'success');
}

function updateCommitteeReferral(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const refInput = document.getElementById(`committee-ref-${docId}`);
    if (!refInput) return;
    if (!doc.firstReading) doc.firstReading = { titleRead: false, readingDate: '', committeeReferral: '', agendaIncluded: false, referred: false };
    doc.firstReading.committeeReferral = refInput.value;
    showToast('Committee referral updated', 'success');
}

// ==============================
// SECOND READING HELPER FUNCTIONS
// ==============================

function updateDebatePeriod(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const startInput = document.getElementById(`debate-start-${docId}`);
    const endInput = document.getElementById(`debate-end-${docId}`);
    if (!startInput || !endInput) return;
    if (!doc.secondReading) doc.secondReading = { debateStart: '', debateEnd: '', amendmentStart: '', amendmentEnd: '', committeeReport: '', rulesReviewed: false, approved: false, isResolution: false };
    doc.secondReading.debateStart = startInput.value;
    doc.secondReading.debateEnd = endInput.value;
    showToast('Debate period updated', 'success');
}

function updateAmendmentPeriod(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const startInput = document.getElementById(`amend-start-${docId}`);
    const endInput = document.getElementById(`amend-end-${docId}`);
    if (!startInput || !endInput) return;
    if (!doc.secondReading) doc.secondReading = { debateStart: '', debateEnd: '', amendmentStart: '', amendmentEnd: '', committeeReport: '', rulesReviewed: false, approved: false, isResolution: false };
    doc.secondReading.amendmentStart = startInput.value;
    doc.secondReading.amendmentEnd = endInput.value;
    showToast('Amendment period updated', 'success');
}

function updateCommitteeReport(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const reportInput = document.getElementById(`committee-report-${docId}`);
    if (!reportInput) return;
    if (!doc.secondReading) doc.secondReading = { debateStart: '', debateEnd: '', amendmentStart: '', amendmentEnd: '', committeeReport: '', rulesReviewed: false, approved: false, isResolution: false };
    doc.secondReading.committeeReport = reportInput.value;
    showToast('Committee report updated', 'success');
}

function toggleRulesReview2nd(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.secondReading) doc.secondReading = { debateStart: '', debateEnd: '', amendmentStart: '', amendmentEnd: '', committeeReport: '', rulesReviewed: false, approved: false, isResolution: false };
    doc.secondReading.rulesReviewed = !doc.secondReading.rulesReviewed;
    showToast(doc.secondReading.rulesReviewed ? 'Rules reviewed' : 'Rules review removed', doc.secondReading.rulesReviewed ? 'success' : 'info');
    renderLegislativeReading();
}

function approveSecondReading2nd(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.secondReading) doc.secondReading = { debateStart: '', debateEnd: '', amendmentStart: '', amendmentEnd: '', committeeReport: '', rulesReviewed: false, approved: false, isResolution: false };
    doc.secondReading.approved = true;
    showToast('Second reading approved', 'success');
    renderLegislativeReading();
}

// ==============================
// THIRD READING HELPER FUNCTIONS
// ==============================

function updateFinalReadingDate(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const dateInput = document.getElementById(`final-reading-date-${docId}`);
    if (!dateInput) return;
    if (!doc.thirdReading) doc.thirdReading = { finalReadingDate: '', yesVotes: 0, noVotes: 0, abstainVotes: 0, approved: false };
    doc.thirdReading.finalReadingDate = dateInput.value;
    showToast('Final reading date updated', 'success');
}

function updateFinalVotes(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    const yesInput = document.getElementById(`yes-votes-${docId}`);
    const noInput = document.getElementById(`no-votes-${docId}`);
    const abstainInput = document.getElementById(`abstain-votes-${docId}`);
    if (!yesInput || !noInput || !abstainInput) return;
    if (!doc.thirdReading) doc.thirdReading = { finalReadingDate: '', yesVotes: 0, noVotes: 0, abstainVotes: 0, approved: false };
    doc.thirdReading.yesVotes = parseInt(yesInput.value) || 0;
    doc.thirdReading.noVotes = parseInt(noInput.value) || 0;
    doc.thirdReading.abstainVotes = parseInt(abstainInput.value) || 0;
    showToast('Voting counts updated', 'success');
    renderLegislativeReading();
}

function approveThirdReading(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.thirdReading) doc.thirdReading = { finalReadingDate: '', yesVotes: 0, noVotes: 0, abstainVotes: 0, approved: false };
    doc.thirdReading.approved = true;
    doc.status = 'approved';
    showToast('Third reading approved - Document finalized', 'success');
    renderLegislativeReading();
}

function disapproveThirdReading(docId) {
    const doc = AppData.documents.find(d => d.id === docId);
    if (!doc) return;
    if (!doc.thirdReading) doc.thirdReading = { finalReadingDate: '', yesVotes: 0, noVotes: 0, abstainVotes: 0, approved: false };
    doc.thirdReading.approved = false;
    doc.status = 'rejected';
    showToast('Third reading disapproved - Document rejected', 'warning');
    renderLegislativeReading();
}
