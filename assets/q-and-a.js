$(function(){const r=document.documentElement.clientHeight/2,l=document.querySelectorAll(".title"),o=document.querySelectorAll("select")[0];let a="";$(".search input").on("input",function(){a=$(this).val().trim()});var t=document.querySelectorAll(".ques_title"),n=document.querySelectorAll(".answer_txt");const s=[];for(let e=0;e<t.length;e++)s.push({title:t[e].innerText.trim(),text:n[e].innerText.trim()});let d=[];function i(e,t){let n;return function(){clearTimeout(n),n=setTimeout(()=>{e.apply(this,arguments)},t)}}$(".search button").click(i(c,500)),$(".search input").on("keydown",function(e){13===e.keyCode&&(e.preventDefault(),i(c,500)())});let u="";function c(){if(a!==u){u=a,d=[];let e=0,t=s.length-1;for(var n=new RegExp(a,"gi");e<t;)(s[e].title.match(n)||s[e].text.match(n))&&d.push(s[e]),(s[t].title.match(n)||s[t].text.match(n))&&d.push(s[t]),e++,t--;if(e===t&&(s[e].title.match(n)||s[e].text.match(n))&&d.push(s[e]),""===a)$(".search-result").hide(),$(".faq-wrapper").show(),$(".faq-page").find("h1").show(),$(".m-sidebar-wrapper").show();else{var r=document.querySelector(".search-result");if($(".faq-wrapper").hide(),$(".search-result").empty(),$(".search-result").show(),$(".m-sidebar-wrapper").hide(),$(".faq-page").find("h1").hide(),d.length)for(let e=0;e<d.length;e++){var l=document.createElement("div"),o=document.createElement("p"),i=(o.innerHTML=d[e].title.replace(new RegExp(a,"gi"),e=>`<mark>${e}</mark>`),document.createElement("p"));i.innerHTML=d[e].text.replace(new RegExp(a,"gi"),e=>`<mark>${e}</mark>`),l.appendChild(o),l.appendChild(i),r.appendChild(l)}else{var c=document.createElement("p");c.innerHTML="No search results",r.appendChild(c)}}}}var p=document.querySelectorAll(".aside-item");for(let e=0;e<p.length;e++)p[e].addEventListener("click",function(){l[e].scrollIntoView({behavior:"smooth",block:"center"})});const m=document.querySelectorAll(".page-sidebar");document.querySelectorAll(".faq-wrapper"),document.querySelectorAll(".faq_qa_main");const e=()=>{var t=document.body.scrollTop||document.documentElement.scrollTop;for(let e=0;e<l.length;e++)t>l[e].offsetTop-r&&($(".aside-item").removeClass("active"),$(".aside-item").eq(e).addClass("active"),o.value=l[e].innerText);var n=document.querySelector(".active");for(let e=0;e<m.length;e++)n&&(m[e].scrollTop=n.offsetTop)};$("select").empty();for(let e=0;e<l.length;e++){var h=document.createElement("option");h.innerText=l[e].innerText,o.appendChild(h)}function f(){window.innerWidth<=900?(window.addEventListener("scroll",w,{passive:!0}),removeEventListener("scroll",i(e,100),{passive:!0})):(window.addEventListener("scroll",i(e,100),{passive:!0}),removeEventListener("scroll",w,{passive:!0}))}f(),window.addEventListener("resize",f,{passive:!0});const v=document.querySelector(".m-sidebar-wrapper");function w(){document.body.scrollTop||document.documentElement.scrollTop;var e=document.querySelector("header").offsetHeight;v.style.top=e+"px"}$("select").change(function(){var e=$(this).prop("selectedIndex");l[e].scrollIntoView({behavior:"smooth",block:"center"})}),$(".faq_qa_main").each((e,t)=>{e&&($(t).find(".page-sidebar").hide(),$(t).find(".m-sidebar-wrapper").hide(),$(t).find(".search").hide())})});