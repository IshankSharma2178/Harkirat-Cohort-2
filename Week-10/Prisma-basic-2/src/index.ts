import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//create data
// async function insertUser(email: string, password: string, firstName: string, lastName: string) {
//     const response = await prisma.user.create({
//         data: {
//             email,
//             password,
//             firstName,
//             lastName,
//         },
//         select: {
//             id: true,
//             password: true,
//             firstName: true,
//         }
//     });
//     console.log(response);
// }
// insertUser("clay@gmail.com", "987", "clay", "white");

//Update data
// interface updateParams {
//     firstName: string,
//     lastName: string
// }

// async function updateUser(email: string, {firstName,lastName}:updateParams){
//     const response =await prisma.user.update({
//         where:{email:email},
//         data:{
//             firstName:firstName,
//             lastName:lastName
//         }
//     })
//     console.log(response)
// }

// updateUser("jhon@gmail.com", {firstName:"Geroge",lastName:"Singh"})

//delete data

