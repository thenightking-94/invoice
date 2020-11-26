import React, { useState, useRef, useEffect } from 'react';
import '../CSS/allcss.css';
import { Avatar, Typography, Button, Grid } from '@material-ui/core';
import Pdf from "react-to-pdf";

const Dashboard = (props) => {
    const [data, setdata] = useState(null);
    const ref = useRef();
    const options = {
        orientation: 'landscape',
    };
    const logout_option = () => {
        window.location.assign('/logout');
    }

    //switch button to activate pdf generation, when all the data fields have been filled up
    const calvalue = () => {
        var el = document.querySelectorAll("input[id='data']");
        var valuedata = [];
        if (el) {
            for (var i = 0; i < el.length; i++) {
                if (el[i].value) {
                    valuedata = [...valuedata, el[i].value];
                }
            }
        }
        var area = document.getElementById('item_des');
        if (area)
            if (area.value)
                valuedata.splice(1, 0, area.value);

        // console.log(valuedata)
        var counter = 0;
        for (var i = 0; i < valuedata.length; i++) {
            if (valuedata[i].length >= 1)
                counter++;
        }
        if (counter == 7)
            setdata(valuedata)

        else
            setdata(null);
    }

    useEffect(() => {
        if (data)
            localStorage.setItem('data_invoice', data);
    }, [data])



    return (
        <div>
            <div id='nav'>
                {window.innerWidth > 768
                    && <div><Typography className='typo'><i style={{ color: 'white' }}>{props.match.params.name}</i>&nbsp;</Typography>
                        <p style={{ fontFamily: 'ITC Charter', color: 'white' }}>{localStorage.getItem('email_id')}</p></div>
                }
                {window.innerWidth < 768 &&
                    <div><Typography className='typo'><i style={{ color: 'white' }}>{props.match.params.name}</i>&nbsp;</Typography>
                        <p style={{ fontFamily: 'Helvetica', fontVariant: 'small-caps', color: 'white' }}>{localStorage.getItem('email_id')}</p></div>
                }
                <Avatar onClick={logout_option} style={{ cursor: 'pointer' }} src={`${localStorage.getItem('img_url')}`} />
            </div>
            <div style={{ textAlign: 'center', marginTop: window.innerWidth > 768 ? '100px' : '110px' }}>
                <Typography style={{ fontFamily: 'Helvetica', boxShadow: '5px 8px 10px #888', fontVariant: 'small-caps', background: '#dcdcdc', padding: '2px', borderRadius: '4px' }}>Please fill in the details for your invoice :</Typography>
                <br />
            </div>
            <br />

            {/*the actual invoice data part*/}

            <div ref={ref} style={{ padding: '25px' }}>
                <div onMouseMove={calvalue} style={{ fontVariant: 'all-small-caps', display: 'flex', flexDirection: 'column', fontFamily: 'Helvetica', padding: '10px', border: '1px dotted black', borderRadius: '10px' }}>
                    <div >Name:&nbsp;&nbsp;{localStorage.getItem('name_user')}</div>
                    <br />
                    <div >Email:&nbsp;&nbsp;{localStorage.getItem('email_id')}</div>
                    <br />
                    <div id='pdf_data'><p>Item name :</p>&nbsp;&nbsp;<input autoComplete='off' id='data' style={{ border: '1px solid black' }} type='text' /></div>
                    <br />
                    <div id='pdf_data_column'><p>Item description :</p>&nbsp;&nbsp;<br />
                        <textarea style={{ border: '1px solid black' }} id="item_des" rows="4" cols="50" />
                    </div>
                    <br />
                    <div id='pdf_data'><p>Number of units :</p>&nbsp;&nbsp;<input autoComplete='off' id='data' style={{ border: '1px solid black' }} type='text' /></div>
                    <br />
                    <div id='pdf_data'><p>Quantity :</p>&nbsp;&nbsp;<input autoComplete='off' id='data' style={{ border: '1px solid black' }} type='text' /></div>
                    <br />
                    <div id='pdf_data'><p>Unit Price :</p>&nbsp;&nbsp;<input autoComplete='off' id='data' style={{ border: '1px solid black' }} type='text' /></div>
                    <br />
                    <div id='pdf_data'><p>Discount :</p>&nbsp;&nbsp;<input autoComplete='off' id='data' style={{ border: '1px solid black' }} type='text' /></div>
                    <br />
                    <div id='pdf_data'><p>Tax :</p>&nbsp;&nbsp;<input autoComplete='off' onChange={calvalue} id='data' style={{ border: '1px solid black' }} type='text' /></div>
                    <br />
                </div>
            </div>

            {/*generating pdf-button rendering*/}

            <Grid container direction='row' justify='center' alignItems='center'>
                <Pdf targetRef={ref} options={window.innerWidth > 768 ? options : ''} scale={window.innerWidth > 768 ? 0.8 : 1.5} filename={`${localStorage.getItem('name_user') + "_invoice.pdf"}`}>
                    {({ toPdf }) => <Button onClick={toPdf} style={{
                        pointerEvents: data ? 'auto' : 'none',
                        background: data ? '#FAEC9C' : '#dcdcdc'
                    }} className='btn'>
                        Generate Pdf
                    </Button>}
                </Pdf>
            </Grid>

            <span id='footer'>Invoice component</span>
        </div>
    );


}
const Memoized_dashboard = React.memo(Dashboard);
export default Memoized_dashboard;