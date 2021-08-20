const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=restaurant]:checked').value;
    const data = {os:choice};

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

        e.preventDefault();
});

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

const date = new Date(today);

const day = date.getDay();

if(day == 0){
var dataPoints = [
    { label: 'McKonalds', y: 6 },
    { label: 'FishyBusiness', y: 2 },
    { label: 'Asados', y: 3 },
    { label: 'Sushi', y: 2 },
    { label: 'Gyros', y: 2 },
];
} else if (day == 1){
var dataPoints = [
        { label: 'McKonalds', y: 3 },
        { label: 'FishyBusiness', y: 1 },
        { label: 'Asados', y: 5 },
        { label: 'Sushi', y: 2 },
        { label: 'Gyros', y: 4 },
    ];
} else if (day == 2){
    var dataPoints = [
        { label: 'McKonalds', y: 2 },
        { label: 'FishyBusiness', y: 3 },
        { label: 'Asados', y: 6 },
        { label: 'Sushi', y: 2 },
        { label: 'Gyros', y: 2 },
    ];
} else if (day == 3) {
    var dataPoints = [
        { label: 'McKonalds', y: 4 },
        { label: 'FishyBusiness', y: 6 },
        { label: 'Asados', y: 1 },
        { label: 'Sushi', y: 1 },
        { label: 'Gyros', y: 3 },
    ];
} else if (day == 4){
    var dataPoints = [
        { label: 'McKonalds', y: 6 },
        { label: 'FishyBusiness', y: 4 },
        { label: 'Asados', y: 1 },
        { label: 'Sushi', y: 3 },
        { label: 'Gyros', y: 1 },
    ];
} else if (day == 5){
    var dataPoints = [
        { label: 'McKonalds', y: 4 },
        { label: 'FishyBusiness', y: 3 },
        { label: 'Asados', y: 1 },
        { label: 'Sushi', y: 1 },
        { label: 'Gyros', y: 6 },
    ];
} else {
    var dataPoints = [
        { label: 'McKonalds', y: 4 },
        { label: 'FishyBusiness', y: 1 },
        { label: 'Asados', y: 6 },
        { label: 'Sushi', y: 1 },
        { label: 'Gyros', y: 3 },
    ];
}

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    Pusher.logToConsole = true;

    var pusher = new Pusher('b10444504d1ebd20401e', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('Lunch-poll');
    channel.bind('Lunch-vote', function(data) {
     // alert(JSON.stringify(data));
     dataPoints = dataPoints.map(x => {
        if(x.label == data.os) {
            if(x.label == data.os){
                x.y += data.points;
                return x;
            } else {
                return x;
            }
        }
    });
    chart.render();
    });
}