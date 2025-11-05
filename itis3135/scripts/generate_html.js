// Function to collect all course data and format it into HTML list items
function generateCoursesHTML() {
    let coursesOutputHTML = '';
    const courseGroups = document.querySelectorAll('.course-group');

    courseGroups.forEach((group, index) => {
        // Inputs added dynamically use classes; hardcoded ones use IDs but we give them classes in the HTML now
        const department = group.querySelector('.dept-input').value.trim();
        const number = group.querySelector('.num-input').value.trim();
        const name = group.querySelector('.name-input').value.trim();
        const reason = group.querySelector('.reason-input').value.trim();

        if (department || number || name || reason) {
            coursesOutputHTML += `
            <li>
                <strong>${department} ${number} - ${name}</strong>
                <p><em>Reason:</em> ${reason}</p>
            </li>`;
        }
    });

    // Wrap the list items in an unordered list tag
    if (coursesOutputHTML) {
        return `
        <h2>Courses I'm Taking & Why</h2>
        <ul>${coursesOutputHTML}
        </ul>`;
    }
    return '';
}


// Function to collect all data and generate the full introduction HTML string
function createIntroductionHTML() {
    // --- 1. Get Values from Simple Fields ---
    const firstName = document.getElementById('firstName').value.trim();
    const middleInitial = document.getElementById('middleInitial').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const preferredName = document.getElementById('preferredName').value.trim();
    const mascotAdjective = document.getElementById('mascotAdjective').value.trim();
    const mascotAnimal = document.getElementById('mascotAnimal').value.trim();
    const divider = document.getElementById('divider').value.trim();
    const imageCaption = document.getElementById('imageCaption').value.trim();
    const personalStatement = document.getElementById('personalStatement').value.trim();
    const personalBackground = document.getElementById('personalBackground').value.trim();
    const professionalBackground = document.getElementById('professionalBackground').value.trim();
    const academicBackground = document.getElementById('academicBackground').value.trim();
    const primaryComputer = document.getElementById('primaryComputer').value.trim();
    const quote = document.getElementById('quote').value.trim();
    const author = document.getElementById('author').value.trim();

    // --- 2. Handle Image Upload (using default image if none uploaded) ---
    let imageHTML = '';
    const imageInput = document.getElementById('image');
    const defaultImagePath = 'images/introductionpic.jpg'; 
    let imageURL = defaultImagePath; 

    if (imageInput.files.length > 0) {
        // Use uploaded image
        const file = imageInput.files[0];
        imageURL = URL.createObjectURL(file);
    } 

    imageHTML = `
        <figure style="text-align: center;">
            <img src="${imageURL}" alt="User Image" style="max-width: 300px; height: auto; border: 1px solid #ccc;"/>
            <figcaption><i>${imageCaption}</i></figcaption>
        </figure>`;
    

    // --- 3. Generate Course Section HTML ---
    const coursesHTML = generateCoursesHTML();

    // --- 4. Assemble Final HTML String ---
    const finalHTML = `
<section id="introduction">
    <h1>${firstName} ${middleInitial}. ${lastName} ${preferredName ? `(${preferredName})` : ''} ${mascotAdjective} ${mascotAnimal}</h1>

    ${imageHTML}

    <p>${personalStatement}</p>

    <ul>
        <li><strong>Personal Background:</strong> ${personalBackground}</li>
        <li><strong>Professional Background:</strong> ${professionalBackground}</li>
        <li><strong>Academic Background:</strong> ${academicBackground}</li>
        <li><strong>Primary Computer:</strong> ${primaryComputer}</li>
    </ul>

    ${coursesHTML}

    <hr>
    <blockquote style="margin: 20px; padding: 10px; border-left: 5px solid #ccc;">
        "${quote}" ${divider} ${author}
    </blockquote>
    <hr>
</section>`;
    
    return finalHTML.trim();
}


// Main function called by the "Generate HTML" button
function generateAndDisplayHTML() {
    const formElement = document.getElementById('form');
    const outputSection = document.getElementById('output-section');
    
    // 1. Generate the HTML content
    const htmlCode = createIntroductionHTML();
    
    // 2. Hide the form and prepare the output area
    formElement.style.display = 'none'; 
    
    // 3. Create the structure for syntax highlighting
    // The <pre><code> structure is required by Highlight.js
    outputSection.innerHTML = `
        <h2>Generated HTML Code</h2>
        <section style="background-color: #f7f7f7; padding: 15px; border: 1px solid #ddd;">
            <pre><code class="html"></code></pre>
        </section>
        <button onclick="window.location.reload()">Return to Form</button>
    `;
    
    // 4. Insert the HTML code into the <code> element
    const codeElement = outputSection.querySelector('code');
    // Using textContent to prevent the code from being rendered as actual HTML
    codeElement.textContent = htmlCode;
    
    // 5. Apply syntax highlighting with Highlight.js
    // Call hljs.highlightElement() on the newly added <code> element
    hljs.highlightElement(codeElement);
}