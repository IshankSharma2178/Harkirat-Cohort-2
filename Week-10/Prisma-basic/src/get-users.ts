import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient({log:['info','query']});

async function main(){

    // const user = await prisma.user.findMany({})

    // const user = await prisma.user.findMany({
    //     where:{
    //         email:'snow@gmail.com',
    //     }
    // });
    const user = await prisma.user.findUnique({
        where:{
            id:1
        },
        include:{
            posts:true
        }
    })
    console.log(user);
}
main();