# Geotrip 🌍

<p align="center">
   <img src="client/public/assets/images/Banner.jpg" alt="Logo"/>
</p>

<!-- ABOUT THE PROJECT -->

## Built With

- UI + Backend: EJS Templating Engine, CSS | Node.js + Express.js
- Libs + Frameworks: Mongoose, Auth0
- API + Packages: Mapquest API, Node Geocoder
- DB: MongoDB Atlas, Redis
---

## UML Architecture Diagram

![ChatIO UML](https://user-images.githubusercontent.com/61842142/184120584-3febc842-483b-40d6-827f-c3a5653d922c.png)

<!-- BUILT WITH -->  

## How to Install Locally

**1. Fork and clone this repository**

   ```
   git clone https://github.com/sandip2224/Geotrip.git
   cd Geotrip/
   ```  
   
**2. Install required dependancies/dev dependancies**  

   ```
   yarn
   ```  
**3. Create a .env file in root directory and add**  

  ```
   # Find on developer.mapquest.com
   GEOCODER_PROVIDER=mapquest
   GEOCODER_API_KEY=XXXXXXXXXXXXX

   # Find on Auth0
   ISSUER_BASE_URL=XXXXXXXXXXX
   CLIENT_ID=XXXXXXXXXXXXXXXXXX
   BASE_URL=http://localhost:3000
   SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

   # Find on redislabs online
   REDIS_HOST=XXXXXXXXXXXXXXXXXXXXXXXX
   REDIS_PORT=XXXXX
   REDIS_PASSWORD=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  ```

**4. Run server in dev/prod mode at `localhost:3000`**  

  ```
  yarn run start:dev
  yarn run start:prod
  ```
---

## 👨 Maintainer
  - [Sandipan Das](https://linkedin.com/in/sandipan0164/)
