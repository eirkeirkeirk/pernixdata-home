var SEEK_POSITION = 0;
var TIME_SCALE = 1;
var mainTimeline;
var arrowSpeed = 2.0;
var vmSlideDistance = 346;
var faultGray = "#888888";
var faultRed = "#AB282B";
var lastCompletedSection = null;
var headlines = [
  "100% Non-Disruptive",
  "Flash and RAM Clustered Across Hosts",
  "Fault Tolerant Read/Writes",
  "Distributed Fault Tolerant Memory",
  "Scale Out Storage Performance"
]
var subheadlines = [
  "No Reboots, Application Rewrites or Process Changes",
  "Access Data from any Device inside an FVP Cluster",
  "Synchronously Replicate Between Media<br>for Full Data Protection",
  "Turn RAM into a Non Volatile Medium",
  "Cost Effectively Grow Performance with Compute Resources"
]
var bullets = [
  "<p>• No changes to VM</p><p>• Transparent to storage</p>",
  "<p>Seamless VM operations</p><p>• vMotion</p><p>• DRS</p><p>• HA</p><p>• Snapshot</p>",
  "<p>• Lowest latency</p><p>• Full data protection</p>"
]

TweenLite.defaultEase = Cubic.easeInOut;

function hideAllElements() {
  $("#features-animation").children().each(function () {
    TweenLite.set(this, {autoAlpha:0});
  });
}

// Lay out the stage for the start of the animation sequence
function initAnimation() {
  TweenLite.set("#features-animation h1", {autoAlpha:1, text:headlines[0]});
  TweenLite.set("#features-animation h2", {autoAlpha:1, text:subheadlines[0]});
  TweenLite.set($("#features-animation .hypervisor.one .devices").children(), {autoAlpha:0});
  TweenLite.set($("#features-animation .hypervisor.two .devices").children(), {autoAlpha:0});
  TweenLite.set("#features-animation .hypervisor.one", {autoAlpha:1});
  TweenLite.set("#features-animation .hypervisor.two", {autoAlpha:1});
  TweenLite.set("#features-animation .db", {autoAlpha:1});
}

// Fades in devices, software box, multiarrow
// Then goes through entire animation
function getFrameOneDrawInTimeline() {
  var tl = new TimelineMax();
  tl.add("start");
  // init the stack labels and arrows
  tl.set("#bullets", {text:bullets[0]});
  tl.set("#features-animation #stack-labels", {autoAlpha:1});
  tl.set($("#features-animation #stack-labels").children(), {autoAlpha:0});
  tl.set("#features-animation #stack-arrows", {autoAlpha:1});
  tl.set($("#features-animation #stack-arrows").children(), {autoAlpha:0});
  // init the arrows between devices
  tl.set("#features-animation .hypervisor.one .devices .arrows", {autoAlpha:1});
  tl.set("#features-animation .hypervisor.one .devices .arrows .animation-arrow", {autoAlpha:0});

  tl.to([
    "#features-animation .hypervisor.one .devices .ram",
    "#features-animation .hypervisor.one .devices .pci-card",
    "#features-animation .hypervisor.one .devices .ssd"], 2, {autoAlpha:1}
  );
  tl.to([
    "#features-animation .hypervisor.two .devices .ram",
    "#features-animation .hypervisor.two .devices .pci-card",
    "#features-animation .hypervisor.two .devices .ssd"], 2, {autoAlpha:1}, "start"
  );
  tl.add("software-box", "-=0.5");
  tl.to("#features-animation #software-box", 2, {autoAlpha:1}, "software-box");
  tl.add("multiarrow", "-=1");
  tl.to("#features-animation .multiarrow.nondisruptive", 3, {autoAlpha:1}, "multiarrow");
  tl.add("stack-labels", "-=1");
  tl.to("#features-animation #stack-labels .server", 1, {autoAlpha:1}, "stack-labels");
  tl.add("arrow-one");
  tl.to("#features-animation .animation-arrow.server", 1, {autoAlpha:1}, "arrow-one");
  tl.to("#features-animation .animation-arrow.server .arrowline", 0.5, {width:20}, "arrow-one");
  tl.to("#features-animation #stack-labels .flash", 1, {autoAlpha:1});
  tl.add("arrow-two");
  tl.to("#features-animation .animation-arrow.flash", 1, {autoAlpha:1}, "arrow-two");
  tl.to("#features-animation .animation-arrow.flash .arrowline", 0.5, {width:31}, "arrow-two");
  tl.to("#features-animation #stack-labels .storage", 1, {autoAlpha:1});
  tl.add("arrow-three");
  tl.to("#features-animation .animation-arrow.storage", 1, {autoAlpha:1}, "arrow-three");
  tl.to("#features-animation .animation-arrow.storage .arrowline", 1, {width:145}, "arrow-three");
  tl.to("#features-animation #bullets", 1, {autoAlpha:1});
  return tl;
}

// Fades out headlines, non-repeated elements
function getFrameOneDrawOutTimeline() {
  var tl = new TimelineMax();
  tl.to([
    "#features-animation h1",
    "#features-animation h2",
    "#features-animation #stack-labels",
    "#features-animation .hypervisor.one .devices .arrows",
    "#features-animation #stack-arrows",
    "#features-animation .multiarrow",
    "#features-animation #bullets",
  ], 2, {autoAlpha:0})
  return tl;
}

// moves shared elements from animation one position to animation two position
function getFrameTwoInitTimeline() {
  // spread out the hypervisors, widen software box, remove left VM from hypervisor two
  var tl = new TimelineMax();
  tl.add("start");
  tl.to("#features-animation #software-box", 1.5, {width:518, left:"-=43"});
  tl.to("#features-animation .hypervisor.one", 1.5, {left:"-=43"}, "start");
  tl.to("#features-animation .hypervisor.two", 1.5, {left:"+=43"}, "start");
  tl.to("#features-animation .hypervisor.two .vm.left", 1, {autoAlpha: 0}, "start");
  tl.to("#features-animation .multiarrow.clustered", 1.5, {autoAlpha: 1}, "start+=1");
  return tl;
}

// Timeline for the Clustered animation
function getFrameTwoDrawInTimeline() {
  var tl = new TimelineMax();
  tl.set("#bullets", {text:bullets[1], immediateRender:false});
  tl.set("#features-animation h1", {text:headlines[1], immediateRender:false});
  tl.set("#features-animation h2", {text:subheadlines[1], immediateRender:false});
  tl.set("#clustered-arrow-one", {left:229-2, top:113+5, rotation:74, transformOrigin:"left"})
  tl.set("#clustered-arrow-one .arrowline", {width:126});
  tl.set("#clustered-arrow-two", {left:440-2, top:111+5, rotation:139, transformOrigin:"left"})
  tl.set("#clustered-arrow-two .arrowline", {width:192});
  tl.set("#clustered-dashed-arrow-one", {left:249-2, top:92+5})
  tl.set("#clustered-dashed-arrow-one .arrowline", {width:179});

  tl.staggerTo(["#features-animation h1", "#features-animation h2"], 1, {autoAlpha:1}, 1);
  tl.add("arrow-one", "+=0.25")
  tl.to("#clustered-arrow-one", 1, {autoAlpha:1}, "arrow-one");
  tl.from("#clustered-arrow-one .arrowline", arrowSpeed * 0.8, {width:0}, "arrow-one");
  tl.to("#features-animation .ssd-glow", 1, {autoAlpha:1}, "arrow-one+=0.75");
  tl.add("slide-vm", "+=0.5");
  tl.to("#features-animation .hypervisor.one .vm.right:not(.faded)", 1.8, {left:vmSlideDistance, ease:Linear.easeNone}, "slide-vm");
  tl.to("#clustered-dashed-arrow-one", 0.5, {autoAlpha:1, ease:Cubic.easeIn}, "slide-vm+=0.35");
  tl.from("#clustered-dashed-arrow-one .arrowline", 1.4, {width:0, ease:Linear.easeNone}, "slide-vm+=0.4");
  tl.add("arrow-two", "+=0.75")
  tl.to("#clustered-arrow-two", 1, {autoAlpha:1}, "arrow-two");
  tl.from("#clustered-arrow-two .arrowline", arrowSpeed * 0.8, {width:0}, "arrow-two");
  tl.to("#clustered-arrow-one", 1.5, {autoAlpha:0.5}, "arrow-two");
  tl.to("#features-animation #bullets", 1, {autoAlpha:1});
  return tl;
}

// Fades out headlines, non-repeated elements.
// Restoring the VMs to their original state is a little tricky.
function getFrameTwoDrawOutTimeline() {
  var tl = new TimelineMax();
  tl.add("start");
  tl.set("#features-animation .hypervisor.one .vm.right:not(.faded)", {left:"117", autoAlpha:0, immediateRender:false});
  tl.set("#features-animation .hypervisor.two .vm.left", {autoAlpha:1, immediateRender:false});
  tl.to([
    "#features-animation h1",
    "#features-animation h2",
    "#features-animation .multiarrow",
    "#features-animation #bullets",
    "#features-animation #clustered-arrow-one",
    "#features-animation #clustered-arrow-two",
    "#features-animation #clustered-dashed-arrow-one",
    "#features-animation .ssd-glow",
  ], 2, {autoAlpha:0});
  tl.to("#features-animation .hypervisor.one .vm.right", 2, {autoAlpha:1}, "start");
  return tl;
}

// moves shared elements from animation two position to animation three position
function getFrameThreeInitTimeline() {
  // fade out the devices, scale down hypervisors, scale down software box
  var tl = new TimelineMax();
  tl.set("#features-animation .hypervisor.three", {left:"250", top:"+=40", scale:0.9, immediateRender:false});
  tl.add("start");
  tl.to("#features-animation .hypervisor .devices", 1.5, {autoAlpha: 0, ease:Cubic.easeOut});
  tl.to(["#features-animation .hypervisor.one", "#features-animation .hypervisor.two"], 2, {scale:0.9, autoAlpha:0.6, top:"+=40"}, "start");
  tl.to(["#features-animation .hypervisor .label"], 2, {top:"-=10"}, "start");
  tl.to("#features-animation .hypervisor.one", 2, {left:"-=35"}, "start");
  tl.to("#features-animation .hypervisor.two", 2, {left:"+=55"}, "start");
  tl.to("#features-animation .hypervisor.three", 2, {autoAlpha:1}, "start+=1");
  tl.to("#features-animation .multiarrow.fault-tolerant", 2, {autoAlpha: 1}, "start+=1");
  tl.to("#features-animation #software-box", 2, {left:"41", top:"215", width:"596", height:"90"}, "start");
  return tl;
}

function getFrameThreeDrawInTimeline() {
  var tl = new TimelineMax();
  tl.set("#features-animation h1", {text:headlines[2], immediateRender:false});
  tl.set("#features-animation h2", {text:subheadlines[2], immediateRender:false});
  tl.set(["#ft-arrow-one", "#ft-arrow-one-gray"], {left:340, top:200, rotation:90, transformOrigin:"left"})
  tl.set(["#ft-arrow-one .arrowline", "#ft-arrow-one-gray .arrowline"], {width:30});
  tl.set(["#ft-arrow-two", "#ft-arrow-two-gray"], {left:328, top:249, rotation:180, transformOrigin:"left"})
  tl.set(["#ft-arrow-two .arrowline", "#ft-arrow-two-gray .arrowline"], {width:163});
  tl.set(["#ft-arrow-three", "#ft-arrow-three-gray"], {left:351, top:248, rotation:0, transformOrigin:"left"})
  tl.set(["#ft-arrow-three .arrowline", "#ft-arrow-three-gray .arrowline"], {width:163});
  tl.set(["#ft-arrow-four", "#ft-arrow-four-gray"], {left:340, top:259, rotation:90, transformOrigin:"left"})
  tl.set(["#ft-arrow-four .arrowline", "#ft-arrow-four-gray .arrowline"], {width:135});

  tl.staggerTo(["#features-animation h1", "#features-animation h2"], 1, {autoAlpha:1}, 1);
  // fade in label.block.one and draw first arrow down
  tl.add("label-one");
  tl.to(".ft-label.block.one", 1, {autoAlpha:1});
  tl.add("arrow-one");
  tl.to("#ft-arrow-one", 1, {autoAlpha:1});
  tl.from("#ft-arrow-one .arrowline", arrowSpeed / 3, {width:0}, "arrow-one");
  tl.to(".ft-label.dot.top", 1, {autoAlpha:1}, "arrow-one+=0.25");
  // arrows two and three grow partially
  tl.add("arrows-two-three", "+=0.5");
  tl.to(".ft-label.block.one", 1, {backgroundColor:faultGray}, "arrows-two-three");
  tl.to("#ft-arrow-one-gray", 1, {autoAlpha:1}, "arrows-two-three");
  tl.to(["#ft-arrow-two", "#ft-arrow-three"], 0.5, {autoAlpha:1}, "arrows-two-three");
  tl.from(["#ft-arrow-two .arrowline", "#ft-arrow-three .arrowline"], arrowSpeed * 1.2, {width:0}, "arrows-two-three");
  tl.add("arrows-extended");
  tl.to(".ft-label.text", 0.75, {autoAlpha:1}, "arrows-two-three+=0.25");
  tl.to(".ft-label.text", 0.25, {autoAlpha:0}, "arrows-two-three+=1.75");
  // tl.to(["#ft-arrow-two .arrowline", "#ft-arrow-three .arrowline"], arrowSpeed / 2, {width:173}, "arrows-continue");
  // when arrows finish growing, dots 1 and 2 fade in as arrows go to gray
  tl.to([".ft-label.dot.one", ".ft-label.dot.two"], 1, {autoAlpha:1}, "arrows-two-three+=1.75");
  tl.to(["#features-animation .hypervisor.one", "#features-animation .hypervisor.two"], 1, {autoAlpha:1}, "arrows-extended");
  // dots 1 and 2 fade to gray, arrow four grows, label.block.two fades in
  tl.add("arrow-four", "+=0.25");
  tl.to(["#ft-arrow-two-gray", "#ft-arrow-three-gray"], 1, {autoAlpha:1}, "arrow-four");
  tl.to("#ft-arrow-four", 1, {autoAlpha:1}, "arrow-four");
  tl.from("#ft-arrow-four .arrowline", arrowSpeed, {width:0}, "arrow-four");
  // tl.to(".ft-label.block.two", 1, {autoAlpha:1}, "arrow-four+=0.5");
  tl.to(".ft-label.dot.bottom", 1, {autoAlpha:1}, "-=0.5");
  tl.add("final-fade");
  tl.to([".ft-label.dot.one", ".ft-label.dot.two"], 1, {backgroundColor:faultGray}, "final-fade");
  tl.to([".ft-label.dot.one", ".ft-label.dot.two"], 1, {autoAlpha:0.6}, "final-fade");
  // tl.to(".ft-label.block.two", 1, {backgroundColor:faultGray}, "final-fade");
  tl.to("#ft-arrow-four-gray", 1, {autoAlpha:1}, "final-fade");

  return tl;
}

// Fades out headlines, non-repeated elements.
function getFrameThreeDrawOutTimeline() {
  var tl = new TimelineMax();
  tl.add("start");
  tl.to([
    "#features-animation h1",
    "#features-animation h2",
    "#features-animation .ft-label",
    "#features-animation .animation-arrow"
  ], 2, {autoAlpha:0});
  return tl;
}

// moves shared elements from animation three position to animation four position
function getFrameFourInitTimeline() {
  // fade out left and right hypervisors, scale up software box, reveal ram-clusters
  var tl = new TimelineMax();
  tl.add("start");
  tl.set("#features-animation .hypervisor .devices", {autoAlpha:1, immediateRender: false});
  tl.set("#features-animation .hypervisor .devices>.ram", {autoAlpha:0, immediateRender: false});
  tl.set("#features-animation .hypervisor .devices>.pci-card", {autoAlpha:0, immediateRender: false});
  tl.set("#features-animation .hypervisor .devices>.ssd", {autoAlpha:0, immediateRender: false});
  tl.set("#features-animation .hypervisor .devices>.ram-cluster", {autoAlpha:0, immediateRender: false});
  tl.set(".ft-label", {backgroundColor:faultRed, immediateRender:false});

  tl.to(["#features-animation .hypervisor.one", "#features-animation .hypervisor.two"], 2, {autoAlpha:0.6}, "start");
  tl.to("#features-animation #software-box", 2, {top:"177", height:"128"}, "start");
  tl.to("#features-animation .hypervisor", 2, {top:"-=38"}, "start");
  tl.to("#features-animation .hypervisor .ram-cluster", 1, {autoAlpha:1}, "start+=1");
  return tl;
}

function getFrameFourDrawInTimeline() {
  var tl = new TimelineMax();
  tl.set("#features-animation h1", {text:headlines[3], immediateRender:false});
  tl.set("#features-animation h2", {text:subheadlines[3], immediateRender:false});
  tl.set("#bullets", {text:bullets[2], immediateRender:false});
  tl.set(".ft-label.block.one", {top:"-=38", immediateRender:false});
  tl.set(["#ft-arrow-one", "#ft-arrow-one-gray"], {top:162, immediateRender:false});
  tl.set(["#ft-arrow-one .arrowline", "#ft-arrow-one-gray .arrowline"], {width:68, immediateRender:false});

  tl.staggerTo(["#features-animation h1", "#features-animation h2"], 1, {autoAlpha:1}, 1);
  // fade in label.block.one and draw first arrow down
  tl.add("label-one");
  tl.to(".ft-label.block.one", 1, {autoAlpha:1});
  tl.add("arrow-one");
  tl.to("#ft-arrow-one", 1, {autoAlpha:1});
  tl.fromTo("#ft-arrow-one .arrowline", arrowSpeed / 2, {width:0}, {width:68}, "arrow-one");
  tl.to(".ft-label.dot.top", 1, {autoAlpha:1}, "arrow-one+=0.25");
  // arrows two and three grow partially
  tl.add("arrows-two-three", "+=0");
  tl.to(".ft-label.block.one", 1, {backgroundColor:faultGray}, "arrows-two-three");
  tl.to("#ft-arrow-one-gray", 1, {autoAlpha:1}, "arrows-two-three");
  tl.to(["#ft-arrow-two", "#ft-arrow-three"], 0.5, {autoAlpha:1}, "arrows-two-three");
  tl.fromTo(["#ft-arrow-two .arrowline", "#ft-arrow-three .arrowline"], arrowSpeed * 1.2, {width:0}, {width:163}, "arrows-two-three");
  tl.add("arrows-extended");
  // when arrows finish growing, dots 1 and 2 fade in as arrows go to gray
  tl.to([".ft-label.dot.one", ".ft-label.dot.two"], 1, {autoAlpha:1}, "arrows-two-three+=1.75");
  tl.to(["#features-animation .hypervisor.one", "#features-animation .hypervisor.two"], 1, {autoAlpha:1}, "arrows-two-three+=1.75");
  // dots 1 and 2 fade to gray, arrow four grows, label.block.two fades in
  tl.add("arrow-four", "+=0.25");
  tl.to(["#ft-arrow-two-gray", "#ft-arrow-three-gray"], 1, {autoAlpha:1}, "arrow-four");
  tl.to("#ft-arrow-four", 1, {autoAlpha:1}, "arrow-four");
  tl.fromTo("#ft-arrow-four .arrowline", arrowSpeed, {width:0}, {width:135}, "arrow-four");
  // tl.to(".ft-label.block.two", 1, {autoAlpha:1}, "arrow-four+=0.5");
  tl.to(".ft-label.dot.bottom", 1, {autoAlpha:1}, "-=0.5");
  tl.add("final-fade");
  tl.to([".ft-label.dot.one", ".ft-label.dot.two"], 1, {backgroundColor:faultGray}, "final-fade");
  // tl.to(".ft-label.block.two", 1, {backgroundColor:faultGray}, "final-fade");
  tl.to("#ft-arrow-four-gray", 1, {autoAlpha:1}, "final-fade");
  tl.to("#features-animation #bullets", 1, {autoAlpha:1});

  return tl;
}

// Fades out headlines, non-repeated elements.
function getFrameFourDrawOutTimeline() {
  var tl = new TimelineMax();
  tl.add("start");
  tl.to([
    "#features-animation h1",
    "#features-animation h2",
    "#features-animation .multiarrow",
    "#features-animation .ft-label",
    "#features-animation .animation-arrow",
    "#features-animation #bullets"
  ], 2, {autoAlpha:0});
  return tl;
}


// moves shared elements from animation four position to animation five position
function getFrameFiveInitTimeline() {
  // fade in the devices, scale down hypervisors, scale down software box
  var tl = new TimelineMax();
  tl.add("start");
  tl.to("#features-animation .hypervisor.two", 1, {autoAlpha:0}, "start");
  tl.to(["#features-animation .hypervisor.one", "#features-animation .hypervisor.three"], 2, {scale:0.8, top:90}, "start");
  tl.to(["#features-animation .hypervisor .label"], 2, {top:"+=10"}, "start");
  tl.to("#features-animation .hypervisor.one", 2, {left:"-=42"}, "start");
  tl.to("#features-animation .hypervisor.three", 2, {left:"-=71"}, "start");
  tl.to("#features-animation #software-box", 2, {left:10, top:152, width:334, height:110}, "start");
  tl.to("#features-animation .db", 2, {left:"183", top:"304", scale:.63}, "start");
  // tl.to("#features-animation .hypervisor .devices", 1, {autoAlpha: 1}, "start+=1");
  // fade out the ram-cluster
  tl.to("#features-animation .ram-cluster", 1, {autoAlpha:0}, "start+=1");
  // then fade in the three standard components
  tl.to(["#features-animation .ram", "#features-animation .pci-card", "#features-animation .ssd"], 1, {autoAlpha:1}, "start+=1");

  tl.to("#features-animation .multiarrow.scaleout.one", 2, {autoAlpha: 1}, "start+=1");
  return tl;
}

function getFrameFiveDrawInTimeline() {
  var tl = new TimelineMax();

  tl.set("#features-animation .scale-bar", {width:0, immediateRender:false});
  tl.set("#features-animation .scale-bar.iops", {width:331, immediateRender:false});
  tl.set("#features-animation .scale-bar p", {autoAlpha:0, immediateRender:false});
  tl.set("#features-animation h1", {text:headlines[4], immediateRender:false});
  tl.set("#features-animation h2", {text:subheadlines[4], immediateRender:false});
  tl.set("#features-animation .hypervisor", {scale:0.8, top:90, immediateRender: false});
  tl.set("#features-animation .hypervisor.two", {left:342, immediateRender: false});
  tl.set("#features-animation .hypervisor.four", {left:505, immediateRender: false});

  tl.staggerTo(["#features-animation h1", "#features-animation h2"], 1, {autoAlpha:1}, 1);
  tl.add("storage-bar")
  tl.add("bar-labels", "+=0.5")
  tl.to("#features-animation .scale-bar.storage-only", 1, {autoAlpha:1, width:167}, "storage-bar")
  tl.to("#features-animation .scale-bar.storage-flash", 1, {autoAlpha:1, width:331}, "storage-bar")
  tl.to("#features-animation .scale-bar.iops", 1, {autoAlpha:1}, "storage-bar");
  tl.from("#features-animation .scale-bar.iops", 1, {width:10}, "storage-bar");
  tl.to("#features-animation .scale-bar.storage-only p", 1, {autoAlpha:1}, "bar-labels");
  tl.to("#features-animation .scale-bar.storage-flash p", 1, {autoAlpha:1}, "bar-labels");
  tl.add("three", "+=1");
  // expand software box and show hypervisor 2
  tl.to("#features-animation #software-box", 1.5, {width:497}, "three");
  tl.to("#features-animation .hypervisor.two", 1, {autoAlpha:1}, "three+=1");
  tl.to("#features-animation .scale-bar.storage-flash.three", 1.5, {autoAlpha:1, width:500}, "three");
  tl.to("#features-animation .scale-bar.storage-flash.four", 1.5, {autoAlpha:1, width:500}, "three");
  tl.to("#features-animation .scale-bar.iops", 1.5, {width:500}, "three");
  tl.to("#features-animation .multiarrow.scaleout.two", 1, {autoAlpha:1}, "three+=1");
  tl.to("#features-animation .multiarrow.scaleout.one", 1, {autoAlpha:0});
  // expand software box and show hypervisor 4
  tl.add("four", "-=0");
  tl.to("#features-animation #software-box", 1.5, {width:658}, "four");
  tl.to("#features-animation .hypervisor.four", 1, {autoAlpha:1}, "four+=1");
  tl.to("#features-animation .scale-bar.storage-flash.four", 1.5, {autoAlpha:1, width:660}, "four");
  tl.to("#features-animation .scale-bar.iops", 1.5, {width:660}, "four");
  tl.to("#features-animation .multiarrow.scaleout.three", 1, {autoAlpha:1}, "four+=1");
  tl.to("#features-animation .multiarrow.scaleout.two", 1, {autoAlpha:0});

  return tl;
}

function buildMainTimeline() {
  mainTimeline = new TimelineMax();
  mainTimeline.pause();
  mainTimeline.add("animation-1");
  mainTimeline.add(getFrameOneDrawInTimeline());
  mainTimeline.call(finishedSection, [0]);

  mainTimeline.add(getFrameOneDrawOutTimeline());
  mainTimeline.add(getFrameTwoInitTimeline());
  mainTimeline.add("animation-2");
  mainTimeline.add(getFrameTwoDrawInTimeline());
  mainTimeline.call(finishedSection, [1]);

  mainTimeline.add(getFrameTwoDrawOutTimeline());
  mainTimeline.add(getFrameThreeInitTimeline());
  mainTimeline.add("animation-3");
  mainTimeline.add(getFrameThreeDrawInTimeline());
  mainTimeline.call(finishedSection, [2]);

  mainTimeline.add(getFrameThreeDrawOutTimeline());
  mainTimeline.add(getFrameFourInitTimeline());
  mainTimeline.add("animation-4");
  mainTimeline.add(getFrameFourDrawInTimeline());
  mainTimeline.call(finishedSection, [3]);

  mainTimeline.add(getFrameFourDrawOutTimeline());
  mainTimeline.add(getFrameFiveInitTimeline());
  mainTimeline.add("animation-5");
  mainTimeline.add(getFrameFiveDrawInTimeline());
  mainTimeline.call(finishedSection, [4]);
}

function startAnimation() {
  mainTimeline.timeScale(TIME_SCALE);
  mainTimeline.seek(SEEK_POSITION);
  mainTimeline.play();
}

function continuePlayingAnimation() {
  if (mainTimeline.paused()) {
    mainTimeline.play();
  }
}

function restartAnimation() {
  mainTimeline.seek(0).play();
}

function gotoAnimation(id) {
  // if we played to the end of an animation and the `id` is the next animation, just play the timeline
  if (mainTimeline.paused() && lastCompletedSection == id - 1) {
    mainTimeline.play();
  }
  else {
    var labels = ["animation-1", "animation-2", "animation-3", "animation-4", "animation-5"];
    mainTimeline.seek(labels[id]).play();
  }
  lastCompletedSection = null;
}

function finishedSection(id) {
  mainTimeline.pause();
  lastCompletedSection = id;
}

($(function () {
  hideAllElements();
  initAnimation();
  buildMainTimeline();
  $(window).load(function() {
    startAnimation();
  })
}));