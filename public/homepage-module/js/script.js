(function() {
  var activeSection = 0;
  var intervalID = null;
  var intervalDelay = 6000;
  var drawInTimeline = new TimelineMax();

  function selectSection(id, automatic) {
    // If this was triggered by user action, not the interval, cancel the interval
    if (!automatic) {
      console.log("triggered by a human!");
      clearInterval(intervalID);
    }
    if (id === activeSection) {
      return;
    }
    activeSection = id;
    $("ul.feature-tabs li.active").removeClass("active");
    $("ul.feature-tabs li:nth-child(" + (id + 1) + ")").addClass("active");
    $("ul.feature-tab li.active").removeClass("active");
    $("ul.feature-tab li:nth-child(" + (id + 1) + ")").addClass("active");
    $(".hypervisor > div.hotspot.selected").removeClass("selected");
    $(".hypervisor > div.hotspot:nth-child(" + id + ")").addClass("selected");
  }

  function configureButtons() {
    // tab buttons
    $("ul.feature-tabs li").click(function() {
      selectSection($(this).index());
    });
    // "hot spots" on main graphic
    $(".hypervisor > div.top.hotspot").click(function() {
      selectSection(1);
    });
    $(".hypervisor > div.bottom.hotspot").click(function() {
      selectSection(2);
    });
    $(".hypervisor > div.top.hotspot").hover(
      function() {
        $(this).addClass("selected");
      },
      function () {
        if (activeSection === 1) {
          return;
        }
        $(this).removeClass("selected");
      }
    );
    $(".hypervisor > div.bottom.hotspot").hover(
      function() {
        $(this).addClass("selected");
      },
      function () {
        if (activeSection === 2) {
          return;
        }
        $(this).removeClass("selected");
      }
    );
  }

  /*
    TODO make this two different timelines, one for the left and one for the right so that I can start the right one at a certain time irrespective of what's going on with the left one.
  */
  function setUpScrollAnimation() {
    TweenLite.defaultEase = Strong.easeInOut;
    drawInTimeline.add("start");
    drawInTimeline.from("#feature .hypervisor", 1, {autoAlpha: 0});
    drawInTimeline.staggerFrom("#feature .hypervisor .hotspot", 1.5, {autoAlpha: 0}, 0.5, "start+=0.25");
    drawInTimeline.staggerFrom("#feature .hypervisor .vms .vm", 0.5, {scale: 0.0, autoAlpha: 0}, 0.125, "start+=0.5");
    drawInTimeline.from("#feature .hypervisor .label", 0.5, {scale: 0.0, autoAlpha: 0}, "start+=1");
    drawInTimeline.staggerFrom("#feature .servers .server", 1.5, {top: "+=50", autoAlpha: 0}, 0.25, "-=1.5");
    drawInTimeline.from("#feature .db", 1.5, {autoAlpha: 0}, "-=1.5");
    drawInTimeline.from("#feature .label.bottom", 1.5, {autoAlpha: 0, left: "-=50"}, "-=1.5");
    drawInTimeline.from("#feature .label.middle", 1.5, {autoAlpha: 0, left: "-=50"}, "-=1");
    drawInTimeline.from("#feature .label.top", 1.5, {autoAlpha: 0, left: "-=50"}, "-=1");
    drawInTimeline.staggerFrom("#feature .feature-tabs li", 1.5, {autoAlpha: 0}, 0.2, "-=2");
    drawInTimeline.staggerFrom("#feature .right hr", 1.5, {autoAlpha: 0}, 0.2, "-=2");
    drawInTimeline.from("#feature .right .feature-tab", 1.5, {autoAlpha: 0}, "-=1.5");
    drawInTimeline.addCallback(startAutoplay, "start+=2");
  	var controller = new ScrollMagic.Controller();
    
    var scene = new ScrollMagic.Scene({triggerElement: "#feature"})
    // .on("start", function () {
      // console.log("scene started");
      // drawInTimeline.play();
      // startAutoplay();
    // })
    .reverse(false)
    .setTween(drawInTimeline) // trigger a TweenMax.to tween
    // .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
    // .offset(-window.innerHeight / 4)
    .addTo(controller);
  }

  function startAutoplay() {
    console.log(">> start autoplay <<");
    intervalID = setInterval(function () {
      console.log("autoplay fired");
      var newSection = activeSection + 1 > 2 ? 0 : activeSection + 1;
      selectSection(newSection, true);
    }, intervalDelay);
  }

  function init() {
    configureButtons();
    setUpScrollAnimation();
  }

  ($(function () {
    init();
  }));
})();