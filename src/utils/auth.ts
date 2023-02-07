import bcrypt from 'bcrypt';

export async function generateHash(data: string): Promise<string> {
  const hash = await bcrypt.hash(data, 10);

  return hash;
}
