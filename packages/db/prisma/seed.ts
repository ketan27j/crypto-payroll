import { PrismaClient } from '@prisma/client'
import Cleanup from './cleanup_seed';

const prisma = new PrismaClient()

async function main() {
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@test.com' },
        update: {},
        create: {
          email: 'admin@test.com',
          phone: 1234567890,
          password: 'test',
          name: 'Super Admin',
          role:'Admin',
          createdBy: 9999
        },
      })
      const clientAdminUser = await prisma.user.upsert({
          where: { email: 'clientAdmin@test.com' },
          update: {},
          create: {
            email: 'clientAdmin@test.com',
            phone: 1234567891,
            password: 'test',
            name: 'Employer - Client Admin',
            role:'ClientAdmin',
            createdBy: 9999
          },
        })
      const employeeUser = await prisma.user.upsert({
        where: { email: 'employee1@test.com' },
        update: {},
        create: {
          email: 'employee1@test.com',
          phone: 1234567892,
          password: 'test',
          name: 'Employee 1',
          role:'Employee',
          createdBy: 9999
        },
      })

  const client = await prisma.client.upsert({
    where: { userId: clientAdminUser.id },
    update: {},
    create: {
      userId: clientAdminUser.id,
      wallet:'FMwGa1qhX1yuvA8HCTwKUm6mi82rcAeg7zyiEecNoc5T',
      kycok:true,
      createdBy: adminUser.id,
      isActive:true,
    },
  })

  const employee = await prisma.employee.upsert({
    where: { id : 1},
    update: {},
    create: {
      userId: employeeUser.id,
      wallet:'XXXXXXXXXXXXXXXXx',
      salary:20000,
      clientId: client.id,
      isActive:true,
      designation:'Software Engineer',
      functionalTitle:'Software Engineer',
      createdBy: clientAdminUser.id,
    }
  })

  console.log({ adminUser, clientAdminUser, client, employee })
}

console.log('Executing Action:  ', process.env.action);
  if(process.env.action === 'cleanup') {
    Cleanup();
    console.log('cleaning up....')
  }
  else {
    console.log('setting up....')
   
      main()
        .then(async () => {
          await prisma.$disconnect()
        })
        .catch(async (e) => {
          console.error(e)
          await prisma.$disconnect()
          process.exit(1)
        })
  }