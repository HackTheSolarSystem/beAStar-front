## Be A Star (Frontend)

### Addressing the  [Mixed Reality Solar System Challenge](https://github.com/amnh/HackTheSolarSystem/wiki/A-Mixed-Reality-Solar-System)

### Created by the All-Stars
- Vivien Ngo / [@vivngo](@vivngo)
- Peggy Li / [@peggyxli](@peggyxli)
- Anna Leonenko / [@meinou](@meinou)
- Cameron Yick / [@hydrosquall](www.github.com/@hydrosquall)

### Solution Description

This is a cross-platform mobile AR app built on [ViroReact](https://docs.viromedia.com), which can target Android or Apple (iOS) phones. In this AR game, users play as stars that try to grow large enough to steal other players' planets! The game aims to teach players about two main topics from the high school science standards, namely intuitions about gravity, and facts about the lifecycle of a star as it ages and grows.

In our prototype, we were able to make a very basic proof of concept in a two-body system which calculates distance using positions assigned with a QR code. The accuracy of this wayfinding method varies based on lighting conditions and some luck. In order for users to build correct intuitions about how gravity works, we might need to formulate a more 

One thing that was challenging was striking the balance between scientific realism and having interesting game mechanics. If the force of gravity was scaled to real life, the game would not be interesting. If there were more time, we would like to tune the physics engine more carefully.

- [Video](https://www.youtube.com/watch?v=KseNJrbPx34)
- [Slides](https://docs.google.com/presentation/d/1iIYlIZiniDQ49o80BaPWwu0OJljpw09VIQkK7LNCEXw/edit#slide=id.g4ee0ef456a_2_2932)

The backend counterpart to this repo can be found [here](https://github.com/HackTheSolarSystem/beAStar-back)

### Installation Instructions

1. Follow steps 1 through 3 on the `ViroReact` [site](https://docs.viromedia.com/docs/quick-start)
2. Clone this repository to your computer, and switch to that folder

```bash
   git clone https://github.com/HackTheSolarSystem/beAStar-front.git
   cd beAStar-front
```
3. Create a file under `./credentials.js` with your API key that looks like this, except with your real credentials filled in. You can get a key from [here](https://viromedia.com/signup) for free.

```js
export const VIRO_API_KEY = "MY_SECRET";
```

4. Run the following command to install all the project dependencies.

```bash
   npm install
```

5. Run the following command to start the app

```bash
   npm start
```

6. To view the app, you'll need to use the ViroMedia app, available in both Android and Apple app stores. Documentation about how to navigate that process is [here](https://docs.viromedia.com/v1.0.0/docs/develop-with-viro).

