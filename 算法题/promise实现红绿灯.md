````js
/*红灯三秒亮一次, 绿灯一秒亮一次, 黄灯2秒亮一次
实现一个函数，如何让三个灯不断交替重复亮灯? (用Promise实现) 三个亮灯函数已经存在:

*/

      function red() {
        console.log("red");
      }
      function green() {
        console.log("green");
      }
      function yellow() {
        console.log("yellow");
      }

      const light = function (timer, cb) {
        return new Promise((resolve) => {
          setTimeout(() => {
            cb();
            resolve();
          }, timer);
        });
      };

      // 方法一
      const trafficSignal1 = function () {
        Promise.resolve()
          .then(() => {
            return light(3000, red);
          })
          .then(() => {
            return light(1000, green);
          })
          .then(() => {
            return light(2000, yellow);
          })
          .then(() => {
            return trafficSignal();
          });
      };

      // 方法二
      const trafficSignal2 = function () {
        let lightSetting = [
          { behavior: red, interval: 3000 },
          { behavior: green, interval: 1000 },
          { behavior: yellow, interval: 2000 },
        ];

        const reducer = (accumulator, currentValue) => {
          return accumulator.then(() =>
            light(currentValue.interval, currentValue.behavior)
          );
        };
        return lightSetting
          .reduce(reducer, Promise.resolve())
          .then(() => trafficSignal2());
      };

      const timer = (count = 0) =>
        setInterval(() => {
          count++;
          console.log(count);
        }, 1000);

      const setup = () => {
        timer();
        //trafficSignal1()
        trafficSignal2();
      };

      setup();
      ```
````
