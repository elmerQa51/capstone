document.getElementById('start-button').addEventListener('click', function() {
    const inputName = document.getElementById('player-name').value;
    
    if(inputName.trim() === "") {
        alert("¡Un explorador necesita un nombre!");
        return;
    }

    localStorage.setItem('playerName', inputName);
    
    window.onload = function() {
    const nameSpan = document.getElementById('player-header');
        if (nameSpan) {
            nameSpan.innerText = getPlayer();
        }
    }
});
