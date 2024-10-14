import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info"] });


async function main() {
    const user = await prisma.user.findMany({
        take: 2
    });
    console.log(user);
}   

main();

prisma.$on("query", async (e:any) => {
    console.log(`${e.query} ${e.params}`);
});
