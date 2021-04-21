const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondsHand = document.getElementById("secondsHand");
const hoursDisplay = document.getElementById("hour");
const minuteDisplay = document.getElementById("minutes");
const amPmDisplay = document.getElementById("amPmDisplay");
const toggleFormatBtn = document.getElementById("toggleFormatBtn");

let is24Hour = false;
let hours, minutes, seconds;
let digitalHours, digitalMinutes;

//Converts the hours from 24hr format to 12hr format 
function convertHours(hoursToConvert) {

    return hoursToConvert > 12 ? hoursToConvert - 12 : hoursToConvert; 

}

function updateAnalogClock() {
    let formattedHours = convertHours(hours); 

    let hourAngle = (formattedHours + (minutes / 60)) * 30;
    let minuteAngle = 6 * minutes;
    let secondAngle = 6 * seconds;

    this.hourHand.style.transform = `rotate(${hourAngle}deg)`;
    this.minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    this.secondsHand.style.transform = `rotate(${secondAngle}deg)`;

  }

  //Updates the hours on the digital time using either 12 or 24 hour format
   function updateDigitalHours() {
    if (is24Hour) {

        hoursDisplay.innerText = digitalHours;
    }
    else {
        let amOrPm = hours > 12 ? "pm" : "am";
        let formattedHours = convertHours(digitalHours); 
        hoursDisplay.innerText = formattedHours;
        amPmDisplay.innerText = amOrPm;
    }
  }
  
  function updateDigitalTime() {

    //Only update the hours if they have changed
    if (digitalHours != hours) {
        digitalHours = hours;
        updateDigitalHours();
    }
        //Only update the minutes if they have changed
        if (digitalMinutes !== minutes) {
            digitalMinutes = minutes;
            minuteDisplay.innerText = digitalMinutes < 10 ? "0" + digitalMinutes : digitalMinutes;
        }

  }

setInterval(() => {
    let date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();

    updateAnalogClock();
    updateDigitalTime();

  }, 1000);

  //Toggle between 12 and 24 hour format for the digital time. 
  toggleFormatBtn.addEventListener("click", () => {
      is24Hour = !is24Hour;
      toggleFormatBtn.innerText = is24Hour ? "12 Hour" : "24 Hour";
      amPmDisplay.classList.toggle("hide");
      updateDigitalHours();

  })
