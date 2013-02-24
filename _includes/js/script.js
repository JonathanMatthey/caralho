$(document).ready(function(){

  // $("a#about").click(function(evt){
  //   evt.preventDefault();
  //   $(".about-page").addClass('slide-in');
  // });

  // Bind a handler for ALL hash/state changes
  $.History.bind(function(state){
    // Update the current element to indicate which state we are now on
    // Update the page's title with our current state on the end
    console.log(state);
    var stateName = state.substr(1,state.length);
    $("." + stateName + "-page").addClass('slide-in');
  });

});