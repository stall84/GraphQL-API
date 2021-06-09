const { ApolloServer, gql } = require('apollo-server');
/**
 * @description Mock Data of Movies
 */
const movies = [
    {
        id: "02883",
        title: "5 Deadly Venoms",
        releaseDate: "10-10-1983",
        rating: 5,
        actor: [
            {
                id: 'A101',
                name: 'Johnny Chu'
            }
        ]
    },
    {
        id: "033030",
        title: "36th Chamber",
        releaseDate: "4-24-1985",
        rating: 4,
        actor: [
            {
                id: 'A302',
                name: 'Gordon Liu'
            }
        ]
    }
]

/**
 * @description Type Defs 
 */

const typeDefs = gql`

    enum Status {
        WATCHED
        INTERESTED
        NOT_INTERESTED
        UNKNOWN
    }

    # Specify fields as non-nullable by adding a bang to the datatype. This requires the field be present. 
    # Specifying non-nullable fields requires you to think about your data, in this mock example, a movie should always
    # have a title.. likewise in the Actor type, there should always be a name.. Id's are made non-nullable here and usually should be

    type Actor {
        id: ID!
        name: String!
    }

    type Movie {
        id: ID!
        title: String!
        releaseDate: String
        rating: Int
        actor: [Actor]
        status: Status
    }

    type Query {
        movies: [Movie]
        movie(id: ID): Movie
    }

`;

/**
 * @description Resolvers
 */
// Resolvers can accept four arguments They are positionally: (parent/obj, args, context, info)

const resolvers = {
    Query: {
        movies: () => {
            return movies; 
        },
        movie: (parent, { id }, context, info) => {
            console.log("id", id);
            const foundMovie = movies.find(movie => {
                return movie.id === id;
            })
            console.log("foundMovie: ", foundMovie);
            return foundMovie;
        }
    }
};

/**
 * @description Server Config
 */

const server = new ApolloServer({ typeDefs, resolvers });

server.listen()
    .then(({ url }) => {
        console.log(`Server running at ${url}`)
    })