
const fs = require('fs');

const talks = fs.readFileSync('data/talks.json', 'utf8');
const style = fs.readFileSync('src/style.css', 'utf8');
const script = fs.readFileSync('src/script.js', 'utf8');
let template = fs.readFileSync('src/index.html', 'utf8');

let scheduleHTML = '';
let currentTime = new Date('2025-10-28T10:00:00');

JSON.parse(talks).forEach(talk => {
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

    scheduleHTML += `
        <div class=\"talk\">
            <p class=\"time\">${timeString}</p>
            <h2>${talk.title}</h2>
            ${speakersHTML}
            <p>${talk.description}</p>
            ${categoryHTML}
        </div>
    `;

    currentTime = new Date(endTime.getTime() + 10 * 60000);
});

template = template.replace('{{style.css}}', style);
template = template.replace('{{schedule}}', scheduleHTML);
template = template.replace('{{talks.json}}', talks);
template = template.replace('{{script.js}}', script);

fs.writeFileSync('dist/index.html', template);

console.log('Successfully built the website to dist/index.html');
