import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});
const db = prisma as any;

async function main() {
  await db.breed.deleteMany();

  await db.breed.createMany({
    data: [
      // Dogs
      { name: 'Golden Retriever', type: 'dog' },
      { name: 'Bulldog', type: 'dog' },
      { name: 'German Shepherd', type: 'dog' },
      { name: 'Labrador Retriever', type: 'dog' },
      { name: 'Poodle', type: 'dog' },
      { name: 'Beagle', type: 'dog' },
      { name: 'Rottweiler', type: 'dog' },
      { name: 'Siberian Husky', type: 'dog' },
      { name: 'Dachshund', type: 'dog' },
      { name: 'Shih Tzu', type: 'dog' },
      { name: 'Boxer', type: 'dog' },
      { name: 'Doberman', type: 'dog' },
      { name: 'Cocker Spaniel', type: 'dog' },
      { name: 'Pomeranian', type: 'dog' },
      { name: 'Chihuahua', type: 'dog' },
      { name: 'French Bulldog', type: 'dog' },
      { name: 'Border Collie', type: 'dog' },
      { name: 'Maltese', type: 'dog' },
      { name: 'Akita', type: 'dog' },
      { name: 'Great Dane', type: 'dog' },
      { name: 'Pug', type: 'dog' },
      { name: 'Pembroke Welsh Corgi', type: 'dog' },
      { name: 'Australian Shepherd', type: 'dog' },
      { name: 'Bernese Mountain Dog', type: 'dog' },
      { name: 'Cane Corso', type: 'dog' },
      { name: 'Basset Hound', type: 'dog' },
      { name: 'Shiba Inu', type: 'dog' },
      { name: 'Bichon Frise', type: 'dog' },
      { name: 'St. Bernard', type: 'dog' },
      { name: 'Dalmatian', type: 'dog' },
      { name: 'Greyhound', type: 'dog' },
      { name: 'Pit Bull Terrier', type: 'dog' },
      { name: 'Papillon', type: 'dog' },
      { name: 'Pekingese', type: 'dog' },
      { name: 'Chow Chow', type: 'dog' },

      // Cats
      { name: 'British Shorthair', type: 'cat' },
      { name: 'Persian', type: 'cat' },
      { name: 'Siamese', type: 'cat' },
      { name: 'Maine Coon', type: 'cat' },
      { name: 'Ragdoll', type: 'cat' },
      { name: 'Bengal', type: 'cat' },
      { name: 'Sphynx', type: 'cat' },
      { name: 'Scottish Fold', type: 'cat' },
      { name: 'Russian Blue', type: 'cat' },
      { name: 'Norwegian Forest Cat', type: 'cat' },
      { name: 'Abyssinian', type: 'cat' },
      { name: 'Oriental Shorthair', type: 'cat' },
      { name: 'American Shorthair', type: 'cat' },
      { name: 'Turkish Van', type: 'cat' },
      { name: 'Devon Rex', type: 'cat' },
      { name: 'Cornish Rex', type: 'cat' },
      { name: 'Burmese', type: 'cat' },
      { name: 'Birman', type: 'cat' },
      { name: 'Himalayan', type: 'cat' },
      { name: 'Tonkinese', type: 'cat' },
      { name: 'Savannah', type: 'cat' },
      { name: 'Bombay', type: 'cat' },
      { name: 'Exotic Shorthair', type: 'cat' },
      { name: 'Siberian', type: 'cat' },
      { name: 'Manx', type: 'cat' },
      { name: 'Ocicat', type: 'cat' },
      { name: 'Egyptian Mau', type: 'cat' },
      { name: 'Chartreux', type: 'cat' },
      { name: 'Snowshoe', type: 'cat' },
      { name: 'Somali', type: 'cat' },
      { name: 'Singapura', type: 'cat' },

      // Birds
      { name: 'Parrot', type: 'bird' },
      { name: 'Canary', type: 'bird' },
      { name: 'Budgerigar', type: 'bird' },
      { name: 'Cockatiel', type: 'bird' },
      { name: 'Lovebird', type: 'bird' },
      { name: 'Finch', type: 'bird' },
      { name: 'Macaw', type: 'bird' },
      { name: 'African Grey', type: 'bird' },
      { name: 'Cockatoo', type: 'bird' },
      { name: 'Conure', type: 'bird' },
      { name: 'Quaker Parrot', type: 'bird' },
      { name: 'Parakeet', type: 'bird' },
      { name: 'Pionus', type: 'bird' },
      { name: 'Lorikeet', type: 'bird' },
      { name: 'Eclectus', type: 'bird' },
      { name: 'Rosella', type: 'bird' },
      { name: 'Mynah', type: 'bird' },
      { name: 'Dove', type: 'bird' },
      { name: 'Java Sparrow', type: 'bird' },
      { name: 'Zebra Finch', type: 'bird' },
      { name: 'Gouldian Finch', type: 'bird' },
      { name: 'Caique', type: 'bird' },
      { name: 'Amazon Parrot', type: 'bird' },
      { name: 'Green-Cheeked Conure', type: 'bird' },
      { name: 'Kakariki', type: 'bird' },
      { name: 'Bourke\'s Parrot', type: 'bird' },

      // Rabbits
      { name: 'Mini Lop', type: 'rabbit' },
      { name: 'Dutch Rabbit', type: 'rabbit' },
      { name: 'Holland Lop', type: 'rabbit' },
      { name: 'Netherland Dwarf', type: 'rabbit' },
      { name: 'Lionhead', type: 'rabbit' },
      { name: 'Flemish Giant', type: 'rabbit' },
      { name: 'Rex Rabbit', type: 'rabbit' },
      { name: 'English Angora', type: 'rabbit' },
      { name: 'French Lop', type: 'rabbit' },
      { name: 'Harlequin Rabbit', type: 'rabbit' },
      { name: 'Californian Rabbit', type: 'rabbit' },
      { name: 'New Zealand Rabbit', type: 'rabbit' },
      { name: 'Mini Rex', type: 'rabbit' },
      { name: 'American Fuzzy Lop', type: 'rabbit' },
      { name: 'Silver Fox Rabbit', type: 'rabbit' },
      { name: 'Polish Rabbit', type: 'rabbit' },
      { name: 'Jersey Wooly', type: 'rabbit' },
      { name: 'Checkered Giant', type: 'rabbit' },
      { name: 'English Spot', type: 'rabbit' },
      { name: 'Chinchilla Rabbit', type: 'rabbit' },
      { name: 'Havana', type: 'rabbit' },
      { name: 'Florida White', type: 'rabbit' },
      { name: 'Thrianta', type: 'rabbit' },
      { name: 'Beveren', type: 'rabbit' },
      { name: 'Champagne d\'Argent', type: 'rabbit' },
      { name: 'Rhinelander', type: 'rabbit' },
      { name: 'Blanc de Hotot', type: 'rabbit' },
    ],
  });

  console.log('Seed verileri eklendi');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });