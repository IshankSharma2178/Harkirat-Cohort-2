//PICK AND PARTIAL

// interface User {
//     id:number,
//     name:String,
//     age:number,
//     email:string,
//     password:string
// }

// type updatedProps = Pick<User ,"name" | "age" | "email" >;

// type partialProps = Partial<updatedProps>;

// function updatedUser (updatedProps:partialProps){

// }

// interface User2 {
//     id?:number,
//     name?:string,
//     email?:string,
//     age?:number
// }

// function updatedUser2 (props:User2){
//     console.log(props)
// }

// updatedUser2({id:2})

// READONLY

// type User = {
//     readonly name:String,
//     readonly age:number
// }

// const user : User={  // const user : Readonly <User>={
//      name:"john",
//      age:10
// }

// user.name = "snow" //cant change internal values now

// console.log(user.name)

//RECORD AND MAP

// type User = {
//     id:number,
//     name:String,
// }

// type Data = {
//     [key:string]:User
// }

// const users : Data = {
//     "abc@example.com":{
//         id:1,
//         name:"jhon"
//     },
//     "pqr@example.com":{
//         id:2,
//         name:"snow"
//     }
// }

// type Data = Record <string , {id:number,name:String}>

// const user :Data = {
//     "abc":{id:1,name:"john"}
// }

// another way to make key value pair object

// const user = new Map();
// type User ={
//     name:String,
//     age:number,
//     emial:string
// }
// const user2 = new Map<String,User>();
// user2.set("abc",{"name":"John",age:50,emial:"abc"});
// user2.set("pqr",{"name":"snow",age:20,emial:"hii"});


// console.log(user2.get("abc"));

// EXCLUDE

type eventType = 'click' | 'scroll' | 'mousemove';
type ExlcudedEvent = Exclude <eventType , 'scroll'>;

const handleEvent = (event : ExlcudedEvent) => {
    console.log(`handleEvent, ${event}`);
};

handleEvent("click");
handleEvent("mousemove");
// handleEvent("scroll"); // throws error

