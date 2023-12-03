var customMessages = {};

var messageSavedDates = []; 


document.addEventListener("DOMContentLoaded", function () {
    const zone_entrer =document.getElementById("zone_entrer")
    const calendar = document.getElementById("calendar");
    const activityList = document.getElementById("activityList");
    const newActivityInput = document.getElementById("newActivityInput");
    const newActivityDateInput = document.getElementById("newActivityDate");
    const monthYearIndicator = document.getElementById("monthYearIndicator");
    const newActivitybutton = document.getElementById("newActivitybutton");
    const saveCongratulationsMessageButton = document.getElementById("saveCongratulationsMessageButton");
    const congratulationsMessage = document.getElementById("congratulationsMessage");
    const congratulationsMessageInput = document.getElementById("congratulationsMessageInput");

    let selectedDate; // Variable pour stocker la date de la nouvelle activité
    saveCongratulationsMessageButton.addEventListener("click", function () {
        saveCongratulationsMessageHandler();
    });
    
    newActivitybutton.addEventListener("click", function () {
        addNewActivity();
    });
  
    // Mock data for testing
    const activities = {
        "2023-12-01": [{ name: "Sport", done: false }],
        "2023-12-02": [],
        "2023-12-03": [
            { name: "Meeting", done: false },
            { name: "Shopping", done: true }
        ]
    };
    function saveCongratulationsMessageHandler() {
        const currentDate = newActivityDateInput.value;
       
        if (currentDate) {
            const customMessage =congratulationsMessageInput.value
            
            alert(customMessage," enregistrer le message le",currentDate);
            // Enregistrement du message personnalisé pour la date spécifiée
            customMessages[currentDate] = customMessage;
            messageSavedDates.push(currentDate);

            // Masquer la proposition d'enregistrement du message
            zone_entrer.style.display = "none";
            renderCalendar();
        } else {
            alert("Veuillez sélectionner une date pour enregistrer le message.");
        }
    }

    function renderCalendar() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const lastDay = new Date(now.getFullYear(), currentMonth + 1, 0).getDate();

        monthYearIndicator.textContent = `ÉLOGNE`;

        calendar.innerHTML = "";

        for (let day = 1; day <= lastDay; day++) {
            const dateStr = `${now.getFullYear()}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = day;
            dayElement.dataset.date = dateStr;

            if (activities[dateStr] && activities[dateStr].length > 0 && activities[dateStr].every(activity => activity.done)) {
                dayElement.classList.add("validated");
            }

            dayElement.addEventListener("click", function () {
                renderActivityList(dateStr);
            });

            calendar.appendChild(dayElement);
        }
    }
    function getActivitiesForDayAsString(date) {
        const activitiesForDay = activities[date] || [];
        const activityNames = activitiesForDay.map(activity => activity.name);
        return activityNames.join(', '); // Combine les noms avec une virgule et un espace
    }
    function sendEmail(message_txt) {
        console.log(message_txt)
        Email.send({
            Host: "smtp.gmail.com",
            Username: "M.Yagi",
            Password: "Genocia@1",
            To: 'Steverogers130809@gmail.com',
            From: "eddyplet93@gmail.com",
            Subject: "test",
            Body: message_txt,
        })
            .then(function (message) {
                alert("mail sent successfully")
            });
    }

    function renderActivityList(date) {
        activityList.innerHTML = "";
        
        zone_entrer.style.display = "block";
        activityList.appendChild(zone_entrer)
        const activitiesForDay = activities[date] || [];
        const anyActivityCompleted = activitiesForDay.some(activity => activity.done);
    
        if (anyActivityCompleted) {
            const allActivitiesCompleted = activitiesForDay.every(activity => activity.done);
            if (allActivitiesCompleted) {
                congratulationsMessage.textContent =customMessages[date];
                activityList.appendChild(congratulationsMessage);
                
                if(congratulationsMessage.textContent==customMessages[date]){
                    
                zone_entrer.style.display = "none";
                
                alert('La journée du ' + date + ' a été complétée avec succès. Le patient a effectué les activités suivantes: ' + getActivitiesForDayAsString(date) + '. Le patient a laissé la note suivante: ' + customMessages[date]);
                activitiesForDay.forEach(activity => {
                    const activityItem = document.createElement("li");
                    activityItem.classList.add("activityItem");
                    
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = activity.done;
                    checkbox.classList.add("activityCheckbox");
                    checkbox.addEventListener("change", function () {
                        activity.done = checkbox.checked;
                        renderCalendar(); // Re-render the calendar when a checkbox changes
                    });
    
                    const activityLabel = document.createElement("label");
                    activityLabel.textContent = activity.name;
    
                    activityItem.appendChild(checkbox);
                    activityItem.appendChild(activityLabel);
    
                    activityList.appendChild(activityItem);
                });  
                }
            }else {
                
                zone_entrer.style.display = "block";
                activitiesForDay.forEach(activity => {
                    const activityItem = document.createElement("li");
                    activityItem.classList.add("activityItem");
                    
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = activity.done;
                    checkbox.classList.add("activityCheckbox");
                    checkbox.addEventListener("change", function () {
                        activity.done = checkbox.checked;
                        renderCalendar(); // Re-render the calendar when a checkbox changes
                    });
    
                    const activityLabel = document.createElement("label");
                    activityLabel.textContent = activity.name;
    
                    activityItem.appendChild(checkbox);
                    activityItem.appendChild(activityLabel);
    
                    activityList.appendChild(activityItem);
                });
    
                // Masquer la zone d'entrée
            }
        } else {
            // Aucune activité cochée, masquer la zone d'entrée et afficher la liste d'activités normale
            activitiesForDay.forEach(activity => {
                const activityItem = document.createElement("li");
                activityItem.classList.add("activityItem");
    
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = activity.done;
                checkbox.classList.add("activityCheckbox");
                checkbox.addEventListener("change", function () {
                    activity.done = checkbox.checked;
                    renderCalendar(); // Re-render the calendar when a checkbox changes
                });
    
                const activityLabel = document.createElement("label");
                activityLabel.textContent = activity.name;
    
                activityItem.appendChild(checkbox);
                activityItem.appendChild(activityLabel);
    
                activityList.appendChild(activityItem);
            });
    
            // Masquer la zone d'entrée
        }
    }
    
 
    

    function addNewActivity() {
        const date = newActivityDateInput.value;
        if (!date) {
            alert("Veuillez sélectionner une date pour la nouvelle activité.");
            return;
        }

        const activityName = newActivityInput.value.trim();
        if (!activityName) {
            alert("Veuillez entrer une activité.");
            return;
        }

        // Stockez la date de la nouvelle activité dans la variable selectedDate
        selectedDate = date;

        activities[date] = activities[date] || [];
        activities[date].push({ name: activityName, done: false });
        renderCalendar();
    }

  

    renderCalendar();
    renderCalendar();
    
});