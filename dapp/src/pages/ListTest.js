import React from "react";
 
function App() {
const Users = [
{
  id: "01",
  name: "Leanne Graham",
  email: "Sincere@april.biz",
  zipcode: 12112
},
{
  id: "02",
  name: "Ervin Howell",
  email: "Shanna@melissa.tv",
  zipcode: 12111
}
];
 console.log(typeof(Users));
return (
        <ul className="text_white">
        {Users.map((data) => (
            <li key={data.id}>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.zipcode}</p>
            </li>
        ))}
        </ul>
    );
}
 
export default App;