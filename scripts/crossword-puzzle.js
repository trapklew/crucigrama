/*
* ========================================================================================
*  Nombre del archivo: crossword-puzzle.js
*  Autor: Mariela Montaldo
*  Fecha de creación: 30/05/2024
*  Última modificación: 10/08/2024
*  Versión: v0.2
*
*  Descripción:
*  Este archivo contiene el código de validación y construcción del crucigrama. Dicho
*  crucigrama está organizado en una tabla de 36x36, tomando como centro la posición
*  número 18 y calculando desplazamientos en base a esto, para que la palabra dada
*  como pista quede alineada verticalmente en la posición número 18.
*
*  Historial de modificaciones:
*  - 30/05/2024: Mariela Montaldo - Creación del archivo.
*  - 10/08/2024: Mariela Montaldo - Agrego textarea e incorporación de crucigrama JSON.
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
_size = 36;
_half = 18;

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
    let html = '<form><table class="table table-borderless">';
    
    // i es contador para cantidad de letras de la palabra vertical (filas del crucigrama)
    for(i=0; i < ans.length; i++) {
        html += '<tr>';
        
        // pos inicial y final donde se empiezan a escribir las palabras en la fila horizontal
        let initPosition = Math.max(0, _half - ans[i].toLowerCase().indexOf(vword[i].toLowerCase()));

        // c contador para letras de las palabras horizontales
        let c = 0;
        let color = false;
        
        // j contador para espacios horizontales (vacíos o con letras, es indistinto)
        for(j = 0; j < _size; j++) {
            if(j >= initPosition && j < initPosition + ans[i].length) {
                if(ans[i][j - initPosition].toLowerCase() == vword[i].toLowerCase() && !color) {
                    html += '<td class="table-primary" id="clueword"><input type="text" size="1" maxlength="1" readonly="readonly" value="' + ans[i][c].toUpperCase() + '" /></td>';
                    color = true;
                } else {
                    html += '<td class="table-secondary"><input type="text" id="txt-' + i + '-' + c + '" onkeyup="validateChar(' + i + ',' + c + ')" class="form-control no-border" size="1" maxlength="1" value="' + (showAnswers == true ? ans[i][c] : "") + '"/></td>';
                }
                c++;
            } else {
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