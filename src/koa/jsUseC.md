## node.js如何调用C/C++的方法
在一些特定应用场景，高级程序员需要利用C/C++的特性来弥补node.js的不足，这时，我们需要利用C/C++
来实现方法提供给js调用，本小节举例一个js调用C/C++可参考的例子
## 一、首先需要安装node-gyp
[node-gyp](https://www.npmjs.com/package/node-gyp) 是用Node.js编写的跨平台命令行工具，用于为Node.js编译本机附加模块。它包含了Chromium团队先前使用的gyp项目的一个分支， 并且处理了构建平台中遇到的版本差异的痛苦。
```
npm i -g node-gyp
```
## 二、创建文件add.cc文件

```c
#include <node.h>
namespace demo {
using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;// This is the implementation of the "add" method// Input arguments are passed using the// const FunctionCallbackInfo<Value>& args struct
void Add(const FunctionCallbackInfo<Value>& args) {
 Isolate* isolate = args.GetIsolate();
 // Check the number of arguments passed.
 if (args.Length() < 2) {
 // Throw an Error that is passed back to JavaScript
 isolate->ThrowException(Exception::TypeError(
  String::NewFromUtf8(isolate, "Wrong number of arguments")));
 return;
 }
 // Check the argument types
 if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
 isolate->ThrowException(Exception::TypeError(
  String::NewFromUtf8(isolate, "Wrong arguments")));
 return;
 }
 // Perform the operation
 double value = args[0]->NumberValue() + args[1]->NumberValue();
 Local<Number> num = Number::New(isolate, value);
 // Set the return value (using the passed in
 // FunctionCallbackInfo<Value>&)
 args.GetReturnValue().Set(num);}
void Init(Local<Object> exports) {
 NODE_SET_METHOD(exports, "add", Add);}NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
} // namespace demo
```

## 三、创建文件add.js

```
const addon = require('./build/Release/addon');
console.log('This should be eight:', addon.add(3, 5));
```
## 四、顺序执行执行命令

```
1.node-gyp configure 
2.node-gyp build
3.node add.js
```

## 五、执行结果

```
This should be eight: 8
```

