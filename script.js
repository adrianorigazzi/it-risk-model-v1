// Store all assessed risks
let risks = [];

// DOM Elements
const riskForm = document.getElementById('riskForm');
const resultsSection = document.getElementById('resultsSection');
const riskResults = document.getElementById('riskResults');
const riskList = document.getElementById('riskList');
const riskMatrix = document.getElementById('riskMatrix');

// Load risks from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadRisksFromStorage();
    displayRiskList();
});

// Form submission handler
riskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const riskData = {
        id: Date.now(),
        name: document.getElementById('riskName').value.trim(),
        description: document.getElementById('riskDescription').value.trim(),
        category: document.getElementById('category').value,
        likelihood: parseInt(document.getElementById('likelihood').value),
        impact: parseInt(document.getElementById('impact').value),
        mitigation: document.getElementById('mitigation').value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // Calculate risk score and level
    const assessment = assessRisk(riskData.likelihood, riskData.impact);
    riskData.score = assessment.score;
    riskData.level = assessment.level;
    riskData.recommendation = assessment.recommendation;
    
    // Add to risks array
    risks.push(riskData);
    
    // Save to localStorage
    saveRisksToStorage();
    
    // Display results
    displayResults(riskData);
    
    // Update risk list
    displayRiskList();
    
    // Highlight cell in matrix
    highlightMatrixCell(riskData.likelihood, riskData.impact);
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Reset form
    riskForm.reset();
});

// Risk assessment function
function assessRisk(likelihood, impact) {
    const score = likelihood * impact;
    let level, recommendation;
    
    if (score <= 6) {
        level = 'Low';
        recommendation = 'Accept and monitor this risk. Implement basic controls and review periodically.';
    } else if (score <= 12) {
        level = 'Medium';
        recommendation = 'Mitigate this risk. Develop and implement control measures to reduce likelihood or impact.';
    } else if (score <= 19) {
        level = 'High';
        recommendation = 'Urgent action required. Prioritize mitigation efforts and implement comprehensive controls immediately.';
    } else {
        level = 'Critical';
        recommendation = 'Immediate action required. This risk requires executive attention and immediate mitigation strategies.';
    }
    
    return { score, level, recommendation };
}

// Display assessment results
function displayResults(riskData) {
    resultsSection.style.display = 'block';
    
    const html = `
        <div class="risk-score risk-level-${riskData.level.toLowerCase()}">
            Risk Score: ${riskData.score} - ${riskData.level} Risk
        </div>
        <div class="result-details">
            <p><strong>Risk Name:</strong> ${riskData.name}</p>
            <p><strong>Category:</strong> ${capitalizeFirst(riskData.category)}</p>
            <p><strong>Description:</strong> ${riskData.description}</p>
            <p><strong>Likelihood:</strong> ${riskData.likelihood}/5</p>
            <p><strong>Impact:</strong> ${riskData.impact}/5</p>
            ${riskData.mitigation ? `<p><strong>Mitigation Strategy:</strong> ${riskData.mitigation}</p>` : ''}
            <p><strong>Recommendation:</strong> ${riskData.recommendation}</p>
        </div>
    `;
    
    riskResults.innerHTML = html;
}

// Display list of all assessed risks
function displayRiskList() {
    if (risks.length === 0) {
        riskList.innerHTML = '<p class="no-risks">No risks assessed yet. Use the form above to assess your first risk.</p>';
        return;
    }
    
    // Sort risks by score (highest first)
    const sortedRisks = [...risks].sort((a, b) => b.score - a.score);
    
    const html = sortedRisks.map(risk => `
        <div class="risk-item">
            <div class="risk-item-header">
                <div class="risk-item-title">${risk.name}</div>
                <div class="risk-item-badge risk-level-${risk.level.toLowerCase()}">
                    ${risk.level} Risk (${risk.score})
                </div>
            </div>
            <div class="risk-item-content">
                <p><strong>Category:</strong> ${capitalizeFirst(risk.category)}</p>
                <p><strong>Description:</strong> ${risk.description}</p>
                <p><strong>Likelihood:</strong> ${risk.likelihood}/5 | <strong>Impact:</strong> ${risk.impact}/5</p>
                ${risk.mitigation ? `<p><strong>Mitigation:</strong> ${risk.mitigation}</p>` : ''}
                <p><strong>Assessed:</strong> ${formatDate(risk.timestamp)}</p>
            </div>
        </div>
    `).join('');
    
    riskList.innerHTML = html;
}

// Highlight cell in risk matrix
function highlightMatrixCell(likelihood, impact) {
    // Remove previous highlights
    document.querySelectorAll('.matrix .cell').forEach(cell => {
        cell.classList.remove('active');
    });
    
    // Calculate which cell to highlight
    // Matrix rows are reversed (5 is top, 1 is bottom)
    const rowIndex = 5 - impact; // 0-indexed from top
    const colIndex = likelihood; // 1-indexed, so we add 1 for the header
    
    // Find and highlight the cell
    const rows = riskMatrix.querySelectorAll('tbody tr');
    if (rows[rowIndex]) {
        const cells = rows[rowIndex].querySelectorAll('.cell');
        if (cells[likelihood - 1]) {
            cells[likelihood - 1].classList.add('active');
            
            // Scroll to matrix
            setTimeout(() => {
                riskMatrix.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    }
}

// Add click event to matrix cells for demonstration
document.querySelectorAll('.matrix .cell').forEach(cell => {
    cell.addEventListener('click', function() {
        const score = parseInt(this.getAttribute('data-score'));
        
        // Calculate likelihood and impact from score and position
        const row = this.parentElement;
        const rowIndex = Array.from(row.parentElement.children).indexOf(row);
        const colIndex = Array.from(row.children).indexOf(this) - 1;
        
        const impact = 5 - rowIndex;
        const likelihood = colIndex + 1;
        
        // Show tooltip or info
        alert(`Risk Score: ${score}\nLikelihood: ${likelihood}/5\nImpact: ${impact}/5\n\nClick cells to see how different combinations affect the risk level.`);
    });
});

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// LocalStorage functions
function saveRisksToStorage() {
    try {
        localStorage.setItem('itRisks', JSON.stringify(risks));
    } catch (e) {
        console.error('Failed to save risks to localStorage:', e);
    }
}

function loadRisksFromStorage() {
    try {
        const stored = localStorage.getItem('itRisks');
        if (stored) {
            risks = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load risks from localStorage:', e);
        risks = [];
    }
}

// Export functionality (optional)
function exportRisksToCSV() {
    if (risks.length === 0) {
        alert('No risks to export.');
        return;
    }
    
    const headers = ['Name', 'Category', 'Description', 'Likelihood', 'Impact', 'Score', 'Level', 'Mitigation', 'Date'];
    const rows = risks.map(risk => [
        risk.name,
        risk.category,
        risk.description,
        risk.likelihood,
        risk.impact,
        risk.score,
        risk.level,
        risk.mitigation || '',
        formatDate(risk.timestamp)
    ]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'it-risks-assessment-' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Clear all risks (with confirmation)
function clearAllRisks() {
    if (confirm('Are you sure you want to clear all assessed risks? This action cannot be undone.')) {
        risks = [];
        saveRisksToStorage();
        displayRiskList();
        resultsSection.style.display = 'none';
        
        // Remove matrix highlights
        document.querySelectorAll('.matrix .cell').forEach(cell => {
            cell.classList.remove('active');
        });
        
        alert('All risks have been cleared.');
    }
}

// Make functions available globally for potential future use
window.exportRisks = exportRisksToCSV;
window.clearRisks = clearAllRisks;
