import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'info'] })

async function main() {
  const user = await prisma.user.update({
    where: {
      id: 1, 
    },
    data: {
      name: "Shane Warne",
      posts: {
        updateMany: {
          where: {
            published: true,
          },
          data: {
            title: "Updated Title", 
          },
        },
      },
    },
  })
  console.log(user) 
}

main()