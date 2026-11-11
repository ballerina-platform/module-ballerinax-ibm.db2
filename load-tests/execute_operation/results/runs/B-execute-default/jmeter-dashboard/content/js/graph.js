/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "maxY": 2478.0, "series": [{"data": [[0.0, 4.0], [0.1, 12.0], [0.2, 16.0], [0.3, 21.0], [0.4, 24.0], [0.5, 28.0], [0.6, 32.0], [0.7, 38.0], [0.8, 43.0], [0.9, 47.0], [1.0, 53.0], [1.1, 58.0], [1.2, 65.0], [1.3, 70.0], [1.4, 73.0], [1.5, 76.0], [1.6, 79.0], [1.7, 81.0], [1.8, 83.0], [1.9, 85.0], [2.0, 87.0], [2.1, 88.0], [2.2, 90.0], [2.3, 91.0], [2.4, 93.0], [2.5, 95.0], [2.6, 96.0], [2.7, 98.0], [2.8, 99.0], [2.9, 100.0], [3.0, 102.0], [3.1, 103.0], [3.2, 105.0], [3.3, 107.0], [3.4, 108.0], [3.5, 109.0], [3.6, 110.0], [3.7, 111.0], [3.8, 111.0], [3.9, 112.0], [4.0, 113.0], [4.1, 113.0], [4.2, 114.0], [4.3, 114.0], [4.4, 114.0], [4.5, 115.0], [4.6, 115.0], [4.7, 115.0], [4.8, 116.0], [4.9, 116.0], [5.0, 116.0], [5.1, 117.0], [5.2, 117.0], [5.3, 117.0], [5.4, 117.0], [5.5, 118.0], [5.6, 118.0], [5.7, 118.0], [5.8, 118.0], [5.9, 119.0], [6.0, 119.0], [6.1, 119.0], [6.2, 119.0], [6.3, 119.0], [6.4, 120.0], [6.5, 120.0], [6.6, 120.0], [6.7, 120.0], [6.8, 120.0], [6.9, 120.0], [7.0, 120.0], [7.1, 121.0], [7.2, 121.0], [7.3, 121.0], [7.4, 121.0], [7.5, 121.0], [7.6, 121.0], [7.7, 121.0], [7.8, 122.0], [7.9, 122.0], [8.0, 122.0], [8.1, 122.0], [8.2, 122.0], [8.3, 122.0], [8.4, 122.0], [8.5, 122.0], [8.6, 122.0], [8.7, 122.0], [8.8, 123.0], [8.9, 123.0], [9.0, 123.0], [9.1, 123.0], [9.2, 123.0], [9.3, 123.0], [9.4, 123.0], [9.5, 123.0], [9.6, 123.0], [9.7, 123.0], [9.8, 124.0], [9.9, 124.0], [10.0, 124.0], [10.1, 124.0], [10.2, 124.0], [10.3, 124.0], [10.4, 124.0], [10.5, 124.0], [10.6, 124.0], [10.7, 124.0], [10.8, 124.0], [10.9, 124.0], [11.0, 124.0], [11.1, 125.0], [11.2, 125.0], [11.3, 125.0], [11.4, 125.0], [11.5, 125.0], [11.6, 125.0], [11.7, 125.0], [11.8, 125.0], [11.9, 125.0], [12.0, 125.0], [12.1, 125.0], [12.2, 125.0], [12.3, 125.0], [12.4, 125.0], [12.5, 125.0], [12.6, 126.0], [12.7, 126.0], [12.8, 126.0], [12.9, 126.0], [13.0, 126.0], [13.1, 126.0], [13.2, 126.0], [13.3, 126.0], [13.4, 126.0], [13.5, 126.0], [13.6, 126.0], [13.7, 126.0], [13.8, 126.0], [13.9, 126.0], [14.0, 126.0], [14.1, 126.0], [14.2, 126.0], [14.3, 127.0], [14.4, 127.0], [14.5, 127.0], [14.6, 127.0], [14.7, 127.0], [14.8, 127.0], [14.9, 127.0], [15.0, 127.0], [15.1, 127.0], [15.2, 127.0], [15.3, 127.0], [15.4, 127.0], [15.5, 127.0], [15.6, 127.0], [15.7, 127.0], [15.8, 127.0], [15.9, 127.0], [16.0, 127.0], [16.1, 127.0], [16.2, 127.0], [16.3, 128.0], [16.4, 128.0], [16.5, 128.0], [16.6, 128.0], [16.7, 128.0], [16.8, 128.0], [16.9, 128.0], [17.0, 128.0], [17.1, 128.0], [17.2, 128.0], [17.3, 128.0], [17.4, 128.0], [17.5, 128.0], [17.6, 128.0], [17.7, 128.0], [17.8, 128.0], [17.9, 128.0], [18.0, 128.0], [18.1, 128.0], [18.2, 128.0], [18.3, 128.0], [18.4, 128.0], [18.5, 129.0], [18.6, 129.0], [18.7, 129.0], [18.8, 129.0], [18.9, 129.0], [19.0, 129.0], [19.1, 129.0], [19.2, 129.0], [19.3, 129.0], [19.4, 129.0], [19.5, 129.0], [19.6, 129.0], [19.7, 129.0], [19.8, 129.0], [19.9, 129.0], [20.0, 129.0], [20.1, 129.0], [20.2, 129.0], [20.3, 129.0], [20.4, 129.0], [20.5, 129.0], [20.6, 129.0], [20.7, 129.0], [20.8, 129.0], [20.9, 129.0], [21.0, 130.0], [21.1, 130.0], [21.2, 130.0], [21.3, 130.0], [21.4, 130.0], [21.5, 130.0], [21.6, 130.0], [21.7, 130.0], [21.8, 130.0], [21.9, 130.0], [22.0, 130.0], [22.1, 130.0], [22.2, 130.0], [22.3, 130.0], [22.4, 130.0], [22.5, 130.0], [22.6, 130.0], [22.7, 130.0], [22.8, 130.0], [22.9, 130.0], [23.0, 130.0], [23.1, 130.0], [23.2, 130.0], [23.3, 130.0], [23.4, 130.0], [23.5, 130.0], [23.6, 130.0], [23.7, 131.0], [23.8, 131.0], [23.9, 131.0], [24.0, 131.0], [24.1, 131.0], [24.2, 131.0], [24.3, 131.0], [24.4, 131.0], [24.5, 131.0], [24.6, 131.0], [24.7, 131.0], [24.8, 131.0], [24.9, 131.0], [25.0, 131.0], [25.1, 131.0], [25.2, 131.0], [25.3, 131.0], [25.4, 131.0], [25.5, 131.0], [25.6, 131.0], [25.7, 131.0], [25.8, 131.0], [25.9, 131.0], [26.0, 131.0], [26.1, 131.0], [26.2, 131.0], [26.3, 131.0], [26.4, 131.0], [26.5, 131.0], [26.6, 131.0], [26.7, 132.0], [26.8, 132.0], [26.9, 132.0], [27.0, 132.0], [27.1, 132.0], [27.2, 132.0], [27.3, 132.0], [27.4, 132.0], [27.5, 132.0], [27.6, 132.0], [27.7, 132.0], [27.8, 132.0], [27.9, 132.0], [28.0, 132.0], [28.1, 132.0], [28.2, 132.0], [28.3, 132.0], [28.4, 132.0], [28.5, 132.0], [28.6, 132.0], [28.7, 132.0], [28.8, 132.0], [28.9, 132.0], [29.0, 132.0], [29.1, 132.0], [29.2, 132.0], [29.3, 132.0], [29.4, 132.0], [29.5, 132.0], [29.6, 132.0], [29.7, 132.0], [29.8, 132.0], [29.9, 132.0], [30.0, 133.0], [30.1, 133.0], [30.2, 133.0], [30.3, 133.0], [30.4, 133.0], [30.5, 133.0], [30.6, 133.0], [30.7, 133.0], [30.8, 133.0], [30.9, 133.0], [31.0, 133.0], [31.1, 133.0], [31.2, 133.0], [31.3, 133.0], [31.4, 133.0], [31.5, 133.0], [31.6, 133.0], [31.7, 133.0], [31.8, 133.0], [31.9, 133.0], [32.0, 133.0], [32.1, 133.0], [32.2, 133.0], [32.3, 133.0], [32.4, 133.0], [32.5, 133.0], [32.6, 133.0], [32.7, 133.0], [32.8, 133.0], [32.9, 133.0], [33.0, 133.0], [33.1, 133.0], [33.2, 133.0], [33.3, 133.0], [33.4, 133.0], [33.5, 134.0], [33.6, 134.0], [33.7, 134.0], [33.8, 134.0], [33.9, 134.0], [34.0, 134.0], [34.1, 134.0], [34.2, 134.0], [34.3, 134.0], [34.4, 134.0], [34.5, 134.0], [34.6, 134.0], [34.7, 134.0], [34.8, 134.0], [34.9, 134.0], [35.0, 134.0], [35.1, 134.0], [35.2, 134.0], [35.3, 134.0], [35.4, 134.0], [35.5, 134.0], [35.6, 134.0], [35.7, 134.0], [35.8, 134.0], [35.9, 134.0], [36.0, 134.0], [36.1, 134.0], [36.2, 134.0], [36.3, 134.0], [36.4, 134.0], [36.5, 134.0], [36.6, 134.0], [36.7, 134.0], [36.8, 134.0], [36.9, 134.0], [37.0, 134.0], [37.1, 134.0], [37.2, 134.0], [37.3, 135.0], [37.4, 135.0], [37.5, 135.0], [37.6, 135.0], [37.7, 135.0], [37.8, 135.0], [37.9, 135.0], [38.0, 135.0], [38.1, 135.0], [38.2, 135.0], [38.3, 135.0], [38.4, 135.0], [38.5, 135.0], [38.6, 135.0], [38.7, 135.0], [38.8, 135.0], [38.9, 135.0], [39.0, 135.0], [39.1, 135.0], [39.2, 135.0], [39.3, 135.0], [39.4, 135.0], [39.5, 135.0], [39.6, 135.0], [39.7, 135.0], [39.8, 135.0], [39.9, 135.0], [40.0, 135.0], [40.1, 135.0], [40.2, 135.0], [40.3, 135.0], [40.4, 135.0], [40.5, 135.0], [40.6, 135.0], [40.7, 135.0], [40.8, 135.0], [40.9, 135.0], [41.0, 135.0], [41.1, 135.0], [41.2, 135.0], [41.3, 136.0], [41.4, 136.0], [41.5, 136.0], [41.6, 136.0], [41.7, 136.0], [41.8, 136.0], [41.9, 136.0], [42.0, 136.0], [42.1, 136.0], [42.2, 136.0], [42.3, 136.0], [42.4, 136.0], [42.5, 136.0], [42.6, 136.0], [42.7, 136.0], [42.8, 136.0], [42.9, 136.0], [43.0, 136.0], [43.1, 136.0], [43.2, 136.0], [43.3, 136.0], [43.4, 136.0], [43.5, 136.0], [43.6, 136.0], [43.7, 136.0], [43.8, 136.0], [43.9, 136.0], [44.0, 136.0], [44.1, 136.0], [44.2, 136.0], [44.3, 136.0], [44.4, 136.0], [44.5, 136.0], [44.6, 136.0], [44.7, 136.0], [44.8, 136.0], [44.9, 136.0], [45.0, 136.0], [45.1, 136.0], [45.2, 136.0], [45.3, 136.0], [45.4, 137.0], [45.5, 137.0], [45.6, 137.0], [45.7, 137.0], [45.8, 137.0], [45.9, 137.0], [46.0, 137.0], [46.1, 137.0], [46.2, 137.0], [46.3, 137.0], [46.4, 137.0], [46.5, 137.0], [46.6, 137.0], [46.7, 137.0], [46.8, 137.0], [46.9, 137.0], [47.0, 137.0], [47.1, 137.0], [47.2, 137.0], [47.3, 137.0], [47.4, 137.0], [47.5, 137.0], [47.6, 137.0], [47.7, 137.0], [47.8, 137.0], [47.9, 137.0], [48.0, 137.0], [48.1, 137.0], [48.2, 137.0], [48.3, 137.0], [48.4, 137.0], [48.5, 137.0], [48.6, 137.0], [48.7, 137.0], [48.8, 137.0], [48.9, 137.0], [49.0, 137.0], [49.1, 137.0], [49.2, 137.0], [49.3, 137.0], [49.4, 137.0], [49.5, 137.0], [49.6, 137.0], [49.7, 138.0], [49.8, 138.0], [49.9, 138.0], [50.0, 138.0], [50.1, 138.0], [50.2, 138.0], [50.3, 138.0], [50.4, 138.0], [50.5, 138.0], [50.6, 138.0], [50.7, 138.0], [50.8, 138.0], [50.9, 138.0], [51.0, 138.0], [51.1, 138.0], [51.2, 138.0], [51.3, 138.0], [51.4, 138.0], [51.5, 138.0], [51.6, 138.0], [51.7, 138.0], [51.8, 138.0], [51.9, 138.0], [52.0, 138.0], [52.1, 138.0], [52.2, 138.0], [52.3, 138.0], [52.4, 138.0], [52.5, 138.0], [52.6, 138.0], [52.7, 138.0], [52.8, 138.0], [52.9, 138.0], [53.0, 138.0], [53.1, 138.0], [53.2, 138.0], [53.3, 138.0], [53.4, 138.0], [53.5, 138.0], [53.6, 138.0], [53.7, 138.0], [53.8, 138.0], [53.9, 138.0], [54.0, 138.0], [54.1, 139.0], [54.2, 139.0], [54.3, 139.0], [54.4, 139.0], [54.5, 139.0], [54.6, 139.0], [54.7, 139.0], [54.8, 139.0], [54.9, 139.0], [55.0, 139.0], [55.1, 139.0], [55.2, 139.0], [55.3, 139.0], [55.4, 139.0], [55.5, 139.0], [55.6, 139.0], [55.7, 139.0], [55.8, 139.0], [55.9, 139.0], [56.0, 139.0], [56.1, 139.0], [56.2, 139.0], [56.3, 139.0], [56.4, 139.0], [56.5, 139.0], [56.6, 139.0], [56.7, 139.0], [56.8, 139.0], [56.9, 139.0], [57.0, 139.0], [57.1, 139.0], [57.2, 139.0], [57.3, 139.0], [57.4, 139.0], [57.5, 139.0], [57.6, 139.0], [57.7, 139.0], [57.8, 139.0], [57.9, 139.0], [58.0, 139.0], [58.1, 139.0], [58.2, 139.0], [58.3, 140.0], [58.4, 140.0], [58.5, 140.0], [58.6, 140.0], [58.7, 140.0], [58.8, 140.0], [58.9, 140.0], [59.0, 140.0], [59.1, 140.0], [59.2, 140.0], [59.3, 140.0], [59.4, 140.0], [59.5, 140.0], [59.6, 140.0], [59.7, 140.0], [59.8, 140.0], [59.9, 140.0], [60.0, 140.0], [60.1, 140.0], [60.2, 140.0], [60.3, 140.0], [60.4, 140.0], [60.5, 140.0], [60.6, 140.0], [60.7, 140.0], [60.8, 140.0], [60.9, 140.0], [61.0, 140.0], [61.1, 140.0], [61.2, 140.0], [61.3, 140.0], [61.4, 140.0], [61.5, 140.0], [61.6, 140.0], [61.7, 140.0], [61.8, 140.0], [61.9, 140.0], [62.0, 140.0], [62.1, 140.0], [62.2, 140.0], [62.3, 140.0], [62.4, 140.0], [62.5, 141.0], [62.6, 141.0], [62.7, 141.0], [62.8, 141.0], [62.9, 141.0], [63.0, 141.0], [63.1, 141.0], [63.2, 141.0], [63.3, 141.0], [63.4, 141.0], [63.5, 141.0], [63.6, 141.0], [63.7, 141.0], [63.8, 141.0], [63.9, 141.0], [64.0, 141.0], [64.1, 141.0], [64.2, 141.0], [64.3, 141.0], [64.4, 141.0], [64.5, 141.0], [64.6, 141.0], [64.7, 141.0], [64.8, 141.0], [64.9, 141.0], [65.0, 141.0], [65.1, 141.0], [65.2, 141.0], [65.3, 141.0], [65.4, 141.0], [65.5, 141.0], [65.6, 141.0], [65.7, 141.0], [65.8, 141.0], [65.9, 141.0], [66.0, 141.0], [66.1, 141.0], [66.2, 141.0], [66.3, 141.0], [66.4, 141.0], [66.5, 141.0], [66.6, 142.0], [66.7, 142.0], [66.8, 142.0], [66.9, 142.0], [67.0, 142.0], [67.1, 142.0], [67.2, 142.0], [67.3, 142.0], [67.4, 142.0], [67.5, 142.0], [67.6, 142.0], [67.7, 142.0], [67.8, 142.0], [67.9, 142.0], [68.0, 142.0], [68.1, 142.0], [68.2, 142.0], [68.3, 142.0], [68.4, 142.0], [68.5, 142.0], [68.6, 142.0], [68.7, 142.0], [68.8, 142.0], [68.9, 142.0], [69.0, 142.0], [69.1, 142.0], [69.2, 142.0], [69.3, 142.0], [69.4, 142.0], [69.5, 142.0], [69.6, 142.0], [69.7, 142.0], [69.8, 142.0], [69.9, 142.0], [70.0, 142.0], [70.1, 142.0], [70.2, 142.0], [70.3, 142.0], [70.4, 142.0], [70.5, 143.0], [70.6, 143.0], [70.7, 143.0], [70.8, 143.0], [70.9, 143.0], [71.0, 143.0], [71.1, 143.0], [71.2, 143.0], [71.3, 143.0], [71.4, 143.0], [71.5, 143.0], [71.6, 143.0], [71.7, 143.0], [71.8, 143.0], [71.9, 143.0], [72.0, 143.0], [72.1, 143.0], [72.2, 143.0], [72.3, 143.0], [72.4, 143.0], [72.5, 143.0], [72.6, 143.0], [72.7, 143.0], [72.8, 143.0], [72.9, 143.0], [73.0, 143.0], [73.1, 143.0], [73.2, 143.0], [73.3, 143.0], [73.4, 143.0], [73.5, 143.0], [73.6, 143.0], [73.7, 143.0], [73.8, 143.0], [73.9, 143.0], [74.0, 144.0], [74.1, 144.0], [74.2, 144.0], [74.3, 144.0], [74.4, 144.0], [74.5, 144.0], [74.6, 144.0], [74.7, 144.0], [74.8, 144.0], [74.9, 144.0], [75.0, 144.0], [75.1, 144.0], [75.2, 144.0], [75.3, 144.0], [75.4, 144.0], [75.5, 144.0], [75.6, 144.0], [75.7, 144.0], [75.8, 144.0], [75.9, 144.0], [76.0, 144.0], [76.1, 144.0], [76.2, 144.0], [76.3, 144.0], [76.4, 144.0], [76.5, 144.0], [76.6, 144.0], [76.7, 144.0], [76.8, 144.0], [76.9, 144.0], [77.0, 144.0], [77.1, 144.0], [77.2, 144.0], [77.3, 145.0], [77.4, 145.0], [77.5, 145.0], [77.6, 145.0], [77.7, 145.0], [77.8, 145.0], [77.9, 145.0], [78.0, 145.0], [78.1, 145.0], [78.2, 145.0], [78.3, 145.0], [78.4, 145.0], [78.5, 145.0], [78.6, 145.0], [78.7, 145.0], [78.8, 145.0], [78.9, 145.0], [79.0, 145.0], [79.1, 145.0], [79.2, 145.0], [79.3, 145.0], [79.4, 145.0], [79.5, 145.0], [79.6, 145.0], [79.7, 145.0], [79.8, 145.0], [79.9, 145.0], [80.0, 145.0], [80.1, 145.0], [80.2, 145.0], [80.3, 146.0], [80.4, 146.0], [80.5, 146.0], [80.6, 146.0], [80.7, 146.0], [80.8, 146.0], [80.9, 146.0], [81.0, 146.0], [81.1, 146.0], [81.2, 146.0], [81.3, 146.0], [81.4, 146.0], [81.5, 146.0], [81.6, 146.0], [81.7, 146.0], [81.8, 146.0], [81.9, 146.0], [82.0, 146.0], [82.1, 146.0], [82.2, 146.0], [82.3, 146.0], [82.4, 146.0], [82.5, 146.0], [82.6, 146.0], [82.7, 146.0], [82.8, 146.0], [82.9, 147.0], [83.0, 147.0], [83.1, 147.0], [83.2, 147.0], [83.3, 147.0], [83.4, 147.0], [83.5, 147.0], [83.6, 147.0], [83.7, 147.0], [83.8, 147.0], [83.9, 147.0], [84.0, 147.0], [84.1, 147.0], [84.2, 147.0], [84.3, 147.0], [84.4, 147.0], [84.5, 147.0], [84.6, 147.0], [84.7, 147.0], [84.8, 147.0], [84.9, 147.0], [85.0, 147.0], [85.1, 148.0], [85.2, 148.0], [85.3, 148.0], [85.4, 148.0], [85.5, 148.0], [85.6, 148.0], [85.7, 148.0], [85.8, 148.0], [85.9, 148.0], [86.0, 148.0], [86.1, 148.0], [86.2, 148.0], [86.3, 148.0], [86.4, 148.0], [86.5, 148.0], [86.6, 148.0], [86.7, 148.0], [86.8, 148.0], [86.9, 148.0], [87.0, 148.0], [87.1, 149.0], [87.2, 149.0], [87.3, 149.0], [87.4, 149.0], [87.5, 149.0], [87.6, 149.0], [87.7, 149.0], [87.8, 149.0], [87.9, 149.0], [88.0, 149.0], [88.1, 149.0], [88.2, 149.0], [88.3, 149.0], [88.4, 149.0], [88.5, 149.0], [88.6, 149.0], [88.7, 150.0], [88.8, 150.0], [88.9, 150.0], [89.0, 150.0], [89.1, 150.0], [89.2, 150.0], [89.3, 150.0], [89.4, 150.0], [89.5, 150.0], [89.6, 150.0], [89.7, 150.0], [89.8, 150.0], [89.9, 150.0], [90.0, 151.0], [90.1, 151.0], [90.2, 151.0], [90.3, 151.0], [90.4, 151.0], [90.5, 151.0], [90.6, 151.0], [90.7, 151.0], [90.8, 151.0], [90.9, 151.0], [91.0, 151.0], [91.1, 152.0], [91.2, 152.0], [91.3, 152.0], [91.4, 152.0], [91.5, 152.0], [91.6, 152.0], [91.7, 152.0], [91.8, 152.0], [91.9, 152.0], [92.0, 153.0], [92.1, 153.0], [92.2, 153.0], [92.3, 153.0], [92.4, 153.0], [92.5, 153.0], [92.6, 153.0], [92.7, 154.0], [92.8, 154.0], [92.9, 154.0], [93.0, 154.0], [93.1, 154.0], [93.2, 154.0], [93.3, 155.0], [93.4, 155.0], [93.5, 155.0], [93.6, 155.0], [93.7, 155.0], [93.8, 156.0], [93.9, 156.0], [94.0, 156.0], [94.1, 157.0], [94.2, 157.0], [94.3, 157.0], [94.4, 158.0], [94.5, 158.0], [94.6, 158.0], [94.7, 159.0], [94.8, 159.0], [94.9, 160.0], [95.0, 160.0], [95.1, 161.0], [95.2, 161.0], [95.3, 162.0], [95.4, 163.0], [95.5, 163.0], [95.6, 164.0], [95.7, 165.0], [95.8, 166.0], [95.9, 167.0], [96.0, 168.0], [96.1, 169.0], [96.2, 170.0], [96.3, 171.0], [96.4, 172.0], [96.5, 173.0], [96.6, 174.0], [96.7, 175.0], [96.8, 176.0], [96.9, 178.0], [97.0, 179.0], [97.1, 180.0], [97.2, 181.0], [97.3, 182.0], [97.4, 183.0], [97.5, 184.0], [97.6, 185.0], [97.7, 186.0], [97.8, 187.0], [97.9, 188.0], [98.0, 188.0], [98.1, 190.0], [98.2, 191.0], [98.3, 192.0], [98.4, 193.0], [98.5, 195.0], [98.6, 196.0], [98.7, 198.0], [98.8, 200.0], [98.9, 203.0], [99.0, 207.0], [99.1, 211.0], [99.2, 218.0], [99.3, 233.0], [99.4, 253.0], [99.5, 269.0], [99.6, 399.0], [99.7, 603.0], [99.8, 809.0], [99.9, 1009.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 234787.0, "series": [{"data": [[0.0, 6947.0], [2400.0, 3.0], [600.0, 120.0], [700.0, 118.0], [200.0, 1843.0], [800.0, 124.0], [900.0, 124.0], [1000.0, 136.0], [1100.0, 89.0], [1200.0, 23.0], [300.0, 135.0], [100.0, 234787.0], [400.0, 115.0], [1700.0, 3.0], [1800.0, 1.0], [500.0, 117.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 7.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 243829.0, "series": [{"data": [[0.0, 243829.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 849.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 7.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 16.299248417721508, "minX": 1.79326314E12, "maxY": 60.0, "series": [{"data": [[1.79326326E12, 60.0], [1.79326374E12, 59.8623346303502], [1.79326356E12, 60.0], [1.79326338E12, 60.0], [1.7932632E12, 52.25356188780072], [1.79326368E12, 60.0], [1.7932635E12, 60.0], [1.79326332E12, 60.0], [1.79326314E12, 16.299248417721508], [1.79326362E12, 60.0], [1.79326344E12, 60.0]], "isOverall": false, "label": "Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326374E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 10.268292682926827, "minX": 1.0, "maxY": 207.32638888888883, "series": [{"data": [[2.0, 27.83750000000001], [3.0, 48.68750000000001], [4.0, 43.36170212765957], [5.0, 71.25352112676057], [6.0, 32.590476190476174], [7.0, 34.75423728813558], [8.0, 84.33571428571429], [9.0, 26.567741935483856], [10.0, 112.2119205298013], [11.0, 49.888888888888864], [12.0, 44.726235741444874], [13.0, 64.39903846153847], [14.0, 51.293040293040306], [15.0, 71.1387559808612], [16.0, 78.11274509803918], [17.0, 70.68442622950812], [18.0, 56.86217948717952], [19.0, 88.05000000000005], [20.0, 61.119122257053306], [21.0, 99.48341232227492], [22.0, 111.8826530612245], [23.0, 105.7627906976743], [24.0, 119.17326732673267], [25.0, 90.14909090909087], [26.0, 121.16203703703704], [27.0, 107.16923076923078], [28.0, 62.96651785714285], [29.0, 70.47058823529406], [30.0, 70.66117647058817], [31.0, 105.77516778523486], [32.0, 87.9454022988506], [33.0, 143.63755458515286], [34.0, 145.5617021276595], [35.0, 112.78881987577638], [36.0, 123.19064748201433], [37.0, 145.10852713178295], [38.0, 149.00400000000005], [39.0, 136.76821192052992], [40.0, 83.99180327868862], [41.0, 89.56026785714293], [42.0, 152.7528517110267], [43.0, 174.63008130081295], [44.0, 169.25572519083957], [45.0, 160.0790378006873], [46.0, 124.2339832869081], [47.0, 159.21428571428584], [48.0, 181.8792452830189], [49.0, 138.8220338983052], [50.0, 158.24767801857593], [51.0, 162.27906976744188], [52.0, 149.54293628808864], [53.0, 119.3265306122449], [54.0, 179.10652920962198], [55.0, 164.96176470588233], [56.0, 130.64434180138542], [57.0, 180.8026315789474], [58.0, 207.32638888888883], [59.0, 148.00750000000002], [60.0, 141.55426163653465], [1.0, 10.268292682926827]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[58.378711404457775, 139.73063735006252]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 60.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 10701.866666666667, "minX": 1.79326314E12, "maxY": 105219.83333333333, "series": [{"data": [[1.79326326E12, 55179.38333333333], [1.79326374E12, 27199.166666666668], [1.79326356E12, 54030.03333333333], [1.79326338E12, 55448.2], [1.7932632E12, 47540.333333333336], [1.79326368E12, 52408.666666666664], [1.7932635E12, 50389.36666666667], [1.79326332E12, 55111.65], [1.79326314E12, 10701.866666666667], [1.79326362E12, 54326.36666666667], [1.79326344E12, 55581.55]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.79326326E12, 104467.03333333334], [1.79326374E12, 51486.23333333333], [1.79326356E12, 102265.2], [1.79326338E12, 104973.56666666667], [1.7932632E12, 89995.1], [1.79326368E12, 99199.11666666667], [1.7932635E12, 95386.83333333333], [1.79326332E12, 104326.85], [1.79326314E12, 20256.933333333334], [1.79326362E12, 102824.96666666666], [1.79326344E12, 105219.83333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326374E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 73.34968354430376, "minX": 1.79326314E12, "maxY": 155.25042801556478, "series": [{"data": [[1.79326326E12, 137.88718401166133], [1.79326374E12, 155.25042801556478], [1.79326356E12, 140.87205202538684], [1.79326338E12, 137.2502290426032], [1.7932632E12, 136.24105075689997], [1.79326368E12, 145.2548061389337], [1.7932635E12, 151.03822565739603], [1.79326332E12, 138.09943541882572], [1.79326314E12, 73.34968354430376], [1.79326362E12, 140.07402789682817], [1.79326344E12, 136.918580296278]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326374E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 73.32041139240496, "minX": 1.79326314E12, "maxY": 155.24132295719775, "series": [{"data": [[1.79326326E12, 137.87832291227187], [1.79326374E12, 155.24132295719775], [1.79326356E12, 140.8640209981986], [1.79326338E12, 137.24244159413692], [1.7932632E12, 136.23227960819202], [1.79326368E12, 145.24487075928891], [1.7932635E12, 151.03104259430415], [1.79326332E12, 138.09175404232522], [1.79326314E12, 73.32041139240496], [1.79326362E12, 140.06639133483904], [1.79326344E12, 136.9099356411131]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326374E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0015974440894568683, "minX": 1.79326314E12, "maxY": 0.01700949367088614, "series": [{"data": [[1.79326326E12, 0.0021865050443055038], [1.79326374E12, 0.0022568093385214017], [1.79326356E12, 0.0017629084071143185], [1.79326338E12, 0.0020232096503282975], [1.7932632E12, 0.0022707034728405916], [1.79326368E12, 0.0022213247172859457], [1.7932635E12, 0.001848273544484589], [1.79326332E12, 0.001805123478127281], [1.79326314E12, 0.01700949367088614], [1.79326362E12, 0.0015974440894568683], [1.79326344E12, 0.0019421912487147348]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326374E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 4.0, "minX": 1.79326314E12, "maxY": 2478.0, "series": [{"data": [[1.79326326E12, 285.0], [1.79326374E12, 1252.0], [1.79326356E12, 258.0], [1.79326338E12, 269.0], [1.7932632E12, 296.0], [1.79326368E12, 1187.0], [1.7932635E12, 1254.0], [1.79326332E12, 272.0], [1.79326314E12, 2478.0], [1.79326362E12, 322.0], [1.79326344E12, 283.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.79326326E12, 150.0], [1.79326374E12, 152.0], [1.79326356E12, 152.0], [1.79326338E12, 149.0], [1.7932632E12, 188.0], [1.79326368E12, 151.0], [1.7932635E12, 150.0], [1.79326332E12, 149.0], [1.79326314E12, 112.0], [1.79326362E12, 151.0], [1.79326344E12, 147.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.79326326E12, 162.0], [1.79326374E12, 854.0], [1.79326356E12, 192.0], [1.79326338E12, 165.0], [1.7932632E12, 232.0], [1.79326368E12, 357.9600000000064], [1.7932635E12, 872.0], [1.79326332E12, 174.0], [1.79326314E12, 171.0], [1.79326362E12, 190.0], [1.79326344E12, 156.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.79326326E12, 153.0], [1.79326374E12, 188.0], [1.79326356E12, 168.0], [1.79326338E12, 152.0], [1.7932632E12, 198.0], [1.79326368E12, 165.95000000000073], [1.7932635E12, 162.0], [1.79326332E12, 153.0], [1.79326314E12, 149.0], [1.79326362E12, 161.0], [1.79326344E12, 150.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.79326326E12, 98.0], [1.79326374E12, 105.0], [1.79326356E12, 106.0], [1.79326338E12, 103.0], [1.7932632E12, 30.0], [1.79326368E12, 107.0], [1.7932635E12, 97.0], [1.79326332E12, 98.0], [1.79326314E12, 4.0], [1.79326362E12, 104.0], [1.79326344E12, 96.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.79326326E12, 139.0], [1.79326374E12, 138.0], [1.79326356E12, 139.0], [1.79326338E12, 138.0], [1.7932632E12, 138.0], [1.79326368E12, 138.0], [1.7932635E12, 137.0], [1.79326332E12, 137.0], [1.79326314E12, 77.0], [1.79326362E12, 139.0], [1.79326344E12, 137.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326374E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 6.0, "minX": 50.0, "maxY": 816.0, "series": [{"data": [[51.0, 816.0], [50.0, 558.0], [56.0, 750.0], [60.0, 6.0], [67.0, 24.0], [73.0, 351.0], [78.0, 72.5], [84.0, 12.0], [88.0, 29.0], [95.0, 110.5], [99.0, 567.5], [119.0, 20.0], [117.0, 21.0], [124.0, 143.0], [132.0, 141.0], [141.0, 73.0], [146.0, 576.5], [179.0, 16.0], [187.0, 77.0], [186.0, 145.0], [196.0, 52.5], [194.0, 107.0], [205.0, 88.0], [200.0, 110.0], [211.0, 95.0], [212.0, 99.0], [214.0, 111.0], [208.0, 132.0], [217.0, 104.0], [229.0, 106.0], [228.0, 149.0], [232.0, 133.5], [239.0, 140.0], [242.0, 71.5], [245.0, 185.0], [255.0, 61.0], [251.0, 114.0], [254.0, 133.5], [253.0, 139.0], [259.0, 184.0], [268.0, 184.0], [265.0, 190.0], [260.0, 140.0], [275.0, 157.5], [277.0, 139.0], [273.0, 133.0], [272.0, 148.0], [288.0, 25.0], [302.0, 93.0], [300.0, 121.5], [301.0, 92.0], [294.0, 182.0], [290.0, 141.0], [306.0, 64.0], [309.0, 159.0], [319.0, 144.0], [334.0, 141.0], [335.0, 166.0], [328.0, 161.5], [323.0, 162.0], [346.0, 67.0], [350.0, 129.0], [360.0, 87.0], [358.0, 160.5], [377.0, 133.0], [375.0, 147.0], [370.0, 151.0], [380.0, 137.0], [372.0, 134.0], [381.0, 144.0], [376.0, 143.0], [373.0, 140.0], [394.0, 145.0], [397.0, 148.0], [390.0, 140.0], [393.0, 137.0], [386.0, 138.0], [398.0, 143.0], [391.0, 141.0], [414.0, 140.0], [403.0, 144.0], [404.0, 142.0], [412.0, 142.0], [409.0, 142.0], [408.0, 142.0], [415.0, 141.0], [410.0, 143.0], [411.0, 143.0], [413.0, 139.0], [402.0, 138.0], [401.0, 141.0], [407.0, 141.0], [400.0, 142.0], [405.0, 143.0], [429.0, 139.0], [423.0, 138.0], [424.0, 140.0], [422.0, 142.0], [421.0, 141.0], [420.0, 141.0], [430.0, 139.0], [431.0, 139.0], [417.0, 140.0], [416.0, 140.0], [428.0, 140.0], [419.0, 141.0], [418.0, 140.0], [427.0, 141.0], [425.0, 141.0], [426.0, 140.0], [446.0, 132.0], [432.0, 139.0], [439.0, 137.0], [443.0, 136.0], [445.0, 135.0], [444.0, 135.0], [433.0, 138.0], [434.0, 138.0], [435.0, 138.0], [442.0, 136.0], [437.0, 137.0], [436.0, 138.0], [438.0, 137.0], [440.0, 136.0], [447.0, 135.0], [441.0, 136.0], [461.0, 106.0], [448.0, 134.0], [455.0, 117.0], [449.0, 135.0], [452.0, 134.0], [459.0, 130.0], [454.0, 129.0], [456.0, 133.0], [463.0, 129.0], [462.0, 132.0], [458.0, 130.0], [451.0, 134.0], [450.0, 134.0], [476.0, 126.0], [473.0, 126.0], [465.0, 127.0], [467.0, 128.0], [464.0, 129.0], [475.0, 127.0], [468.0, 128.0], [469.0, 127.0], [479.0, 126.0], [471.0, 125.0], [481.0, 126.0], [489.0, 124.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 489.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 6.0, "minX": 50.0, "maxY": 816.0, "series": [{"data": [[51.0, 816.0], [50.0, 558.0], [56.0, 750.0], [60.0, 6.0], [67.0, 24.0], [73.0, 351.0], [78.0, 72.5], [84.0, 12.0], [88.0, 29.0], [95.0, 110.5], [99.0, 567.5], [119.0, 20.0], [117.0, 21.0], [124.0, 143.0], [132.0, 141.0], [141.0, 73.0], [146.0, 576.5], [179.0, 16.0], [187.0, 77.0], [186.0, 145.0], [196.0, 52.5], [194.0, 107.0], [205.0, 88.0], [200.0, 110.0], [211.0, 95.0], [212.0, 99.0], [214.0, 111.0], [208.0, 132.0], [217.0, 104.0], [229.0, 106.0], [228.0, 149.0], [232.0, 133.5], [239.0, 140.0], [242.0, 71.0], [245.0, 185.0], [255.0, 61.0], [251.0, 114.0], [254.0, 133.5], [253.0, 139.0], [259.0, 184.0], [268.0, 184.0], [265.0, 190.0], [260.0, 140.0], [275.0, 157.5], [277.0, 139.0], [273.0, 133.0], [272.0, 148.0], [288.0, 25.0], [302.0, 93.0], [300.0, 121.5], [301.0, 92.0], [294.0, 182.0], [290.0, 141.0], [306.0, 64.0], [309.0, 159.0], [319.0, 144.0], [334.0, 141.0], [335.0, 166.0], [328.0, 161.5], [323.0, 162.0], [346.0, 67.0], [350.0, 129.0], [360.0, 87.0], [358.0, 160.5], [377.0, 133.0], [375.0, 147.0], [370.0, 151.0], [380.0, 137.0], [372.0, 134.0], [381.0, 144.0], [376.0, 143.0], [373.0, 140.0], [394.0, 145.0], [397.0, 148.0], [390.0, 140.0], [393.0, 137.0], [386.0, 138.0], [398.0, 143.0], [391.0, 141.0], [414.0, 140.0], [403.0, 144.0], [404.0, 142.0], [412.0, 142.0], [409.0, 142.0], [408.0, 142.0], [415.0, 141.0], [410.0, 143.0], [411.0, 143.0], [413.0, 139.0], [402.0, 138.0], [401.0, 141.0], [407.0, 141.0], [400.0, 142.0], [405.0, 143.0], [429.0, 139.0], [423.0, 138.0], [424.0, 140.0], [422.0, 142.0], [421.0, 141.0], [420.0, 141.0], [430.0, 139.0], [431.0, 139.0], [417.0, 140.0], [416.0, 140.0], [428.0, 140.0], [419.0, 141.0], [418.0, 140.0], [427.0, 141.0], [425.0, 141.0], [426.0, 140.0], [446.0, 132.0], [432.0, 139.0], [439.0, 137.0], [443.0, 136.0], [445.0, 135.0], [444.0, 135.0], [433.0, 138.0], [434.0, 138.0], [435.0, 138.0], [442.0, 136.0], [437.0, 137.0], [436.0, 138.0], [438.0, 137.0], [440.0, 136.0], [447.0, 135.0], [441.0, 136.0], [461.0, 106.0], [448.0, 134.0], [455.0, 117.0], [449.0, 135.0], [452.0, 134.0], [459.0, 130.0], [454.0, 129.0], [456.0, 133.0], [463.0, 129.0], [462.0, 132.0], [458.0, 130.0], [451.0, 134.0], [450.0, 134.0], [476.0, 126.0], [473.0, 126.0], [465.0, 127.0], [467.0, 128.0], [464.0, 129.0], [475.0, 127.0], [468.0, 128.0], [469.0, 127.0], [479.0, 126.0], [471.0, 125.0], [481.0, 126.0], [489.0, 124.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 489.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 84.71666666666667, "minX": 1.79326314E12, "maxY": 437.65, "series": [{"data": [[1.79326326E12, 434.48333333333335], [1.79326374E12, 213.16666666666666], [1.79326356E12, 425.43333333333334], [1.79326338E12, 436.6], [1.7932632E12, 374.8833333333333], [1.79326368E12, 412.6666666666667], [1.7932635E12, 396.76666666666665], [1.79326332E12, 433.95], [1.79326314E12, 84.71666666666667], [1.79326362E12, 427.76666666666665], [1.79326344E12, 437.65]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326374E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 84.26666666666667, "minX": 1.79326314E12, "maxY": 437.65, "series": [{"data": [[1.79326326E12, 434.48333333333335], [1.79326374E12, 214.16666666666666], [1.79326356E12, 425.43333333333334], [1.79326338E12, 436.6], [1.7932632E12, 374.3333333333333], [1.79326368E12, 412.6666666666667], [1.7932635E12, 396.76666666666665], [1.79326332E12, 433.95], [1.79326314E12, 84.26666666666667], [1.79326362E12, 427.76666666666665], [1.79326344E12, 437.65]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326374E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 84.26666666666667, "minX": 1.79326314E12, "maxY": 437.65, "series": [{"data": [[1.79326326E12, 434.48333333333335], [1.79326374E12, 214.16666666666666], [1.79326356E12, 425.43333333333334], [1.79326338E12, 436.6], [1.7932632E12, 374.3333333333333], [1.79326368E12, 412.6666666666667], [1.7932635E12, 396.76666666666665], [1.79326332E12, 433.95], [1.79326314E12, 84.26666666666667], [1.79326362E12, 427.76666666666665], [1.79326344E12, 437.65]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326374E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 84.26666666666667, "minX": 1.79326314E12, "maxY": 437.65, "series": [{"data": [[1.79326326E12, 434.48333333333335], [1.79326374E12, 214.16666666666666], [1.79326356E12, 425.43333333333334], [1.79326338E12, 436.6], [1.7932632E12, 374.3333333333333], [1.79326368E12, 412.6666666666667], [1.7932635E12, 396.76666666666665], [1.79326332E12, 433.95], [1.79326314E12, 84.26666666666667], [1.79326362E12, 427.76666666666665], [1.79326344E12, 437.65]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326374E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

