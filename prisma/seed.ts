import { PrismaClient, Movie } from "@prisma/client";
import { faker } from "@faker-js/faker";


const prisma = new PrismaClient();

async function main() {
  await prisma.movie.deleteMany({}); // use with caution.

  const amountOfUsers = 50;

  const movies: Movie[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const releasedDate = faker.date.past({years: 130})
    const released = ('0' + releasedDate.getDate()).slice(-2) + '/'
    + ('0' + (releasedDate.getMonth()+1)).slice(-2) + '/'
    + releasedDate.getFullYear();

    const movie: Movie = {
      id: i,
      title: faker.book.title(),
      year: faker.number.int({ min: 1888, max: 2024 }),
      rated: ['PG', 'PG-13', 'MA', 'R'][Math.floor(Math.random() * 4)],
      released: released,
      runtime: Math.floor(Math.random() * (180 - 60) + 60),
      genre: [faker.book.genre()],
      director: [faker.person.fullName()],
      writer: [faker.person.fullName()],
      actors: [faker.person.fullName(), faker.person.fullName(), faker.person.fullName()],
      plot: faker.lorem.paragraph({ min: 1, max: 3 }),
      language: ["English"],
      country: ["United States"],
      awards: "N/A",
      poster: "https://m.media-amazon.com/images/M/MV5BMzFiMWM4YjAtY2Y3Yi00MDIzLTk0N2MtYTAwNGM3ZmMwODhlXkEyXkFqcGc@._V1_SX300.jpg",
      imdbRating: Math.round(Math.random() * 100)/10,
      imdbVotes: faker.number.int({ min: 5000, max: 100000 }),
      imdbID: "tt28015403",
      rottenRating: Math.floor(Math.random() * 100),
      metascore: Math.floor(Math.random() * 100),
      watchlist: false,
      watched: true,
      watchListOrder: null
    };

    movies.push(movie);
  }

  const addMovies = async () => await prisma.movie.createMany({ data: movies });

  addMovies();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });