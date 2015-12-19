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
            name: 'Name of Car',
            colorByPoint: true,
            data: [
            [2003, 15995, 33000],
            [2009, 25995, 34000],
            [2005, 18000, 41552],
            [2014, 25450, 7500],
            [2003, 15995, 33000],
            [2002, 12500, 45000],
            [1997, 6950, 145000],
            [2001, 10450, 79000],
            [2003, 14450, 48000],
            [2007, 20950, 24483],
            [1998, 13950, 10000]
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