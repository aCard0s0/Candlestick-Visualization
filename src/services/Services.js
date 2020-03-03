import axios from "axios";
import { csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

import { unix } from "moment"

/**
 * 
 * @param timeperiod string value of 15m, 1h 
 */
export function bitfinex_xtcusd(_timeperiod) {

    _timeperiod = _timeperiod.toUpperCase()


    switch(_timeperiod) {
        case "15M":     return get(BITFINEX_XTC_USD_15M);
        case "1H":      return get(BITFINEX_XTC_USD_1H);
        default:
            console.log("time period of "+ _timeperiod +" not supported.")
    }
}

/**
 *  HTTP GET based on AXIO library. 
 * 
 * @param {*} _url to fetch data.
 */
function get(_url) {

    return axios.get(_url)
        .then(
            resp => csvParse(resp.data, parseData()),
        ).catch(
            err => { console.log(err) },
        )
}

function parseData() {
	return function(d) {
        d.time = unix(d.time / 1000).toDate(); // convert to seconds
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;
		return d;
	};
}

const IP = "localhost";
const PORT = "3000";
const BITFINEX_XTC_USD_15M = "http://"+ IP +":"+ PORT +"/datasets/bitfinex_btcusd_15m.csv";
const BITFINEX_XTC_USD_1H = "http://"+ IP +":"+ PORT +"/datasets/bitfinex_btcusd_1h.csv";