
const searchInput = document.getElementById('searchInput');
const scheduleContainer = document.getElementById('schedule');

const renderSchedule = (filter) => {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('2025-10-28T10:00:00');

    talks.forEach(talk => {
        if (filter && !talk.category.some(cat => cat.toLowerCase().includes(filter.toLowerCase()))) {
            return;
        }

        const talkElement = document.createElement('div');
        talkElement.classList.add('talk');

        const startTime = new Date(currentTime);
        const endTime = new Date(currentTime.getTime() + talk.duration * 60000);

        const timeString = `${startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

        let speakersHTML = '';
        if (talk.speakers.length > 0) {
            speakersHTML = `<p class=\"speakers\">${talk.speakers.join(', ')}</p>`;
        }

        let categoryHTML = '';
        if (talk.category.length > 0) {
            categoryHTML = `<div class=\"category\">${talk.category.map(cat => `<span>${cat}</span>`).join('')}</div>`;
        }

        talkElement.innerHTML = `
            <p class=\"time\">${timeString}</p>
            <h2>${talk.title}</h2>
            ${speakersHTML}
            <p>${talk.description}</p>
            ${categoryHTML}
        `;

        scheduleContainer.appendChild(talkElement);

        currentTime = new Date(endTime.getTime() + 10 * 60000);
    });
};

searchInput.addEventListener('input', (e) => {
    renderSchedule(e.target.value);
});

renderSchedule();
