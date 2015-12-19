define(["jquery", "highcharts", "highcharts3d", "exporting"], function($) {

$(function () {

    // Give the points a 3D feel by adding a radial gradient
    Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.4,
                cy: 0.3,
                r: 0.5
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
            ]
        };
    });

    var dataLabels = ['Year','Price','Mileage'];

    // Set up the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'graph',
            margin: 150,
            type: 'scatter',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 30,
                depth: 500,
                viewDistance: 5,
                frame: {
                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                    back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                    side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                }
            }
        },
        title: {
            text: 'Car Prices'
        },
        subtitle: {
            text: 'Click and drag the plot area to rotate in space'
        },
        plotOptions: {
            scatter: {
                width: 10,
                height: 10,
                depth: 10
            }
        },
        yAxis: {
            min: 0,
            max: 26000,
            title: 'Price (GBP)'
        },
        xAxis: {
            min: 1997,
            max: 2014,
            gridLineWidth: 1,
            title: 'Year of Registration'
        },
        zAxis: {
            min: 0,
            max: 150000,
            showFirstLabel: false,
            title: 'Mileage'
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Lotus Elise',
            colorByPoint: true,
            data: [
            {id: '122343245', x:2003, y:15995, z:33000},
            {x:2009, y:25995, z:34000},
            {x:2005, y:18000, z:41552},
            {x:2014, y:25450, z:7500},
            {x:2003, y:15995, z:33000},
            {x:2002, y:12500, z:45000},
            {x:1997, y:6950, z:145000},
            {x:2001, y:10450, z:79000},
            {x:2003, y:14450, z:48000},
            {x:2007, y:20950, z:24483},
            {x:1998, y:13950, z:10000}
            ]
        }]
    });


    // Add mouse events for rotation
    $(chart.container).bind('mousedown.hc touchstart.hc', function (eStart) {
        eStart = chart.pointer.normalize(eStart);

        var posX = eStart.pageX,
            posY = eStart.pageY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            newAlpha,
            newBeta,
            sensitivity = 5; // lower is more sensitive

        $(document).bind({
            'mousemove.hc touchdrag.hc': function (e) {
                // Run beta
                newBeta = beta + (posX - e.pageX) / sensitivity;
                chart.options.chart.options3d.beta = newBeta;

                // Run alpha
                newAlpha = alpha + (e.pageY - posY) / sensitivity;
                chart.options.chart.options3d.alpha = newAlpha;

                chart.redraw(false);
            },
            'mouseup touchend': function () {
                $(document).unbind('.hc');
            }
        });
    });


    // rotation to a plane

    // year vs price
    $('#menu .x_y').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        chart.options.chart.options3d.beta = 0.5;
        chart.options.chart.options3d.alpha = 0.5;
        chart.redraw(false);
    });

    // milage vs price
    $('#menu .x_z').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        chart.options.chart.options3d.beta = 90;
        chart.options.chart.options3d.alpha = 0;
        chart.redraw(false);
    });

    // milage vs year
    $('#menu .y_z').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        chart.options.chart.options3d.beta = 90;
        chart.options.chart.options3d.alpha = 90;
        chart.redraw(false);
    });


});

});