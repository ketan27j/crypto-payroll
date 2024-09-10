import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: { number: '1234567890' },
        update: {},
        create: {
          number: '1234567890',
          password: 'admin',
          name: 'admin',
          email: 'admin@gmail.com'
        },
      })

  const ketan = await prisma.client.upsert({
    where: { number: '1234567890' },
    update: {},
    create: {
      number: '1234567890',
      email: 'ketan@gmail.com',
      password: 'ketan',
      name: 'ketan9',
      role:'user',
      wallet:'FMwGa1qhX1yuvA8HCTwKUm6mi82rcAeg7zyiEecNoc5T',
      kycok:false,
      createdBy:admin.id
    },
  })

  const employee = await prisma.employee.upsert({
    where: { id : 1},
    update: {},
    create: {
      id : 1,
      name: 'employee',
      email: 'employee@gmail.com',
      wallet:'XXXXXXXXXXXXXXXXx',
      salary:2,
      clientId:ketan.id,
    }
  })
  console.log({ ketan, admin })
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