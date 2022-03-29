/*
Mandelbrot set
https://bit.ly/3Ntjh9X
https://bit.ly/3tNQ0Py
https://youtu.be/6z7GQewK-Ks video explanation
https://en.wikipedia.org/wiki/Plotting_algorithms_for_the_Mandelbrot_set
*/

var maxVal = 1
var minVal = -1
var maxSlider, minSlider;

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  pixelDensity(1);
  maxSlider = createSlider(0, maxVal,maxVal, 0.01);
  minSlider = createSlider(minVal, 0, minVal, 0.01);
}

function draw() {
  loadPixels();
  
  var maxiterations = 100, toinf = 2;


  //a + bi complex number
  //cycle trough every couple of real and imaginary part of a complex number representable in the canvas as coordinates, mapped from -2 to 2
  for(var x = 0; x < width; x++)
  {
    for(var y = 0; y < height; y++)
    {
      var a = map(x, 0, width, minSlider.value(), maxSlider.value());
      var b = map(y, 0, height, minSlider.value(), maxSlider.value());

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
      
      
      var r = map(n, 0, maxiterations, 0, 255);
      var g = map(n, 0, maxiterations, 0, 0);
      var b = map(n, 0, maxiterations, 0, 0);
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
  noLoop();
  //wait(50);
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

