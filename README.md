# Single Page App Challenge!

The Challenge was to implement an app that behaved similarly to a video of an app. The video depicted an app that had pictures of cartoon characters arranged in a grid, and when moused-over, the images would resize and bounce into position. The other images would slide into nearby empty space. The goal was to create an MVP in a limited amount of time.

## My Notes from the Source Video:

### Images: 
* On hover images double in size and transition from a transparent background to a color background.
* Not all images are hovered over in the video.
* The colors shown are: yellow, blue, lighter blue, pink, orange, and green.
* Some images share a background color.
* Images resume normal size when mouse leaves.
* Images can cross between the top row and bottom row of their container.
* Order of images is not preserved. Image order is augumented each time an image resizes.
* One image in each container is enlarged at the start of the video.
* Large images have a slight bounce animation when they change positions in the grid.
* Small images have a slide animation when they change positions.

### Layout:
* App is composed of two containers of 8 small cells and 1 large cell which is the size of 4 smaller cells.
* Each Container has 2 rows.
* Each Row is 6 small cells wide.
* Images fill empty spaces in the grid so that no holes are present.

## Challenges:
1. **Because images fill holes in the grid, it was impossible to maintain the original shape of the container with CSS alone.**  
  I tried to implement a solution with CSS transitions and the hover psuedo-element. I was able to resize the images but I couldn't maintain the desired layout.  
  I tried to wrap the elements with flex-box which worked moderately well but again left holes in the grid.  
  I realized I had a two-dimensional layout and had previously heard of a property of Grid that filled empty space in a layout, decided to reach for CSS Grid. I gave myself a crash-course in Grid layouts and used `grid-auto-flow: dense` to fill holes in the layout.  
1. **I realized that while I was filling holes when hovering over top-row images, when I enlarged images from the bottom row they would enlarge in place and the remaining images would flow afterward.**
