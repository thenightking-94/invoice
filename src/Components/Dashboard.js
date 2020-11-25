import React from 'react';
import '../CSS/allcss.css';
import { Avatar, Typography } from '@material-ui/core';

const Dashboard = (props) => {


    return (
        <div>
            <div id='nav'>
                {
                    window.innerWidth > 768
                    && <div><Typography className='typo'><i style={{ color: 'white' }}>{props.match.params.name}</i>&nbsp;</Typography>
                        <p style={{ fontFamily: 'ITC Charter', color: 'white' }}>{localStorage.getItem('email_id')}</p></div>
                }
                {window.innerWidth < 768 &&
                    <div><Typography className='typo'><i style={{ color: 'white' }}>{props.match.params.name}</i>&nbsp;</Typography>
                        <p style={{ fontFamily: 'Helvetica', fontVariant: 'small-caps', color: 'white' }}>{localStorage.getItem('email_id')}</p></div>
                }

                <Avatar src={`${localStorage.getItem('img_url')}`} />
            </div>
            <div style={{ textAlign: 'center', marginTop: window.innerWidth > 768 ? '140px' : '120px' }}>
                <Typography style={{ fontFamily: 'Helvetica', fontVariant: 'small-caps' }}>Please fill in the details for your invoice :</Typography>
                <br />
            </div>
        </div>
    );


}
const Memoized_dashboard = React.memo(Dashboard);
export default Memoized_dashboard;