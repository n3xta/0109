let numSites = 30;
let voronoiCells = [];
let palette = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100);
  
  for (let i = 0; i < numSites; i++) {
    let x = random(width / 1); // i dont know why but under webgl mode divide by 2 works
    let y = random(height / 1);
    voronoiSite(x, y);
  }

  voronoi(width, height, true);
  voronoiCells = voronoiGetCells();

  for (let i = 0; i < voronoiCells.length; i++) {
    let hueValue = map(i, 0, voronoiCells.length, 0, 360);
    let hueOffset = random(-30, 30); 
    let satValue = random(50, 100);
    palette.push(color((hueValue + hueOffset + 360) % 360, satValue, 100));
  }
  
  noLoop();
}

function draw() {
  background(220);
  
  for (let i = 0; i < voronoiCells.length; i++) {
    let cell = voronoiCells[i];
    
    if (!cell || cell.length < 3) continue;
    
    fill(palette[i]);
    stroke(0);
    strokeWeight(1);
    
    beginShape();
    for (let j = 0; j < cell.length; j++) {
      vertex(cell[j][0], cell[j][1]);
    }
    endShape(CLOSE);
  }

}
