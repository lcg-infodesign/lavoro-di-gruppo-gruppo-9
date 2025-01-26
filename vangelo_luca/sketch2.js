let data;
let tablePeople;
let tableProva;
let nodes = []; //Array globale per i nodi 

// variabili font
let myFont;

//variabili globali per posizione e dimensione
let y;
let x;
let size;
let type;

let padding;
let padding2=30;
let height;
let width;

//variabili slider 
let slider;
let sliderValue = 1;
let totalSteps = 25;

// COLORI PALETTE 
let Sfondo = "#EFEEE5";
let persone = "#298BE5";
let colorText = "black";
let colorEvent = "#A99366";
let colorEdges = "black";
let grayShape = "#D9D0B8";
let colorLegenda = "#876315";
let colorVangeli = "#876315";

//bottone
let button;









// caricamento dati
function preload() {
  //tablePeople = loadTable("Assets/persone.csv", "csv", "header");
  //tableProva = loadTable("Assets/prova.csv", "csv", "header");
  tableFiltro = loadTable("../Assets/filtro.csv", "csv", "header");
  data = loadJSON("../Assets/TimeNomi.json");
  GentiumRegular = loadFont("../Fonts/PO/Poppins-Medium.ttf");
  GentiumBold = loadFont("../Fonts/PO/Poppins-Medium.ttf");
  FontBE = loadFont("../Fonts/BE/BEMedium.ttf");
  FontBEItalic = loadFont("../Fonts/BE/BEMediumItalic.ttf");
  FontBEBold = loadFont("../Fonts/BE/BEBold.ttf");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  let height = windowHeight;
  let width = windowWidth;

  //Riempio l'array nodes con i dati di JASON
  nodes = data.nodes;

  // Crea lo slider orizzontale
  slider = createSlider(0, totalSteps-1, 0); // Range da 0 a 24, valore iniziale 0
  slider.position(150, height-40); // Posizione
  slider.size(width-300);
  slider.style('background-color', '#8080FF');


}


function draw() {
  background("white");
  mousehover();

  let height = windowHeight;
  let width = windowWidth;
  let padding = 60;

  // rettangolo sfondo grafica
  noStroke();
  fill(Sfondo)
  rect(0, 60, width, height -150); 

  // Scritta CAPITOLO
  fill("black");
  textFont(FontBE);
  textAlign(CENTER, CENTER);
  if (sliderValue === 0){
    textSize(18);
    text("Click the arrows to change chapter", width/2, height-65);

  }else{
    textSize(24);
    text("CHAPTER " + sliderValue, width/2, height-65);
  }
  

  //scritte ai bordi dello slider
  textSize(20);
  text("Overview", 130, height-40);
  text("24", width-130, height-40);


  

  //LEGENDA RETTANGOLI
  let gutter;
  textAlign(LEFT, LEFT);


  if (windowWidth > 1630) {
    gutter = 10;

  } else {
    gutter = 5;
  }
  
  /*fill("gray");
  rect(width - 20 - width/10 - 3*gutter - width/12 - width/8 - width/11, 10, width/11, 40, 20);
  rect(width - 20 - width/10 - 2*gutter - width/12 - width/8, 10, width/8, 40, 20);
  rect(width - 20 - width/10 - gutter - width/12, 10, width/12, 40, 20);
  rect(width - 20 - width/10, 10, width/10, 40, 20);*/

  //LEGENDA CONTENUTO
  noStroke();
  fill (persone);
  circle(width - 20 - 280 - 75 - 80 - 55, 30, 25);

  fill("none");
  stroke(persone);
  strokeWeight(3);
  circle(width - 20 - 280 - 75, 30, 25);

  fill(persone);
  circle(width - 20 - 280 - 75, 30, 15);

  noStroke();
  fill (colorEvent);
  drawHexagon (width - 20 - 148 - 24 - 14, 30, 12);  

  stroke("black");
  strokeWeight(1.5);
  line(width - 20 - 100, 25, width - 20 - 90, 38);

  noStroke();
  fill(colorLegenda);
  textFont(FontBEItalic);

  if (windowWidth > 1630) {
    textSize(16);

  } else {
    textSize(12);
  }

  fill(colorLegenda);
  textAlign(CENTER, CENTER);
  text("Characters", width - 20 - 280 - 75 - 80, 28);
  text("Main characters", width - 20 - 280, 28);
  text("Events", width - 20 - 148, 28);
  text("Connections", width - 20 - 40, 28);

  // LINK ALTRE PAGINE VANGELI
  for (let l = 0; l < 3; l++){
    noFill();
    stroke(colorVangeli);
    strokeWeight(2);
    let rspace = width/9;
    rect(50 + gutter + width/9 + (rspace+gutter)*l, 13, rspace, 34, 20);
  }

  if (windowWidth > 1630) {
    textSize(16);

  } else {
    textSize(14);
  }

  noStroke();
  textFont(FontBEBold);
  textAlign(CENTER, CENTER);
  fill(colorVangeli);
  text("GOSPEL OF LUKE", 50 + width/18, 28);
  //text("GOSPEL OF JOHN", 50 + width/9 + gutter + width/18, 28);
  //text("GOSPEL OF MARK", 50 + 2*width/9 + 2*gutter + width/18, 28);
  //text("GOSPEL OF MATTHEW", 50 + 3*width/9 + 3*gutter + width/18, 28);
  
  //disegno rettangolo clicclabile
  fill("white");
  rect(10, 16, 20, 30);

  //disegno linee freccia
  stroke("black");
  strokeWeight(3);
  line(15, 30, 25, 20);
  line(15, 30, 25, 40);
  

  




  // Aggiorna il valore dello slider
  sliderValue = slider.value();
 
  // Filtra gli ID corrispondenti al capitolo selezionato -> inserisce nell'Array matchingIDs gli ID
  //se il numero del capitolo corrisponde al valore dello slider  
  let matchingIDs = [];
  for (let i = 0; i < tableFiltro.getRowCount(); i++) {
    if (int(tableFiltro.getString(i, "Chapter")) === sliderValue) {
      matchingIDs.push(tableFiltro.getString(i, "ID"));
    }
  }

  //Filtro gli ID minori del capitolo selezionato -> inserisco nell'Array minorIDs gli ID
  //se il numero del capitolo è minore del valore dello slider 
  let minorIDs = [];
  for (let m = 0; m < tableFiltro.getRowCount(); m++) {
    if (int(tableFiltro.getString(m, "Chapter")) < sliderValue) {
      minorIDs.push(tableFiltro.getString(m, "ID"));
    }
  }

  //disegno iniziale di tutti gli edges
  if (sliderValue === 0){
    drawInitialEdges();
  }

  //disegno EDGES - sotto tutto
  drawEdges(matchingIDs);
  drawGrayEdges (minorIDs);

  // CICLO FOR PER DISEGNARE COSE 
  for (let i = 0; i < nodes.length; i++) {

    // MAP x, y, size 
    let x = map (nodes[i].attributes.x, -1335.7671, 1328.8036, 20+padding, width-20-padding);
    let y = map (nodes[i].attributes.y, -1335.1002, 1331.486,  60 + padding2, height-90-padding2);
    let size = map (nodes[i].attributes.size, 25, 80 , 15, 70);
    
    // disegna cerchi ed esagoni all'inizio
    if (sliderValue === 0) {
  
    
      drawCircle(x, y, size, nodes[i].attributes.type);  // Poi disegna il cerchio
    
      fill(colorText); 
      textSize(12);
      textAlign(CENTER, CENTER);
      textFont(GentiumBold);
      text(nodes[i].attributes.label, x-50, y, 100);  // Infine, scrivi il testo
    }

    // DISEGNA COSE GRIGIE
    //disegna nodi se l'array minorIDs include key (=ID personaggio)
    if (minorIDs.includes(nodes[i].key)) {
      drawGrayCircle(x, y, size, nodes[i].attributes.type); 
      
    }


    // DISEGNA COSE COLORATE 
    //disegna nodi se l'array matchingIDs include key (=ID personaggio)
    if (matchingIDs.includes(nodes[i].key)){

      drawCircle (x, y, size, nodes[i].attributes.type);

      // Disegna il testo al centro
      fill(colorText); 
      textSize(12);
      textAlign(CENTER, CENTER);
      textFont(GentiumBold);
      text(nodes[i].attributes.label, x-50, y, 100); // Scrivi il nome al centro del cerchio
    }    
  } 


  // sopra EDJES 
  // disegna CERCHI FISSI per God e Jesus -> personaggi princ
  if (sliderValue >= 0){
    let xGod = map (-93.604515, -1335.7671, 1328.8036, 20+padding, width-20-padding);
    let yGod = map (-41.32583, -1335.1002, 1331.486,  60 + padding2, height-90-padding2);
    fill(100, 100, 100, 0); //fill trasparente
    stroke(persone);
    strokeWeight(4);
    circle(xGod, yGod, 68)
  
    let xJes = map (-37.821632, -1335.7671, 1328.8036, 20+padding, width-20-padding);
    let yJes = map (-347.98218, -1335.1002, 1331.486,  60 + padding2, height-90-padding2);
    circle(xJes, yJes, 83)
  }

  
    
    

}


//disegno TUTTI GLI EDGES all'inizio
function drawInitialEdges (){

  let height = windowHeight;
  let width = windowWidth;
  let padding = 60;

  for(let k = 0; k < data.edges.length; k++){


    let source = data.edges[k].source; // Ottieni il nome della sorgente
    let target = data.edges[k].target; // Ottieni il nome del bersaglio

      // Trova i nodi corrispondenti per source e target
      let sourceNode = nodes.find(node => node.key === source);
      let targetNode = nodes.find(node => node.key === target);

      if (sourceNode && targetNode) {

        //definisco costanti per la x e la y massime e minime dei nodi 
        const minOriginalX = Math.min(...nodes.map(node => node.attributes.x));
        const maxOriginalX = Math.max(...nodes.map(node => node.attributes.x));
        const minOriginalY = Math.min(...nodes.map(node => node.attributes.y));
        const maxOriginalY = Math.max(...nodes.map(node => node.attributes.y));



        // Se entrambi i nodi esistono, calcola le coordinate
        if (sourceNode && targetNode) {

          //ridimensiono edges con stessi valori massimi e minimi di cerchi ed esagoni 
          let x = map (sourceNode.attributes.x,minOriginalX, maxOriginalX, 20+padding, width-20-padding);
          let y = map (sourceNode.attributes.y, minOriginalY,  maxOriginalY, 60 + padding2, height-90-padding2);
          let x1 = map(targetNode.attributes.x,minOriginalX, maxOriginalX, 20+padding, width-20-padding);
          let y1 = map(targetNode.attributes.y, minOriginalY, maxOriginalY,  60 + padding2, height-90-padding2);

          // Disegno linea edges
          stroke(colorEdges);
          strokeWeight(0.5);
          line(x, y, x1, y1);
        }     
      

    }

  }
} 

// FUNZIONE PER DISEGNARE CERCHI ED ESAGONI GRIGI SOTTO
function drawGrayCircle (x, y, size, type) {
  for (let j=0; j<nodes.length;j++){
    let type = nodes[j].attributes.type

  }

  if (type === "persona"){
    noStroke();
    fill (grayShape);
    circle (x, y, size);
    
  } else {
    noStroke();
    fill (grayShape);
    drawHexagon (x, y, size); //con il raggio = size anche gli eventi cambiano dimensione; 
    // se vogliamo possiamo definire un valore fisso del raggio 

  } 
}

// FUNZIONE PER DISEGNARE CERCHI 
function drawCircle (x, y, size, type){

  for (let j=0; j<nodes.length;j++){
    let type = nodes[j].attributes.type

  }

  if (type === "evento"){
    noStroke();
    fill (colorEvent);
    drawHexagon (x, y, size*1.3); //con il raggio = size anche gli eventi cambiano dimensione; 
    // se vogliamo possiamo definire un valore fisso del raggio  
  } else {
    noStroke();
    fill (persone);
    circle (x, y, size);
  }
}


// FUNZIONE PER FORMA ESAGONI
function drawHexagon(xPos, yPos, radius) {
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i; // Divide the circle into 6 parts
    let vx = xPos + cos(angle) * radius; // Calculate x-coordinate of the vertex
    let vy = yPos + sin(angle) * radius; // Calculate y-coordinate of the vertex
    vertex(vx, vy); // Add the vertex
  }
  endShape(CLOSE); // Close the shape
}





//vogliamo delle linee che partano dai cerchi (source di edges) e finiscano negli esagoni (target di edges)
//associamo le source e i target di edges alle key di nodes
//in modo da prendere la x e la y delle key di nodes per ogni source o target
//disegnamo linee con x e y della source e x1 e y1 del target


// FUNZIONE PER EDGES
function drawEdges (matchingIDs){

  let height = windowHeight;
  let width = windowWidth;
  let padding = 60;

  for(let k = 0; k < data.edges.length; k++){


    let source = data.edges[k].source; // Ottieni il nome della sorgente
    let target = data.edges[k].target; // Ottieni il nome del bersaglio

    // Controlla se source e target sono inclusi in matchingIDs
    if (matchingIDs.includes(source) && matchingIDs.includes(target)) {

      // Trova i nodi corrispondenti per source e target
      let sourceNode = nodes.find(node => node.key === source);
      let targetNode = nodes.find(node => node.key === target);

      if (sourceNode && targetNode) {

        //definisco costanti per la x e la y massime e minime dei nodi 
        const minOriginalX = Math.min(...nodes.map(node => node.attributes.x));
        const maxOriginalX = Math.max(...nodes.map(node => node.attributes.x));
        const minOriginalY = Math.min(...nodes.map(node => node.attributes.y));
        const maxOriginalY = Math.max(...nodes.map(node => node.attributes.y));



        // Se entrambi i nodi esistono, calcola le coordinate
        if (sourceNode && targetNode) {

          //ridimensiono edges con stessi valori massimi e minimi di cerchi ed esagoni 
          let x = map (sourceNode.attributes.x,minOriginalX, maxOriginalX, 20+padding, width-20-padding);
          let y = map (sourceNode.attributes.y, minOriginalY,  maxOriginalY, 60 + padding2, height-90-padding2);
          let x1 = map(targetNode.attributes.x,minOriginalX, maxOriginalX, 20+padding, width-20-padding);
          let y1 = map(targetNode.attributes.y, minOriginalY, maxOriginalY,  60 + padding2, height-90-padding2);

          // Disegno linea edges
          stroke(colorEdges);
          strokeWeight(0.5);
          line(x, y, x1, y1);
        }     
      }

    }

  }
} 

//disegno EDGES grigi 
function drawGrayEdges (minorIDs){

  let height = windowHeight;
  let width = windowWidth;
  let padding = 60;

  for(let k = 0; k < data.edges.length; k++){


    let source = data.edges[k].source; // Ottieni il nome della sorgente
    let target = data.edges[k].target; // Ottieni il nome del bersaglio

    // Controlla se source e target sono inclusi in matchingIDs
    if (minorIDs.includes(source) && minorIDs.includes(target)) {

      // Trova i nodi corrispondenti per source e target
      let sourceNode = nodes.find(node => node.key === source);
      let targetNode = nodes.find(node => node.key === target);

      if (sourceNode && targetNode) {

        //definisco costanti per la x e la y massime e minime dei nodi 
        const minOriginalX = Math.min(...nodes.map(node => node.attributes.x));
        const maxOriginalX = Math.max(...nodes.map(node => node.attributes.x));
        const minOriginalY = Math.min(...nodes.map(node => node.attributes.y));
        const maxOriginalY = Math.max(...nodes.map(node => node.attributes.y));



        // Se entrambi i nodi esistono, calcola le coordinate
        if (sourceNode && targetNode) {

          //ridimensiono edges con stessi valori massimi e minimi di cerchi ed esagoni 
          let x = map (sourceNode.attributes.x,minOriginalX, maxOriginalX, 20+padding, width-20-padding);
          let y = map (sourceNode.attributes.y, minOriginalY,  maxOriginalY, 60 + padding2, height-90-padding2);
          let x1 = map(targetNode.attributes.x,minOriginalX, maxOriginalX, 20+padding, width-20-padding);
          let y1 = map(targetNode.attributes.y, minOriginalY, maxOriginalY,  60 + padding2, height-90-padding2);

          // Disegno linea edges
          stroke(grayShape);
          strokeWeight(0.5);
          line(x, y, x1, y1);
        }     
      }

    }

  }
} 



//funzione per link rettangolo
function mousePressed(){

  let width = windowWidth;

  if (mouseX > 10 && mouseX < 30 && mouseY > 16 && mouseY < 46){
    window.location.href = '../index.html';
    cursor("pointer");
  }else if (mouseX > 50 + 3 * width/9 + 30 && mouseX < 50 + 4 * width/9 + 30 && mouseY > 10 && mouseY < 40){
    window.location.href = '../vangelo_matteo/matteo.html';
    cursor("pointer");
  }else if (mouseX > 50 + 2 * width/9 + 20 && mouseX < 50 + 3 * width/9 + 20 && mouseY > 10 && mouseY < 40 ){
    window.location.href = '../vangelo_marco/marco.html';
    cursor("pointer");
  }else if (mouseX > 50 + width/9 + 10 && mouseX < 50 + 2 * width/9 + 10 && mouseY > 10 && mouseY < 40 ){
    window.location.href = '../vangelo_giovanni/giovanni.html';
    cursor("pointer");
  }

}

//funzione che muove SLIDER
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    slider.value(max(0, slider.value() - 1)); // Riduci il valore senza scendere sotto 0
  } else if (keyCode === RIGHT_ARROW) {
    slider.value(min(totalSteps - 1, slider.value() + 1)); // Aumenta il valore senza superare il massimo
  }
}

//funzione per mousehover rettangoli
function mousehover(){

  //ridefinisco le variabili 
  let gutter;
  if (windowWidth > 1630) {
    gutter = 10;

  } else {
    gutter = 5;
  }

  if (windowWidth > 1630) {
    textSize(16);

  } else {
    textSize(14);
  }

  let width = windowWidth;
  let colorVangeli = "#876315";
  let rspace = width/9;

  //rect 4
  if ((mouseX > 50 + 3 * width/9 + 30) && (mouseX < 50 + 4 * width/9 + 30) && (mouseY > 10 && mouseY < 40)){
    fill(colorVangeli);
    noStroke()
    cursor("pointer");
  }else{
    noFill();
    stroke(colorVangeli);
    strokeWeight(2);
  }
  rect(50 + gutter + width/9 + (rspace+gutter)*2, 13, rspace, 34, 20);

  //testo 4 "GOSPEL OF MATTHEW"
  if((mouseX > 50 + 3 * width/9 + 30) && (mouseX < 50 + 4 * width/9 + 30) && (mouseY > 10 && mouseY < 40)){
    noStroke();
    fill("white");
    textFont(FontBEBold);
    textAlign(CENTER, CENTER);
    
  }else{
    noStroke();
    fill(colorVangeli);
    textFont(FontBEBold);
    textAlign(CENTER, CENTER);
    }
    text("GOSPEL OF MATTHEW", 50 + 3*width/9 + 3*gutter + width/18, 28);
  
  
  //rect 3
  if (mouseX > 50 + 2 * width/9 + 20 && mouseX < 50 + 3 * width/9 + 20 && mouseY > 10 && mouseY < 40 ){
    fill(colorVangeli);
    noStroke()
    cursor("pointer");
  }else{
  noFill();
  stroke(colorVangeli);
  strokeWeight(2);
   }
  rect(50 + gutter + width/9 + (rspace+gutter), 13, rspace, 34, 20);

  //testo 3 "GOSPEL OF MARK"
  if((mouseX > 50 + 2 * width/9 + 20) && (mouseX < 50 + 3 * width/9 + 20) && (mouseY > 10 && mouseY < 40)){
    noStroke();
    fill("white");
    textFont(FontBEBold);
    textAlign(CENTER, CENTER);
    
  }else{
    noStroke();
    fill(colorVangeli);
    textFont(FontBEBold);
    textAlign(CENTER, CENTER);
    }
  
  text("GOSPEL OF MARK", 50 + 2*width/9 + 2*gutter + width/18, 28);


  //rect 2
  if (mouseX > 50 + width/9 + 10 && mouseX < 50 + 2 * width/9 + 10 && mouseY > 10 && mouseY < 40 ){
    fill(colorVangeli);
    noStroke()
    let rspace = width/9;
    cursor("pointer");
  }else{
    noFill();
    stroke(colorVangeli);
    strokeWeight(2);
    
  }
  rect(50 + gutter + width/9, 13, rspace, 34, 20);

  //testo 2 "GOSPEL OF JOHN"
  if((mouseX > 50 + width/9 + 10) && (mouseX < 50 + 2 * width/9 + 10) && (mouseY > 10 && mouseY < 40)){
    noStroke();
    fill("white");
    textFont(FontBEBold);
    textAlign(CENTER, CENTER);
    
  }else{
    noStroke();
    fill(colorVangeli);
    textFont(FontBEBold);
    textAlign(CENTER, CENTER);
    }
    text("GOSPEL OF JOHN", 50 + width/9 + gutter + width/18, 28);

}


