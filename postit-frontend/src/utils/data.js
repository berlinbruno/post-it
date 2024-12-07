import art from "../assets/categories/art.webp";
import celebration from "../assets/categories/celebration.webp";
import fashion from "../assets/categories/fashion.webp";
import fitness from "../assets/categories/fitness.webp";
import food from "../assets/categories/food.webp";
import nature from "../assets/categories/nature.webp";
import people from "../assets/categories/people.webp";
import pets from "../assets/categories/pets.webp";
import technology from "../assets/categories/technology.webp";
import travel from "../assets/categories/travel.webp";

export const categories = [
  {
    name: "art",
    image: art,
  },
  {
    name: "celebrations  ",
    image: celebration,
  },
  {
    name: "fashion ",
    image: fashion,
  },
  {
    name: "fitness",
    image: fitness,
  },
  {
    name: "food",
    image: food,
  },
  {
    name: "nature",
    image: nature,
  },
  {
    name: "people",
    image: people,
  },
  {
    name: "pets",
    image: pets,
  },
  {
    name: "travel",
    image: travel,
  },

  {
    name: "technology ",
    image: technology,
  },
  {
    name: "other",
    image: people,
  },
];

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
            asset -> {
                url
            }
        },
        _id,
        destiation,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`;
  return query;
};

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
          image{
            asset->{
              url
            }
          },
          _id,
          title, 
          about,
          category,
          postedBy->{
            _id,
            userName,
            image
          },
         save[]{
            postedBy->{
              _id,
              userName,
              image
            },
          },
          comments[]{
            comment,
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          }
        }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
          image{
            asset->{
              url
            }
          },
          _id,
          postedBy->{
            _id,
            userName,
            image
          },
          save[]{
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          },
        }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
          image{
            asset->{
              url
            }
          },
          _id,
          postedBy->{
            _id,
            userName,
            image
          },
          save[]{
            postedBy->{
              _id,
              userName,
              image
            },
          },
        }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
          image{
            asset->{
              url
            }
          },
          _id,
          postedBy->{
            _id,
            userName,
            image
          },
          save[]{
            postedBy->{
              _id,
              userName,
              image
            },
          },
        }`;
  return query;
};
