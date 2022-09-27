async function typeWriter(messageToShow, targetElement, timeBetween, currentPos = 0) {
    if (currentPos < messageToShow.length) {
        document.getElementById(targetElement).innerHTML += messageToShow.charAt(currentPos);
        currentPos++;
        setTimeout(function() { typeWriter(messageToShow, targetElement, timeBetween, currentPos); }, timeBetween);
    } else {
        return true;
    }
}

const header = document.getElementById('writename');
const subheader = document.getElementById('writename-thai');

var headwriter = new Typewriter(header, {
    strings: ['Hirunkul Phimsiri', 'Learner', 'Developer', 'Data science', 'Business Enjoyer'],
    autoStart: true,
    loop: true,
    delay: 200,
});

var subwriter = new Typewriter(subheader, {
    loop: false
});



// call all onload function
window.addEventListener('load', (event) => {
    headwriter.pauseFor(3000).start()
    subwriter.typeString('หิรัญกุล พิมพ์ศิริ').start()

});