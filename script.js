// menu bar functioning for mobile and tabs (hamburger menu for small width device)
const menu = document.getElementById("menu"); 
const sidemenu = document.getElementById("sidemenu");
menu.addEventListener('click', () => {
    if (sidemenu.style.width === "70vw") {
        sidemenu.style.width = "0vw";
        sidemenu.style.backgroundColor = "transparent";
        setTimeout(() => sidemenu.style.visibility = "hidden", 500); // Wait for transition to finish
        
      } else {
        sidemenu.style.width = "70vw";
        sidemenu.style.backgroundColor = "black";
        sidemenu.style.visibility = "visible";
        // sidemenu.style.backdropFilter = "blur(10px)";
    }
});


// medai visit funtion
function openMedai() {
    window.open("https://medai-1-y7mh.onrender.com", "_blank"); // opens in new tab
}
function openSOFrepo(){
    window.open("https://github.com/SahilDevli/Smart-SoF","_blank")
}
function openRetina(){
    alert("This project is under construction. You will be able to access it soon.")
}


window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('medai_visit').addEventListener('click', () => { 
    window.open("./MedicBot/Frontend/landing.html", "_blank");
  });
});




// email sending and whatsapp chat now funtion
function sendEmail() {
    window.location.href = "mailto:sahildevliofficials19@gmail.com.com";
}
function viewFile() {
    window.open("./utils/CV_SahilDevli.pdf", "_blank");
}
function sendWhatsApp() {
    let phoneNumber = "918979982680"; // Change with country code (e.g., India: 91, USA: 1)
    let message = "Hello Sahil, I'm [your name]";
    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank"); // Opens WhatsApp in a new tab
}


// functions for tech part of site
function java_doc() {
    window.open("https://docs.oracle.com/en/java/", "_blank");
}
function py_doc() {
    window.open("https://docs.python.org/3/", "_blank");
}
function c_doc() {
    window.open("https://devdocs.io/c/", "_blank");
}
function js_doc() {
    window.open("https://developer.mozilla.org/en-US/docs/Web/JavaScript", "_blank");
}
function db_doc() {
    window.open("https://docs.oracle.com/en/database/", "_blank");
}

// softskilla part js
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.skill-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, index * 200); // Staggered animation with 200ms delay between cards
                });
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, { threshold: 0.2 });

    const softSection = document.getElementById('soft');
    if (softSection) {
        observer.observe(softSection);
    }
});