async function typeWriter(messageToShow, targetElement, timeBetween, currentPos = 0) {
    if (currentPos < messageToShow.length) {
        document.getElementById(targetElement).innerHTML += messageToShow.charAt(currentPos);
        currentPos++;
        setTimeout(function() { typeWriter(messageToShow, targetElement, timeBetween, currentPos); }, timeBetween);
    } else {
        return true;
    }
}
// call all onload function
window.addEventListener('load', (event) => {
    typeWriter('HIRUNKUL PHIMSIRI', 'writename', 100);
    typeWriter('หิรัญกุล พิมพ์ศิริ', 'writename-thai', 200);
});