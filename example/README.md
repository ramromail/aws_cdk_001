## Sample protobuf encoded files

The folder "example" constains 3 samples of protobuf encoded messages. These are provided for testing.

1. 123_buffer.dat `=> { id: 123, name: 'Lord of the Kings', price: 9.99 }`
2. 456_buffer.dat `=> { id: 456, name: 'Fire and Ice', price: 19.99 }`
3. 789_buffer.dat `=> { id: 789, name: 'Aku Ankka', price: 5.99 }`

These encoded message are based on resources/books.proto

When one of these is uploaded in "Source bucket", a file containing decoded message is generated by the Lambda function in "Destination bucket".
