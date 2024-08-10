/*
* ========================================================================================
*  Nombre del archivo: crossword-puzzle.js
*  Autor: Mariela Montaldo
*  Fecha de creación: 30/05/2024
*  Última modificación: 06/06/2024
*  Versión: v0.1
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
_answers = [];
_vword = "";
_refs = [];
_size = 36; // Para libro
_half = 17; // Para libro

function preloadCrossword() {
    var json_arr = {};
    json_arr = JSON.parse(document.getElementById('jsonpuzzle').value);
    _answers = json_arr[0]["answers"];
    _vword = json_arr[0]["vword"];
    _refs = json_arr[0]["refs"];
}

// Dibujar el crucigrama
function drawCrossword (vword, ans, showAnswers) {
    const container = document.getElementById('cpuzzle');
    let size = vword.length;
    let html = '<form><table class="table table-borderless">';
    
    for(i=0; i < ans.length; i++) {
        html += '<tr>';
        
        let initPosition = Math.max(0, _half - ans[i].indexOf(vword[i]));
        let finalPosition = Math.min(_size - 1, _half + ans[i].length - 1);

        let c = 0;
        let color = false;

        for(j = 0; j < _size; j++) {
            console.log("initPosition "+ initPosition +", j " + j + ", finalPosition " + finalPosition + ", c " + c + ", ans[i].length " + ans[i].length);
            
            if(j >= initPosition && j < initPosition + ans[i].length) {
                console.log("entra if 1, ans[i][j - initPosition] " + ans[i][j - initPosition] + ", vword[i] " + vword[i])
                if(ans[i][j - initPosition].toLowerCase() == vword[i].toLowerCase() && !color) {
                    console.log("entra if 2")
                    html += '<td class="table-primary" id="clueword"><input type="text" size="1" maxlength="1" readonly="readonly" value="' + ans[i][c].toUpperCase() + '" /></td>';
                    color = true;
                } else
                    html += '<td class="table-secondary"><input type="text" id="txt-' + i + '-' + c + '" onkeyup="validateChar(' + i + ',' + c + ')" class="form-control no-border" size="1" maxlength="1" value="' + (showAnswers == true ? ans[i][c] : "") + '"/></td>';
                c++;
            } else {
                console.log("entra else")
                html += '<td></td>';
            }
        }
        html += '</tr>';
    }
    container.innerHTML = html + '</table></form>';
}

function setCrosswordReferences(descriptions, container) {
    let cont = document.getElementById(container);
    cont.innerHTML += '<h3>Referencias</h3><ol class="list-group list-group-numbered">';
    for(s of descriptions) {
        cont.innerHTML += '<li class="list-group-item">' + s + '</li>';
    }
    cont.innerHTML += '</ol>';
}

function validateChar(i, c) {
    const txtName = 'txt-' + i + '-' + c ;
    const e = document.getElementById(txtName);
    if(e.value.toUpperCase() != _answers[i][c].toUpperCase()) {
        e.classList.remove("correct-answer");
        e.classList.add("wrong-answer");
    }
    if(e.value.toUpperCase() == _answers[i][c].toUpperCase()) {
        e.classList.remove("wrong-answer");
        e.classList.add("correct-answer");
        e.disabled = true;
    }
}

function restart() {
    document.getElementById('references').innerHTML = '';
    document.getElementById('cpuzzle').innerHTML = '';
    runCPuzzle();
}

function showAnswers() {
    document.getElementById('cpuzzle').innerHTML = '';
    drawCrossword(_vword, _answers, true);
}

// Función llamadora - Principal
function runCPuzzle() {
    preloadCrossword();
    drawCrossword(_vword, _answers, false);
    setCrosswordReferences(_refs, "references");
}