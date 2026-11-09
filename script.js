
let patients = JSON.parse(
    localStorage.getItem("patients")
) || [];

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    document.getElementById(pageId).classList.remove("hidden");
}

function addPatient() {
    let name = document.getElementById("patientName").value.trim();
    let age = document.getElementById("patientAge").value;
    let disease = document.getElementById("patientDisease").value.trim();

    if (!name || !age || !disease || Number(age) <= 0) {
        alert("Please enter valid patient details");
        return;
    }

    patients.push({
        id: Date.now(),
        name: name,
        age: age,
        disease: disease
    });

    savePatients();

    document.getElementById("patientName").value = "";
    document.getElementById("patientAge").value = "";
    document.getElementById("patientDisease").value = "";
}

function savePatients() {
    localStorage.setItem("patients", JSON.stringify(patients));
    displayPatients();
}

function displayPatients() {
    let table = document.getElementById("patientTable");

    table.innerHTML = "";

    patients.forEach(patient => {
        table.innerHTML += `
            <tr>
                <td>${escapeHTML(patient.name)}</td>
                <td>${escapeHTML(patient.age)}</td>
                <td>${escapeHTML(patient.disease)}</td>
                <td>
                    <button onclick="deletePatient(${patient.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("patientCount").innerText =
        patients.length;
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function deletePatient(id) {
    patients = patients.filter(patient => patient.id !== id);
    savePatients();
}

displayPatients();
