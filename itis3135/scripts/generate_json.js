function generateJson() {
    // 1. Collect all form data
    const formData = {};
    const form = document.getElementById('form');

    // Helper to get text input values
    const getInputValue = (id) => document.getElementById(id) ? document.getElementById(id).value : '';

    // --- Name Information ---
    formData.nameInformation = {
        firstName: getInputValue('firstName'),
        middleInitial: getInputValue('middleInitial'),
        lastName: getInputValue('lastName'),
        preferredName: getInputValue('preferredName') || 'N/A',
        mascot: {
            adjective: getInputValue('mascotAdjective'),
            animal: getInputValue('mascotAnimal')
        },
        divider: getInputValue('divider')
    };

    // --- Image and Caption ---
    formData.imageAndCaption = {
        imageSource: 'images/introductionpic.jpg', // Hardcoded from your HTML example
        imageCaption: getInputValue('imageCaption')
    };

    // --- Personal Statement ---
    formData.personalStatement = getInputValue('personalStatement').trim();

    // --- Background ---
    formData.background = {
        personalBackground: getInputValue('personalBackground').trim(),
        professionalBackground: getInputValue('professionalBackground').trim(),
        academicBackground: getInputValue('academicBackground').trim(),
        primaryComputer: getInputValue('primaryComputer')
    };

    // --- Courses Taking ---
    const courses = [];
    const courseGroups = document.querySelectorAll('.course-group');
    courseGroups.forEach((group, index) => {
        // You'll need to update your input IDs to use the `name` attribute in a way that
        // makes them easy to find within each course group, or stick to a pattern:
        const dept = group.querySelector(`#dept${index + 1}`).value;
        const num = group.querySelector(`#num${index + 1}`).value;
        const name = group.querySelector(`#name${index + 1}`).value;
        const reason = group.querySelector(`#reason${index + 1}`).value;
        
        // Only include non-empty courses (if any input is missing, it's a structural issue)
        if (dept || num || name || reason) {
                courses.push({
                department: dept,
                number: num,
                name: name,
                reason: reason.trim()
            });
        }
    });
    formData.coursesTaking = courses;

    // --- Quote ---
    formData.quote = {
        quote: getInputValue('quote'),
        author: getInputValue('author')
    };

    // 2. Convert the data object to a pretty-printed JSON string
    // The 'null' argument is for a replacer function (we don't need one), 
    // and '2' sets the indentation level to 2 spaces for readability.
    const jsonString = JSON.stringify(formData, null, 2);

    // 3. Create the HTML structure for the highlighted code
    const jsonOutputHTML = `
        <section id="json-output-section" style="text-align: left;">
            <h2>Generated JSON</h2>
            <pre><code class="language-json" id="highlighted-json">${jsonString}</code></pre>
            <button onclick="location.reload()">Go Back to Form</button>
        </section>
    `;

    // 4. Replace the form with the new JSON output
    const container = form.parentElement; // Assumes the form is directly inside a parent container
    form.style.display = 'none';
    container.innerHTML = jsonOutputHTML;

    // 5. Apply Highlight.js to the new content
    // Check if hljs is defined before calling
    const codeBlock = document.getElementById('highlighted-json');
    if (typeof hljs !== 'undefined' && codeBlock) {
        hljs.highlightElement(codeBlock);
    } else {
        console.error('Highlight.js not loaded or element not found.');
    }
}

// Add event listener to the "Generate JSON" button
document.addEventListener('DOMContentLoaded', () => {
    // This assumes the "Generate JSON" button has the ID 'generate-json-button' 
    // as suggested in your prompt and is already in your HTML.
    const generateJsonButton = document.getElementById('generate-json-button');
    if (generateJsonButton) {
        generateJsonButton.addEventListener('click', generateJson);
    }
});