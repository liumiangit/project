(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-gouwuche" viewBox="0 0 1024 1024">'+""+'<path d="M347.136 783.36q19.456 0 36.864 7.168t30.72 19.968 20.48 30.208 7.168 36.864-7.168 36.864-20.48 30.208-30.72 20.48-36.864 7.68q-20.48 0-37.376-7.68t-30.208-20.48-20.48-30.208-7.168-36.864 7.168-36.864 20.48-30.208 30.208-19.968 37.376-7.168zM773.12 785.408q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zM945.152 203.776q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-12.8 37.888-22.016 62.976-24.064 68.096-17.92 53.248q-13.312 40.96-33.792 56.832t-50.176 15.872l-34.816 0-66.56 0-87.04 0-95.232 0-253.952 0 15.36 92.16 516.096 0q49.152 0 49.152 41.984 0 20.48-9.728 35.328t-38.4 14.848l-49.152 0-95.232 0-117.76 0-119.808 0-98.304 0-56.32 0q-20.48 0-34.304-9.216t-23.04-24.064-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696t-11.264-58.88-14.848-78.848-16.384-87.552q-19.456-103.424-44.032-230.4l-76.8 0q-15.36 0-25.6-7.68t-16.896-18.432-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792t37.376-13.312l22.528 0 20.48 0 25.6 0 34.816 0q20.48 0 32.768 6.144t19.456 15.36 10.24 19.456 5.12 17.408q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912l700.416 0z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-wenhao" viewBox="0 0 1024 1024">'+""+'<path d="M512.805342 64.646346c-246.850108 0-446.789813 199.935612-446.789813 446.789813 0 246.850108 199.939705 446.789813 446.789813 446.789813 246.854201 0 446.789813-199.939705 446.789813-446.789813C959.595154 264.581957 759.65852 64.646346 512.805342 64.646346zM546.401508 777.538749l-73.90829 0 0-80.627319 73.90829 0L546.401508 777.538749zM653.899824 421.442518c-13.437034 24.672936-31.387871 45.912679-53.749158 63.828724-22.395056 17.953907-38.109969 35.833113-47.03013 53.752228-8.958022 17.950837-13.441127 30.232558-13.441127 36.950564l0 23.5166-60.467163 0 0-33.593096c0-20.156062 5.037736-39.752376 15.117302-58.790988 10.076496-19.000749 27.399023-39.752376 52.071959-62.148455 17.916045-15.642259 30.232558-31.915897 36.950564-48.710398 6.719028-16.798595 10.079566-33.034371 10.079566-48.710398 0-29.080316-6.719028-50.916647-20.156062-65.508993-13.437034-14.558577-32.474622-21.836331-57.109696-21.836331-24.672936 0-45.352931 9.55461-62.148455 28.555359-16.798595 19.037589-25.197892 49.866734-25.197892 92.38306l-77.265758 0c2.205225-62.673411 19.000749-109.181655 50.39169-139.414213 31.353079-30.235628 69.391417-45.352931 114.219391-45.352931 49.235354 0 87.86721 13.437034 115.89659 40.312124 27.995611 26.874067 41.995463 61.626569 41.995463 104.143918C674.058956 369.932354 667.336858 396.807445 653.899824 421.442518z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-sanjiaoxing" viewBox="0 0 1024 1024">'+""+'<path d="M511.911 777.448l506.197-506.187h-1012.381l506.184 506.187z"  ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)