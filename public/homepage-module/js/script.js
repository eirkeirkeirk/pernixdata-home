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

function init() {
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

($(function () {
  $(window).load(function() {
    init();
  });
}));