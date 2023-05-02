const doc = document.body
doc.onload = ()=>{
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var palabras = ["Pixeles", "Titanic", "Terminator", "Civil War", "Avatar", "Godzilla", "Robocop", "Transformers"];
var aleatorio =  [Math.floor(Math.random() * palabras.length)];
var palabra = palabras[aleatorio].toUpperCase();
const fallos = document.getElementById("canvas").value;
//##################  CANVAS  #########################

function dibujaHorca(ctx){
    ctx.fillStyle = '#462501';
    ctx.fillRect(64,9,10,237); // parte lateral
    ctx.fillRect(193,193,10,53); //soporte de abajo 2
    ctx.fillRect(64,193,136,15); // parte de abajo
    ctx.fillRect(64,9,115,11);
    ctx.beginPath(); //diagonal
    ctx.moveTo(64,65);
    ctx.lineTo(64,80);
    ctx.lineTo(133,11);
    ctx.lineTo(118,11);
    ctx.fill();
}
function dibCabeza(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(125, 25, 50, 50);
    ctx.fillStyle = "white";
    ctx.fillRect(130, 30, 40, 40);
}
function dibCuello(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(145,75,10,60)
}
function dibujaBrazoIzq(ctx){
    ctx.beginPath();
    ctx.moveTo(145,75); //inicio (x,y)
    ctx.lineTo(180,110); //baja a (+35,+35)
    ctx.lineTo(195,110); //doy grosor
    ctx.lineTo(160,75); //regresa al inicio para terminar el relleno
    ctx.fill()
}
function dibujaBrazoDer(ctx){
    ctx.beginPath();
    ctx.moveTo(155,75); //inicio (x,y)
    ctx.lineTo(120,110); //misma altura (+(-35),+35)
    ctx.lineTo(105,110);
    ctx.lineTo(140,75);
    ctx.fill()
}
function dibujaPiernaIzq(ctx){
    ctx.beginPath();
    ctx.moveTo(155,135);
    ctx.lineTo(180,180);
    ctx.lineTo(165,180);
    ctx.lineTo(145,135);
    ctx.fill()
}
function dibujaPiernaDer(ctx){
    ctx.beginPath();
    ctx.moveTo(145,135);
    ctx.lineTo(120,180);
    ctx.lineTo(135,180);
    ctx.lineTo(155,135);
    ctx.fill()
}

dibujaHorca(ctx);
dibCabeza(ctx);
dibCuello(ctx);
dibujaBrazoIzq(ctx);
dibujaBrazoDer(ctx);
dibujaPiernaIzq(ctx);
dibujaPiernaDer(ctx);
//####################  AGREGAR PALABRA  #######################
function iniciarJuego(){
    let wordGuessed = [];
      for (let i = 0; i < palabra.length; i++) {
        wordGuessed[i] = "_";
      }
      let remainingLetters = palabra.length;
      let missedLetters = [];

      const wordPlaceholder = document.getElementById("word");
      wordPlaceholder.innerHTML = wordGuessed.join(" ");

      const missedLettersPlaceholder = document.getElementById("missedLetters");
      missedLettersPlaceholder.innerHTML = missedLetters.join(" ");

      const guessButton = document.getElementById("guessButton");
      guessButton.addEventListener("click", function() {
        const guessInput = document.getElementById("guess");
        let guess = guessInput.value.toUpperCase();
        if (/^[a-zA-Z]+$/.test(guess) === false) { //revisa que sea una letra
            alert("Por favor ingrese solo letras.");
            guessInput.value = "";
            return;
        }
        guessInput.value = "";
        if (guess.length !== 1) {
          alert("Por favor, introduce una sola letra.");
          return;
        }
        let correctGuess = false;
        for (let j = 0; j < palabra.length; j++) {
          if (palabra[j] === guess) {
            wordGuessed[j] = guess;
            remainingLetters--;
            correctGuess = true;
          }
        }
        if (!correctGuess) {
          missedLetters.push(guess);
        }

        wordPlaceholder.innerHTML = wordGuessed.join(" ");
        missedLettersPlaceholder.innerHTML = missedLetters.join(" ");

        if (remainingLetters === 0) {
          alert("La palabra era " + palabra);
          window.location.href="./Ahorcado.html"
        }
      });
}

const secjuego = document.getElementById("btn-iniciar-juego").addEventListener('click',iniciarJuego);

function agregarPalabra(){
    //
    const contenedor = document.querySelector(".comtent")
    texto = `
    <div class="palabra">
        <label for="inputPalabra">Añadir palabra al Juego</label>
        <input type="text" placeholder="" name="nuevaPalabra" id="inputPalabra">
        <button type="submit" id="btn-agregar">Añadir</button>
        <button type="submit" id="btn-iniciar">Iniciar Juego</button>
    </div>
    `;
    contenedor.innerHTML = texto;
    const texto_input = document.getElementById("inputPalabra");
    const btnadd = document.getElementById("btn-agregar").addEventListener('click',()=>{
        palabras.push(texto_input.value);
        console.log(palabras)
        texto_input.value = "";
    })
    const btniniciar = document.getElementById("btn-iniciar").addEventListener('click',()=>{
        texto = `
        <section class="juego">
            <canvas id="canvas" width="300" height="300" value="0"></canvas>
            <div class="juegoInterfaz">
                <p>Adivina la palabra: <span id="word"></span></p>
                <p>Letras erradas: <span id="missedLetters"></span></p>
                <label for="guess">Adivina una letra:</label>
                <input type="text" id="guess" size="1" maxlength="1">
                <button id="guessButton">Adivinar</button>
            </div>
        </section>
        `
        contenedor.innerHTML = texto;
        iniciarJuego();
        //falta agregar el ahorcado
    })
    
}
const addPalabra = document.getElementById("btn-agregar-palabra");
addPalabra.onclick = agregarPalabra;

}