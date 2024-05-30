
let descriptions = [];
let answers = [];

// Dibujar el crucigrama
function drawCrossword (vWord, ans, des, scrolling) {
    const container = document.getElementById('cpuzzle');
    let size = vWord.length;
    container.innerHTML = '';
    let html='<table class="table table-bordered">';
    // Itero la palabra vertical
    // Voy a necesitar saber la posicion donde coinciden la letra vertical y horizontal
    // Para calcular un desplazamiento y que quede alineado el crucigrama
    // Voy a hacerlo coincidir con la primera letra igual que encuentre

    // Dibujo cada palabra vertical
    for(i=0; i<vWord.length; i++) {
        html += '<tr>';
        let color = false;

        // Dibujo cada palabra horizontal
        for (j=0; j<ans[i].length; j++) {
            // Si la letra actual coincide con una letra de la palabra vertical y no hubo ninguna coloreada antes, la coloreo
            let aux = '';
            if(ans[i][j] == vWord[i] && !color) {
                aux =' class="table-primary">';
                color = true;
            } else {
                aux = '>';
            }
            html += '<td' + aux + ans[i][j] + '</td>';
        }
        html += '</tr>';
    }
    container.innerHTML += html;
    container.innerHTML += '</table>';
}

// Interacción con el usuario - Validación de las respuestas
function isHWordValid(hWord, answers) {

}

// Función llamadora - Principal
function runCPuzzle() {
    answers = ["literatura","marti","borges","cortazar","sabato"];
    descriptions = ["Arte relacionado a la escritura de ficcion, ensayos, etc.", 
                    "Poeta cubano revolucionario", 
                    "El Aleph fue escrito por...",
                    "Rayuela es obra de...",
                    "Escritor argentino que antes de dedicarse a la literatura existencialista, fue fisico"];
    
    // Validar tamaño de palabra vWord vs. Cantidad de elementos de arrays
    drawCrossword("libro", answers, descriptions, 4);
}