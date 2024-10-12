import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log:['info','query']});

async function main(){

    await prisma.post.create({
        data:{
            title:"title of post",
            content  : "hello world",
            author : {
                connect:{
                    id:1
                }
            }
        }
    })
}

main()