// ==UserScript==
// @name        MaM shoutbox local time
// @namespace   Violentmonkey Scripts
// @match       https://www.myanonamouse.net/*
// @grant       none
// @version     0.2
// @author      jack
// @description Simple userscript that displays local time for shoutbox messages
// ==/UserScript==

// how often to update
updateInterval = 200;

// force 24 hour format
force24Format = false;


function main() {
  let timestamps = document.getElementsByClassName('ts');
  
  for (let i = 0; i < timestamps.length; i ++) {
    if (!timestamps[i].classList.contains('restamped')) {
      let stamp = Date.parse(timestamps[i].title + ' UTC');
      let date = new Date(stamp);
      let newDate = convertTZ(date, Intl.DateTimeFormat().resolvedOptions().timeZone);
      if (force24Format) {
        let hours = newDate.getHours();
        if (hours < 10) {
          hours = '0' + hours;
        }
        
        let minutes = newDate.getMinutes();
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        
        let seconds = newDate.getSeconds();
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
        
        timestamps[i].innerText = hours + ':' + minutes + ':' + seconds;
      } else {
        timestamps[i].innerText = newDate.toLocaleTimeString();
      }
      
      timestamps[i].classList.add("restamped");
    }
  }
}
  
  
// Borrowed from: https://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript/54127122#54127122
function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}


/* Triggering main function after page has loaded */
window.addEventListener('load', function() {
    setInterval(main, updateInterval);
}, false);
