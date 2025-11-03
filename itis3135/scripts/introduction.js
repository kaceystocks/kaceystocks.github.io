//clear button all fields
function clearFormFields(){
    const formElement = document.getElementById('form');
    if (formElement){
        const inputs = formElement.querySelectorAll('input[type="text"], textarea');
        inputs.forEach((input) => {
            input.value = '';
        });
        const fileInput = document.getElementById('image');
        if (fileInput) {
            fileInput.value = ''; // This clears the selected file path
        }
    }
}

// Get a reference to the form and the main container
const form = document.getElementById('form');
const mainContainer = document.querySelector('main');
const coursesFieldset = document.getElementById('courses-fieldset');


// Global counter for adding new courses
let courseCount = 5; 

// 1. Add an eventListener to the form element to prevent default submission and handle data
form.addEventListener('submit', function(event) {
    // Prevent the default form submission (stops page reload)
    event.preventDefault(); 
    
    // Basic form validation check (checks for required fields)
    if (!form.checkValidity()) {
        alert("Please fill out all required fields.");
        return;
    }

    // --- Gather the data from the form ---
    
    // Helper function to safely get value from an input or textarea
    const getVal = (id) => document.getElementById(id).value;
    
    // Collect Standard Fields
    const firstName = getVal('firstName');
    const middleInitial = getVal('middleInitial');
    const lastName = getVal('lastName');
    const preferredName = getVal('preferredName');
    const mascotAdjective = getVal('mascotAdjective');
    const mascotAnimal = getVal('mascotAnimal');
    const divider = getVal('divider');
    const imageCaption = getVal('imageCaption');
    // Ensure the textarea has the ID 'personalStatement'
    const personalStatement = getVal('personalStatement'); 
    const personalBackground = getVal('personalBackground');
    const professionalBackground = getVal('professionalBackground');
    const academicBackground = getVal('academicBackground');
    const primaryComputer = getVal('primaryComputer');
    const quote = getVal('quote');
    const author = getVal('author');
    
    // --- Collect Course Data (using classes) ---
    // Select all fieldsets with the class 'course-group'
    const courseGroups = document.querySelectorAll('.course-group');
    const courses = [];
    courseGroups.forEach((group) => {
        // Use class selectors within the course-group fieldset
        const dept = group.querySelector('.dept-input') ? group.querySelector('.dept-input').value : '';
        const num = group.querySelector('.num-input') ? group.querySelector('.num-input').value : '';
        const name = group.querySelector('.name-input') ? group.querySelector('.name-input').value : '';
        const reason = group.querySelector('.reason-input') ? group.querySelector('.reason-input').value : '';
        
        // Only add courses that have at least some data
        if (dept || num || name || reason) {
            courses.push({ dept, num, name, reason });
        }
    });

    // --- Build the Introduction Content ---
    let outputHTML = `
        <main>
            <h2>Introduction Form</h2>
            <section>
                <h3>${firstName} ${middleInitial} ${lastName} ${preferredName ? `(${preferredName})` : ''} ${divider} ${mascotAdjective} ${mascotAnimal}</h3>
    `;

    // Handle Image Display (if a file was selected)
    const imageInput = document.getElementById('image');
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        // Create a temporary URL for the uploaded image file
        const imageURL = URL.createObjectURL(file);
        outputHTML += `
            <figure style="text-align: center;">
                <img src="${imageURL}" alt="${imageCaption}" style="max-width: 300px; height: auto; border: 1px solid #ccc;"/>
                <figcaption><i>${imageCaption}</i></figcaption>
            </figure>
        `;
    } else {
        outputHTML += `
            <figure style="text-align: center;">
                <img src="images/introductionpic.jpg" alt="Kacey Stocks" ${imageCaption}"/>
                <figcaption><em>${imageCaption}</em></figcaption>
            </figure>
        `;
    }

    // Add remaining sections
    outputHTML += `
        <p>${personalStatement}</p>
        
        <ul>
            <li><strong>Personal Background: </strong>${personalBackground}</li>
            <li><strong>Professional Background: </strong>${professionalBackground}</li>
            <li><strong>Academic Background: </strong>${academicBackground}</li>
            <li><strong>Primary Computer: </strong>${primaryComputer}</li>
            <li><strong>Courses I'm Taking & Why:</strong>
                <ul>
    `;

    // Courses List
    courses.forEach((course) => {
        outputHTML += `
            <li><strong>${course.dept} ${course.num} - ${course.name}:</strong> ${course.reason}</li>
        `;
    });
    outputHTML += `
        </ul>
            </li>
        </ul>
        
        <p style="text-align: center;">&quot;${quote}&quot;</p>
        <p style="text-align: center;">- ${author}</p>
        </section>
        </main>
    `;

    // Replace the entire content of the <main> tag with the new introduction
    mainContainer.innerHTML = outputHTML;
});

// 3. Function to remove a course fieldset
function removeCourse(buttonElement) {
    // The button's parent is the <fieldset class="course-group">
    const courseFieldset = buttonElement.parentNode;
    courseFieldset.remove();
}

// 4. Function to add new course text boxes with a delete button
function addCourse() {
    courseCount++;
    const newCourseFieldset = document.createElement('fieldset');
    newCourseFieldset.classList.add('course-group');

    newCourseFieldset.innerHTML = `
        <label>Department: </label>
        <input type="text" class="dept-input" placeholder="Department"/>
        <label>Number: </label>
        <input type="text" class="num-input" placeholder="Number"/>
        <label>Name: </label>
        <input type="text" class="name-input" placeholder="Name"/>
        <label>Reason: </label>
        <input type="text" class="reason-input" placeholder="Reason"/>
        <button type="button" class="delete-button" onclick="removeCourse(this)">Remove Course</button>
    `;
    
    // Insert the new course fieldset right before the 'Add Course' button
    coursesFieldset.insertBefore(newCourseFieldset, document.getElementById('add-course-button'));
}

// Event listener for the 'Add Course' button
document.getElementById('add-course-button').addEventListener('click', addCourse);

// NOTE: The 'Reset' button handles resetting form controls to their initial/default values (using the 'value' attribute).
// The 'Submit' button handles the validation and replacement logic.