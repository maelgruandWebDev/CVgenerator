document.getElementById("bgColorPicker").addEventListener("input", function() {
    document.getElementById("cv").style.backgroundColor = this.value;
});

document.getElementById("textColorPicker").addEventListener("input", function() {
    document.getElementById("cv").style.color = this.value;
});

document.getElementById("fontSelect").addEventListener("change", function() {
    document.getElementById("cv").style.fontFamily = this.value;
});

document.getElementById("downloadPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf; // Récupère l'objet jsPDF
    let doc = new jsPDF();

    let cvElement = document.getElementById("cv");

    html2canvas(cvElement).then(canvas => {
        let imgData = canvas.toDataURL("image/png"); // Convertit le CV en image
        doc.addImage(imgData, "PNG", 10, 10, 180, 250); // Ajoute l'image au PDF
        doc.save("mon_cv.pdf"); // Télécharge le fichier PDF
    });
});

document.getElementById("profilePicUpload").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profilePic").src = e.target.result;
            saveData(); // Sauvegarde la photo dans LocalStorage
        };
        reader.readAsDataURL(file);
    }
    
});
document.getElementById("cvTemplate").addEventListener("change", function() {
    let cv = document.getElementById("cv");
    cv.classList.remove("classic", "modern", "creative");
    cv.classList.add(this.value);
    saveData();
});

// Fonction pour sauvegarder les données dans LocalStorage
function saveData() {
    const cvData = {
        name: document.getElementById("cvName").innerText,
        title: document.getElementById("cvTitle").innerText,
        description: document.getElementById("cvDescription").innerText,
        skills: document.getElementById("cvSkills").innerHTML,
        languages: document.getElementById("cvLanguages").innerHTML,
        bgColor: document.getElementById("cv").style.backgroundColor,
        textColor: document.getElementById("cv").style.color,
        fontFamily: document.getElementById("cv").style.fontFamily,
        profilePic: document.getElementById("profilePic").src
    };
    localStorage.setItem("cvData", JSON.stringify(cvData));
}

// Fonction pour charger les données enregistrées
function loadData() {
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
        const cvData = JSON.parse(savedData);
        document.getElementById("cvName").innerText = cvData.name;
        document.getElementById("cvTitle").innerText = cvData.title;
        document.getElementById("cvDescription").innerText = cvData.description;
        document.getElementById("cvSkills").innerHTML = cvData.skills;
        document.getElementById("cvLanguages").innerHTML = cvData.languages;
        document.getElementById("cv").style.backgroundColor = cvData.bgColor;
        document.getElementById("cv").style.color = cvData.textColor;
        document.getElementById("cv").style.fontFamily = cvData.fontFamily;
        document.getElementById("profilePic").src = cvData.profilePic;
    }
}

// Sauvegarde automatique en temps réel
document.addEventListener("input", saveData);
window.addEventListener("load", loadData);

