try
{
    //делаем обертку, чтобы не возникло конфликтов с переменными
    (function(){
        var head = document.getElementsByTagName('head')[0];
        //функция include для подключения файла
        function include (src) {
            var script = window.document.createElement('script');
            script.src = src;
            if (navigator.appName == "Microsoft Internet Explorer"){
                script.defer = "defer";
                }
            head.appendChild(script);
        }

        //функция импорта css
        function import_css(src, media){
        	if (!src) return;
        	var imprt = window.document.createElement('link');
        	imprt.setAttribute("rel", "stylesheet")
        	imprt.setAttribute("type", "text/css");
        	imprt.setAttribute("media", !media ? "all" : media);
        	imprt.setAttribute("href", src);
        	document.getElementsByTagName('head')[0].appendChild(imprt);
        	return false; // disable link href-action
        }


        //подключаем наш стиль для нашего контейнера
        import_css('https://getcode.esetnod32.ru/cors/esetstyle.css');
        // Подключение JS-файлы
        include('https://getcode.esetnod32.ru/cors/json2.js');
        //setTimeout('', 1000);
        include('https://getcode.esetnod32.ru/cors/easyXDM.js');
        //setTimeout('', 1000);
        //создадим прокси объект для отсылки запросов
        function addLoadEvent(func) {
            var oldonload = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = func;
            } else {
                window.onload = function() {
                if (oldonload) {
                    oldonload();
                }
                func();
                }
            }
        }


        //addLoadEvent(function (){
        window.onload = function (){
            getXhr = new easyXDM.Rpc({
                remote: "https://getcode.esetnod32.ru/cors/index.html", // путь к провайдеру
                swf: "https://getcode.esetnod32.ru/cors/easyxdm.swf"
            }, {
                remote: {
                    request: {}
                }
            });

            EsetgetRequest('https://getcode.esetnod32.ru/', '', '', '', getURLParam("hash"));
        	if( window!= window.top && location.hostname != "www.esetnod32.ru") {
       			top.location.href = location.href;
        	}
        	// ниж код, для срабатывания в мозиле document.all
        	if (!document.all) {
        		document.constructor.prototype.__defineGetter__('all', function() { return document.getElementsByTagName('*'); } );
        	}
        }

    })();

    //функция для получения get параметров

    function getURLParam(strParamName) {
        var strReturn = "";
        var strHref = window.location.href;
        var bFound=false;
        var cmpstring = strParamName + "=";
        var cmplen = cmpstring.length;

        if (strHref.indexOf("?") > -1) {
            var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
            var aQueryString = strQueryString.split("&");
            for (var iParam = 0; iParam < aQueryString.length; iParam++) {
                if (aQueryString[iParam].substr(0,cmplen) == cmpstring) {
                    var aParam = aQueryString[iParam].split("=");
                    strReturn = aParam[1];
                    bFound = true;
                    break;
                }
            }
        }
        if (bFound==false) return null;
        return strReturn;
    }


    //функция для пересылки на наш сайт, для загрузки антивируса
    function EsetDLClick(){
    	location.href='https://www.esetnod32.ru/partners/loyalty_program/download/';
    	return 0;
    }

    //функция для пересылки на наш сайт, для загрузки антивируса
    function EsetRedirectOnSuccess(url){
        location.href=url;
        return 0;
    }

    function EsetgetRequest(urlReq, dataReq, dataReq1, dataReq2, hash) {

        getXhr.request({
            url: urlReq,  //адрес нашего запроса
            method: "POST",
            data: {keystring: dataReq, email: dataReq1, urlpathname: window.location.pathname, productCode: dataReq2, hash: hash }
        }, function(response) { // функция обработки результата ответа
            var str =  response.data;
            str = str.replace(/^\s*/,'').replace(/\s*$/,'');
            str = str.split(';');
            if(str[0] == "url"){
                EsetRedirectOnSuccess(str[1]);
            }else{
                document.getElementById("esetresponse").innerHTML = response.data;
            }
        });
    }

    function EsetCapchareload(){
        src = document.captcha.src='https://getcode.esetnod32.ru/kcaptcha/index.php';
        document.captcha.src=src+'?rand='+Math.random();
    }


	function EsetDivPosition(){
        var i = document.getElementById('esetresponse');
        //i.style.marginLeft = parseInt(document.body.offsetWidth-i.offsetWidth)/2+'px';
        //i.style.width = '600'+'px';
        //i.style.height = '210'+'px';
	};

	if (window.attachEvent){
        window.attachEvent('onresize',EsetDivPosition);
        window.attachEvent('onload',EsetDivPosition);
	}else if(window.addEventListener){
        window.addEventListener('resize',EsetDivPosition, false);
        window.addEventListener('load',EsetDivPosition, false);
	}
}
catch (e) {}
