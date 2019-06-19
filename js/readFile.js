var myObj;
var readFile = (path) => {
  var request = new XMLHttpRequest();
  request.open('GET', path, false); // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    return request.responseText;
  }
}