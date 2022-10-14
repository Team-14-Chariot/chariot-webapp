import './ride-request-page.css';
import HeaderBlank from '../components/views/HeaderBlank';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {checkEventCode} from '../integration/eventIntegration';

function RideRequestPage() {
    const params = useParams();
    const eventCode = params.eventCode;
    const [verifiedCode, setVerifiedCode] = useState(false);
    useEffect(() => {
        async function check(){
            if(!verifiedCode){
                const res = await checkEventCode(eventCode);
                console.log(res);
                if(res.status === "success"){
                    setVerifiedCode(true);
                }
            }
        }
        check();
    }, [eventCode, verifiedCode])
    return (
    <body>
    <HeaderBlank />
    <div className="container">
    {verifiedCode ? <h1>RIDE REQUEST FOR {eventCode}</h1> : null}
    </div>
    </body>
    );
}
export default RideRequestPage;