import React, { PropTypes } from 'react'
import { Bar } from 'react-chartjs-2'

const Chart = props => {
    const {
        type,
        chartData,
        chartOptions,
        className,
        tag: Tag,
        ...attributes
    } = props;

    return <Bar data={chartData} {...attributes} />
}



export default Chart