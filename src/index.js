var mode=0;//0 1 2 分别是温度 湿度 光照

var http = require('http');

var options = {
    host: 'httpbin.org',
    path: '/post',
    method: 'POST'
};

function postState(state) {
    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.write(state);
    req.end();
}


$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    // 在 `#button` 按下时点亮 `#led-r`.
    $('#button').on('push', function () {
        console.log('Button pushed.');
        $('#led-r').turnOn();
    });

    // 在 `#button` 释放时熄灭 `#led-r`.
    $('#button').on('release', function () {
        console.log('Button released.');
        $('#led-r').turnOff();
        mode= (mode+1)%3;///////
    });
    ///////////////////////
    $('#LCD').turnOn();
    $('#LCD').setCursor(1, 0);
    $('#LCD').print('Welcome!');
    
    setInterval(
        function () {
            $('#TempAndHum').getTemperature(function (error, temperature) {
                if (error) {
                    console.error(error);
                    return;
                }
                $('#LCD').setCursor(1, 0);
                console.log('temperature', temperature);
	                 postState('temperature: ');// + temperature);
                /////////////////
                if (mode==0) {
	                $('#LCD').print('temperature: ' + temperature);
	                $('#LCD').setCursor(1, 1);
	                if (temperature>25) 
	               		$('#LCD').print('it\'s hot    ');
	               	else if (temperature<15) {
	               		$('#LCD').print('it\'s cold    ');
	               	} else {$('#LCD').print('cool day it is');}
	            }
            });
        }, 1000);
    setInterval(
        function () {
            $('#lightSensor').getIlluminance(function (error, Illuminance) {
                if (error) {
                    console.error(error);
                    return;
                }
                $('#LCD').setCursor(1, 0);
                console.log('illuminance', Illuminance);
                postState('illuminance', Illuminance);
                /////////////////
                if (mode==2) {
	                $('#LCD').print('illuminance: ' + Illuminance);
	                $('#LCD').setCursor(1, 1);
	                if (Illuminance>120) 
	               		$('#LCD').print('sun too strong  ');
	               	else if (Illuminance<50) {
	               		$('#LCD').print('u need sunshine  ');
	               	} else {$('#LCD').print('good sunlight    ');}
	            }
            });
        }, 2000);

    setInterval(function () {
        $('#TempAndHum').getRelativeHumidity(function (error, humidity) {
            if (error) {
                console.error(error);
                return;
            }
            $('#LCD').setCursor(1, 0);
            console.log('humidity', humidity);
                postState('humidity', humidity);
            /////////////////
            if (mode==1) {
            	$('#LCD').print('humidity: ' + humidity+'   ');
            	$('#LCD').setCursor(1, 1);
	                if (humidity>65) 
	               		$('#LCD').print('WET.get ur UMBer');
	               	else if (humidity<15) {
	               		$('#LCD').print('dry.DRINK WATER');
	               	} else {$('#LCD').print('cool day it is');}
	            
        	}
        });
    }, 1000)
    ///////////////////////
});

$.end(function () {
    $('#led-r').turnOff();
});