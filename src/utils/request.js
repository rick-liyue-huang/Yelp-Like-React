
// 对网络的请求进行第一层的最基本封装

const headers = new Headers ({
  "Accept": "application/json",
  "Content-Type": "application/json"
})

function get(url) {

  return fetch(url, {
    method: 'GET',
    headers: headers
  }).then(response => {
    handleResponse(url, response)
  }).catch(err => {
    console.error(`Response failed. Url = ${url}. Message= ${err}`);
    return Promise.reject({
      error: {message: "Request failed."}
    });
  })
}

function post(url, data) { 

  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: data
  }).then(response => {
    handleResponse(url, response)
  }).catch(err => {
    console.error(`Response failed. Url = ${url}. Message= ${err}`);
    return Promise.reject({
      error: {message: "Request failed."}
    });
  })
}

// 工具函数
function handleResponse(url, response) {
  if(response.status === 200) {
    return response.json();
  } else {
    console.error(`Response failed. Url = ${url}`);
    return Promise.reject({
      error: {message: "Request fail due to server error"}
    });
  }
}

export { get, post }

