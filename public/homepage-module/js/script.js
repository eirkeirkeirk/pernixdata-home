function selectSection(id) {
  console.log(id);
  switch (id) {
    // return to default intro state
  case 0:
    $(".hypervisor > div.top.hotspot").removeClass("selected");
    $(".hypervisor > div.bottom.hotspot").removeClass("selected");
    break;
  case 1:
    $(".hypervisor > div.top.hotspot").addClass("selected");
    $(".hypervisor > div.bottom.hotspot").removeClass("selected");
    break;
  case 2:
    $(".hypervisor > div.top.hotspot").removeClass("selected");
    $(".hypervisor > div.bottom.hotspot").addClass("selected");    
    break;
  }
}

function configureTabArea() {
  $("ul.feature-tabs li").click(function() {
    if (!$(this).hasClass("active")) {
      var tabNum = $(this).index();
      var nthChild = tabNum + 1;
      $("ul.feature-tabs li.active").removeClass("active");
      $(this).addClass("active");
      $("ul.feature-tab li.active").removeClass("active");
      $("ul.feature-tab li:nth-child(" + nthChild + ")").addClass("active");
    }
  });
}

function configureButtons() {
  $(".hypervisor > div.top.hotspot").click(function() {
    selectSection(1);
    return false;
  });
  $(".hypervisor > div.top.hotspot").hover(
    function() {
      selectSection(1);
    },
    function () {
      selectSection(0);
    }
  );
  $(".hypervisor > div.bottom.hotspot").click(function() {
    selectSection(2);
    return false;
  });
  $(".hypervisor > div.bottom.hotspot").hover(
    function() {
      selectSection(2);
    },
    function () {
      selectSection(0);
    }
  );
}

function init() {
  configureTabArea();
  configureButtons();
}

($(function () {
  init();
}));