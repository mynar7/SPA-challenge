# Single Page App Challenge!

The Challenge was to implement an app that behaved similarly to a video of an app. The video depicted an app that had pictures of cartoon characters arranged in a grid, and when moused-over, the images would resize and bounce into position. The other images would slide into nearby empty space. The goal was to create an MVP in a limited amount of time.

## My Notes from the Source Video:

### Images: 
* On hover, images double in size and transition from a transparent background to a color background.
* Not all images are shown transitioning in the video.
* The colors shown are: yellow, blue, lighter blue, pink, orange, and green.
* Some images share a background color.
* Images resume normal size when the cursor leaves.
* Images can cross between the top row and bottom row of their container.
* Order of images is not preserved. Image order is augmented each time an image resizes.
* One image in each container is enlarged at the start of the video.
* Large images have a slight bounce animation when they change positions in the grid.
* Small images have a slide animation when they change positions.

### Layout:
* The App is composed of two containers of eight small cells and one large cell which is the size of four smaller cells.
* Each Container has two rows.
* Each Row is six small cells wide.
* Images fill empty spaces in the grid so that no holes are present.

## Challenges:

1. **Because images fill holes in the grid, it was impossible to maintain the original shape of the container with CSS alone.**  
  I tried to implement a solution with CSS transitions and the hover pseudo-element. I was able to resize the images, but I couldn't maintain the desired layout.  
  I tried to wrap the elements with flex-box which worked moderately well but again left holes in the grid.  
  I realized I had a two-dimensional layout. I had previously heard of a property of Grid that filled empty space in a layout, and decided to reach for CSS Grid. I gave myself a crash-course in Grid layouts and used `grid-auto-flow: dense` to fill holes in the layout.  
  
1. **I realized that while I was filling holes when hovering over top-row images, when I enlarged images from the bottom row they would enlarge in place and the remaining images would flow afterward.**  
  I attempted to modify the `order` CSS property to pull bottom row images upward.  
  I also attempted to tell each hovered item to span two rows and columns manually using `grid-area`.  
  Both techniques failed because any manually ordered element is rendered first, so each hovered item _always_ took the space at the beginning of each container.  
  
1. **Eventually, I realized that each bottom row image must occupy space according to whatever is currently enlarged.**  
  Because I was using React, I was rendering the images based off an array of images I received from the Lorem Picsum API and saved to state. I split each container's images into two arrays in the state of nine images a piece.
  I wrote an algorithm that moved each bottom row image according to what image was enlarged, and what position the to-be-enlarged image was to be in:
  >If the to-be-enlarged image's index minus the currently-enlarged-image's index equals four,
  > move the to-be-enlarged image five places higher in the image array. 
  >Else, move it four places higher.  
  
  This algorithm kept the images underneath the mouse cursor allowing the use of a hover vs click listener and prevented the need for a debounce function or another workaround.
  
## Improvements and Stray Thoughts:

1. The app is not mobile responsive.
1. Occasionally the API will return a broken image. I haven't found a clean solution to check for broken images with JS. I could pick a set of 18 working images at the start, but the image variety is worth the tradeoff of having to refresh the app to get new images.
1. Some images do not have a color variant from the API. This may be mistaken for a bug in the application versus the nature of the API results.
1. Images are currently animated using CSS transitions and because of the nature of Grid containers, are set to fixed widths. If not set to a fixed size, the images will expand the grid containers beyond their set size.
1. I was not able to attempt background color transitions because I could not find an API that returned transparent image URLs. I do not think I would have been able to animate color changes with CSS alone.
1. The App does not fill the window size as in the video. This was not explicit in the specification and would be difficult to implement for varying screen sizes with my use of CSS transitions and fixed widths of images.
1. Smaller images also do not follow a specific rearrangement pattern as they appear to do in the video. The video shows the top container's images sliding left/right and down to accompany, and the bottom container's left/right and up.
1. This was a challenging build! At first blush, I thought it would be difficult; In the end, it gave me more trouble than I had first imagined.
