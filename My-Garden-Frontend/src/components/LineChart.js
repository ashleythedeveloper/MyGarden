import React from 'react';
import { Line } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    Card: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    }
}));


const LineChart = (props) => {

    const classes = useStyles()

    const data = {
        labels: props.yData ? props.yData : null,
        datasets: [
            {
                yAxisID: 'y-axis-left',
                label: props.xLable,
                data: props.xData ? props.xData : null,
                fill: false,
                backgroundColor: 'white',
                borderColor: 'red',
            },
            {
                yAxisID: 'y-axis-right',
                label: props.x2Lable,
                data: props.x2Data ? props.x2Data : null,
                fill: false,
                backgroundColor: 'white',
                borderColor: 'blue',
            }]
    };


    const options = {
        responsive: true,
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Temperature and Humidity',
            },
        },
        tooltips: {
            mode: 'index',
            callbacks: {
                label: function (context) {
                    let label = context.yLabel;

                    if (context.yLable !== null) {
                        if (context.datasetIndex === 0) {
                            label = 'Tempreature: ' + context.yLabel + '°';
                        } else {
                            label = 'Humidity: ' + context.yLabel + '%';
                        }
                    }
                    return label;
                }
            }
        },
        scales: {
            yAxes: [
                {
                    display: true,
                    id: 'y-axis-left',
                    position: 'left',
                    ticks: {
                        callback: function (value, index, values) {
                            return value + props.xValueFormat;
                        },
                    },
                },
                {
                    display: true,
                    id: 'y-axis-right',
                    position: 'right',
                    ticks: {
                        callback: function (value, index, values) {
                            return value + props.x2ValueFormat;
                        },
                    },
                }]
        },
    };

    const genItemKey = () => {
        let num = Math.random();
        return num
    }

    return (
        <div className="LineChart">
            <Card raised={true} className={classes.Card}>
                <Line data={data} options={options} datasetKeyProvider={genItemKey} />
            </Card>
        </div>
    );
};

export default LineChart