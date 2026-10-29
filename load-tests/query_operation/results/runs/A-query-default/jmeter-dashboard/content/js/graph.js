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
        data: {"result": {"minY": 4.0, "minX": 0.0, "maxY": 2679.0, "series": [{"data": [[0.0, 4.0], [0.1, 10.0], [0.2, 12.0], [0.3, 13.0], [0.4, 16.0], [0.5, 18.0], [0.6, 18.0], [0.7, 19.0], [0.8, 19.0], [0.9, 19.0], [1.0, 19.0], [1.1, 19.0], [1.2, 19.0], [1.3, 19.0], [1.4, 19.0], [1.5, 19.0], [1.6, 20.0], [1.7, 20.0], [1.8, 20.0], [1.9, 20.0], [2.0, 20.0], [2.1, 20.0], [2.2, 20.0], [2.3, 20.0], [2.4, 20.0], [2.5, 20.0], [2.6, 20.0], [2.7, 20.0], [2.8, 20.0], [2.9, 20.0], [3.0, 20.0], [3.1, 20.0], [3.2, 20.0], [3.3, 20.0], [3.4, 20.0], [3.5, 20.0], [3.6, 20.0], [3.7, 20.0], [3.8, 21.0], [3.9, 21.0], [4.0, 21.0], [4.1, 21.0], [4.2, 21.0], [4.3, 21.0], [4.4, 21.0], [4.5, 21.0], [4.6, 21.0], [4.7, 21.0], [4.8, 21.0], [4.9, 21.0], [5.0, 21.0], [5.1, 21.0], [5.2, 21.0], [5.3, 21.0], [5.4, 21.0], [5.5, 21.0], [5.6, 21.0], [5.7, 21.0], [5.8, 21.0], [5.9, 21.0], [6.0, 22.0], [6.1, 22.0], [6.2, 22.0], [6.3, 22.0], [6.4, 22.0], [6.5, 22.0], [6.6, 22.0], [6.7, 22.0], [6.8, 22.0], [6.9, 22.0], [7.0, 22.0], [7.1, 22.0], [7.2, 22.0], [7.3, 22.0], [7.4, 22.0], [7.5, 22.0], [7.6, 22.0], [7.7, 22.0], [7.8, 22.0], [7.9, 22.0], [8.0, 22.0], [8.1, 23.0], [8.2, 23.0], [8.3, 23.0], [8.4, 23.0], [8.5, 23.0], [8.6, 23.0], [8.7, 23.0], [8.8, 23.0], [8.9, 23.0], [9.0, 23.0], [9.1, 23.0], [9.2, 23.0], [9.3, 23.0], [9.4, 23.0], [9.5, 23.0], [9.6, 23.0], [9.7, 23.0], [9.8, 23.0], [9.9, 23.0], [10.0, 23.0], [10.1, 23.0], [10.2, 24.0], [10.3, 24.0], [10.4, 24.0], [10.5, 24.0], [10.6, 24.0], [10.7, 24.0], [10.8, 24.0], [10.9, 24.0], [11.0, 24.0], [11.1, 24.0], [11.2, 24.0], [11.3, 24.0], [11.4, 24.0], [11.5, 24.0], [11.6, 24.0], [11.7, 24.0], [11.8, 24.0], [11.9, 24.0], [12.0, 24.0], [12.1, 24.0], [12.2, 24.0], [12.3, 25.0], [12.4, 25.0], [12.5, 25.0], [12.6, 25.0], [12.7, 25.0], [12.8, 25.0], [12.9, 25.0], [13.0, 25.0], [13.1, 25.0], [13.2, 25.0], [13.3, 25.0], [13.4, 25.0], [13.5, 25.0], [13.6, 25.0], [13.7, 25.0], [13.8, 25.0], [13.9, 25.0], [14.0, 25.0], [14.1, 26.0], [14.2, 26.0], [14.3, 26.0], [14.4, 26.0], [14.5, 26.0], [14.6, 26.0], [14.7, 26.0], [14.8, 26.0], [14.9, 26.0], [15.0, 26.0], [15.1, 26.0], [15.2, 26.0], [15.3, 26.0], [15.4, 26.0], [15.5, 26.0], [15.6, 26.0], [15.7, 26.0], [15.8, 26.0], [15.9, 26.0], [16.0, 27.0], [16.1, 27.0], [16.2, 27.0], [16.3, 27.0], [16.4, 27.0], [16.5, 27.0], [16.6, 27.0], [16.7, 27.0], [16.8, 27.0], [16.9, 27.0], [17.0, 27.0], [17.1, 27.0], [17.2, 27.0], [17.3, 27.0], [17.4, 27.0], [17.5, 27.0], [17.6, 27.0], [17.7, 27.0], [17.8, 28.0], [17.9, 28.0], [18.0, 28.0], [18.1, 28.0], [18.2, 28.0], [18.3, 28.0], [18.4, 28.0], [18.5, 28.0], [18.6, 28.0], [18.7, 28.0], [18.8, 28.0], [18.9, 28.0], [19.0, 28.0], [19.1, 28.0], [19.2, 28.0], [19.3, 28.0], [19.4, 28.0], [19.5, 28.0], [19.6, 28.0], [19.7, 29.0], [19.8, 29.0], [19.9, 29.0], [20.0, 29.0], [20.1, 29.0], [20.2, 29.0], [20.3, 29.0], [20.4, 29.0], [20.5, 29.0], [20.6, 29.0], [20.7, 29.0], [20.8, 29.0], [20.9, 29.0], [21.0, 29.0], [21.1, 29.0], [21.2, 29.0], [21.3, 29.0], [21.4, 29.0], [21.5, 29.0], [21.6, 30.0], [21.7, 30.0], [21.8, 30.0], [21.9, 30.0], [22.0, 30.0], [22.1, 30.0], [22.2, 30.0], [22.3, 30.0], [22.4, 30.0], [22.5, 30.0], [22.6, 30.0], [22.7, 30.0], [22.8, 30.0], [22.9, 30.0], [23.0, 30.0], [23.1, 30.0], [23.2, 30.0], [23.3, 30.0], [23.4, 31.0], [23.5, 31.0], [23.6, 31.0], [23.7, 31.0], [23.8, 31.0], [23.9, 31.0], [24.0, 31.0], [24.1, 31.0], [24.2, 31.0], [24.3, 31.0], [24.4, 31.0], [24.5, 31.0], [24.6, 31.0], [24.7, 31.0], [24.8, 31.0], [24.9, 32.0], [25.0, 32.0], [25.1, 32.0], [25.2, 32.0], [25.3, 32.0], [25.4, 32.0], [25.5, 32.0], [25.6, 32.0], [25.7, 32.0], [25.8, 32.0], [25.9, 32.0], [26.0, 32.0], [26.1, 32.0], [26.2, 33.0], [26.3, 33.0], [26.4, 33.0], [26.5, 33.0], [26.6, 33.0], [26.7, 33.0], [26.8, 33.0], [26.9, 33.0], [27.0, 33.0], [27.1, 33.0], [27.2, 33.0], [27.3, 33.0], [27.4, 34.0], [27.5, 34.0], [27.6, 34.0], [27.7, 34.0], [27.8, 34.0], [27.9, 34.0], [28.0, 34.0], [28.1, 34.0], [28.2, 34.0], [28.3, 34.0], [28.4, 34.0], [28.5, 35.0], [28.6, 35.0], [28.7, 35.0], [28.8, 35.0], [28.9, 35.0], [29.0, 35.0], [29.1, 35.0], [29.2, 35.0], [29.3, 35.0], [29.4, 35.0], [29.5, 36.0], [29.6, 36.0], [29.7, 36.0], [29.8, 36.0], [29.9, 36.0], [30.0, 36.0], [30.1, 36.0], [30.2, 36.0], [30.3, 36.0], [30.4, 36.0], [30.5, 37.0], [30.6, 37.0], [30.7, 37.0], [30.8, 37.0], [30.9, 37.0], [31.0, 37.0], [31.1, 37.0], [31.2, 37.0], [31.3, 38.0], [31.4, 38.0], [31.5, 38.0], [31.6, 38.0], [31.7, 38.0], [31.8, 38.0], [31.9, 38.0], [32.0, 38.0], [32.1, 39.0], [32.2, 39.0], [32.3, 39.0], [32.4, 39.0], [32.5, 39.0], [32.6, 39.0], [32.7, 39.0], [32.8, 40.0], [32.9, 40.0], [33.0, 40.0], [33.1, 40.0], [33.2, 40.0], [33.3, 40.0], [33.4, 40.0], [33.5, 40.0], [33.6, 41.0], [33.7, 41.0], [33.8, 41.0], [33.9, 41.0], [34.0, 41.0], [34.1, 41.0], [34.2, 42.0], [34.3, 42.0], [34.4, 42.0], [34.5, 42.0], [34.6, 42.0], [34.7, 42.0], [34.8, 43.0], [34.9, 43.0], [35.0, 43.0], [35.1, 43.0], [35.2, 43.0], [35.3, 44.0], [35.4, 44.0], [35.5, 44.0], [35.6, 44.0], [35.7, 44.0], [35.8, 44.0], [35.9, 45.0], [36.0, 45.0], [36.1, 45.0], [36.2, 45.0], [36.3, 45.0], [36.4, 46.0], [36.5, 46.0], [36.6, 46.0], [36.7, 46.0], [36.8, 46.0], [36.9, 46.0], [37.0, 46.0], [37.1, 47.0], [37.2, 47.0], [37.3, 47.0], [37.4, 47.0], [37.5, 47.0], [37.6, 47.0], [37.7, 48.0], [37.8, 48.0], [37.9, 48.0], [38.0, 48.0], [38.1, 48.0], [38.2, 48.0], [38.3, 49.0], [38.4, 49.0], [38.5, 49.0], [38.6, 49.0], [38.7, 49.0], [38.8, 49.0], [38.9, 49.0], [39.0, 50.0], [39.1, 50.0], [39.2, 50.0], [39.3, 50.0], [39.4, 50.0], [39.5, 50.0], [39.6, 51.0], [39.7, 51.0], [39.8, 51.0], [39.9, 51.0], [40.0, 51.0], [40.1, 51.0], [40.2, 52.0], [40.3, 52.0], [40.4, 52.0], [40.5, 52.0], [40.6, 52.0], [40.7, 53.0], [40.8, 53.0], [40.9, 53.0], [41.0, 53.0], [41.1, 53.0], [41.2, 54.0], [41.3, 54.0], [41.4, 54.0], [41.5, 54.0], [41.6, 54.0], [41.7, 54.0], [41.8, 55.0], [41.9, 55.0], [42.0, 55.0], [42.1, 55.0], [42.2, 55.0], [42.3, 55.0], [42.4, 55.0], [42.5, 55.0], [42.6, 56.0], [42.7, 56.0], [42.8, 56.0], [42.9, 56.0], [43.0, 56.0], [43.1, 56.0], [43.2, 56.0], [43.3, 56.0], [43.4, 56.0], [43.5, 56.0], [43.6, 56.0], [43.7, 57.0], [43.8, 57.0], [43.9, 57.0], [44.0, 57.0], [44.1, 57.0], [44.2, 57.0], [44.3, 57.0], [44.4, 57.0], [44.5, 57.0], [44.6, 57.0], [44.7, 57.0], [44.8, 57.0], [44.9, 57.0], [45.0, 58.0], [45.1, 58.0], [45.2, 58.0], [45.3, 58.0], [45.4, 58.0], [45.5, 58.0], [45.6, 58.0], [45.7, 58.0], [45.8, 58.0], [45.9, 58.0], [46.0, 58.0], [46.1, 58.0], [46.2, 59.0], [46.3, 59.0], [46.4, 59.0], [46.5, 59.0], [46.6, 59.0], [46.7, 59.0], [46.8, 59.0], [46.9, 59.0], [47.0, 60.0], [47.1, 60.0], [47.2, 60.0], [47.3, 60.0], [47.4, 60.0], [47.5, 60.0], [47.6, 61.0], [47.7, 61.0], [47.8, 61.0], [47.9, 61.0], [48.0, 61.0], [48.1, 61.0], [48.2, 62.0], [48.3, 62.0], [48.4, 62.0], [48.5, 62.0], [48.6, 62.0], [48.7, 63.0], [48.8, 63.0], [48.9, 63.0], [49.0, 63.0], [49.1, 63.0], [49.2, 63.0], [49.3, 64.0], [49.4, 64.0], [49.5, 64.0], [49.6, 64.0], [49.7, 64.0], [49.8, 64.0], [49.9, 65.0], [50.0, 65.0], [50.1, 65.0], [50.2, 65.0], [50.3, 65.0], [50.4, 66.0], [50.5, 66.0], [50.6, 66.0], [50.7, 66.0], [50.8, 67.0], [50.9, 67.0], [51.0, 67.0], [51.1, 67.0], [51.2, 68.0], [51.3, 68.0], [51.4, 68.0], [51.5, 69.0], [51.6, 69.0], [51.7, 69.0], [51.8, 70.0], [51.9, 70.0], [52.0, 71.0], [52.1, 71.0], [52.2, 71.0], [52.3, 72.0], [52.4, 72.0], [52.5, 72.0], [52.6, 73.0], [52.7, 73.0], [52.8, 73.0], [52.9, 74.0], [53.0, 74.0], [53.1, 75.0], [53.2, 75.0], [53.3, 75.0], [53.4, 76.0], [53.5, 76.0], [53.6, 76.0], [53.7, 77.0], [53.8, 77.0], [53.9, 77.0], [54.0, 78.0], [54.1, 78.0], [54.2, 78.0], [54.3, 79.0], [54.4, 79.0], [54.5, 79.0], [54.6, 80.0], [54.7, 80.0], [54.8, 80.0], [54.9, 80.0], [55.0, 81.0], [55.1, 81.0], [55.2, 81.0], [55.3, 81.0], [55.4, 82.0], [55.5, 82.0], [55.6, 82.0], [55.7, 82.0], [55.8, 83.0], [55.9, 83.0], [56.0, 83.0], [56.1, 83.0], [56.2, 83.0], [56.3, 83.0], [56.4, 83.0], [56.5, 84.0], [56.6, 84.0], [56.7, 84.0], [56.8, 84.0], [56.9, 84.0], [57.0, 84.0], [57.1, 84.0], [57.2, 84.0], [57.3, 84.0], [57.4, 84.0], [57.5, 84.0], [57.6, 85.0], [57.7, 85.0], [57.8, 85.0], [57.9, 85.0], [58.0, 85.0], [58.1, 85.0], [58.2, 85.0], [58.3, 85.0], [58.4, 85.0], [58.5, 85.0], [58.6, 85.0], [58.7, 85.0], [58.8, 85.0], [58.9, 85.0], [59.0, 85.0], [59.1, 85.0], [59.2, 85.0], [59.3, 85.0], [59.4, 86.0], [59.5, 86.0], [59.6, 86.0], [59.7, 86.0], [59.8, 86.0], [59.9, 86.0], [60.0, 86.0], [60.1, 86.0], [60.2, 86.0], [60.3, 86.0], [60.4, 86.0], [60.5, 86.0], [60.6, 86.0], [60.7, 86.0], [60.8, 86.0], [60.9, 86.0], [61.0, 86.0], [61.1, 86.0], [61.2, 86.0], [61.3, 86.0], [61.4, 86.0], [61.5, 86.0], [61.6, 86.0], [61.7, 86.0], [61.8, 86.0], [61.9, 86.0], [62.0, 87.0], [62.1, 87.0], [62.2, 87.0], [62.3, 87.0], [62.4, 87.0], [62.5, 87.0], [62.6, 87.0], [62.7, 87.0], [62.8, 87.0], [62.9, 87.0], [63.0, 87.0], [63.1, 87.0], [63.2, 87.0], [63.3, 87.0], [63.4, 87.0], [63.5, 87.0], [63.6, 87.0], [63.7, 87.0], [63.8, 87.0], [63.9, 87.0], [64.0, 87.0], [64.1, 87.0], [64.2, 87.0], [64.3, 87.0], [64.4, 87.0], [64.5, 87.0], [64.6, 87.0], [64.7, 87.0], [64.8, 87.0], [64.9, 87.0], [65.0, 87.0], [65.1, 87.0], [65.2, 87.0], [65.3, 88.0], [65.4, 88.0], [65.5, 88.0], [65.6, 88.0], [65.7, 88.0], [65.8, 88.0], [65.9, 88.0], [66.0, 88.0], [66.1, 88.0], [66.2, 88.0], [66.3, 88.0], [66.4, 88.0], [66.5, 88.0], [66.6, 88.0], [66.7, 88.0], [66.8, 88.0], [66.9, 88.0], [67.0, 88.0], [67.1, 88.0], [67.2, 88.0], [67.3, 88.0], [67.4, 88.0], [67.5, 88.0], [67.6, 88.0], [67.7, 88.0], [67.8, 88.0], [67.9, 88.0], [68.0, 88.0], [68.1, 88.0], [68.2, 88.0], [68.3, 88.0], [68.4, 88.0], [68.5, 88.0], [68.6, 88.0], [68.7, 88.0], [68.8, 89.0], [68.9, 89.0], [69.0, 89.0], [69.1, 89.0], [69.2, 89.0], [69.3, 89.0], [69.4, 89.0], [69.5, 89.0], [69.6, 89.0], [69.7, 89.0], [69.8, 89.0], [69.9, 89.0], [70.0, 89.0], [70.1, 89.0], [70.2, 89.0], [70.3, 89.0], [70.4, 89.0], [70.5, 89.0], [70.6, 89.0], [70.7, 89.0], [70.8, 89.0], [70.9, 89.0], [71.0, 89.0], [71.1, 89.0], [71.2, 89.0], [71.3, 89.0], [71.4, 89.0], [71.5, 89.0], [71.6, 89.0], [71.7, 89.0], [71.8, 89.0], [71.9, 89.0], [72.0, 89.0], [72.1, 90.0], [72.2, 90.0], [72.3, 90.0], [72.4, 90.0], [72.5, 90.0], [72.6, 90.0], [72.7, 90.0], [72.8, 90.0], [72.9, 90.0], [73.0, 90.0], [73.1, 90.0], [73.2, 90.0], [73.3, 90.0], [73.4, 90.0], [73.5, 90.0], [73.6, 90.0], [73.7, 90.0], [73.8, 90.0], [73.9, 90.0], [74.0, 90.0], [74.1, 90.0], [74.2, 90.0], [74.3, 90.0], [74.4, 90.0], [74.5, 90.0], [74.6, 90.0], [74.7, 90.0], [74.8, 90.0], [74.9, 90.0], [75.0, 91.0], [75.1, 91.0], [75.2, 91.0], [75.3, 91.0], [75.4, 91.0], [75.5, 91.0], [75.6, 91.0], [75.7, 91.0], [75.8, 91.0], [75.9, 91.0], [76.0, 91.0], [76.1, 91.0], [76.2, 91.0], [76.3, 91.0], [76.4, 91.0], [76.5, 91.0], [76.6, 91.0], [76.7, 91.0], [76.8, 91.0], [76.9, 91.0], [77.0, 91.0], [77.1, 91.0], [77.2, 91.0], [77.3, 91.0], [77.4, 91.0], [77.5, 91.0], [77.6, 91.0], [77.7, 92.0], [77.8, 92.0], [77.9, 92.0], [78.0, 92.0], [78.1, 92.0], [78.2, 92.0], [78.3, 92.0], [78.4, 92.0], [78.5, 92.0], [78.6, 92.0], [78.7, 92.0], [78.8, 92.0], [78.9, 92.0], [79.0, 92.0], [79.1, 92.0], [79.2, 92.0], [79.3, 92.0], [79.4, 92.0], [79.5, 92.0], [79.6, 92.0], [79.7, 92.0], [79.8, 92.0], [79.9, 92.0], [80.0, 92.0], [80.1, 92.0], [80.2, 92.0], [80.3, 92.0], [80.4, 93.0], [80.5, 93.0], [80.6, 93.0], [80.7, 93.0], [80.8, 93.0], [80.9, 93.0], [81.0, 93.0], [81.1, 93.0], [81.2, 93.0], [81.3, 93.0], [81.4, 93.0], [81.5, 93.0], [81.6, 93.0], [81.7, 93.0], [81.8, 93.0], [81.9, 93.0], [82.0, 93.0], [82.1, 93.0], [82.2, 93.0], [82.3, 93.0], [82.4, 93.0], [82.5, 93.0], [82.6, 93.0], [82.7, 93.0], [82.8, 93.0], [82.9, 93.0], [83.0, 93.0], [83.1, 93.0], [83.2, 94.0], [83.3, 94.0], [83.4, 94.0], [83.5, 94.0], [83.6, 94.0], [83.7, 94.0], [83.8, 94.0], [83.9, 94.0], [84.0, 94.0], [84.1, 94.0], [84.2, 94.0], [84.3, 94.0], [84.4, 94.0], [84.5, 94.0], [84.6, 94.0], [84.7, 94.0], [84.8, 94.0], [84.9, 94.0], [85.0, 94.0], [85.1, 94.0], [85.2, 94.0], [85.3, 94.0], [85.4, 94.0], [85.5, 94.0], [85.6, 94.0], [85.7, 94.0], [85.8, 94.0], [85.9, 94.0], [86.0, 95.0], [86.1, 95.0], [86.2, 95.0], [86.3, 95.0], [86.4, 95.0], [86.5, 95.0], [86.6, 95.0], [86.7, 95.0], [86.8, 95.0], [86.9, 95.0], [87.0, 95.0], [87.1, 95.0], [87.2, 95.0], [87.3, 95.0], [87.4, 95.0], [87.5, 95.0], [87.6, 95.0], [87.7, 95.0], [87.8, 95.0], [87.9, 95.0], [88.0, 95.0], [88.1, 95.0], [88.2, 95.0], [88.3, 95.0], [88.4, 95.0], [88.5, 96.0], [88.6, 96.0], [88.7, 96.0], [88.8, 96.0], [88.9, 96.0], [89.0, 96.0], [89.1, 96.0], [89.2, 96.0], [89.3, 96.0], [89.4, 96.0], [89.5, 96.0], [89.6, 96.0], [89.7, 96.0], [89.8, 96.0], [89.9, 96.0], [90.0, 96.0], [90.1, 96.0], [90.2, 96.0], [90.3, 96.0], [90.4, 97.0], [90.5, 97.0], [90.6, 97.0], [90.7, 97.0], [90.8, 97.0], [90.9, 97.0], [91.0, 97.0], [91.1, 97.0], [91.2, 97.0], [91.3, 97.0], [91.4, 97.0], [91.5, 97.0], [91.6, 97.0], [91.7, 97.0], [91.8, 97.0], [91.9, 98.0], [92.0, 98.0], [92.1, 98.0], [92.2, 98.0], [92.3, 98.0], [92.4, 98.0], [92.5, 98.0], [92.6, 98.0], [92.7, 98.0], [92.8, 98.0], [92.9, 99.0], [93.0, 99.0], [93.1, 99.0], [93.2, 99.0], [93.3, 99.0], [93.4, 99.0], [93.5, 99.0], [93.6, 100.0], [93.7, 100.0], [93.8, 100.0], [93.9, 100.0], [94.0, 100.0], [94.1, 100.0], [94.2, 101.0], [94.3, 101.0], [94.4, 101.0], [94.5, 101.0], [94.6, 102.0], [94.7, 102.0], [94.8, 102.0], [94.9, 102.0], [95.0, 103.0], [95.1, 103.0], [95.2, 103.0], [95.3, 104.0], [95.4, 104.0], [95.5, 105.0], [95.6, 105.0], [95.7, 105.0], [95.8, 106.0], [95.9, 106.0], [96.0, 107.0], [96.1, 107.0], [96.2, 108.0], [96.3, 109.0], [96.4, 109.0], [96.5, 110.0], [96.6, 111.0], [96.7, 112.0], [96.8, 113.0], [96.9, 115.0], [97.0, 116.0], [97.1, 118.0], [97.2, 120.0], [97.3, 122.0], [97.4, 126.0], [97.5, 130.0], [97.6, 134.0], [97.7, 140.0], [97.8, 151.0], [97.9, 166.0], [98.0, 173.0], [98.1, 180.0], [98.2, 184.0], [98.3, 188.0], [98.4, 190.0], [98.5, 193.0], [98.6, 195.0], [98.7, 196.0], [98.8, 198.0], [98.9, 199.0], [99.0, 201.0], [99.1, 202.0], [99.2, 204.0], [99.3, 206.0], [99.4, 207.0], [99.5, 209.0], [99.6, 212.0], [99.7, 217.0], [99.8, 261.0], [99.9, 271.0], [100.0, 2679.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 485195.0, "series": [{"data": [[0.0, 485195.0], [2100.0, 30.0], [2200.0, 1.0], [600.0, 18.0], [2500.0, 1.0], [2600.0, 13.0], [700.0, 14.0], [800.0, 3.0], [200.0, 5524.0], [900.0, 3.0], [1400.0, 30.0], [100.0, 27718.0], [400.0, 1.0], [500.0, 28.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2600.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 45.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 518438.0, "series": [{"data": [[0.0, 518438.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 96.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 45.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 8.777834787070296, "minX": 1.79326122E12, "maxY": 60.0, "series": [{"data": [[1.79326128E12, 44.580709979906146], [1.79326176E12, 60.0], [1.79326146E12, 60.0], [1.79326164E12, 60.0], [1.79326134E12, 60.0], [1.79326182E12, 59.957503258238724], [1.79326152E12, 60.0], [1.79326122E12, 8.777834787070296], [1.7932617E12, 60.0], [1.7932614E12, 60.0], [1.79326158E12, 60.0]], "isOverall": false, "label": "Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326182E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 8.108910891089112, "minX": 1.0, "maxY": 264.7400000000002, "series": [{"data": [[2.0, 29.873015873015863], [3.0, 38.58108108108108], [4.0, 46.28235294117647], [5.0, 39.60655737704921], [6.0, 43.66666666666667], [7.0, 31.74193548387098], [8.0, 63.20967741935483], [9.0, 72.50399999999999], [10.0, 82.1293103448276], [11.0, 63.57222222222224], [12.0, 53.7464114832536], [13.0, 91.58156028368798], [14.0, 106.08955223880598], [15.0, 115.19047619047622], [16.0, 119.01481481481478], [17.0, 118.00689655172415], [18.0, 102.22346368715084], [19.0, 81.91025641025644], [20.0, 65.39999999999998], [21.0, 56.27445652173912], [22.0, 100.8301886792453], [23.0, 129.74860335195527], [24.0, 115.99509803921572], [25.0, 92.91666666666669], [26.0, 64.73067331670832], [27.0, 113.44166666666673], [28.0, 61.855555555555554], [29.0, 42.2089552238806], [30.0, 29.423153692614754], [31.0, 264.7400000000002], [32.0, 108.17894736842105], [33.0, 102.58035714285717], [34.0, 64.92884615384612], [35.0, 141.16101694915258], [36.0, 104.1184971098266], [37.0, 163.07488986784142], [38.0, 149.65200000000004], [39.0, 151.70428015564195], [40.0, 89.47216035634744], [41.0, 177.41125541125538], [42.0, 179.0300429184549], [43.0, 127.64497041420115], [44.0, 150.57638888888886], [45.0, 191.17299578059078], [46.0, 192.71666666666673], [47.0, 114.76513317191281], [48.0, 160.83505154639172], [49.0, 187.47328244274803], [50.0, 134.60000000000008], [51.0, 189.06666666666672], [52.0, 197.67669172932327], [53.0, 188.2438162544169], [54.0, 191.3380782918149], [55.0, 209.15209125475286], [56.0, 132.74434389140268], [57.0, 138.55357142857156], [58.0, 188.97999999999996], [59.0, 206.62376237623778], [60.0, 64.31632416034613], [1.0, 8.108910891089112]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[59.27125857391109, 65.87752300035079]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 60.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 4287.8, "minX": 1.79326122E12, "maxY": 236676.9, "series": [{"data": [[1.79326128E12, 69562.06666666667], [1.79326176E12, 213962.23333333334], [1.79326146E12, 236676.9], [1.79326164E12, 214178.06666666668], [1.79326134E12, 195916.46666666667], [1.79326182E12, 166893.93333333332], [1.79326152E12, 231199.9], [1.79326122E12, 7564.716666666666], [1.7932617E12, 231048.45], [1.7932614E12, 225486.08333333334], [1.79326158E12, 221060.86666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.79326128E12, 39415.2], [1.79326176E12, 121206.8], [1.79326146E12, 134142.8], [1.79326164E12, 121413.6], [1.79326134E12, 110985.6], [1.79326182E12, 94529.6], [1.79326152E12, 130983.6], [1.79326122E12, 4287.8], [1.7932617E12, 130911.0], [1.7932614E12, 127773.8], [1.79326158E12, 125224.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326182E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 58.96550988946109, "minX": 1.79326122E12, "maxY": 145.46868720696565, "series": [{"data": [[1.79326128E12, 145.46868720696565], [1.79326176E12, 65.2183177841504], [1.79326146E12, 58.96550988946109], [1.79326164E12, 65.09387910415293], [1.79326134E12, 71.2442911512847], [1.79326182E12, 62.616202755538815], [1.79326152E12, 60.330377238066745], [1.79326122E12, 60.95741405849158], [1.7932617E12, 60.406033106461216], [1.7932614E12, 61.84292084918826], [1.79326158E12, 63.14061841180587]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326182E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 58.96060616000295, "minX": 1.79326122E12, "maxY": 145.4571332886807, "series": [{"data": [[1.79326128E12, 145.4571332886807], [1.79326176E12, 65.21176534650014], [1.79326146E12, 58.96060616000295], [1.79326164E12, 65.0876096252809], [1.79326134E12, 71.23675864256215], [1.79326182E12, 62.60975609756097], [1.79326152E12, 60.325120091370145], [1.79326122E12, 60.92252437147252], [1.7932617E12, 60.400789849592776], [1.7932614E12, 61.83701510012207], [1.79326158E12, 63.13452213633156]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326182E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 8.57070834383667E-4, "minX": 1.79326122E12, "maxY": 0.024628014366341794, "series": [{"data": [[1.79326128E12, 0.0031815137307434657], [1.79326176E12, 0.0010345954187388831], [1.79326146E12, 0.0010988290090858382], [1.79326164E12, 0.0010871928680147842], [1.79326134E12, 0.001387567396130673], [1.79326182E12, 8.611059393036751E-4], [1.79326152E12, 9.741677584063992E-4], [1.79326122E12, 0.024628014366341794], [1.7932617E12, 8.57070834383667E-4], [1.7932614E12, 9.814218564369159E-4], [1.79326158E12, 0.0012122276879831314]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326182E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 4.0, "minX": 1.79326122E12, "maxY": 2679.0, "series": [{"data": [[1.79326128E12, 2679.0], [1.79326176E12, 195.0], [1.79326146E12, 182.0], [1.79326164E12, 192.0], [1.79326134E12, 2179.0], [1.79326182E12, 184.0], [1.79326152E12, 183.0], [1.79326122E12, 936.0], [1.7932617E12, 729.0], [1.7932614E12, 184.0], [1.79326158E12, 180.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.79326128E12, 212.0], [1.79326176E12, 95.0], [1.79326146E12, 92.0], [1.79326164E12, 95.0], [1.79326134E12, 97.0], [1.79326182E12, 95.0], [1.79326152E12, 95.0], [1.79326122E12, 105.0], [1.7932617E12, 94.0], [1.7932614E12, 95.0], [1.79326158E12, 95.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.79326128E12, 275.0], [1.79326176E12, 107.0], [1.79326146E12, 104.0], [1.79326164E12, 117.0], [1.79326134E12, 117.0], [1.79326182E12, 106.0], [1.79326152E12, 115.0], [1.79326122E12, 192.0], [1.7932617E12, 121.0], [1.7932614E12, 108.0], [1.79326158E12, 106.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.79326128E12, 256.0], [1.79326176E12, 97.0], [1.79326146E12, 96.0], [1.79326164E12, 97.0], [1.79326134E12, 101.0], [1.79326182E12, 96.0], [1.79326152E12, 98.0], [1.79326122E12, 119.0], [1.7932617E12, 97.0], [1.7932614E12, 98.0], [1.79326158E12, 97.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.79326128E12, 7.0], [1.79326176E12, 9.0], [1.79326146E12, 18.0], [1.79326164E12, 9.0], [1.79326134E12, 6.0], [1.79326182E12, 5.0], [1.79326152E12, 13.0], [1.79326122E12, 4.0], [1.7932617E12, 9.0], [1.7932614E12, 18.0], [1.79326158E12, 18.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.79326128E12, 142.0], [1.79326176E12, 66.5], [1.79326146E12, 34.0], [1.79326164E12, 67.0], [1.79326134E12, 65.0], [1.79326182E12, 63.0], [1.79326152E12, 74.0], [1.79326122E12, 61.0], [1.7932617E12, 59.0], [1.7932614E12, 61.0], [1.79326158E12, 66.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326182E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 6.0, "minX": 62.0, "maxY": 212.0, "series": [{"data": [[62.0, 15.0], [77.0, 20.0], [83.0, 29.0], [106.0, 6.0], [105.0, 95.0], [118.0, 106.0], [123.0, 78.0], [124.0, 29.0], [134.0, 84.5], [135.0, 108.0], [136.0, 77.0], [138.0, 96.0], [158.0, 105.0], [169.0, 100.0], [189.0, 75.0], [187.0, 112.0], [197.0, 111.0], [201.0, 20.0], [213.0, 119.0], [217.0, 24.0], [236.0, 182.0], [234.0, 188.0], [235.0, 190.0], [232.0, 195.0], [246.0, 83.5], [243.0, 195.0], [253.0, 198.0], [256.0, 107.5], [268.0, 116.0], [265.0, 197.0], [257.0, 196.0], [260.0, 198.5], [258.0, 206.0], [267.0, 212.0], [271.0, 207.0], [283.0, 185.0], [279.0, 196.0], [287.0, 199.0], [286.0, 207.0], [274.0, 209.0], [272.0, 212.0], [273.0, 208.0], [299.0, 82.0], [289.0, 195.0], [294.0, 204.0], [297.0, 201.0], [313.0, 74.0], [307.0, 205.0], [309.0, 196.0], [318.0, 191.0], [320.0, 197.0], [343.0, 68.0], [338.0, 84.0], [350.0, 25.0], [344.0, 87.0], [345.0, 187.0], [349.0, 199.0], [358.0, 85.0], [360.0, 196.5], [356.0, 204.0], [377.0, 77.0], [382.0, 162.0], [395.0, 103.0], [396.0, 137.5], [411.0, 96.0], [420.0, 121.0], [444.0, 88.0], [461.0, 116.0], [452.0, 67.0], [486.0, 21.0], [483.0, 98.0], [521.0, 78.0], [557.0, 94.0], [561.0, 93.0], [595.0, 91.0], [622.0, 73.0], [636.0, 94.0], [671.0, 91.0], [646.0, 86.0], [642.0, 91.0], [666.0, 91.0], [662.0, 92.0], [653.0, 94.0], [649.0, 92.0], [641.0, 88.0], [667.0, 92.0], [663.0, 91.0], [660.0, 93.0], [659.0, 93.0], [669.0, 92.0], [668.0, 90.0], [697.0, 89.0], [674.0, 90.0], [679.0, 89.0], [696.0, 89.0], [677.0, 90.0], [676.0, 90.0], [681.0, 89.0], [682.0, 90.0], [680.0, 89.0], [688.0, 90.0], [686.0, 89.5], [684.0, 89.0], [672.0, 89.0], [673.0, 89.0], [687.0, 89.0], [683.0, 89.0], [693.0, 89.0], [695.0, 89.0], [694.0, 89.0], [702.0, 89.0], [700.0, 89.0], [701.0, 89.0], [699.0, 89.0], [698.0, 89.0], [689.0, 90.0], [692.0, 90.0], [691.0, 89.0], [690.0, 89.0], [717.0, 88.0], [713.0, 89.0], [712.0, 88.0], [716.0, 88.0], [715.0, 89.0], [714.0, 89.0], [706.0, 88.0], [734.0, 87.0], [723.0, 90.0], [720.0, 88.0], [728.0, 88.0], [709.0, 89.0], [707.0, 88.0], [708.0, 88.0], [710.0, 89.0], [719.0, 87.0], [704.0, 88.0], [760.0, 86.0], [755.0, 89.0], [757.0, 86.0], [741.0, 88.0], [756.0, 89.0], [763.0, 87.0], [762.0, 87.0], [750.0, 89.0], [736.0, 87.0], [751.0, 88.0], [745.0, 89.0], [746.0, 88.0], [743.0, 88.0], [738.0, 86.0], [739.0, 88.0], [773.0, 90.0], [786.0, 90.0], [785.0, 85.0], [788.0, 86.0], [790.0, 89.0], [791.0, 87.0], [780.0, 86.0], [777.0, 87.0], [784.0, 85.0], [781.0, 87.0], [772.0, 86.0], [783.0, 88.0], [771.0, 88.0], [794.0, 87.0], [774.0, 87.0], [795.0, 88.0], [799.0, 86.0], [798.0, 87.0], [828.0, 75.0], [820.0, 84.0], [821.0, 86.0], [831.0, 79.0], [817.0, 88.0], [819.0, 85.0], [802.0, 89.5], [826.0, 88.0], [827.0, 88.0], [800.0, 86.0], [811.0, 79.0], [804.0, 87.0], [806.0, 89.0], [807.0, 85.0], [801.0, 88.0], [847.0, 88.0], [851.0, 67.0], [840.0, 78.0], [854.0, 80.0], [855.0, 88.0], [842.0, 85.0], [845.0, 84.0], [835.0, 87.0], [844.0, 82.0], [858.0, 86.0], [848.0, 86.0], [879.0, 75.0], [872.0, 85.0], [881.0, 87.0], [894.0, 73.5], [876.0, 78.0], [874.0, 85.0], [882.0, 77.0], [864.0, 87.0], [868.0, 83.0], [875.0, 87.0], [927.0, 80.0], [916.0, 62.0], [920.0, 63.0], [926.0, 79.0], [909.0, 71.0], [898.0, 86.0], [923.0, 84.0], [922.0, 74.0], [918.0, 85.0], [912.0, 69.5], [931.0, 63.0], [942.0, 60.0], [941.0, 81.0], [940.0, 63.0], [928.0, 65.0], [930.0, 82.0], [937.0, 64.0], [944.0, 71.0], [949.0, 68.0], [938.0, 63.0], [951.0, 64.0], [954.0, 64.0], [953.0, 59.0], [987.0, 60.0], [973.0, 56.0], [977.0, 66.0], [968.0, 60.0], [976.0, 59.0], [961.0, 62.0], [963.0, 68.0], [986.0, 58.0], [975.0, 61.0], [972.0, 73.5], [979.0, 61.0], [991.0, 62.0], [998.0, 61.0], [1014.0, 59.0], [1011.0, 58.0], [1009.0, 58.0], [999.0, 55.0], [1004.0, 57.0], [1000.0, 58.0], [996.0, 57.0], [997.0, 58.0], [1006.0, 58.0], [1007.0, 59.0], [992.0, 56.0], [1016.0, 57.0], [1021.0, 55.0], [1074.0, 52.0], [1028.0, 46.0], [1031.0, 55.0], [1032.0, 56.0], [1037.0, 57.0], [1050.0, 55.0], [1051.0, 55.0], [1040.0, 51.5], [1042.0, 54.0], [1044.0, 57.0], [1048.0, 54.0], [1046.0, 58.0], [1039.0, 56.5], [1026.0, 48.0], [1025.0, 55.0], [1024.0, 56.0], [1058.0, 53.0], [1085.0, 49.0], [1083.0, 43.0], [1087.0, 47.0], [1057.0, 53.0], [1082.0, 50.0], [1076.0, 49.0], [1081.0, 49.0], [1075.0, 49.0], [1073.0, 51.0], [1067.0, 50.0], [1060.0, 45.0], [1061.0, 52.0], [1064.0, 53.0], [1065.0, 54.0], [1059.0, 54.0], [1068.0, 49.0], [1071.0, 51.0], [1053.0, 53.0], [1144.0, 48.0], [1131.0, 44.0], [1138.0, 48.0], [1102.0, 46.5], [1136.0, 37.0], [1140.0, 39.0], [1141.0, 53.0], [1132.0, 47.0], [1133.0, 46.0], [1094.0, 48.0], [1099.0, 50.0], [1115.0, 47.0], [1113.0, 47.0], [1111.0, 51.0], [1108.0, 48.0], [1105.0, 47.0], [1118.0, 42.0], [1088.0, 51.0], [1090.0, 50.0], [1092.0, 47.0], [1091.0, 50.0], [1098.0, 50.0], [1130.0, 51.0], [1125.0, 50.0], [1122.0, 51.0], [1150.0, 39.0], [1148.0, 47.0], [1127.0, 45.0], [1129.0, 46.0], [1205.0, 47.0], [1196.0, 41.0], [1195.0, 37.0], [1198.0, 43.0], [1164.0, 36.0], [1200.0, 41.0], [1185.0, 45.0], [1163.0, 39.0], [1170.0, 41.0], [1175.0, 42.0], [1173.0, 42.0], [1162.0, 40.0], [1157.0, 44.0], [1155.0, 47.0], [1152.0, 44.0], [1180.0, 40.0], [1181.0, 38.0], [1207.0, 44.0], [1206.0, 36.0], [1208.0, 41.0], [1214.0, 48.0], [1212.0, 43.0], [1176.0, 36.0], [1269.0, 38.0], [1227.0, 39.0], [1232.0, 39.0], [1235.0, 41.0], [1237.0, 35.0], [1250.0, 46.0], [1278.0, 36.0], [1249.0, 38.0], [1277.0, 40.0], [1271.0, 44.0], [1273.0, 33.0], [1226.0, 32.0], [1217.0, 44.0], [1258.0, 36.0], [1259.0, 35.0], [1262.0, 33.0], [1256.0, 41.0], [1241.0, 38.0], [1265.0, 43.0], [1342.0, 34.0], [1319.0, 33.0], [1294.0, 37.0], [1338.0, 32.5], [1333.0, 40.0], [1320.0, 38.0], [1299.0, 33.0], [1292.0, 38.0], [1315.0, 34.0], [1322.0, 37.0], [1290.0, 36.0], [1282.0, 36.0], [1406.0, 33.0], [1350.0, 30.0], [1381.0, 34.0], [1377.0, 31.0], [1344.0, 36.0], [1408.0, 34.0], [1449.0, 29.0], [1440.0, 29.0], [1461.0, 36.0], [1503.0, 35.0], [1476.0, 34.0], [1520.0, 30.0], [1527.0, 33.0], [1499.0, 32.0], [1502.0, 31.0], [1549.0, 31.0], [1544.0, 31.0], [1546.0, 29.0], [1626.0, 32.0], [1659.0, 32.0], [1630.0, 31.0], [1616.0, 30.0], [1685.0, 31.0], [1766.0, 31.0], [1743.0, 26.0], [1739.0, 32.0], [1747.0, 30.0], [1779.0, 30.0], [1738.0, 29.0], [1851.0, 29.0], [1832.0, 30.0], [1899.0, 29.0], [1890.0, 30.0], [1898.0, 30.0], [1914.0, 31.0], [1868.0, 31.0], [1866.0, 29.0], [1858.0, 15.0], [1856.0, 29.0], [1961.0, 30.0], [1935.0, 30.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1961.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 6.0, "minX": 62.0, "maxY": 212.0, "series": [{"data": [[62.0, 15.0], [77.0, 20.0], [83.0, 29.0], [106.0, 6.0], [105.0, 95.0], [118.0, 106.0], [123.0, 78.0], [124.0, 29.0], [134.0, 84.5], [135.0, 108.0], [136.0, 77.0], [138.0, 96.0], [158.0, 105.0], [169.0, 100.0], [189.0, 75.0], [187.0, 112.0], [197.0, 111.0], [201.0, 20.0], [213.0, 119.0], [217.0, 24.0], [236.0, 182.0], [234.0, 188.0], [235.0, 190.0], [232.0, 195.0], [246.0, 83.0], [243.0, 195.0], [253.0, 198.0], [256.0, 107.5], [268.0, 116.0], [265.0, 197.0], [257.0, 196.0], [260.0, 198.5], [258.0, 206.0], [267.0, 212.0], [271.0, 207.0], [283.0, 185.0], [279.0, 196.0], [287.0, 199.0], [286.0, 207.0], [274.0, 209.0], [272.0, 212.0], [273.0, 208.0], [299.0, 82.0], [289.0, 195.0], [294.0, 204.0], [297.0, 201.0], [313.0, 74.0], [307.0, 205.0], [309.0, 196.0], [318.0, 191.0], [320.0, 197.0], [343.0, 68.0], [338.0, 84.0], [350.0, 25.0], [344.0, 87.0], [345.0, 187.0], [349.0, 199.0], [358.0, 85.0], [360.0, 196.5], [356.0, 204.0], [377.0, 77.0], [382.0, 162.0], [395.0, 103.0], [396.0, 137.5], [411.0, 96.0], [420.0, 121.0], [444.0, 88.0], [461.0, 116.0], [452.0, 67.0], [486.0, 21.0], [483.0, 98.0], [521.0, 78.0], [557.0, 94.0], [561.0, 93.0], [595.0, 91.0], [622.0, 73.0], [636.0, 94.0], [671.0, 91.0], [646.0, 86.0], [642.0, 91.0], [666.0, 91.0], [662.0, 92.0], [653.0, 94.0], [649.0, 92.0], [641.0, 88.0], [667.0, 92.0], [663.0, 91.0], [660.0, 93.0], [659.0, 93.0], [669.0, 91.5], [668.0, 90.0], [697.0, 89.0], [674.0, 90.0], [679.0, 89.0], [696.0, 89.0], [677.0, 90.0], [676.0, 90.0], [681.0, 89.0], [682.0, 90.0], [680.0, 89.0], [688.0, 90.0], [686.0, 89.5], [684.0, 89.0], [672.0, 89.0], [673.0, 89.0], [687.0, 89.0], [683.0, 89.0], [693.0, 89.0], [695.0, 89.0], [694.0, 89.0], [702.0, 89.0], [700.0, 89.0], [701.0, 89.0], [699.0, 89.0], [698.0, 89.0], [689.0, 90.0], [692.0, 90.0], [691.0, 89.0], [690.0, 89.0], [717.0, 88.0], [713.0, 89.0], [712.0, 88.0], [716.0, 88.0], [715.0, 89.0], [714.0, 89.0], [706.0, 88.0], [734.0, 87.0], [723.0, 90.0], [720.0, 88.0], [728.0, 88.0], [709.0, 89.0], [707.0, 88.0], [708.0, 88.0], [710.0, 89.0], [719.0, 87.0], [704.0, 88.0], [760.0, 86.0], [755.0, 89.0], [757.0, 86.0], [741.0, 88.0], [756.0, 89.0], [763.0, 87.0], [762.0, 87.0], [750.0, 89.0], [736.0, 87.0], [751.0, 88.0], [745.0, 89.0], [746.0, 88.0], [743.0, 88.0], [738.0, 86.0], [739.0, 88.0], [773.0, 90.0], [786.0, 90.0], [785.0, 85.0], [788.0, 86.0], [790.0, 89.0], [791.0, 87.0], [780.0, 86.0], [777.0, 87.0], [784.0, 85.0], [781.0, 87.0], [772.0, 86.0], [783.0, 88.0], [771.0, 88.0], [794.0, 87.0], [774.0, 87.0], [795.0, 88.0], [799.0, 86.0], [798.0, 87.0], [828.0, 75.0], [820.0, 84.0], [821.0, 86.0], [831.0, 79.0], [817.0, 88.0], [819.0, 85.0], [802.0, 89.5], [826.0, 88.0], [827.0, 88.0], [800.0, 86.0], [811.0, 79.0], [804.0, 87.0], [806.0, 89.0], [807.0, 85.0], [801.0, 88.0], [847.0, 88.0], [851.0, 67.0], [840.0, 78.0], [854.0, 80.0], [855.0, 88.0], [842.0, 85.0], [845.0, 84.0], [835.0, 87.0], [844.0, 82.0], [858.0, 86.0], [848.0, 86.0], [879.0, 75.0], [872.0, 85.0], [881.0, 87.0], [894.0, 73.5], [876.0, 78.0], [874.0, 85.0], [882.0, 77.0], [864.0, 87.0], [868.0, 83.0], [875.0, 87.0], [927.0, 80.0], [916.0, 62.0], [920.0, 63.0], [926.0, 79.0], [909.0, 71.0], [898.0, 86.0], [923.0, 84.0], [922.0, 74.0], [918.0, 85.0], [912.0, 69.5], [931.0, 63.0], [942.0, 60.0], [941.0, 81.0], [940.0, 63.0], [928.0, 65.0], [930.0, 82.0], [937.0, 64.0], [944.0, 71.0], [949.0, 68.0], [938.0, 63.0], [951.0, 64.0], [954.0, 64.0], [953.0, 59.0], [987.0, 60.0], [973.0, 56.0], [977.0, 66.0], [968.0, 60.0], [976.0, 59.0], [961.0, 62.0], [963.0, 68.0], [986.0, 58.0], [975.0, 61.0], [972.0, 73.5], [979.0, 61.0], [991.0, 62.0], [998.0, 61.0], [1014.0, 59.0], [1011.0, 58.0], [1009.0, 58.0], [999.0, 55.0], [1004.0, 57.0], [1000.0, 58.0], [996.0, 57.0], [997.0, 58.0], [1006.0, 58.0], [1007.0, 59.0], [992.0, 56.0], [1016.0, 57.0], [1021.0, 55.0], [1074.0, 52.0], [1028.0, 45.5], [1031.0, 55.0], [1032.0, 56.0], [1037.0, 57.0], [1050.0, 55.0], [1051.0, 55.0], [1040.0, 51.5], [1042.0, 54.0], [1044.0, 57.0], [1048.0, 54.0], [1046.0, 58.0], [1039.0, 56.5], [1026.0, 48.0], [1025.0, 55.0], [1024.0, 56.0], [1058.0, 53.0], [1085.0, 49.0], [1083.0, 43.0], [1087.0, 47.0], [1057.0, 53.0], [1082.0, 50.0], [1076.0, 49.0], [1081.0, 49.0], [1075.0, 49.0], [1073.0, 51.0], [1067.0, 50.0], [1060.0, 45.0], [1061.0, 52.0], [1064.0, 53.0], [1065.0, 54.0], [1059.0, 53.0], [1068.0, 49.0], [1071.0, 51.0], [1053.0, 53.0], [1144.0, 48.0], [1131.0, 44.0], [1138.0, 48.0], [1102.0, 46.5], [1136.0, 37.0], [1140.0, 39.0], [1141.0, 53.0], [1132.0, 47.0], [1133.0, 46.0], [1094.0, 48.0], [1099.0, 50.0], [1115.0, 47.0], [1113.0, 47.0], [1111.0, 51.0], [1108.0, 48.0], [1105.0, 47.0], [1118.0, 42.0], [1088.0, 51.0], [1090.0, 50.0], [1092.0, 47.0], [1091.0, 50.0], [1098.0, 50.0], [1130.0, 51.0], [1125.0, 50.0], [1122.0, 51.0], [1150.0, 39.0], [1148.0, 47.0], [1127.0, 45.0], [1129.0, 46.0], [1205.0, 47.0], [1196.0, 41.0], [1195.0, 37.0], [1198.0, 43.0], [1164.0, 36.0], [1200.0, 41.0], [1185.0, 45.0], [1163.0, 39.0], [1170.0, 41.0], [1175.0, 42.0], [1173.0, 42.0], [1162.0, 40.0], [1157.0, 44.0], [1155.0, 47.0], [1152.0, 44.0], [1180.0, 40.0], [1181.0, 38.0], [1207.0, 44.0], [1206.0, 36.0], [1208.0, 41.0], [1214.0, 48.0], [1212.0, 43.0], [1176.0, 36.0], [1269.0, 38.0], [1227.0, 39.0], [1232.0, 39.0], [1235.0, 41.0], [1237.0, 35.0], [1250.0, 46.0], [1278.0, 36.0], [1249.0, 38.0], [1277.0, 40.0], [1271.0, 44.0], [1273.0, 33.0], [1226.0, 32.0], [1217.0, 44.0], [1258.0, 36.0], [1259.0, 35.0], [1262.0, 33.0], [1256.0, 41.0], [1241.0, 38.0], [1265.0, 43.0], [1342.0, 34.0], [1319.0, 33.0], [1294.0, 37.0], [1338.0, 32.5], [1333.0, 40.0], [1320.0, 38.0], [1299.0, 33.0], [1292.0, 38.0], [1315.0, 34.0], [1322.0, 37.0], [1290.0, 36.0], [1282.0, 36.0], [1406.0, 33.0], [1350.0, 30.0], [1381.0, 34.0], [1377.0, 31.0], [1344.0, 36.0], [1408.0, 34.0], [1449.0, 29.0], [1440.0, 29.0], [1461.0, 36.0], [1503.0, 35.0], [1476.0, 34.0], [1520.0, 30.0], [1527.0, 33.0], [1499.0, 32.0], [1502.0, 31.0], [1549.0, 31.0], [1544.0, 31.0], [1546.0, 29.0], [1626.0, 32.0], [1659.0, 32.0], [1630.0, 31.0], [1616.0, 30.0], [1685.0, 31.0], [1766.0, 31.0], [1743.0, 26.0], [1739.0, 32.0], [1747.0, 30.0], [1779.0, 30.0], [1738.0, 29.0], [1851.0, 29.0], [1832.0, 30.0], [1899.0, 29.0], [1890.0, 30.0], [1898.0, 30.0], [1914.0, 31.0], [1868.0, 31.0], [1866.0, 29.0], [1858.0, 15.0], [1856.0, 29.0], [1961.0, 30.0], [1935.0, 30.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1961.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 32.75, "minX": 1.79326122E12, "maxY": 1016.2333333333333, "series": [{"data": [[1.79326128E12, 299.3333333333333], [1.79326176E12, 918.25], [1.79326146E12, 1016.2333333333333], [1.79326164E12, 919.8], [1.79326134E12, 840.8], [1.79326182E12, 715.1333333333333], [1.79326152E12, 992.3166666666667], [1.79326122E12, 32.75], [1.7932617E12, 991.7333333333333], [1.7932614E12, 967.9666666666667], [1.79326158E12, 948.6666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326182E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 32.483333333333334, "minX": 1.79326122E12, "maxY": 1016.2333333333333, "series": [{"data": [[1.79326128E12, 298.6], [1.79326176E12, 918.2333333333333], [1.79326146E12, 1016.2333333333333], [1.79326164E12, 919.8], [1.79326134E12, 840.8], [1.79326182E12, 716.1333333333333], [1.79326152E12, 992.3], [1.79326122E12, 32.483333333333334], [1.7932617E12, 991.75], [1.7932614E12, 967.9833333333333], [1.79326158E12, 948.6666666666666]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326182E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 32.483333333333334, "minX": 1.79326122E12, "maxY": 1016.2333333333333, "series": [{"data": [[1.79326128E12, 298.6], [1.79326176E12, 918.2333333333333], [1.79326146E12, 1016.2333333333333], [1.79326164E12, 919.8], [1.79326134E12, 840.8], [1.79326182E12, 716.1333333333333], [1.79326152E12, 992.3], [1.79326122E12, 32.483333333333334], [1.7932617E12, 991.75], [1.7932614E12, 967.9833333333333], [1.79326158E12, 948.6666666666666]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326182E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 32.483333333333334, "minX": 1.79326122E12, "maxY": 1016.2333333333333, "series": [{"data": [[1.79326128E12, 298.6], [1.79326176E12, 918.2333333333333], [1.79326146E12, 1016.2333333333333], [1.79326164E12, 919.8], [1.79326134E12, 840.8], [1.79326182E12, 716.1333333333333], [1.79326152E12, 992.3], [1.79326122E12, 32.483333333333334], [1.7932617E12, 991.75], [1.7932614E12, 967.9833333333333], [1.79326158E12, 948.6666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326182E12, "title": "Total Transactions Per Second"}},
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

