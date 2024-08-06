import { PrismaClient } from '@prisma/client';

// Function to create a PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare globalThis with PrismaClient instance
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Instantiate PrismaClient or use existing instance
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Export PrismaClient instance
export default prisma;

// Save PrismaClient instance to globalThis in development
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;