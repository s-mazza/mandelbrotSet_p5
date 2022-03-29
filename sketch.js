/*
Mandelbrot set
https://bit.ly/3Ntjh9X
https://bit.ly/3tNQ0Py
https://youtu.be/6z7GQewK-Ks video explanation
https://en.wikipedia.org/wiki/Plotting_algorithms_for_the_Mandelbrot_set
https://thecodingtrain.com/CodingChallenges/021-mandelbrot-p5.html
*/

var maxVal = 1
var minVal = -1
var maxSlider, minSlider;

function setup() {
  createCanvas(parseInt(min(windowWidth, windowHeight) / 1), parseInt(min(windowWidth, windowHeight) / 1));
  rotate(PI / 2);
  pixelDensity(1);
  maxSlider = createSlider(0, maxVal,maxVal, 0.01);
  minSlider = createSlider(minVal, 0, minVal, 0.01);
}

function draw() {
  loadPixels();
  rotate(PI / 2);
  
  var maxiterations = 300, toinf = 2;

  var mincolor = parseInt(random(0, 0xffffff));

  var maxcolor = parseInt(random(0, 0xffffff));
  //a + bi complex number
  //cycle trough every couple of real and imaginary part of a complex number representable in the canvas as coordinates, mapped from -2 to 2
  for(var x = 0; x < width; x++)
  {
    for(var y = 0; y < height; y++)
    {
      var a = map(x, 0, width, minVal, maxVal);
      var b = map(y, 0, height, minVal, maxVal);

      var ca = a;//original c
      var cb = b;
      
      var n = 0;
      for(; n < maxiterations; n++)
      {
        //development of complex number squared itself, you can do it on paper
        var newa = a * a - b * b;
        var newb = (a + a) * b;
        a = newa + ca;
        b = newb + cb;
        if((a*a + b*b) > (toinf * toinf)) // for definition Mandelbrot are all the points that do not converge to infinity, so after a certain number we block it(and we say it has reached "escape")
        {
          break;
        }
      }
      

      //console.log(maxcolor);
      var colore = parseInt(map(n, 0, maxiterations, mincolor, maxcolor));
      
      var r = (colore & 0xff0000) >> 16;
      var g = (colore & 0x00ff00) >> 8;
      var b = colore & 0x0000ff;

      if(n == maxiterations)
      {
        r = 0; g = 0; b = 0; 
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = r;
      pixels[pix + 1] = g;
      pixels[pix + 2] = b;
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();

  //noLoop();
  //wait(100);
}

function wait(time)
{
  start = millis()
  do
  {
    current = millis();
  }
  while(current < start + time)
}

