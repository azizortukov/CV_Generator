const avatarContainer = document.getElementById('avatarContainer');
const avatarInput = document.getElementById('avatarInput');
const avatarImage = document.getElementById('avatarImage');
const uploadButton = document.getElementById('uploadButton');
let experiences = {
    data: [],

    insertObject: function (newObject) {
        this.data.push(newObject);
    },

    removeObjectByName: function (name) {
        this.data = this.data.filter(obj => obj.name !== name);
    }
};
let educations = {
    data: [],

    insertObject: function (newObject) {
        this.data.push(newObject);
    },

    removeObjectByName: function (name) {
        this.data = this.data.filter(obj => obj.name !== name);
    }
};
let technologies = [];

avatarContainer.addEventListener('click', () => {
    avatarInput.click();
});

avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            avatarImage.src = e.target.result;
            uploadButton.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

function addTechnology() {
    var selectedTech = document.getElementById("technologies").value;
    technologies.push(selectedTech);
    drawTechnologies()
}

function drawTechnologies() {
    let innerHtml = '';
    technologies.map(item => {
        innerHtml += `<button class="btn btn-light mt-2 ms-2" onclick="removeTechnology('${item}')">${item}<i class="fa-regular fa-trash-can text-secondary ms-3">
                        </i></button>`
    })
    document.getElementById("techList").innerHTML = innerHtml;
}

function removeTechnology(name) {
    technologies = technologies.filter(item => item !== name);
    drawTechnologies();
}

function addEducation() {
    var college = document.getElementById("college").value.trim();
    var fromDate = document.getElementById("fromDate").value;
    var toDate = document.getElementById("toDate").value;
    var description = document.getElementById("description").value;

    if (!college || !fromDate || !toDate || !description) {
        alert("Please fill out all fields.");
        return;
    }

    document.getElementById("college").value = '';
    document.getElementById('fromDate').value = '';
    document.getElementById("toDate").value = '';
    document.getElementById("description").value = '';
    educations.insertObject({name: college, fromDate, toDate, description})
    drawEducations();
}

function drawEducations() {
    var educationList = document.getElementById("educationList");
    let innerHtml = '';
    educations.data.map(item => {
        innerHtml += `<div class="card p-3 mt-3" style="max-width: 800px">
                            <div class="d-flex justify-content-between" style="margin-bottom: 0">
                            <h5 style="font-weight: bold; margin-bottom: 0; max-width: 300px">${item.name}</h5>
                            <small class="mt-1 text-secondary">${formatDate(item.fromDate)} - ${formatDate(item.toDate)}</small>
                            <button class="btn btn-danger " onclick="removeElement('${item.name}', 'education')">Remove</button>
                            </div>
                            <small style="max-width:500px;">${item.description}</small>
                           </div>`
    })
    educationList.innerHTML = innerHtml;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

function addExperience() {
    var organization = document.getElementById("organization").value.trim();
    var fromDateExp = document.getElementById("fromDateExp").value;
    var toDateExp = document.getElementById("toDateExp").value;
    var description = document.getElementById("descriptionExp").value;

    if (!organization || !fromDateExp || !toDateExp || !description) {
        alert("Please fill out all fields.");
        return;
    }

    document.getElementById("organization").value = '';
    document.getElementById("fromDateExp").value = '';
    document.getElementById("toDateExp").value = '';
    document.getElementById("descriptionExp").value = '';
    experiences.insertObject({name: organization, fromDate: fromDateExp, toDate: toDateExp, description})
    drawExperiences()

}

function drawExperiences() {
    var experienceList = document.getElementById("experienceList");
    let innerHtml = '';
    experiences.data.map(item => {
        innerHtml += `<div class="card p-3 mt-3" style="max-width: 800px">
                            <div class="d-flex justify-content-between" style="margin-bottom: 0">
                            <h5 style="font-weight: bold; margin-bottom: 0; max-width: 300px">${item.name}</h5>
                            <small class="mt-1 ">(${new Date(item.fromDate).toDateString()}) - (${new Date(item.toDate).toDateString()})</small>
                            <button class="btn btn-danger " onclick="removeElement('${item.name}', 'education')">Remove</button>
                            </div>
                            <small style="max-width:500px;">${item.description}</small>
                           </div>`
    })
    experienceList.innerHTML = innerHtml;
}

function removeElement(name, category) {
    if (category === 'experience') {
        experiences.removeObjectByName(name)
        drawExperiences()
    } else if (category === 'education') {
        educations.removeObjectByName(name)
        drawEducations()
    }
}

async function generateCV() {
    let formData = new FormData();
    formData.append('file', avatarInput.files[0]);
    let details = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        technologies,
        educations: educations.data,
        experiences: experiences.data
    };
    formData.append('details', JSON.stringify(details));
    const resp = await axios({
        url: 'http://localhost:8080/api/generate_cv',
        method: 'POST',
        data: formData,
        responseType: 'blob'
    })
    console.log(resp.data)
    const url = window.URL.createObjectURL(new Blob([resp.data], {type: 'application/pdf'}));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `cv.pdf`);
    link.click();
}