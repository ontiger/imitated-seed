$((function(){$("body").on("click","#editBtn",(function(e){e.preventDefault();var t=$("#editForm");$("#editForm #agreeCheckbox").is(":checked")?(t.attr({method:"POST",target:"",action:null}),window.onbeforeunload=null,t.children("#recaptcha").length?recaptchaExecute(JSON.parse(t.attr("data-recaptcha"))):t.submit()):alert("수정하기 전에 먼저 문서 배포 규정에 동의해 주세요.")})),$("body").on("change","#textInput",(function(){window.onbeforeunload||(window.onbeforeunload=function(e){return""})})),$("body").on("click","#previewLink",(function(e){e.preventDefault();var t=$("#editForm"),a=$("#previewFrame");a.length>0&&a.remove(),a=$("<iframe></iframe>").attr({name:"previewFrame",id:"previewFrame"}),$(".tab-pane#preview").append(a),t.attr({method:"POST",target:"previewFrame",action:"/preview/"+encodeURIComponent(t.attr("data-title"))}),t.submit()})),$("body").on("submit","#deleteForm",(function(e){return $("#deleteForm #logInput").val().length<5?(alert("5자 이상의 요약을 입력해 주세요."),!1):$("#deleteForm #agreeCheckbox").is(":checked")?!$("#submitBtn").attr("disabled")&&$("#deleteForm #recaptcha").length?(recaptchaExecute(JSON.parse($("#deleteForm").attr("data-recaptcha"))),!1):void 0:(alert("문서 삭제에 대한 안내를 확인해 주세요."),!1)})),$("body").on("submit","#moveForm",(function(e){var t=$("#moveForm #titleInput").val();return t.length<1?(alert("변경할 문서 제목을 입력해 주세요."),!1):(t=$("#moveForm #logInput").val()).length<5?(alert("5자 이상의 요약을 입력해 주세요."),!1):!$("#moveBtn").attr("disabled")&&$("#moveForm #recaptcha").length?(recaptchaExecute(JSON.parse($("#moveForm").attr("data-recaptcha"))),!1):void 0})),$("body").on("change","#fileInput",(function(){if(!$(this)[0].files[0].type.match(/image.*/))return $(this).val(""),void alert("이미지가 아닙니다.");var e=$(this).val().split("\\");if(!$("#documentInput").val()){var t=e[e.length-1].split(".");t[t.length-1]=t[t.length-1].toLowerCase(),"jpeg"===t[t.length-1]&&(t[t.length-1]="jpg"),t=t.join("."),$("#documentInput").val("파일:"+t)}$("#fakeFileInput").val($(this).val())})),$("body").on("click","#fakeFileInput, #fakeFileButton",(function(){$("#fileInput").click()})),$("body").on("submit","#uploadForm",(function(){var e=$("#licenseSelect"),t=$("#categorySelect"),a=$("#textInput");if(e.length){var r=e.val();if(!r)return alert("올바른 라이선스를 선택해주세요."),!1}if(t.length){var n=t.val();if(!n)return alert("올바른 분류를 선택해주세요."),!1}if(e.length&&t.length){var i="[include("+r+")]\n[["+n+"]]",o=a.val();-1===o.indexOf(i)&&a.val(i+"\n"+o)}return!(!$("#uploadBtn").attr("disabled")&&$("#uploadForm #recaptcha").length)||(recaptchaExecute(JSON.parse($("#uploadForm").attr("data-recaptcha"))),!1)})),$("body").on("click","dl.wiki-folding dt",(function(){$(this).parent().find("> dd").toggle("fast")})),$(".wiki-heading").css("cursor","pointer").click((function(e){"A"!==e.target.tagName&&$(this).next().toggle()})),$(".seed-acl-div").each((function(){var e=$(this),t=e.attr("data-type"),a="true"===e.attr("data-isns");if("true"===e.attr("data-editable")){var r=e.find(".seed-acl-tbody"),n=e.find(".seed-acl-add-condition-type"),i=e.find(".seed-acl-add-condition-value-perm"),o=e.find(".seed-acl-add-condition-value"),d=e.find(".seed-acl-add-action"),s=e.find(".seed-acl-add-expire"),l=e.find(".seed-acl-add-btn"),c=e.find("INPUT, .seed-acl-add-btn, SELECT");bindDeleteBtn(),n.change(function onChangeCondType(){return"perm"===n.val()?(i.show(),o.hide()):(o.show(),i.hide(),o.val("")),onChangeCondType}()),l.click((function(){var e=n.val(),r="perm"===e?i.val():o.val();r?(c.attr("disabled",!0),$.ajax({type:"POST",data:{mode:"insert",type:t,isNS:a?"Y":void 0,condition:e+":"+r,action:d.val(),expire:s.val()},dataType:"text",success:function(e){c.removeAttr("disabled"),o.val(""),reloadTBody(e)},error:function(e){alertAjaxError(e),c.removeAttr("disabled")}})):alert("값이 없습니다.")})),r.sortable({update:function(e,n){var i=n.item.attr("data-id");if(i){var o=n.item.prev().attr("data-id");r.sortable("disable"),$.ajax({type:"POST",data:{mode:"move",isNS:a?"Y":void 0,type:t,id:i,after_id:o||0},dataType:"text",success:function(e){r.sortable("enable"),reloadTBody(e)},error:alertAjaxError})}}})}function reloadTBody(e){r.empty(),r.html(e),bindDeleteBtn()}function alertAjaxError(e){try{if(e&&e.responseText){var t=JSON.parse(e.responseText);if(t&&t.status)return void alert(t.status)}}catch(e){}alert("문제가 발생했습니다!")}function bindDeleteBtn(){r.find("tr").each((function(){var e=$(this),r=e.attr("data-id"),n=e.find("button");n.click((function(){confirm("삭제하시겠습니까?")&&(n.attr("disabled",!0),$.ajax({type:"POST",data:{mode:"delete",type:t,isNS:a?"Y":void 0,id:r},dataType:"text",success:function(e){reloadTBody(e)},error:alertAjaxError}))}))}))}}))})),function(){var e=!1,t=null,a=null,r=null,n=null,i=0,o=new IntersectionObserver((function(t){if(e){i=Date.now();for(var a=0;a<t.length;a++)t[a].target.setAttribute("data-visible",t[a].isIntersecting)}}));function discussPoll(a){function discussPollReserve(r){t=setTimeout((function(){t=null,e&&discussPoll(a)}),r)}e&&(r=$.ajax({type:"POST",url:"/notify/thread/"+a,async:!0,cache:!1,timeout:2e4,dataType:"json",success:function(t){if(r=null,e){if("event"!==t.status)return discussPollReserve(100);for(var a=document.querySelectorAll("#res-container div.res-wrapper"),n=a.length?0|a[a.length-1].getAttribute("data-id"):0,i=document.querySelector("#res-container"),d=n+1;d<=t.comment_id;d++){var s=$('<div class="res-wrapper res-loading" data-id="'+d+'" data-locked="false"><div class="res res-type-normal"><div class="r-head"><span class="num"><a id="#'+d+'">#'+d+'</a>&nbsp;</span></div><div class="r-body"></div></div></div>');s.appendTo(i),o.observe(s[0])}discussPollReserve(1)}},error:function(){r=null,e&&discussPollReserve(100)}}))}var d=[];jQuery((function(){$("time").each((function(){var e=$(this).attr("data-format"),t=$(this).attr("datetime");e&&t&&$(this).text(formatDate(new Date(t),e))}))})),window.historyInit=function historyInit(e){$("INPUT[name=oldrev], INPUT[name=rev]").click((function(){var e=$("INPUT[name=oldrev]:checked").val();e&&(e=parseInt(e),$("INPUT[name=rev]").each((function(){parseInt($(this).val())<=e?($(this).attr("checked",!1),$(this).css("visibility","hidden")):$(this).css("visibility","visible")})));var t=$("INPUT[name=rev]:checked").val();t&&(t=parseInt(t),$("INPUT[name=oldrev]").each((function(){parseInt($(this).val())>=t?($(this).attr("checked",!1),$(this).css("visibility","hidden")):$(this).css("visibility","visible")})))})),$("#diffbtn").click((function(){var t=$("INPUT[name=oldrev]:checked").val(),a=$("INPUT[name=rev]:checked").val();t&&a&&(window.pjaxCall?window.pjaxCall("/diff/"+e+"?oldrev="+t+"&rev="+a):location.href="/diff/"+e+"?oldrev="+t+"&rev="+a)}))},window.discussPollCancel=function discussPollCancel(){e=!1,t&&clearTimeout(t),t=null,a&&clearInterval(a),a=null,r&&r.abort(),n&&n.abort()},window.discussPollStart=function discussPollStart(t){e=!0,$("#new-thread-form").submit((function(){var e=$(this);if(!e.find("TEXTAREA").val())return!1;var a=e.serialize();return e.find("BUTTON, TEXTAREA").attr("disabled","disabled"),$.ajax({type:"POST",url:"/thread/"+t,data:a,dataType:"json",success:function(t){e.find("BUTTON, TEXTAREA").removeAttr("disabled"),e.find("TEXTAREA").val("")},error:function(t){alert(t&&t.responseJSON&&t.responseJSON.status?t.responseJSON.status:"문제가 발생했습니다!"),e.find("BUTTON, TEXTAREA").removeAttr("disabled")}}),!1})),$("#thread-status-form").submit((function(){var e=$(this),a=e.serialize();return e.find("BUTTON").attr("disabled","disabled"),$.ajax({type:"POST",url:"/admin/thread/"+t+"/status",data:a,dataType:"json",success:function(t){e.find("BUTTON").removeAttr("disabled"),location.reload()},error:function(t){alert(t&&t.responseJSON&&t.responseJSON.status?t.responseJSON.status:"문제가 발생했습니다!"),e.find("BUTTON").removeAttr("disabled")}}),!1})),$("#thread-document-form").submit((function(){var e=$(this),a=e.serialize();return e.find("BUTTON").attr("disabled","disabled"),$.ajax({type:"POST",url:"/admin/thread/"+t+"/document",data:a,dataType:"json",success:function(t){e.find("BUTTON").removeAttr("disabled"),location.reload()},error:function(t){alert(t&&t.responseJSON&&t.responseJSON.status?t.responseJSON.status:"문제가 발생했습니다!"),e.find("BUTTON").removeAttr("disabled")}}),!1})),$("#thread-topic-form").submit((function(){var e=$(this),a=e.serialize();return e.find("BUTTON").attr("disabled","disabled"),$.ajax({type:"POST",url:"/admin/thread/"+t+"/topic",data:a,dataType:"json",success:function(t){e.find("BUTTON").removeAttr("disabled"),location.reload()},error:function(t){alert(t&&t.responseJSON&&t.responseJSON.status?t.responseJSON.status:"문제가 발생했습니다. 잠시 후 다시 시도해 주세요."),e.find("BUTTON").removeAttr("disabled")}}),!1})),discussPoll(t),$("#res-container div.res-loading").each((function(){o.observe(this)})),a=setInterval((function(){i+100<Date.now()&&!n&&function discussFetch(t){var a=document.querySelector('#res-container div.res-loading[data-visible="true"][data-locked="false"]');if(a){a.setAttribute("data-locked","true");var r=a.getAttribute("data-id");n=$.ajax({type:"GET",url:"/thread/"+t+"/"+r,async:!0,dataType:"html",error:function(){n=null,e&&location.reload()},success:function(t){if(n=null,e){i=Date.now();var a=$(t);a.find("time").each((function(){var e=$(this).attr("data-format"),t=$(this).attr("datetime");$(this).text(formatDate(new Date(t),e))})),a.each((function(){var e=$(this),t=$('#res-container div.res-loading[data-id="'+e.data("id")+'"]');t.after(e),t.remove()}))}}})}}(t)}),100)},window.recaptchaInit=function recaptchaInit(e,t,a){if(void 0!==d)d.push(recaptchaInit.bind(null,e,t,a));else{e=window.grecaptcha.render(e,t);a&&a(e)}},window.recaptchaExecute=function recaptchaExecute(e){if(void 0===d)return window.grecaptcha.execute(e);alert("recaptcha error")},window.recaptchaOnLoad=function recaptchaOnLoad(){var e=d;d=void 0;for(var t=0;t<e.length;t++)e[t]()}}();