+++
title = "Bye bye JSON! Welcome Protocol Buffers!"
date = 2018-08-06T00:00:00Z
tags = ['JSON', 'Protocol Buffers']
slug = "bye-bye-json-welcome-protocol-buffers"
+++

Developers are familiar working with REST services and its implementation in your client application. REST services are most simple method of data exchange between the client and server. Well, it’s real simple text based communication technique, and easier to learn and debug, and many tools like Postman, Insomnia also exists to play with REST endpoints. I also did all those funnier things in my early days of career.

## Story of JSON

`{"status":"OK","message":"Hello JSON!"}`

In the JSON object the characters like `{ } [ ] , : "` doesn’t possess any kind of data. Instead it helps the serializer to format the data, so that it can be decoded and structured at the end point. The keywords helps to format data to a much more meaningful data for a newbie who is reading the JSON document for the first time. For example, `OK` `Hello JSON!` are the exact data wrapped in the above JSON object, but it looks like a sentence, and doesn’t convey the exact meaning of the JSON object.

For getting things more clear, let’s do an exercise. Count the number of characters in the above JSON object. It contains a total of **39** characters including spaces. We have 1 left curly bracket, 8 quotation marks, 2 colons, 1 comma and 1 right curly bracket, so **13** characters in total. The keywords occupies a total of 6 + 7 = **13** characters. The data holds 2 + 11 = **13** characters. Hence the data of two strings are wrapped up in a JSON object of **26** characters.

Let’s summarize:

```js
JSON object length:           39 bytes
Information length:           13 bytes
Non-information length:       26 bytes /* Wastage */
```

## Protocol Buffers

In my earlier times of career, REST and SOAP are the most popular data exchange mechanisms existed, and most devs and companies encourages to learn and use them. And the time flies, the game has moved to the next level of faster and efficient binary data serialization techniques, and I met Protocol Buffers.

Protocol buffers are Google’s language-neutral, platform-neutral, extensible mechanism for serializing structured data. For Protocol buffers, everything is a message. Message is equivalent to **class** or **structure** in programming languages. We declare message types with unique names and gives a list of fields like this. Let’s define a message in _greeting.proto_

```go
syntax = "proto3";

message Greeting {
    string status = 1; 
    string message = 2;
}
```

The `syntax = "proto3";` sentence tells the compiler that you’re using the version 3 of protocol buffers. In the message body, you can define the fields associated with the message. It supports unsigned and signed integers, floats, doubles, byte-arrays, strings, booleans, enums and user defined messages. In the above example, _don’t confuse it like assigning a number to a string_. It’s just field numbers, that represent the order of those fields in serialized data.

What’s next? Get protocol buffer compiler `protoc` from [google/protobuf](https://github.com/google/protobuf) and use it to generate some protobuf classes and methods equivalent to the message. You can generate code for **any programming language you want.** All you have to do is simply use that classes for data serialization and deserialization. For demonstration, I will use Javascript here.

This is how to generate protobuf classes:

```sh
protoc --js_out=import_style=commonjs,binary:. greeting.proto
```

That’s it! `protoc` has generated `greeting_pb.js` from `greeting.proto` for you. Now you can use them anywhere you want, like this:

```js
var pb = require('./greeting_pb')

// Serialization
var data = { status: 'OK', message: 'Hello JSON!' }
var msg = new pb.Greeting();
msg.setStatus(data.status)
msg.setMessage(data.message)
var bytes = msg.serializeBinary();

// Deserialization
var msg2 = pb.Greeting.deserializeBinary(bytes)
console.log(msg2.getStatus(), msg2.getMessage())
```

The serialized data you got is `UInt8Array` . Let’s see how it looks like:

```
10 2 79 75 18 11 72 101 108 108 111 32 74 83 79 78 33
     O  K        H   e   l   l   o     J  S  O  N  !
```

The serialized data is only just 17 bytes long! Also we can see that there is no more `"status"` and `"message"` literals. They are nicely obfuscated by protobuf object, and only they can understand the serialized message.

In summary,

```js
Serialized data length:       17 bytes
Information length:           13 bytes
Non-information length:        4 bytes  /* In JSON it is 26 */
```

Also, for deserialization, the Protocol Buffers feels so easier, because it only has to remove those unnecessary bytes from the serialized data. Hence, the data exchange will become much faster and cost effective. If you’re planning to build an IoT based project or mobile apps, Protocol Buffers is just for you.