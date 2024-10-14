import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data:{
        email : "snow@gmail.com",
        name:"Jhon Snow",
        // posts:{
        //   create :[{
        //     title: "Snow title 1"
        //   },
        //   {
        //     title:"Snow title 2"
        //   },
        // ]
        // }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })