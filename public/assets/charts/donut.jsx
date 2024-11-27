// import React, { Component } from "react";
// import ReactApexChart from "react-apexcharts";



// class DonutChart extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {

//             series: [44, 55, 13, 33],
//             options: {
//                 chart: {
//                     height: 220,
//                     type: 'donut',
//                 },
//                 dataLabels: {
//                     enabled: false
//                 },
//                 labels: ['Bitcoin', 'Tether', 'Tezos', 'Monero'],
//                 fill: {
//                     colors: ['#F7931A', '#2CA07A', '#A6DF00', '#FF6600']
//                 },
//                 responsive: [{
//                     breakpoint: 480,
//                     options: {
//                         chart: {
//                             width: 200
//                         },
//                         legend: {
//                             show: false
//                         }
//                     }
//                 }],
//                 legend: {
//                     show: false,
//                     position: 'right',
//                     offsetY: 0,
//                     height: 150,
//                 }
//             },


//         };
//     }



//     render() {
//         return (


//             <ReactApexChart options={this.state.options} series={this.state.series} type="donut" height={220} />


//         );
//     }
// }

// export default DonutChart;

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import ReactApexChart to ensure it runs only on the client
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DonutChart = () => {
    const [chartData] = useState({
        series: [44, 55, 13, 33],
        options: {
            chart: {
                height: 220,
                type: 'donut',
            },
            dataLabels: {
                enabled: false
            },
            labels: ['Bitcoin', 'Tether', 'Tezos', 'Monero'],
            fill: {
                colors: ['#F7931A', '#2CA07A', '#A6DF00', '#FF6600']
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            show: false
                        }
                    }
                }
            ],
            legend: {
                show: false,
                position: 'right',
                offsetY: 0,
                height: 150,
            }
        }
    });

    return (
        <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            height={220}
        />
    );
}

export default DonutChart;
