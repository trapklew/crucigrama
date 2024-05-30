/*
* ========================================================================================
*  Nombre del archivo: crossword-puzzle.js
*  Autor: Mariela Montaldo
*  Fecha de creación: 30/05/2024
*  Última modificación: 30/05/2024
*  Versión: 
*
*  Descripción:
*  Este archivo contiene [breve descripción del propósito y funcionalidad del archivo].
*
*  Historial de modificaciones:
*  - 30/05/2024: Mariela Montaldo - Creación del archivo.
*
*  Copyright (c) 2024 Mariela Montaldo.
*
*  Licencia:
*  Este código está licenciado bajo la GPL-3.0. Para más información, 
*  consulte el archivo LICENSE adjunto en el directorio raíz del proyecto o visite 
*  https://fsf.org/.
*
* ========================================================================================
*/


let descriptions = [];
let answers = [];

// Dibujar el crucigrama
function drawCrossword (vWord, ans) {
    const container = document.getElementById('cpuzzle');
    let size = vWord.length;
    let html='<form><table class="table table-borderless">';
    
    for(i=0; i < ans.length; i++) {
        html += '<tr>';
        
        let initPosition = 17 - ans[i].indexOf(vWord[i]);
        let finalPosition = 17 + ans[i].length-1;
        let c=0;
        let color = false;

        for(j=0; j<36; j++) {
            if(j>=initPosition && j<=finalPosition && c<ans[i].length) {
                if(ans[i][c] == vWord[i] && !color) {
                    html += '<td class="table-primary" id="clueword"><input type="text" size="1" maxlength="1" readonly="readonly" value="' + ans[i][c]+'" /></td>';
                    color = true;
                } else
                    html += '<td class="table-secondary"><input type="hidden" value="'+ ans[i][c]+'"/><input type="text" class="form-control no-border" size="1" maxlength="1" /></td>';
                c++;

            } else {
                html += '<td></td>';
            }
        }
        html += '</tr>';
    }
    container.innerHTML += html + '</table><button class="btn btn-primary" type="submit">Verificar</button></form>';
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
function validateAnswer() {
    
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