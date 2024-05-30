
let descriptions = [];
let answers = [];

// Dibujar el crucigrama
function drawCrossword (vWord, ans) {
    const container = document.getElementById('cpuzzle');
    let size = vWord.length;
    container.innerHTML = '<form>';
    let html='<table class="table table-borderless">';
    
    for(i=0; i < ans.length; i++) {
        html += '<tr>';
        
        let initPosition = 17 - ans[i].indexOf(vWord[i]);
        let finalPosition = 17 + ans[i].length-1;
        let c=0;
        let color = false;

        for(j=0; j<36; j++) {

            if(j>=initPosition && j<=finalPosition && c<ans[i].length) {

                if(ans[i][c] == vWord[i] && !color) {
                    html += '<td class="table-primary" id="clueword"><input type="text" size="1" maxlength="1" value="' + ans[i][c]+'" /></td>';
                    color = true;
                } else
                    html += '<td class="table-secondary"><input type="hidden" value="'+ ans[i][c]+'"/><input type="text" class="form-control no-border" size="1" maxlength="1" /></td>';
                    //html += '<td class="table-secondary"><input type="text" class="form-control no-border" size="1" value="' + ans[i][c]+'" /></td>';
                c++;

            } else {
                html += '<td></td>';
            }
        }
        html += '</tr>';
    }
    container.innerHTML += html;
    container.innerHTML += '</table></form>';
}

function setCrosswordReferences(descriptions, container) {
    let cont = document.getElementById(container);
    cont.innerHTML += '<ol class="list-group list-group-numbered">';
    for(s of descriptions) {
        cont.innerHTML += '<li class="list-group-item">' + s + '</li>';
    }
    cont.innerHTML += '</ol>';
}

// Interacción con el usuario - Validación de las respuestas
function isAnswer(hWord, answers) {

}

// Función llamadora - Principal
function runCPuzzle() {
    const answers = ["literatura","marti","borges","cortazar","sabato"];
    const vword = "libro";
    const refs = ["Arte relacionado a la escritura de ficcion, ensayos, etc.", 
                    "Poeta cubano revolucionario", 
                    "El Aleph fue escrito por...",
                    "Rayuela es obra de...",
                    "Escritor argentino que antes de dedicarse a la literatura existencialista, fue fisico"];
    
    // Validar tamaño de palabra vWord vs. Cantidad de elementos de arrays
    drawCrossword(vword, answers, refs);
    setCrosswordReferences(refs,"references");
}