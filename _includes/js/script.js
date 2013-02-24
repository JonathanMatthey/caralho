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

  $.History.bind(function(state){
    // Update the current element to indicate which state we are now on
    // Update the page's title with our current state on the end
    console.log(state);
    var stateName = state.substr(1,state.length);
    $("." + stateName + "-page").addClass('slide-in');
  });

  // Bind a handler for state: bananas
  $.History.bind('/about',function(state){
    // Update Menu
    // updateMenu(state);
    // Show bananas tab, hide the other tabs
    // $tabs.hide();
    // $bananas.stop(true,true).fadeIn(200);
    $("#about-link").attr('href','/');
  });

  $(".project-details .read-more").click(function(evt){
    evt.preventDefault();
    $(".project-details").addClass('expanded');
  });


});