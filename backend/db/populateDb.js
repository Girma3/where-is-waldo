import prismaGlobal from "./pool.js";

async function main() {
  await prismaGlobal.user.create({
    data: {
      email: "testuser@example.com",
      name: "King Waldo",
      comment: "First user",
    },
  });
}
async function getUsers() {
  const users = await prismaGlobal.user.findMany();
  console.log(users);
}

getUsers();

// main()
//   .then(() => {
//     console.log("Seeded one user!");
//   })
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prismaGlobal.$disconnect();
//   });
