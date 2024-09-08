// Form elements
var resumeForm = document.getElementById('resume-form');
// Resume output elements
var outputName = document.getElementById('output-name');
var outputEmail = document.getElementById('output-email');
var outputEducation = document.getElementById('output-education');
var outputWork = document.getElementById('output-work');
var outputSkills = document.getElementById('output-skills');
// Shareable link elements
var resumeUrl = document.getElementById('resume-url');
var shareSection = document.getElementById('share-section');
var copyLinkBtn = document.getElementById('copy-link-btn');
var downloadPdfBtn = document.getElementById('download-pdf-btn');
// Helper function to validate form inputs
function validateForm(data) {
    var username = data.username, name = data.name, email = data.email, education = data.education, workExperience = data.workExperience, skills = data.skills;
    if (!username || !name || !email || !education || !workExperience || !skills) {
        alert('Please fill out all fields');
        return false;
    }
    return true;
}
// Generate unique URL based on username
function generateUniqueUrl(username) {
    var host = window.location.hostname; // Current domain
    return "https://".concat(username, ".").concat(host, "/resume");
}
// Populate resume with form data
function generateResume(data) {
    outputName.textContent = data.name;
    outputEmail.textContent = data.email;
    outputEducation.textContent = data.education;
    outputWork.textContent = data.workExperience;
    outputSkills.textContent = data.skills;
    // Display the generated unique URL
    var uniqueUrl = generateUniqueUrl(data.username);
    resumeUrl.textContent = uniqueUrl;
    shareSection.style.display = 'block'; // Show the share/download section
}
// Make a section editable when clicked
function makeEditable(element) {
    element.addEventListener('click', function () {
        element.contentEditable = 'true';
        element.focus();
    });
    // Save changes on blur (losing focus)
    element.addEventListener('blur', function () {
        element.contentEditable = 'false';
    });
    // Save changes on 'Enter' key press
    element.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            element.blur(); // Force blur to save changes
            event.preventDefault(); // Prevent adding a new line
        }
    });
}
// Initialize editable behavior for all resume sections
function initializeEditableFields() {
    [outputName, outputEmail, outputEducation, outputWork, outputSkills].forEach(makeEditable);
}
// Copy link to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        alert('Link copied to clipboard!');
    }).catch(function () {
        alert('Failed to copy link.');
    });
}
function downloadResumeAsPDF() {
    var element = document.getElementById('resume-output');
    // Check if element exists before generating PDF
    if (element) {
        html2pdf()
            .from(element)
            .save('resume.pdf'); // Save the resume as 'resume.pdf'
    }
    else {
        console.error('Resume element not found.');
    }
}
// Form submission handler
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Extract form data
    var formData = {
        username: document.getElementById('username').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        education: document.getElementById('education').value,
        workExperience: document.getElementById('work').value,
        skills: document.getElementById('skills').value
    };
    // Validate form and generate resume
    if (validateForm(formData)) {
        generateResume(formData);
        initializeEditableFields(); // Enable inline editing for resume fields
    }
});
// Copy link button event listener
copyLinkBtn.addEventListener('click', function () {
    var url = resumeUrl.textContent;
    if (url) {
        copyToClipboard(url);
    }
});
// Download PDF button event listener
downloadPdfBtn.addEventListener('click', downloadResumeAsPDF);
