$(function(){const r=document.documentElement.clientHeight/2,l=document.querySelectorAll(".title"),c=document.querySelectorAll("select")[0],s=window.innerWidth;let d="";$(".search input").on("input",function(){d=$(this).val().trim()});var t=document.querySelectorAll(".ques_title"),n=document.querySelectorAll(".answer_txt");const p=[];for(let e=0;e<t.length;e++)p.push({title:t[e].innerText.trim(),text:n[e].innerText.trim()});let m=[];function a(e,t){let n;return function(){clearTimeout(n),n=setTimeout(()=>{e.apply(this,arguments)},t)}}$(".search button").click(a(o,500)),$(".search input").on("keydown",function(e){13===e.keyCode&&(e.preventDefault(),a(o,500)())});let u="";function o(){if(d!==u){u=d,"none"===$(".faq-wrapper").css("display")&&s<=900?$(".faq-page").eq(0).css("padding-top","0px"):$(".faq-page").eq(0).css({"padding-top":c.offsetHeight+"px"}),m=[];let e=0,t=p.length-1;for(var n=new RegExp(d,"gi");e<t;)(p[e].title.match(n)||p[e].text.match(n))&&m.push(p[e]),(p[t].title.match(n)||p[t].text.match(n))&&m.push(p[t]),e++,t--;if(e===t&&(p[e].title.match(n)||p[e].text.match(n))&&m.push(p[e]),""===d)$(".search-result").hide(),$(".faq-wrapper").show(),$(".faq-page").find("h1").show(),$(".m-sidebar-wrapper").show();else{var r=document.querySelector(".search-result");if($(".faq-wrapper").hide(),$(".search-result").empty(),$(".search-result").show(),$(".m-sidebar-wrapper").hide(),$(".faq-page").find("h1").hide(),m.length)for(let e=0;e<m.length;e++){var l=document.createElement("div"),a=document.createElement("p"),o=(a.innerHTML=m[e].title.replace(new RegExp(d,"gi"),e=>`<mark>${e}</mark>`),document.createElement("p"));o.innerHTML=m[e].text.replace(new RegExp(d,"gi"),e=>`<mark>${e}</mark>`),l.appendChild(a),l.appendChild(o),r.appendChild(l)}else{var i=document.createElement("p");i.innerHTML="No search results",r.appendChild(i)}}}}var i=document.querySelectorAll(".aside-item");for(let e=0;e<i.length;e++)i[e].addEventListener("click",function(){l[e].scrollIntoView({behavior:"smooth",block:"center"})});const h=document.querySelectorAll(".page-sidebar");var f=document.querySelectorAll(".faq-wrapper");document.querySelectorAll(".faq_qa_main");$("select").empty();for(let e=0;e<l.length;e++){var g=document.createElement("option");g.innerText=l[e].innerText,c.appendChild(g)}window.addEventListener("scroll",a(()=>{var t=document.body.scrollTop||document.documentElement.scrollTop;for(let e=0;e<l.length;e++)t>l[e].offsetTop-r&&($(".aside-item").removeClass("active"),$(".aside-item").eq(e).addClass("active"),c.value=l[e].innerText);var n=document.querySelector(".active");for(let e=0;e<h.length;e++)n&&(h[e].scrollTop=n.offsetTop)},100),{passive:!0});let q=0;if(s<=900){for(let e=0;e<f.length;e++)q+=f[e].offsetHeight;window.addEventListener("scroll",function(){var e=document.body.scrollTop||document.documentElement.scrollTop,t=$(".m-sidebar-wrapper").eq(0);t.removeClass("fixed"),e>=t.offset().top&&e<=q&&t.addClass("fixed")},{passive:!0})}$("select").change(function(){var e=$(this).prop("selectedIndex");l[e].scrollIntoView({behavior:"smooth",block:"center"})}),$(".faq_qa_main").each((e,t)=>{e&&($(t).find(".page-sidebar").hide(),$(t).find(".m-sidebar-wrapper").hide(),$(t).find(".search").hide())}),$(".faq-page").eq(0).css({"padding-top":c.offsetHeight+"px"}),$(".m-sidebar-wrapper").eq(0).css({opacity:"1",display:"flex"})});