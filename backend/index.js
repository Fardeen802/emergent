import express from "express";
import cors from "cors";

const app = express();
app.use(cors());


const tree = {
    id: "root",
    name: "Project",
    isFolder: true,
    items: [
      {
        id: "src",
        name: "src",
        isFolder: true,
        items: [
          { id: "indexjs", name: "index.js", isFolder: false },
          { id: "appjsx", name: "App.jsx", isFolder: false },
          {
            id: "components",
            name: "components",
            isFolder: true,
            items: [
              { id: "folderjsx", name: "Folder.jsx", isFolder: false },
              { id: "treejsx", name: "Tree.jsx", isFolder: false },
            ],
          },
        ],
      },
      {
        id: "public",
        name: "public",
        isFolder: true,
        items: [
          { id: "indexhtml", name: "index.html", isFolder: false },
          { id: "favicon", name: "favicon.ico", isFolder: false },
        ],
      },
      { id: "readme", name: "README.md", isFolder: false },
      { id: "package", name: "package.json", isFolder: false },
    ],
  };

app.get("/api/tree", (req, res) => {
  res.json(tree);
});

const PORT = 8080;
app.listen(PORT, () => console.log("working"));
