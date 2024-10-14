import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    let res = await prisma.post.findMany({
        take:3,
        skip:3
    })
    console.log(res);
}

main();