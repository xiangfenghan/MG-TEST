$(document).on('ready', function() {


  // var images = ["http://placehold.it/200x200?text=200*200", "http://placehold.it/200x400?text=200*400", "http://placehold.it/400x200?text=400*200","http://placehold.it/400x400?text=400*400"];

  var surface = 48;
  var gridDivs = $(".grid");
  
  var images = [{url: "http://placehold.it/200x200/009999/000000?text=200*200", size: 4, height: 2, width: 2, class:''}, 
                {url: "http://placehold.it/400x400/004d99/000000?text=400*400", size: 16, height: 4, width: 4, class:'grid-item-height2 grid-item-width2'},
                {url: "http://placehold.it/200x400/730099/000000?text=200*400", size: 8, height: 4, width: 2, class:'grid-item-height2'},
                {url: "http://placehold.it/400x200/990026/000000?text=400*200", size: 8, height: 2, width: 4, class:'grid-item-width2'}];

  var availableSpace = [8,8,8];

  for(i=0; i<gridDivs.length; i++) {

    var fitImages = findFitImages();
    

    for (j=0; j<fitImages.length; j++) {

      var div = $('<div />', {
                          class: 'grid-item ' + fitImages[j].class
                          });

      var image = $('<img />', {
                            src: fitImages[j].url
                            });

      image.appendTo(div);
      div.appendTo(gridDivs[i]);
    }
    
  }

  //Find fit  images 
  function findFitImages() {

     var surfaceTotal = 0;
     var height = 0;
     var width = 0;
     var newImages = [];
     var random = 0;
     var rowAt = 0;

    do {

      if(surfaceTotal <= surface) {

        random = Math.floor(Math.random()*4);

        surfaceTotal += images[random].size;
        width = availableSpace[rowAt] - images[random].width;

        newImages.push(images[random]);

        if(width < 0) {
          surfaceTotal = surfaceTotal - images[random].size;
          // console.log('pop1');
          newImages.pop();
            
        }else {
          availableSpace[rowAt] = width;
          // console.log('Row ' + rowAt);
          // console.log('space ' + availableSpace[rowAt]);
          // console.log('image width ' + images[random].width + ' height ' + images[random].height);
          if(images[random].height > 2){
            if (rowAt < 2) {
              availableSpace[rowAt + 1] = availableSpace[rowAt + 1] - images[random].width;
            } else {
              availableSpace[rowAt] += images[random].width;
              surfaceTotal = surfaceTotal - images[random].size;
              // console.log('pop2');
              newImages.pop();
            }
          }
        }

        if(availableSpace[rowAt] == 0) {

          rowAt++;
        }
        
      }else{

        newImages.push(images[random]);
        newImages.pop();
        surfaceTotal = surfaceTotal - images[random].size;
      }

    } while (surfaceTotal !== surface && rowAt < 3)

    availableSpace = [8, 8, 8];
    rowAt = 0;
    // newImages.sort(SortBySize);
    return newImages;
}

/* Sort the images */
function SortBySize(a, b){

  if (a.size != b.size) {
    return (a.size < b.size) ? 1 : -1;
  } else {
    if (a.height != b.height) {
      return (a.height < b.height) ? 1 : -1;
    } else {
      if (a.width == b.width) {
        return 0;
      } else {
        return (a.width < b.width) ? 1 : -1;
      }
    }
  }
}


  /* Slick Slide Carousel */
  $(".center").slick({
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    variableHeight: true,
    focusOnSelect: true
  });

  /* masonry layout */
  // init Masonry
  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });
  // layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });

});
