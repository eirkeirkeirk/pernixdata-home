(function() {
  var activeSection = 0;
  var intervalID = null;
  var intervalDelay = 6000;

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
    
    switch (id) {
      // case 0:
      //   $(".hypervisor > div.top.hotspot").removeClass("selected");
      //   $(".hypervisor > div.bottom.hotspot").removeClass("selected");
      //   break;
      // case 1:
      //   $(".hypervisor > div.top.hotspot").addClass("selected");
      //   $(".hypervisor > div.bottom.hotspot").removeClass("selected");
      //   break;
      // case 2:
      //   $(".hypervisor > div.top.hotspot").removeClass("selected");
      //   $(".hypervisor > div.bottom.hotspot").addClass("selected");
      //   break;
    }
  }

  function configureTabArea() {
    $("ul.feature-tabs li").click(function() {
      selectSection($(this).index());
      // if (!$(this).hasClass("active")) {
      //   var tabNum = $(this).index();
      //   var nthChild = tabNum + 1;
      //   $("ul.feature-tabs li.active").removeClass("active");
      //   $(this).addClass("active");
      //   $("ul.feature-tab li.active").removeClass("active");
      //   $("ul.feature-tab li:nth-child(" + nthChild + ")").addClass("active");
      // }
    });
  }

  function configureButtons() {
    $(".hypervisor > div.top.hotspot").click(function() {
      selectSection(1);
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
    $(".hypervisor > div.bottom.hotspot").click(function() {
      selectSection(2);
    });
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

  function startAutoplay() {
    intervalID = setInterval(function () {
      console.log("autoplay fired");
      var newSection = activeSection + 1 > 2 ? 0 : activeSection + 1;
      selectSection(newSection, true);
    }, intervalDelay);
  }

  function init() {
    configureTabArea();
    configureButtons();
    startAutoplay();
  }

  ($(function () {
    init();
  }));
})();