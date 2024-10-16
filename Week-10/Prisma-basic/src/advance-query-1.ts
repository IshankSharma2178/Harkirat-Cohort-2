import { PrismaClient  } from "@prisma/client";

const prisma = new PrismaClient({log:['info','query']});

async function main(){
    const user =await prisma.user.findMany({
         where:{
            email:{
                endsWith:'gmail.com',
            },
            posts:{
                    //has atleast one post
                some:{
                    published: true,
                }
            },
         },
        //  include:{

        //  }
    })
    console.log(user)

}

main();
