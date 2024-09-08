interface ResumeData {
    username: string;
    name: string;
    email: string;
    education: string;
    workExperience: string;
    skills: string;
}

// Form elements
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;

// Resume output elements
const outputName = document.getElementById('output-name') as HTMLElement;
const outputEmail = document.getElementById('output-email') as HTMLElement;
const outputEducation = document.getElementById('output-education') as HTMLElement;
const outputWork = document.getElementById('output-work') as HTMLElement;
const outputSkills = document.getElementById('output-skills') as HTMLElement;

// Shareable link elements
const resumeUrl = document.getElementById('resume-url') as HTMLElement;
const shareSection = document.getElementById('share-section') as HTMLElement;
const copyLinkBtn = document.getElementById('copy-link-btn') as HTMLButtonElement;
const downloadPdfBtn = document.getElementById('download-pdf-btn') as HTMLButtonElement;

// Helper function to validate form inputs
function validateForm(data: ResumeData): boolean {
    const { username, name, email, education, workExperience, skills } = data;
    
    if (!username || !name || !email || !education || !workExperience || !skills) {
        alert('Please fill out all fields');
        return false;
    }
    return true;
}

// Generate unique URL based on username
function generateUniqueUrl(username: string): string {
    const host = window.location.hostname; // Current domain
    return `https://${username}.${host}/resume`;
}

// Populate resume with form data
function generateResume(data: ResumeData): void {
    outputName.textContent = data.name;
    outputEmail.textContent = data.email;
    outputEducation.textContent = data.education;
    outputWork.textContent = data.workExperience;
    outputSkills.textContent = data.skills;

    // Display the generated unique URL
    const uniqueUrl = generateUniqueUrl(data.username);
    resumeUrl.textContent = uniqueUrl;
    shareSection.style.display = 'block'; // Show the share/download section
}

// Make a section editable when clicked
function makeEditable(element: HTMLElement): void {
    element.addEventListener('click', () => {
        element.contentEditable = 'true';
        element.focus();
    });

    // Save changes on blur (losing focus)
    element.addEventListener('blur', () => {
        element.contentEditable = 'false';
    });

    // Save changes on 'Enter' key press
    element.addEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            element.blur(); // Force blur to save changes
            event.preventDefault(); // Prevent adding a new line
        }
    });
}

// Initialize editable behavior for all resume sections
function initializeEditableFields(): void {
    [outputName, outputEmail, outputEducation, outputWork, outputSkills].forEach(makeEditable);
}

// Copy link to clipboard
function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
        alert('Link copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy link.');
    });
}

// Download resume as PDF using html2pdf
declare var html2pdf: any; // Declare html2pdf as any to avoid TypeScript issues

function downloadResumeAsPDF(): void {
    const element = document.getElementById('resume-output') as HTMLElement;
    
    // Check if element exists before generating PDF
    if (element) {
        html2pdf()
            .from(element)
            .save('resume.pdf'); // Save the resume as 'resume.pdf'
    } else {
        console.error('Resume element not found.');
    }
}


// Form submission handler
resumeForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    // Extract form data
    const formData: ResumeData = {
        username: (document.getElementById('username') as HTMLInputElement).value,
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        education: (document.getElementById('education') as HTMLInputElement).value,
        workExperience: (document.getElementById('work') as HTMLInputElement).value,
        skills: (document.getElementById('skills') as HTMLInputElement).value
    };

    // Validate form and generate resume
    if (validateForm(formData)) {
        generateResume(formData);
        initializeEditableFields(); // Enable inline editing for resume fields
    }
});

// Copy link button event listener
copyLinkBtn.addEventListener('click', () => {
    const url = resumeUrl.textContent as string;
    if (url) {
        copyToClipboard(url);
    }
});

// Download PDF button event listener
downloadPdfBtn.addEventListener('click', downloadResumeAsPDF);
