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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 484.0, "series": [{"data": [[0.0, 1.0], [0.1, 4.0], [0.2, 4.0], [0.3, 5.0], [0.4, 5.0], [0.5, 5.0], [0.6, 6.0], [0.7, 6.0], [0.8, 6.0], [0.9, 6.0], [1.0, 7.0], [1.1, 7.0], [1.2, 7.0], [1.3, 7.0], [1.4, 7.0], [1.5, 7.0], [1.6, 7.0], [1.7, 7.0], [1.8, 8.0], [1.9, 8.0], [2.0, 8.0], [2.1, 8.0], [2.2, 8.0], [2.3, 8.0], [2.4, 8.0], [2.5, 8.0], [2.6, 8.0], [2.7, 9.0], [2.8, 9.0], [2.9, 9.0], [3.0, 9.0], [3.1, 9.0], [3.2, 9.0], [3.3, 9.0], [3.4, 9.0], [3.5, 9.0], [3.6, 9.0], [3.7, 9.0], [3.8, 10.0], [3.9, 10.0], [4.0, 10.0], [4.1, 10.0], [4.2, 10.0], [4.3, 10.0], [4.4, 10.0], [4.5, 10.0], [4.6, 10.0], [4.7, 10.0], [4.8, 10.0], [4.9, 10.0], [5.0, 11.0], [5.1, 11.0], [5.2, 11.0], [5.3, 11.0], [5.4, 11.0], [5.5, 11.0], [5.6, 11.0], [5.7, 11.0], [5.8, 11.0], [5.9, 11.0], [6.0, 11.0], [6.1, 11.0], [6.2, 11.0], [6.3, 11.0], [6.4, 11.0], [6.5, 12.0], [6.6, 12.0], [6.7, 12.0], [6.8, 12.0], [6.9, 12.0], [7.0, 12.0], [7.1, 12.0], [7.2, 12.0], [7.3, 12.0], [7.4, 12.0], [7.5, 12.0], [7.6, 12.0], [7.7, 12.0], [7.8, 12.0], [7.9, 13.0], [8.0, 13.0], [8.1, 13.0], [8.2, 13.0], [8.3, 13.0], [8.4, 13.0], [8.5, 13.0], [8.6, 13.0], [8.7, 13.0], [8.8, 13.0], [8.9, 13.0], [9.0, 13.0], [9.1, 13.0], [9.2, 13.0], [9.3, 13.0], [9.4, 13.0], [9.5, 14.0], [9.6, 14.0], [9.7, 14.0], [9.8, 14.0], [9.9, 14.0], [10.0, 14.0], [10.1, 14.0], [10.2, 14.0], [10.3, 14.0], [10.4, 14.0], [10.5, 14.0], [10.6, 14.0], [10.7, 14.0], [10.8, 14.0], [10.9, 14.0], [11.0, 15.0], [11.1, 15.0], [11.2, 15.0], [11.3, 15.0], [11.4, 15.0], [11.5, 15.0], [11.6, 15.0], [11.7, 15.0], [11.8, 15.0], [11.9, 15.0], [12.0, 15.0], [12.1, 15.0], [12.2, 15.0], [12.3, 15.0], [12.4, 15.0], [12.5, 15.0], [12.6, 16.0], [12.7, 16.0], [12.8, 16.0], [12.9, 16.0], [13.0, 16.0], [13.1, 16.0], [13.2, 16.0], [13.3, 16.0], [13.4, 16.0], [13.5, 16.0], [13.6, 16.0], [13.7, 16.0], [13.8, 16.0], [13.9, 16.0], [14.0, 16.0], [14.1, 16.0], [14.2, 16.0], [14.3, 17.0], [14.4, 17.0], [14.5, 17.0], [14.6, 17.0], [14.7, 17.0], [14.8, 17.0], [14.9, 17.0], [15.0, 17.0], [15.1, 17.0], [15.2, 17.0], [15.3, 17.0], [15.4, 17.0], [15.5, 17.0], [15.6, 17.0], [15.7, 17.0], [15.8, 17.0], [15.9, 18.0], [16.0, 18.0], [16.1, 18.0], [16.2, 18.0], [16.3, 18.0], [16.4, 18.0], [16.5, 18.0], [16.6, 18.0], [16.7, 18.0], [16.8, 18.0], [16.9, 18.0], [17.0, 18.0], [17.1, 18.0], [17.2, 18.0], [17.3, 18.0], [17.4, 19.0], [17.5, 19.0], [17.6, 19.0], [17.7, 19.0], [17.8, 19.0], [17.9, 19.0], [18.0, 19.0], [18.1, 19.0], [18.2, 19.0], [18.3, 19.0], [18.4, 19.0], [18.5, 19.0], [18.6, 19.0], [18.7, 19.0], [18.8, 19.0], [18.9, 19.0], [19.0, 20.0], [19.1, 20.0], [19.2, 20.0], [19.3, 20.0], [19.4, 20.0], [19.5, 20.0], [19.6, 20.0], [19.7, 20.0], [19.8, 20.0], [19.9, 20.0], [20.0, 20.0], [20.1, 20.0], [20.2, 20.0], [20.3, 20.0], [20.4, 20.0], [20.5, 21.0], [20.6, 21.0], [20.7, 21.0], [20.8, 21.0], [20.9, 21.0], [21.0, 21.0], [21.1, 21.0], [21.2, 21.0], [21.3, 21.0], [21.4, 21.0], [21.5, 21.0], [21.6, 21.0], [21.7, 21.0], [21.8, 22.0], [21.9, 22.0], [22.0, 22.0], [22.1, 22.0], [22.2, 22.0], [22.3, 22.0], [22.4, 22.0], [22.5, 22.0], [22.6, 22.0], [22.7, 22.0], [22.8, 22.0], [22.9, 22.0], [23.0, 22.0], [23.1, 23.0], [23.2, 23.0], [23.3, 23.0], [23.4, 23.0], [23.5, 23.0], [23.6, 23.0], [23.7, 23.0], [23.8, 23.0], [23.9, 23.0], [24.0, 23.0], [24.1, 23.0], [24.2, 23.0], [24.3, 24.0], [24.4, 24.0], [24.5, 24.0], [24.6, 24.0], [24.7, 24.0], [24.8, 24.0], [24.9, 24.0], [25.0, 24.0], [25.1, 24.0], [25.2, 24.0], [25.3, 24.0], [25.4, 24.0], [25.5, 25.0], [25.6, 25.0], [25.7, 25.0], [25.8, 25.0], [25.9, 25.0], [26.0, 25.0], [26.1, 25.0], [26.2, 25.0], [26.3, 25.0], [26.4, 25.0], [26.5, 25.0], [26.6, 25.0], [26.7, 26.0], [26.8, 26.0], [26.9, 26.0], [27.0, 26.0], [27.1, 26.0], [27.2, 26.0], [27.3, 26.0], [27.4, 26.0], [27.5, 26.0], [27.6, 26.0], [27.7, 26.0], [27.8, 27.0], [27.9, 27.0], [28.0, 27.0], [28.1, 27.0], [28.2, 27.0], [28.3, 27.0], [28.4, 27.0], [28.5, 27.0], [28.6, 27.0], [28.7, 28.0], [28.8, 28.0], [28.9, 28.0], [29.0, 28.0], [29.1, 28.0], [29.2, 28.0], [29.3, 28.0], [29.4, 28.0], [29.5, 28.0], [29.6, 28.0], [29.7, 29.0], [29.8, 29.0], [29.9, 29.0], [30.0, 29.0], [30.1, 29.0], [30.2, 29.0], [30.3, 29.0], [30.4, 29.0], [30.5, 29.0], [30.6, 30.0], [30.7, 30.0], [30.8, 30.0], [30.9, 30.0], [31.0, 30.0], [31.1, 30.0], [31.2, 30.0], [31.3, 30.0], [31.4, 31.0], [31.5, 31.0], [31.6, 31.0], [31.7, 31.0], [31.8, 31.0], [31.9, 31.0], [32.0, 31.0], [32.1, 31.0], [32.2, 32.0], [32.3, 32.0], [32.4, 32.0], [32.5, 32.0], [32.6, 32.0], [32.7, 32.0], [32.8, 32.0], [32.9, 32.0], [33.0, 33.0], [33.1, 33.0], [33.2, 33.0], [33.3, 33.0], [33.4, 33.0], [33.5, 33.0], [33.6, 33.0], [33.7, 34.0], [33.8, 34.0], [33.9, 34.0], [34.0, 34.0], [34.1, 34.0], [34.2, 34.0], [34.3, 34.0], [34.4, 35.0], [34.5, 35.0], [34.6, 35.0], [34.7, 35.0], [34.8, 35.0], [34.9, 35.0], [35.0, 36.0], [35.1, 36.0], [35.2, 36.0], [35.3, 36.0], [35.4, 36.0], [35.5, 36.0], [35.6, 37.0], [35.7, 37.0], [35.8, 37.0], [35.9, 37.0], [36.0, 37.0], [36.1, 37.0], [36.2, 38.0], [36.3, 38.0], [36.4, 38.0], [36.5, 38.0], [36.6, 38.0], [36.7, 39.0], [36.8, 39.0], [36.9, 39.0], [37.0, 39.0], [37.1, 39.0], [37.2, 40.0], [37.3, 40.0], [37.4, 40.0], [37.5, 40.0], [37.6, 40.0], [37.7, 41.0], [37.8, 41.0], [37.9, 41.0], [38.0, 41.0], [38.1, 42.0], [38.2, 42.0], [38.3, 42.0], [38.4, 42.0], [38.5, 43.0], [38.6, 43.0], [38.7, 43.0], [38.8, 44.0], [38.9, 44.0], [39.0, 44.0], [39.1, 44.0], [39.2, 45.0], [39.3, 45.0], [39.4, 45.0], [39.5, 46.0], [39.6, 46.0], [39.7, 46.0], [39.8, 47.0], [39.9, 47.0], [40.0, 47.0], [40.1, 48.0], [40.2, 48.0], [40.3, 48.0], [40.4, 49.0], [40.5, 49.0], [40.6, 50.0], [40.7, 50.0], [40.8, 50.0], [40.9, 51.0], [41.0, 51.0], [41.1, 51.0], [41.2, 52.0], [41.3, 52.0], [41.4, 52.0], [41.5, 53.0], [41.6, 53.0], [41.7, 53.0], [41.8, 54.0], [41.9, 54.0], [42.0, 54.0], [42.1, 55.0], [42.2, 55.0], [42.3, 55.0], [42.4, 56.0], [42.5, 56.0], [42.6, 56.0], [42.7, 56.0], [42.8, 57.0], [42.9, 57.0], [43.0, 57.0], [43.1, 58.0], [43.2, 58.0], [43.3, 58.0], [43.4, 58.0], [43.5, 58.0], [43.6, 59.0], [43.7, 59.0], [43.8, 59.0], [43.9, 59.0], [44.0, 60.0], [44.1, 60.0], [44.2, 60.0], [44.3, 60.0], [44.4, 60.0], [44.5, 61.0], [44.6, 61.0], [44.7, 61.0], [44.8, 61.0], [44.9, 61.0], [45.0, 62.0], [45.1, 62.0], [45.2, 62.0], [45.3, 62.0], [45.4, 62.0], [45.5, 62.0], [45.6, 63.0], [45.7, 63.0], [45.8, 63.0], [45.9, 63.0], [46.0, 63.0], [46.1, 63.0], [46.2, 64.0], [46.3, 64.0], [46.4, 64.0], [46.5, 64.0], [46.6, 64.0], [46.7, 64.0], [46.8, 65.0], [46.9, 65.0], [47.0, 65.0], [47.1, 65.0], [47.2, 65.0], [47.3, 65.0], [47.4, 66.0], [47.5, 66.0], [47.6, 66.0], [47.7, 66.0], [47.8, 66.0], [47.9, 66.0], [48.0, 66.0], [48.1, 67.0], [48.2, 67.0], [48.3, 67.0], [48.4, 67.0], [48.5, 67.0], [48.6, 67.0], [48.7, 67.0], [48.8, 68.0], [48.9, 68.0], [49.0, 68.0], [49.1, 68.0], [49.2, 68.0], [49.3, 68.0], [49.4, 68.0], [49.5, 68.0], [49.6, 69.0], [49.7, 69.0], [49.8, 69.0], [49.9, 69.0], [50.0, 69.0], [50.1, 69.0], [50.2, 69.0], [50.3, 70.0], [50.4, 70.0], [50.5, 70.0], [50.6, 70.0], [50.7, 70.0], [50.8, 70.0], [50.9, 70.0], [51.0, 70.0], [51.1, 71.0], [51.2, 71.0], [51.3, 71.0], [51.4, 71.0], [51.5, 71.0], [51.6, 71.0], [51.7, 71.0], [51.8, 71.0], [51.9, 72.0], [52.0, 72.0], [52.1, 72.0], [52.2, 72.0], [52.3, 72.0], [52.4, 72.0], [52.5, 72.0], [52.6, 72.0], [52.7, 72.0], [52.8, 73.0], [52.9, 73.0], [53.0, 73.0], [53.1, 73.0], [53.2, 73.0], [53.3, 73.0], [53.4, 73.0], [53.5, 73.0], [53.6, 73.0], [53.7, 74.0], [53.8, 74.0], [53.9, 74.0], [54.0, 74.0], [54.1, 74.0], [54.2, 74.0], [54.3, 74.0], [54.4, 74.0], [54.5, 74.0], [54.6, 75.0], [54.7, 75.0], [54.8, 75.0], [54.9, 75.0], [55.0, 75.0], [55.1, 75.0], [55.2, 75.0], [55.3, 75.0], [55.4, 75.0], [55.5, 75.0], [55.6, 76.0], [55.7, 76.0], [55.8, 76.0], [55.9, 76.0], [56.0, 76.0], [56.1, 76.0], [56.2, 76.0], [56.3, 76.0], [56.4, 76.0], [56.5, 77.0], [56.6, 77.0], [56.7, 77.0], [56.8, 77.0], [56.9, 77.0], [57.0, 77.0], [57.1, 77.0], [57.2, 77.0], [57.3, 77.0], [57.4, 78.0], [57.5, 78.0], [57.6, 78.0], [57.7, 78.0], [57.8, 78.0], [57.9, 78.0], [58.0, 78.0], [58.1, 78.0], [58.2, 78.0], [58.3, 78.0], [58.4, 79.0], [58.5, 79.0], [58.6, 79.0], [58.7, 79.0], [58.8, 79.0], [58.9, 79.0], [59.0, 79.0], [59.1, 79.0], [59.2, 79.0], [59.3, 79.0], [59.4, 80.0], [59.5, 80.0], [59.6, 80.0], [59.7, 80.0], [59.8, 80.0], [59.9, 80.0], [60.0, 80.0], [60.1, 80.0], [60.2, 80.0], [60.3, 80.0], [60.4, 80.0], [60.5, 81.0], [60.6, 81.0], [60.7, 81.0], [60.8, 81.0], [60.9, 81.0], [61.0, 81.0], [61.1, 81.0], [61.2, 81.0], [61.3, 81.0], [61.4, 81.0], [61.5, 81.0], [61.6, 82.0], [61.7, 82.0], [61.8, 82.0], [61.9, 82.0], [62.0, 82.0], [62.1, 82.0], [62.2, 82.0], [62.3, 82.0], [62.4, 82.0], [62.5, 82.0], [62.6, 82.0], [62.7, 83.0], [62.8, 83.0], [62.9, 83.0], [63.0, 83.0], [63.1, 83.0], [63.2, 83.0], [63.3, 83.0], [63.4, 83.0], [63.5, 83.0], [63.6, 83.0], [63.7, 83.0], [63.8, 84.0], [63.9, 84.0], [64.0, 84.0], [64.1, 84.0], [64.2, 84.0], [64.3, 84.0], [64.4, 84.0], [64.5, 84.0], [64.6, 84.0], [64.7, 84.0], [64.8, 84.0], [64.9, 85.0], [65.0, 85.0], [65.1, 85.0], [65.2, 85.0], [65.3, 85.0], [65.4, 85.0], [65.5, 85.0], [65.6, 85.0], [65.7, 85.0], [65.8, 85.0], [65.9, 85.0], [66.0, 85.0], [66.1, 86.0], [66.2, 86.0], [66.3, 86.0], [66.4, 86.0], [66.5, 86.0], [66.6, 86.0], [66.7, 86.0], [66.8, 86.0], [66.9, 86.0], [67.0, 86.0], [67.1, 86.0], [67.2, 86.0], [67.3, 87.0], [67.4, 87.0], [67.5, 87.0], [67.6, 87.0], [67.7, 87.0], [67.8, 87.0], [67.9, 87.0], [68.0, 87.0], [68.1, 87.0], [68.2, 87.0], [68.3, 87.0], [68.4, 87.0], [68.5, 88.0], [68.6, 88.0], [68.7, 88.0], [68.8, 88.0], [68.9, 88.0], [69.0, 88.0], [69.1, 88.0], [69.2, 88.0], [69.3, 88.0], [69.4, 88.0], [69.5, 88.0], [69.6, 88.0], [69.7, 89.0], [69.8, 89.0], [69.9, 89.0], [70.0, 89.0], [70.1, 89.0], [70.2, 89.0], [70.3, 89.0], [70.4, 89.0], [70.5, 89.0], [70.6, 89.0], [70.7, 89.0], [70.8, 89.0], [70.9, 90.0], [71.0, 90.0], [71.1, 90.0], [71.2, 90.0], [71.3, 90.0], [71.4, 90.0], [71.5, 90.0], [71.6, 90.0], [71.7, 90.0], [71.8, 90.0], [71.9, 90.0], [72.0, 90.0], [72.1, 91.0], [72.2, 91.0], [72.3, 91.0], [72.4, 91.0], [72.5, 91.0], [72.6, 91.0], [72.7, 91.0], [72.8, 91.0], [72.9, 91.0], [73.0, 91.0], [73.1, 91.0], [73.2, 91.0], [73.3, 91.0], [73.4, 92.0], [73.5, 92.0], [73.6, 92.0], [73.7, 92.0], [73.8, 92.0], [73.9, 92.0], [74.0, 92.0], [74.1, 92.0], [74.2, 92.0], [74.3, 92.0], [74.4, 92.0], [74.5, 93.0], [74.6, 93.0], [74.7, 93.0], [74.8, 93.0], [74.9, 93.0], [75.0, 93.0], [75.1, 93.0], [75.2, 93.0], [75.3, 93.0], [75.4, 93.0], [75.5, 93.0], [75.6, 93.0], [75.7, 94.0], [75.8, 94.0], [75.9, 94.0], [76.0, 94.0], [76.1, 94.0], [76.2, 94.0], [76.3, 94.0], [76.4, 94.0], [76.5, 94.0], [76.6, 94.0], [76.7, 94.0], [76.8, 95.0], [76.9, 95.0], [77.0, 95.0], [77.1, 95.0], [77.2, 95.0], [77.3, 95.0], [77.4, 95.0], [77.5, 95.0], [77.6, 95.0], [77.7, 95.0], [77.8, 95.0], [77.9, 95.0], [78.0, 96.0], [78.1, 96.0], [78.2, 96.0], [78.3, 96.0], [78.4, 96.0], [78.5, 96.0], [78.6, 96.0], [78.7, 96.0], [78.8, 96.0], [78.9, 96.0], [79.0, 96.0], [79.1, 97.0], [79.2, 97.0], [79.3, 97.0], [79.4, 97.0], [79.5, 97.0], [79.6, 97.0], [79.7, 97.0], [79.8, 97.0], [79.9, 97.0], [80.0, 97.0], [80.1, 98.0], [80.2, 98.0], [80.3, 98.0], [80.4, 98.0], [80.5, 98.0], [80.6, 98.0], [80.7, 98.0], [80.8, 98.0], [80.9, 98.0], [81.0, 98.0], [81.1, 98.0], [81.2, 99.0], [81.3, 99.0], [81.4, 99.0], [81.5, 99.0], [81.6, 99.0], [81.7, 99.0], [81.8, 99.0], [81.9, 99.0], [82.0, 99.0], [82.1, 99.0], [82.2, 100.0], [82.3, 100.0], [82.4, 100.0], [82.5, 100.0], [82.6, 100.0], [82.7, 100.0], [82.8, 100.0], [82.9, 100.0], [83.0, 100.0], [83.1, 100.0], [83.2, 101.0], [83.3, 101.0], [83.4, 101.0], [83.5, 101.0], [83.6, 101.0], [83.7, 101.0], [83.8, 101.0], [83.9, 101.0], [84.0, 101.0], [84.1, 102.0], [84.2, 102.0], [84.3, 102.0], [84.4, 102.0], [84.5, 102.0], [84.6, 102.0], [84.7, 102.0], [84.8, 102.0], [84.9, 102.0], [85.0, 103.0], [85.1, 103.0], [85.2, 103.0], [85.3, 103.0], [85.4, 103.0], [85.5, 103.0], [85.6, 103.0], [85.7, 103.0], [85.8, 104.0], [85.9, 104.0], [86.0, 104.0], [86.1, 104.0], [86.2, 104.0], [86.3, 104.0], [86.4, 104.0], [86.5, 104.0], [86.6, 105.0], [86.7, 105.0], [86.8, 105.0], [86.9, 105.0], [87.0, 105.0], [87.1, 105.0], [87.2, 106.0], [87.3, 106.0], [87.4, 106.0], [87.5, 106.0], [87.6, 106.0], [87.7, 106.0], [87.8, 106.0], [87.9, 107.0], [88.0, 107.0], [88.1, 107.0], [88.2, 107.0], [88.3, 107.0], [88.4, 107.0], [88.5, 108.0], [88.6, 108.0], [88.7, 108.0], [88.8, 108.0], [88.9, 108.0], [89.0, 109.0], [89.1, 109.0], [89.2, 109.0], [89.3, 109.0], [89.4, 109.0], [89.5, 110.0], [89.6, 110.0], [89.7, 110.0], [89.8, 110.0], [89.9, 111.0], [90.0, 111.0], [90.1, 111.0], [90.2, 111.0], [90.3, 112.0], [90.4, 112.0], [90.5, 112.0], [90.6, 112.0], [90.7, 113.0], [90.8, 113.0], [90.9, 113.0], [91.0, 113.0], [91.1, 114.0], [91.2, 114.0], [91.3, 114.0], [91.4, 115.0], [91.5, 115.0], [91.6, 115.0], [91.7, 115.0], [91.8, 116.0], [91.9, 116.0], [92.0, 117.0], [92.1, 117.0], [92.2, 117.0], [92.3, 118.0], [92.4, 118.0], [92.5, 119.0], [92.6, 119.0], [92.7, 120.0], [92.8, 120.0], [92.9, 121.0], [93.0, 121.0], [93.1, 122.0], [93.2, 123.0], [93.3, 123.0], [93.4, 124.0], [93.5, 125.0], [93.6, 126.0], [93.7, 127.0], [93.8, 128.0], [93.9, 129.0], [94.0, 131.0], [94.1, 132.0], [94.2, 134.0], [94.3, 137.0], [94.4, 142.0], [94.5, 148.0], [94.6, 151.0], [94.7, 153.0], [94.8, 155.0], [94.9, 157.0], [95.0, 158.0], [95.1, 159.0], [95.2, 161.0], [95.3, 162.0], [95.4, 163.0], [95.5, 164.0], [95.6, 165.0], [95.7, 165.0], [95.8, 166.0], [95.9, 167.0], [96.0, 168.0], [96.1, 169.0], [96.2, 170.0], [96.3, 171.0], [96.4, 171.0], [96.5, 172.0], [96.6, 173.0], [96.7, 174.0], [96.8, 175.0], [96.9, 176.0], [97.0, 176.0], [97.1, 177.0], [97.2, 178.0], [97.3, 179.0], [97.4, 180.0], [97.5, 181.0], [97.6, 182.0], [97.7, 183.0], [97.8, 184.0], [97.9, 185.0], [98.0, 186.0], [98.1, 187.0], [98.2, 188.0], [98.3, 189.0], [98.4, 190.0], [98.5, 192.0], [98.6, 193.0], [98.7, 194.0], [98.8, 196.0], [98.9, 197.0], [99.0, 199.0], [99.1, 201.0], [99.2, 203.0], [99.3, 205.0], [99.4, 208.0], [99.5, 212.0], [99.6, 218.0], [99.7, 234.0], [99.8, 272.0], [99.9, 287.0], [100.0, 484.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 9.0, "minX": 0.0, "maxY": 201743.0, "series": [{"data": [[0.0, 201743.0], [300.0, 102.0], [100.0, 41331.0], [200.0, 2275.0], [400.0, 9.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 245460.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 245460.0, "series": [{"data": [[0.0, 245460.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 4.9E-324, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 11.330591630591611, "minX": 1.79326248E12, "maxY": 60.0, "series": [{"data": [[1.79326278E12, 59.94750123701139], [1.7932626E12, 60.0], [1.79326272E12, 60.0], [1.79326254E12, 45.54603531051585], [1.79326266E12, 60.0], [1.79326248E12, 11.330591630591611]], "isOverall": false, "label": "Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326278E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 9.270588235294118, "minX": 1.0, "maxY": 72.03221776349575, "series": [{"data": [[2.0, 13.083870967741936], [3.0, 15.715053763440865], [4.0, 16.4453781512605], [5.0, 20.398340248962647], [6.0, 19.22884012539186], [7.0, 22.863192182410437], [8.0, 25.362776025236606], [9.0, 23.58530183727032], [10.0, 21.387096774193544], [11.0, 21.864000000000015], [12.0, 20.210000000000022], [13.0, 24.26465028355389], [14.0, 25.71508379888269], [15.0, 23.7595541401274], [16.0, 25.352180936995175], [17.0, 26.16984126984125], [18.0, 27.44496124031009], [19.0, 26.35814606741574], [20.0, 29.25584795321637], [21.0, 27.974043715847], [22.0, 31.552301255230162], [23.0, 30.39494680851064], [24.0, 31.193931398416858], [25.0, 29.539644970414205], [26.0, 29.937788018433157], [27.0, 33.22441430332925], [28.0, 34.798507462686565], [29.0, 35.79531442663377], [30.0, 33.9816513761468], [31.0, 41.9865951742627], [32.0, 43.50879566982412], [33.0, 50.86976744186044], [34.0, 38.366628830874035], [35.0, 36.28409090909096], [36.0, 37.04761904761902], [37.0, 40.001089324618704], [38.0, 41.36550976138825], [39.0, 40.17131062951501], [40.0, 40.84086242299793], [41.0, 40.05859374999999], [42.0, 44.49946977730648], [43.0, 47.97544642857144], [44.0, 46.2109795479009], [45.0, 52.28621089223636], [46.0, 51.975945017182134], [47.0, 50.095440084835694], [48.0, 46.4616096207215], [49.0, 46.46132075471693], [50.0, 47.663117134559506], [51.0, 67.47327249022173], [52.0, 45.16826503923282], [53.0, 45.96651982378853], [54.0, 45.04849498327765], [55.0, 45.305901911886956], [56.0, 46.32409739714525], [57.0, 48.55189873417723], [58.0, 48.204030226700205], [59.0, 49.590797041906306], [60.0, 72.03221776349575], [1.0, 9.270588235294118]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[55.57551128493356, 65.92012547869531]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 60.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 15246.0, "minX": 1.79326248E12, "maxY": 214722.11666666667, "series": [{"data": [[1.79326278E12, 156957.6], [1.7932626E12, 183714.7], [1.79326272E12, 214722.11666666667], [1.79326254E12, 200591.66666666666], [1.79326266E12, 170148.41666666666], [1.79326248E12, 26906.833333333332]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.79326278E12, 88924.0], [1.7932626E12, 104090.8], [1.79326272E12, 121679.8], [1.79326254E12, 113643.2], [1.79326266E12, 96428.2], [1.79326248E12, 15246.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326278E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 22.590476190476167, "minX": 1.79326248E12, "maxY": 82.06867285711024, "series": [{"data": [[1.79326278E12, 62.905022266205016], [1.7932626E12, 75.89776810246491], [1.79326272E12, 64.95577573270141], [1.79326254E12, 52.28362629704174], [1.79326266E12, 82.06867285711024], [1.79326248E12, 22.590476190476167]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326278E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 22.5780663780664, "minX": 1.79326248E12, "maxY": 82.06109830941557, "series": [{"data": [[1.79326278E12, 62.89831766452259], [1.7932626E12, 75.89115272435173], [1.79326272E12, 64.94955613010491], [1.79326254E12, 52.27898017655288], [1.79326266E12, 82.06109830941557], [1.79326248E12, 22.5780663780664]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326278E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 8.130710856434895E-4, "minX": 1.79326248E12, "maxY": 0.00851370851370854, "series": [{"data": [[1.79326278E12, 0.0016328550222661892], [1.7932626E12, 0.0021980809062856575], [1.79326272E12, 0.002079227612142659], [1.79326254E12, 8.130710856434895E-4], [1.79326266E12, 0.0017795624101663249], [1.79326248E12, 0.00851370851370854]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326278E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.79326248E12, "maxY": 484.0, "series": [{"data": [[1.79326278E12, 269.0], [1.7932626E12, 484.0], [1.79326272E12, 284.0], [1.79326254E12, 392.0], [1.79326266E12, 379.0], [1.79326248E12, 105.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.79326278E12, 102.0], [1.7932626E12, 185.0], [1.79326272E12, 102.0], [1.79326254E12, 123.0], [1.79326266E12, 103.0], [1.79326248E12, 64.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.79326278E12, 171.0], [1.7932626E12, 278.0], [1.79326272E12, 164.0], [1.79326254E12, 210.0], [1.79326266E12, 170.0], [1.79326248E12, 78.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.79326278E12, 112.0], [1.7932626E12, 199.0], [1.79326272E12, 112.0], [1.79326254E12, 176.0], [1.79326266E12, 114.0], [1.79326248E12, 70.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.79326278E12, 1.0], [1.7932626E12, 3.0], [1.79326272E12, 2.0], [1.79326254E12, 1.0], [1.79326266E12, 3.0], [1.79326248E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.79326278E12, 64.0], [1.7932626E12, 92.0], [1.79326272E12, 71.0], [1.79326254E12, 68.0], [1.79326266E12, 71.0], [1.79326248E12, 12.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326278E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 8.0, "minX": 6.0, "maxY": 194.0, "series": [{"data": [[6.0, 11.0], [116.0, 8.0], [178.0, 8.0], [197.0, 8.0], [246.0, 9.0], [254.0, 10.5], [298.0, 11.0], [290.0, 194.0], [322.0, 9.0], [342.0, 12.0], [394.0, 11.0], [389.0, 172.0], [415.0, 160.0], [408.0, 117.0], [424.0, 123.0], [429.0, 124.0], [421.0, 116.0], [444.0, 115.5], [446.0, 115.0], [436.0, 69.0], [452.0, 117.0], [457.0, 116.0], [470.0, 111.0], [474.0, 111.0], [472.0, 111.5], [467.0, 110.0], [466.0, 112.0], [485.0, 105.0], [490.0, 110.0], [483.0, 108.0], [480.0, 110.0], [489.0, 107.0], [482.0, 109.0], [488.0, 108.0], [505.0, 10.0], [496.0, 110.0], [504.0, 102.0], [497.0, 107.0], [498.0, 109.0], [510.0, 108.0], [501.0, 103.0], [511.0, 108.0], [518.0, 15.0], [540.0, 55.0], [522.0, 103.0], [515.0, 107.0], [524.0, 105.0], [557.0, 11.0], [569.0, 100.0], [561.0, 102.0], [555.0, 106.0], [565.0, 103.0], [562.0, 102.0], [558.0, 100.0], [564.0, 102.0], [601.0, 13.0], [584.0, 12.0], [591.0, 98.0], [577.0, 99.0], [602.0, 97.0], [594.0, 95.0], [581.0, 101.0], [600.0, 99.0], [604.0, 101.0], [598.0, 94.0], [605.0, 97.0], [635.0, 14.0], [637.0, 14.0], [611.0, 93.0], [639.0, 91.0], [660.0, 40.0], [666.0, 93.0], [686.0, 35.0], [680.0, 83.0], [691.0, 86.0], [688.0, 81.0], [701.0, 94.0], [682.0, 93.0], [705.0, 20.0], [719.0, 15.0], [734.0, 19.0], [735.0, 87.0], [718.0, 83.0], [729.0, 88.0], [712.0, 90.0], [709.0, 84.0], [722.0, 89.0], [743.0, 18.0], [740.0, 17.5], [736.0, 17.0], [746.0, 86.0], [757.0, 83.0], [756.0, 87.0], [754.0, 87.0], [758.0, 85.0], [738.0, 84.0], [742.0, 86.0], [753.0, 87.0], [760.0, 83.0], [764.0, 82.5], [767.0, 85.0], [765.0, 86.0], [737.0, 89.0], [770.0, 78.0], [790.0, 20.0], [789.0, 84.0], [791.0, 83.0], [779.0, 80.0], [797.0, 82.0], [785.0, 82.0], [775.0, 85.0], [774.0, 84.0], [792.0, 82.0], [778.0, 84.0], [776.0, 82.0], [777.0, 83.0], [788.0, 83.0], [772.0, 85.0], [771.0, 83.0], [768.0, 83.0], [769.0, 84.0], [781.0, 85.0], [780.0, 85.0], [782.0, 85.0], [783.0, 83.0], [773.0, 83.0], [804.0, 82.0], [817.0, 23.0], [819.0, 23.0], [830.0, 74.0], [808.0, 82.5], [810.0, 85.0], [801.0, 81.0], [824.0, 79.0], [823.0, 80.0], [840.0, 19.0], [854.0, 75.0], [863.0, 69.0], [847.0, 78.0], [858.0, 77.5], [844.0, 73.0], [849.0, 81.0], [868.0, 72.0], [873.0, 19.0], [887.0, 18.0], [888.0, 63.0], [876.0, 75.0], [870.0, 75.0], [883.0, 61.0], [893.0, 74.0], [871.0, 80.0], [927.0, 66.0], [900.0, 23.0], [908.0, 74.0], [902.0, 60.0], [916.0, 25.0], [915.0, 67.0], [922.0, 31.0], [923.0, 74.0], [917.0, 60.0], [914.0, 73.0], [920.0, 74.0], [933.0, 69.0], [959.0, 38.0], [946.0, 32.0], [938.0, 71.0], [935.0, 73.0], [930.0, 77.5], [931.0, 75.0], [942.0, 68.0], [950.0, 71.0], [958.0, 72.0], [953.0, 70.0], [947.0, 72.0], [984.0, 63.0], [986.0, 24.0], [965.0, 66.0], [967.0, 74.0], [966.0, 67.0], [979.0, 56.0], [971.0, 74.0], [962.0, 70.0], [977.0, 64.0], [981.0, 63.0], [998.0, 24.0], [1002.0, 19.5], [999.0, 60.0], [1007.0, 67.0], [992.0, 67.0], [1009.0, 64.0], [1001.0, 65.0], [996.0, 62.0], [993.0, 70.0], [1018.0, 63.5], [1023.0, 70.0], [1032.0, 31.5], [1031.0, 41.0], [1087.0, 28.0], [1035.0, 53.0], [1027.0, 59.0], [1042.0, 56.5], [1041.0, 51.0], [1080.0, 54.5], [1037.0, 65.0], [1059.0, 52.0], [1057.0, 53.0], [1100.0, 32.5], [1093.0, 40.0], [1112.0, 55.0], [1132.0, 54.0], [1091.0, 47.0], [1096.0, 56.0], [1094.0, 44.0], [1201.0, 46.0], [1186.0, 37.0], [1177.0, 37.0], [1184.0, 41.5], [1163.0, 44.0], [1178.0, 34.5], [1176.0, 45.0], [1158.0, 41.0], [1161.0, 43.0], [1220.0, 37.0], [1235.0, 35.0], [1244.0, 39.0], [1271.0, 36.0], [1229.0, 43.0], [1269.0, 38.0], [1216.0, 43.5], [1255.0, 37.0], [1274.0, 33.0], [1273.0, 45.0], [1245.0, 36.0], [1296.0, 37.0], [1288.0, 35.0], [1315.0, 35.0], [1363.0, 36.0], [1416.0, 27.0], [1444.0, 28.0], [1421.0, 27.0], [1484.0, 26.0], [1520.0, 24.0], [1530.0, 23.0], [1638.0, 24.0], [1738.0, 22.0], [1728.0, 23.0], [1890.0, 22.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1890.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 7.0, "minX": 6.0, "maxY": 194.0, "series": [{"data": [[6.0, 11.0], [116.0, 7.0], [178.0, 8.0], [197.0, 8.0], [246.0, 9.0], [254.0, 10.5], [298.0, 11.0], [290.0, 194.0], [322.0, 9.0], [342.0, 12.0], [394.0, 11.0], [389.0, 172.0], [415.0, 160.0], [408.0, 117.0], [424.0, 123.0], [429.0, 124.0], [421.0, 116.0], [444.0, 115.5], [446.0, 115.0], [436.0, 69.0], [452.0, 117.0], [457.0, 116.0], [470.0, 111.0], [474.0, 111.0], [472.0, 111.5], [467.0, 110.0], [466.0, 112.0], [485.0, 105.0], [490.0, 110.0], [483.0, 108.0], [480.0, 110.0], [489.0, 107.0], [482.0, 109.0], [488.0, 108.0], [505.0, 10.0], [496.0, 110.0], [504.0, 102.0], [497.0, 107.0], [498.0, 109.0], [510.0, 108.0], [501.0, 103.0], [511.0, 108.0], [518.0, 15.0], [540.0, 55.0], [522.0, 103.0], [515.0, 107.0], [524.0, 105.0], [557.0, 11.0], [569.0, 100.0], [561.0, 102.0], [555.0, 106.0], [565.0, 103.0], [562.0, 102.0], [558.0, 100.0], [564.0, 102.0], [601.0, 13.0], [584.0, 12.0], [591.0, 98.0], [577.0, 99.0], [602.0, 97.0], [594.0, 95.0], [581.0, 101.0], [600.0, 99.0], [604.0, 101.0], [598.0, 94.0], [605.0, 97.0], [635.0, 14.0], [637.0, 14.0], [611.0, 93.0], [639.0, 91.0], [660.0, 40.0], [666.0, 93.0], [686.0, 35.0], [680.0, 83.0], [691.0, 86.0], [688.0, 81.0], [701.0, 94.0], [682.0, 93.0], [705.0, 20.0], [719.0, 15.0], [734.0, 19.0], [735.0, 87.0], [718.0, 83.0], [729.0, 88.0], [712.0, 90.0], [709.0, 84.0], [722.0, 89.0], [743.0, 18.0], [740.0, 17.5], [736.0, 17.0], [746.0, 86.0], [757.0, 83.0], [756.0, 87.0], [754.0, 87.0], [758.0, 85.0], [738.0, 84.0], [742.0, 86.0], [753.0, 87.0], [760.0, 83.0], [764.0, 82.5], [767.0, 85.0], [765.0, 86.0], [737.0, 89.0], [770.0, 78.0], [790.0, 20.0], [789.0, 84.0], [791.0, 83.0], [779.0, 80.0], [797.0, 82.0], [785.0, 82.0], [775.0, 85.0], [774.0, 84.0], [792.0, 82.0], [778.0, 84.0], [776.0, 82.0], [777.0, 83.0], [788.0, 83.0], [772.0, 85.0], [771.0, 83.0], [768.0, 83.0], [769.0, 84.0], [781.0, 85.0], [780.0, 85.0], [782.0, 85.0], [783.0, 83.0], [773.0, 83.0], [804.0, 82.0], [817.0, 23.0], [819.0, 23.0], [830.0, 74.0], [808.0, 82.5], [810.0, 85.0], [801.0, 81.0], [824.0, 79.0], [823.0, 80.0], [840.0, 19.0], [854.0, 75.0], [863.0, 69.0], [847.0, 78.0], [858.0, 77.5], [844.0, 73.0], [849.0, 81.0], [868.0, 72.0], [873.0, 19.0], [887.0, 18.0], [888.0, 63.0], [876.0, 75.0], [870.0, 75.0], [883.0, 61.0], [893.0, 74.0], [871.0, 80.0], [927.0, 66.0], [900.0, 23.0], [908.0, 74.0], [902.0, 60.0], [916.0, 25.0], [915.0, 67.0], [922.0, 31.0], [923.0, 74.0], [917.0, 60.0], [914.0, 73.0], [920.0, 74.0], [933.0, 69.0], [959.0, 38.0], [946.0, 32.0], [938.0, 71.0], [935.0, 73.0], [930.0, 77.5], [931.0, 75.0], [942.0, 68.0], [950.0, 71.0], [958.0, 72.0], [953.0, 70.0], [947.0, 72.0], [984.0, 63.0], [986.0, 24.0], [965.0, 66.0], [967.0, 74.0], [966.0, 67.0], [979.0, 56.0], [971.0, 74.0], [962.0, 70.0], [977.0, 64.0], [981.0, 63.0], [998.0, 24.0], [1002.0, 19.5], [999.0, 60.0], [1007.0, 67.0], [992.0, 67.0], [1009.0, 64.0], [1001.0, 65.0], [996.0, 62.0], [993.0, 70.0], [1018.0, 63.5], [1023.0, 70.0], [1032.0, 31.5], [1031.0, 41.0], [1087.0, 28.0], [1035.0, 53.0], [1027.0, 59.0], [1042.0, 56.5], [1041.0, 51.0], [1080.0, 54.5], [1037.0, 65.0], [1059.0, 52.0], [1057.0, 53.0], [1100.0, 32.5], [1093.0, 40.0], [1112.0, 55.0], [1132.0, 54.0], [1091.0, 47.0], [1096.0, 56.0], [1094.0, 44.0], [1201.0, 46.0], [1186.0, 37.0], [1177.0, 37.0], [1184.0, 41.5], [1163.0, 44.0], [1178.0, 34.5], [1176.0, 45.0], [1158.0, 41.0], [1161.0, 43.0], [1220.0, 37.0], [1235.0, 35.0], [1244.0, 39.0], [1271.0, 36.0], [1229.0, 43.0], [1269.0, 38.0], [1216.0, 43.5], [1255.0, 37.0], [1274.0, 33.0], [1273.0, 45.0], [1245.0, 36.0], [1296.0, 37.0], [1288.0, 35.0], [1315.0, 35.0], [1363.0, 36.0], [1416.0, 27.0], [1444.0, 28.0], [1421.0, 26.0], [1484.0, 26.0], [1520.0, 24.0], [1530.0, 23.0], [1638.0, 24.0], [1738.0, 22.0], [1728.0, 23.0], [1890.0, 22.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1890.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 115.8, "minX": 1.79326248E12, "maxY": 921.8166666666667, "series": [{"data": [[1.79326278E12, 672.6666666666666], [1.7932626E12, 788.5833333333334], [1.79326272E12, 921.8166666666667], [1.79326254E12, 861.6166666666667], [1.79326266E12, 730.5166666666667], [1.79326248E12, 115.8]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326278E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 115.5, "minX": 1.79326248E12, "maxY": 921.8166666666667, "series": [{"data": [[1.79326278E12, 673.6666666666666], [1.7932626E12, 788.5666666666667], [1.79326272E12, 921.8166666666667], [1.79326254E12, 860.9333333333333], [1.79326266E12, 730.5166666666667], [1.79326248E12, 115.5]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79326278E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 115.5, "minX": 1.79326248E12, "maxY": 921.8166666666667, "series": [{"data": [[1.79326278E12, 673.6666666666666], [1.7932626E12, 788.5666666666667], [1.79326272E12, 921.8166666666667], [1.79326254E12, 860.9333333333333], [1.79326266E12, 730.5166666666667], [1.79326248E12, 115.5]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326278E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 115.5, "minX": 1.79326248E12, "maxY": 921.8166666666667, "series": [{"data": [[1.79326278E12, 673.6666666666666], [1.7932626E12, 788.5666666666667], [1.79326272E12, 921.8166666666667], [1.79326254E12, 860.9333333333333], [1.79326266E12, 730.5166666666667], [1.79326248E12, 115.5]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79326278E12, "title": "Total Transactions Per Second"}},
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

