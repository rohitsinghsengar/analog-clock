var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, '');
  var pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms|o)-/) || (styles.OLink === '' && ['', 'o'])
  )[1];
  return '-' + pre + '-';
})(); // find prefix for css rules

function createKframe(name, frame){
    var ss = document.styleSheets[document.styleSheets.length-1];
	ss.insertRule("@" + prefix + "keyframes " + name +" { "+ frame + "}" , ss.cssRules.length );
} // inserts rules into css

(function(){
	var t=new Date();
    var ti={ hour: { hrs:0, angle:{}, frames:"" },
             minute: { mins:0, angle:{}, frames:"" },
             second: { secs:0, angle:{}, frames:"" }  };
    
    ti.hour.hrs=(t.getHours() > 12) ? t.getHours() - 12 :  t.getHours();
    ti.minute.mins = t.getMinutes();
    ti.second.secs=t.getSeconds();
    
    // subtract 90 from each angle as 0deg=3hrs
    ti.hour.angle.start = ((ti.hour.hrs*30)-90)+(.5*ti.minute.mins); // 1hr=30deg + some angle due to mins
    ti.hour.angle.end = ti.hour.angle.start + 360;
    ti.minute.angle.start = (ti.minute.mins*6)-90;
    ti.minute.angle.end = ti.minute.angle.start + 360;
    ti.second.angle.start = (ti.second.secs*6)-90;
    ti.second.angle.end = ti.second.angle.start + 360;
    
    // Add anim keyframes for hrs,mins,secs into css and add resp. classes
    ti.hour.frames = "from{ "+prefix+"transform: rotate("+ti.hour.angle.start+"deg); } to { "+prefix+"transform: rotate("+ti.hour.angle.end+"deg); }";
    createKframe("rotateHr",ti.hour.frames);
    ti.minute.frames = "from{ "+prefix+"transform: rotate("+ti.minute.angle.start+"deg); } to { "+prefix+"transform: rotate("+ti.minute.angle.end+"deg); }";
    createKframe("rotateMin",ti.minute.frames);
    ti.second.frames = "from{ "+prefix+"transform: rotate("+ti.second.angle.start+"deg); } to { "+prefix+"transform: rotate("+ti.second.angle.end+"deg); }";
    createKframe("rotateSec",ti.second.frames);
    
    document.getElementById("hour").className = "rotate-hr";
    document.getElementById("minute").className = "rotate-min";
    document.getElementById("second").className = "rotate-sec";
})();

