import React from 'react';
import { ChartCanvas, Chart } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { scaleTime } from "d3-scale";
import { format } from "d3-format";
import {
	BarSeries,
	CandlestickSeries,
} from "react-stockcharts/lib/series";
import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { last } from "react-stockcharts/lib/utils";

class Volume extends React.Component {

    
    render() {
        const { type, data, width, ratio } = this.props;

		const xAccessor = d => d.date;
		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
        const xExtents = [start, end];
        
        return (
            <ChartCanvas height={400}
                ratio={ratio}
                width={width}
                margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
                type={type}
                seriesName="MSFT"
                data={data}
                xScale={scaleTime()}
                xAccessor={xAccessor}
                xExtents={xExtents}>

                <Chart id={1}
                        yExtents={[d => d.volume]}
                        height={150} origin={(w, h) => [0, h - 150]}>
                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

                    <MouseCoordinateY
                        at="left"
                        orient="left"
                        displayFormat={format(".4s")} />

                    <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />

                    <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />

                    <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                        yAccessor={d => d.volume} displayFormat={format(".4s")} fill="#0F0F0F"/>
                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                        yAccessor={d => d.volume} displayFormat={format(".4s")} fill="#0F0F0F"/>
                </Chart>
            </ChartCanvas>
        );
    }
}

export default Volume;