(function() {
  var activeSection = 0;
  var intervalID = null;
  var intervalDelay = 10000;
  var drawInTimeline = new TimelineMax();
  var isAnimating = false;

  function selectSection(id, automatic) {
    // If this was triggered by user action, not the interval, cancel the interval
    if (!automatic) {
      clearInterval(intervalID);
    }
    if (id === activeSection || isAnimating) {
      return;
    }
    isAnimating = true;
    // tween out the active section
    var $oldActiveTab = $("ul.feature-tabs li.active");
    var $oldActiveContent = $("ul.feature-tab li.active");
    var $newActiveTab = $("ul.feature-tabs li:nth-child(" + (id + 1) + ")");
    var $newActiveContent = $("ul.feature-tab li:nth-child(" + (id + 1) + ")");
    $oldActiveTab.removeClass("active"); // fade current active tab button to black
    var tl = new TimelineMax();
    tl.to($oldActiveContent, 0.5, {autoAlpha:0, ease:Cubic.easeOut, onComplete: function () {
      $oldActiveContent.removeClass("active"); // removes the old active content from the flow
      $newActiveTab.addClass("active"); // fade new active tab button to red
      TweenMax.set($newActiveContent, {autoAlpha:0});
      $newActiveContent.addClass("active");
    }});
    // tween in the target section
    tl.to($newActiveContent, 0.5, {autoAlpha:1, ease:Cubic.easeIn, onComplete: function () {
      isAnimating = false;
      activeSection = id;
    }});
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

  function setUpScrollAnimation() {
    TweenLite.defaultEase = Strong.easeInOut;
    drawInTimeline.add("start");
    drawInTimeline.from("#feature .hypervisor", 1, {autoAlpha: 0});
    drawInTimeline.staggerFrom("#feature .hypervisor .hotspot", 1.5, {autoAlpha: 0}, 0.5, "start+=0.25");
    drawInTimeline.staggerFrom("#feature .hypervisor .vms .vm", 0.5, {scale: 0.0, autoAlpha: 0}, 0.125, "start+=0.5");
    drawInTimeline.from("#feature .hypervisor .label", 0.5, {scale: 0.0, autoAlpha: 0}, "start+=1");
    drawInTimeline.staggerFrom("#feature .servers .server", 1.5, {top: "+=50", autoAlpha: 0}, 0.25, "-=1.5");
    drawInTimeline.from("#feature .db", 1.5, {autoAlpha: 0}, "-=1.5");
    drawInTimeline.from("#feature .label.top", 1.5, {autoAlpha: 0, left: "-=50"}, "-=1.5");
    drawInTimeline.from("#feature .label.middle", 1.5, {autoAlpha: 0, left: "-=50"}, "-=1");
    drawInTimeline.from("#feature .label.bottom", 1.5, {autoAlpha: 0, left: "-=50"}, "-=1");
    drawInTimeline.staggerFrom("#feature .feature-tabs li", 1.5, {autoAlpha: 0}, 0.2, "-=2");
    drawInTimeline.staggerFrom("#feature .right hr", 1.5, {autoAlpha: 0}, 0.2, "-=2");
    drawInTimeline.from("#feature .right .feature-tab", 1.5, {autoAlpha: 0}, "-=1.5");
    drawInTimeline.addCallback(startAutoplay, "start+=2");
    drawInTimeline.addCallback(function () {console.log("finished draw-in");isAnimating = false;});

    var controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({triggerElement: "#feature", triggerHook: 0.8})
    .reverse(false)
    .setTween(drawInTimeline)
    .addTo(controller);
  }

  function startAutoplay() {
    intervalID = setInterval(function () {
      console.log("autoplay fired");
      var newSection = activeSection + 1 > 2 ? 0 : activeSection + 1;
      selectSection(newSection, true);
    }, intervalDelay);
  }

  function init() {
    configureButtons();
    // setUpScrollAnimation();
  }

  ($(function () {
    init();
  }));
})();