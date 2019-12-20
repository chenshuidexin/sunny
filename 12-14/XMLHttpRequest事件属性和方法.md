## XMLHttpRequest简介
>AJAX是Asynchronous JavaScript and XML的缩写，指的是通过JavaScript的异步通信，从服务器获取XML文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。后来，AJAX这个词就成为JavaScript脚本发起HTTP通信的代名词，也就是说，只要用脚本发起通信，就可以叫做AJAX通信。
>具体来说，AJAX包括以下几个步骤。
- >创建XMLHttpRequest实例
- >发出HTTP请求
- >接收服务器传回的数据
- >更新网页数据
- 概括起来，就是一句话，AJAX通过原生的XMLHttpRequest对象发出HTTP请求，得到服务器返回的数据后，再进行处理。现在，服务器返回的都是JSON格式的数据，XML格式已经过时了，但是AJAX这个名字已经成了一个通用名词，字面含义已经消失了。
- XMLHttpRequest对象是AJAX的主要接口，用于浏览器与服务器之间的通信。尽管名字里面有XML和Http，它实际上可以使用多种协议（比如file或ftp），发送任何格式的数据（包括字符串和二进制）。
- XMLHttpRequest本身是一个构造函数，可以使用new命令生成实例。它没有任何参数。
```js
var xhr = new XMLHttpRequest();
```
一旦新建实例，就可以使用open()方法发出HTTP请求。
```js
xhr.open('GET', 'http://www.example.com/page.php', true);
```
- 上面代码向指定的服务器网址，发出GET请求。然后，指定回调函数，监听通信状态（readyState属性）的变化。
```js
xhr.onreadystatechange = handleStateChange;
function handleStateChange() {
  // ...
}
```
- 上面代码中，一旦XMLHttpRequest实例的状态发生变化，就会调用监听函数handleStateChange。
- 一旦拿到服务器返回的数据，AJAX不会刷新整个网页，而是只更新网页里面的相关部分，从而不打断用户正在做的事情。
- **注意**，AJAX只能向同源网址（协议、域名、端口都相同）发出HTTP请求，如果发出跨域请求，就会报错。
- 下面是XMLHttpRequest对象简单用法的完整例子。
```js
var xhr = new XMLHttpRequest();
//请求数据成功并且状态码是成功的
xhr.onreadystatechange = function(){
  if (xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.responseText);
        }else{
        console.error(xhr.statusText)
        }
};

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

xhr.open('GET', '/get?user='+this.value, true);
xhr.send(null);
```

## XMLHttpRequest 的实例属性
- XMLHttpRequest.readyState
```
XMLHttpRequest.readyState返回一个整数，表示实例对象的当前状态。该属性只读。它可能返回以下值。
0--> 表示XMLHttpRequest实例已经生成，但是实例的open()方法还没有被调用。
1--> 表示open()方法已经调用，但是实例的send()方法还没有调用，仍然可以使用实例的setRequestHeader()方法，设定HTTP请求的头信息。
2--> 表示实例的send()方法已经调用，并且服务器返回的头信息和状态码已经收到。
3--> 表示正在接收服务器传来的数据体（body部分）。这时，如果实例的responseType属性等于text或者空字符串，responseText属性就会包含已经收到的部分信息。
4--> 表示服务器返回的数据已经完全接收，或者本次接收已经失败。
通信过程中，每当实例对象发生状态变化，它的readyState属性的值就会改变。这个值每一次变化，都会触发readyStateChange事件。
```
- XMLHttpRequest.onreadystatechange
- >XMLHttpRequest.onreadystatechange属性指向一个监听函数。readystatechange事件发生时（实例的readyState属性变化），就会执行这个属性。另外，如果使用实例的abort()方法，终止XMLHttpRequest请求，也会造成readyState属性变化，导致调用XMLHttpRequest.onreadystatechange属性。
- 下面是一个例子。
```js
var xhr = new XMLHttpRequest();
xhr.open( 'GET', '/get?user='+this.value , true );
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4 || xhr.status !== 200) {
    return;
  }
  console.log(xhr.responseText);
};
xhr.send();
```
## XMLHttpRequest.response
- XMLHttpRequest.response属性表示服务器返回的数据体（即HTTP回应的body部分）。它可能是任何数据类型，比如字符串、对象、二进制对象等等，具体的类型由XMLHttpRequest.responseType属性决定。该属性只读。
- 如果本次请求没有成功或者数据不完整，该属性等于null。但是，如果responseType属性等于text或空字符串，在请求没有结束之前（readyState等于3的阶段），response属性包含服务器已经返回的部分数据。
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    handler(xhr.response);
  }
}
```
## XMLHttpRequest.responseType
- XMLHttpRequest.responseType属性是一个字符串，表示服务器返回数据的类型。这个属性是可写的，可以在调用open()方法之后、调用send()方法之前，设置这个属性的值，告诉服务器返回指定类型的数据。如果responseType设为空字符串，就等同于默认值text。
- XMLHttpRequest.responseType属性可以等于以下值。
```
""（空字符串）：等同于text，表示服务器返回文本数据。
"arraybuffer"：ArrayBuffer对象，表示服务器返回二进制数组。
"blob"：Blob对象，表示服务器返回二进制对象。
"document"：Document对象，表示服务器返回一个文档对象。
"json"：JSON对象。
"text"：字符串。
上面几种类型之中，text类型适合大多数情况，而且直接处理文本也比较方便。document类型适合返回HTML / XML文档的情况，这意味着，对于那些打开CORS的网站，可以直接用Ajax抓取网页，然后不用解析HTML字符串，直接对抓取回来的数据进行DOM操作。blob类型适合读取二进制数据，比如图片文件。
```
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'blob';

xhr.onload = function(e) {
  if (this.status === 200) {
    var blob = new Blob([xhr.response], {type: 'image/png'});
    // 或者
    var blob = xhr.response;
  }
};

xhr.send();
```
如果将这个属性设为ArrayBuffer，就可以按照数组的方式处理二进制数据。
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  for (var i = 0, len = binStr.length; i < len; ++i) {
    // var byte = uInt8Array[i];
  }
};

xhr.send();
```
如果将这个属性设为json，浏览器就会自动对返回数据调用JSON.parse()方法。也就是说，从xhr.response属性（注意，不是xhr.responseText属性）得到的不是文本，而是一个JSON对象。
## XMLHttpRequest.responseText
>XMLHttpRequest.responseText属性返回从服务器接收到的字符串，该属性为只读。只有HTTP请求完成接收以后，该属性才会包含完整的数据。
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/server', true);

xhr.responseType = 'text';
xhr.onload = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
};

xhr.send(null);
```
## XMLHttpRequest.responseXML
- XMLHttpRequest.responseXML属性返回从服务器接收到的HTML或XML文档对象，该属性为只读。如果本次请求没有成功，或者收到的数据不能被解析为XML或HTML，该属性等于null。
- 该属性生效的前提是HTTP回应的Content-Type头信息等于text/xml或application/xml。这要求在发送请求前，XMLHttpRequest.responseType属性要设为document。如果HTTP回应的Content-Type头信息不等于text/xml和application/xml，但是想从responseXML拿到数据（即把数据按照DOM格式解析），那么需要手动调用XMLHttpRequest.overrideMimeType()方法，强制进行XML解析。
- 该属性得到的数据，是直接解析后的文档DOM树。
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/server', true);

xhr.responseType = 'document';
xhr.overrideMimeType('text/xml');

xhr.onload = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseXML);
  }
};

xhr.send(null);
```
## XMLHttpRequest.responseURL
>XMLHttpRequest.responseURL属性是字符串，表示发送数据的服务器的网址。
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/test', true);
xhr.onload = function () {
  // 返回 http://example.com/test
  console.log(xhr.responseURL);
};
xhr.send(null);
```
- 注意，这个属性的值与open()方法指定的请求网址不一定相同。如果服务器端发生跳转，这个属性返回最后实际返回数据的网址。另外，如果原始URL包括锚点（fragment），该属性会把锚点剥离。
## XMLHttpRequest.status，XMLHttpRequest.statusText
>XMLHttpRequest.status属性返回一个整数，表示服务器回应的HTTP状态码。一般来说，如果通信成功的话，这个状态码是200；如果服务器没有返回状态码，那么这个属性默认是200。请求发出之前，该属性为0。该属性只读。
```
200, OK，访问正常
301, Moved Permanently，永久移动
302, Moved temporarily，暂时移动
304, Not Modified，未修改
307, Temporary Redirect，暂时重定向
401, Unauthorized，未授权
403, Forbidden，禁止访问
404, Not Found，未发现指定网址
500, Internal Server Error，服务器发生错误
基本上，只有2xx和304的状态码，表示服务器返回是正常状态。
```
```js
if (xhr.readyState === 4) {
  if ( (xhr.status >= 200 && xhr.status < 300)
    || (xhr.status === 304) ) {
    // 处理服务器的返回数据
  } else {
    // 出错
  }
}
```
XMLHttpRequest.statusText属性返回一个字符串，表示服务器发送的状态提示。不同于status属性，该属性包含整个状态信息，比如OK和Not Found。在请求发送之前（即调用open()方法之前），该属性的值是空字符串；如果服务器没有返回状态提示，该属性的值默认为OK。该属性为只读属性。
## XMLHttpRequest.timeout，XMLHttpRequestEventTarget.ontimeout
- XMLHttpRequest.timeout属性返回一个整数，表示多少毫秒后，如果请求仍然没有得到结果，就会自动终止。如果该属性等于0，就表示没有时间限制。
- XMLHttpRequestEventTarget.ontimeout属性用于设置一个监听函数，如果发生timeout事件，就会执行这个监听函数。
- 下面是一个例子。
```js
var xhr = new XMLHttpRequest();
var url = '/server';

xhr.ontimeout = function () {
  console.error('The request for ' + url + ' timed out.');
};

xhr.onload = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // 处理服务器返回的数据
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.open('GET', url, true);
// 指定 10 秒钟超时
xhr.timeout = 10 * 1000;
xhr.send(null);
```
# 事件监听属性
```
XMLHttpRequest对象可以对以下事件指定监听函数。
XMLHttpRequest.onloadstart：loadstart事件（HTTP 请求发出）的监听函数
XMLHttpRequest.onprogress：progress事件（正在发送和加载数据）的监听函数
XMLHttpRequest.onabort：abort事件（请求中止，比如用户调用了abort()方法）的监听函数
XMLHttpRequest.onerror：error事件（请求失败）的监听函数
XMLHttpRequest.onload：load事件（请求成功完成）的监听函数
XMLHttpRequest.ontimeout：timeout事件（用户指定的时限超过了，请求还未完成）的监听函数
XMLHttpRequest.onloadend：loadend事件（请求完成，不管成功或失败）的监听函数
```
下面是一个例子
```js
xhr.onload = function() {
 var responseText = xhr.responseText;
 console.log(responseText);
 // process the response.
};

xhr.onabort = function () {
  console.log('The request was aborted');
};

xhr.onprogress = function (event) {
  console.log(event.loaded);
  console.log(event.total);
};

xhr.onerror = function() {
  console.log('There was an error!');
};
```
- progress事件的监听函数有一个事件对象参数，该对象有三个属性：loaded属性返回已经传输的数据量，total属性返回总的数据量，lengthComputable属性返回一个布尔值，表示加载的进度是否可以计算。所有这些监听函数里面，只有progress事件的监听函数有参数，其他函数都没有参数。
- **注意**，如果发生网络错误（比如服务器无法连通），onerror事件无法获取报错信息。也就是说，可能没有错误对象，所以这样只能显示报错的提示。
## XMLHttpRequest.withCredentials
- XMLHttpRequest.withCredentials属性是一个布尔值，表示跨域请求时，用户信息（比如Cookie和认证的HTTP头信息）是否会包含在请求之中，默认为false，即向example.com发出跨域请求时，不会发送example.com设置在本机上的Cookie（如果有的话）。
- 如果需要跨域AJAX请求发送Cookie，需要withCredentials属性设为true。注意，同源的请求不需要设置这个属性。
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/', true);
xhr.withCredentials = true;
xhr.send(null);
```
```
为了让这个属性生效，服务器必须显式返回Access-Control-Allow-Credentials这个头信息。
Access-Control-Allow-Credentials: true
withCredentials属性打开的话，跨域请求不仅会发送Cookie，还会设置远程主机指定的Cookie。反之也成立，如果withCredentials属性没有打开，那么跨域的AJAX请求即使明确要求浏览器设置Cookie，浏览器也会忽略。
注意，脚本总是遵守同源政策，无法从document.cookie或者HTTP回应的头信息之中，读取跨域的Cookie，withCredentials属性不影响这一点。
```
## XMLHttpRequest.upload
>XMLHttpRequest不仅可以发送请求，还可以发送文件，这就是AJAX文件上传。发送文件以后，通过XMLHttpRequest.upload属性可以得到一个对象，通过观察这个对象，可以得知上传的进展。主要方法就是监听这个对象的各种事件：loadstart、loadend、load、abort、error、progress、timeout。

假定网页上有一个<progress>元素。

<progress min="0" max="100" value="0">0% complete</progress>

文件上传时，对upload属性指定progress事件的监听函数，即可获得上传的进度。
```js
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function (e) {};

  var progressBar = document.querySelector('progress');
  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      progressBar.value = (e.loaded / e.total) * 100;
      // 兼容不支持 <progress> 元素的老式浏览器
      progressBar.textContent = progressBar.value;
    }
  };

  xhr.send(blobOrFile);
}
upload(new Blob(['hello world'], {type: 'text/plain'}));
```
```
XMLHttpRequest 的实例方法
XMLHttpRequest.open()
XMLHttpRequest.open()方法用于指定HTTP请求的参数，或者说初始化XMLHttpRequest实例对象。它一共可以接受五个参数。
void open(
   string method,
   string url,
   optional boolean async,
   optional string user,
   optional string password
);
```
```
method：表示HTTP动词方法，比如GET、POST、PUT、DELETE、HEAD等。
url：表示请求发送目标URL。
async：布尔值，表示请求是否为异步，默认为true。如果设为false，则send()方法只有等到收到服务器返回了结果，才会进行下一步操作。该参数可选。由于同步AJAX请求会造成浏览器失去响应，许多浏览器已经禁止在主线程使用，只允许Worker里面使用。所以，这个参数轻易不应该设为false。
user：表示用于认证的用户名，默认为空字符串。该参数可选。
password：表示用于认证的密码，默认为空字符串。该参数可选。
注意，如果对使用过open()方法的AJAX请求，再次使用这个方法，等同于调用abort()，即终止请求。
下面发送POST请求的例子。
var xhr = new XMLHttpRequest();
xhr.open('POST', encodeURI('someURL'));
```
## XMLHttpRequest.send()
>XMLHttpRequest.send()方法用于实际发出HTTP请求。它的参数是可选的，如果不带参数，就表示HTTP请求只有一个URL，没有数据体，典型例子就是GET请求；如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是POST请求。
下面是GET请求的例子。
```js
var xhr = new XMLHttpRequest();
xhr.open('GET',
  'http://www.example.com/?id=' + encodeURIComponent(id),
  true
);
xhr.send(null);
```
上面代码中，GET请求的参数，作为查询字符串附加在URL后面。

下面是发送POST请求的例子。
```js
var xhr = new XMLHttpRequest();
var data = 'email='
  + encodeURIComponent(email)
  + '&password='
  + encodeURIComponent(password);

xhr.open('POST', 'http://www.example.com', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(data);
```
```
注意，所有XMLHttpRequest的监听事件，都必须在send()方法调用之前设定。
send方法的参数就是发送的数据。多种格式的数据，都可以作为它的参数。
void send();
void send(ArrayBufferView data);
void send(Blob data);
void send(Document data);
void send(String data);
void send(FormData data);
```
- 如果send()发送DOM对象，在发送之前，数据会先被串行化。如果发送二进制数据，最好是发送ArrayBufferView或Blob对象，这使得通过Ajax上传文件成为可能。

下面是发送表单数据的例子。FormData对象可以用于构造表单数据。
```js
var formData = new FormData();

formData.append('username', '张三');
formData.append('email', 'zhangsan@example.com');
formData.append('birthDate', 1940);

var xhr = new XMLHttpRequest();
xhr.open('POST', '/register');
xhr.send(formData);
```
```
上面代码中，FormData对象构造了表单数据，然后使用send()方法发送。它的效果与发送下面的表单数据是一样的。
<form id='registration' name='registration' action='/register'>
  <input type='text' name='username' value='张三'>
  <input type='email' name='email' value='zhangsan@example.com'>
  <input type='number' name='birthDate' value='1940'>
  <input type='submit' onclick='return sendForm(this.form);'>
</form>


```

下面的例子是使用FormData对象加工表单数据，然后再发送。
```js
function sendForm(form) {
  var formData = new FormData(form);
  formData.append('csrf', 'e69a18d7db1286040586e6da1950128c');

  var xhr = new XMLHttpRequest();
  xhr.open('POST', form.action, true);
  xhr.onload = function() {
    // ...
  };
  xhr.send(formData);

  return false;
}

var form = document.querySelector('#registration');
sendForm(form);
```
## XMLHttpRequest.setRequestHeader()
- XMLHttpRequest.setRequestHeader()方法用于设置浏览器发送的HTTP请求的头信息。该方法必须在open()之后、send()之前调用。如果该方法多次调用，设定同一个字段，则每一次调用的值会被合并成一个单一的值发送。
- 该方法接受两个参数。第一个参数是字符串，表示头信息的字段名，第二个参数是字段值。
```js
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Content-Length', JSON.stringify(data).length);
xhr.send(JSON.stringify(data));
```
上面代码首先设置头信息Content-Type，表示发送JSON格式的数据；然后设置Content-Length，表示数据长度；最后发送JSON数据。
## XMLHttpRequest.overrideMimeType()
>XMLHttpRequest.overrideMimeType()方法用来指定MIME类型，覆盖服务器返回的真正的MIME类型，从而让浏览器进行不一样的处理。举例来说，服务器返回的数据类型是text/xml，由于种种原因浏览器解析不成功报错，这时就拿不到数据了。为了拿到原始数据，我们可以把MIME类型改成text/plain，这样浏览器就不会去自动解析，从而我们就可以拿到原始文本了。
```
xhr.overrideMimeType('text/plain')
注意，该方法必须在send()方法之前调用。
修改服务器返回的数据类型，不是正常情况下应该采取的方法。如果希望服务器返回指定的数据类型，可以用responseType属性告诉服务器，就像下面的例子。只有在服务器无法返回某种数据类型时，才使用overrideMimeType()方法。
var xhr = new XMLHttpRequest();
xhr.onload = function(e) {
  var arraybuffer = xhr.response;
  // ...
}
xhr.open('GET', url);
xhr.responseType = 'arraybuffer';
xhr.send();
```
## XMLHttpRequest.getResponseHeader()
>XMLHttpRequest.getResponseHeader()方法返回HTTP头信息指定字段的值，如果还没有收到服务器回应或者指定字段不存在，返回null。该方法的参数不区分大小写。
```js
function getHeaderTime() {
  console.log(this.getResponseHeader("Last-Modified"));
}

var xhr = new XMLHttpRequest();
xhr.open('HEAD', 'yourpage.html');
xhr.onload = getHeaderTime;
xhr.send();
```
如果有多个字段同名，它们的值会被连接为一个字符串，每个字段之间使用“逗号+空格”分隔。
## XMLHttpRequest.getAllResponseHeaders()
>XMLHttpRequest.getAllResponseHeaders()方法返回一个字符串，表示服务器发来的所有HTTP头信息。格式为字符串，每个头信息之间使用CRLF分隔（回车+换行），如果没有收到服务器回应，该属性为null。如果发生网络错误，该属性为空字符串。
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'foo.txt', true);
xhr.send();

xhr.onreadystatechange = function () {
  if (this.readyState === 4) {
    var headers = xhr.getAllResponseHeaders();
  }
}
```
```
上面代码用于获取服务器返回的所有头信息。它可能是下面这样的字符串。
date: Fri, 08 Dec 2017 21:04:30 GMT\r\n
content-encoding: gzip\r\n
x-content-type-options: nosniff\r\n
server: meinheld/0.6.1\r\n
x-frame-options: DENY\r\n
content-type: text/html; charset=utf-8\r\n
connection: keep-alive\r\n
strict-transport-security: max-age=63072000\r\n
vary: Cookie, Accept-Encoding\r\n
content-length: 6502\r\n
x-xss-protection: 1; mode=block\r\n
然后，对这个字符串进行处理。
var arr = headers.trim().split(/[\r\n]+/);
var headerMap = {};

arr.forEach(function (line) {
  var parts = line.split(': ');
  var header = parts.shift();
  var value = parts.join(': ');
  headerMap[header] = value;
});

headerMap['content-length'] // "6502"
```
## XMLHttpRequest.abort()
>XMLHttpRequest.abort()方法用来终止已经发出的HTTP请求。调用这个方法以后，readyState属性变为4，status属性变为0。
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.example.com/page.php', true);
setTimeout(function () {
  if (xhr) {
    xhr.abort();
    xhr = null;
  }
}, 5000);
```
上面代码在发出5秒之后，终止一个AJAX请求。
## XMLHttpRequest 实例的事件
### readyStateChange 事件
readyState属性的值发生改变，就会触发readyStateChange事件。
我们可以通过onReadyStateChange属性，指定这个事件的监听函数，对不同状态进行不同处理。尤其是当状态变为4的时候，表示通信成功，这时回调函数就可以处理服务器传送回来的数据。
### progress 事件
上传文件时，XMLHttpRequest实例对象本身和实例的upload属性，都有一个progress事件，会不断返回上传的进度。
```js
var xhr = new XMLHttpRequest();

function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
  } else {
    console.log('无法计算进展');
  }
}

xhr.addEventListener('progress', updateProgress);

xhr.open();

```
### load 事件、error 事件、abort 事件
load事件表示服务器传来的数据接收完毕，error事件表示请求出错，abort事件表示请求被中断（比如用户取消请求）。
```js
var xhr = new XMLHttpRequest();

xhr.addEventListener('load', transferComplete);
xhr.addEventListener('error', transferFailed);
xhr.addEventListener('abort', transferCanceled);

xhr.open();

function transferComplete() {
  console.log('数据接收完毕');
}

function transferFailed() {
  console.log('数据接收出错');
}

function transferCanceled() {
  console.log('用户取消接收');
}

```
### loadend 事件
abort、load和error这三个事件，会伴随一个loadend事件，表示请求结束，但不知道其是否成功。
```js
xhr.addEventListener('loadend', loadEnd);

function loadEnd(e) {
  console.log('请求结束，状态未知');
}

```
### timeout 事件
服务器超过指定时间还没有返回结果，就会触发timeout事件。