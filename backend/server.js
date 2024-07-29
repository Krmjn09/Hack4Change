const cors = require("cors")
const path = require("path")
const axios = require("axios")
const express = require("express")

const app = express()
const PORT = 3000

app.set("port", PORT)

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors())

// Serve static files from the /public directory
app.use("/", express.static(path.join(__dirname, "public")))

// A simple endpoint for fetching a random quote from QuotesOnDesign
app.get("/api/quote", (req, res) => {
  axios
    .get("https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand")
    .then((response) => {
      const [post] = response.data
      const { title, content } = post || {}

      return title && content
        ? res.json({ status: "success", data: { title, content } })
        : res
            .status(500)
            .json({ status: "failed", message: "Could not fetch quote." })
    })
    .catch((err) =>
      res
        .status(500)
        .json({ status: "failed", message: "Could not fetch quote." })
    )
})

app.listen(PORT, () => console.log(`> App server is running on port ${PORT}.`))
