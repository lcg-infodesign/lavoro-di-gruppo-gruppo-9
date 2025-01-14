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

// COLOR PALETTE 
let blueSfondo = "#252850";
let persone = "#FF4A6B";









// caricamento dati
function preload() {
  tablePeople = loadTable("Assets/persone.csv", "csv", "header");
  tableProva = loadTable("Assets/prova.csv", "csv", "header");
  tableFiltro = loadTable("Assets/filtro.csv", "csv", "header");
  data = loadJSON("Assets/TimeNomi.json");
  GentiumRegular = loadFont("Fonts/gentium-basic/GenBasR.ttf");
  GentiumBold = loadFont("Fonts/gentium-basic/GenBasB.ttf");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  let height = windowHeight;
  let width = windowWidth;

  //Riempio l'array nodes con i dati di JASON
  nodes = data.nodes;

  // Crea lo slider verticale
  slider = createSlider(0, totalSteps-1, 0); // Range da 0 a 24, valore iniziale 0
  slider.position(20, height-40); // Posizione
  slider.size(width-40);
  //slider.style('height', '20px')
  //slider.style('transform', 'rotate(90deg)'); // Ruota lo slider per renderlo verticale
  slider.style('background', '#ddd');
  slider.style('border-radius', '8px');
  slider.style('outline', 'none'); 
  
  /* 
  NON STA FUNZIONANDO
  // Disegna una scala numerica accanto allo slider
  let stepHeight = (height - 60) / totalSteps;
  for (let i = 0; i < totalSteps; i++) {
    let y = 500 + i * stepHeight - 10; // Calcola la posizione y per ogni numero
    textAlign(RIGHT, CENTER);
    textFont(GentiumBold);
    textSize(16);
    noStroke();
    fill("black");
    text(i, width - 45, y-419); // Posiziona i numeri accanto allo slider
  }
  */

}


function draw() {
  background("white");

  let height = windowHeight;
  let width = windowWidth;
  let padding = 60;

  // rettangolo sfondo grafica
  noStroke();
  fill(blueSfondo)
  rect(0, 60, width, height -120); 

  // Scritta CAPITOLO
  fill("white");
  textSize(25);
  textFont(GentiumBold);
  textAlign(LEFT, LEFT);
  text("CHAPTER " + sliderValue, 40, 115);

  /* 
  // LEGENDA
  for (let l = 1; l < 5; l++){
    fill("white");
    rect(40, 70 + (70 * l), 180, 50, 15);
  }
  noStroke();
  fill (persone);
  circle(65, 165, 30);

  fill("none");
  stroke(persone);
  strokeWeight(3);
  circle(65, 235, 30);

  fill(persone);
  circle(65, 235, 20);

  noStroke();
  fill ("#1C5991");
  drawHexagon (65, 305, 18);  

  stroke("gray");
  strokeWeight(3);
  line(55, 390, 80, 360);

  noStroke();
  textFont(GentiumBold);
  textSize(16);
  fill("black");
  text("Characters", 90, 170);
  text("Main characters", 90, 240);
  text("Events", 90, 310);
  text("Connections", 90, 380);
  */




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


  //disegno EDGES - sotto tutto
  drawEdges(matchingIDs);

  // CICLO FOR PER DISEGNARE COSE 
  for (let i = 0; i < nodes.length; i++) {

    // MAP x, y, size 
    let x = map (nodes[i].attributes.x, -1335.7671, 1328.8036, 20+padding, width-20-padding);
    let y = map (nodes[i].attributes.y, -1335.1002, 1331.486,  60 + padding2, height-60-padding2);
    let size = map (nodes[i].attributes.size, 25, 80 , 15, 70);

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
      fill("white"); 
      textSize(14);
      textAlign(CENTER, CENTER);
      textFont(GentiumBold);
      text(nodes[i].attributes.label, x-50, y, 100); // Scrivi il nome al centro del cerchio
    }    
  } 


  // sopra EDJES 
  // disegna CERCHI FISSI per God e Jesus -> personaggi princ
  if (sliderValue > 0){
    let xGod = map (-93.604515, -1335.7671, 1328.8036, 20+padding, width-20-padding);
    let yGod = map (-41.32583, -1335.1002, 1331.486,  60 + padding2, height-60-padding2);
    fill(100, 100, 100, 0);
    stroke(persone);
    strokeWeight(4);
    circle(xGod, yGod, 68)
  
    let xJes = map (-37.821632, -1335.7671, 1328.8036, 20+padding, width-20-padding);
    let yJes = map (-347.98218, -1335.1002, 1331.486,  60 + padding2, height-60-padding2);
    circle(xJes, yJes, 83)
  }

}


// FUNZIONE PER DISEGNARE CERCHI ED ESAGONI GRIGI SOTTO
function drawGrayCircle (x, y, size, type) {
  for (let j=0; j<nodes.length;j++){
    let type = nodes[j].attributes.type

  }

  if (type === "persona"){
    noStroke();
    fill ("#464971");
    circle (x, y, size);
    
  } else {
    noStroke();
    fill ("#464971");
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
    fill ("#1C5991");
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
      let y = map (sourceNode.attributes.y, minOriginalY,  maxOriginalY, 60 + padding2, height-60-padding2);
      let x1 = map(targetNode.attributes.x,minOriginalX, maxOriginalX, 20+padding, width-20-padding);
      let y1 = map(targetNode.attributes.y, minOriginalY, maxOriginalY,  60 + padding2, height-60-padding2);

      // Disegno linea edges
      stroke("#b8b7c7");
      strokeWeight(0.5);
      line(x, y, x1, y1);
    }     
  }

}

}
} 


//funzione che muove pallina NUOVA
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    slider.value(max(0, slider.value() - 1)); // Riduci il valore senza scendere sotto 0
  } else if (keyCode === RIGHT_ARROW) {
    slider.value(min(totalSteps - 1, slider.value() + 1)); // Aumenta il valore senza superare il massimo
  }
}




