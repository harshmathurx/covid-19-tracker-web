import React from 'react'
import {Card, CardContent,Typography} from "@material-ui/core"
import "./InfoBox.css";
function InfoBox({title, isRed, active, cases, total, ...props}) {
    return (
        <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}` } onClick={props.onClick}>
            <CardContent>
                <Typography className='infoBox__title' color="textSecondary">
                    {title}
                </Typography>

                <h2 className= {`infoBox__cases ${!isRed && "infoBox__casesGreen"}`}>{cases}</h2>

                <Typography className='infoBox__total' color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
