// ===== Toggle Details =====
function toggleDetails(button) {
    const row = button.closest("tr").nextElementSibling;
    if (row.classList.contains("hidden")) {
        row.classList.remove("hidden");
        button.textContent = "Hide";
    } else {
        row.classList.add("hidden");
        button.textContent = "Show";
    }
}

// ===== Load Apps =====
function loadApps() {
    const table = document.getElementById("appsTable");
    if (!table) return;

    let apps = JSON.parse(localStorage.getItem("apps")) || [];

    // Default apps if localStorage is empty
    if (apps.length === 0) {
        apps = [{
                appName: "GoogleTranslate",
                company: "Google",
                category: "Translation",
                isFree: "Free",
                description: "Translate text, speech, and websites between languages.",
                website: "https://translate.google.com",
                logo: "https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png",
                video: "",
                audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            },
            {
                appName: "TeslaAutopilot",
                company: "Tesla",
                category: "Robotics",
                isFree: "Paid",
                description: "Self-driving technology integrated in Tesla cars.",
                website: "https://www.tesla.com/autopilot",
                logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
                video: "https://www.youtube.com/embed/tlThdr3O5Qo",
                audio: ""
            }
        ];
    }

    table.innerHTML = "";
    apps.forEach(app => {
                let row = `
        <tr>
            <td>${app.appName}</td>
            <td>${app.company}</td>
            <td>${app.category}</td>
            <td>${app.isFree}</td>
            <td><button class="details-btn">Show</button></td>
        </tr>
        <tr class="hidden">
            <td colspan="5">
                <div class="details-container">
                    <p>${app.description}</p>
                    ${app.logo ? `<img class="app-logo" src="${app.logo}" alt="${app.appName} logo">` : ""}
                    ${app.video ? `
                    <div class="media-box">
                        <h4>📺 Demo Video</h4>
                        <div class="video-wrapper">
                        <iframe src="${app.video}" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>` : ""}
                    ${app.audio ? `
                    <div class="media-box">
                        <h4>🎧 Audio</h4>
                        <audio controls>
                        <source src="${app.audio}" type="audio/mpeg">
                        </audio>
                    </div>` : ""}
                    <br>
                    <a href="${app.website}" target="_blank" class="visit-link">🌐 Visit Website</a>
                </div>
            </td>
        </tr>`;
        table.insertAdjacentHTML("beforeend", row);
    });

    document.querySelectorAll(".details-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            toggleDetails(this);
        });
    });
}

// ===== Form Validation & Submission =====
$(document).ready(function () {
    if ($("#appForm").length) {
        $("#appForm").on("submit", function (e) {
            e.preventDefault();

            let appName = $("#appName").val().trim();
            let company = $("#company").val().trim();
            let website = $("#website").val().trim();
            let isFree = $("#isFree").val();
            let category = $("#category").val();
            let description = $("#description").val().trim();
            let logo = $("#logo").val().trim();
            let video = $("#video").val().trim();
            let audio = $("#audio").val().trim();

            let nameRegex = /^[A-Za-z]+$/;
            let urlRegex = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

            if (!nameRegex.test(appName)) {
                alert("Application name must contain only English letters, no spaces or numbers.");
                return;
            }
            if (!nameRegex.test(company)) {
                alert("Company name must contain only English letters.");
                return;
            }
            if (!urlRegex.test(website)) {
                alert("Please enter a valid website URL.");
                return;
            }
            if (description.length < 5) {
                alert("Description must be at least 5 characters.");
                return;
            }

            let newApp = { appName, company, category, isFree, description, website, logo, video, audio };
            let apps = JSON.parse(localStorage.getItem("apps")) || [];
            apps.push(newApp);
            localStorage.setItem("apps", JSON.stringify(apps));

            window.location.href = "apps.html";
        });
    }

    // Load apps on apps.html
    loadApps();
});