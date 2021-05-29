const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
require("dotenv").config();

const app = express();

app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
    })
);

app.get("/", async (req, res) => {
    await res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), async (req, res) => {
    await res.send(req.oidc.user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at port ${port}`));
