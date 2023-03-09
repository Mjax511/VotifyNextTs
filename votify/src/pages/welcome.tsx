const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
};


let data;
const userInfo = fetch('http://localhost:3000/api/users', { ...requestOptions })
.then(res => {
  return res.json();
}).then(res => {
  data = res;
  return res;
})
console.log('from welcom page', data)
export default function() {


  return (
    <div>
      <div>Welcome {}</div>
    </div>
  )
}
