$(document).ready(function(){

  var scrolledToBottom = false;

  if (window.location.href.indexOf("#") == -1){
    $.History.go('/');
  }

  // $("a#about").click(function(evt){
  //   evt.preventDefault();
  //   $(".about-page").addClass('slide-in');
  // });

  $(window).resize(function() {
    var aboutPageHeight = $(window).height() - parseInt($(".about-page").css('padding-top'),10);
    $(".about-page").css('height', aboutPageHeight);
    $("#main").css('margin-top','-' + $(window).height() +'px');
  });
  $(window).resize();

  // Bind a handler for ALL hash/state changes
  $.History.bind(function(state){
    // Update the current element to indicate which state we are now on
    // Update the page's title with our current state on the end

    console.log(state);

    // check if not on about or / routes
    if (window.location.href.indexOf("about") == -1 && (window.location.href.indexOf("/#/") != (window.location.href.length-3))){
      var stateName = state.substr(1,state.length);
      showProjectView(state);
    }

    // $("." + stateName + "-page").addClass('slide-in');
  });

  // Bind a handler for root state
  $.History.bind('/',function(state){
    $("html").addClass('noscroll');
    $("#main").addClass('home-view');
  });

  // Bind a handler for state: bananas
  $.History.bind('/about',function(state){
    $("html").addClass('noscroll');
    $("#main").addClass('about-view');
    $("#about-link").attr('href','/');
  });

  // $(".project-list a").eq(1).mouseenter(function(evt){
  //   console.log('mouseenter');
  //   evt.preventDefault();
  //   t = $(evt.currentTarget);
  //   $(".rollover-imgs ." + t.attr('class')).addClass('active');
  //   // context.drawImage(images.snow1, 100, 30, 1000, 1000);
  //   // context.drawImage(images.snow2, 100, 30, 1000, 1000);
  // });

  $(".project-list a").mouseenter(function(evt){
    console.log('mouseenter');
    evt.preventDefault();
    t = $(evt.currentTarget);
    $(".rollover-imgs ." + t.attr('class')).addClass('active');
    // context.drawImage(images.volcom1, 100, 30, 1000, 1000);
    // context.drawImage(images.volcom2, 100, 30, 1000, 1000);
  });

  $(".project-list a").mouseleave(function(evt){
    console.log('mouseleave');
    evt.preventDefault();
    $(".rollover-imgs .active").removeClass('active');
    // canvas.width = canvas.width;
  });

  $(".project-list a").click(function(evt){
    evt.preventDefault();
    var projectUrl = $(evt.currentTarget).attr('href');
    projectUrl = projectUrl.replace('/#/caralho','');
    console.log('projectUrl - line 60');
    console.log(projectUrl);
    $("#main").addClass('bottom-wave-anim');
    $.History.go(projectUrl);
  });
  $(".prev-link,.next-link").click(function(evt){
    evt.preventDefault();
    var projectUrl = $(evt.currentTarget).attr('href');
    projectUrl = projectUrl.replace('/#/caralho','');
    console.log('projectUrl - line 60');
    console.log(projectUrl);
    $.History.go(projectUrl);
  });

  $(".about").click(function(evt){
    evt.preventDefault();
    if ( $(document).scrollTop() > 10 ){
      $('html, body').animate({
        scrollTop: 0
      }, 1000, function(){
        showAboutView();
      });
    }
    else {
      showAboutView();
    }
  });

  function showHomeView(){
    $("#main").addClass('home-view about-slide-transition');
    $("#main").removeClass('bottom-section-view about-view');
    $.History.go('/');
  }

  function showAboutView(){
    $("#main").addClass('about-view about-slide-transition');
    $("#main").removeClass('bottom-section-view home-view');
    $.History.go('/about');
  }

  function showProjectView(projectUrl){
    // $("#main").addClass('project-view');
    $("#main").removeClass('about-view home-view');
    $("#main").addClass('bottom-section-view');
    var projectUrl = '/caralho' + projectUrl;
    console.log(projectUrl);
    $("#project-page").load( projectUrl + " #projectmain", function(){
      // $("#main").addClass('project-view');
      bindProjectPageEvents();
      loadPrevNextAnimGif();
    });
  }

  function loadPrevNextAnimGif(){
    // /img/animated-gifs/{{ page.next.post_id }}.gif
    $(".prev-anim-gif").attr('src',$(".prev-anim-gif-src").val());
    $(".next-anim-gif").attr('src',$(".next-anim-gif-src").val());
    $(".prev-link").attr('href',$(".prev-project-url").val());
    $(".next-link").attr('href',$(".next-project-url").val());
  }

  $(".all-work").click(function(evt){
    evt.preventDefault();
    if ( $(document).scrollTop() > 10 ){
      $('html, body').animate({
        scrollTop: 0
      }, 1000, function(){
        showHomeView();
      });
    }
    else {
        showHomeView();
    }
  });

  var windowHeight = $(window).height();
  var docHeight = $(document).height();

  $(document).scroll(function() {
    console.log('scroll');
    if ($("#main.bottom-section-view").length > 0){
      console.log('scroll in project view');
      windowHeight = $(window).height();
      docHeight = $(document).height();
      docScrollTop = $(document).scrollTop();
      if ( !scrolledToBottom ){
        if( docScrollTop < 600 && $(".social-bar").hasClass('show')){
          $(".social-bar").removeClass('show');
        }
        else if( docScrollTop > 600 && !$(".social-bar").hasClass('show')){
          $(".social-bar").addClass('show');
        }

        if (docScrollTop > (docHeight - (3 * windowHeight)) ) {
          $('html, body').animate({
              scrollTop: docHeight
           }, 500);
           scrolledToBottom = true;
           $("#main").addClass("hide-prevnext");
        }
      }
      if (docScrollTop > (docHeight - (3 * windowHeight)) ) {
         $("#main").addClass("hide-prevnext");
      }
      else if ($("#container.hide-prevnext").length){
        $("#container.hide-prevnext").removeClass('hide-prevnext');
      }
    }
  });

  windowWidth = 1024;

  $(".project-list a").mousemove(function(evt){
    var currentPosX = evt.pageX;
    var currentPosY = evt.pageY;
    if(currentPosX < windowWidth/2){

    } else {

    }
    $(evt.currentTarget).find('.project-rollover-wrapper > img').first().css("left", 1*(currentPosX/windowWidth)*30+15+"px");
    $(evt.currentTarget).find('.project-rollover-wrapper > img').last().css("left", -1*(currentPosX/windowWidth)*30+155+"px");
  });



});
// END DOC READY

function bindProjectPageEvents(){

  $(".project-details .read-more").unbind().click(function(evt){
    evt.preventDefault();
    if ($(".project-details.expanded").length == 0 ){
      $(".project-details").addClass('expanded');
      $(".project-details .read-more").hide();
      $(".project-details .read-less").show();
    }
  });

  $(".project-details .read-less").unbind().click(function(evt){
    evt.preventDefault();
    if ($(".project-details.expanded").length != 0 ){
      $(".project-details").removeClass('expanded');
      $(".project-details .read-less").hide();
      $(".project-details .read-more").show();
    }
  });

  $("html").removeClass('noscroll');

}