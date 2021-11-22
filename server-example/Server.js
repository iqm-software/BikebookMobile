import { RouteDefinitions } from "./routeDefinitions";

const express = require("express");
const path = require("path");
const fs = require("fs");

/**
 * This code is used for SEO purposes for
 * the bikebook site.
 */

// Set the port
const PORT = process.env.PORT || 2999;

// Create the app
const app = express();

// Loop through the routes
for (let i = 0; i < RouteDefinitions.length; i++) {
  // Get the route
  let route = RouteDefinitions[i];

  // Create the path
  app.get(route.path, (req, res) => {
    // Get the file path
    const filePath = path.resolve(__dirname, "index.html");

    // Read the file
    fs.readFile(filePath, "utf8", (err, data) => {
      // Check for error
      if (err) {
        // log the error
        return console.log(err);
      }

      // Check if the params are a blog
      if (req && req.params && route.data && route.component == "BlogArticle") {
        // Retrieve the blog data
        var articles = route.data.filter((x) => x.id == req.params.articleId);

        // Check if any blog was found
        if (articles && articles.length > 0) {
          // Get the blog
          let article = articles[0];

          // Replace the meta data of the file
          data = data.replace(/__TITLE__/g, article.content.title).replace(/__DESCRIPTION__/g, article.content.subtitle);

          // Check for cover photo
          if (article.content.cover && article.content.cover.src) {
            // Set the cover photo
            data = data.replace(/__IMAGE__/g, article.content.cover.src);
          }
        } else {
          // Else set the meta data as 404
          data = data
            .replace(/__TITLE__/g, "Bikebook | 404 Not Found")
            .replace(
              /__DESCRIPTION__/g,
              "Bikebook is here to ease the pain of finding a bike service. Compare local bike servicers in your area and find your perfect service in minutes.",
            );

          // Return 404
          res.status(404).send(data);
        }
      } else {
        // Else set the meta data as default
        data = data
          .replace(/__TITLE__/g, route.defaultTitle)
          .replace(/__DESCRIPTION__/g, route.defaultDescription)
          .replace(/__IMAGE__/g, route.image);
      }

      // Send the reply
      res.send(data);
    });
  });
}

// Return any static assets
app.use(express.static(path.resolve(__dirname)));

// Manage any 404 requests
app.use(function (req, res, next) {
  // Get the file path of index.html
  const filePath = path.resolve(__dirname, "index.html");

  // Read the file
  fs.readFile(filePath, "utf8", (err, data) => {
    // check for any errors
    if (err) {
      // Return and log the error
      return console.log(err);
    }

    // Return 404 meta data
    data = data
      .replace(/__TITLE__/g, "Bikebook | 404 Not Found")
      .replace(
        /__DESCRIPTION__/g,
        "Bikebook is here to ease the pain of finding a bike service. Compare local bike servicers in your area and find your perfect service in minutes.",
      );

    // return 404 status
    res.status(404).send(data);
  });
});

// Start the app
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
