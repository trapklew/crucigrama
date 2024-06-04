/*
* ========================================================================================
*  Nombre del archivo: crossword-puzzle.js
*  Autor: Mariela Montaldo
*  Fecha de creación: 30/05/2024
*  Última modificación: 30/05/2024
*  Versión: 
*
*  Descripción:
*  Este archivo contiene el código de validación y construcción del crucigrama. Dicho
*  crucigrama está organizado en una tabla de 36x36, tomando como centro la posición
*  número 18 y calculando desplazamientos en base a esto, para que la palabra dada
*  como pista quede alineada verticalmente en la posición número 18.
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
const answers = ["literatura","marti","borges","cortazar","sabato"];
const vword = "libro";
const refs = ["Arte de la expresión verbal", 
                "Apellido del escritor cubano iniciador del modernismo literario en Hispanoamérica.", 
                "Apellido del escritor argentino autor de El Aleph",
                "Apellido del escritor argentino autor de Rayuela",
                "Apellido del escritor argentino que antes de dedicarse a la literatura existencialista, fue físico."];

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
                    html += '<td class="table-primary" id="clueword"><input type="text" size="1" maxlength="1" readonly="readonly" value="' + ans[i][c].toUpperCase() + '" /></td>';
                    color = true;
                } else
                    html += '<td class="table-secondary"><input type="text" id="txt-' + i + '-' + c + '" onkeyup="validateChar(' + i + ',' + c + ')" class="form-control no-border" size="1" maxlength="1" /></td>';
                c++;

            } else {
                html += '<td></td>';
            }
        }
        html += '</tr>';
    }
    container.innerHTML += html + '</table></form>';
}

function setCrosswordReferences(descriptions, container) {
    let cont = document.getElementById(container);
    cont.innerHTML += '<ol class="list-group list-group-numbered">';
    for(s of descriptions) {
        cont.innerHTML += '<li class="list-group-item">' + s + '</li>';
    }
    cont.innerHTML += '</ol>';
}

function validateChar(i, c) {
    const txtName = 'txt-' + i + '-' + c ;
    const e = document.getElementById(txtName);
    if(e.value.toUpperCase() != answers[i][c].toUpperCase()) {
        e.classList.toggle("wrong-answer");
    }
    if(e.value.toUpperCase() == answers[i][c].toUpperCase()) {
        e.classList.add("correct-answer");
    }
}

// Función llamadora - Principal
function runCPuzzle() {
    drawCrossword(vword, answers, refs);
    setCrosswordReferences(refs,"references");
}