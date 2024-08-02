// Wallpaper parameters
let rect_width = 20;
let rect_height = 20;

// Star parameters
let star_count = 1000; // Number of stars
let star_min_size = 1; // Minimum size of stars
let star_max_size = 5; // Maximum size of stars

// Saturn parameters
let saturn_diameter = 300; // Diameter of Saturn
let saturn_color_start = [255, 204, 0]; // Start color of Saturn
let saturn_color_end = [255, 165, 0]; // End color of Saturn
let saturn_gradient_steps = 10; // Number of gradient steps

// Ring parameters
let ring_count = 8; // Number of rings
let ring_initial_width = 30; // Initial width of the rings
let ring_width_increment = 7.5; // Incremental width for each ring
let ring_radius_increment = 60; // Incremental radius for each ring
let ring_color_start = 100; // Starting color transparency for rings
let ring_color_increment = 30; // Incremental color transparency for each ring
let ring_tilt_angle = 45; // Tilt angle for the rings in degrees

// Asteroid parameters
let asteroid_count = 40; // Number of asteroids
let asteroid_min_size = 10; // Minimum size of asteroids
let asteroid_max_size = 30; // Maximum size of asteroids
let asteroid_gradient_steps = 5; // Number of gradient steps for asteroids

// Cosmic dust parameters
let dust_count = 400; // Number of cosmic dust particles
let dust_min_size = 1; // Minimum size of dust particles
let dust_max_size = 5; // Maximum size of dust particles

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GLIDE_WALLPAPER);
  pWallpaper.resolution(NINE_LANDSCAPE);
  pWallpaper.show_guide(false);

  pWallpaper.grid_settings.cell_width = 3508;
  pWallpaper.grid_settings.cell_height = 4961;
  pWallpaper.grid_settings.row_offset = 125;
}

function wallpaper_background() {
  background(0); // black background to represent space
  drawStars(0); // Draw stars in the background
  drawAsteroids(0); // Draw asteroids in the background
  drawCosmicDust(0); // Draw cosmic dust in the background
}

function drawStars(i) {
  if (i < star_count) { // Base condition for recursion
    let starX = random(width);
    let starY = random(height);
    let starSize = random(star_min_size, star_max_size); // Randomize the size of stars
    fill(255); // white color for the stars
    ellipse(starX, starY, starSize, starSize); // Draw the star
    drawStars(i + 1); // Recursive call
  }
}

function drawGradientEllipse(x, y, w, h, colorStart, colorEnd, steps) {
  for (let i = 0; i <= steps; i++) {
    let inter = map(i, 0, steps, 0, 1);
    let c = lerpColor(color(colorStart), color(colorEnd), inter);
    fill(c);
    noStroke();
    ellipse(x, y, w * (1 - i / steps), h * (1 - i / steps));
  }
}

function drawAsteroids(i) {
  if (i < asteroid_count) { // Base condition for recursion
    let x = random(width);
    let y = random(height);
    let size = random(asteroid_min_size, asteroid_max_size);
    let gradientSteps = map(size, asteroid_min_size, asteroid_max_size, 1, asteroid_gradient_steps);

    // Generate random start and end colors for each asteroid
    let colorStart = [random(255), random(255), random(255)];
    let colorEnd = [random(255), random(255), random(255)];

    drawGradientEllipse(x, y, size, size, colorStart, colorEnd, gradientSteps);
    drawAsteroids(i + 1); // Recursive call
  }
}

function drawCosmicDust(i) {
  if (i < dust_count) { // Base condition for recursion
    let x = random(width);
    let y = random(height);
    let size = random(dust_min_size, dust_max_size);
    let dustColor = [random(255), random(255), random(255)]; // Random color for each dust particle
    
    fill(dustColor);
    noStroke();
    ellipse(x, y, size, size); // Draw cosmic dust
    drawCosmicDust(i + 1); // Recursive call
  }
}

function my_symbol() {
  const x = width / 2; // Center of the canvas
  const y = height / 2; // Center of the canvas

  // Draw Saturn's body with gradient color
  drawGradientEllipse(x, y, saturn_diameter, saturn_diameter, saturn_color_start, saturn_color_end, saturn_gradient_steps);
  
  // Optional: Add some surface details on Saturn
  stroke(...saturn_color_start); // lighter yellow color
  strokeWeight(2);
  noFill();
  ellipse(x, y, saturn_diameter - 5, saturn_diameter - 5); // surface detail
  ellipse(x, y, saturn_diameter - 15, saturn_diameter - 15); // surface detail

  // Draw the rings of Saturn with a sparkling effect
  noFill();
  strokeWeight(2);
  push(); // Save the current drawing state
  translate(x, y); // Move origin to the center of Saturn
  rotate(radians(ring_tilt_angle)); // Tilt the rings by 45 degrees
  drawRing(0); // Start the recursive drawing of rings
  pop(); // Restore the previous drawing state
}

function drawRing(i) {
  if (i < ring_count) { // Base condition for recursion
    let ringWidth = ring_initial_width + i * ring_width_increment;
    let ringRadius = saturn_diameter / 2 + i * ring_radius_increment; // Adjust the radius to ensure rings surround Saturn
    
    // Draw rings around Saturn
    stroke(255, 255, 255, ring_color_start + i * ring_color_increment); // white color with gradient effect
    ellipse(0, 0, ringRadius * 2, ringWidth); // Outer ring
    
    // Draw inner rings with sparkle effect
    stroke(255, 255, 255, 200); // high opacity for sparkling effect
    ellipse(0, 0, (ringRadius - 5) * 2, ringWidth - 5); // Inner ring
    
    drawRing(i + 1); // Recursive call
  }
}

// Call the setup and drawing functions
setup_wallpaper(this);
wallpaper_background();
my_symbol();
