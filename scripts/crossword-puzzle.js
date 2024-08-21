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
*  - 11/08/2024: Mariela Montaldo - Agrego impresión del crucigrama
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

// Declaración de variables globales

_answers = [];
_vword = "";
_refs = [];
_form = false;
numberOfInputs  = 0 ;
correctAnswers = 0 ;
 //Variable para marcar formulario de generacion de crucigrama como impreso

// Declaración de constantes
const CPUZZLE_CONTAINER = document.getElementById('cpuzzle');
const REFERENCES_CONTAINER = document.getElementById('references');
const GENERATOR_CONTAINER = document.getElementById('cpuzzle-generator-container');
const JSONPUZZLE_INPUT = document.getElementById('jsonpuzzle');


// Constantes globales
const _SIZE = 36;
const _HALF = 18;

function preloadCrossword() {
    var json_arr = {};
    json_arr = JSON.parse(JSONPUZZLE_INPUT.value);
    _answers = json_arr[0]["answers"];
    _vword = json_arr[0]["vword"];
    _refs = json_arr[0]["refs"];
}

// Dibujar el crucigrama
function drawCrossword (vword, ans, showAnswers) {
    let html = `
        <form>
            <table 
                class="table table-borderless">`;
    
    // i es contador para cantidad de letras de la palabra vertical (filas del crucigrama)
    for(i=0; i < ans.length; i++) {
        html += '<tr>';
        // pos inicial y final donde se empiezan a escribir las palabras en la fila horizontal
        let initPosition = Math.max(0, _HALF - ans[i].toLowerCase().indexOf(vword[i].toLowerCase()));

        // c contador para letras de las palabras horizontales
        let c = 0;
        let color = false;
        
        // j contador para espacios horizontales (vacíos o con letras, es indistinto)
        for(j = 0; j < _SIZE; j++) {
            if(j >= initPosition && j < initPosition + ans[i].length) {
                if(ans[i][j - initPosition].toLowerCase() == vword[i].toLowerCase() && !color) {
                    html += `<td 
                                class="table-primary" 
                                id="clueword">
                                <input 
                                    type="text" 
                                    size="1" 
                                    maxlength="1" 
                                    readonly="readonly" 
                                    value="${ans[i][c].toUpperCase()}" />
                            </td>`;
                    color = true;
                } else {

                    html += `<td 
            class="table-secondary">
            <input 
                type="text" 
                id="txt-${i}-${c}" 
                onkeyup="validateChar(${i},${c})" 
                class="form-control no-border" 
                size="1" 
                maxlength="1" 
                value="${(showAnswers == true ? ans[i][c] : "")}"/>
        </td>`;
        numberOfInputs++;
        // console.log("num of inputs :"+numberOfInputs);
                }
                c++;
            } else {
                html += `<td></td>`;
            }
        }
        html += `</tr>`;
    }
    CPUZZLE_CONTAINER.innerHTML = html + `</table></form>`;
}

function setCrosswordReferences(descriptions, container) {
    let cont = document.getElementById(container);
    cont.innerHTML += `<h3>Referencias</h3><ol>`;
    for(s of descriptions) {
        cont.innerHTML += `<li>${s}</li>`;
    }
    cont.innerHTML += `</ol>`;
}

function validateChar(i, c) {
 
    const txtName = 'txt-' + i + '-' + c ;
    const e = document.getElementById(txtName);
    const esLetra = /^[A-Za-z]$/;
    
    if (!esLetra.test(e.value)) {
        e.value = '';
        return;
    }

    if(e.value.toUpperCase() != _answers[i][c].toUpperCase()) {
        e.classList.remove("correct-answer");
        e.classList.add("wrong-answer");
    }
    if(e.value.toUpperCase() == _answers[i][c].toUpperCase()) {
        e.classList.remove("wrong-answer");
        e.classList.add("correct-answer");
        correctAnswers++;
        returnVal();
        console.log(correctAnswers);
        e.disabled = true;
    }
    if (checkIfAllCorrect()) {
        setTimeout(() => {
            const modalHtml = `
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Congratulations</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    You have successfully completed the puzzle
                  </div>
                  
                </div>
              </div>
            </div>`;
            
           
            document.body.insertAdjacentHTML('beforeend', modalHtml);
    
            $('#exampleModal').modal('show');
        }, 50);
    }
    

}
  


function restart() {
    REFERENCES_CONTAINER.innerHTML = '';
    CPUZZLE_CONTAINER.innerHTML = '';
    drawCrossword(_vword, _answers, false);
    setCrosswordReferences(_refs, "references");
    alert('¡Listo!');
}

function checkIfAllCorrect() {
    for (let i = 0; i < _answers.length; i++) {
        for (let c = 0; c < _answers[i].length; c++) {
            const txtName = 'txt-' + i + '-' + c;
            const e = document.getElementById(txtName);
            if (e && e.value.toUpperCase() !== _answers[i][c].toUpperCase()) {
                return false;  
            }
        }
    }
    return true;  
}



function loadFromJSON() {
    var json_arr = {};
    json_arr = JSON.parse(JSONPUZZLE_INPUT.value);
    _answers = json_arr[0]["answers"];
    _vword = json_arr[0]["vword"];
    _refs = json_arr[0]["refs"];
    REFERENCES_CONTAINER.innerHTML = '';
    CPUZZLE_CONTAINER.innerHTML = '';
    drawCrossword(_vword, _answers, false);
    setCrosswordReferences(_refs, "references");
    alert('¡Listo!');
}

function returnVal(){

    $('.progress-bar').css(
        {
            "width":(correctAnswers/numberOfInputs)*100+"%"
        }
    );

    // return correctAnswers ;

}

function printCrossword() {
    REFERENCES_CONTAINER.innerHTML = '';
    CPUZZLE_CONTAINER.innerHTML = '';
    drawCrossword(_vword, _answers, false);
    setCrosswordReferences(_refs, "references");
    let data = `
        <html>
            <head>
                <title>Crucigrama | ${((_vword) ? _vword : '')}</title>
            </head>
        <body>` 
        + CPUZZLE_CONTAINER.innerHTML
        + REFERENCES_CONTAINER.innerHTML
        + ` </body>
            </html>`;
    const printableWindow = window.open('', '_blank');
    printableWindow.document.write(data);
    printableWindow.document.close();
    printableWindow.print();
}

function showAnswers() {
    CPUZZLE_CONTAINER.innerHTML = '';
    drawCrossword(_vword, _answers, true);
}

function generateFormLoadCustomCrossword(vword) {
    let VWORD_INPUT = document.getElementById('txt-vword');
    vword = VWORD_INPUT.value.toUpperCase(); // Usa la variable `vword` de la entrada
    if(vword) 
    {
        if(_form) //Para verificar si el formulario fue impreso antes
        {
            GENERATOR_CONTAINER.innerHTML = '';
        }
        for (let i = 0; i < vword.length; i++)
        {
            let data = `
                <div class="row">
                    <div class="col">
                        <input 
                            type="text"
                            class="form-control"
                            placeholder="Palabra que contenga la letra ${vword[i]} (respuesta, palabra #${i + 1})."
                            value=""
                            id="txt-hword-${i}">
                    </div>
                    <div class="col">
                        <input 
                            type="text"
                            class="form-control"
                            placeholder="Referencia para la palabra #${i + 1} que contiene la letra ${vword[i]}"
                            value=""
                            id="txt-refs-${i}">
                    </div>
                </div>
                `;
            GENERATOR_CONTAINER.innerHTML += data;
        }
        GENERATOR_CONTAINER.innerHTML +=
        `<div class="row">
            <div class="col">
                <input 
                    type="button" 
                    class="form-control btn btn-secondary" 
                    id="btn-jsonForm" 
                    value="Prefiero generarlo insertando un JSON" 
                    onclick="showJsonForm('${vword}')"/>
            </div>
            <div class="col">
                <input 
                    type="button" 
                    class="form-control btn btn-primary" 
                    id="btn-generateForm" 
                    value="¡Listo! Generar crucigrama" 
                    onclick="generateCustomCrossword()"/>
            </div>
        </div>`;
        _form = true;
    } else {
        alert('Algo no anduvo bien... ¿Cargaste la palabra vertical?');
        VWORD_INPUT.focus();
        //Para hacer clean del formulario si se intenta crear uno son una VWORD
        GENERATOR_CONTAINER.innerHTML = '';
        _form = false;
    }
}

function showJsonForm() {
    var vword = document.getElementById('txt-vword').value.toUpperCase();
    jsCreator(vword);
    const jform = document.getElementById('crossword-code');
    jform.style.visibility = "visible" ;
}

function generateCustomCrossword() {
    let VWORD_INPUT = document.getElementById('txt-vword');
    let vword = VWORD_INPUT.value.toUpperCase();
    _vword = vword;
    _answers = [];
    _refs = [];
    for(i = 0; i < vword.length; i++)
    {
        let ans = document.getElementById(`txt-hword-${i}`).value.toLowerCase();
        let ref = document.getElementById(`txt-refs-${i}`).value;
        _answers.push(ans);
        _refs.push(ref);
    }
    drawCrossword(vword, _answers, false);
    REFERENCES_CONTAINER.innerHTML = '';
    setCrosswordReferences(_refs, "references");
}

// Función llamadora - Principal
function runCPuzzle() {
    preloadCrossword(); // Cambiar esto al inicio, a la carga del documento x 1ra vez
    drawCrossword(_vword, _answers, false);
    setCrosswordReferences(_refs, "references");
}

// Funcion Generador JSON Base
function jsCreator(vword) {
    var refs = [];
    var answers = [];
    var cntPal = vword.length;

    // Llenar los arrays con "Referencia X" y "Palabra X" dependiendo de la longitud de la palabra
    for (var i = 0; i < cntPal; i++) {
        refs.push("Referencia " + (i + 1));
        answers.push("Palabra " + (i + 1));
    }

    // Crear el objeto JSON
    var result = [
        {
            "vword": vword,
            "refs": refs,
            "answers": answers
        }
    ];

    // Convertir el JSON a cadena formateada
    var jsonString = JSON.stringify(result, null, 2);

    setTimeout(()=>{
        console.log("num of inputs :"+numberOfInputs);

    } , 10)

    // Asignar el JSON formateado al contenido del textarea
    document.getElementById('jsonpuzzle').value = jsonString;
}

{/* <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
</div> */}