require("dotenv").config();
const newman = require("newman");
const { CLIENT_ID, CLIENT_SECRET, TARGET_HOST, PRINCIPAL, REALM } = process.env;

var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  newman
    .run({
      collection: {
        info: {
          _postman_id: "a9b67ffc-5440-46a5-9e7e-cc60220dcabd",
          name: "Sharepoint",
          schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: [
          {
            name: "Get Access Token For SP Rest",
            event: [
              {
                listen: "test",
                script: {
                  id: "85887498-51bc-4f5c-93fd-cd4e3b383720",
                  exec: ["var json = JSON.parse(responseBody);\r", "console.log(json);"],
                  type: "text/javascript"
                }
              }
            ],
            request: {
              method: "POST",
              header: [
                {
                  key: "Content-Type",
                  name: "Content-Type",
                  value: "application/x-www-form-urlencoded",
                  type: "text"
                }
              ],
              body: {
                mode: "urlencoded",
                urlencoded: [
                  {
                    key: "grant_type",
                    value: "client_credentials",
                    type: "text"
                  },
                  {
                    key: "client_id",
                    value: `${CLIENT_ID}@${REALM}`,
                    type: "text"
                  },
                  {
                    key: "client_secret",
                    value: CLIENT_SECRET,
                    type: "text"
                  },
                  {
                    key: "resource",
                    value: `${PRINCIPAL}/${TARGET_HOST}@${REALM}`,
                    type: "text"
                  }
                ]
              },
              url: {
                raw: `https://accounts.accesscontrol.windows.net/${REALM}/tokens/OAuth/2`,
                protocol: "https",
                host: ["accounts", "accesscontrol", "windows", "net"],
                path: [REALM, "tokens", "OAuth", "2"]
              }
            },
            response: []
          }
        ]
      }
    })
    .on("console", function(err, data) {
      res.send(data.messages[0]);
    });
});

module.exports = router;
