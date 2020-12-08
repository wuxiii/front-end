# android 原生模块

## 封装过程

- 一个原生模块是一个继承了 ReactContextBaseJavaModule 的 Java 类
- ReactContextBaseJavaModule 要求派生类实现 getName 方法。这个函数用于返回一个字符串名字，这个名字在 JavaScript 端标记这个模块
- 一个可选的方法 getContants 返回了需要导出给 JavaScript 使用的常量
- 要导出一个方法给 JavaScript 使用，Java 方法需要使用注解@ReactMethod。方法的返回类型必须为 void
- React Native 的跨语言访问是异步进行的，所以想要给 JavaScript 返回一个值的唯一办法是使用回调函数或者发送事件
- 在 Java 这边要做的最后一件事就是注册这个模块。我们需要在应用的 Package 类的 createNativeModules 方法中添加这个模块

## 通讯

### 回调函数

- js 端方法作为参数传给 js 封装后的原生方法
- java 模块对应的方法内调用这个方法

### Promises

- java 端执行 promise.resolve 或 promise.reject
- js 端以异步的方式去执行

### 发送事件到 JavaScript

- java 端最简单的办法就是通过 RCTDeviceEventEmitter，这可以通过 ReactContext 来获得对应的引用

```java
 reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
```

- js 端 JavaScript 模块可以通过使用 NativeEventEmitter 模块来监听事件：

```js
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    this.eventEmitter = eventEmitter.addListener('EventReminder', (event) => {
       console.log(event.eventProperty) // "someValue"
    };

```

## android 原生 UI 模块

- 创建一个 ViewManager 的子类。
- 实现 createViewInstance 方法。
- 导出视图的属性设置器：使用@ReactProp（或@ReactPropGroup）注解。
- 把这个视图管理类注册到应用程序包的 createViewManagers 里。
- 实现 JavaScript 模块。

### 事件

一个原生事件发生的时候，它应该也能触发 JavaScript 端视图上的事件，这两个视图会依据 getId()而关联在一起
要把事件名 topChange 映射到 JavaScript 端的 onChange 回调属性上，需要在你的 ViewManager 中覆盖
getExportedCustomBubblingEventTypeConstants 方法，并在其中进行注册
