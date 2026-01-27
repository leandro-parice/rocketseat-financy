import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

const databaseUrl = process.env.DATABASE_URL ?? 'file:./dev.db';
const adapter = new PrismaLibSql({ url: databaseUrl });

export const prismaClient =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter,
	});

globalForPrisma.prisma = prismaClient;
