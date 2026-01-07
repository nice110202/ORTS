
// ==============================
// APPROVAL & ENACTMENT MODULE
// ==============================

function renderVotingEnactment() {
    const docs = AppData.documents;

    const html = `
        <!-- Header -->
        <div class="relative bg-gradient-to-r from-red-700 via-red-800 to-red-900 rounded-2xl shadow-2xl p-8 mb-8 text-white animate-fade-in overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            <div class="relative flex items-center justify-between">
                <div>
                    <div class="flex items-center gap-3 mb-3">
                        <div class="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                            <i class="bi bi-check2-circle text-3xl"></i>
                        </div>
                        <div>
                            <h1 class="text-4xl font-bold">Approval & Enactment</h1>
                            <p class="text-red-100 mt-1 text-lg">Post-approval tracking and enactment management</p>
                        </div>
                    </div>
                </div>
                <div class="hidden lg:block">
                    <i class="bi bi-clipboard-check text-9xl opacity-10"></i>
                </div>
            </div>
        </div>

        <!-- Main Grid Layout -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <!-- 1. Voting Results Integration -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fade-in-up">
                <div class="flex items-center gap-3 mb-6">
                    <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                        <i class="bi bi-bar-chart-fill text-white text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">Voting Results Integration</h3>
                        <p class="text-sm text-gray-500">Receives from Voting System</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-file-text text-blue-600"></i>
                            Select Document
                        </label>
                        <select id="voting-doc-select" class="input-field-enhanced w-full">
                            <option value="">-- Select Document --</option>
                            ${docs.map(d => `<option value="${d.id}">${d.reference} - ${d.title}</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-calendar-event text-blue-600"></i>
                            Voting Date
                        </label>
                        <input type="date" id="voting-date" class="input-field-enhanced w-full">
                    </div>

                    <div class="grid grid-cols-3 gap-3">
                        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200 text-center">
                            <input type="number" id="votes-yes" class="text-center text-2xl font-bold text-green-700 bg-transparent border-none w-full focus:outline-none" value="0" min="0">
                            <p class="text-xs text-green-800 uppercase font-bold tracking-wide mt-1">Yes Votes</p>
                        </div>
                        <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border-2 border-red-200 text-center">
                            <input type="number" id="votes-no" class="text-center text-2xl font-bold text-red-700 bg-transparent border-none w-full focus:outline-none" value="0" min="0">
                            <p class="text-xs text-red-800 uppercase font-bold tracking-wide mt-1">No Votes</p>
                        </div>
                        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200 text-center">
                            <input type="number" id="votes-abstain" class="text-center text-2xl font-bold text-gray-700 bg-transparent border-none w-full focus:outline-none" value="0" min="0">
                            <p class="text-xs text-gray-800 uppercase font-bold tracking-wide mt-1">Abstain</p>
                        </div>
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-info-circle text-blue-600"></i>
                            Voting Result
                        </label>
                        <select id="voting-result" class="input-field-enhanced w-full">
                            <option value="passed">Passed</option>
                            <option value="failed">Failed</option>
                            <option value="deferred">Deferred</option>
                        </select>
                    </div>

                    <button onclick="saveVotingResults()" class="btn-primary-enhanced w-full">
                        <i class="bi bi-save mr-2"></i>Import Voting Results
                    </button>
                </div>
            </div>

            <!-- 2. Executive Action Tracking -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fade-in-up animation-delay-100">
                <div class="flex items-center gap-3 mb-6">
                    <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md">
                        <i class="bi bi-person-badge text-white text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">Executive Action Tracking</h3>
                        <p class="text-sm text-gray-500">Your system manages</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-info-circle text-purple-600"></i>
                            Executive Action
                        </label>
                        <select id="executive-action" class="input-field-enhanced w-full">
                            <option value="pending">Pending Signature</option>
                            <option value="approved">Approved by LCE</option>
                            <option value="vetoed">Vetoed by LCE</option>
                            <option value="lapsed">Lapsed into Law</option>
                        </select>
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-person-badge text-purple-600"></i>
                            Local Chief Executive
                        </label>
                        <input type="text" id="lce-name" class="input-field-enhanced w-full" placeholder="Hon. City Mayor" value="Hon. Wes Gatchalian">
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-calendar-check text-purple-600"></i>
                            Action Date
                        </label>
                        <input type="date" id="executive-action-date" class="input-field-enhanced w-full">
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-file-text text-purple-600"></i>
                            Veto Reason (if applicable)
                        </label>
                        <textarea id="veto-reason" class="input-field-enhanced w-full" rows="3" placeholder="Enter veto reason..."></textarea>
                    </div>

                    <button onclick="saveExecutiveAction()" class="btn-primary-enhanced w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                        <i class="bi bi-save mr-2"></i>Save Executive Action
                    </button>
                </div>
            </div>

            <!-- 3. Publication & Effectivity Tracking -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fade-in-up animation-delay-200">
                <div class="flex items-center gap-3 mb-6">
                    <div class="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-md">
                        <i class="bi bi-newspaper text-white text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">Publication & Effectivity</h3>
                        <p class="text-sm text-gray-500">Your system manages</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-newspaper text-amber-600"></i>
                            Publication Method
                        </label>
                        <select id="publication-method" class="input-field-enhanced w-full">
                            <option value="">-- Select Method --</option>
                            <option value="official-gazette">Official Gazette</option>
                            <option value="local-newspaper">Local Newspaper</option>
                            <option value="bulletin-board">Bulletin Board Posting</option>
                            <option value="website">Official Website</option>
                        </select>
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-calendar-check text-amber-600"></i>
                            Publication Date
                        </label>
                        <input type="date" id="publication-date" class="input-field-enhanced w-full">
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-calendar-event text-amber-600"></i>
                            Effectivity Date
                        </label>
                        <input type="date" id="effectivity-date" class="input-field-enhanced w-full">
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-file-text text-amber-600"></i>
                            Publication Reference
                        </label>
                        <input type="text" id="publication-reference" class="input-field-enhanced w-full" placeholder="e.g., Official Gazette Vol. 120 No. 15">
                    </div>

                    <button onclick="savePublication()" class="btn-primary-enhanced w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                        <i class="bi bi-save mr-2"></i>Save Publication Details
                    </button>
                </div>
            </div>

            <!-- 4. Enactment Status Management -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fade-in-up animation-delay-300">
                <div class="flex items-center gap-3 mb-6">
                    <div class="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md">
                        <i class="bi bi-check-circle text-white text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">Enactment Status Management</h3>
                        <p class="text-sm text-gray-500">Your system manages</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-info-circle text-green-600"></i>
                            Overall Status
                        </label>
                        <select id="enactment-status" class="input-field-enhanced w-full">
                            <option value="in-progress">In Progress</option>
                            <option value="enacted">Enacted</option>
                            <option value="vetoed">Vetoed</option>
                            <option value="repealed">Repealed</option>
                            <option value="amended">Amended</option>
                        </select>
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-hash text-green-600"></i>
                            Ordinance/Resolution Number
                        </label>
                        <input type="text" id="enactment-number" class="input-field-enhanced w-full" placeholder="e.g., Ordinance No. 2025-001">
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-calendar-check text-green-600"></i>
                            Enactment Date
                        </label>
                        <input type="date" id="enactment-date" class="input-field-enhanced w-full">
                    </div>

                    <div>
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <i class="bi bi-file-text text-green-600"></i>
                            Remarks/Notes
                        </label>
                        <textarea id="enactment-remarks" class="input-field-enhanced w-full" rows="3" placeholder="Enter any additional remarks..."></textarea>
                    </div>

                    <button onclick="saveEnactmentStatus()" class="btn-primary-enhanced w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                        <i class="bi bi-save mr-2"></i>Save Status
                    </button>
                </div>
            </div>
        </div>

        <!-- Records Table -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-6 animate-fade-in-up animation-delay-400">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-800">Approval & Enactment Records</h3>
                <button onclick="exportRecords()" class="btn-outline">
                    <i class="bi bi-download mr-2"></i>Export Records
                </button>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Voting Result</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Executive Action</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publication</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${docs.slice(0, 5).map(doc => `
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4 text-sm font-medium text-gray-900">${doc.reference}</td>
                                <td class="px-6 py-4 text-sm text-gray-700">
                                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Passed</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-700">
                                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Approved</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-700">Published</td>
                                <td class="px-6 py-4 text-sm text-gray-700">
                                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Enacted</span>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <button onclick="viewEnactmentDetails(${doc.id})" class="text-red-600 hover:text-red-700" title="View Details">
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
}

// Save Functions
function saveVotingResults() {
    const docId = document.getElementById('voting-doc-select').value;
    if (!docId) {
        showToast("Please select a document first", "error");
        return;
    }
    showToast("Voting results imported successfully!", "success");
}

function saveExecutiveAction() {
    showToast("Executive action saved successfully!", "success");
}

function savePublication() {
    showToast("Publication details saved successfully!", "success");
}

function saveEnactmentStatus() {
    showToast("Enactment status updated successfully!", "success");
}

function viewEnactmentDetails(docId) {
    showToast("Viewing enactment details for document ID: " + docId, "info");
}

function exportRecords() {
    showToast("Exporting records...", "info");
}
