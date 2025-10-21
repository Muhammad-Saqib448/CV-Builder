 document.addEventListener('DOMContentLoaded', () => {
            // Add initial entries for each section to guide the user
            addEntry('education-entries', 'education');
            addEntry('experience-entries', 'experience');
            addEntry('skills-entries', 'skill');
            addEntry('languages-entries', 'language');
            addEntry('references-entries', 'reference');
            
            // Set up event listeners for all form elements
            setupEventListeners();
        });

        function setupEventListeners() {
            // Listen for any input change on the form to update the preview
            const form = document.querySelector('.bg-white.p-6');
            form.addEventListener('input', updatePreview);

            // Special listener for file input
            document.getElementById('profile-picture').addEventListener('change', updateProfilePicture);
        }

        function updateProfilePicture(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('cv-profile-picture').src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }

        function addEntry(containerId, type) {
            const container = document.getElementById(containerId);
            const entryDiv = document.createElement('div');
            entryDiv.className = 'p-4 border rounded-md relative entry-item';

            let content = '';
            switch(type) {
                case 'education':
                    content = `
                        <button onclick="removeEntry(this)" class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold">X</button>
                        <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 mb-2 text-sm" placeholder="Degree/Certificate">
                        <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 mb-2 text-sm" placeholder="Institution/University">
                        <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm" placeholder="Graduation Year">
                    `;
                    break;
                case 'experience':
                    content = `
                        <button onclick="removeEntry(this)" class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold">X</button>
                        <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 mb-2 text-sm" placeholder="Job Title">
                        <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 mb-2 text-sm" placeholder="Company">
                        <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 mb-2 text-sm" placeholder="Dates (e.g., Jan 2020 - Present)">
                        <textarea class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm" placeholder="Responsibilities and Achievements" rows="3"></textarea>
                    `;
                    break;
                case 'skill':
                     content = `
                        <div class="flex items-center">
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm" placeholder="e.g., JavaScript">
                            <button onclick="removeEntry(this)" class="ml-2 text-red-500 hover:text-red-700 font-bold">X</button>
                        </div>
                    `;
                    break;
                case 'language':
                    content = `
                        <div class="flex items-center">
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm" placeholder="e.g., English (Fluent)">
                            <button onclick="removeEntry(this)" class="ml-2 text-red-500 hover:text-red-700 font-bold">X</button>
                        </div>
                    `;
                    break;
                 case 'reference':
                    content = `
                        <button onclick="removeEntry(this)" class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold">X</button>
                        <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 mb-2 text-sm" placeholder="Reference Name">
                        <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm" placeholder="Contact Information">
                    `;
                    break;
            }
            entryDiv.innerHTML = content;
            container.appendChild(entryDiv);
            updatePreview(); // Update preview after adding a new field
        }

        function removeEntry(button) {
            button.closest('.entry-item, .flex').remove();
            updatePreview();
        }

        function updatePreview() {
            // Personal Info
            document.getElementById('cv-full-name').textContent = document.getElementById('full-name').value || 'Your Name';
            document.getElementById('cv-email').textContent = document.getElementById('email').value || 'your.email@example.com';
            document.getElementById('cv-phone').textContent = document.getElementById('phone').value || '+1 234 567 890';
            document.getElementById('cv-address').textContent = document.getElementById('address').value || 'City, Country';

            // Education
            const educationList = document.getElementById('cv-education-list');
            educationList.innerHTML = '';
            document.querySelectorAll('#education-entries .entry-item').forEach(item => {
                const inputs = item.querySelectorAll('input');
                const degree = inputs[0].value;
                const institution = inputs[1].value;
                const year = inputs[2].value;
                if (degree || institution || year) {
                    educationList.innerHTML += `
                        <div class="mb-3">
                            <h3 class="font-semibold text-md text-gray-800">${degree || 'Degree'}</h3>
                            <p class="text-sm text-gray-600">${institution || 'Institution'}</p>
                            <p class="text-sm text-gray-500">${year || 'Year'}</p>
                        </div>
                    `;
                }
            });

            // Experience
            const experienceList = document.getElementById('cv-experience-list');
            experienceList.innerHTML = '';
            document.querySelectorAll('#experience-entries .entry-item').forEach(item => {
                const title = item.querySelector('input:nth-of-type(1)').value;
                const company = item.querySelector('input:nth-of-type(2)').value;
                const dates = item.querySelector('input:nth-of-type(3)').value;
                const responsibilities = item.querySelector('textarea').value.replace(/\n/g, '<br>');
                if (title || company || dates) {
                    experienceList.innerHTML += `
                        <div class="mb-4">
                            <h3 class="font-semibold text-md text-gray-800">${title || 'Job Title'}</h3>
                            <p class="text-sm text-gray-600">${company || 'Company'} | ${dates || 'Dates'}</p>
                            <p class="text-sm text-gray-700 mt-1">${responsibilities || 'Responsibilities...'}</p>
                        </div>
                    `;
                }
            });

            // Skills
            const skillsList = document.getElementById('cv-skills-list');
            skillsList.innerHTML = '';
            document.querySelectorAll('#skills-entries input').forEach(input => {
                const skill = input.value;
                if (skill) {
                    skillsList.innerHTML += `<li>${skill}</li>`;
                }
            });

            // Languages
            const languagesList = document.getElementById('cv-languages-list');
            languagesList.innerHTML = '';
            document.querySelectorAll('#languages-entries input').forEach(input => {
                const language = input.value;
                if (language) {
                    languagesList.innerHTML += `<li>${language}</li>`;
                }
            });
            
             // References
            const referencesList = document.getElementById('cv-references-list');
            referencesList.innerHTML = '';
            document.querySelectorAll('#references-entries .entry-item').forEach(item => {
                const inputs = item.querySelectorAll('input');
                const name = inputs[0].value;
                const contact = inputs[1].value;
                if (name || contact) {
                    referencesList.innerHTML += `
                        <div>
                            <p class="font-semibold text-gray-800">${name || 'Reference Name'}</p>
                            <p class="text-sm text-gray-600">${contact || 'Contact Info'}</p>
                        </div>
                    `;
                }
            });
        }
    