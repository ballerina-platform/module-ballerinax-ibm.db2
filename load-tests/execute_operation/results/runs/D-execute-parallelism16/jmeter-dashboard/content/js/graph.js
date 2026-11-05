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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 584.0, "series": [{"data": [[0.0, 0.0], [0.1, 3.0], [0.2, 5.0], [0.3, 5.0], [0.4, 6.0], [0.5, 6.0], [0.6, 7.0], [0.7, 7.0], [0.8, 8.0], [0.9, 8.0], [1.0, 8.0], [1.1, 9.0], [1.2, 9.0], [1.3, 9.0], [1.4, 9.0], [1.5, 10.0], [1.6, 10.0], [1.7, 10.0], [1.8, 10.0], [1.9, 11.0], [2.0, 11.0], [2.1, 11.0], [2.2, 11.0], [2.3, 11.0], [2.4, 12.0], [2.5, 12.0], [2.6, 12.0], [2.7, 12.0], [2.8, 12.0], [2.9, 13.0], [3.0, 13.0], [3.1, 13.0], [3.2, 13.0], [3.3, 13.0], [3.4, 14.0], [3.5, 14.0], [3.6, 14.0], [3.7, 14.0], [3.8, 14.0], [3.9, 15.0], [4.0, 15.0], [4.1, 15.0], [4.2, 15.0], [4.3, 15.0], [4.4, 16.0], [4.5, 16.0], [4.6, 16.0], [4.7, 16.0], [4.8, 16.0], [4.9, 17.0], [5.0, 17.0], [5.1, 17.0], [5.2, 17.0], [5.3, 18.0], [5.4, 18.0], [5.5, 18.0], [5.6, 18.0], [5.7, 18.0], [5.8, 19.0], [5.9, 19.0], [6.0, 19.0], [6.1, 19.0], [6.2, 20.0], [6.3, 20.0], [6.4, 20.0], [6.5, 20.0], [6.6, 20.0], [6.7, 21.0], [6.8, 21.0], [6.9, 21.0], [7.0, 21.0], [7.1, 22.0], [7.2, 22.0], [7.3, 22.0], [7.4, 22.0], [7.5, 22.0], [7.6, 23.0], [7.7, 23.0], [7.8, 23.0], [7.9, 23.0], [8.0, 23.0], [8.1, 23.0], [8.2, 24.0], [8.3, 24.0], [8.4, 24.0], [8.5, 24.0], [8.6, 24.0], [8.7, 25.0], [8.8, 25.0], [8.9, 25.0], [9.0, 25.0], [9.1, 25.0], [9.2, 25.0], [9.3, 25.0], [9.4, 26.0], [9.5, 26.0], [9.6, 26.0], [9.7, 26.0], [9.8, 26.0], [9.9, 26.0], [10.0, 26.0], [10.1, 26.0], [10.2, 27.0], [10.3, 27.0], [10.4, 27.0], [10.5, 27.0], [10.6, 27.0], [10.7, 27.0], [10.8, 27.0], [10.9, 27.0], [11.0, 27.0], [11.1, 28.0], [11.2, 28.0], [11.3, 28.0], [11.4, 28.0], [11.5, 28.0], [11.6, 28.0], [11.7, 28.0], [11.8, 28.0], [11.9, 28.0], [12.0, 28.0], [12.1, 29.0], [12.2, 29.0], [12.3, 29.0], [12.4, 29.0], [12.5, 29.0], [12.6, 29.0], [12.7, 29.0], [12.8, 29.0], [12.9, 29.0], [13.0, 29.0], [13.1, 29.0], [13.2, 29.0], [13.3, 30.0], [13.4, 30.0], [13.5, 30.0], [13.6, 30.0], [13.7, 30.0], [13.8, 30.0], [13.9, 30.0], [14.0, 30.0], [14.1, 30.0], [14.2, 30.0], [14.3, 30.0], [14.4, 30.0], [14.5, 30.0], [14.6, 31.0], [14.7, 31.0], [14.8, 31.0], [14.9, 31.0], [15.0, 31.0], [15.1, 31.0], [15.2, 31.0], [15.3, 31.0], [15.4, 31.0], [15.5, 31.0], [15.6, 31.0], [15.7, 31.0], [15.8, 31.0], [15.9, 31.0], [16.0, 32.0], [16.1, 32.0], [16.2, 32.0], [16.3, 32.0], [16.4, 32.0], [16.5, 32.0], [16.6, 32.0], [16.7, 32.0], [16.8, 32.0], [16.9, 32.0], [17.0, 32.0], [17.1, 32.0], [17.2, 32.0], [17.3, 32.0], [17.4, 32.0], [17.5, 33.0], [17.6, 33.0], [17.7, 33.0], [17.8, 33.0], [17.9, 33.0], [18.0, 33.0], [18.1, 33.0], [18.2, 33.0], [18.3, 33.0], [18.4, 33.0], [18.5, 33.0], [18.6, 33.0], [18.7, 33.0], [18.8, 33.0], [18.9, 33.0], [19.0, 33.0], [19.1, 34.0], [19.2, 34.0], [19.3, 34.0], [19.4, 34.0], [19.5, 34.0], [19.6, 34.0], [19.7, 34.0], [19.8, 34.0], [19.9, 34.0], [20.0, 34.0], [20.1, 34.0], [20.2, 34.0], [20.3, 34.0], [20.4, 34.0], [20.5, 34.0], [20.6, 34.0], [20.7, 35.0], [20.8, 35.0], [20.9, 35.0], [21.0, 35.0], [21.1, 35.0], [21.2, 35.0], [21.3, 35.0], [21.4, 35.0], [21.5, 35.0], [21.6, 35.0], [21.7, 35.0], [21.8, 35.0], [21.9, 35.0], [22.0, 35.0], [22.1, 35.0], [22.2, 35.0], [22.3, 36.0], [22.4, 36.0], [22.5, 36.0], [22.6, 36.0], [22.7, 36.0], [22.8, 36.0], [22.9, 36.0], [23.0, 36.0], [23.1, 36.0], [23.2, 36.0], [23.3, 36.0], [23.4, 36.0], [23.5, 36.0], [23.6, 36.0], [23.7, 37.0], [23.8, 37.0], [23.9, 37.0], [24.0, 37.0], [24.1, 37.0], [24.2, 37.0], [24.3, 37.0], [24.4, 37.0], [24.5, 37.0], [24.6, 37.0], [24.7, 37.0], [24.8, 37.0], [24.9, 37.0], [25.0, 37.0], [25.1, 37.0], [25.2, 38.0], [25.3, 38.0], [25.4, 38.0], [25.5, 38.0], [25.6, 38.0], [25.7, 38.0], [25.8, 38.0], [25.9, 38.0], [26.0, 38.0], [26.1, 38.0], [26.2, 38.0], [26.3, 38.0], [26.4, 38.0], [26.5, 39.0], [26.6, 39.0], [26.7, 39.0], [26.8, 39.0], [26.9, 39.0], [27.0, 39.0], [27.1, 39.0], [27.2, 39.0], [27.3, 39.0], [27.4, 39.0], [27.5, 39.0], [27.6, 39.0], [27.7, 39.0], [27.8, 40.0], [27.9, 40.0], [28.0, 40.0], [28.1, 40.0], [28.2, 40.0], [28.3, 40.0], [28.4, 40.0], [28.5, 40.0], [28.6, 40.0], [28.7, 40.0], [28.8, 40.0], [28.9, 40.0], [29.0, 41.0], [29.1, 41.0], [29.2, 41.0], [29.3, 41.0], [29.4, 41.0], [29.5, 41.0], [29.6, 41.0], [29.7, 41.0], [29.8, 41.0], [29.9, 41.0], [30.0, 41.0], [30.1, 42.0], [30.2, 42.0], [30.3, 42.0], [30.4, 42.0], [30.5, 42.0], [30.6, 42.0], [30.7, 42.0], [30.8, 42.0], [30.9, 42.0], [31.0, 42.0], [31.1, 43.0], [31.2, 43.0], [31.3, 43.0], [31.4, 43.0], [31.5, 43.0], [31.6, 43.0], [31.7, 43.0], [31.8, 43.0], [31.9, 43.0], [32.0, 44.0], [32.1, 44.0], [32.2, 44.0], [32.3, 44.0], [32.4, 44.0], [32.5, 44.0], [32.6, 44.0], [32.7, 44.0], [32.8, 45.0], [32.9, 45.0], [33.0, 45.0], [33.1, 45.0], [33.2, 45.0], [33.3, 45.0], [33.4, 45.0], [33.5, 45.0], [33.6, 46.0], [33.7, 46.0], [33.8, 46.0], [33.9, 46.0], [34.0, 46.0], [34.1, 46.0], [34.2, 47.0], [34.3, 47.0], [34.4, 47.0], [34.5, 47.0], [34.6, 47.0], [34.7, 47.0], [34.8, 48.0], [34.9, 48.0], [35.0, 48.0], [35.1, 48.0], [35.2, 48.0], [35.3, 49.0], [35.4, 49.0], [35.5, 49.0], [35.6, 49.0], [35.7, 50.0], [35.8, 50.0], [35.9, 50.0], [36.0, 50.0], [36.1, 50.0], [36.2, 51.0], [36.3, 51.0], [36.4, 51.0], [36.5, 52.0], [36.6, 52.0], [36.7, 52.0], [36.8, 52.0], [36.9, 53.0], [37.0, 53.0], [37.1, 53.0], [37.2, 54.0], [37.3, 54.0], [37.4, 54.0], [37.5, 54.0], [37.6, 55.0], [37.7, 55.0], [37.8, 55.0], [37.9, 56.0], [38.0, 56.0], [38.1, 56.0], [38.2, 56.0], [38.3, 57.0], [38.4, 57.0], [38.5, 57.0], [38.6, 58.0], [38.7, 58.0], [38.8, 58.0], [38.9, 59.0], [39.0, 59.0], [39.1, 59.0], [39.2, 60.0], [39.3, 60.0], [39.4, 60.0], [39.5, 61.0], [39.6, 61.0], [39.7, 61.0], [39.8, 61.0], [39.9, 62.0], [40.0, 62.0], [40.1, 62.0], [40.2, 63.0], [40.3, 63.0], [40.4, 63.0], [40.5, 63.0], [40.6, 64.0], [40.7, 64.0], [40.8, 64.0], [40.9, 65.0], [41.0, 65.0], [41.1, 65.0], [41.2, 66.0], [41.3, 66.0], [41.4, 66.0], [41.5, 66.0], [41.6, 67.0], [41.7, 67.0], [41.8, 67.0], [41.9, 68.0], [42.0, 68.0], [42.1, 68.0], [42.2, 68.0], [42.3, 69.0], [42.4, 69.0], [42.5, 69.0], [42.6, 69.0], [42.7, 70.0], [42.8, 70.0], [42.9, 70.0], [43.0, 70.0], [43.1, 71.0], [43.2, 71.0], [43.3, 71.0], [43.4, 71.0], [43.5, 72.0], [43.6, 72.0], [43.7, 72.0], [43.8, 72.0], [43.9, 73.0], [44.0, 73.0], [44.1, 73.0], [44.2, 73.0], [44.3, 73.0], [44.4, 73.0], [44.5, 74.0], [44.6, 74.0], [44.7, 74.0], [44.8, 74.0], [44.9, 74.0], [45.0, 75.0], [45.1, 75.0], [45.2, 75.0], [45.3, 75.0], [45.4, 75.0], [45.5, 75.0], [45.6, 75.0], [45.7, 76.0], [45.8, 76.0], [45.9, 76.0], [46.0, 76.0], [46.1, 76.0], [46.2, 76.0], [46.3, 76.0], [46.4, 77.0], [46.5, 77.0], [46.6, 77.0], [46.7, 77.0], [46.8, 77.0], [46.9, 77.0], [47.0, 77.0], [47.1, 77.0], [47.2, 77.0], [47.3, 78.0], [47.4, 78.0], [47.5, 78.0], [47.6, 78.0], [47.7, 78.0], [47.8, 78.0], [47.9, 78.0], [48.0, 78.0], [48.1, 78.0], [48.2, 78.0], [48.3, 79.0], [48.4, 79.0], [48.5, 79.0], [48.6, 79.0], [48.7, 79.0], [48.8, 79.0], [48.9, 79.0], [49.0, 79.0], [49.1, 79.0], [49.2, 79.0], [49.3, 79.0], [49.4, 79.0], [49.5, 80.0], [49.6, 80.0], [49.7, 80.0], [49.8, 80.0], [49.9, 80.0], [50.0, 80.0], [50.1, 80.0], [50.2, 80.0], [50.3, 80.0], [50.4, 80.0], [50.5, 80.0], [50.6, 80.0], [50.7, 81.0], [50.8, 81.0], [50.9, 81.0], [51.0, 81.0], [51.1, 81.0], [51.2, 81.0], [51.3, 81.0], [51.4, 81.0], [51.5, 81.0], [51.6, 81.0], [51.7, 81.0], [51.8, 81.0], [51.9, 81.0], [52.0, 81.0], [52.1, 82.0], [52.2, 82.0], [52.3, 82.0], [52.4, 82.0], [52.5, 82.0], [52.6, 82.0], [52.7, 82.0], [52.8, 82.0], [52.9, 82.0], [53.0, 82.0], [53.1, 82.0], [53.2, 82.0], [53.3, 82.0], [53.4, 82.0], [53.5, 83.0], [53.6, 83.0], [53.7, 83.0], [53.8, 83.0], [53.9, 83.0], [54.0, 83.0], [54.1, 83.0], [54.2, 83.0], [54.3, 83.0], [54.4, 83.0], [54.5, 83.0], [54.6, 83.0], [54.7, 83.0], [54.8, 83.0], [54.9, 83.0], [55.0, 83.0], [55.1, 84.0], [55.2, 84.0], [55.3, 84.0], [55.4, 84.0], [55.5, 84.0], [55.6, 84.0], [55.7, 84.0], [55.8, 84.0], [55.9, 84.0], [56.0, 84.0], [56.1, 84.0], [56.2, 84.0], [56.3, 84.0], [56.4, 84.0], [56.5, 84.0], [56.6, 84.0], [56.7, 84.0], [56.8, 85.0], [56.9, 85.0], [57.0, 85.0], [57.1, 85.0], [57.2, 85.0], [57.3, 85.0], [57.4, 85.0], [57.5, 85.0], [57.6, 85.0], [57.7, 85.0], [57.8, 85.0], [57.9, 85.0], [58.0, 85.0], [58.1, 85.0], [58.2, 85.0], [58.3, 85.0], [58.4, 85.0], [58.5, 85.0], [58.6, 86.0], [58.7, 86.0], [58.8, 86.0], [58.9, 86.0], [59.0, 86.0], [59.1, 86.0], [59.2, 86.0], [59.3, 86.0], [59.4, 86.0], [59.5, 86.0], [59.6, 86.0], [59.7, 86.0], [59.8, 86.0], [59.9, 86.0], [60.0, 86.0], [60.1, 86.0], [60.2, 86.0], [60.3, 86.0], [60.4, 87.0], [60.5, 87.0], [60.6, 87.0], [60.7, 87.0], [60.8, 87.0], [60.9, 87.0], [61.0, 87.0], [61.1, 87.0], [61.2, 87.0], [61.3, 87.0], [61.4, 87.0], [61.5, 87.0], [61.6, 87.0], [61.7, 87.0], [61.8, 87.0], [61.9, 87.0], [62.0, 87.0], [62.1, 88.0], [62.2, 88.0], [62.3, 88.0], [62.4, 88.0], [62.5, 88.0], [62.6, 88.0], [62.7, 88.0], [62.8, 88.0], [62.9, 88.0], [63.0, 88.0], [63.1, 88.0], [63.2, 88.0], [63.3, 88.0], [63.4, 88.0], [63.5, 88.0], [63.6, 88.0], [63.7, 89.0], [63.8, 89.0], [63.9, 89.0], [64.0, 89.0], [64.1, 89.0], [64.2, 89.0], [64.3, 89.0], [64.4, 89.0], [64.5, 89.0], [64.6, 89.0], [64.7, 89.0], [64.8, 89.0], [64.9, 89.0], [65.0, 89.0], [65.1, 89.0], [65.2, 89.0], [65.3, 90.0], [65.4, 90.0], [65.5, 90.0], [65.6, 90.0], [65.7, 90.0], [65.8, 90.0], [65.9, 90.0], [66.0, 90.0], [66.1, 90.0], [66.2, 90.0], [66.3, 90.0], [66.4, 90.0], [66.5, 90.0], [66.6, 90.0], [66.7, 90.0], [66.8, 91.0], [66.9, 91.0], [67.0, 91.0], [67.1, 91.0], [67.2, 91.0], [67.3, 91.0], [67.4, 91.0], [67.5, 91.0], [67.6, 91.0], [67.7, 91.0], [67.8, 91.0], [67.9, 91.0], [68.0, 91.0], [68.1, 91.0], [68.2, 92.0], [68.3, 92.0], [68.4, 92.0], [68.5, 92.0], [68.6, 92.0], [68.7, 92.0], [68.8, 92.0], [68.9, 92.0], [69.0, 92.0], [69.1, 92.0], [69.2, 92.0], [69.3, 92.0], [69.4, 92.0], [69.5, 92.0], [69.6, 93.0], [69.7, 93.0], [69.8, 93.0], [69.9, 93.0], [70.0, 93.0], [70.1, 93.0], [70.2, 93.0], [70.3, 93.0], [70.4, 93.0], [70.5, 93.0], [70.6, 93.0], [70.7, 93.0], [70.8, 93.0], [70.9, 93.0], [71.0, 94.0], [71.1, 94.0], [71.2, 94.0], [71.3, 94.0], [71.4, 94.0], [71.5, 94.0], [71.6, 94.0], [71.7, 94.0], [71.8, 94.0], [71.9, 94.0], [72.0, 94.0], [72.1, 94.0], [72.2, 95.0], [72.3, 95.0], [72.4, 95.0], [72.5, 95.0], [72.6, 95.0], [72.7, 95.0], [72.8, 95.0], [72.9, 95.0], [73.0, 95.0], [73.1, 95.0], [73.2, 95.0], [73.3, 95.0], [73.4, 96.0], [73.5, 96.0], [73.6, 96.0], [73.7, 96.0], [73.8, 96.0], [73.9, 96.0], [74.0, 96.0], [74.1, 96.0], [74.2, 96.0], [74.3, 96.0], [74.4, 96.0], [74.5, 96.0], [74.6, 97.0], [74.7, 97.0], [74.8, 97.0], [74.9, 97.0], [75.0, 97.0], [75.1, 97.0], [75.2, 97.0], [75.3, 97.0], [75.4, 97.0], [75.5, 97.0], [75.6, 98.0], [75.7, 98.0], [75.8, 98.0], [75.9, 98.0], [76.0, 98.0], [76.1, 98.0], [76.2, 98.0], [76.3, 98.0], [76.4, 98.0], [76.5, 98.0], [76.6, 99.0], [76.7, 99.0], [76.8, 99.0], [76.9, 99.0], [77.0, 99.0], [77.1, 99.0], [77.2, 99.0], [77.3, 99.0], [77.4, 99.0], [77.5, 99.0], [77.6, 100.0], [77.7, 100.0], [77.8, 100.0], [77.9, 100.0], [78.0, 100.0], [78.1, 100.0], [78.2, 100.0], [78.3, 100.0], [78.4, 100.0], [78.5, 101.0], [78.6, 101.0], [78.7, 101.0], [78.8, 101.0], [78.9, 101.0], [79.0, 101.0], [79.1, 101.0], [79.2, 101.0], [79.3, 101.0], [79.4, 101.0], [79.5, 102.0], [79.6, 102.0], [79.7, 102.0], [79.8, 102.0], [79.9, 102.0], [80.0, 102.0], [80.1, 102.0], [80.2, 102.0], [80.3, 103.0], [80.4, 103.0], [80.5, 103.0], [80.6, 103.0], [80.7, 103.0], [80.8, 103.0], [80.9, 103.0], [81.0, 104.0], [81.1, 104.0], [81.2, 104.0], [81.3, 104.0], [81.4, 104.0], [81.5, 104.0], [81.6, 104.0], [81.7, 104.0], [81.8, 105.0], [81.9, 105.0], [82.0, 105.0], [82.1, 105.0], [82.2, 105.0], [82.3, 105.0], [82.4, 105.0], [82.5, 106.0], [82.6, 106.0], [82.7, 106.0], [82.8, 106.0], [82.9, 106.0], [83.0, 106.0], [83.1, 106.0], [83.2, 107.0], [83.3, 107.0], [83.4, 107.0], [83.5, 107.0], [83.6, 107.0], [83.7, 107.0], [83.8, 107.0], [83.9, 108.0], [84.0, 108.0], [84.1, 108.0], [84.2, 108.0], [84.3, 108.0], [84.4, 108.0], [84.5, 109.0], [84.6, 109.0], [84.7, 109.0], [84.8, 109.0], [84.9, 109.0], [85.0, 110.0], [85.1, 110.0], [85.2, 110.0], [85.3, 110.0], [85.4, 110.0], [85.5, 110.0], [85.6, 111.0], [85.7, 111.0], [85.8, 111.0], [85.9, 111.0], [86.0, 111.0], [86.1, 112.0], [86.2, 112.0], [86.3, 112.0], [86.4, 112.0], [86.5, 112.0], [86.6, 113.0], [86.7, 113.0], [86.8, 113.0], [86.9, 113.0], [87.0, 113.0], [87.1, 114.0], [87.2, 114.0], [87.3, 114.0], [87.4, 114.0], [87.5, 115.0], [87.6, 115.0], [87.7, 115.0], [87.8, 115.0], [87.9, 116.0], [88.0, 116.0], [88.1, 116.0], [88.2, 116.0], [88.3, 117.0], [88.4, 117.0], [88.5, 117.0], [88.6, 118.0], [88.7, 118.0], [88.8, 118.0], [88.9, 119.0], [89.0, 119.0], [89.1, 119.0], [89.2, 120.0], [89.3, 120.0], [89.4, 120.0], [89.5, 121.0], [89.6, 121.0], [89.7, 122.0], [89.8, 122.0], [89.9, 122.0], [90.0, 123.0], [90.1, 123.0], [90.2, 124.0], [90.3, 125.0], [90.4, 125.0], [90.5, 126.0], [90.6, 127.0], [90.7, 128.0], [90.8, 128.0], [90.9, 129.0], [91.0, 131.0], [91.1, 132.0], [91.2, 134.0], [91.3, 136.0], [91.4, 140.0], [91.5, 146.0], [91.6, 150.0], [91.7, 152.0], [91.8, 154.0], [91.9, 156.0], [92.0, 158.0], [92.1, 159.0], [92.2, 160.0], [92.3, 161.0], [92.4, 163.0], [92.5, 163.0], [92.6, 164.0], [92.7, 165.0], [92.8, 166.0], [92.9, 167.0], [93.0, 168.0], [93.1, 168.0], [93.2, 169.0], [93.3, 170.0], [93.4, 171.0], [93.5, 171.0], [93.6, 172.0], [93.7, 173.0], [93.8, 173.0], [93.9, 174.0], [94.0, 174.0], [94.1, 175.0], [94.2, 176.0], [94.3, 176.0], [94.4, 177.0], [94.5, 177.0], [94.6, 178.0], [94.7, 179.0], [94.8, 179.0], [94.9, 180.0], [95.0, 181.0], [95.1, 181.0], [95.2, 182.0], [95.3, 182.0], [95.4, 183.0], [95.5, 183.0], [95.6, 184.0], [95.7, 185.0], [95.8, 185.0], [95.9, 186.0], [96.0, 187.0], [96.1, 187.0], [96.2, 188.0], [96.3, 188.0], [96.4, 189.0], [96.5, 189.0], [96.6, 190.0], [96.7, 191.0], [96.8, 191.0], [96.9, 192.0], [97.0, 193.0], [97.1, 193.0], [97.2, 194.0], [97.3, 195.0], [97.4, 196.0], [97.5, 196.0], [97.6, 197.0], [97.7, 198.0], [97.8, 199.0], [97.9, 200.0], [98.0, 201.0], [98.1, 202.0], [98.2, 203.0], [98.3, 204.0], [98.4, 205.0], [98.5, 207.0], [98.6, 208.0], [98.7, 210.0], [98.8, 212.0], [98.9, 214.0], [99.0, 217.0], [99.1, 222.0], [99.2, 234.0], [99.3, 267.0], [99.4, 272.0], [99.5, 277.0], [99.6, 284.0], [99.7, 291.0], [99.8, 300.0], [99.9, 318.0], [100.0, 584.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 5.0, "minX": 0.0, "maxY": 162693.0, "series": [{"data": [[0.0, 162693.0], [300.0, 396.0], [200.0, 4064.0], [100.0, 42586.0], [400.0, 33.0], [500.0, 5.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 500.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 209773.0, "series": [{"data": [[0.0, 209773.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 4.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.6801152737752174, "minX": 1.79326374E12, "maxY": 60.0, "series": [{"data": [[1.79326374E12, 2.6801152737752174], [1.79326404E12, 59.95955924772121], [1.79326386E12, 60.0], [1.79326398E12, 60.0], [1.7932638E12, 36.75721569496801], [1.79326392E12, 60.0]], "isOverall": false, "label": "Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326404E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 12.567164179104475, "minX": 1.0, "maxY": 162.33333333333334, "series": [{"data": [[2.0, 27.661971830985927], [3.0, 24.427350427350426], [4.0, 33.368852459016395], [5.0, 22.892523364485996], [6.0, 26.03879310344828], [7.0, 48.9568345323741], [8.0, 47.625000000000014], [9.0, 41.21860465116278], [10.0, 48.66502463054186], [11.0, 41.3333333333333], [12.0, 59.751243781094516], [13.0, 74.85057471264369], [14.0, 56.04799999999999], [15.0, 34.08968609865471], [16.0, 37.11502347417843], [17.0, 58.695501730103764], [18.0, 57.80405405405407], [19.0, 65.22442244224425], [20.0, 58.70294117647058], [21.0, 65.09523809523814], [22.0, 67.47663551401868], [23.0, 57.12090680100752], [24.0, 37.77434312210202], [25.0, 90.89925373134324], [26.0, 66.04336734693874], [27.0, 41.511244377811124], [28.0, 42.17024539877301], [29.0, 81.72727272727273], [30.0, 77.45273631840787], [31.0, 57.8230616302187], [32.0, 106.53264604810997], [33.0, 74.62360801781739], [34.0, 106.63777089783284], [35.0, 111.76897689768974], [36.0, 62.3862433862434], [37.0, 100.49468085106385], [38.0, 98.3793103448276], [39.0, 108.13005780346823], [40.0, 107.9943181818181], [41.0, 58.84905660377353], [42.0, 81.14979757085024], [43.0, 130.8727272727273], [44.0, 133.98153846153846], [45.0, 122.23545706371193], [46.0, 136.5030303030303], [47.0, 134.85479452054804], [48.0, 149.9969040247679], [49.0, 69.773558368495], [50.0, 115.28985507246377], [51.0, 119.5910112359551], [52.0, 115.89277389277383], [53.0, 150.43661971830988], [54.0, 162.33333333333334], [55.0, 72.87710219922378], [56.0, 151.26536312849166], [57.0, 138.94974874371866], [58.0, 153.68112244897966], [59.0, 143.29901960784323], [60.0, 76.48992206965993], [1.0, 12.567164179104475]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[57.396120642396276, 77.18486774050565]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 60.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 734.4833333333333, "minX": 1.79326374E12, "maxY": 237734.93333333332, "series": [{"data": [[1.79326374E12, 734.4833333333333], [1.79326404E12, 110070.9], [1.79326386E12, 59982.1], [1.79326398E12, 125583.95], [1.7932638E12, 47741.416666666664], [1.79326392E12, 99915.13333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.79326374E12, 1390.4], [1.79326404E12, 208337.21666666667], [1.79326386E12, 113555.93333333333], [1.79326398E12, 237734.93333333332], [1.7932638E12, 90375.7], [1.79326392E12, 189147.55]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326404E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 25.011527377521613, "minX": 1.79326374E12, "maxY": 126.75326416825497, "series": [{"data": [[1.79326374E12, 25.011527377521613], [1.79326404E12, 64.69899234644797], [1.79326386E12, 126.75326416825497], [1.79326398E12, 60.5151269993766], [1.7932638E12, 90.57330968743022], [1.79326392E12, 76.12100669434828]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326404E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 24.94524495677235, "minX": 1.79326374E12, "maxY": 126.74472439833471, "series": [{"data": [[1.79326374E12, 24.94524495677235], [1.79326404E12, 64.69006961270757], [1.79326386E12, 126.74472439833471], [1.79326398E12, 60.5065143011241], [1.7932638E12, 90.56377743294212], [1.79326392E12, 76.11361325311366]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326404E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0017114726356678657, "minX": 1.79326374E12, "maxY": 0.12680115273775233, "series": [{"data": [[1.79326374E12, 0.12680115273775233], [1.79326404E12, 0.0017114726356678657], [1.79326386E12, 0.003634695461923939], [1.79326398E12, 0.0018540054945981042], [1.7932638E12, 0.004300598536909746], [1.79326392E12, 0.002245572409117859]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326404E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.79326374E12, "maxY": 584.0, "series": [{"data": [[1.79326374E12, 201.0], [1.79326404E12, 333.0], [1.79326386E12, 490.0], [1.79326398E12, 315.0], [1.7932638E12, 584.0], [1.79326392E12, 377.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.79326374E12, 71.0], [1.79326404E12, 100.0], [1.79326386E12, 192.0], [1.79326398E12, 97.0], [1.7932638E12, 191.0], [1.79326392E12, 100.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.79326374E12, 86.03999999999996], [1.79326404E12, 165.0], [1.79326386E12, 283.0], [1.79326398E12, 164.0], [1.7932638E12, 294.0], [1.79326392E12, 170.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.79326374E12, 77.0], [1.79326404E12, 112.0], [1.79326386E12, 204.0], [1.79326398E12, 108.0], [1.7932638E12, 206.0], [1.79326392E12, 112.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.79326374E12, 3.0], [1.79326404E12, 0.0], [1.79326386E12, 2.0], [1.79326398E12, 0.0], [1.7932638E12, 3.0], [1.79326392E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.79326374E12, 12.0], [1.79326404E12, 77.0], [1.79326386E12, 106.0], [1.79326398E12, 54.0], [1.7932638E12, 92.0], [1.79326392E12, 76.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326404E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 7.0, "minX": 43.0, "maxY": 179.0, "series": [{"data": [[43.0, 7.0], [79.0, 12.0], [98.0, 15.0], [127.0, 13.0], [135.0, 74.0], [164.0, 20.0], [178.0, 86.5], [177.0, 84.0], [189.0, 15.0], [200.0, 64.0], [220.0, 20.0], [230.0, 15.0], [239.0, 63.0], [252.0, 20.0], [253.0, 79.0], [287.0, 77.0], [294.0, 84.0], [301.0, 89.0], [303.0, 101.0], [314.0, 107.5], [308.0, 98.0], [326.0, 76.0], [321.0, 101.0], [329.0, 119.0], [325.0, 117.0], [340.0, 61.5], [343.0, 86.0], [348.0, 101.0], [338.0, 115.0], [341.0, 110.0], [342.0, 128.0], [349.0, 177.0], [360.0, 61.0], [358.0, 97.0], [359.0, 98.0], [361.0, 139.0], [362.0, 176.5], [367.0, 166.0], [366.0, 167.5], [381.0, 21.0], [372.0, 107.0], [379.0, 128.0], [376.0, 113.0], [375.0, 179.0], [383.0, 137.0], [387.0, 77.0], [399.0, 109.0], [386.0, 119.0], [395.0, 124.0], [384.0, 123.0], [394.0, 124.0], [400.0, 108.0], [404.0, 96.0], [405.0, 123.0], [401.0, 118.0], [411.0, 119.0], [418.0, 115.5], [427.0, 113.0], [422.0, 124.0], [419.0, 118.0], [431.0, 120.0], [437.0, 79.0], [440.0, 120.0], [436.0, 116.0], [444.0, 114.0], [435.0, 116.0], [432.0, 116.0], [439.0, 113.0], [447.0, 113.0], [441.0, 116.0], [455.0, 94.0], [451.0, 114.0], [462.0, 112.0], [456.0, 111.0], [473.0, 106.0], [474.0, 114.0], [470.0, 117.0], [467.0, 107.0], [477.0, 110.0], [483.0, 74.5], [493.0, 109.0], [486.0, 106.0], [482.0, 111.0], [489.0, 108.0], [491.0, 105.0], [497.0, 106.0], [508.0, 106.0], [507.0, 104.0], [529.0, 76.0], [536.0, 103.0], [516.0, 103.0], [524.0, 104.0], [531.0, 105.0], [535.0, 103.0], [530.0, 105.0], [517.0, 104.0], [519.0, 106.0], [541.0, 102.0], [542.0, 105.0], [574.0, 70.0], [551.0, 101.0], [559.0, 100.0], [561.0, 101.0], [548.0, 102.0], [550.0, 101.0], [557.0, 103.0], [563.0, 103.0], [582.0, 59.5], [597.0, 98.0], [587.0, 98.0], [579.0, 99.0], [601.0, 99.0], [611.0, 22.0], [630.0, 95.0], [623.0, 98.0], [618.0, 98.0], [627.0, 98.0], [649.0, 29.0], [663.0, 90.0], [674.0, 23.0], [689.0, 64.0], [678.0, 75.0], [676.0, 95.0], [748.0, 78.0], [747.0, 86.0], [764.0, 86.0], [743.0, 88.0], [796.0, 84.0], [788.0, 84.0], [799.0, 84.0], [784.0, 84.0], [787.0, 85.0], [795.0, 83.0], [797.0, 83.0], [794.0, 84.0], [798.0, 84.0], [789.0, 84.0], [791.0, 84.0], [774.0, 83.0], [792.0, 84.0], [793.0, 84.0], [782.0, 83.5], [779.0, 84.0], [800.0, 82.0], [828.0, 79.0], [808.0, 82.0], [810.0, 82.0], [816.0, 81.0], [814.0, 81.0], [812.0, 83.0], [813.0, 83.0], [805.0, 83.0], [803.0, 82.0], [802.0, 83.5], [804.0, 83.0], [824.0, 81.0], [826.0, 82.0], [818.0, 82.0], [861.0, 76.0], [852.0, 81.0], [855.0, 79.0], [843.0, 79.0], [853.0, 78.0], [862.0, 81.0], [851.0, 76.5], [846.0, 82.0], [847.0, 79.0], [859.0, 78.0], [844.0, 78.0], [878.0, 78.0], [884.0, 69.0], [895.0, 76.0], [900.0, 73.0], [909.0, 78.0], [910.0, 74.0], [918.0, 63.0], [898.0, 73.0], [896.0, 71.0], [919.0, 68.0], [920.0, 73.0], [926.0, 67.5], [941.0, 65.0], [937.0, 57.0], [959.0, 66.0], [957.0, 60.0], [989.0, 58.0], [981.0, 66.0], [966.0, 59.0], [984.0, 60.0], [962.0, 59.5], [982.0, 64.0], [963.0, 60.0], [1023.0, 46.0], [1022.0, 51.0], [1015.0, 47.0], [1014.0, 48.5], [994.0, 50.0], [1011.0, 49.0], [1000.0, 59.0], [992.0, 55.0], [1041.0, 47.0], [1058.0, 46.0], [1056.0, 50.0], [1040.0, 52.0], [1072.0, 43.0], [1071.0, 47.0], [1078.0, 42.0], [1064.0, 44.0], [1088.0, 43.0], [1132.0, 44.0], [1124.0, 41.0], [1110.0, 42.0], [1094.0, 43.0], [1161.0, 43.0], [1171.0, 40.0], [1173.0, 42.0], [1192.0, 40.0], [1199.0, 38.0], [1259.0, 37.0], [1237.0, 38.0], [1252.0, 37.0], [1248.0, 37.0], [1231.0, 37.0], [1336.0, 35.0], [1326.0, 35.0], [1294.0, 39.0], [1318.0, 36.0], [1312.0, 40.0], [1331.0, 37.0], [1330.0, 36.0], [1370.0, 36.0], [1359.0, 37.0], [1369.0, 36.0], [1377.0, 37.0], [1424.0, 35.0], [1505.0, 35.0], [1476.0, 34.0], [1649.0, 34.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1649.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 7.0, "minX": 43.0, "maxY": 179.0, "series": [{"data": [[43.0, 7.0], [79.0, 12.0], [98.0, 15.0], [127.0, 13.0], [135.0, 74.0], [164.0, 20.0], [178.0, 86.5], [177.0, 84.0], [189.0, 15.0], [200.0, 64.0], [220.0, 20.0], [230.0, 15.0], [239.0, 63.0], [252.0, 20.0], [253.0, 79.0], [287.0, 77.0], [294.0, 84.0], [301.0, 89.0], [303.0, 101.0], [314.0, 107.5], [308.0, 98.0], [326.0, 76.0], [321.0, 101.0], [329.0, 119.0], [325.0, 117.0], [340.0, 61.5], [343.0, 86.0], [348.0, 101.0], [338.0, 115.0], [341.0, 110.0], [342.0, 128.0], [349.0, 177.0], [360.0, 61.0], [358.0, 97.0], [359.0, 98.0], [361.0, 139.0], [362.0, 176.5], [367.0, 166.0], [366.0, 167.5], [381.0, 21.0], [372.0, 107.0], [379.0, 128.0], [376.0, 113.0], [375.0, 179.0], [383.0, 137.0], [387.0, 77.0], [399.0, 109.0], [386.0, 119.0], [395.0, 124.0], [384.0, 123.0], [394.0, 124.0], [400.0, 108.0], [404.0, 96.0], [405.0, 123.0], [401.0, 118.0], [411.0, 119.0], [418.0, 115.5], [427.0, 113.0], [422.0, 124.0], [419.0, 118.0], [431.0, 120.0], [437.0, 79.0], [440.0, 120.0], [436.0, 116.0], [444.0, 114.0], [435.0, 116.0], [432.0, 116.0], [439.0, 113.0], [447.0, 113.0], [441.0, 116.0], [455.0, 94.0], [451.0, 114.0], [462.0, 112.0], [456.0, 111.0], [473.0, 105.5], [474.0, 114.0], [470.0, 117.0], [467.0, 107.0], [477.0, 110.0], [483.0, 74.0], [493.0, 109.0], [486.0, 106.0], [482.0, 111.0], [489.0, 108.0], [491.0, 105.0], [497.0, 106.0], [508.0, 106.0], [507.0, 104.0], [529.0, 76.0], [536.0, 103.0], [516.0, 103.0], [524.0, 104.0], [531.0, 105.0], [535.0, 103.0], [530.0, 105.0], [517.0, 104.0], [519.0, 106.0], [541.0, 102.0], [542.0, 105.0], [574.0, 70.0], [551.0, 101.0], [559.0, 100.0], [561.0, 101.0], [548.0, 102.0], [550.0, 101.0], [557.0, 103.0], [563.0, 103.0], [582.0, 59.5], [597.0, 98.0], [587.0, 98.0], [579.0, 99.0], [601.0, 99.0], [611.0, 22.0], [630.0, 95.0], [623.0, 98.0], [618.0, 98.0], [627.0, 98.0], [649.0, 29.0], [663.0, 90.0], [674.0, 23.0], [689.0, 64.0], [678.0, 75.0], [676.0, 95.0], [748.0, 78.0], [747.0, 86.0], [764.0, 86.0], [743.0, 88.0], [796.0, 84.0], [788.0, 84.0], [799.0, 84.0], [784.0, 84.0], [787.0, 85.0], [795.0, 83.0], [797.0, 83.0], [794.0, 84.0], [798.0, 84.0], [789.0, 84.0], [791.0, 84.0], [774.0, 83.0], [792.0, 84.0], [793.0, 84.0], [782.0, 83.5], [779.0, 84.0], [800.0, 82.0], [828.0, 79.0], [808.0, 82.0], [810.0, 82.0], [816.0, 81.0], [814.0, 81.0], [812.0, 83.0], [813.0, 83.0], [805.0, 83.0], [803.0, 82.0], [802.0, 83.0], [804.0, 83.0], [824.0, 81.0], [826.0, 82.0], [818.0, 82.0], [861.0, 76.0], [852.0, 81.0], [855.0, 79.0], [843.0, 79.0], [853.0, 78.0], [862.0, 81.0], [851.0, 76.5], [846.0, 82.0], [847.0, 79.0], [859.0, 78.0], [844.0, 78.0], [878.0, 78.0], [884.0, 69.0], [895.0, 76.0], [900.0, 73.0], [909.0, 78.0], [910.0, 74.0], [918.0, 63.0], [898.0, 73.0], [896.0, 71.0], [919.0, 68.0], [920.0, 72.5], [926.0, 67.5], [941.0, 65.0], [937.0, 57.0], [959.0, 66.0], [957.0, 60.0], [989.0, 58.0], [981.0, 66.0], [966.0, 59.0], [984.0, 60.0], [962.0, 59.5], [982.0, 64.0], [963.0, 60.0], [1023.0, 46.0], [1022.0, 51.0], [1015.0, 47.0], [1014.0, 48.5], [994.0, 50.0], [1011.0, 49.0], [1000.0, 59.0], [992.0, 55.0], [1041.0, 47.0], [1058.0, 46.0], [1056.0, 50.0], [1040.0, 52.0], [1072.0, 43.0], [1071.0, 47.0], [1078.0, 42.0], [1064.0, 44.0], [1088.0, 43.0], [1132.0, 44.0], [1124.0, 41.0], [1110.0, 42.0], [1094.0, 43.0], [1161.0, 43.0], [1171.0, 40.0], [1173.0, 42.0], [1192.0, 40.0], [1199.0, 38.0], [1259.0, 37.0], [1237.0, 38.0], [1252.0, 37.0], [1248.0, 37.0], [1231.0, 37.0], [1336.0, 35.0], [1326.0, 35.0], [1294.0, 39.0], [1318.0, 36.0], [1312.0, 40.0], [1331.0, 37.0], [1330.0, 36.0], [1370.0, 36.0], [1359.0, 37.0], [1369.0, 36.0], [1377.0, 37.0], [1424.0, 35.0], [1505.0, 35.0], [1476.0, 34.0], [1649.0, 34.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1649.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 5.85, "minX": 1.79326374E12, "maxY": 988.85, "series": [{"data": [[1.79326374E12, 5.85], [1.79326404E12, 865.7], [1.79326386E12, 472.3], [1.79326398E12, 988.85], [1.7932638E12, 376.85], [1.79326392E12, 786.7333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326404E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 5.783333333333333, "minX": 1.79326374E12, "maxY": 988.85, "series": [{"data": [[1.79326374E12, 5.783333333333333], [1.79326404E12, 866.7], [1.79326386E12, 472.3], [1.79326398E12, 988.85], [1.7932638E12, 375.9166666666667], [1.79326392E12, 786.7333333333333]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326404E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 5.783333333333333, "minX": 1.79326374E12, "maxY": 988.85, "series": [{"data": [[1.79326374E12, 5.783333333333333], [1.79326404E12, 866.7], [1.79326386E12, 472.3], [1.79326398E12, 988.85], [1.7932638E12, 375.9166666666667], [1.79326392E12, 786.7333333333333]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326404E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 5.783333333333333, "minX": 1.79326374E12, "maxY": 988.85, "series": [{"data": [[1.79326374E12, 5.783333333333333], [1.79326404E12, 866.7], [1.79326386E12, 472.3], [1.79326398E12, 988.85], [1.7932638E12, 375.9166666666667], [1.79326392E12, 786.7333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326404E12, "title": "Total Transactions Per Second"}},
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

