import './start-update-page.css';



function RiderEtaPage() {

    setInterval(function() {
        var time = 10;
        if (time !== null){
            return time;
        } else {
            return "calculating...";
        }
    }, 60 * 1000);


    return (
    <body>
    <div className="container">
    <h1>Your location has been sent!</h1>
    <h2>Your driver will be here in: {setInterval}</h2>
    </div>
    </body>
    );
}
export default RiderEtaPage;